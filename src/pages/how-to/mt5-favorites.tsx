import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Link } from "wouter";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { 
  ArrowRight, 
  ArrowLeft,
  Star,
  CheckCircle,
  AlertCircle,
  MonitorPlay
} from "lucide-react";

export default function MT5FavoritesGuide() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/how-to">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guides
              </Link>
            </Button>
            <h1 className="text-3xl font-bold gradient-text">MT5 Favorites Setup</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            The final step in setting up Binary Baseline is to configure your MT5 charts and connect them to the Binary Baseline app 
            for automated trading. This guide will walk you through the process of setting up your favorites and starting automated trading.
          </p>
          
          <div className="space-y-6 mb-8">
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">1</span>
                </div>
                Set Up Your MT5 Charts with Indicators
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Before connecting to Binary Baseline, make sure your MT5 charts are properly set up with the Binary Baseline indicators.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Open your OTC charts:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Make sure your MT5 is running with EABiBOT activated</li>
                      <li>Ensure your OTC currency charts (like EURJPY-OTC) are open</li>
                      <li>Set the timeframe to 1-minute (right-click on chart → Timeframe → M1)</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Apply the Binary Baseline indicator:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>In MT5, right-click on "Indicators" in the Navigator panel and click "Refresh"</li>
                      <li>Find your Binary Baseline indicator in the list</li>
                      <li>Right-click on the indicator and select "Attach to Chart"</li>
                      <li>Adjust the settings as needed or use the default settings</li>
                      <li>Click "OK" to apply the indicator to the chart</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Repeat for all charts:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Apply the indicator to all charts you want to use for automated trading</li>
                      <li>You may see initial alerts as the indicator processes historical data - this is normal</li>
                      <li>Once processed, you should see Buy and Sell icons appearing on your charts</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">2</span>
                </div>
                Launch Binary Baseline App
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Now that your MT5 is set up with charts and indicators, it's time to launch the Binary Baseline app and connect it to your trading account.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Launch Binary Baseline:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Open the Binary Baseline app from your desktop shortcut or Start Menu</li>
                      <li>If you have a License Key, enter it when prompted, or click "No" to use the free trial version</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Log in to Pocket Option:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Enter your Pocket Option login credentials</li>
                      <li>Complete the CAPTCHA if required</li>
                      <li>Choose whether to use your Demo account or Live account (we recommend starting with Demo)</li>
                      <li>If you want to use the Demo account, click "Switch To Demo Account" button</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-amber-900/20 p-4 rounded-md mt-4">
                  <p className="text-amber-300 flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Important:</strong> We recommend using the Demo account for initial testing to ensure everything is working correctly before switching to a Live account.
                    </span>
                  </p>
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">3</span>
                </div>
                Set Up Favorites in Binary Baseline
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  The next step is to configure which charts Binary Baseline should monitor for trading signals.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Add charts to Favorites:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>In the Binary Baseline app, you'll see a list of available charts</li>
                      <li>Find the OTC charts you've set up in MT5 (like EURJPY-OTC)</li>
                      <li>Click on the star icon next to each chart to add it to your Favorites</li>
                      <li>Free trial users can only select a limited number of charts (typically 2)</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Configure trading settings:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Adjust the trade amount (e.g., $50)</li>
                      <li>Select the timeframe (e.g., 1 minute)</li>
                      <li>These settings will apply to all automated trades</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-secondary/20 p-4 rounded-md mt-4">
                  <p className="text-gray-200 flex items-center">
                    <Star className="text-primary h-5 w-5 mr-2 flex-shrink-0" />
                    <span>
                      Your Favorites are the charts that Binary Baseline will monitor for trading signals. Only select charts that you've properly set up with indicators in MT5.
                    </span>
                  </p>
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">4</span>
                </div>
                Start Automated Trading
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  You're now ready to start automated trading with Binary Baseline.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Start trading:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Click the "START TRADING" button in the Binary Baseline app</li>
                      <li>The app will now monitor your favorite charts for trading signals</li>
                      <li>When a signal appears in MT5, Binary Baseline will automatically place a trade on Pocket Option</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Monitor your trades:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>The "Alerts Log" window will show pending and closed trades</li>
                      <li>You can track your Profit & Loss and Win Ratio in the app</li>
                      <li>The "Today's Trades" counter shows how many automated trades you've used (limited in free trial)</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Manual trading option:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>You can also use Binary Baseline for manual trading while waiting for automated signals</li>
                      <li>Manual trades do not count toward your daily automated trade limit</li>
                      <li>Note that if an automated signal comes in, the app will switch to that chart</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-secondary/20 p-4 rounded-md mt-4">
                  <p className="text-gray-200 flex items-center">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0" />
                    <span>
                      Free trial users are limited to 10 automated trades per day. Paid subscribers have higher or unlimited daily trade limits depending on their subscription tier.
                    </span>
                  </p>
                </div>
              </div>
            </CardGradient>
          </div>
          
          <div className="bg-primary/10 p-5 rounded-md mb-8">
            <div className="flex items-start">
              <MonitorPlay className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-primary font-bold text-lg mb-1">Congratulations!</h3>
                <p className="text-gray-300">
                  You have successfully set up Binary Baseline for automated trading. The system will now monitor your selected charts
                  and execute trades automatically based on the signals from your indicators.
                </p>
                <p className="text-gray-300 mt-2">
                  Start with small trade amounts and the Demo account until you're comfortable with how the system works.
                  You can always upgrade to a paid subscription to unlock more features and trading capacity.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/how-to/binary-baseline-setup">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Binary Baseline Setup
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/how-to">
                Back to Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}