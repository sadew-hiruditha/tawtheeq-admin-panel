import { columns, Template } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import apiClient from "@/lib/api";

// Updated function to use API client
async function getTemplates(): Promise<Template[]> {
  try {
    const response = await apiClient.getTemplates();
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to fetch templates");
    }

    return response.data.map((template) => ({
      id: template.id,
      title: template.name,
      createdAt: template.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching templates:", error);
    // Return mock data for development
    return [
      { id: "TMPL-001", title: "Standard Freelance Agreement", createdAt: "2024-05-10" },
      { id: "TMPL-002", title: "Non-Disclosure Agreement (NDA)", createdAt: "2024-04-22" },
    ];
  }
}

export default async function ManageTemplatesPage() {
  const data = await getTemplates();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Contract Templates</h1>
        <Button asChild>
          <Link href="/templates/new">Add New Template</Link>
        </Button>
      </div>
      {data.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          <p>No templates found. Make sure the API server is running at http://localhost:6060/api</p>
        </div>
      ) : (
        <DataTable columns={columns} data={data} filterColumn="title" />
      )}
    </div>
  );
}