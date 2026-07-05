import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "./LeaveForm.css";

interface LeaveFormProps {
  employeeId: number;
  refresh: () => void;
  close: () => void;
}

export default function LeaveForm({
  employeeId,
  refresh,
  close,
}: LeaveFormProps) {
  const [leaveReason, setLeaveReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End Date should be after Start Date");
      return;
    }

    try {
      await api.post("/leave/apply", {
        employee_id: employeeId,
        leave_reason: leaveReason,
        start_date: startDate,
        end_date: endDate,
      });

      toast.success("Leave Applied Successfully 🎉");

      setLeaveReason("");
      setStartDate("");
      setEndDate("");

      refresh();
      close();
    } catch {
      toast.error("Unable to apply leave");
    }
  };

  return (
    <div className="leave-form-container">

      <div className="leave-form-header">

        <h2>Apply Leave</h2>

        <p>
          Fill in the details below to submit your leave request.
        </p>

      </div>

      <form
        className="leave-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Leave Reason</label>

          <textarea
            rows={5}
            placeholder="Enter your leave reason..."
            value={leaveReason}
            onChange={(e) =>
              setLeaveReason(e.target.value)
            }
            required
          />

        </div>

        <div className="date-row">

          <div className="form-group">

            <label>Start Date</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>End Date</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              required
            />

          </div>

        </div>

        <div className="button-group">

          <button
            type="button"
            className="cancel-btn"
            onClick={close}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="apply-btn"
          >
            Apply Leave
          </button>

        </div>

      </form>

    </div>
  );
}