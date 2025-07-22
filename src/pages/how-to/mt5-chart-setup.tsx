import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Link } from "wouter";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { 
  ArrowRight, 
  ArrowLeft,
  Download,
  AlertCircle,
  FileText,
  BarChart3
} from "lucide-react";

export default function MT5ChartSetupGuide() {
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
            <h1 className="text-3xl font-bold gradient-text">MT5 Chart Setup with EABiBOT</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            To access Pocket Option's OTC markets, you need to install and configure the EABiBOT in MetaTrader 5.
            This guide will walk you through the installation process and chart setup.
          </p>
          
          <div className="bg-amber-900/20 p-5 rounded-md mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-amber-400 font-medium text-lg mb-1">Important Note</h3>
                <p className="text-amber-300">
                  EABiBOT is required to access Pocket Option's OTC charts. Binary Baseline does not include EABiBOT,
                  and you'll need to download it separately. The EABiBOT demo allows access to 4 OTC charts for 3 days.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">1</span>
                </div>
                Download EABiBOT
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  First, download EABiBOT from the official website.
                </p>
                
                <div className="bg-secondary/20 p-4 rounded-md">
                  <p className="text-gray-200 font-medium">Visit the EABiBOT website:</p>
                  <a 
                    href="https://mt2bo.live/eabibot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center mt-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    https://mt2bo.live/eabibot
                  </a>
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">2</span>
                </div>
                Install EABiBOT in MetaTrader 5
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  After downloading the EABiBOT file, you need to install it in MetaTrader 5.
                </p>
                
                <ol className="list-decimal ml-6 space-y-4">
                  <li className="text-gray-300">
                    <strong>Open the MT5 data folder:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Launch MetaTrader 5</li>
                      <li>Click on "File" in the top menu</li>
                      <li>Select "Open Data Folder" from the dropdown menu</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Navigate to the Experts folder:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Open the "MQL5" folder</li>
                      <li>Open the "Experts" folder</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Copy the EABiBOT file:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Locate the downloaded EABiBOT file</li>
                      <li>Right-click and select "Copy"</li>
                      <li>Paste the file into the "Experts" folder</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Refresh MT5:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Go back to MetaTrader 5</li>
                      <li>Open the Navigator panel (Ctrl+N if not already visible)</li>
                      <li>Right-click on "Expert Advisors" and select "Refresh"</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">3</span>
                </div>
                Add EABiBOT to a Chart and Configure
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Now you need to add EABiBOT to a chart and configure it to access OTC markets.
                </p>
                
                <ol className="list-decimal ml-6 space-y-4">
                  <li className="text-gray-300">
                    <strong>Open a standard (non-OTC) chart:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Click "File" and then "Chart Window"</li>
                      <li>Select any standard pair (not an OTC market)</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Add EABiBOT to the chart:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>In the Navigator panel, expand "Expert Advisors"</li>
                      <li>Find EABiBOT, right-click on it, and select "Attach to Chart"</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Configure EABiBOT settings:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>In the settings window, go to the "Common" tab</li>
                      <li>Check both options to allow automated trading and DLL imports</li>
                      <li>Switch to the "Inputs" tab</li>
                      <li>Select "Pocket Option" as your broker</li>
                      <li>If you have a license, enter it; otherwise, leave it blank for demo mode</li>
                      <li>Click "OK" to save settings</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>Open OTC charts:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Once EABiBOT is running, click on the "OPEN CHART" button that appears</li>
                      <li>EABiBOT will open multiple OTC charts (limited to 4 in demo mode)</li>
                      <li>Right-click on each OTC chart you want to use and select "Chart Window" to open them in separate windows</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">4</span>
                </div>
                Set Up Chart Timeframes and Appearance
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Configure your chart timeframes and appearance for optimal trading.
                </p>
                
                <ol className="list-decimal ml-6 space-y-4">
                  <li className="text-gray-300">
                    <strong>Set timeframes to 1-minute:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Right-click on each OTC chart</li>
                      <li>Select "Timeframes" and choose "M1" (1-minute)</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>(Optional) Set up Heiken Ashi candles:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>First, remove standard candles by right-clicking on the chart and selecting "Properties"</li>
                      <li>Uncheck "Bar Up", "Bar Down", "Bull Candle", and "Bear Candle" options</li>
                      <li>Click "OK" to apply</li>
                      <li>Open Navigator panel, expand "Indicators", then "Examples"</li>
                      <li>Find "Heiken Ashi", right-click, and select "Attach to Chart"</li>
                      <li>Repeat for all charts you want to use with Heiken Ashi</li>
                    </ul>
                  </li>
                  
                  <li className="text-gray-300">
                    <strong>(Optional) Save your chart template:</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>After configuring your chart, right-click and select "Template"</li>
                      <li>Choose "Save Template" and name it (e.g., "Clean Heiken Ashi")</li>
                      <li>You can apply this template to other charts by right-clicking and selecting "Template" → "Your Template Name"</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </CardGradient>
          </div>
          
          <div className="bg-secondary/20 p-5 rounded-md mb-8">
            <div className="flex items-start">
              <FileText className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-primary font-medium text-lg mb-1">Next Steps</h3>
                <p className="text-gray-300 mb-2">
                  Now that you have MetaTrader 5 set up with EABiBOT and OTC charts, you're ready to install Binary Baseline.
                  Continue to the next guide to learn how to install and configure the Binary Baseline application.
                </p>
                <div className="flex items-center mt-4 text-primary">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  <span>Use Heiken Ashi candles for best results with Binary Baseline indicators.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/how-to/download-mt5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Download MT5
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/how-to/binary-baseline-setup">
                Next: Binary Baseline Setup
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