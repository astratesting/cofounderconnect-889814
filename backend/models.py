import uuid
from datetime import datetime
from enum import Enum as PyEnum
from typing import Optional, List

from sqlalchemy import (
    Column, String, Text, Boolean, DateTime, ForeignKey,
    Enum, Integer, Table, UniqueConstraint
)
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from pydantic import BaseModel, EmailStr, Field

from database import Base


# ── SQLAlchemy ORM models ────────────────────────────────────────────────────

connection_table = Table(
    "connections",
    Base.metadata,
    Column("requester_id", UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True),
    Column("recipient_id", UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True),
    Column("status", String(20), default="pending"),
    Column("created_at", DateTime, default=datetime.utcnow),
)


class RoleEnum(str, PyEnum):
    technical = "technical"
    business = "business"
    design = "design"
    marketing = "marketing"
    finance = "finance"
    operations = "operations"
    other = "other"


class StageEnum(str, PyEnum):
    idea = "idea"
    mvp = "mvp"
    early_traction = "early_traction"
    growth = "growth"
    scaling = "scaling"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(120), nullable=False)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    location = Column(String(120), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    twitter_url = Column(String(500), nullable=True)
    role = Column(Enum(RoleEnum), nullable=True)
    skills = Column(ARRAY(String), default=list)
    industries = Column(ARRAY(String), default=list)
    looking_for_roles = Column(ARRAY(String), default=list)
    is_active = Column(Boolean, default=True)
    is_open_to_connect = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile = relationship("FounderProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    sent_connections = relationship("Connection", foreign_keys="Connection.requester_id", back_populates="requester")
    received_connections = relationship("Connection", foreign_keys="Connection.recipient_id", back_populates="recipient")
    messages_sent = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    messages_received = relationship("Message", foreign_keys="Message.recipient_id", back_populates="recipient")


class FounderProfile(Base):
    __tablename__ = "founder_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    headline = Column(String(200), nullable=True)
    startup_idea = Column(Text, nullable=True)
    stage = Column(Enum(StageEnum), nullable=True)
    commitment = Column(String(50), nullable=True)  # full-time, part-time, exploring
    equity_split_expectation = Column(String(100), nullable=True)
    past_exits = Column(Integer, default=0)
    years_experience = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")


class ConnectionStatus(str, PyEnum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"


class Connection(Base):
    __tablename__ = "connections"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    requester_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recipient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status = Column(Enum(ConnectionStatus), default=ConnectionStatus.pending)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (UniqueConstraint("requester_id", "recipient_id", name="uq_connection"),)

    requester = relationship("User", foreign_keys=[requester_id], back_populates="sent_connections")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="received_connections")


class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sender_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recipient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    body = Column(Text, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="messages_sent")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="messages_received")


# ── Pydantic schemas ──────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    name: str = Field(min_length=1, max_length=120)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class FounderProfileIn(BaseModel):
    headline: Optional[str] = None
    startup_idea: Optional[str] = None
    stage: Optional[StageEnum] = None
    commitment: Optional[str] = None
    equity_split_expectation: Optional[str] = None
    past_exits: Optional[int] = 0
    years_experience: Optional[int] = 0


class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    role: Optional[RoleEnum] = None
    skills: Optional[List[str]] = None
    industries: Optional[List[str]] = None
    looking_for_roles: Optional[List[str]] = None
    is_open_to_connect: Optional[bool] = None
    profile: Optional[FounderProfileIn] = None


class UserOut(BaseModel):
    id: uuid.UUID
    email: str
    name: str
    bio: Optional[str]
    avatar_url: Optional[str]
    location: Optional[str]
    linkedin_url: Optional[str]
    twitter_url: Optional[str]
    role: Optional[RoleEnum]
    skills: List[str] = []
    industries: List[str] = []
    looking_for_roles: List[str] = []
    is_open_to_connect: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ConnectionRequest(BaseModel):
    recipient_id: uuid.UUID
    message: Optional[str] = None


class ConnectionAction(BaseModel):
    status: ConnectionStatus  # accepted | declined


class ConnectionOut(BaseModel):
    id: uuid.UUID
    requester_id: uuid.UUID
    recipient_id: uuid.UUID
    status: ConnectionStatus
    message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class MessageIn(BaseModel):
    recipient_id: uuid.UUID
    body: str = Field(min_length=1)


class MessageOut(BaseModel):
    id: uuid.UUID
    sender_id: uuid.UUID
    recipient_id: uuid.UUID
    body: str
    read: bool
    created_at: datetime

    class Config:
        from_attributes = True
