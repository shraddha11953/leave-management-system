from pydantic import BaseModel


class AdminLogin(BaseModel):
    username: str
    password: str


class AdminResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True