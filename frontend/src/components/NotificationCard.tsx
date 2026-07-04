import {
  CheckCircle2,
  XCircle,
  Clock3,
  Bell,
} from "lucide-react";

interface Props {
  history: any[];
}

export default function NotificationCard({
  history,
}: Props) {
  const latest =
    history.length > 0 ? history[0] : null;

  const renderNotification = () => {
    if (!latest) {
      return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <Bell
            className="text-gray-400"
            size={34}
          />

          <div>
            <h3 className="font-semibold text-gray-700">
              No Notifications
            </h3>

            <p className="text-sm text-gray-500">
              You don't have any updates yet.
            </p>
          </div>
        </div>
      );
    }

    switch (latest.status.toUpperCase()) {
      case "APPROVED":
        return (
          <div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-5">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2
                className="text-green-600"
                size={30}
              />
            </div>

            <div>
              <h3 className="font-semibold text-green-700 text-lg">
                Leave Approved
              </h3>

              <p className="text-gray-600 mt-1">
                Your leave request has been approved.
              </p>

              <p className="text-sm text-green-700 mt-2 font-medium">
                Enjoy your leave 🎉
              </p>
            </div>
          </div>
        );

      case "REJECTED":
        return (
          <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="rounded-full bg-red-100 p-3">
              <XCircle
                className="text-red-600"
                size={30}
              />
            </div>

            <div>
              <h3 className="font-semibold text-red-700 text-lg">
                Leave Rejected
              </h3>

              <p className="text-gray-600 mt-1">
                Reason:
              </p>

              <p className="mt-2 rounded-lg bg-white border border-red-100 p-3 text-sm text-gray-700">
                {latest.feedback || "No feedback provided."}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-start gap-4 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <div className="rounded-full bg-yellow-100 p-3">
              <Clock3
                className="text-yellow-600"
                size={30}
              />
            </div>

            <div>
              <h3 className="font-semibold text-yellow-700 text-lg">
                Pending Approval
              </h3>

              <p className="text-gray-600 mt-1">
                Your leave request is waiting for admin approval.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
          <Bell
            className="text-blue-600"
            size={22}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Latest Notification
          </h2>

          <p className="text-sm text-gray-500">
            Recent leave request update
          </p>
        </div>
      </div>

      {renderNotification()}
    </div>
  );
}