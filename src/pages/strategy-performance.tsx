import { useState } from "react";
import { StrategySelector } from "@/components/performance/StrategySelector";
import { StrategyPerformanceDashboard } from "@/components/performance/StrategyPerformanceDashboard";
import { strategiesList } from "@/data/strategyPerformance";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function StrategyPerformancePage() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>(
    strategiesList.length > 0 ? strategiesList[0].id : ""
  );
  
  const handleStrategyChange = (strategyId: string) => {
    setSelectedStrategy(strategyId);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            <span className="gradient-text">Strategy Performance</span>
          </h1>
          
          <p className="text-gray-400 mb-8 max-w-3xl">
            Monitor the performance of our algorithmic trading strategies. Track key metrics like win rate, 
            profit factor, and historical performance to understand how each strategy performs across different 
            market conditions.
          </p>
          
          <div className="space-y-6">
            {/* Strategy selector */}
            <StrategySelector 
              selectedStrategy={selectedStrategy}
              onStrategyChange={handleStrategyChange}
            />
            
            {/* Performance dashboard */}
            {selectedStrategy && (
              <StrategyPerformanceDashboard strategyId={selectedStrategy} />
            )}
            
            {!selectedStrategy && (
              <div className="bg-background/50 border border-gray-700 rounded-lg p-8 text-center">
                <p className="text-gray-400">
                  Please select a strategy to view performance metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}