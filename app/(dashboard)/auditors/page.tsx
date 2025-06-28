import { columns, Auditor } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";

async function getAuditors(): Promise<Auditor[]> {
  return [
    { id: "AUD-001", name: "Admin Auditor", email: "auditor@tawtheeq.com", status: "Active" },
    { id: "AUD-002", name: "External Reviewer", email: "reviewer@auditfirm.com", status: "Inactive" },
  ];
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