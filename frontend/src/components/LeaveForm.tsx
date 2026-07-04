import { useState } from "react";

import api from "../services/api";
import { toast } from "react-toastify";

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
      await api.post(
        "/leave/apply",
        {
          employee_id: employeeId,
          leave_reason: leaveReason,
          start_date: startDate,
          end_date: endDate,
        }
      );

      toast.success("Leave Applied Successfully 🎉");

      setLeaveReason("");
      setStartDate("");
      setEndDate("");

      refresh();
      close();
    } catch (error) {
      toast.error("Unable to apply leave");
    }
  };

  return (
    <div className="mt-8 bg-white shadow-lg rounded-xl p-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Apply Leave
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="font-semibold">
            Leave Reason
          </label>

          <textarea
            value={leaveReason}
            onChange={(e) =>
              setLeaveReason(e.target.value)
            }
            rows={4}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Enter Leave Reason"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-semibold">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

        </div>

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={close}
            className="px-6 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Leave
          </button>

        </div>

      </form>

    </div>
  );
}