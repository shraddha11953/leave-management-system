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
      return `
      bg-green-100
      text-green-700
      border
      border-green-300
      `;

    case "REJECTED":
      return `
      bg-red-100
      text-red-700
      border
      border-red-300
      `;

    default:
      return `
      bg-yellow-100
      text-yellow-700
      border
      border-yellow-300
      `;
  }
};
  return (
    
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

      <div className="flex justify-between items-center mb-8">

  <h2 className="text-3xl font-bold bg-gradient-to-r bg-slate-100 text-slate-700 bg-clip-text text-transparent">
    Leave History
  </h2>

  <div className="bg-blue-50 px-4 py-2 rounded-xl">

    <span className="text-blue-700 font-semibold">
      Total Requests : {history.length}
    </span>

  </div>

</div>

      {
        history.length === 0 ? (

          <div className="text-center py-16">

  <h3 className="text-xl font-semibold text-gray-500">
    No Leave Requests Found
  </h3>

  <p className="text-gray-400 mt-2">
    Your leave requests will appear here.
  </p>

</div>

        ) : (

          
            <div className="overflow-x-auto rounded-2xl border border-gray-200">

            <table className="w-full border-collapse bg-white">

              <thead>
  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

    <th className="border border-gray-300 px-6 py-5">
      Sr No
    </th>

    <th className="border border-gray-300 px-6 py-5">
      Reason
    </th>

    <th className="border border-gray-300 px-6 py-5">
      Start Date
    </th>

    <th className="border border-gray-300 px-6 py-5">
      End Date
    </th>
<th className="border border-gray-300 px-6 py-5 text-center">
Total Days
</th>
    <th className="border border-gray-300 px-6 py-5">
      Status
    </th>

    <th className="border border-gray-300 px-6 py-5">
      Feedback
    </th>

  </tr>
</thead>
              <tbody>

{
  history.map((leave, index) => (

    <tr
      key={leave.id}
      className="
      border-b
      even:bg-gray-50
      hover:bg-blue-50
      transition-all
      duration-200
      "
    >

      <td className="px-6 py-6 text-center font-semibold text-gray-600">
        {index + 1}
      </td>

      <td className="px-6 py-6 font-medium text-gray-700">
        {leave.leave_reason}
      </td>

      <td className="px-6 py-6 text-center text-gray-600">
        {leave.start_date}
      </td>

      <td className="px-6 py-6 text-center text-gray-600">
        {leave.end_date}
      </td>

      <td className="border border-gray-200 px-6 py-5 text-center">

{Math.ceil(
(
new Date(leave.end_date).getTime() -
new Date(leave.start_date).getTime()
)
/ (1000*60*60*24)
)+1}

</td>

      <td className="px-6 py-6 text-center">

        <span
          className={`
            px-4 py-2
            rounded-full
            text-sm
            font-semibold
            shadow-sm
            ${getStatusColor(leave.status)}
          `}
        >
          {leave.status}
        </span>

      </td>

      <td className="px-6 py-6 text-center text-gray-600">

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