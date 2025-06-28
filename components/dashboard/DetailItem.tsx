// file: components/dashboard/DetailItem.tsx
import React from "react";

interface DetailItemProps {
  label: string;
  value: React.ReactNode; // Use ReactNode to allow components like <Badge>
}

export const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg text-gray-900">{value}</p>
    </div>
  );
};