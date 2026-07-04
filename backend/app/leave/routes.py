from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from . import crud
from . import schemas

router = APIRouter(
    prefix="/leave",
    tags=["Leave"]
)

@router.post("/apply")
def apply_leave(
    leave: schemas.LeaveCreate,
    db: Session = Depends(get_db)
):

    new_leave = crud.apply_leave(
        db,
        leave
    )

    if new_leave is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return new_leave

@router.get("/employee/{employee_id}")
def employee_history(
    employee_id: int,
    db: Session = Depends(get_db)
):

    return crud.get_employee_leaves(
        db,
        employee_id
    )

@router.get("/")
def all_leaves(
    db: Session = Depends(get_db)
):

    return crud.get_all_leaves(db)

@router.put("/{leave_id}")
def update_status(
    leave_id: int,
    data: schemas.UpdateLeaveStatus,
    db: Session = Depends(get_db)
):

    leave = crud.update_leave_status(
        db,
        leave_id,
        data
    )

    if leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return leave

@router.delete("/{leave_id}")
def delete_leave(
    leave_id: int,
    db: Session = Depends(get_db)
):

    deleted = crud.delete_leave(
        db,
        leave_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    return {
        "message": "Leave Deleted Successfully"
    }