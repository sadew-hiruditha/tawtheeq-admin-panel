import { columns, User } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import apiClient from "@/lib/api";

async function getUsers(): Promise<User[]> {
  try {
    const response = await apiClient.getUsers();
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to fetch users");
    }

    // Map backend user fields to table fields
    return response.data.map((u) => ({
      id: u.user_id,
      name: u.name,
      email: u.email || 'N/A',
      role: u.role?.toUpperCase() || "USER",
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    // Return empty array or mock data for development
    return [];
  }
}

export default async function UserManagementPage() {
  const data = await getUsers();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      {data.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          <p>No users found. Make sure the API server is running at http://localhost:6060/api</p>
        </div>
      ) : (
        <DataTable columns={columns} data={data} filterColumn="name" />
      )}
    </div>
  );
}