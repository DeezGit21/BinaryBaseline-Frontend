import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, DollarSign, Target, ChartArea, ArrowRight } from "@/lib/icons";
import { generateStrategyStats, timePeriods, strategiesList } from "@/data/strategyPerformance";
import { PerformanceStats } from "@shared/types/strategy-metrics";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface PerformanceMetricsProps {
  strategyId?: string;
  showComparison?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  strategyId = "macd-crossover", 
  showComparison = true 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("3m");
  const [selectedStrategy, setSelectedStrategy] = useState(strategyId);
  const [comparisonStrategy, setComparisonStrategy] = useState("rsi-overbought");
  const [performanceData, setPerformanceData] = useState<PerformanceStats | null>(null);
  const [comparisonData, setComparisonData] = useState<PerformanceStats | null>(null);

  useEffect(() => {
    const data = generateStrategyStats(selectedStrategy, selectedPeriod);
    setPerformanceData(data);
    
    if (showComparison) {
      const compData = generateStrategyStats(comparisonStrategy, selectedPeriod);
      setComparisonData(compData);
    }
  }, [selectedStrategy, selectedPeriod, comparisonStrategy, showComparison]);

  const formatValue = (value: number, unit: string) => {
    if (unit === "$") {
      return `$${value.toLocaleString()}`;
    }
    if (unit === "%") {
      return `${value.toFixed(1)}%`;
    }
    return `${value.toFixed(2)}${unit}`;
  };

  const getStrategyName = (id: string) => {
    const strategy = strategiesList.find(s => s.id === id);
    return strategy ? strategy.name : id;
  };

  if (!performanceData) {
    return <div className="text-center py-8">Loading performance data...</div>;
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="gradient-text">Verified Performance Metrics</span>
          </h2>
          <p className="text-gray-300">
            Transparent, real-time performance data from our trading strategies. 
            All metrics are verified and updated continuously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Strategy</label>
            <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                {strategiesList.map((strategy) => (
                  <SelectItem key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {timePeriods.map((period) => (
                  <SelectItem key={period.id} value={period.id}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
            <TabsTrigger value="chart">Performance Chart</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-400" />
                    Win Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {performanceData.performance.winRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">
                    {performanceData.performance.successfulTrades} of {performanceData.performance.totalTrades} trades
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Total Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-1">
                    ${performanceData.performance.profitLoss.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    Over {selectedPeriod === "all" ? "all time" : timePeriods.find(p => p.id === selectedPeriod)?.label}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Profit Factor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {performanceData.performance.profitFactor.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400">
                    Gross profit / gross loss
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChartArea className="w-5 h-5 text-orange-400" />
                    Max Drawdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    {performanceData.performance.maxDrawdown.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">
                    Maximum risk exposure
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Strategy Performance Summary
                </CardTitle>
                <CardDescription>
                  {getStrategyName(selectedStrategy)} • Last updated: {new Date(performanceData.performance.lastUpdated).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Risk Metrics</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sharpe Ratio:</span>
                        <span>{performanceData.performance.sharpeRatio?.toFixed(2) || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Drawdown:</span>
                        <span className="text-orange-400">{performanceData.performance.maxDrawdown.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk/Reward:</span>
                        <span>{(performanceData.performance.avgWin / performanceData.performance.avgLoss).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Trade Statistics</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Trades:</span>
                        <span>{performanceData.performance.totalTrades}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Win:</span>
                        <span className="text-green-400">${performanceData.performance.avgWin.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Loss:</span>
                        <span className="text-red-400">-${performanceData.performance.avgLoss.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Performance</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expectancy:</span>
                        <span className="text-primary">${performanceData.performance.expectancy.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Largest Win:</span>
                        <span className="text-green-400">${performanceData.performance.largestWin.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Largest Loss:</span>
                        <span className="text-red-400">-${performanceData.performance.largestLoss.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceData.metrics.map((metric) => (
                <Card key={metric.id} className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    {metric.description && (
                      <CardDescription className="text-xs">{metric.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">
                      {formatValue(metric.value, metric.unit)}
                    </div>
                    {metric.change && (
                      <div className={`text-sm flex items-center gap-1 ${
                        metric.direction === "up" 
                          ? "text-green-400" 
                          : metric.direction === "down" 
                          ? "text-red-400" 
                          : "text-gray-400"
                      }`}>
                        {metric.direction === "up" ? "↗" : metric.direction === "down" ? "↘" : "→"}
                        {Math.abs(metric.change).toFixed(1)}% vs last period
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chart" className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>
                  Historical performance over the selected time period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData.history}>
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Portfolio Value"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="baseline" 
                        stroke="#6b7280" 
                        strokeWidth={1}
                        strokeDasharray="5,5"
                        name="Baseline"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            {showComparison && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Compare with Strategy</label>
                  <Select value={comparisonStrategy} onValueChange={setComparisonStrategy}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select strategy to compare" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategiesList.filter(s => s.id !== selectedStrategy).map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {comparisonData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg">{getStrategyName(selectedStrategy)}</CardTitle>
                        <Badge variant="default">Primary Strategy</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Win Rate:</span>
                            <span className="text-green-400">{performanceData.performance.winRate.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Profit:</span>
                            <span className="text-primary">${performanceData.performance.profitLoss.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Profit Factor:</span>
                            <span>{performanceData.performance.profitFactor.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Drawdown:</span>
                            <span className="text-orange-400">{performanceData.performance.maxDrawdown.toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg">{getStrategyName(comparisonStrategy)}</CardTitle>
                        <Badge variant="secondary">Comparison</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Win Rate:</span>
                            <span className="text-green-400">{comparisonData.performance.winRate.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Profit:</span>
                            <span className="text-primary">${comparisonData.performance.profitLoss.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Profit Factor:</span>
                            <span>{comparisonData.performance.profitFactor.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Drawdown:</span>
                            <span className="text-orange-400">{comparisonData.performance.maxDrawdown.toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 mb-2">
            <Badge variant="outline" className="mr-2">Live Data</Badge>
            All performance metrics are updated in real-time from actual trading results
          </p>
          <p className="text-xs text-gray-500">
            Past performance does not guarantee future results. Trading involves risk of loss.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;