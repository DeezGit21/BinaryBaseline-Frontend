import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Link } from "wouter";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { 
  ArrowRight, 
  ArrowLeft,
  Download,
  Settings,
  CheckCircle 
} from "lucide-react";

export default function BinaryBaselineSetupGuide() {
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
            <h1 className="text-3xl font-bold gradient-text">Binary Baseline Setup</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            This guide will walk you through installing and setting up the Binary Baseline application.
            Binary Baseline is the central platform that connects to your trading accounts and automates your binary options trading.
          </p>
          
          <div className="space-y-6 mb-8">
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">1</span>
                </div>
                Download Binary Baseline
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  First, download the Binary Baseline installer from our official website.
                </p>
                
                <div className="bg-secondary/20 p-4 rounded-md">
                  <p className="text-gray-200 font-medium">Visit our website to download:</p>
                  <a 
                    href="https://binary-baseline.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center mt-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    https://binary-baseline.com
                  </a>
                </div>
                
                <div className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link href="/download">
                      <Download className="mr-2 h-4 w-4" />
                      Go to Download Page
                    </Link>
                  </Button>
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">2</span>
                </div>
                Install Binary Baseline
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  After downloading, follow these steps to install Binary Baseline on your computer.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Extract the ZIP File:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Locate the downloaded ZIP file (BinaryBaseline_Installer.zip)</li>
                      <li>Right-click on the file and select "Extract All..." or use your preferred extraction tool</li>
                      <li>Extract the contents to a folder of your choice</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Run the Installer:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Navigate to the extracted folder</li>
                      <li>Double-click on the installer file to start the installation process</li>
                      <li>The installation will proceed automatically</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Complete Installation:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Follow any on-screen prompts to complete the installation</li>
                      <li>The installer will create desktop shortcuts for easy access</li>
                      <li>It will also create Start Menu entries for Binary Baseline</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-secondary/20 p-4 rounded-md mt-4">
                  <p className="text-gray-200 flex items-center">
                    <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0" />
                    <span>The installation process is straightforward and should complete within a few minutes.</span>
                  </p>
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">3</span>
                </div>
                Launch Binary Baseline
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Now that Binary Baseline is installed, you can launch the application.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Launch the Application:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Double-click the Binary Baseline shortcut on your desktop</li>
                      <li><strong>OR</strong> find Binary Baseline in your Start Menu and click to launch</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>License Activation (if applicable):</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>If you have a license key, you'll be prompted to enter it during the first launch</li>
                      <li>If you don't have a key, you can click "No" to continue with the free trial version (limited to 10 daily trades)</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-secondary/20 p-4 rounded-md mt-4">
                  <p className="text-gray-200">
                    <strong>Note:</strong> The free trial version has limitations on the number of daily trades and features.
                    Consider upgrading to a paid subscription for full functionality.
                  </p>
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">4</span>
                </div>
                Install Indicators
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Binary Baseline comes with a set of trading indicators that need to be installed in MetaTrader 5.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    <strong>Launch the Indicator Installer:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Look for the "Binary Baseline Indicator Installer" shortcut on your desktop or in the Start Menu</li>
                      <li>Double-click to launch the installer</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Select and Install Indicators:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>The installer will display a list of available indicators</li>
                      <li>Select the indicator you want to install (free users can install one indicator at a time)</li>
                      <li>Click "Install" to proceed</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Refresh MetaTrader 5:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>After installation, go to MetaTrader 5</li>
                      <li>Open the Navigator panel (Ctrl+N)</li>
                      <li>Right-click on "Indicators" and select "Refresh"</li>
                      <li>Your newly installed Binary Baseline indicators should now appear in the list</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-secondary/20 p-4 rounded-md mt-4">
                  <p className="text-gray-200 flex items-center">
                    <Settings className="text-primary h-5 w-5 mr-2 flex-shrink-0" />
                    <span>
                      Free trial users can install one indicator at a time and are limited to one change per day.
                      Paid subscribers have access to all indicators simultaneously.
                    </span>
                  </p>
                </div>
              </div>
            </CardGradient>
          </div>
          
          <div className="bg-primary/10 p-5 rounded-md mb-8">
            <h3 className="text-primary font-bold text-lg mb-3">Ready for Trading</h3>
            <p className="text-gray-300 mb-4">
              You have now successfully installed Binary Baseline and its indicators. The final step is to set up your 
              favorite charts in MT5 and connect them to Binary Baseline for automated trading.
            </p>
            <p className="text-gray-300">
              Continue to the next guide to learn how to set up your MT5 favorites and start trading with Binary Baseline.
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/how-to/mt5-chart-setup">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: MT5 Chart Setup
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/how-to/mt5-favorites">
                Next: MT5 Favorites Setup
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