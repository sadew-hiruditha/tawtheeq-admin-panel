// file: app/(dashboard)/users/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, // Import Separator for visual grouping
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the shape of our User data
export type User = {
  id: string; // Add ID back for navigation
  name: string;
  email: string;
  role: string; // Changed from union type to string for flexibility
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link 
          href={`/users/${user.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          {user.name}
        </Link>
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge>{row.getValue("role")}</Badge>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const handleSuspend = () => {
        // Placeholder for backend logic
        console.log(`Suspending user: ${user.name}`);
        alert(`Suspending user: ${user.name}`);
      };

      const handleDelete = () => {
        // Add a confirmation dialog for destructive actions
        if (window.confirm(`Are you sure you want to delete user: ${user.name}?`)) {
          // Placeholder for backend logic
          console.log(`Deleting user: ${user.name}`);
          alert(`Deleting user: ${user.name}`);
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
            <DropdownMenuItem asChild>
              <Link href={`/users/${user.id}`}>
                View User Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSuspend}>
              Suspend User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600 focus:bg-red-50 focus:text-red-700"
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];