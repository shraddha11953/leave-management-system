interface DashboardCardProps {
  title: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}

export default function DashboardCard({
  title,
  value,
  color = "bg-blue-100",
  icon,
}: DashboardCardProps) {
  return (
    <div
      className={`${color} rounded-2xl p-6 shadow-md border border-slate-200
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow text-3xl">
          {icon}
        </div>

      </div>
    </div>
  );
}