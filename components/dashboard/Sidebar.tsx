// file: components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Shield, // A great icon for Auditors
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  // Navigation links tailored for the Admin Panel
  const navLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/contracts", icon: FileText, label: "Contracts" },
    { href: "/users", icon: Users, label: "User Management" },
    { href: "/auditors", icon: Shield, label: "Auditor Management" },
  ];

  return (
    <aside className="hidden w-64 flex-col bg-gray-50 p-4 md:flex border-r">
      <div className="flex-grow">
        <div className="mb-8 flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Tawtheeq Admin</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 ${
                pathname.startsWith(link.href)
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : ""
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t pt-4">
        <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;