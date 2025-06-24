import { columns, Template } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data function
async function getTemplates(): Promise<Template[]> {
  return [
    { id: "TMPL-001", title: "Standard Freelance Agreement", createdAt: "2024-05-10" },
    { id: "TMPL-002", title: "Non-Disclosure Agreement (NDA)", createdAt: "2024-04-22" },
  ];
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
      <DataTable columns={columns} data={data} filterColumn="title" />
    </div>
  );
}