import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartBar, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'wouter';
import AdminHeader from '@/components/layout/AdminHeader';
import Footer from '@/components/layout/Footer';

// Sample system reports data
const systemReports = [
  { 
    id: 'rep001',
    name: 'Monthly Activity Summary',
    description: 'Summary of user activities and downloads for the month',
    createdAt: '2025-05-01T10:00:00Z',
    type: 'activity',
  },
  { 
    id: 'rep002',
    name: 'Subscription Revenue Report',
    description: 'Overview of subscription revenue and growth metrics',
    createdAt: '2025-05-01T10:30:00Z',
    type: 'financial',
  },
  { 
    id: 'rep003',
    name: 'User Growth Analysis',
    description: 'Analysis of user acquisition and retention trends',
    createdAt: '2025-05-01T11:00:00Z',
    type: 'analytics',
  },
  { 
    id: 'rep004',
    name: 'System Performance Log',
    description: 'Technical report on system performance and optimization',
    createdAt: '2025-05-01T12:00:00Z',
    type: 'technical',
  },
];

const ReportsPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();

  // In a real implementation, we would fetch reports from the backend
  // For now, we're using sample data
  const { isLoading: reportsLoading } = useQuery({
    queryKey: ['/api/admin/reports'],
    enabled: false, // Disabled until API endpoint is implemented
  });

  if (authLoading || reportsLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>Loading reports...</CardDescription>
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
              You need to be logged in to access system reports.
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
            <ChartBar className="h-7 w-7 mr-2" />
            System Reports
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Activity Reports</CardTitle>
              <CardDescription>User activity and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These reports track user activity, feature usage, and overall engagement with the platform.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Revenue and subscription metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Track revenue, subscription growth, and other financial metrics for the business.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              Generated reports for system analysis and business intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {report.name}
                      </TableCell>
                      <TableCell>{report.description}</TableCell>
                      <TableCell>
                        <span className="capitalize">{report.type}</span>
                      </TableCell>
                      <TableCell>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <a 
                          href="#" 
                          className="text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('Download functionality will be implemented in the future.');
                          }}
                        >
                          Download
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ReportsPage;