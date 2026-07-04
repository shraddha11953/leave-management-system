from pydantic import BaseModel, EmailStr


class EmployeeRegister(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    password: str
    department: str


class EmployeeLogin(BaseModel):
    username: str
    password: str


class EmployeeResponse(BaseModel):
    id: int
    username: str
    full_name: str
    email: EmailStr
    department: str
    leave_balance: int

    class Config:
        from_attributes = True