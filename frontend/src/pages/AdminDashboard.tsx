import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

import DashboardCard from "../components/DashboardCard";
import AdminLeaveTable from "../components/AdminLeaveTable";

import "./AdminDashboard.css";

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

  const [requests, setRequests] =
    useState<LeaveRequest[]>([]);

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
    item => item.status.toUpperCase() === "PENDING"
  ).length;

  const approved = requests.filter(
    item => item.status.toUpperCase() === "APPROVED"
  ).length;

  const rejected = requests.filter(
    item => item.status.toUpperCase() === "REJECTED"
  ).length;

  return (

    <div className="admin-dashboard">

      <header className="admin-header">

        <div>

          <h1>Admin Dashboard</h1>

          <p>
            Welcome,
            <strong> {admin.username}</strong>
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={() => {

            localStorage.removeItem("admin");

            window.location.href="/";

          }}
        >

          Logout

        </button>

      </header>

      <div className="admin-container">

        <div className="dashboard-overview">

          <div className="overview-header">

            <div>

              <h2>Dashboard Overview</h2>

              <p>
                Monitor all employee leave requests
              </p>

            </div>

            <div className="overview-date">

              {new Date().toLocaleDateString("en-GB")}

            </div>

          </div>

          <div className="dashboard-cards">

            <DashboardCard
              title="Total Requests"
              value={total}
              color="blue"
            />

            <DashboardCard
              title="Pending"
              value={pending}
              color="orange"
            />

            <DashboardCard
              title="Approved"
              value={approved}
              color="green"
            />

            <DashboardCard
              title="Rejected"
              value={rejected}
              color="red"
            />

          </div>

        </div>

        <div className="table-section">

          <AdminLeaveTable

            requests={requests}

            refresh={loadRequests}

          />

        </div>

      </div>

    </div>

  );

}