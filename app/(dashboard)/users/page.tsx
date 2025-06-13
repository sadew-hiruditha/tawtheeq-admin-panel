import { columns, User } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";

async function getUsers(): Promise<User[]> {
  return [
    { id: "USR-001", name: "Alice Johnson", email: "alice@example.com", role: "RESPONDER" },
    { id: "USR-002", name: "Innovate Inc.", email: "contact@innovate.com", role: "ORIGINATOR" },
  ];
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