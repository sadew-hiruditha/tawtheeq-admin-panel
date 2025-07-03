import { columns, Auditor } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";

async function getAuditors(): Promise<Auditor[]> {
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch auditors");
  const users = await res.json();
  // Filter users with role 'lawyer' and map to Auditor type
  return users
    .filter((u: { role: string }) => u.role === "lawyer")
    .map((u: { name: string; email: string; role: string }) => ({
      name: u.name,
      email: u.email,
      status: "Active", // You can adjust this logic if you have a real status field
    }));
}

export default async function AuditorManagementPage() {
  const data = await getAuditors();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Auditor Management</h1>
      <DataTable columns={columns} data={data} filterColumn="name" />
    </div>
  );
}