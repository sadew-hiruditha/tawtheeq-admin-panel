"use client";
import { useParams, useRouter } from 'next/navigation';
import { useAuditor } from '@/lib/hooks';
import { User } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MapPin, User as UserIcon, Globe, IdCard, Briefcase, Award, Calendar } from 'lucide-react';

export default function AuditorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const auditorId = params.id as string;
  
  const { data: auditor, loading, error } = useAuditor(auditorId);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Loading Auditor Details...</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Auditor Details</h1>
        </div>
        <Card className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        </Card>
      </div>
    );
  }

  if (!auditor) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Auditor Not Found</h1>
        </div>
        <Card className="p-6">
          <p className="text-gray-600">The requested auditor could not be found.</p>
        </Card>
      </div>
    );
  }

  // Handle case where auditor might be wrapped in response object
  let actualAuditor = auditor;
  if (auditor && 'data' in auditor && auditor.data) {
    actualAuditor = auditor.data as User;
  }

  const roleLabel = actualAuditor?.role ? actualAuditor.role.toUpperCase() : 'AUDITOR';
  const phoneDisplay = actualAuditor?.phone_no || 'Not provided';
  const governmentId = actualAuditor?.government_id || 'Not provided';
  const addressLine1 = actualAuditor?.address_line1 || 'Not provided';
  const addressLine2 = actualAuditor?.address_line2 || '';
  const city = actualAuditor?.city || 'Not provided';
  const state = actualAuditor?.state || 'Not provided';
  const postalCode = actualAuditor?.postal_code || 'Not provided';
  const country = actualAuditor?.country || 'Not provided';

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{actualAuditor?.name || 'No Name'}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">
              {roleLabel}
            </Badge>
            <span className="text-gray-600 flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {phoneDisplay}
            </span>
          </div>
        </div>
      </div>

      {/* Auditor Details Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-gray-900">{actualAuditor?.name || 'No name available'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{actualAuditor?.email || 'No email available'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-gray-900">
                <Badge variant="outline">{roleLabel}</Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Member Since</label>
              <p className="text-gray-900 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {actualAuditor?.created_at ? new Date(actualAuditor.created_at).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold">Contact Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900">{phoneDisplay}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <p className="text-gray-900">{actualAuditor?.email || 'Not provided'}</p>
            </div>
          </div>
        </Card>

        {/* Government ID */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <IdCard className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Identification</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Government ID</label>
              <p className="text-gray-900">{governmentId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">User ID</label>
              <p className="text-sm text-gray-600">{actualAuditor?.user_id || 'Not available'}</p>
            </div>
          </div>
        </Card>

        {/* Professional Information */}
        <Card className="p-6 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-semibold">Professional Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Specialization</label>
              <p className="text-gray-900">Legal Auditing</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-gray-900">
                <Badge variant="default">Active</Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Contracts Reviewed</label>
              <p className="text-gray-900 flex items-center gap-1">
                <Award className="h-4 w-4" />
                0 contracts
              </p>
            </div>
          </div>
        </Card>

        {/* Address Information */}
        <Card className="p-6 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold">Address</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Address Line 1</label>
              <p className="text-gray-900">{addressLine1}</p>
            </div>
            {addressLine2 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Address Line 2</label>
                <p className="text-gray-900">{addressLine2}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">City</label>
              <p className="text-gray-900">{city}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">State/Province</label>
              <p className="text-gray-900">{state}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Postal Code</label>
              <p className="text-gray-900">{postalCode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Country</label>
              <p className="text-gray-900 flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {country}
              </p>
            </div>
          </div>
        </Card>

        {/* Actions Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Actions</h2>
          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => {
                // Placeholder for edit functionality
                alert('Edit functionality would be implemented here');
              }}
            >
              Edit Auditor
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Placeholder for suspend functionality
                alert('Suspend auditor functionality would be implemented here');
              }}
            >
              Suspend Auditor
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                if (confirm(`Are you sure you want to delete auditor: ${actualAuditor?.name}?`)) {
                  alert('Delete functionality would be implemented here');
                }
              }}
            >
              Delete Auditor
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}