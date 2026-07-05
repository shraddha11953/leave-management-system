from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Import Models
from app.employee.model import Employee
from app.admin.model import Admin
from app.leave.model import Leave

# Import Routers
from app.employee.routes import router as employee_router
from app.admin.routes import router as admin_router
from app.leave.routes import router as leave_router

app = FastAPI(
    title="Leave Management System",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)
origins = [
    "http://localhost:5173",
    "https://leave-management-system-1-z15n.onrender.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router)
app.include_router(admin_router)
app.include_router(leave_router)


@app.get("/")
def home():
    return {
        "message": "Leave Management System API Running Successfully"
    }