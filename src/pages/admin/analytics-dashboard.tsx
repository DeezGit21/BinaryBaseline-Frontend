import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar, 
  Monitor, 
  ChartArea, 
  Settings,
  ArrowRight,
  RefreshCcw
} from "@/lib/icons";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { useAuth } from "@/hooks/useAuth";
import { generateStrategyStats, strategiesList } from "@/data/strategyPerformance";

interface AnalyticsData {
  activeSubscribers: number;
  totalRevenue: number;
  conversionRate: number;
  churnRate: number;
  downloadCount: number;
  websiteTraffic: number;
  topPerformingStrategies: Array<{
    id: string;
    name: string;
    winRate: number;
    totalTrades: number;
    profitLoss: number;
  }>;
  monthlyGrowth: Array<{
    month: string;
    subscribers: number;
    revenue: number;
    downloads: number;
  }>;
  userEngagement: Array<{
    metric: string;
    value: number;
    change: number;
  }>;
}

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  // Mock analytics data - in production, this would come from API
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    activeSubscribers: 2847,
    totalRevenue: 94580,
    conversionRate: 12.4,
    churnRate: 3.2,
    downloadCount: 18762,
    websiteTraffic: 45892,
    topPerformingStrategies: [
      { id: "ichimoku-cloud", name: "Ichimoku Cloud", winRate: 87.1, totalTrades: 3920, profitLoss: 28650 },
      { id: "fibonacci-retracement", name: "Fibonacci Retracement", winRate: 84.3, totalTrades: 2847, profitLoss: 23480 },
      { id: "support-resistance", name: "Support & Resistance", winRate: 82.0, totalTrades: 3156, profitLoss: 21790 },
      { id: "bollinger-breakout", name: "Bollinger Breakout", winRate: 79.2, totalTrades: 2103, profitLoss: 19340 },
      { id: "macd-crossover", name: "MACD Crossover", winRate: 78.5, totalTrades: 2956, profitLoss: 18650 }
    ],
    monthlyGrowth: [
      { month: "Jan", subscribers: 2156, revenue: 71520, downloads: 12450 },
      { month: "Feb", subscribers: 2298, revenue: 76340, downloads: 13920 },
      { month: "Mar", subscribers: 2445, revenue: 81150, downloads: 15680 },
      { month: "Apr", subscribers: 2612, revenue: 86790, downloads: 16840 },
      { month: "May", subscribers: 2789, revenue: 92610, downloads: 17920 },
      { month: "Jun", subscribers: 2847, revenue: 94580, downloads: 18762 }
    ],
    userEngagement: [
      { metric: "Daily Active Users", value: 1456, change: 8.2 },
      { metric: "Session Duration", value: 24.5, change: 12.1 },
      { metric: "Strategy Usage", value: 89.3, change: 5.7 },
      { metric: "Support Tickets", value: 23, change: -15.4 }
    ]
  });

  const { data: downloadCount } = useQuery({
    queryKey: ['/api/downloads/count'],
    enabled: !!user
  });

  const { data: totalVisits } = useQuery({
    queryKey: ['/api/visits'],
    enabled: !!user
  });

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate data refresh
        setAnalyticsData(prev => ({
          ...prev,
          activeSubscribers: prev.activeSubscribers + Math.floor(Math.random() * 10 - 5),
          totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
          websiteTraffic: prev.websiteTraffic + Math.floor(Math.random() * 50)
        }));
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-400">Please log in to access the analytics dashboard.</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const pieData = analyticsData.topPerformingStrategies.slice(0, 5).map((strategy, index) => ({
    name: strategy.name,
    value: strategy.totalTrades,
    color: COLORS[index]
  }));

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="gradient-text">Analytics Dashboard</span>
              </h1>
              <p className="text-gray-400">
                Monitor key metrics, performance, and growth across Binary Baseline
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={autoRefresh ? "default" : "outline"}
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="flex items-center gap-2"
              >
                <RefreshCcw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                {autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Active Subscribers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      {analyticsData.activeSubscribers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      +142 this month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      ${analyticsData.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      +$1,970 this month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      Conversion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {analyticsData.conversionRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-400">
                      +2.1% vs last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-orange-400" />
                      Website Traffic
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-400 mb-1">
                      {analyticsData.websiteTraffic.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      Unique visitors
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Growth Chart */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartArea className="w-5 h-5" />
                    Monthly Growth Trends
                  </CardTitle>
                  <CardDescription>
                    Subscribers, revenue, and downloads over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData.monthlyGrowth}>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                            name.charAt(0).toUpperCase() + name.slice(1)
                          ]}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="subscribers" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="Subscribers"
                          dot={{ fill: '#3b82f6' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="Revenue"
                          dot={{ fill: '#10b981' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="downloads" 
                          stroke="#f59e0b" 
                          strokeWidth={2}
                          name="Downloads"
                          dot={{ fill: '#f59e0b' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* User Engagement Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsData.userEngagement.map((metric, index) => (
                  <Card key={index} className="bg-card/50 border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">
                        {metric.metric.includes('Duration') ? `${metric.value} min` : 
                         metric.metric.includes('Usage') ? `${metric.value}%` : 
                         metric.value.toLocaleString()}
                      </div>
                      <div className={`text-sm flex items-center gap-1 ${
                        metric.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.change > 0 ? '↗' : '↘'}
                        {Math.abs(metric.change).toFixed(1)}% vs last period
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Top Performing Strategies</CardTitle>
                    <CardDescription>
                      Strategies ranked by win rate and total trades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topPerformingStrategies.map((strategy, index) => (
                        <div key={strategy.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="font-semibold">{strategy.name}</div>
                              <div className="text-sm text-gray-400">
                                {strategy.totalTrades.toLocaleString()} trades
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-semibold">{strategy.winRate.toFixed(1)}%</div>
                            <div className="text-sm text-gray-400">
                              ${strategy.profitLoss.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Strategy Usage Distribution</CardTitle>
                    <CardDescription>
                      Distribution of trades across top strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value.toLocaleString(), 'Total Trades']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>User Acquisition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">New Users:</span>
                        <span className="font-semibold">156 this month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Organic:</span>
                        <span className="text-green-400">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Referral:</span>
                        <span className="text-blue-400">23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Paid:</span>
                        <span className="text-purple-400">9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>User Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Day 1:</span>
                        <span className="font-semibold">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Day 7:</span>
                        <span className="font-semibold">72%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Day 30:</span>
                        <span className="font-semibold">58%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Day 90:</span>
                        <span className="font-semibold">42%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Churn Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Churn:</span>
                        <span className="text-red-400">{analyticsData.churnRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg. Lifetime:</span>
                        <span className="font-semibold">8.5 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Primary Reason:</span>
                        <span className="text-gray-300">Cost concerns</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.monthlyGrowth}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                          <Bar dataKey="revenue" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Revenue Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">MRR:</span>
                        <span className="font-semibold text-green-400">$18,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ARR:</span>
                        <span className="font-semibold text-green-400">$221,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ARPU:</span>
                        <span className="font-semibold">$33.20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">LTV:</span>
                        <span className="font-semibold">$282.20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CAC:</span>
                        <span className="font-semibold">$45.60</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">LTV/CAC:</span>
                        <span className="font-semibold text-green-400">6.2x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Server Uptime:</span>
                        <span className="text-green-400">99.97%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="font-semibold">125ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Error Rate:</span>
                        <span className="text-green-400">0.03%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Usage:</span>
                        <span className="font-semibold">34%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Database Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Query Time:</span>
                        <span className="font-semibold">45ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Connections:</span>
                        <span className="font-semibold">234/500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cache Hit:</span>
                        <span className="text-green-400">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Storage:</span>
                        <span className="font-semibold">12.4 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>API Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Requests/min:</span>
                        <span className="font-semibold">1,245</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="text-green-400">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate Limits:</span>
                        <span className="font-semibold">12/1000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Auth Failures:</span>
                        <span className="font-semibold">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;