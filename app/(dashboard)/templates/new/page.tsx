"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DOMPurify from "dompurify";

export default function NewTemplatePage() {
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState(
    "<h1>Template Preview</h1><p>Your contract preview will appear here when you paste or upload HTML content.</p>"
  );

  // Handles reading the content of a selected .html file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setHtmlContent(text);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .html file.");
    }
  };

  // Handles saving the template (sends data to the console for now)
  const handleSave = () => {
    if (!title || !htmlContent) {
      alert("Please provide a title and HTML content before saving.");
      return;
    }
    // In a real application, you would send this data to your backend API
    console.log("Saving Template Data...");
    console.log({
      title: title,
      htmlContent: htmlContent, // The raw, unsanitized HTML for storage
    });
    alert("Template saved! Check your browser's developer console for the output.");
  };

  // CRITICAL: Sanitize the HTML before rendering it in the preview to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Contract Template</h1>
        <Button onClick={handleSave} size="lg">Save Template</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* === LEFT COLUMN: INPUTS === */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="template-title" className="text-lg font-semibold">
              Template Title
            </Label>
            <Input
              id="template-title"
              placeholder="e.g., General Service Agreement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Tabs defaultValue="paste" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="paste">Paste HTML</TabsTrigger>
              <TabsTrigger value="upload">Upload .html File</TabsTrigger>
            </TabsList>
            <TabsContent value="paste" className="mt-4">
              <Label htmlFor="html-paste" className="font-semibold">
                Paste your HTML code below:
              </Label>
              <Textarea
                id="html-paste"
                className="mt-2 font-mono h-80"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="<html>...</html>"
              />
            </TabsContent>
            <TabsContent value="upload" className="mt-4">
              <Label htmlFor="html-upload" className="font-semibold">
                Or upload a single HTML file:
              </Label>
              <Input
                id="html-upload"
                type="file"
                accept=".html,text/html"
                className="mt-2 file:text-foreground"
                onChange={handleFileChange}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* === RIGHT COLUMN: PREVIEW === */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">Live Preview</Label>
          <Card className="h-full min-h-[400px] overflow-auto">
            <CardContent className="p-6 prose prose-lg">
              <div
                // This is safe to use BECAUSE we are passing the `sanitizedHtml` variable
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}