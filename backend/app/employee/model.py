from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(50), unique=True, nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    full_name = Column(String(100), nullable=False)

    department = Column(String(100))

    leave_balance = Column(Integer, default=20)

    leaves = relationship(
        "Leave",
        back_populates="employee",
        cascade="all, delete"
    )