import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import (
    UserOut, UserProfileUpdate, ConnectionRequest, ConnectionAction,
    ConnectionOut, ConnectionStatus, MessageIn, MessageOut
)
from routers.auth import get_current_user
from services import core

router = APIRouter(prefix="/api", tags=["api"])


# ── Profile ───────────────────────────────────────────────────────────────────

@router.put("/profile", response_model=UserOut)
async def update_profile(
    body: UserProfileUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    data = body.model_dump(exclude_none=True)
    if "profile" in data and data["profile"]:
        data["profile"] = body.profile.model_dump(exclude_none=True)
    updated = await core.update_user_profile(db, current_user, data)
    return updated


@router.get("/profile/{user_id}", response_model=UserOut)
async def get_profile(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    user = await core.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ── Discovery / matching ──────────────────────────────────────────────────────

@router.get("/founders", response_model=List[UserOut])
async def discover_founders(
    skills: Optional[str] = Query(None, description="Comma-separated skills"),
    industries: Optional[str] = Query(None, description="Comma-separated industries"),
    role: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    skills_list = [s.strip() for s in skills.split(",")] if skills else None
    industries_list = [i.strip() for i in industries.split(",")] if industries else None
    founders = await core.search_founders(
        db,
        current_user_id=current_user.id,
        skills=skills_list,
        industries=industries_list,
        role=role,
        location=location,
        limit=limit,
        offset=offset,
    )
    return founders


# ── Connections ───────────────────────────────────────────────────────────────

@router.post("/connections", response_model=ConnectionOut, status_code=status.HTTP_201_CREATED)
async def request_connection(
    body: ConnectionRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if body.recipient_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot connect with yourself")
    recipient = await core.get_user_by_id(db, body.recipient_id)
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")
    conn = await core.send_connection_request(db, current_user.id, body.recipient_id, body.message)
    return conn


@router.get("/connections", response_model=List[ConnectionOut])
async def list_connections(
    connection_status: Optional[ConnectionStatus] = Query(None, alias="status"),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    conns = await core.list_connections(db, current_user.id, status=connection_status)
    return conns


@router.patch("/connections/{connection_id}", response_model=ConnectionOut)
async def respond_to_connection(
    connection_id: uuid.UUID,
    body: ConnectionAction,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    conn = await core.get_connection(db, connection_id)
    if not conn:
        raise HTTPException(status_code=404, detail="Connection not found")
    if conn.recipient_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    if conn.status != ConnectionStatus.pending:
        raise HTTPException(status_code=409, detail="Connection already resolved")
    updated = await core.update_connection_status(db, conn, body.status)
    return updated


# ── Messages ──────────────────────────────────────────────────────────────────

@router.post("/messages", response_model=MessageOut, status_code=status.HTTP_201_CREATED)
async def send_message(
    body: MessageIn,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if body.recipient_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot message yourself")
    recipient = await core.get_user_by_id(db, body.recipient_id)
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")
    msg = await core.send_message(db, current_user.id, body.recipient_id, body.body)
    return msg


@router.get("/messages/{other_user_id}", response_model=List[MessageOut])
async def get_conversation(
    other_user_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await core.mark_messages_read(db, reader_id=current_user.id, sender_id=other_user_id)
    messages = await core.get_conversation(db, current_user.id, other_user_id)
    return messages
