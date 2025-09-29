"use client";
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks';
import { User } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MapPin, User as UserIcon, Globe, IdCard } from 'lucide-react';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const { data: user, loading, error } = useUser(userId);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Loading User Details...</h1>
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
          <h1 className="text-3xl font-bold">User Details</h1>
        </div>
        <Card className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">User Not Found</h1>
        </div>
        <Card className="p-6">
          <p className="text-gray-600">The requested user could not be found.</p>
        </Card>
      </div>
    );
  }

  // Handle case where user might be wrapped in response object
  let actualUser = user;
  if (user && 'data' in user && user.data) {
    actualUser = user.data as User;
  }

  const roleLabel = actualUser?.role ? actualUser.role.toUpperCase() : 'USER';
  const phoneDisplay = actualUser?.phone_no || 'Not provided';
  const governmentId = actualUser?.government_id || 'Not provided';
  const addressLine1 = actualUser?.address_line1 || 'Not provided';
  const addressLine2 = actualUser?.address_line2 || '';
  const city = actualUser?.city || 'Not provided';
  const state = actualUser?.state || 'Not provided';
  const postalCode = actualUser?.postal_code || 'Not provided';
  const country = actualUser?.country || 'Not provided';

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{actualUser?.name || 'No Name'}</h1>
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

      {/* User Details Grid */}
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
              <p className="text-gray-900">{actualUser?.name || 'No name available'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-gray-900">
                <Badge variant="outline">{roleLabel}</Badge>
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
              Edit User
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Placeholder for suspend functionality
                alert('Suspend user functionality would be implemented here');
              }}
            >
              Suspend User
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                if (confirm(`Are you sure you want to delete user: ${actualUser?.name}?`)) {
                  alert('Delete functionality would be implemented here');
                }
              }}
            >
              Delete User
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}