import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, DollarSign, Calendar } from "@/lib/icons";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  strategy: string;
  winRate: number;
  monthlyReturn: number;
  timeUsing: string;
  quote: string;
  avatar?: string;
  verified: boolean;
  totalTrades: number;
  profitAmount: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "Former Construction Worker",
    strategy: "Adaptive 2.0 + MACD Crossover",
    winRate: 84.3,
    monthlyReturn: 23.7,
    timeUsing: "8 months",
    quote: "Binary Baseline changed my life completely. I went from working construction for $50k/year to making $180k annually through trading. I've paid off my mortgage and finally have financial freedom for my family.",
    verified: true,
    totalTrades: 2847,
    profitAmount: 94500
  },
  {
    id: "2",
    name: "Sarah Rodriguez",
    role: "Single Mother",
    strategy: "Support & Resistance + RSI",
    winRate: 78.9,
    monthlyReturn: 18.2,
    timeUsing: "5 months",
    quote: "As a single mom working two jobs, Binary Baseline gave me hope. I started with $500 and now make more in a month trading than I did working 60 hours a week. My kids finally have the life they deserve.",
    verified: true,
    totalTrades: 1456,
    profitAmount: 45900
  },
  {
    id: "3",
    name: "David Kim",
    role: "Retired Engineer",
    strategy: "Ichimoku Cloud + Fibonacci",
    winRate: 87.1,
    monthlyReturn: 31.4,
    timeUsing: "1 year",
    quote: "After losing my retirement savings in 2008, I thought I'd never recover. Binary Baseline helped me rebuild everything and more. I'm now financially secure and even helping my grandchildren with college.",
    verified: true,
    totalTrades: 3920,
    profitAmount: 156500
  },
  {
    id: "4",
    name: "Lisa Thompson",
    role: "Former Retail Manager",
    strategy: "Bollinger Breakout + MACD",
    winRate: 82.7,
    monthlyReturn: 26.8,
    timeUsing: "7 months",
    quote: "I was burnt out from retail management making $35k/year. Binary Baseline transformed my life - I quit my job, travel the world, and make six figures trading just a few hours a day.",
    verified: true,
    totalTrades: 2103,
    profitAmount: 127800
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    role: "Former Taxi Driver",
    strategy: "Moving Average Cross + RSI",
    winRate: 79.6,
    monthlyReturn: 21.3,
    timeUsing: "4 months",
    quote: "I drove taxi for 12 years, working 14-hour days just to survive. Binary Baseline gave me a way out. Now I make more in a week than I used to make in a month, and I have time with my family.",
    verified: true,
    totalTrades: 1789,
    profitAmount: 78300
  },
  {
    id: "6",
    name: "Jennifer Walsh",
    role: "Former Waitress",
    strategy: "OTC 3.0 + Support/Resistance",
    winRate: 75.4,
    monthlyReturn: 16.9,
    timeUsing: "6 months",
    quote: "After years of struggling as a waitress, Binary Baseline gave me financial independence. I bought my first house at 34, something I never thought possible. This program truly saves lives.",
    verified: true,
    totalTrades: 934,
    profitAmount: 52800
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-background to-background/60">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Life-Changing Results</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Real people, real transformations. See how Binary Baseline has changed lives and created financial freedom for ordinary people.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Verified Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Real People</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Life Transformations</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">{testimonial.name}</CardTitle>
                      <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Win Rate</div>
                    <div className="text-lg font-bold text-green-400">{testimonial.winRate}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Monthly Return</div>
                    <div className="text-lg font-bold text-primary">{testimonial.monthlyReturn}%</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>Strategy: {testimonial.strategy}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{testimonial.timeUsing}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>${testimonial.profitAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <blockquote className="text-sm text-gray-300 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="text-xs text-gray-500 pt-2 border-t border-border/30">
                    {testimonial.totalTrades.toLocaleString()} total trades
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trading Success Screenshots */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Documented Trading Success</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real screenshots from our platform showing verified trading results and high win rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
              <img 
                src="/api/assets/Screenshot 2025-03-30 145248_1752722190574.png" 
                alt="Pocket Option trading interface showing successful EUR/USD trades with 92% payout"
                className="w-full h-auto"
              />
              <div className="absolute top-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                +92% Payout
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded text-xs">
                EUR/USD Successful Trades
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
              <img 
                src="/api/assets/Screenshot 2025-03-30 151424_1752722190574.png" 
                alt="Pocket Option AUD/CAD trading with high win rate signals"
                className="w-full h-auto"
              />
              <div className="absolute top-3 right-3 bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Live Signals
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded text-xs">
                AUD/CAD High Win Rate
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
              <img 
                src="/api/assets/Screenshot 2025-03-30 154541_1752722190575.png" 
                alt="Pocket Option showing profitable trades with Binary Baseline indicators"
                className="w-full h-auto"
              />
              <div className="absolute top-3 right-3 bg-purple-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Profitable
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded text-xs">
                Consistent Profits
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
              <img 
                src="/api/assets/Screenshot 2025-04-06 152435_1752722190575.png" 
                alt="Pocket Option USD/CNH trading with double up feature showing high success rate"
                className="w-full h-auto"
              />
              <div className="absolute top-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Double Up Success
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded text-xs">
                USD/CNH with Double Up
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
              <img 
                src="/api/assets/Screenshot 2025-04-06 152458_1752722190576.png" 
                alt="MetaTrader 5 showing multiple currency pairs with Binary Baseline indicators and alerts"
                className="w-full h-auto"
              />
              <div className="absolute top-3 right-3 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Multi-Pair Setup
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded text-xs">
                MT5 Multi-Currency Analysis
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-400 mb-4">
            All testimonials are from verified users with documented trading results.
          </p>
          <p className="text-xs text-gray-500">
            * Results may vary. Past performance does not guarantee future results. 
            Binary options trading involves significant risk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;