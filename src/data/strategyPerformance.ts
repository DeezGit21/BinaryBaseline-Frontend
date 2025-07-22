import { 
  PerformanceStats, 
  PerformanceTimePeriod, 
  PerformanceChartData, 
  StrategyMetric, 
  StrategyPerformance, 
  StrategyTradeRecord 
} from "../../../shared/types/strategy-metrics";

// Performance time periods
export const timePeriods: PerformanceTimePeriod[] = [
  { id: "1w", label: "1 Week", days: 7 },
  { id: "1m", label: "1 Month", days: 30 },
  { id: "3m", label: "3 Months", days: 90 },
  { id: "6m", label: "6 Months", days: 180 },
  { id: "1y", label: "1 Year", days: 365 },
  { id: "all", label: "All Time", days: 0 }
];

// Generate sample historical data
const generateHistoricalData = (days: number, startValue: number, volatility: number): PerformanceChartData[] => {
  const result: PerformanceChartData[] = [];
  let currentValue = startValue;
  const now = new Date();
  
  // If days is 0 (all time), use 365 days as a default
  const daysToGenerate = days === 0 ? 365 : days;
  
  for (let i = daysToGenerate; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Generate a random change with given volatility
    const change = (Math.random() * 2 - 1) * volatility;
    currentValue = Math.max(0, currentValue + change);
    
    result.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD format
      value: parseFloat(currentValue.toFixed(2)),
      tradeCount: Math.floor(Math.random() * 3), // 0-2 trades per day
      baseline: parseFloat((startValue * (1 + (Math.random() * 0.1 * (daysToGenerate - i) / daysToGenerate))).toFixed(2))
    });
  }
  
  return result;
};

// Generate sample trades
const generateTrades = (count: number, strategyId: string, successRate: number): StrategyTradeRecord[] => {
  const trades: StrategyTradeRecord[] = [];
  const now = new Date();
  const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'NZDUSD', 'USDCAD', 'USDCHF'];
  
  for (let i = 0; i < count; i++) {
    const successful = seededRandom(strategyId, i * 10) < successRate;
    const entryPrice = parseFloat((1 + seededRandom(strategyId, i * 10 + 1)).toFixed(5));
    
    // Generate profit/loss amounts based on new requirements
    const profitLoss = successful 
      ? parseFloat((seededRandom(strategyId, i * 10 + 2) * 7 + 8).toFixed(2)) // $8-15 for wins
      : parseFloat(-(seededRandom(strategyId, i * 10 + 3) * 2.9 + 2).toFixed(2)); // $2-4.90 for losses
    
    const volume = Math.floor(seededRandom(strategyId, i * 10 + 4) * 5 + 1) * 0.1;
    const profitLossPercentage = parseFloat((profitLoss / (volume * 100)).toFixed(2));
    const exitPrice = parseFloat((entryPrice * (1 + profitLossPercentage / 100)).toFixed(5));
    
    const exitDate = new Date(now);
    exitDate.setDate(now.getDate() - Math.floor(seededRandom(strategyId, i * 10 + 5) * 30));
    
    const entryDate = new Date(exitDate);
    const durationHours = Math.floor(seededRandom(strategyId, i * 10 + 6) * 48 + 1);
    entryDate.setHours(entryDate.getHours() - durationHours);
    
    trades.push({
      id: `trade-${strategyId}-${i}`,
      strategyId,
      tradeType: seededRandom(strategyId, i * 10 + 7) > 0.5 ? 'BUY' : 'SELL',
      symbol: symbols[Math.floor(seededRandom(strategyId, i * 10 + 8) * symbols.length)],
      entryPrice,
      exitPrice,
      profitLoss,
      profitLossPercentage,
      entryTime: entryDate.toISOString(),
      exitTime: exitDate.toISOString(),
      duration: durationHours * 60 * 60 * 1000, // hours to ms
      volume,
      successful,
      takeProfit: successful ? exitPrice : undefined,
      stopLoss: !successful ? exitPrice : undefined,
      comment: successful ? "Target reached" : "Stop-loss triggered"
    });
  }
  
  return trades.sort((a, b) => new Date(b.exitTime).getTime() - new Date(a.exitTime).getTime());
};

// Simple seeded random function for consistent values per strategy
const seededRandom = (seed: string, index: number = 0): number => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index;
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};

// Generate performance for a strategy
const generatePerformance = (
  strategyId: string, 
  winRate: number, 
  periodId: string
): StrategyPerformance => {
  // Ensure win rate is at least 73%
  const adjustedWinRate = Math.max(0.73, winRate);
  
  const period = timePeriods.find(p => p.id === periodId) || timePeriods[0];
  const totalTrades = Math.floor(seededRandom(strategyId, 1) * 100 + 50);
  const successfulTrades = Math.floor(totalTrades * adjustedWinRate);
  const unsuccessfulTrades = totalTrades - successfulTrades;
  
  // Generate avg win: over $8, with variety between $8-15 (using seeded random for consistency)
  const avgWin = parseFloat((seededRandom(strategyId, 2) * 7 + 8).toFixed(2));
  // Generate avg loss: less than $5, with variety between $2-4.90
  const avgLoss = parseFloat((seededRandom(strategyId, 3) * 2.9 + 2).toFixed(2));
  
  // Generate largest win: over $200, with variety between $200-400
  const largestWin = parseFloat((seededRandom(strategyId, 4) * 200 + 200).toFixed(2));
  // Generate largest loss: under $75, with variety between $30-74
  const largestLoss = parseFloat((seededRandom(strategyId, 5) * 44 + 30).toFixed(2));
  
  const profitLoss = parseFloat(((successfulTrades * avgWin) - (unsuccessfulTrades * avgLoss)).toFixed(2));
  const profitFactor = unsuccessfulTrades > 0 
    ? parseFloat((successfulTrades * avgWin / (unsuccessfulTrades * avgLoss)).toFixed(2))
    : parseFloat((successfulTrades * avgWin / 1).toFixed(2)); // Avoid division by zero
  const expectancy = parseFloat(((avgWin * adjustedWinRate) - (avgLoss * (1 - adjustedWinRate))).toFixed(2));
  
  return {
    strategyId,
    profitLoss,
    totalTrades,
    winRate: parseFloat((adjustedWinRate * 100).toFixed(2)),
    avgWin,
    avgLoss,
    largestWin,
    largestLoss,
    profitFactor,
    expectancy,
    sharpeRatio: parseFloat((seededRandom(strategyId, 6) * 2 + 0.5).toFixed(2)),
    maxDrawdown: parseFloat((seededRandom(strategyId, 7) * 15 + 5).toFixed(2)),
    successfulTrades,
    unsuccessfulTrades,
    timeframe: ['1h', '4h', 'daily'][Math.floor(seededRandom(strategyId, 8) * 3)],
    period,
    lastUpdated: new Date().toISOString()
  };
};

// Generate metrics for a strategy
const generateMetrics = (performance: StrategyPerformance): StrategyMetric[] => {
  return [
    {
      id: "profit",
      name: "Total Profit",
      value: performance.profitLoss,
      unit: "$",
      change: parseFloat((Math.random() * 20 - 5).toFixed(2)),
      direction: performance.profitLoss > 0 ? "up" : "down",
      description: "Total profit/loss across all trades"
    },
    {
      id: "winRate",
      name: "Win Rate",
      value: performance.winRate,
      unit: "%",
      change: parseFloat((Math.random() * 10 - 3).toFixed(2)),
      direction: performance.winRate > 50 ? "up" : "down",
      description: "Percentage of trades that were profitable"
    },
    {
      id: "profitFactor",
      name: "Profit Factor",
      value: performance.profitFactor,
      unit: "x",
      change: parseFloat((Math.random() * 0.5 - 0.1).toFixed(2)),
      direction: performance.profitFactor > 1 ? "up" : "down",
      description: "Ratio of gross profit to gross loss"
    },
    {
      id: "expectancy",
      name: "Expectancy",
      value: performance.expectancy,
      unit: "$",
      change: parseFloat((Math.random() * 0.3 - 0.1).toFixed(2)),
      direction: performance.expectancy > 0 ? "up" : "down",
      description: "Average amount you can expect to win/lose per trade"
    },
    {
      id: "maxDrawdown",
      name: "Max Drawdown",
      value: performance.maxDrawdown,
      unit: "%",
      change: parseFloat((Math.random() * 5 - 1).toFixed(2)),
      direction: "down",
      description: "Largest peak-to-trough decline in account balance"
    }
  ];
};

// Generate full stats for a strategy and time period
export const generateStrategyStats = (
  strategyId: string, 
  periodId: string = "1m", 
  baseWinRate?: number
): PerformanceStats => {
  // Use actual win rate from strategy list if baseWinRate not provided
  const actualWinRate = baseWinRate || strategiesList.find(s => s.id === strategyId)?.winRate || 0.75;
  const performance = generatePerformance(strategyId, actualWinRate, periodId);
  const period = timePeriods.find(p => p.id === periodId) || timePeriods[0];
  
  const startValue = 10000;
  const history = generateHistoricalData(period.days, startValue, 200);
  
  const trades = generateTrades(performance.totalTrades, strategyId, actualWinRate);
  const metrics = generateMetrics(performance);
  
  return {
    metrics,
    history,
    trades,
    performance
  };
};

// Generate performance stats for different time periods
export const getStrategyStatsByPeriod = (strategyId: string, periodId: string): PerformanceStats => {
  // Use actual win rate from strategy list
  const strategy = strategiesList.find(s => s.id === strategyId);
  const winRate = strategy?.winRate || 0.75;
  return generateStrategyStats(strategyId, periodId, winRate);
};

// Strategy list with win rates - matching actual strategies in the library
export const strategiesList = [
  { id: "adaptive-2", name: "Adaptive 2.0", winRate: 0.89, description: "Advanced strategy that adapts to market conditions automatically" },
  { id: "awesome-oscillator", name: "Awesome Oscillator", winRate: 0.83, description: "Momentum indicator using 5/34 period MA difference" },
  { id: "boss", name: "BOSS", winRate: 0.91, description: "Proprietary Binary Options Specific Signal indicator" },
  { id: "ema-trend-lines", name: "EMA Alerts with Trend Lines", winRate: 0.87, description: "EMA crossovers with auto-drawn trend lines" },
  { id: "ema-alerts", name: "EMA Alerts", winRate: 0.88, description: "Alerts when price crosses key exponential moving averages" },
  { id: "ema-cci-momentum", name: "EMA CCI MOMENTUM 20", winRate: 0.85, description: "EMA combined with CCI for momentum detection" },
  { id: "haema-alert", name: "HAEMA Alert", winRate: 0.82, description: "Heikin Ashi candles with EMA for trend analysis" },
  { id: "macd-alerts", name: "MACD Alerts", winRate: 0.86, description: "MACD line crossovers and momentum shift alerts" },
  { id: "otc-3", name: "OTC 3.0", winRate: 0.88, description: "Specialized indicator for OTC markets and weekend trading" },
  { id: "otc-redline", name: "OTC RedLine", winRate: 0.84, description: "OTC markets with critical support/resistance levels" },
  { id: "otc", name: "OTC", winRate: 0.83, description: "Optimized for Over The Counter markets" },
  { id: "po-otc", name: "PO OTC", winRate: 0.92, description: "Custom indicator for Pocket Option's OTC markets" },
  { id: "pocket-options-optimized", name: "Pocket Options Optimized Indicator", winRate: 0.86, description: "Specifically calibrated for Pocket Option platform" },
  { id: "sma-rsi", name: "SMA w-RSI", winRate: 0.81, description: "Simple Moving Averages with RSI for trend and momentum" },
  { id: "sma-greenline-52", name: "SMAGreenLine 5.2", winRate: 0.83, description: "SMA with color-coded trend direction lines" },
  { id: "sma-greenline-54", name: "SMAGreenLine 5.4", winRate: 0.90, description: "Updated version with improved trend identification" },
  { id: "stochastic-rsi-alert", name: "Stochastic RSI Alert", winRate: 0.84, description: "Stochastic Oscillator with RSI for reversal signals" },
  { id: "super-trend", name: "Super_Trend", winRate: 0.85, description: "Trend-following indicator with customizable parameters" },
  { id: "vortex", name: "VORTEX", winRate: 0.88, description: "Identifies trend start and confirms ongoing trends" }
];