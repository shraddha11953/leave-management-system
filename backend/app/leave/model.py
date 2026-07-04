from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    ForeignKey,
    TIMESTAMP
)

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func

from app.database import Base


class Leave(Base):

    __tablename__ = "leave_requests"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    leave_reason = Column(
        String,
        nullable=False
    )

    start_date = Column(
        Date,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=False
    )

    status = Column(
        String,
        default="PENDING"
    )

    feedback = Column(
        String,
        nullable=True
    )

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    employee = relationship(
        "Employee",
        back_populates="leaves"
    )