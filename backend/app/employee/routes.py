from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from . import crud
from . import schemas

router = APIRouter(
    prefix="/employee",
    tags=["Employee"]
)

@router.post("/register")
def register(
    employee: schemas.EmployeeRegister,
    db: Session = Depends(get_db)
):

    new_employee = crud.register_employee(
        db,
        employee
    )

    if new_employee is None:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    return {
        "message": "Registration Successful",
        "employee": new_employee
    }

@router.post("/login")
def login(
    user: schemas.EmployeeLogin,
    db: Session = Depends(get_db)
):

    employee = crud.login_employee(
        db,
        user
    )

    if employee is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password"
        )

    return {
        "message": "Login Successful",
        "employee_id": employee.id,
        "username": employee.username,
        "role": "employee"
    }

@router.get("/{employee_id}")
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = crud.get_employee(
        db,
        employee_id
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee