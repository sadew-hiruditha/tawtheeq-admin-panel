// file: app/(dashboard)/contracts/[id]/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DetailItem } from "@/components/dashboard/DetailItem"; // <-- Import our new component
import { FileText, User, Users } from "lucide-react";

interface ContractDetailPageProps {
  params: {
    id: string;
  };
}

// Mock function to get a single contract by ID.
// In the future, this will be a real database call.
const getContractById = async (id: string) => {
  // Simulating a database lookup
  if (id === "CTR-001") {
    return {
      id: "CTR-001",
      title: "Website Redesign",
      status: "Completed",
      originator: { name: "Innovate Inc.", email: "contact@innovate.com" },
      responder: { name: "Alice Johnson", email: "alice@example.com" },
      createdAt: "2024-05-15",
      updatedAt: "2024-05-18",
      documentHash: "a1b2c3d4e5f6...",
      blockchainTx: "0x123...abc",
    };
  }
  // Return a default/not-found state for other IDs
  return {
    id: id,
    title: "Contract Not Found",
    status: "Disputed",
    originator: { name: "N/A", email: "N/A" },
    responder: { name: "N/A", email: "N/A" },
    createdAt: "N/A",
    updatedAt: "N/A",
    documentHash: "N/A",
    blockchainTx: "N/A",
  };
};

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "Pending": return "secondary";
      case "Disputed": return "destructive";
      default: return "outline";
    }
};

export default async function ContractDetailPage({ params }: ContractDetailPageProps) {
  const contract = await getContractById(params.id);
  const statusBadge = <Badge variant={getStatusBadgeVariant(contract.status)}>{contract.status}</Badge>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{contract.title}</h1>
          <p className="text-lg text-muted-foreground mt-1">
            Contract ID: <span className="font-mono bg-gray-100 p-1 rounded-md">{params.id}</span>
          </p>
        </div>
        <Button asChild>
          <Link href="/contracts">Back to All Contracts</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column for main details */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contract Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Status" value={statusBadge} />
              <DetailItem label="Created At" value={contract.createdAt} />
              <DetailItem label="Last Updated" value={contract.updatedAt} />
              <DetailItem label="Document Hash (SHA-256)" value={<span className="font-mono text-sm">{contract.documentHash}</span>} />
              <DetailItem label="Blockchain Transaction" value={<span className="font-mono text-sm">{contract.blockchainTx}</span>} />
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle>Associated Document</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-8">
                <FileText className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="font-semibold">contract_agreement.pdf</h3>
                <p className="text-sm text-muted-foreground mb-4">Signed on {contract.updatedAt}</p>
                <Button>Download Document</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column for parties involved */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <User className="w-6 h-6"/>
                <CardTitle>Originator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailItem label="Name" value={contract.originator.name} />
              <DetailItem label="Email" value={contract.originator.email} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <Users className="w-6 h-6"/>
                <CardTitle>Responder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailItem label="Name" value={contract.responder.name} />
              <DetailItem label="Email" value={contract.responder.email} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}