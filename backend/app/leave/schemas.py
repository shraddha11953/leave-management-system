from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class LeaveCreate(BaseModel):
    employee_id: int
    leave_reason: str
    start_date: date
    end_date: date


class LeaveResponse(BaseModel):
    id: int
    employee_id: int
    leave_reason: str
    start_date: date
    end_date: date
    status: str
    feedback: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class UpdateLeaveStatus(BaseModel):
    status: str
    feedback: Optional[str] = None