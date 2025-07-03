// file: app/(dashboard)/dashboard/page.tsx
"use client";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { Users, FileText, Shield, Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContracts: 0,
    activeAuditors: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_URL}/stats`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch {
        setError("Could not load dashboard stats");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const analyticsData = [
    {
      title: "Total Users",
      value: loading ? "..." : stats.totalUsers.toLocaleString(),
      description: "Originators & Responders",
      Icon: Users,
    },
    {
      title: "Total Contracts",
      value: loading ? "..." : stats.totalContracts.toLocaleString(),
      description: "All contracts in the system",
      Icon: FileText,
    },
    {
      title: "Active Auditors",
      value: loading ? "..." : stats.activeAuditors.toLocaleString(),
      description: "Authorized review personnel",
      Icon: Shield,
    },
    {
      title: "Pending Reviews",
      value: loading ? "..." : stats.pendingReviews.toLocaleString(),
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
      {error && (
        <div className="text-red-500 font-semibold">{error}</div>
      )}
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