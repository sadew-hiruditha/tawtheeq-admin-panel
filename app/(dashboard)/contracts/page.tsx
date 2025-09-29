// file: app/(dashboard)/contracts/page.tsx
import { columns, Contract } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api";

async function getContracts(): Promise<Contract[]> {
  try {
    const response = await apiClient.getContracts();
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to fetch contracts");
    }

    return response.data.map((contract) => ({
      id: contract.id,
      title: contract.title,
      originator: contract.originator,
      responder: contract.responder,
      status: contract.status,
      createdAt: contract.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching contracts:", error);
    // Return mock data for development
    return [
      {
        id: "CTR-001",
        title: "Website Redesign",
        originator: "Innovate Inc.",
        responder: "Alice Johnson",
        status: "Completed",
        createdAt: "2024-05-15",
      },
      {
        id: "CTR-002",
        title: "Mobile App Development",
        originator: "Tech Solutions LLC",
        responder: "Bob Williams",
        status: "Pending",
        createdAt: "2024-05-20",
      },
      {
        id: "CTR-003",
        title: "Brand Logo Design",
        originator: "Creative Minds",
        responder: "Charlie Brown",
        status: "Disputed",
        createdAt: "2024-05-18",
      },
    ];
  }
}

export default async function ContractsPage() {
  const data = await getContracts();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Contract Management</h1>
          <Button>Create New Contract</Button>
      </div>
      {data.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          <p>No contracts found. Make sure the API server is running at http://localhost:6060/api</p>
        </div>
      ) : (
        <DataTable columns={columns} data={data} filterColumn="title" />
      )}
    </div>
  );
}