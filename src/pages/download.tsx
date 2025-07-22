import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { DownloadCloud, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";

interface DownloadStep {
  title: string;
  description: string;
  instructions: string[];
}

export default function Download() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  const installationSteps: DownloadStep[] = [
    {
      title: "Download the Binary Baseline App",
      description: "Download the installer package from our website.",
      instructions: [
        "Click the 'Download Software' button above to get the Binary Baseline App installer.",
        "Save the installer file to your computer."
      ]
    },
    {
      title: "Run the Installer",
      description: "The installation process is quick and simple.",
      instructions: [
        "Double-click the downloaded installer file.",
        "The installation will proceed automatically.",
        "Wait for the installation to complete."
      ]
    },
    {
      title: "Access the Software",
      description: "After installation, you can access Binary Baseline from your desktop or start menu.",
      instructions: [
        "Desktop shortcuts will be created automatically.",
        "Start menu links will also be added for easy access.",
        "Use either of these shortcuts to launch Binary Baseline."
      ]
    },
    {
      title: "Access OTC Charts with EABiBOT",
      description: "EABiBOT or a similar app is needed to access OTC (Over-The-Counter) charts from Pocket Options.",
      instructions: [
        "You'll need to install EABiBOT or a similar app within MetaTrader 5 to retrieve OTC charts.",
        "This is a separate component that works with your MT5 installation, not directly with Binary Baseline.",
        "EABiBOT enables MT5 to display OTC markets data from Pocket Options.",
        "Without EABiBOT in MT5, you can only trade non-OTC charts."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Thank You for Your Purchase!</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            You now have access to Binary Baseline. Follow the instructions below to download and install the software.
          </p>
        </div>
        
        <CardGradient className="p-8 mb-8">
          <div className="text-center mb-8">
            <p className="text-gray-300 mb-4">
              The Binary Baseline App is an all-in-one software package that includes everything you need to start automated trading.
            </p>
            <p className="text-gray-300 mb-4">
              Our simple installer will set up the complete trading environment on your computer with just a few clicks.
            </p>
            <p className="text-gray-300 mb-4 bg-amber-900/20 p-3 rounded-md">
              <strong>Important:</strong> You'll need EABiBOT or a similar app installed within MetaTrader 5 to access OTC (Over-The-Counter) charts from Pocket Options. EABiBOT works with MT5, not directly with Binary Baseline. Without EABiBOT in MT5, you can only trade non-OTC charts.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex flex-col items-center mb-8 md:mr-12">
              <div className="mb-4 bg-primary/20 p-4 rounded-full">
                <DownloadCloud className="h-16 w-16 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Binary Baseline App</h2>
                <p className="text-gray-400 mb-4">Complete Trading Solution</p>
                <Button size="lg" className="flex items-center gap-2 px-8 py-6 mb-4" asChild>
                  <a href="https://1drv.ms/u/c/dea4918ba5002e5e/EXOOmmkJ2LBPmeCHC0z7_Y0B-RVIbEm04UhH4b-qZEzb9A?e=E3G3fb" target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12L12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-lg">Download Binary Baseline</span>
                  </a>
                </Button>
                <div className="mt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/indicator-addons">
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10h10V2Z"/><path d="M22 12h-10v10h10V12Z"/><path d="M12 12H2v10h10V12Z"/><path d="M22 2h-10v10h10V2Z"/></svg>
                        Indicator Addons
                        <span className="px-1.5 py-0.5 text-xs bg-primary text-black rounded-full ml-1">PRO</span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardGradient>
        
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="gradient-text">Installation Instructions</span>
          </h2>
          
          {installationSteps.map((step, index) => (
            <CardGradient key={index} className="p-4">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleStep(index)}
              >
                <div className="flex items-center">
                  <div className="mr-4 bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    {openStep !== index && (
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    )}
                  </div>
                </div>
                <div>
                  {openStep === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
              
              {openStep === index && (
                <div className="mt-4 pl-12">
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <ul className="space-y-2 list-disc pl-5">
                    {step.instructions.map((instruction, i) => (
                      <li key={i} className="text-gray-300">{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardGradient>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/strategies-library">Browse Strategies</Link>
          </Button>
          
          <Button variant="ghost" asChild>
            <a href="mailto:support@binary-baseline.com">Need Help?</a>
          </Button>
        </div>
      </div>
    </div>
  );
}