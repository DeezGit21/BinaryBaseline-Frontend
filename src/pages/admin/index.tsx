import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Download, ChartBar, Key } from 'lucide-react';
import { Link } from 'wouter';
import AdminHeader from '@/components/layout/AdminHeader';
import Footer from '@/components/layout/Footer';

const AdminPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [processingPromotion, setProcessingPromotion] = useState(false);

  // Fetch admin status
  const { data: adminStatus, isLoading: statusLoading } = useQuery<{isAdmin: boolean}>({
    queryKey: ['/api/admin/status'],
    enabled: !!user,
  });

  // Promotion mutation
  const promoteMutation = useMutation({
    mutationFn: async () => {
      setProcessingPromotion(true);
      const response = await fetch('/api/admin/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to promote to admin');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'You have been promoted to admin status',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setProcessingPromotion(false);
    }
  });

  const handlePromoteClick = () => {
    promoteMutation.mutate();
  };

  if (authLoading || statusLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Loading admin status...</CardDescription>
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
              You need to be logged in to access the admin dashboard.
              <div className="mt-4">
                <Link href="/login" className="underline">Log in now</Link>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="container mx-auto py-10 mt-16">
        <div className="mb-8 flex items-center">
          <Shield className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        {!adminStatus?.isAdmin && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Activate Admin Status</CardTitle>
              <CardDescription>
                Promote your account to admin to access all features without a subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Promoting your account to admin status will grant you full access to all features and data
                without requiring a subscription. This is useful for testing and management purposes.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePromoteClick} 
                disabled={processingPromotion}
              >
                {processingPromotion ? 'Processing...' : 'Promote to Admin'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {adminStatus?.isAdmin && (
          <>
            <Alert className="mb-8 bg-green-50 border-green-200">
              <Shield className="h-5 w-5" />
              <AlertTitle>Admin Status Active</AlertTitle>
              <AlertDescription>
                You have full access to all features and data as an administrator
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Manage Users</div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/admin/users">View All Users</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Downloads
                  </CardTitle>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Track Downloads</div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/admin/downloads">View Download Stats</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    License Keys
                  </CardTitle>
                  <Key className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Manage Licenses</div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/admin/license-keys">Manage License Keys</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Separator className="my-8" />

            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/reports">
                  <ChartBar className="h-6 w-6 mb-2" />
                  <span>View System Reports</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/users">
                  <Shield className="h-6 w-6 mb-2" />
                  <span>Manage Users</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/license-keys">
                  <Key className="h-6 w-6 mb-2" />
                  <span>License Keys</span>
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;