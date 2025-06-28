// file: app/(dashboard)/dashboard/page.tsx
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { Users, FileText, Shield, Hourglass } from "lucide-react";

export default function AdminDashboardPage() {
  // Mock data for our analytics cards. This will come from an API later.
  const analyticsData = [
    {
      title: "Total Users",
      value: "1,258",
      description: "Originators & Responders",
      Icon: Users,
    },
    {
      title: "Total Contracts",
      value: "4,821",
      description: "All contracts in the system",
      Icon: FileText,
    },
    {
      title: "Active Auditors",
      value: "12",
      description: "Authorized review personnel",
      Icon: Shield,
    },
    {
      title: "Pending Reviews",
      value: "42",
      description: "Contracts awaiting auditor action",
      Icon: Hourglass,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 mb-6 text-lg text-gray-600">
          A high-level overview of the Tawtheeq platform.
        </p>
      </div>

      {/* Responsive Grid for Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((stat) => (
          <AnalyticsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            Icon={stat.Icon}
          />
        ))}
      </div>

      {/* Container for future charts and tables */}
      <div className="mt-8">
        {/* We will add a contracts table or charts here next */}
      </div>
    </div>
  );
}