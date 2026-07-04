import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

import DashboardCard from "../components/DashboardCard";
//import AdminLeaveTable from "../components/AdminLeaveTable";
import AdminLeaveTable from "../components/AdminLeaveTable";

interface LeaveRequest {
  id: number;
  employee_name: string;
  leave_reason: string;
  start_date: string;
  end_date: string;
  status: string;
  feedback?: string;
}

export default function AdminDashboard() {

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  const loadRequests = async () => {
    try {
      const response = await api.get("/leave");

      setRequests(response.data);

    } catch {
      toast.error("Unable to load leave requests");
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const total = requests.length;

  const pending = requests.filter(
    (item) => item.status.toUpperCase() === "PENDING"
  ).length;

  const approved = requests.filter(
    (item) => item.status.toUpperCase() === "APPROVED"
  ).length;

  const rejected = requests.filter(
    (item) => item.status.toUpperCase() === "REJECTED"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-blue-700 text-white p-6 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-1">
            Welcome {admin.username}
          </p>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-5 p-8">

        <DashboardCard
          title="Total Requests"
          value={total}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Pending"
          value={pending}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Approved"
          value={approved}
          color="bg-green-600"
        />

        <DashboardCard
          title="Rejected"
          value={rejected}
          color="bg-red-600"
        />

      </div>

      {/* Table */}

      <div className="px-8 pb-8">

        <AdminLeaveTable
          requests={requests}
          refresh={loadRequests}
        />

      </div>

    </div>
  );
}