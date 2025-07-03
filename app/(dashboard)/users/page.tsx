import { columns, User } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  const users = await res.json();
  // Map backend user fields to table fields
  return users.map((u: { name: string; email: string; role: string }) => ({
    name: u.name,
    email: u.email,
    role: u.role?.toUpperCase() || "USER",
  }));
}

export default async function UserManagementPage() {
  const data = await getUsers();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <DataTable columns={columns} data={data} filterColumn="name" />
    </div>
  );
}