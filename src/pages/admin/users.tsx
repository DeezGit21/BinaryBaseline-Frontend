import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import AdminHeader from '@/components/layout/AdminHeader';
import Footer from '@/components/layout/Footer';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

interface Subscription {
  id: number;
  userId: string;
  planId: string;
  planName: string;
  status: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

const UsersPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Fetch users
  const { data: usersResponse, isLoading: usersLoading, error: usersError } = useQuery<{users: User[]}>({
    queryKey: ['/api/admin/users'],
    enabled: !!user,
  });

  const users = usersResponse?.users;

  // Update user admin status mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({ isAdmin }),
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to update user';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: data.message || 'User has been updated',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Create subscription for user mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: async ({ userId, planId }: { userId: string; planId: string }) => {
      const response = await fetch('/api/admin/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, planId }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create subscription');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Subscription has been created',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setSelectedUser(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  const handleToggleAdmin = (userId: string, currentStatus: boolean) => {
    updateUserMutation.mutate({ userId, isAdmin: !currentStatus });
  };

  const handleCreateSubscription = (userId: string, planId: string) => {
    createSubscriptionMutation.mutate({ userId, planId });
  };

  if (authLoading || usersLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Loading users...</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = '/login';
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Alert variant="destructive">
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              Redirecting to login...
              <div className="mt-4">
                <a href="/login" className="underline">Click here if not redirected</a>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Alert variant="destructive">
            <AlertTitle>Error Loading Users</AlertTitle>
            <AlertDescription>
              {(usersError as any)?.message || 'Failed to load users. Please try again.'}
              <div className="mt-4">
                <a href="/login" className="underline">Try logging in again</a>
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
        <div className="flex items-center mb-6">
          <Link href="/admin">
            <a className="flex items-center text-sm text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin
            </a>
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="h-7 w-7 mr-2" />
            User Management
          </h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users && users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {user.profileImageUrl && (
                            <img 
                              src={user.profileImageUrl} 
                              alt={`${user.firstName || ''} ${user.lastName || ''}`}
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                          )}
                          <div>
                            <div>{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.stripeSubscriptionId ? (
                          <Badge variant="default" className="bg-green-600">Active</Badge>
                        ) : (
                          <Badge variant="outline">Free</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.isAdmin ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                          >
                            {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                          </Button>
                          {!user.stripeSubscriptionId && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              Add Subscription
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle>Create Subscription for {selectedUser.email}</CardTitle>
              <CardDescription>Add a subscription plan for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleCreateSubscription(selectedUser.id, 'price_basic')}
                  >
                    Basic Plan
                  </Button>
                  <Button
                    onClick={() => handleCreateSubscription(selectedUser.id, 'price_pro')}
                  >
                    Pro Plan
                  </Button>
                  <Button
                    onClick={() => handleCreateSubscription(selectedUser.id, 'price_elite')}
                  >
                    Elite Plan
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;