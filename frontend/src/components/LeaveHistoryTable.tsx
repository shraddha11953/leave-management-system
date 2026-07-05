import "./LeaveHistoryTable.css";

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

  const getStatusClass = (status: string): string => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return "status approved";

      case "REJECTED":
        return "status rejected";

      default:
        return "status pending";
    }
  };

  const calculateDays = (
    startDate: string,
    endDate: string
  ): number => {

    const diff =
      new Date(endDate).getTime() -
      new Date(startDate).getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (

    <div className="history-container">

      <div className="history-header">

        <div>

          <h2>Leave History</h2>

          <p>Track all your leave requests</p>

        </div>

        <div className="history-count">

          Total Requests : {history.length}

        </div>

      </div>

      {

        history.length === 0 ?

        (

          <div className="empty-history">

            <h3>No Leave Requests Found</h3>

            <p>Your leave requests will appear here.</p>

          </div>

        )

        :

        (

          <div className="table-wrapper">

            <table className="history-table">

              <thead>

                <tr>

                  <th>Sr No</th>

                  <th>Reason</th>

                  <th>Start Date</th>

                  <th>End Date</th>

                  <th>Total Days</th>

                  <th>Status</th>

                  <th>Feedback</th>

                </tr>

              </thead>

              <tbody>

                {

                  history.map((leave,index)=>(

                    <tr key={leave.id}>

                      <td>{index+1}</td>

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
                          className={getStatusClass(leave.status)}
                        >
                          {leave.status}
                        </span>

                      </td>

                      <td>

                        {leave.feedback || "-"}

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