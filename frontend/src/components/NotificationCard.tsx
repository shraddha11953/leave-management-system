import {
  Bell,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import "./NotificationCard.css";

interface Leave {
  status: string;
  feedback?: string;
}

interface Props {
  history: Leave[];
}

export default function NotificationCard({
  history,
}: Props) {

  const latest =
    history.length > 0 ? history[0] : null;

  const getNotification = () => {

    if (!latest) {

      return {
        title: "No Notifications",
        message: "You don't have any leave updates yet.",
        icon: <Bell size={28} />,
        status: "blue",
      };

    }

    switch (latest.status.toUpperCase()) {

      case "APPROVED":

        return {
          title: "Leave Approved",
          message:
            "Your leave request has been approved successfully. Enjoy your leave!",
          icon: <CheckCircle2 size={28} />,
          status: "green",
        };

      case "REJECTED":

        return {
          title: "Leave Rejected",
          message:
            latest.feedback ||
            "Your leave request was rejected by the administrator.",
          icon: <XCircle size={28} />,
          status: "red",
        };

      default:

        return {
          title: "Pending Approval",
          message:
            "Your leave request is waiting for administrator approval.",
          icon: <Clock3 size={28} />,
          status: "yellow",
        };
    }

  };

  const notification = getNotification();

  return (

    <div className={`notification-card ${notification.status}`}>

      <div className="notification-header">

        <div className="notification-title">

          <div className="bell-box">

            <Bell size={22} />

          </div>

          <div>

            <h2>Latest Notification</h2>

            <p>Recent Leave Request Update</p>

          </div>

        </div>

        {

          latest &&

          <span className={`status-badge ${notification.status}`}>

            {latest.status}

          </span>

        }

      </div>

      <div className="notification-body">

        <div className={`icon-circle ${notification.status}`}>

          {notification.icon}

        </div>

        <div>

          <h3>{notification.title}</h3>

          <p>{notification.message}</p>

        </div>

      </div>

    </div>

  );

}