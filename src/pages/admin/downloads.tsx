import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import AdminHeader from '@/components/layout/AdminHeader';
import Footer from '@/components/layout/Footer';

// Sample data for the chart (will be replaced with real data)
const sampleDownloadData = [
  { date: 'Jan', downloads: 12 },
  { date: 'Feb', downloads: 19 },
  { date: 'Mar', downloads: 25 },
  { date: 'Apr', downloads: 32 },
  { date: 'May', downloads: 45 },
  { date: 'Jun', downloads: 51 },
];

// Sample version data
const sampleVersionData = [
  { version: 'v1.0.0', downloads: 45 },
  { version: 'v1.1.0', downloads: 65 },
  { version: 'v1.2.0', downloads: 85 },
];

interface DownloadStats {
  totalDownloads: number;
  activeUsers: number;
  totalUsers: number;
  chartData: { date: string; downloads: number }[];
  versionData: { version: string; downloads: number }[];
}

const DownloadsPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  
  // Fetch download statistics
  const { data: downloadStats, isLoading: statsLoading } = useQuery<DownloadStats>({
    queryKey: ['/api/downloads/stats'],
    enabled: !!user,
  });

  if (authLoading || statsLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="container mx-auto py-10 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Download Statistics</CardTitle>
              <CardDescription>Loading download statistics...</CardDescription>
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
              You need to be logged in to access the download statistics.
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

  // Use real data if available, otherwise use sample data
  const chartData = downloadStats?.chartData || sampleDownloadData;
  const versionData = downloadStats?.versionData || sampleVersionData;
  const totalDownloads = downloadStats?.totalDownloads || sampleDownloadData.reduce((sum, item) => sum + item.downloads, 0);
  const activeUsers = downloadStats?.activeUsers || 0;

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
            <Download className="h-7 w-7 mr-2" />
            Download Statistics
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalDownloads}</div>
              <p className="text-sm text-muted-foreground mt-1">All versions combined</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Latest Version</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">v1.2.0</div>
              <p className="text-sm text-muted-foreground mt-1">Released on May 1, 2025</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{activeUsers}</div>
              <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline" className="mb-8">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="versions">By Version</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="p-4 bg-white rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-4">Download Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="downloads" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="versions" className="p-4 bg-white rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-4">Downloads by Version</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={versionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="version" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="downloads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DownloadsPage;