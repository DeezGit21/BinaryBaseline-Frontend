import { useState } from "react";
import { CardGradient } from "@/components/ui/card-gradient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { strategiesList } from "@/data/strategyPerformance";
import { Badge } from "@/components/ui/badge";

interface StrategySelectorProps {
  selectedStrategy: string;
  onStrategyChange: (strategyId: string) => void;
  className?: string;
}

export const StrategySelector = ({
  selectedStrategy,
  onStrategyChange,
  className = ""
}: StrategySelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter strategies based on search query
  const filteredStrategies = strategiesList.filter(strategy => {
    if (!searchQuery) return true;
    return strategy.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get the currently selected strategy
  const currentStrategy = strategiesList.find(s => s.id === selectedStrategy);
  
  return (
    <CardGradient className={`p-5 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Select Strategy</h3>
        
        <div className="mt-2 md:mt-0">
          <Select value={selectedStrategy} onValueChange={onStrategyChange}>
            <SelectTrigger className="w-full md:w-60">
              <SelectValue placeholder="Select a strategy" />
            </SelectTrigger>
            <SelectContent>
              {strategiesList.map(strategy => (
                <SelectItem key={strategy.id} value={strategy.id}>
                  <div className="flex items-center">
                    <span>{strategy.name}</span>
                    <Badge className="ml-2" variant="outline">
                      {(strategy.winRate * 100).toFixed(0)}% WR
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {currentStrategy && (
        <div className="mt-2">
          <div className="mb-2">
            <Badge variant="outline" className="mr-1">
              Win Rate: {(currentStrategy.winRate * 100).toFixed(2)}%
            </Badge>
          </div>
          <p className="text-gray-400 text-sm">{currentStrategy.description}</p>
        </div>
      )}
    </CardGradient>
  );
};