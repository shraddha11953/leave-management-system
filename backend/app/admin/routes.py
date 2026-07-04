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
    prefix="/admin",
    tags=["Admin"]
)

@router.post("/login")
def login(
    admin: schemas.AdminLogin,
    db: Session = Depends(get_db)
):

    logged_admin = crud.login_admin(
        db,
        admin
    )

    if logged_admin is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password"
        )

    return {
        "message": "Admin Login Successful",
        "admin_id": logged_admin.id,
        "username": logged_admin.username,
        "role": "admin"
    }
@router.get("/{admin_id}")
def get_admin(
    admin_id: int,
    db: Session = Depends(get_db)
):

    admin = crud.get_admin(
        db,
        admin_id
    )

    if admin is None:
        raise HTTPException(
            status_code=404,
            detail="Admin not found"
        )

    return admin