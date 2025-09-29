"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuditorFormState {
  name: string;
  email: string;
  phone_no: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  government_id: string;
  certification_number: string;
  firm_name: string;
  specialty_area: string;
  years_experience: string;
  website_url: string;
}

const INITIAL_FORM: AuditorFormState = {
  name: "",
  email: "",
  phone_no: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  government_id: "",
  certification_number: "",
  firm_name: "",
  specialty_area: "",
  years_experience: "",
  website_url: "",
};

export default function CreateAuditorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<AuditorFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (field: keyof AuditorFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    const endpoint = "https://tawtheeq-app-de43b24218ea.herokuapp.com/api/auditors";

    const payload = {
      name: formData.name,
      email: formData.email,
      phone_no: formData.phone_no,
      address_line1: formData.address_line1,
      address_line2: formData.address_line2,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postal_code,
      country: formData.country,
      government_id: formData.government_id,
      certification_number: formData.certification_number,
      firm_name: formData.firm_name,
      specialty_area: formData.specialty_area,
      years_experience: Number(formData.years_experience) || 0,
      website_url: formData.website_url,
    };

    const submit = async () => {
      try {
        setSubmitting(true);
        setStatus(null);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          let userMessage = "Failed to create auditor";
          
          try {
            const errorData = JSON.parse(errorText);
            if (errorData.message === "Email already exists") {
              userMessage = "An auditor with this email already exists. Please use a different email.";
            } else if (errorData.error && errorData.error.includes("email already exists")) {
              userMessage = "An auditor with this email already exists. Please use a different email.";
            } else if (errorData.message) {
              userMessage = errorData.message;
            }
          } catch {
            // If it's not JSON, use the raw text but make it more user-friendly
            if (errorText.toLowerCase().includes("email")) {
              userMessage = "There was an issue with the email address. Please check and try again.";
            }
          }
          
          throw new Error(userMessage);
        }

        setStatus({ type: "success", message: "Auditor created successfully." });
        setFormData(INITIAL_FORM);
        // Scroll to bottom to show success message
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } catch (error) {
        console.error("Auditor creation failed", error);
        const message = error instanceof Error ? error.message : "Failed to create auditor";
        setStatus({ type: "error", message });
        // Scroll to bottom to show error message
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } finally {
        setSubmitting(false);
      }
    };

    void submit();
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setStatus(null);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Create New Auditor</h1>
          <p className="text-gray-600 mt-1">
            Enter the auditor&apos;s professional details. Submitting will send the data to the live API.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>

      <form id="create-auditor-form" className="grid gap-6" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Dr. Sofia Johnson"
                value={formData.name}
                onChange={handleChange("name")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="sofia.johnson@legalaudit.com"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_no">Phone Number</Label>
              <Input
                id="phone_no"
                placeholder="+1234567890"
                value={formData.phone_no}
                onChange={handleChange("phone_no")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url">Website</Label>
              <Input
                id="website_url"
                type="url"
                placeholder="https://www.johnsonlegalaudit.com"
                value={formData.website_url}
                onChange={handleChange("website_url")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address_line1">Address Line 1</Label>
              <Input
                id="address_line1"
                placeholder="456 Legal Plaza"
                value={formData.address_line1}
                onChange={handleChange("address_line1")}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address_line2">Address Line 2</Label>
              <Input
                id="address_line2"
                placeholder="Suite 789"
                value={formData.address_line2}
                onChange={handleChange("address_line2")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Los Angeles"
                value={formData.city}
                onChange={handleChange("city")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                placeholder="CA"
                value={formData.state}
                onChange={handleChange("state")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                placeholder="90210"
                value={formData.postal_code}
                onChange={handleChange("postal_code")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="United States"
                value={formData.country}
                onChange={handleChange("country")}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="government_id">Government ID</Label>
              <Input
                id="government_id"
                placeholder="987-65-4321"
                value={formData.government_id}
                onChange={handleChange("government_id")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certification_number">Certification Number</Label>
              <Input
                id="certification_number"
                placeholder="CPA-67890"
                value={formData.certification_number}
                onChange={handleChange("certification_number")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firm_name">Firm Name</Label>
              <Input
                id="firm_name"
                placeholder="Johnson Legal Audit Services"
                value={formData.firm_name}
                onChange={handleChange("firm_name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Experience</Label>
              <Input
                id="years_experience"
                type="number"
                min="0"
                placeholder="12"
                value={formData.years_experience}
                onChange={handleChange("years_experience")}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specialty_area">Specialty Area</Label>
              <Textarea
                id="specialty_area"
                placeholder="Contract Law, Corporate Compliance, Financial Auditing"
                value={formData.specialty_area}
                onChange={handleChange("specialty_area")}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset Form
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Auditor"}
          </Button>
        </div>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Quick Preview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Primary Contact</h3>
            <p className="text-lg font-medium text-gray-900">{formData.name || "Full name"}</p>
            <p className="text-gray-600">{formData.email || "email@example.com"}</p>
            <p className="text-gray-600">{formData.phone_no || "+000000000"}</p>
            <p className="text-blue-600">{formData.website_url || "Website URL"}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Professional Snapshot</h3>
            <p className="text-gray-900 font-medium">{formData.firm_name || "Firm name"}</p>
            <p className="text-gray-600">
              {formData.specialty_area || "Specialty areas will appear here."}
            </p>
            <p className="text-gray-600">
              {formData.years_experience
                ? `${formData.years_experience} years experience`
                : "Experience not provided yet."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status message placed at the bottom where users can see it */}
      {status && (
        <div
          className={`border rounded-md px-4 py-3 flex items-center gap-3 ${
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
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
