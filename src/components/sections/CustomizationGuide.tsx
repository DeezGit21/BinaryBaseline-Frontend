import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Settings, AlertTriangle, CheckCircle, BookOpen, Target, TrendingUp } from "@/lib/icons";

interface RiskLevel {
  level: "Conservative" | "Moderate" | "Aggressive";
  description: string;
  winRateTarget: number;
  maxDrawdown: number;
  recommendedCapital: number;
}

interface CustomizationExample {
  id: string;
  name: string;
  strategy: string;
  riskLevel: RiskLevel["level"];
  settings: {
    parameter: string;
    defaultValue: string;
    customValue: string;
    reasoning: string;
  }[];
  expectedOutcome: {
    winRate: number;
    monthlyReturn: number;
    maxDrawdown: number;
  };
  marketConditions: string[];
  timeframes: string[];
}

const riskLevels: RiskLevel[] = [
  {
    level: "Conservative",
    description: "Lower risk, steady returns with minimal drawdowns",
    winRateTarget: 65,
    maxDrawdown: 10,
    recommendedCapital: 1000
  },
  {
    level: "Moderate",
    description: "Balanced risk-reward with moderate volatility",
    winRateTarget: 70,
    maxDrawdown: 20,
    recommendedCapital: 2500
  },
  {
    level: "Aggressive",
    description: "Higher risk, higher reward with larger drawdowns",
    winRateTarget: 75,
    maxDrawdown: 35,
    recommendedCapital: 5000
  }
];

const customizationExamples: CustomizationExample[] = [
  {
    id: "1",
    name: "Conservative MACD Setup",
    strategy: "MACD Crossover",
    riskLevel: "Conservative",
    settings: [
      {
        parameter: "Fast EMA Period",
        defaultValue: "12",
        customValue: "16",
        reasoning: "Slower signals reduce false entries in volatile markets"
      },
      {
        parameter: "Slow EMA Period",
        defaultValue: "26",
        customValue: "32",
        reasoning: "Wider spread between EMAs filters out noise"
      },
      {
        parameter: "Signal Line Period",
        defaultValue: "9",
        customValue: "12",
        reasoning: "Smoother signal line reduces whipsaws"
      },
      {
        parameter: "Minimum Signal Strength",
        defaultValue: "0.5",
        customValue: "0.8",
        reasoning: "Higher threshold ensures stronger signals"
      }
    ],
    expectedOutcome: {
      winRate: 78,
      monthlyReturn: 15,
      maxDrawdown: 8
    },
    marketConditions: ["Trending markets", "Medium volatility", "Clear directional bias"],
    timeframes: ["M15", "H1", "H4"]
  },
  {
    id: "2",
    name: "Aggressive RSI Scalping",
    strategy: "RSI Overbought/Oversold",
    riskLevel: "Aggressive",
    settings: [
      {
        parameter: "RSI Period",
        defaultValue: "14",
        customValue: "8",
        reasoning: "Faster RSI responds quicker to price changes for scalping"
      },
      {
        parameter: "Overbought Level",
        defaultValue: "70",
        customValue: "75",
        reasoning: "Higher threshold catches stronger reversals"
      },
      {
        parameter: "Oversold Level",
        defaultValue: "30",
        customValue: "25",
        reasoning: "Lower threshold for more aggressive entries"
      },
      {
        parameter: "Expiry Time",
        defaultValue: "5 minutes",
        customValue: "3 minutes",
        reasoning: "Shorter expiry for quick scalping profits"
      }
    ],
    expectedOutcome: {
      winRate: 68,
      monthlyReturn: 32,
      maxDrawdown: 28
    },
    marketConditions: ["High volatility", "Ranging markets", "Strong intraday movements"],
    timeframes: ["M1", "M5"]
  },
  {
    id: "3",
    name: "Moderate Bollinger Strategy",
    strategy: "Bollinger Breakout",
    riskLevel: "Moderate",
    settings: [
      {
        parameter: "Period",
        defaultValue: "20",
        customValue: "25",
        reasoning: "Slightly longer period for more stable bands"
      },
      {
        parameter: "Standard Deviation",
        defaultValue: "2.0",
        customValue: "2.2",
        reasoning: "Wider bands reduce false breakouts"
      },
      {
        parameter: "Breakout Confirmation",
        defaultValue: "1 candle",
        customValue: "2 candles",
        reasoning: "Additional confirmation reduces false signals"
      },
      {
        parameter: "Volume Filter",
        defaultValue: "Off",
        customValue: "On",
        reasoning: "Volume confirmation strengthens breakout signals"
      }
    ],
    expectedOutcome: {
      winRate: 73,
      monthlyReturn: 22,
      maxDrawdown: 18
    },
    marketConditions: ["Trending markets", "Breakout scenarios", "Medium to high volatility"],
    timeframes: ["M5", "M15", "H1"]
  }
];

const CustomizationGuide = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Strategy Customization Guide</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Learn how to customize our trading strategies to match your risk tolerance and trading style for optimal performance.
          </p>
        </div>

        <Tabs defaultValue="risk-levels" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="risk-levels">Risk Levels</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="risk-levels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {riskLevels.map((risk, index) => (
                <Card key={index} className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {risk.level}
                    </CardTitle>
                    <CardDescription>{risk.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Win Rate Target:</span>
                        <span className="text-sm font-semibold text-green-400">{risk.winRateTarget}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Max Drawdown:</span>
                        <span className="text-sm font-semibold text-orange-400">{risk.maxDrawdown}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Min Capital:</span>
                        <span className="text-sm font-semibold text-primary">${risk.recommendedCapital}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {customizationExamples.map((example) => (
                <Card key={example.id} className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.name}</CardTitle>
                      <Badge variant={
                        example.riskLevel === "Conservative" ? "secondary" :
                        example.riskLevel === "Moderate" ? "default" : "destructive"
                      }>
                        {example.riskLevel}
                      </Badge>
                    </div>
                    <CardDescription>{example.strategy}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-gray-400">Win Rate</div>
                          <div className="text-sm font-bold text-green-400">{example.expectedOutcome.winRate}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Monthly</div>
                          <div className="text-sm font-bold text-primary">{example.expectedOutcome.monthlyReturn}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Drawdown</div>
                          <div className="text-sm font-bold text-orange-400">{example.expectedOutcome.maxDrawdown}%</div>
                        </div>
                      </div>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="settings">
                          <AccordionTrigger className="text-sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Parameter Settings
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {example.settings.map((setting, index) => (
                                <div key={index} className="text-xs border-l-2 border-primary/30 pl-2">
                                  <div className="font-semibold">{setting.parameter}</div>
                                  <div className="text-gray-400">
                                    {setting.defaultValue} → {setting.customValue}
                                  </div>
                                  <div className="text-gray-500 mt-1">{setting.reasoning}</div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="text-xs">
                        <div className="text-gray-400 mb-1">Best Timeframes:</div>
                        <div className="flex flex-wrap gap-1">
                          {example.timeframes.map((tf, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-0">
                              {tf}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>Start with paper trading to test customizations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>Make incremental changes and test each modification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>Keep detailed records of parameter changes and results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>Backtest strategies for at least 3 months of data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>Consider market conditions when adjusting parameters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>Set appropriate stop-losses and take-profits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                      <span>Don't over-optimize for short-term performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                      <span>Don't change multiple parameters simultaneously</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                      <span>Don't ignore risk management principles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                      <span>Don't trade with real money until thoroughly tested</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                      <span>Don't abandon strategies after short-term losses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                      <span>Don't use excessive leverage or position sizes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Getting Started Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Setup Phase</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>□ Choose your risk tolerance level</li>
                      <li>□ Select primary trading strategy</li>
                      <li>□ Set up demo account for testing</li>
                      <li>□ Configure initial parameters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Testing Phase</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>□ Run backtests on historical data</li>
                      <li>□ Paper trade for 2-4 weeks</li>
                      <li>□ Analyze performance metrics</li>
                      <li>□ Fine-tune parameters if needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CustomizationGuide;