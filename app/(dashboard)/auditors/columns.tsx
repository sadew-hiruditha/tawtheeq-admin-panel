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
import Link from "next/link";


export type Auditor = {
  id: string;
  name: string;
  email: string;
  status: string; // Changed from union type to string for flexibility
};

export const createColumns = (): ColumnDef<Auditor>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const auditor = row.original;
      return (
        <Link
          href={`/auditors/${auditor.id}`}
          className="text-blue-600 hover:underline"
        >
          {auditor.name}
        </Link>
      );
    },
  },
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

      const handleViewDetails = () => {
        window.location.href = `/auditors/${auditor.id}`;
      };

      const handleSuspend = () => {
        console.log(`Suspending auditor: ${auditor.name}`);
        alert(`Suspending auditor: ${auditor.name}`);
      };

      const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete auditor: ${auditor.name}?`)) {
          console.log(`Deleting auditor: ${auditor.name}`);
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
            <DropdownMenuItem onClick={handleViewDetails}>
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

export const columns = createColumns();