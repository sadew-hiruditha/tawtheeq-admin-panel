"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ENDPOINT = "https://tawtheeq-app-de43b24218ea.herokuapp.com/api/auditors";

const SAMPLE_PAYLOAD = {
  name: "Dr. Sofia Johnson",
  email: "sarahe.johnson@legalaudit.com",
  phone_no: "+123456890",
  address_line1: "456 Legal Plaza",
  address_line2: "Suite 789",
  city: "Los Angeles",
  state: "CA",
  postal_code: "90210",
  country: "United States",
  government_id: "987-65-4321",
  certification_number: "CPA-67890",
  firm_name: "Johnson Legal Audit Services",
  specialty_area: "Contract Law, Corporate Compliance, Financial Auditing",
  years_experience: 12,
  website_url: "https://www.johnsonlegalaudit.com",
};

export function CreateAuditorButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleClick = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setStatus(null);
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SAMPLE_PAYLOAD),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let userMessage = "Failed to create auditor";
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message === "Email already exists") {
            userMessage = "An auditor with this email already exists.";
          } else if (errorData.error && errorData.error.includes("email already exists")) {
            userMessage = "An auditor with this email already exists.";
          } else if (errorData.message) {
            userMessage = errorData.message;
          }
        } catch {
          // If it's not JSON, use a more user-friendly message
          if (errorText.toLowerCase().includes("email")) {
            userMessage = "There was an issue with the email address.";
          }
        }
        
        throw new Error(userMessage);
      }

      setStatus({ type: "success", message: "Auditor created successfully." });
    } catch (error) {
      console.error("Create auditor failed", error);
      const message = error instanceof Error ? error.message : "Failed to create auditor";
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <Button onClick={handleClick} disabled={loading} variant="outline">
        {loading ? "Creating..." : "Quick Create"}
      </Button>
      {status && (
        <div
          className={`text-sm flex items-center gap-2 ${
            status.type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          <Badge variant={status.type === "success" ? "default" : "outline"}>
            {status.type === "success" ? "Success" : "Notice"}
          </Badge>
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}
