import "./DashboardCard.css";

interface DashboardCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  color = "blue",
}: DashboardCardProps) {

  return (

    <div className={`dashboard-card ${color}`}>

      <div className="dashboard-card-top">

        <h4>{title}</h4>

      </div>

      <h2>{value}</h2>

    </div>

  );
}