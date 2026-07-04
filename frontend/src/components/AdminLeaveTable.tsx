import { toast } from "react-toastify";
import api from "../services/api";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

interface LeaveRequest {
  id: number;
  employee_name: string;
  leave_reason: string;
  start_date: string;
  end_date: string;
  status: string;
  feedback?: string;
}

interface Props {
  requests: LeaveRequest[];
  refresh: () => void;
}

export default function AdminLeaveTable({
  requests,
  refresh,
}: Props) {

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    let feedback = "";

    if (status === "REJECTED") {

      feedback =
        prompt("Enter Feedback") || "";

    }

    try {

      await api.put(`/leave/${id}`, {
        status,
        feedback,
      });

      toast.success(
        `Leave ${status.toLowerCase()} successfully`
      );

      refresh();

    } catch {

      toast.error("Failed to update status");

    }

  };

  const [selectedLeaveId, setSelectedLeaveId] = useState<number | null>(null);

const [openModal, setOpenModal] = useState(false);
const approveLeave = async (id: number) => {

    try {

        await api.put(`/leave/${id}`, {
            status: "APPROVED",
            feedback: ""
        });

        toast.success("Leave Approved");

        refresh();

    }
    catch {

        toast.error("Unable to approve");

    }

};
const rejectLeave = async (feedback: string) => {

    if (!selectedLeaveId) return;

    try {

        await api.put(`/leave/${selectedLeaveId}`, {
            status: "REJECTED",
            feedback
        });

        toast.success("Leave Rejected");

        refresh();

    }
    catch {

        toast.error("Unable to reject");

    }

};

  const getBadgeColor = (status: string) => {

    switch (status.toUpperCase()) {

      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">

        Leave Requests

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-3">
                Employee
              </th>

              <th className="p-3">
                Reason
              </th>

              <th className="p-3">
                Start
              </th>

              <th className="p-3">
                End
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Feedback
              </th>

              <th className="p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {

              requests.map((leave) => (

                <tr
                  key={leave.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">

                    {leave.employee_name}

                  </td>

                  <td className="p-3">

                    {leave.leave_reason}

                  </td>

                  <td className="p-3">

                    {leave.start_date}

                  </td>

                  <td className="p-3">

                    {leave.end_date}

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>

                  </td>

                  <td className="p-3">

                    {

                      leave.feedback
                        ? leave.feedback
                        : "-"

                    }

                  </td>

                  <td className="p-3 flex gap-2">

                    {

                      leave.status === "PENDING" && (

                        <>

                          <button

                            onClick={() => approveLeave(leave.id)}

                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"

                          >

                            Approve

                          </button>

                          <button

                            onClick={() => {
    setSelectedLeaveId(leave.id);
    setOpenModal(true);
}}

                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"

                          >

                            Reject

                          </button>

                        </>

                      )

                    }

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>
      <FeedbackModal
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
    onSubmit={rejectLeave}
/>

    </div>

  );

}