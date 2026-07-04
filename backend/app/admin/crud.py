from sqlalchemy.orm import Session

from app.admin.model import Admin
from .schemas import AdminLogin

from app.utils.security import verify_password


def login_admin(
    db: Session,
    admin: AdminLogin
):

    existing_admin = (
        db.query(Admin)
        .filter(
            Admin.username == admin.username
        )
        .first()
    )

    if not existing_admin:
        return None

    if not verify_password(
        admin.password,
        existing_admin.password
    ):
        return None

    return existing_admin


def get_admin(
    db: Session,
    admin_id: int
):

    return (
        db.query(Admin)
        .filter(
            Admin.id == admin_id
        )
        .first()
    )