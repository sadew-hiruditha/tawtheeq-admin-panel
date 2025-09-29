import { columns, Auditor } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import apiClient from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateAuditorButton } from "./CreateAuditorButton";

async function getAuditors(): Promise<Auditor[]> {
  try {
    const response = await apiClient.getAuditors();
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to fetch auditors");
    }

    return response.data.map((auditor) => ({
      id: auditor.id,
      name: auditor.name,
      email: auditor.email,
      status: auditor.status,
    }));
  } catch (error) {
    console.error("Error fetching auditors:", error);
    // Return empty array for development
    return [];
  }
}

export default async function AuditorManagementPage() {
  const data = await getAuditors();
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Auditor Management</h1>
        <div className="flex items-center gap-3">
          <CreateAuditorButton />
          <Button asChild>
            <Link href="/auditors/new">New Auditor Form</Link>
          </Button>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          <p>No auditors found. Make sure the API server is running at http://localhost:6060/api</p>
        </div>
      ) : (
        <DataTable columns={columns} data={data} filterColumn="name" />
      )}
    </div>
  );
}