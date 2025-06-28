// file: app/(dashboard)/auditors/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export type Auditor = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
};

export const columns: ColumnDef<Auditor>[] = [
  { accessorKey: "id", header: "Auditor ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const auditor = row.original;

      const handleSuspend = () => {
        console.log(`Suspending auditor: ${auditor.id}`);
        alert(`Suspending auditor: ${auditor.name}`);
      };

      const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete auditor: ${auditor.name}?`)) {
          console.log(`Deleting auditor: ${auditor.id}`);
          alert(`Deleting auditor: ${auditor.name}`);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Viewing details for ${auditor.name}`)}>
              View Auditor Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSuspend}>
              Suspend Auditor
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600 focus:bg-red-50 focus:text-red-700"
            >
              Delete Auditor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];