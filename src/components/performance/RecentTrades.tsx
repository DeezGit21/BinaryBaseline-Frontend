import { StrategyTradeRecord } from "../../../shared/types/strategy-metrics";
import { CardGradient } from "@/components/ui/card-gradient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecentTradesProps {
  trades: StrategyTradeRecord[];
  title?: string;
  maxRows?: number;
  className?: string;
}

export const RecentTrades = ({
  trades,
  title = "Recent Trades",
  maxRows = 5,
  className = ""
}: RecentTradesProps) => {
  // Format date to a more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format duration to a readable format (e.g., "2h 45m")
  const formatDuration = (durationMs: number) => {
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes}m`;
    }
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <CardGradient className={`p-5 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge>{trades.length} total</Badge>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Exit</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.slice(0, maxRows).map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {trade.tradeType === "BUY" ? (
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    )}
                    {trade.tradeType}
                  </div>
                </TableCell>
                <TableCell>{formatDate(trade.entryTime)}</TableCell>
                <TableCell>{formatDate(trade.exitTime)}</TableCell>
                <TableCell className={trade.successful ? "text-green-400" : "text-red-400"}>
                  {trade.profitLoss > 0 ? "+" : ""}{trade.profitLoss.toFixed(2)}
                  <span className="text-xs ml-1">({trade.profitLossPercentage.toFixed(2)}%)</span>
                </TableCell>
                <TableCell>{formatDuration(trade.duration)}</TableCell>
                <TableCell className="text-right">
                  {trade.successful ? (
                    <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-800">
                      <Check className="h-3 w-3 mr-1" /> Success
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-800">
                      <X className="h-3 w-3 mr-1" /> Loss
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            
            {trades.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                  No trades available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CardGradient>
  );
};