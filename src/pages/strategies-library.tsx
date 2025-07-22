import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartLineUp, Bot, Bolt, ChartBar, Gauge, ChartArea } from "@/lib/icons";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import IndicatorDetailsDialog from "@/components/IndicatorDetailsDialog";
import CustomizationGuide from "@/components/sections/CustomizationGuide";

// Define indicator types for organization
type IndicatorCategory = "Momentum" | "Trend" | "Volatility" | "Volume" | "Support/Resistance" | "Custom";

// Define the interface for indicator data
interface Indicator {
  id: string;
  name: string;
  category: IndicatorCategory;
  description: string;
  bestConditions: string[];
  tradingPairs: string[];
  timeframes: string[];
  image?: string;
  installGuide?: string;
  isNew?: boolean;
  recommendedSettings?: {
    parameter: string;
    value: string;
    description?: string;
  }[];
}

// Sample indicator data from the screenshots
const indicators: Indicator[] = [
  {
    id: "adaptive-2",
    name: "Adaptive 2.0",
    category: "Trend",
    description: "The Adaptive 2.0 indicator is an advanced binary options strategy that monitors its performance and market conditions, automatically altering its settings and 'adapting' as it runs. It combines moving average crossovers with RSI confirmation to identify high-probability entry points in trending markets.",
    bestConditions: [
      "Works best during medium to high volatility market conditions",
      "Most effective when MA crossovers align with RSI momentum",
      "Performs better the longer it runs as it continues to adapt to market conditions",
      "Wait for signal consolidation before entering trades",
      "Uses adaptive expiry time based on current market volatility"
    ],
    tradingPairs: ["EUR/USD", "GBP/USD", "AUD/USD", "BTC/USD"],
    timeframes: ["M1", "M5", "M15"],
    image: "/attached_assets/image_1747642482360.png",
    isNew: true,
    recommendedSettings: [
      { parameter: "RSI Period", value: "9", description: "Period for RSI calculation" },
      { parameter: "Fast MA Period", value: "6", description: "Period for the fast moving average" },
      { parameter: "Slow MA Period", value: "14", description: "Period for the slow moving average" },
      { parameter: "MA Method", value: "Simple", description: "Type of moving average calculation" },
      { parameter: "Volatility Filter", value: "On", description: "Filter to avoid choppy markets" }
    ]
  },
  {
    id: "awesome-oscillator",
    name: "Awesome Oscillator",
    category: "Momentum",
    description: "The Awesome Oscillator (AO) is a momentum indicator that shows the difference between a 5-period and 34-period simple moving average. It helps traders identify changes in momentum, potential reversals, and confirms trends.",
    bestConditions: [
      "Best used to confirm trend direction and potential reversals",
      "Look for the zero line crossovers for trend change signals",
      "Watch for saucer patterns and twin peaks for entry signals"
    ],
    tradingPairs: ["Major currency pairs", "Crypto pairs", "Commodities"],
    timeframes: ["M5", "M15", "H1", "H4"],
    image: "https://www.tradingview.com/x/iKVzVptm/",
    recommendedSettings: [
      { parameter: "Fast MA Period", value: "5", description: "Period for the fast moving average" },
      { parameter: "Slow MA Period", value: "34", description: "Period for the slow moving average" },
      { parameter: "MA Method", value: "Simple", description: "Type of moving average calculation" },
      { parameter: "Price", value: "Median", description: "Price used for calculations (median of high/low)" }
    ],
  },
  {
    id: "boss",
    name: "BOSS",
    category: "Trend",
    description: "The BOSS indicator is a proprietary Binary Options Specific Signal indicator designed to identify high-probability trade entry points in trending markets.",
    bestConditions: [
      "Works best during strong trending markets",
      "Most effective with trend confirmation from other indicators",
      "Wait for signal consolidation before entering trades"
    ],
    tradingPairs: ["EUR/USD", "GBP/USD", "AUD/USD", "BTC/USD"],
    timeframes: ["M1", "M5", "M15"],
    image: "https://s3.tradingview.com/snapshots/w/w4lDpULM.png",
  },
  {
    id: "ema-trend-lines",
    name: "EMA Alerts with Trend Lines",
    category: "Trend",
    description: "The EMA Alerts with Trend Lines indicator combines exponential moving averages with auto-drawn trend lines to identify trend direction and potential reversal points.",
    bestConditions: [
      "Best used in trending markets to confirm direction",
      "Wait for EMA crossovers combined with trend line tests",
      "Use with support/resistance levels for improved accuracy"
    ],
    tradingPairs: ["All major pairs", "Indices", "Commodities"],
    timeframes: ["M5", "M15", "H1"],
    image: "https://s3.tradingview.com/snapshots/k/kcU11rqm.png",
  },
  {
    id: "ema-alerts",
    name: "EMA Alerts",
    category: "Trend",
    description: "The EMA Alerts indicator provides automatic alerts when price crosses key exponential moving averages, helping traders identify potential trend changes quickly.",
    bestConditions: [
      "Best for identifying new trend formations",
      "Use in conjunction with price action confirmation",
      "Effective during market sessions with higher volatility"
    ],
    tradingPairs: ["Major and minor forex pairs", "Commodities", "Indices"],
    timeframes: ["M5", "M15", "H1", "H4"],
  },
  {
    id: "ema-cci-momentum",
    name: "EMA CCI MOMENTUM 20",
    category: "Momentum",
    description: "This indicator combines the EMA (Exponential Moving Average) with the CCI (Commodity Channel Index) to detect momentum shifts in the market, particularly effective in ranging markets.",
    bestConditions: [
      "Effective for range-bound market conditions",
      "Use when CCI crosses specific thresholds (+100/-100)",
      "Confirm signals with price action patterns"
    ],
    tradingPairs: ["Major forex pairs", "Stock indices", "Commodities"],
    timeframes: ["M5", "M15", "H1"],
  },
  {
    id: "haema-alert",
    name: "HAEMA Alert",
    category: "Trend",
    description: "The HAEMA Alert combines Heikin Ashi candles with EMA (Exponential Moving Average) to generate alerts for potential trend continuations and reversals.",
    bestConditions: [
      "Best used during trending market conditions",
      "Wait for consecutive Heikin Ashi candles in the same direction",
      "Confirm with EMA direction for higher probability trades"
    ],
    tradingPairs: ["EUR/USD", "GBP/USD", "USD/JPY", "Gold", "Oil"],
    timeframes: ["M15", "H1", "H4"],
  },
  {
    id: "macd-alerts",
    name: "MACD Alerts",
    category: "Momentum",
    description: "MACD Alerts provides timely notifications when the MACD line crosses the signal line or the zero line, helping traders identify potential momentum shifts in the market.",
    bestConditions: [
      "Most effective in trending markets",
      "Look for MACD line/signal line crossovers",
      "Pay attention to divergences between price and MACD"
    ],
    tradingPairs: ["All major forex pairs", "Crypto", "Indices"],
    timeframes: ["M5", "M15", "H1", "H4", "D1"],
  },
  {
    id: "otc-3",
    name: "OTC 3.0",
    category: "Custom",
    description: "OTC 3.0 is a specialized indicator designed for OTC (Over The Counter) markets, particularly effective for binary options trading during weekend sessions.",
    bestConditions: [
      "Designed specifically for OTC markets and weekend trading",
      "Best results during low volatility periods",
      "Use with confirmation from price action patterns"
    ],
    tradingPairs: ["OTC pairs", "Weekend markets", "Low volatility assets"],
    timeframes: ["M1", "M5", "M15"],
  },
  {
    id: "otc-redline",
    name: "OTC RedLine",
    category: "Custom",
    description: "OTC RedLine is a specialized indicator for OTC markets that displays critical support and resistance levels with red lines, helping traders identify optimal entry points.",
    bestConditions: [
      "Best for OTC markets during weekend trading",
      "Wait for price to approach or bounce from the red lines",
      "Combine with volume analysis for better results"
    ],
    tradingPairs: ["OTC forex pairs", "Weekend trading instruments"],
    timeframes: ["M1", "M5", "M15"],
  },
  {
    id: "otc",
    name: "OTC",
    category: "Custom",
    description: "The OTC indicator is designed specifically for Over The Counter markets, providing signals optimized for the unique characteristics of these less regulated markets.",
    bestConditions: [
      "Optimized for weekend trading sessions",
      "Best used with OTC broker pairs",
      "Combine with trend analysis for improved accuracy"
    ],
    tradingPairs: ["Broker-specific OTC pairs", "Weekend trading instruments"],
    timeframes: ["M1", "M5", "M15"],
  },
  {
    id: "po-otc",
    name: "PO OTC",
    category: "Custom",
    description: "PO OTC (Pocket Option OTC) is a custom indicator specifically designed for Pocket Option's OTC markets, optimized for binary options trading during weekend sessions.",
    bestConditions: [
      "Specifically calibrated for Pocket Option's OTC markets",
      "Best results during weekend trading sessions",
      "Use with appropriate expiry times based on timeframe"
    ],
    tradingPairs: ["Pocket Option OTC pairs"],
    timeframes: ["M1", "M5", "M15"],
  },
  {
    id: "pocket-options-optimized",
    name: "Pocket Options Optimized Indicator",
    category: "Custom",
    description: "Pocket Options Optimized Indicator is specifically calibrated for the Pocket Option platform, providing signals optimized for the platform's unique execution and pricing characteristics.",
    bestConditions: [
      "Designed specifically for Pocket Option platform",
      "Best results when used with platform's recommended timeframes",
      "Use with the indicator's recommended expiry times"
    ],
    tradingPairs: ["All pairs available on Pocket Option"],
    timeframes: ["M1", "M5", "M15", "M30"],
  },
  {
    id: "sma-rsi",
    name: "SMA w-RSI",
    category: "Momentum",
    description: "SMA w-RSI combines Simple Moving Averages with the Relative Strength Index to provide a comprehensive view of both trend direction and momentum.",
    bestConditions: [
      "Works best in trending markets with clear direction",
      "Look for RSI divergence with price for reversal signals",
      "Use SMA crossovers to confirm trend changes"
    ],
    tradingPairs: ["Major forex pairs", "Stock indices", "Commodities"],
    timeframes: ["M15", "H1", "H4", "D1"],
  },
  {
    id: "sma-greenline-52",
    name: "SMAGreenLine 5.2",
    category: "Trend",
    description: "SMAGreenLine 5.2 uses Simple Moving Averages to display trend direction with color-coded lines, providing clear visual signals for entries and exits.",
    bestConditions: [
      "Most effective in trending markets",
      "Wait for green line direction changes for trend shift confirmation",
      "Use with support/resistance levels for entry/exit points"
    ],
    tradingPairs: ["Major forex pairs", "Commodities", "Indices"],
    timeframes: ["M5", "M15", "H1"],
  },
  {
    id: "sma-greenline-54",
    name: "SMAGreenLine 5.4",
    category: "Trend",
    description: "An updated version of the SMAGreenLine indicator with improvements for more accurate trend identification and signal generation.",
    bestConditions: [
      "Best used in trending markets with clear directional bias",
      "Wait for line color changes for potential trend shifts",
      "Combine with price action confirmation for better results"
    ],
    tradingPairs: ["Major forex pairs", "Commodities", "Crypto"],
    timeframes: ["M5", "M15", "H1", "H4"],
  },
  {
    id: "stochastic-rsi-alert",
    name: "Stochastic RSI Alert",
    category: "Momentum",
    description: "Stochastic RSI Alert combines the Stochastic Oscillator with RSI to generate alerts for overbought and oversold conditions, as well as potential momentum shifts.",
    bestConditions: [
      "Best for identifying potential reversal points",
      "Most effective in ranging market conditions",
      "Look for divergences between indicator and price"
    ],
    tradingPairs: ["Major and minor forex pairs", "Commodities", "Indices"],
    timeframes: ["M5", "M15", "H1", "H4"],
  },
  {
    id: "super-trend",
    name: "Super_Trend",
    category: "Trend",
    description: "Super_Trend is a trend-following indicator that identifies the current market trend and provides potential entry and exit points with customizable parameters.",
    bestConditions: [
      "Works best in trending markets with clear direction",
      "Wait for indicator color changes for trend shift signals",
      "Use with volume confirmation for higher probability trades"
    ],
    tradingPairs: ["Major forex pairs", "Indices", "Commodities"],
    timeframes: ["M15", "H1", "H4", "D1"],
  },
  {
    id: "vortex",
    name: "VORTEX",
    category: "Trend",
    description: "The VORTEX indicator identifies the start of a new trend and confirms ongoing trends by measuring positive and negative trend movement.",
    bestConditions: [
      "Best used for trend identification and confirmation",
      "Look for crossovers between VI+ and VI- lines",
      "Most effective in markets with clear trending behavior"
    ],
    tradingPairs: ["Major forex pairs", "Commodities", "Indices"],
    timeframes: ["H1", "H4", "D1"],
  }
];

const StrategiesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Filter indicators based on search term and category
  const filteredIndicators = indicators.filter(indicator => {
    const matchesSearch = indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         indicator.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || indicator.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main>
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Trading Strategies Library</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Explore our comprehensive collection of trading indicators and strategies
                designed for optimal performance with Binary Baseline.
              </p>
            </div>
            
            {/* Strategy Customization Guide */}
            <CustomizationGuide />
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              {/* Search and filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                  type="text"
                  placeholder="Search indicators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background/70"
                />
                
                <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}
                  className="w-full md:w-auto">
                  <TabsList className="grid grid-cols-4 md:flex md:flex-wrap h-auto p-1 gap-1">
                    <TabsTrigger value="all" className="text-xs md:text-sm px-2 py-1.5">All</TabsTrigger>
                    <TabsTrigger value="Momentum" className="text-xs md:text-sm px-2 py-1.5">Momentum</TabsTrigger>
                    <TabsTrigger value="Trend" className="text-xs md:text-sm px-2 py-1.5">Trend</TabsTrigger>
                    <TabsTrigger value="Volatility" className="text-xs md:text-sm px-2 py-1.5">Volatility</TabsTrigger>
                    <TabsTrigger value="Volume" className="text-xs md:text-sm px-2 py-1.5">Volume</TabsTrigger>
                    <TabsTrigger value="Support/Resistance" className="text-xs md:text-sm px-2 py-1.5">S/R</TabsTrigger>
                    <TabsTrigger value="Custom" className="text-xs md:text-sm px-2 py-1.5">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-400">
                Showing {filteredIndicators.length} of {indicators.length} indicators
              </p>
            </div>
            
            {/* Indicators grid */}
            {/* Live Trading Results Showcase */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="gradient-text">Live Trading Results</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  See our indicators in action with real trading screenshots showing verified results and performance metrics.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/30">
                  <img 
                    src="/api/assets/Screenshot 2025-03-30 151639_1752722190575.png" 
                    alt="MetaTrader 5 showing Binary Baseline indicators with multiple currency pairs analysis"
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Multi-Pair Analysis</h3>
                    <p className="text-sm text-gray-400">MetaTrader 5 setup with our indicators running on multiple currency pairs simultaneously</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    MT5 Live
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/30">
                  <img 
                    src="/api/assets/Screenshot 2025-03-30 152438_1752722190575.png" 
                    alt="MetaTrader 5 showing SMAGreenLine indicator with signal alerts on EUR/USD"
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">SMAGreenLine Signals</h3>
                    <p className="text-sm text-gray-400">Real-time buy/sell signals from our SMAGreenLine 5.4 indicator with 90% win rate</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    90% Win Rate
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/30">
                  <img 
                    src="/api/assets/Screenshot 2025-03-30 111951_1752722190573.png" 
                    alt="Pocket Option showing successful trades with Binary Baseline signal integration"
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Live Trade Execution</h3>
                    <p className="text-sm text-gray-400">Pocket Option showing successful trades executed from our MT5 signals</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-purple-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Auto Execute
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIndicators.map((indicator) => (
                <CardGradient key={indicator.id} className={`p-6 flex flex-col h-full ${indicator.isNew ? 'ring-2 ring-primary' : ''} relative`}>
                  {indicator.isNew && (
                    <div className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold px-2 py-1 rounded-md transform rotate-3 shadow-lg">
                      NEW
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    {indicator.category === "Momentum" && <Gauge className="text-accent" size={24} />}
                    {indicator.category === "Trend" && <ChartLineUp className="text-primary" size={24} />}
                    {indicator.category === "Volatility" && <Bolt className="text-yellow-500" size={24} />}
                    {indicator.category === "Volume" && <ChartBar className="text-purple-500" size={24} />}
                    {indicator.category === "Support/Resistance" && <ChartArea className="text-green-500" size={24} />}
                    {indicator.category === "Custom" && <Bot className="text-blue-500" size={24} />}
                    <h3 className="text-xl font-bold">{indicator.name}</h3>
                  </div>
                  
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-4
                    bg-secondary/50 text-primary">{indicator.category}</span>
                  
                  <p className="text-gray-300 mb-4 flex-grow">{indicator.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Best Trading Conditions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      {indicator.bestConditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Recommended Pairs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {indicator.tradingPairs.map((pair, index) => (
                          <span key={index} className="text-xs bg-background/70 px-2 py-1 rounded">
                            {pair}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Timeframes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {indicator.timeframes.map((timeframe, index) => (
                          <span key={index} className="text-xs bg-background/70 px-2 py-1 rounded">
                            {timeframe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <IndicatorDetailsDialog indicator={indicator} />
                  </div>
                </CardGradient>
              ))}
            </div>
            
            {/* No results message */}
            {filteredIndicators.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold mb-2">No indicators found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}>
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Back to dashboard button */}
            <div className="flex justify-center mt-12">
              <Button asChild variant="outline">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StrategiesLibrary;