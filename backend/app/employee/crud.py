from sqlalchemy.orm import Session

from .model import Employee
from app.employee.schemas import (
    EmployeeRegister,
    EmployeeLogin
)

from app.utils.security import (
    hash_password,
    verify_password
)


def register_employee(
    db: Session,
    employee: EmployeeRegister
):

    existing_user = (
        db.query(Employee)
        .filter(
            Employee.username == employee.username
        )
        .first()
    )

    if existing_user:
        return None

    new_employee = Employee(
        username=employee.username,
        full_name=employee.full_name,
        email=employee.email,
        password=hash_password(employee.password),
        department=employee.department
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


def login_employee(
    db: Session,
    user: EmployeeLogin
):

    employee = (
        db.query(Employee)
        .filter(
            Employee.username == user.username
        )
        .first()
    )

    if not employee:
        return None

    if not verify_password(
        user.password,
        employee.password
    ):
        return None

    return employee


def get_employee(
    db: Session,
    employee_id: int
):

    return (
        db.query(Employee)
        .filter(
            Employee.id == employee_id
        )
        .first()
    )