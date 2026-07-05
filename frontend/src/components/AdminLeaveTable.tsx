import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import FeedbackModal from "./FeedbackModal";
import "./AdminLeaveTable.css";

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

  const [selectedLeaveId, setSelectedLeaveId] =
    useState<number | null>(null);

  const [openModal, setOpenModal] =
    useState(false);

  const approveLeave = async (id: number) => {

    try {

      await api.put(`/leave/${id}`, {
        status: "APPROVED",
        feedback: "",
      });

      toast.success("Leave Approved");

      refresh();

    } catch {

      toast.error("Unable to approve");

    }

  };

  const rejectLeave = async (
    feedback: string
  ) => {

    if (!selectedLeaveId) return;

    try {

      await api.put(`/leave/${selectedLeaveId}`, {
        status: "REJECTED",
        feedback,
      });

      toast.success("Leave Rejected");

      refresh();

      setOpenModal(false);

    } catch {

      toast.error("Unable to reject");

    }

  };

  const calculateDays = (
    start: string,
    end: string
  ) => {

    return (
      Math.ceil(
        (
          new Date(end).getTime() -
          new Date(start).getTime()
        ) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );

  };

  const formatDate = (date: string) => {

    return new Date(date).toLocaleDateString(
      "en-GB"
    );

  };

  return (

    <div className="admin-table-container">

      <div className="admin-table-header">

        <div>

          <h2>Leave Requests</h2>

          <p>
            Manage employee leave applications
          </p>

        </div>

        <div className="request-count">

          Total : {requests.length}

        </div>

      </div>

      {

        requests.length === 0 ?

        (

          <div className="empty-table">

            No Leave Requests Found

          </div>

        )

        :

        (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>#</th>

                  <th>Employee</th>

                  <th>Reason</th>

                  <th>Start Date</th>

                  <th>End Date</th>

                  <th>Days</th>

                  <th>Status</th>

                  <th>Feedback</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {

                  requests.map((leave,index)=>(

                    <tr key={leave.id}>

                      <td>{index+1}</td>

                      <td>{leave.employee_name}</td>

                      <td>{leave.leave_reason}</td>

                      <td>{formatDate(leave.start_date)}</td>

                      <td>{formatDate(leave.end_date)}</td>

                      <td>

                        {calculateDays(
                          leave.start_date,
                          leave.end_date
                        )}

                      </td>

                      <td>

                        <span
                          className={`status ${leave.status.toLowerCase()}`}
                        >

                          {leave.status}

                        </span>

                      </td>

                      <td>

                        {leave.feedback || "-"}

                      </td>

                      <td>

                        {

                          leave.status === "PENDING"

                          &&

                          <select

                            className="action-select"

                            defaultValue=""

                            onChange={(e)=>{

                              if(e.target.value==="APPROVE"){

                                approveLeave(leave.id);

                              }

                              if(e.target.value==="REJECT"){

                                setSelectedLeaveId(
                                  leave.id
                                );

                                setOpenModal(true);

                              }

                              e.target.selectedIndex=0;

                            }}

                          >

                            <option value="">

                              Choose

                            </option>

                            <option value="APPROVE">

                              Approve

                            </option>

                            <option value="REJECT">

                              Reject

                            </option>

                          </select>

                        }

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        )

      }

      <FeedbackModal

        isOpen={openModal}

        onClose={() => setOpenModal(false)}

        onSubmit={rejectLeave}

      />

    </div>

  );

}