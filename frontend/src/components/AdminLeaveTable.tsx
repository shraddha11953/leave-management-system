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

      <h2 className="text-2xl font-bold text-slate-800 mb-10">

        Leave Requests

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border border-slate-300 rounded-xl overflow-hidden border-collapse">
          <thead>

            <tr className="bg-slate-100 text-slate-700">
              <th className="p-3 border">Sr No</th>

              <th className="px-4 py-4 border border-slate-300">
                Employee
              </th>

              <th className="px-4 py-4 border border-slate-300">
                Reason
              </th>

              <th className="px-4 py-4 border border-slate-300">
                Start
              </th>

              <th className="px-4 py-4 border border-slate-300">
                End
              </th>
              <th className="px-4 py-4 border border-slate-300">
  Total Days
</th>

              <th className="px-4 py-4 border border-slate-300">
                Status
              </th>

              <th className="px-4 py-4 border border-slate-300">
                Feedback
              </th>

              <th className="px-4 py-4 border border-slate-300">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {

              requests.map((leave,index) => (

                <tr
                  key={leave.id}
                  className="hover:bg-slate-50 transition"
                >
                  <td className="p-3 border text-center">
  {index + 1}
</td>
                  <td className="p-3 border border-slate-200">

                    {leave.employee_name}

                  </td>

                  <td className="p-3 border border-slate-200">

                    {leave.leave_reason}

                  </td>

                  <td className="p-3 border border-slate-200">

                    {leave.start_date}

                  </td>

                  <td className="p-3 border border-slate-200">

                    {leave.end_date}

                  </td>

                  <td className="p-3 border text-center">

  {Math.ceil(
    (
      new Date(leave.end_date).getTime() -
      new Date(leave.start_date).getTime()
    ) /
      (1000 * 60 * 60 * 24)
  ) + 1}

</td>

                  <td className="p-3 border border-slate-200">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>

                  </td>

                  <td className="px-4 py-4 border border-slate-200 max-w-[280px] text-sm leading-6 break-words">

                    {

                      leave.feedback
                        ? leave.feedback
                        : "-"

                    }

                  </td>

                  <td className="px-4 py-4 border border-slate-200 text-center">
{
leave.status==="PENDING" && (

<select
className="border rounded-lg px-3 py-2 bg-white shadow-sm"
defaultValue=""
onChange={(e)=>{

if(e.target.value==="APPROVE")
approveLeave(leave.id);

if(e.target.value==="REJECT"){
setSelectedLeaveId(leave.id);
setOpenModal(true);
}

e.target.selectedIndex=0;

}}
>

<option value="">
Choose
</option>

<option value="APPROVE">
✅ Approve
</option>

<option value="REJECT">
❌ Reject
</option>

</select>

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