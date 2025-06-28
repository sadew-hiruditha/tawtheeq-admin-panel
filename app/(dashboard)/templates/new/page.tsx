"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DOMPurify from "dompurify";

export default function NewTemplatePage() {
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState(
    `<h1>Sample Contract Template</h1>
<h2>Agreement Details</h2>
<p>This is a <strong>sample contract template</strong> that demonstrates how HTML content will be rendered in the preview.</p>
<h3>Terms and Conditions</h3>
<ul>
  <li>First term of the agreement</li>
  <li>Second term with <em>emphasis</em></li>
  <li>Third term with important details</li>
</ul>
<h3>Parties Involved</h3>
<p>This agreement is between:</p>
<ol>
  <li><strong>Party A:</strong> [Originator Name]</li>
  <li><strong>Party B:</strong> [Responder Name]</li>
</ol>
<h3>Signature Section</h3>
<p>By signing below, both parties agree to the terms outlined in this contract.</p>
<div style="margin-top: 40px;">
  <p><strong>Originator Signature:</strong> _________________________</p>
  <p><strong>Date:</strong> _________________________</p>
</div>
<div style="margin-top: 20px;">
  <p><strong>Responder Signature:</strong> _________________________</p>
  <p><strong>Date:</strong> _________________________</p>
</div>`
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

  // Configure DOMPurify to allow more HTML elements and attributes for contract templates
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'b', 'em', 'i', 'u', 's', 'mark',
      'ul', 'ol', 'li',
      'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'blockquote',
      'a'
    ],
    ALLOWED_ATTR: ['style', 'class', 'href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false
  });

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
          <Card className="h-full min-h-[400px]">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Template Preview</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[600px]">
              <div
                className="contract-preview"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.6',
                  color: '#1f2937'
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .contract-preview h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          color: #111827;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .contract-preview h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
          color: #1f2937;
        }
        
        .contract-preview h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          color: #374151;
        }
        
        .contract-preview h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.875rem 0 0.5rem 0;
          color: #374151;
        }
        
        .contract-preview h5 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          color: #4b5563;
        }
        
        .contract-preview h6 {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          color: #4b5563;
        }
        
        .contract-preview p {
          margin: 0.75rem 0;
          line-height: 1.7;
        }
        
        .contract-preview ul, .contract-preview ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        
        .contract-preview li {
          margin: 0.25rem 0;
        }
        
        .contract-preview strong, .contract-preview b {
          font-weight: 600;
          color: #111827;
        }
        
        .contract-preview em, .contract-preview i {
          font-style: italic;
        }
        
        .contract-preview u {
          text-decoration: underline;
        }
        
        .contract-preview s {
          text-decoration: line-through;
        }
        
        .contract-preview mark {
          background-color: #fef3c7;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }
        
        .contract-preview blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .contract-preview hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5rem 0;
        }
        
        .contract-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .contract-preview th, .contract-preview td {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          text-align: left;
        }
        
        .contract-preview th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        
        .contract-preview a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .contract-preview a:hover {
          color: #1d4ed8;
        }
        
        .contract-preview div {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}