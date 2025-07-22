import { useState, useEffect } from "react";
import { PerformanceStats } from "../../../shared/types/strategy-metrics";
import { CardGradient } from "@/components/ui/card-gradient";
import { MetricCard } from "./MetricCard";
import { PerformanceChart } from "./PerformanceChart";
import { RecentTrades } from "./RecentTrades";
import { timePeriods, getStrategyStatsByPeriod } from "@/data/strategyPerformance";
import { CircleDashed } from "lucide-react";

interface StrategyPerformanceDashboardProps {
  strategyId: string;
  className?: string;
}

export const StrategyPerformanceDashboard = ({
  strategyId,
  className = ""
}: StrategyPerformanceDashboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1m");
  const [performanceData, setPerformanceData] = useState<PerformanceStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch performance data based on strategy ID and selected period
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const data = getStrategyStatsByPeriod(strategyId, selectedPeriod);
        setPerformanceData(data);
      } catch (error) {
        console.error("Error fetching strategy performance:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [strategyId, selectedPeriod]);
  
  const handlePeriodChange = (periodId: string) => {
    setSelectedPeriod(periodId);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <CircleDashed className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!performanceData) {
    return (
      <CardGradient className="p-5">
        <p className="text-center text-gray-400">No performance data available</p>
      </CardGradient>
    );
  }
  
  const { metrics, history, trades, performance } = performanceData;
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      
      {/* Performance chart */}
      <PerformanceChart
        data={history}
        title="Performance History"
        timePeriods={timePeriods}
        onPeriodChange={handlePeriodChange}
        selectedPeriod={selectedPeriod}
      />
      
      {/* Strategy details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategy stats */}
        <CardGradient className="p-5">
          <h3 className="text-lg font-semibold mb-4">Strategy Details</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <p className="text-sm text-gray-400">Total trades</p>
                <p className="font-semibold">{performance.totalTrades}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Win rate</p>
                <p className="font-semibold">{performance.winRate.toFixed(2)}%</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Average win</p>
                <p className="font-semibold text-green-400">${performance.avgWin.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Average loss</p>
                <p className="font-semibold text-red-400">${performance.avgLoss.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Largest win</p>
                <p className="font-semibold text-green-400">${performance.largestWin.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Largest loss</p>
                <p className="font-semibold text-red-400">${performance.largestLoss.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Profit factor</p>
                <p className="font-semibold">{performance.profitFactor.toFixed(2)}x</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Expectancy</p>
                <p className="font-semibold">${performance.expectancy.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Max drawdown</p>
                <p className="font-semibold">{performance.maxDrawdown.toFixed(2)}%</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Timeframe</p>
                <p className="font-semibold">{performance.timeframe}</p>
              </div>
            </div>
            
            <div className="pt-3 mt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400">Last updated</p>
              <p className="text-sm">
                {new Date(performance.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        </CardGradient>
        
        {/* Trade distribution chart */}
        <CardGradient className="p-5">
          <h3 className="text-lg font-semibold mb-4">Trade Distribution</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Win/Loss Distribution */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Win/Loss Ratio</h4>
              <div className="w-full h-40 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#ef4444"
                      strokeWidth="20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray={`${(performance.winRate / 100) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                    {performance.winRate.toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between mt-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>Wins: {performance.successfulTrades}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>Losses: {performance.unsuccessfulTrades}</span>
                </div>
              </div>
            </div>
            
            {/* Profit/Loss Distribution */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-gray-400 mb-2">P&L Distribution</h4>
              <div className="w-full h-40 flex items-center">
                <div className="w-full h-32 flex items-end">
                  {/* Simulating a bar chart with key stats */}
                  <div className="w-1/5 mx-1">
                    <div 
                      className="bg-green-400 w-full rounded-t" 
                      style={{ height: `${Math.min(100, performance.largestWin / 5)}%` }}
                    ></div>
                    <p className="text-xs text-center mt-1">Largest Win</p>
                  </div>
                  <div className="w-1/5 mx-1">
                    <div 
                      className="bg-green-400 w-full rounded-t" 
                      style={{ height: `${Math.min(100, performance.avgWin / 3)}%` }}
                    ></div>
                    <p className="text-xs text-center mt-1">Avg Win</p>
                  </div>
                  <div className="w-1/5 mx-1">
                    <div 
                      className="bg-primary w-full rounded-t" 
                      style={{ height: `${Math.min(100, performance.expectancy * 5)}%` }}
                    ></div>
                    <p className="text-xs text-center mt-1">Expectancy</p>
                  </div>
                  <div className="w-1/5 mx-1">
                    <div 
                      className="bg-red-400 w-full rounded-t" 
                      style={{ height: `${Math.min(100, performance.avgLoss / 1.5)}%` }}
                    ></div>
                    <p className="text-xs text-center mt-1">Avg Loss</p>
                  </div>
                  <div className="w-1/5 mx-1">
                    <div 
                      className="bg-red-400 w-full rounded-t" 
                      style={{ height: `${Math.min(100, performance.largestLoss / 2)}%` }}
                    ></div>
                    <p className="text-xs text-center mt-1">Largest Loss</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardGradient>
      </div>
      
      {/* Recent trades */}
      <RecentTrades trades={trades} title="Recent Trades" maxRows={5} />
    </div>
  );
};