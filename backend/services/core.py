import uuid
from datetime import datetime, timedelta
from typing import Optional, List

from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy import select, or_, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
import os

from models import User, FounderProfile, Connection, ConnectionStatus, Message

SECRET_KEY = os.environ.get("SECRET_KEY", "change-me-in-production")
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ── Auth helpers ─────────────────────────────────────────────────────────────

def hash_password(plain: str) -> str:
    return pwd_ctx.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_ctx.verify(plain, hashed)


def create_access_token(user_id: uuid.UUID) -> str:
    expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": str(user_id), "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> Optional[uuid.UUID]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return uuid.UUID(payload["sub"])
    except (JWTError, ValueError):
        return None


# ── User operations ──────────────────────────────────────────────────────────

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> Optional[User]:
    result = await db.execute(
        select(User)
        .options(selectinload(User.profile))
        .where(User.id == user_id)
    )
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, email: str, password: str, name: str) -> User:
    user = User(
        email=email,
        hashed_password=hash_password(password),
        name=name,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def update_user_profile(db: AsyncSession, user: User, data: dict) -> User:
    profile_data = data.pop("profile", None)

    for key, value in data.items():
        if value is not None and hasattr(user, key):
            setattr(user, key, value)

    if profile_data:
        if user.profile is None:
            fp = FounderProfile(user_id=user.id, **profile_data)
            db.add(fp)
        else:
            for k, v in profile_data.items():
                if v is not None:
                    setattr(user.profile, k, v)

    user.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(user)
    return user


# ── Discovery / matching ─────────────────────────────────────────────────────

async def search_founders(
    db: AsyncSession,
    current_user_id: uuid.UUID,
    skills: Optional[List[str]] = None,
    industries: Optional[List[str]] = None,
    role: Optional[str] = None,
    location: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
) -> List[User]:
    q = (
        select(User)
        .options(selectinload(User.profile))
        .where(User.id != current_user_id, User.is_active == True, User.is_open_to_connect == True)
    )

    if role:
        q = q.where(User.role == role)
    if location:
        q = q.where(User.location.ilike(f"%{location}%"))
    if skills:
        # overlap — user has at least one of the requested skills
        from sqlalchemy import cast
        from sqlalchemy.dialects.postgresql import ARRAY as PG_ARRAY
        from sqlalchemy import String
        q = q.where(User.skills.overlap(skills))
    if industries:
        q = q.where(User.industries.overlap(industries))

    q = q.order_by(User.created_at.desc()).limit(limit).offset(offset)
    result = await db.execute(q)
    return result.scalars().all()


# ── Connections ───────────────────────────────────────────────────────────────

async def send_connection_request(
    db: AsyncSession, requester_id: uuid.UUID, recipient_id: uuid.UUID, message: Optional[str]
) -> Connection:
    conn = Connection(requester_id=requester_id, recipient_id=recipient_id, message=message)
    db.add(conn)
    await db.commit()
    await db.refresh(conn)
    return conn


async def get_connection(
    db: AsyncSession, connection_id: uuid.UUID
) -> Optional[Connection]:
    result = await db.execute(select(Connection).where(Connection.id == connection_id))
    return result.scalar_one_or_none()


async def update_connection_status(
    db: AsyncSession, conn: Connection, status: ConnectionStatus
) -> Connection:
    conn.status = status
    conn.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(conn)
    return conn


async def list_connections(
    db: AsyncSession, user_id: uuid.UUID, status: Optional[ConnectionStatus] = None
) -> List[Connection]:
    q = select(Connection).where(
        or_(Connection.requester_id == user_id, Connection.recipient_id == user_id)
    )
    if status:
        q = q.where(Connection.status == status)
    result = await db.execute(q.order_by(Connection.created_at.desc()))
    return result.scalars().all()


# ── Messages ──────────────────────────────────────────────────────────────────

async def send_message(
    db: AsyncSession, sender_id: uuid.UUID, recipient_id: uuid.UUID, body: str
) -> Message:
    msg = Message(sender_id=sender_id, recipient_id=recipient_id, body=body)
    db.add(msg)
    await db.commit()
    await db.refresh(msg)
    return msg


async def get_conversation(
    db: AsyncSession, user_a: uuid.UUID, user_b: uuid.UUID
) -> List[Message]:
    result = await db.execute(
        select(Message)
        .where(
            or_(
                and_(Message.sender_id == user_a, Message.recipient_id == user_b),
                and_(Message.sender_id == user_b, Message.recipient_id == user_a),
            )
        )
        .order_by(Message.created_at.asc())
    )
    return result.scalars().all()


async def mark_messages_read(db: AsyncSession, reader_id: uuid.UUID, sender_id: uuid.UUID):
    from sqlalchemy import update
    await db.execute(
        update(Message)
        .where(Message.recipient_id == reader_id, Message.sender_id == sender_id, Message.read == False)
        .values(read=True)
    )
    await db.commit()
