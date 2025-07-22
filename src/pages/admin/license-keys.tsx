import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, ArrowLeft, CheckCircle, XCircle, User, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import AdminHeader from '@/components/layout/AdminHeader';
import Footer from '@/components/layout/Footer';
import { apiRequest } from '@/lib/queryClient';

interface DownloadRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  subscriptionTier: string;
  downloadEligible: boolean;
  licenseKey?: string;
  licenseKeyGeneratedAt?: string;
  createdAt: string;
}

const LicenseKeysPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<DownloadRequest | null>(null);
  
  // Fetch download requests
  const { data: requestsResponse, isLoading: requestsLoading, error: requestsError } = useQuery<{requests: DownloadRequest[]}>({
    queryKey: ['/api/admin/download-requests'],
    enabled: !!user,
  });

  const requests = requestsResponse?.requests || [];

  // Generate license key mutation
  const generateLicenseMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await apiRequest('/api/admin/generate-license-key', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'License Key Generated!',
        description: `License key ${data.licenseKey} has been generated successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/download-requests'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate license key',
        variant: 'destructive',
      });
    }
  });

  // Revoke license key mutation
  const revokeLicenseMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await apiRequest('/api/admin/revoke-license-key', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
    },
    onSuccess: () => {
      toast({
        title: 'License Key Revoked!',
        description: 'The license key has been revoked successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/download-requests'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to revoke license key',
        variant: 'destructive',
      });
    }
  });

  const handleGenerateLicense = (userId: string) => {
    generateLicenseMutation.mutate(userId);
  };

  const handleRevokeLicense = (userId: string) => {
    revokeLicenseMutation.mutate(userId);
  };

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'new_trader': return 'New Trader';
      case 'pro_trader': return 'Pro Trader';
      case 'elite_trader': return 'Elite Trader';
      default: return tier;
    }
  };

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case 'new_trader': return '$49/month';
      case 'pro_trader': return '$99/month';
      case 'elite_trader': return '$199/month';
      default: return 'Unknown';
    }
  };

  if (authLoading || requestsLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>License Key Management</CardTitle>
              <CardDescription>Loading download requests...</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Alert variant="destructive">
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              You need to be logged in to access license key management.
              <div className="mt-4">
                <a href="/login" className="underline">Log in now</a>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (requestsError) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Alert variant="destructive">
            <AlertTitle>Error Loading Requests</AlertTitle>
            <AlertDescription>
              {(requestsError as any)?.message || 'Failed to load download requests. Please try again.'}
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  const pendingRequests = requests.filter(r => !r.downloadEligible);
  const approvedRequests = requests.filter(r => r.downloadEligible);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="container mx-auto py-10 mt-16">
        <div className="flex items-center mb-6">
          <Link href="/admin">
            <a className="flex items-center text-sm text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin
            </a>
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <Key className="h-7 w-7 mr-2" />
            License Key Management
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-600">{pendingRequests.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Licenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{approvedRequests.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Keys generated</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{requests.length}</div>
              <p className="text-sm text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="mb-8">
          <TabsList>
            <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Active Licenses ({approvedRequests.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Download Requests</CardTitle>
                <CardDescription>Users waiting for license key approval</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No pending requests
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Requested</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                <div>
                                  <div>{request.firstName} {request.lastName}</div>
                                  <div className="text-sm text-muted-foreground flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {request.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="flex items-center mb-1">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {request.phone}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {request.address}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <Badge variant="outline">{getTierDisplayName(request.subscriptionTier)}</Badge>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {getTierPrice(request.subscriptionTier)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(request.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button 
                                onClick={() => handleGenerateLicense(request.id)}
                                disabled={generateLicenseMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Generate License
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Active License Keys</CardTitle>
                <CardDescription>Users with generated license keys</CardDescription>
              </CardHeader>
              <CardContent>
                {approvedRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No active licenses
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>License Key</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Generated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                <div>
                                  <div>{request.firstName} {request.lastName}</div>
                                  <div className="text-sm text-muted-foreground flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {request.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                {request.licenseKey}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{getTierDisplayName(request.subscriptionTier)}</Badge>
                            </TableCell>
                            <TableCell>
                              {request.licenseKeyGeneratedAt 
                                ? new Date(request.licenseKeyGeneratedAt).toLocaleDateString()
                                : 'Unknown'
                              }
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRevokeLicense(request.id)}
                                disabled={revokeLicenseMutation.isPending}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Revoke License
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default LicenseKeysPage;