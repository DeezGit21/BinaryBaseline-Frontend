import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Link } from "wouter";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { 
  ArrowRight, 
  ArrowLeft,
  Download,
  CheckCircle 
} from "lucide-react";

export default function DownloadMT5Guide() {
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
            <h1 className="text-3xl font-bold gradient-text">Download MetaTrader 5</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            The first step in setting up Binary Baseline is to download and install MetaTrader 5 (MT5) on your computer.
            This guide will walk you through the process.
          </p>
          
          <div className="space-y-6 mb-8">
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">1</span>
                </div>
                Download MetaTrader 5
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  First, you need to download MetaTrader 5 from the official website.
                </p>
                
                <div className="bg-secondary/20 p-4 rounded-md">
                  <p className="text-gray-200 font-medium">Visit the official MetaTrader 5 website:</p>
                  <a 
                    href="https://www.metatrader5.com/en/download" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center mt-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    https://www.metatrader5.com/en/download
                  </a>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <img 
                    src="/howto/mt5-download.png" 
                    alt="MetaTrader 5 Download Page" 
                    className="rounded-md border border-gray-700 max-w-full"
                  />
                </div>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">2</span>
                </div>
                Install MetaTrader 5
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Once downloaded, double-click on the installation file to begin the installation process.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    Double-click the downloaded installer file to launch the setup wizard.
                  </li>
                  <li className="text-gray-300">
                    Follow the on-screen instructions to complete the installation.
                  </li>
                  <li className="text-gray-300">
                    When the installation is complete, click "Finish" to launch MetaTrader 5.
                  </li>
                </ol>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">3</span>
                </div>
                Set Up a Demo Account
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  After installation, you'll need to set up a demo account in MetaTrader 5.
                </p>
                
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-gray-300">
                    When MetaTrader 5 starts for the first time, it will prompt you to create a demo account.
                  </li>
                  <li className="text-gray-300">
                    Click "Next" to proceed with setting up a demo account.
                  </li>
                  <li className="text-gray-300">
                    Fill in your personal information in the registration form.
                  </li>
                  <li className="text-gray-300">
                    <strong>Important:</strong> Write down your login information (login ID and password) as you'll need it later.
                  </li>
                  <li className="text-gray-300">
                    Complete the registration process to access MetaTrader 5.
                  </li>
                </ol>
                
                <div className="bg-amber-900/20 p-4 rounded-md mt-4">
                  <p className="text-amber-300 flex items-start">
                    <CheckCircle className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pro Tip:</strong> Save your login credentials in a secure location. You may need them when setting up Binary Baseline or if you need to log back into your account.
                    </span>
                  </p>
                </div>
              </div>
            </CardGradient>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/how-to">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guides
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/how-to/mt5-chart-setup">
                Next: MT5 Chart Setup
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