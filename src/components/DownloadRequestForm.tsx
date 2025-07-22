import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { downloadRequestSchema, DownloadRequest } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Download, Lock, CheckCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface DownloadRequestFormProps {
  onSuccess?: () => void;
}

const DownloadRequestForm: React.FC<DownloadRequestFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(!user?.downloadEligible);

  const form = useForm<DownloadRequest>({
    resolver: zodResolver(downloadRequestSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      subscriptionTier: user?.subscriptionTier as any || undefined,
    },
  });

  const submitRequestMutation = useMutation({
    mutationFn: async (data: DownloadRequest) => {
      return await apiRequest('/api/download-request', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: 'Request Submitted!',
        description: 'Your download request has been submitted. An admin will review it and generate your license key.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setShowForm(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit download request',
        variant: 'destructive',
      });
    },
  });

  const handleDownloadClick = () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to download the software',
        variant: 'destructive',
      });
      return;
    }

    if (!user.downloadEligible) {
      setShowForm(true);
      return;
    }

    // User is eligible, proceed with download
    window.location.href = `/api/download/latest`;
  };

  const onSubmit = (data: DownloadRequest) => {
    submitRequestMutation.mutate(data);
  };

  if (user?.downloadEligible && !showForm) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-700">Download Ready</CardTitle>
          <CardDescription>
            Your license key: <span className="font-mono font-bold">{user.licenseKey}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDownloadClick} className="w-full" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Binary Baseline
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
          <Lock className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle>Download Request Form</CardTitle>
        <CardDescription>
          Please fill out this form to request access to Binary Baseline software. 
          Our team will review your request and generate a unique license key.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subscriptionTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Tier *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subscription tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new_trader">New Trader - $49/month</SelectItem>
                        <SelectItem value="pro_trader">Pro Trader - $99/month</SelectItem>
                        <SelectItem value="elite_trader">Elite Trader - $199/month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street, City, State, ZIP Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={submitRequestMutation.isPending}
              >
                {submitRequestMutation.isPending ? 'Submitting...' : 'Submit Download Request'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DownloadRequestForm;