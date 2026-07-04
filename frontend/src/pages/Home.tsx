import { useNavigate } from "react-router-dom";
import { CalendarDays, ShieldCheck, Users, Bell } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">
          Leave Management
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/employee-login")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Employee Login
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>

          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Smart Leave
            <span className="text-blue-600"> Management </span>
            System
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Manage employee leave requests quickly and efficiently.
            Employees can apply for leave, track request status,
            and admins can approve or reject requests with feedback.
          </p>

          <div className="mt-8 flex gap-4">

            <button
              onClick={() => navigate("/employee-login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
            >
              Login as Employee
            </button>

            <button
              onClick={() => navigate("/admin-login")}
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-7 py-3 rounded-xl font-semibold transition"
            >
              Login as Admin
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <img
            src="https://undraw.co/api/illustrations/office-life.svg"
            alt="Leave Management"
            className="w-full max-w-md"
          />

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto py-10 px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <CalendarDays
              size={45}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="font-semibold text-lg">
              Leave Requests
            </h3>

            <p className="text-gray-500 mt-2">
              Apply leave in just a few clicks.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <ShieldCheck
              size={45}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="font-semibold text-lg">
              Admin Approval
            </h3>

            <p className="text-gray-500 mt-2">
              Approve or reject requests with feedback.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <Users
              size={45}
              className="mx-auto text-purple-600 mb-3"
            />

            <h3 className="font-semibold text-lg">
              Employee Dashboard
            </h3>

            <p className="text-gray-500 mt-2">
              Track leave history and balance.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <Bell
              size={45}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="font-semibold text-lg">
              Notifications
            </h3>

            <p className="text-gray-500 mt-2">
              Get instant status updates.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="mt-16 py-6 text-center text-gray-500">
        © 2026 Leave Management System • Built with React + FastAPI
      </footer>

    </div>
  );
}