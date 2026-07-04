import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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
    <div className="min-h-screen bg-50">

      {/* Header */}

      <div className="bg-white border-b border-slate-200 shadow-sm px-8 py-5 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome {admin.username}
          </p>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/";
          }}
          className="px-5 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      {/* Cards */}

      
        <div className="grid md:grid-cols-4 gap-6 px-8 pt-8 pb-4">

        <DashboardCard
          title="Total Requests"
          value={total}
          color="bg-blue-300"
          icon={<FileText className="text-blue-600" size={30} />}
        />

        <DashboardCard
          title="Pending"
          value={pending}
          color="bg-yellow-300"
          icon={<Clock3 className="text-yellow-600" size={30} />}
        />

        <DashboardCard
          title="Approved"
          value={approved}
          color="bg-green-300"
          icon={<CheckCircle2 className="text-green-600" size={30} />}
        />

        <DashboardCard
          title="Rejected"
          value={rejected}
          color="bg-red-300"
          icon={<XCircle className="text-red-600" size={30} />}
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