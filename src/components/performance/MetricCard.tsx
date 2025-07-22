import { StrategyMetric } from "../../../shared/types/strategy-metrics";
import { CardGradient } from "@/components/ui/card-gradient";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TrendingDown, TrendingUp, Minus } from "lucide-react";

interface MetricCardProps {
  metric: StrategyMetric;
  className?: string;
}

export const MetricCard = ({ metric, className = "" }: MetricCardProps) => {
  const { name, value, unit, change, direction, description } = metric;
  
  const getValueColor = () => {
    if (direction === "up") return "text-green-400";
    if (direction === "down") return "text-red-400";
    return "text-gray-200";
  };
  
  const getChangeColor = () => {
    if (!change) return "text-gray-400";
    return change >= 0 ? "text-green-400" : "text-red-400";
  };
  
  const getChangeIcon = () => {
    if (!change) return <Minus className="h-4 w-4" />;
    return change >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-400" /> : 
      <TrendingDown className="h-4 w-4 text-red-400" />;
  };
  
  // Format value based on unit type
  const formatValue = () => {
    if (unit === "%") return value.toFixed(2);
    if (unit === "$") return value.toFixed(2);
    if (unit === "x") return value.toFixed(2);
    return value;
  };
  
  return (
    <CardGradient className={`p-4 h-full ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-300">{name}</h3>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-1 text-gray-400 hover:text-gray-300">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center text-xs ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="ml-1">{change >= 0 ? "+" : ""}{change}%</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline">
        <span className={`text-2xl font-bold ${getValueColor()}`}>
          {unit === "$" && "$"}{formatValue()}
        </span>
        {unit !== "$" && <span className="text-gray-400 ml-1">{unit}</span>}
      </div>
    </CardGradient>
  );
};