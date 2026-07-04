import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import DashboardCard from "../components/DashboardCard";
import LeaveForm from "../components/LeaveForm";
import LeaveHistoryTable from "../components/LeaveHistoryTable";
import NotificationCard from "../components/NotificationCard";

export default function EmployeeDashboard() {

  const employee = JSON.parse(
    localStorage.getItem("employee") || "{}"
  );

  const [leaveBalance, setLeaveBalance] = useState(0);

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const loadEmployee = async () => {

    try {

      const response = await api.get(
        `/employee/${employee.employee_id}`
      );

      setLeaveBalance(
        response.data.leave_balance
      );

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

    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-blue-700 text-white p-6 flex justify-between">
        <div className="mt-8">

    <NotificationCard

        history={leaveHistory}

    />

</div>

        <div>

          <h1 className="text-3xl font-bold">

            Employee Dashboard

          </h1>

          <p>

            Welcome {employee.username}

          </p>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem("employee");

            window.location.href = "/";
          }}
          className="bg-red-500 px-5 rounded-lg"
        >

          Logout

        </button>

      </div>

      <div className="p-8">

        <div className="grid md:grid-cols-3 gap-5">

          <DashboardCard
            title="Leave Balance"
            value={`${leaveBalance} Days`}
            color="bg-green-600"
          />

          <DashboardCard
            title="Total Requests"
            value={leaveHistory.length}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Status"
            value="Active"
            color="bg-purple-600"
          />

        </div>

        <div className="mt-10">

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >

            Apply Leave

          </button>

        </div>

        {

          showForm && (

            <LeaveForm
              employeeId={employee.employee_id}
              refresh={loadHistory}
              close={() => setShowForm(false)}
            />

          )

        }

        <div className="mt-10">

          <LeaveHistoryTable
            history={leaveHistory}
          />

        </div>

      </div>

    </div>










  );

}