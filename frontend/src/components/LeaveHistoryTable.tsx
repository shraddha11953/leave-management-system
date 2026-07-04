interface Leave {
  id: number;
  leave_reason: string;
  start_date: string;
  end_date: string;
  status: string;
  feedback?: string;
}

interface LeaveHistoryTableProps {
  history: Leave[];
}

export default function LeaveHistoryTable({
  history,
}: LeaveHistoryTableProps) {

  const getStatusColor = (status: string) => {
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

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-blue-700">
          Leave History
        </h2>

        <span className="text-gray-500">
          Total Requests : {history.length}
        </span>

      </div>

      {
        history.length === 0 ? (

          <div className="text-center py-10 text-gray-500">

            No Leave Requests Found

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-3 text-left">
                    Reason
                  </th>

                  <th className="p-3 text-center">
                    Start Date
                  </th>

                  <th className="p-3 text-center">
                    End Date
                  </th>

                  <th className="p-3 text-center">
                    Status
                  </th>

                  <th className="p-3 text-center">
                    Feedback
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  history.map((leave) => (

                    <tr
                      key={leave.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">
                        {leave.leave_reason}
                      </td>

                      <td className="p-3 text-center">
                        {leave.start_date}
                      </td>

                      <td className="p-3 text-center">
                        {leave.end_date}
                      </td>

                      <td className="p-3 text-center">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            leave.status
                          )}`}
                        >
                          {leave.status}
                        </span>

                      </td>

                      <td className="p-3 text-center">

                        {

                          leave.feedback
                            ? leave.feedback
                            : "-"

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

    </div>
  );
}