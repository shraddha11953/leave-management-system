from sqlalchemy.orm import Session
from app.leave.model import Leave
from app.employee.model import Employee
from .schemas import LeaveCreate, UpdateLeaveStatus


def apply_leave(db: Session, leave: LeaveCreate):

    employee = (
        db.query(Employee)
        .filter(Employee.id == leave.employee_id)
        .first()
    )

    if employee is None:
        return None

    new_leave = Leave(
        employee_id=leave.employee_id,
        leave_reason=leave.leave_reason,
        start_date=leave.start_date,
        end_date=leave.end_date,
        status="PENDING"
    )

    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)

    return new_leave


def get_employee_leaves(db: Session, employee_id: int):

    return (
        db.query(Leave)
        .filter(Leave.employee_id == employee_id)
        .all()
    )


def get_all_leaves(db: Session):

    leaves = (
        db.query(Leave, Employee)
        .join(Employee, Leave.employee_id == Employee.id)
        .all()
    )

    result = []

    for leave, employee in leaves:

        result.append({
            "id": leave.id,
            "employee_id": employee.id,
            "employee_name": employee.full_name,
            "leave_reason": leave.leave_reason,
            "start_date": leave.start_date,
            "end_date": leave.end_date,
            "status": leave.status,
            "feedback": leave.feedback
        })

    return result


def update_leave_status(
    db: Session,
    leave_id: int,
    data: UpdateLeaveStatus
):

    leave = (
        db.query(Leave)
        .filter(Leave.id == leave_id)
        .first()
    )

    if leave is None:
        return None

    # Already processed request
    if leave.status != "PENDING":
        return leave

    leave.status = data.status.upper()
    leave.feedback = data.feedback

    if leave.status == "APPROVED":

        employee = (
            db.query(Employee)
            .filter(Employee.id == leave.employee_id)
            .first()
        )

        if employee:

            days = (
                leave.end_date - leave.start_date
            ).days + 1

            # Leave balance check
            if employee.leave_balance >= days:
                employee.leave_balance -= days
            else:
                leave.status = "REJECTED"
                leave.feedback = "Insufficient Leave Balance"

    db.commit()
    db.refresh(leave)

    return leave


def delete_leave(
    db: Session,
    leave_id: int
):

    leave = (
        db.query(Leave)
        .filter(Leave.id == leave_id)
        .first()
    )

    if leave is None:
        return False

    db.delete(leave)
    db.commit()

    return True