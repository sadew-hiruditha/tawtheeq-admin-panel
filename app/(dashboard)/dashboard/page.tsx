// file: app/(dashboard)/dashboard/page.tsx
"use client";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { Users, FileText, Shield, Hourglass } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient, { DashboardStats } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
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
        const [statsResponse, auditorsResponse] = await Promise.all([
          apiClient.getDashboardStats(),
          apiClient.getAuditors(),
        ]);

        let nextStats: DashboardStats = {
          totalUsers:
            statsResponse.success && statsResponse.data
              ? statsResponse.data.totalUsers
              : 0,
          totalContracts:
            statsResponse.success && statsResponse.data
              ? statsResponse.data.totalContracts
              : 0,
          activeAuditors:
            statsResponse.success && statsResponse.data
              ? statsResponse.data.activeAuditors
              : 0,
          pendingReviews:
            statsResponse.success && statsResponse.data
              ? statsResponse.data.pendingReviews
              : 0,
        };

        if (auditorsResponse.success && auditorsResponse.data) {
          nextStats = {
            ...nextStats,
            activeAuditors: auditorsResponse.data.length,
          };
        }

        setStats(nextStats);

        let combinedError = "";

        if (!statsResponse.success) {
          combinedError = statsResponse.error || "Failed to fetch dashboard stats";
        }

        if (!auditorsResponse.success) {
          const auditorError = auditorsResponse.error || "Failed to fetch auditors";
          combinedError = combinedError
            ? `${combinedError}. ${auditorError}`
            : auditorError;
        }

        setError(combinedError);
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError("Could not connect to the API server");
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
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <strong>Error:</strong> {error}
        </div>
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