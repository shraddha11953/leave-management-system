interface DashboardCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  color = "bg-blue-600",
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h3 className="text-gray-500 text-sm mb-2">
        {title}
      </h3>

      <div
        className={`${color} text-white rounded-lg p-4`}
      >
        <p className="text-3xl font-bold">
          {value}
        </p>
      </div>

    </div>
  );
}