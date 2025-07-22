import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CardGradient } from '@/components/ui/card-gradient';
import { Clock, Download, FileText, Info, Star, Clock3 } from 'lucide-react';

interface IndicatorDetailsProps {
  indicator: {
    id: string;
    name: string;
    category: string;
    description: string;
    bestConditions: string[];
    tradingPairs: string[];
    timeframes: string[];
    image?: string;
    installGuide?: string;
    recommendedSettings?: {
      parameter: string;
      value: string;
      description?: string;
    }[];
  };
}

const IndicatorDetailsDialog: React.FC<IndicatorDetailsProps> = ({ indicator }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-1 gradient-text">
            {indicator.name}
          </DialogTitle>
          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-4
            bg-secondary/50 text-primary">{indicator.category}</span>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Info size={18} className="text-primary" />
              Overview
            </h3>
            <p className="text-gray-300">{indicator.description}</p>
          </div>
          
          {/* Best Conditions */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Star size={18} className="text-yellow-500" />
              Best Trading Conditions
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              {indicator.bestConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
          
          {/* Recommended Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardGradient className="p-4">
              <h3 className="text-md font-semibold flex items-center gap-2 mb-2">
                <FileText size={18} className="text-primary" />
                Recommended Trading Pairs
              </h3>
              <div className="flex flex-wrap gap-2">
                {indicator.tradingPairs.map((pair, index) => (
                  <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-background/80 border border-gray-700">
                    {pair}
                  </span>
                ))}
              </div>
            </CardGradient>
            
            <CardGradient className="p-4">
              <h3 className="text-md font-semibold flex items-center gap-2 mb-2">
                <Clock3 size={18} className="text-primary" />
                Best Timeframes
              </h3>
              <div className="flex flex-wrap gap-2">
                {indicator.timeframes.map((timeframe, index) => (
                  <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-background/80 border border-gray-700">
                    {timeframe}
                  </span>
                ))}
              </div>
            </CardGradient>
          </div>
          
          {/* Recommended Settings */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Clock size={18} className="text-blue-500" />
              Recommended Settings
            </h3>
            
            {indicator.recommendedSettings ? (
              <div className="mb-4">
                <p className="text-gray-300 mb-2">
                  For optimal performance, use these parameter settings:
                </p>
                <div className="bg-background/50 border border-gray-700 rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-3 font-medium">Parameter</th>
                        <th className="text-left py-2 px-3 font-medium">Value</th>
                        <th className="text-left py-2 px-3 font-medium hidden md:table-cell">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicator.recommendedSettings.map((setting, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-background/30" : ""}>
                          <td className="py-2 px-3">{setting.parameter}</td>
                          <td className="py-2 px-3 font-mono">{setting.value}</td>
                          <td className="py-2 px-3 hidden md:table-cell text-gray-400">{setting.description || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-blue-400 text-sm">
                  <p>For updated settings and market-specific configurations, join our <a href="https://t.me/+JmFXqobG0xIxYWMx" className="underline" target="_blank" rel="noopener noreferrer">Telegram channel</a> or connect to our IRC server at <span className="font-mono">irc.binary-baseline.com</span> (channel: #live-settings).</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-300 mb-3">
                  This indicator works best with its default settings for most trading conditions. However, consider adjusting timeframes based on your trading style:
                </p>
                <ul className="list-disc pl-5 mb-3 space-y-1 text-gray-300">
                  <li>Scalping: Use M1-M5 timeframes</li>
                  <li>Day trading: Use M15-H1 timeframes</li>
                  <li>Swing trading: Use H4-D1 timeframes</li>
                </ul>
                <div className="mt-1 bg-blue-900/20 border border-blue-800/30 rounded-md p-3 text-sm">
                  <p className="text-blue-400">
                    <strong>Need the optimal settings?</strong> For up-to-date parameter configurations and market-specific settings, join our <a href="https://t.me/+JmFXqobG0xIxYWMx" className="underline" target="_blank" rel="noopener noreferrer">Telegram channel</a> or connect to our IRC server at <span className="font-mono">irc.binary-baseline.com</span> (channel: #live-settings).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Installation Instructions */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Download size={18} className="text-green-500" />
              Installation
            </h3>
            <p className="text-gray-300 mb-2">
              This indicator is included in the Binary Baseline package. To access it:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-300">
              <li>Download and install Binary Baseline (see Downloads page)</li>
              <li>Launch MetaTrader 5</li>
              <li>Open navigator window (Ctrl+N)</li>
              <li>Expand the "Indicators" folder</li>
              <li>Find "{indicator.name}" in your Binary Baseline indicators folder</li>
              <li>Drag and drop onto your chart</li>
            </ol>
          </div>
          
          {/* Image Preview (if available) */}
          {indicator.image && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <img 
                src={indicator.image} 
                alt={`${indicator.name} preview`} 
                className="w-full rounded-md border border-gray-700"
              />
            </div>
          )}
          
          {/* Additional Installation Guide (if available) */}
          {indicator.installGuide && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Additional Setup Instructions</h3>
              <p className="text-gray-300">{indicator.installGuide}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IndicatorDetailsDialog;