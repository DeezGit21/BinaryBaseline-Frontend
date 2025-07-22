import { useState } from "react";
import { PerformanceChartData, PerformanceTimePeriod } from "../../../shared/types/strategy-metrics";
import { CardGradient } from "@/components/ui/card-gradient";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

interface PerformanceChartProps {
  data: PerformanceChartData[];
  title?: string;
  timePeriods: PerformanceTimePeriod[];
  onPeriodChange?: (periodId: string) => void;
  selectedPeriod?: string;
  showBaseline?: boolean;
  className?: string;
}

export const PerformanceChart = ({
  data,
  title = "Performance",
  timePeriods,
  onPeriodChange,
  selectedPeriod = "1m",
  showBaseline = true,
  className = ""
}: PerformanceChartProps) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const performanceValue = payload[0].value;
      const baselineValue = payload[1]?.value;
      const tradeCount = payload[0]?.payload?.tradeCount || 0;
      
      return (
        <div className="bg-background border border-gray-700 rounded-md p-3 shadow-md">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-green-400">
            Performance: ${performanceValue.toFixed(2)}
          </p>
          {showBaseline && baselineValue && (
            <p className="text-blue-400">
              Baseline: ${baselineValue.toFixed(2)}
            </p>
          )}
          {tradeCount > 0 && (
            <p className="text-gray-300 mt-1">
              Trades: {tradeCount}
            </p>
          )}
        </div>
      );
    }
    
    return null;
  };
  
  // Format date for x-axis
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  
  return (
    <CardGradient className={`p-5 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <div className="flex space-x-2">
          {timePeriods.map((period) => (
            <Badge
              key={period.id}
              variant={period.id === selectedPeriod ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/70"
              onClick={() => onPeriodChange && onPeriodChange(period.id)}
            >
              {period.label}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined && data[e.activeTooltipIndex]) {
                setHoveredDate(data[e.activeTooltipIndex].date);
              }
            }}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <defs>
              <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis} 
              tick={{ fill: '#9ca3af' }}
              tickLine={{ stroke: '#4b5563' }}
              axisLine={{ stroke: '#4b5563' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af' }}
              tickLine={{ stroke: '#4b5563' }}
              axisLine={{ stroke: '#4b5563' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Area 
              type="monotone" 
              name="Performance" 
              dataKey="value" 
              stroke="#10b981" 
              fillOpacity={1}
              fill="url(#performanceGradient)" 
              strokeWidth={2}
            />
            
            {showBaseline && (
              <Area 
                type="monotone" 
                name="Baseline" 
                dataKey="baseline" 
                stroke="#3b82f6" 
                fillOpacity={0.3}
                fill="url(#baselineGradient)" 
                strokeWidth={1.5}
                strokeDasharray="5 5"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {hoveredDate && (
        <div className="mt-2 text-center text-sm text-gray-400">
          Selected date: {new Date(hoveredDate).toLocaleDateString()}
        </div>
      )}
    </CardGradient>
  );
};