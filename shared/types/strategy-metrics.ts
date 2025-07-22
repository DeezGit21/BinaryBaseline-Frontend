export interface StrategyMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change?: number; // Percentage change
  direction?: 'up' | 'down' | 'neutral';
  description?: string;
}

export interface PerformanceTimePeriod {
  id: string;
  label: string;
  days: number;
}

export interface StrategyPerformance {
  strategyId: string;
  profitLoss: number; // Total P&L
  totalTrades: number;
  winRate: number; // Win percentage
  avgWin: number;
  avgLoss: number;
  largestWin: number;
  largestLoss: number;
  profitFactor: number; // Total gain / total loss
  expectancy: number; // Average expected return per trade
  sharpeRatio?: number;
  maxDrawdown: number; // Maximum drawdown percentage
  successfulTrades: number;
  unsuccessfulTrades: number;
  timeframe: string; // e.g., "daily", "4h", "1h"
  period: PerformanceTimePeriod;
  lastUpdated: string; // ISO date string
}

export interface StrategyTradeRecord {
  id: string;
  strategyId: string;
  tradeType: 'BUY' | 'SELL';
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
  entryTime: string; // ISO date string
  exitTime: string; // ISO date string
  duration: number; // In milliseconds
  volume: number;
  successful: boolean;
  takeProfit?: number;
  stopLoss?: number;
  comment?: string;
}

export interface PerformanceChartData {
  date: string;
  value: number;
  tradeCount?: number;
  baseline?: number; // For comparison with a baseline/index
}

export interface PerformanceStats {
  metrics: StrategyMetric[];
  history: PerformanceChartData[];
  trades: StrategyTradeRecord[];
  performance: StrategyPerformance;
}