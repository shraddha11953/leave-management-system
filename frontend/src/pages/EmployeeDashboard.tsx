import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import DashboardCard from "../components/DashboardCard";
import LeaveForm from "../components/LeaveForm";
import LeaveHistoryTable from "../components/LeaveHistoryTable";
import NotificationCard from "../components/NotificationCard";

import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {

  const employee = JSON.parse(
    localStorage.getItem("employee") || "{}"
  );

  const [leaveBalance, setLeaveBalance] = useState(0);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadEmployee = async () => {
    try {
      const response = await api.get(`/employee/${employee.employee_id}`);
      setLeaveBalance(response.data.leave_balance);
    } catch {
      toast.error("Unable to load employee");
    }
  };

  const loadHistory = async () => {
    try {
      const response = await api.get(
        `/leave/employee/${employee.employee_id}`
      );
      setLeaveHistory(response.data);
    } catch {
      toast.error("Unable to load history");
    }
  };

  useEffect(() => {
    loadEmployee();
    loadHistory();
  }, []);

  return (

    <div className="employee-dashboard">

      {/* Header */}

      <header className="dashboard-header">

        <div>

          <h1>Employee Dashboard</h1>

          <p>
            Welcome, <strong>{employee.username}{employee.employee_name}</strong>
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("employee");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

      </header>

      <div className="dashboard-container">

       <div className="dashboard-overview">

  <div className="overview-header">

    <div>
      <h2>Dashboard Overview</h2>
      <p>Your leave summary at a glance</p>
    </div>

    <div className="overview-date">
      {new Date().toLocaleDateString("en-GB")}
    </div>

  </div>

  <div className="dashboard-cards">

    <DashboardCard
      title="Leave Balance"
      value={`${leaveBalance} Days`}
      color="green"
    />

    <DashboardCard
      title="Total Requests"
      value={leaveHistory.length}
      color="blue"
    />

    <DashboardCard
      title="Account Status"
      value="Active"
      color="orange"
    />

  </div>

</div>

        <div className="notification-section">

          <NotificationCard
            history={leaveHistory}
          />

        </div>

        <div className="action-bar">

          <button
            className="leave-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Apply Leave"}
          </button>

        </div>

        {showForm && (

  <div
    className="modal-overlay"
    onClick={() => setShowForm(false)}
  >

    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >

      <LeaveForm
        employeeId={employee.employee_id}
        refresh={loadHistory}
        close={() => setShowForm(false)}
      />

    </div>

  </div>

)}

        <div className="history-card">

          <LeaveHistoryTable
            history={leaveHistory}
          />

        </div>

      </div>

    </div>

  );
}