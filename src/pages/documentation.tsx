import { useState } from "react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { CardGradient } from "@/components/ui/card-gradient";
import { ChevronDown, ChevronUp, FileText, Code, BookOpen, Check } from "lucide-react";

interface DocSection {
  title: string;
  content: string;
  expanded?: boolean;
}

export default function Documentation() {
  const [sections, setSections] = useState<DocSection[]>([
    {
      title: "Getting Started",
      content: `
        <h3 class="text-xl font-semibold mb-3">Installation Guide</h3>
        <p class="mb-3">Welcome to Binary Baseline! This guide will help you get started with our automated trading platform.</p>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Installation Steps:</h4>
          <ol class="list-decimal ml-5 space-y-2">
            <li>Download the Binary Baseline App installer from the Downloads page.</li>
            <li>Double-click the installer file to begin installation.</li>
            <li>The installation process will run automatically.</li>
            <li>Once installed, launch Binary Baseline using the desktop shortcut or start menu entry.</li>
          </ol>
        </div>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">System Requirements:</h4>
          <ul class="list-disc ml-5 space-y-1">
            <li>Windows 10 or higher</li>
            <li>8GB RAM minimum (16GB recommended)</li>
            <li>500MB free disk space</li>
            <li>Internet connection</li>
          </ul>
        </div>
      `,
      expanded: true
    },
    {
      title: "User Interface Guide",
      content: `
        <h3 class="text-xl font-semibold mb-3">User Interface Overview</h3>
        <p class="mb-3">The Binary Baseline interface is designed to be intuitive and user-friendly. Here's a breakdown of the main components:</p>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Dashboard</h4>
          <p class="mb-2">The dashboard provides a comprehensive overview of your trading activities:</p>
          <ul class="list-disc ml-5 space-y-1">
            <li>Performance metrics and statistics</li>
            <li>Recent trade history</li>
            <li>Active trading strategies</li>
            <li>Account balance and profit/loss</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Strategy Selection</h4>
          <p class="mb-2">Select from our library of pre-built strategies or create your own:</p>
          <ul class="list-disc ml-5 space-y-1">
            <li>Browse strategies by category</li>
            <li>View detailed performance metrics for each strategy</li>
            <li>Customize strategy parameters</li>
            <li>Activate/deactivate strategies</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Settings</h4>
          <p class="mb-2">Configure your trading preferences:</p>
          <ul class="list-disc ml-5 space-y-1">
            <li>Risk management settings</li>
            <li>Account connection preferences</li>
            <li>Notification settings</li>
            <li>Trading schedule</li>
          </ul>
        </div>
      `
    },
    {
      title: "Trading Strategies",
      content: `
        <h3 class="text-xl font-semibold mb-3">Trading Strategies Guide</h3>
        <p class="mb-3">Binary Baseline offers a diverse range of trading strategies to suit different market conditions and trading preferences.</p>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Strategy Types</h4>
          <ul class="list-disc ml-5 space-y-2">
            <li>
              <strong>MACD Crossover</strong>
              <p class="mt-1">Uses the Moving Average Convergence Divergence indicator to identify trend changes and momentum shifts in the market.</p>
            </li>
            <li>
              <strong>RSI Overbought/Oversold</strong>
              <p class="mt-1">Utilizes the Relative Strength Index to identify potentially overbought or oversold market conditions.</p>
            </li>
            <li>
              <strong>Moving Average Cross</strong>
              <p class="mt-1">Based on the crossover of fast and slow moving averages to identify trend direction changes.</p>
            </li>
            <li>
              <strong>Support & Resistance</strong>
              <p class="mt-1">Identifies key support and resistance levels and trades bounces and breakouts from these levels.</p>
            </li>
            <li>
              <strong>Bollinger Breakout</strong>
              <p class="mt-1">Takes advantage of price movements outside of the Bollinger Bands to capture potential breakout trades.</p>
            </li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Customizing Strategies</h4>
          <p class="mb-2">Each strategy can be customized to fit your trading style:</p>
          <ul class="list-disc ml-5 space-y-1">
            <li>Adjust indicator parameters</li>
            <li>Set entry and exit conditions</li>
            <li>Configure risk per trade</li>
            <li>Set take profit and stop loss levels</li>
          </ul>
        </div>
      `
    },
    {
      title: "Integration with Trading Platforms",
      content: `
        <h3 class="text-xl font-semibold mb-3">Platform Integration Guide</h3>
        <p class="mb-3">Binary Baseline seamlessly integrates with MetaTrader 5 and Pocket Option to automate your trading.</p>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">MetaTrader 5 Integration</h4>
          <p class="mb-2">Connect Binary Baseline to your MetaTrader 5 platform:</p>
          <ol class="list-decimal ml-5 space-y-1">
            <li>Launch MetaTrader 5</li>
            <li>In Binary Baseline, go to Settings > Platform Integration</li>
            <li>Select MetaTrader 5 as your platform</li>
            <li>Enter your MetaTrader 5 account credentials</li>
            <li>Test the connection</li>
          </ol>
        </div>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Pocket Option Integration</h4>
          <p class="mb-2">Connect Binary Baseline to your Pocket Option account:</p>
          <ol class="list-decimal ml-5 space-y-1">
            <li>Login to your Pocket Option account</li>
            <li>Go to Settings > API Access</li>
            <li>Generate a new API key</li>
            <li>In Binary Baseline, go to Settings > Platform Integration</li>
            <li>Select Pocket Option as your platform</li>
            <li>Enter your API key</li>
            <li>Test the connection</li>
          </ol>
        </div>
      `
    },
    {
      title: "Troubleshooting",
      content: `
        <h3 class="text-xl font-semibold mb-3">Troubleshooting Guide</h3>
        <p class="mb-3">Encountering issues? Here are solutions to common problems:</p>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Connection Issues</h4>
          <div class="space-y-3">
            <div>
              <p class="font-medium">Problem: Cannot connect to trading platform</p>
              <p class="mt-1">Solutions:</p>
              <ul class="list-disc ml-5">
                <li>Verify your internet connection</li>
                <li>Check if your API credentials are correct</li>
                <li>Ensure your trading platform is running</li>
                <li>Restart both Binary Baseline and your trading platform</li>
              </ul>
            </div>
            
            <div>
              <p class="font-medium">Problem: Orders not being placed</p>
              <p class="mt-1">Solutions:</p>
              <ul class="list-disc ml-5">
                <li>Check if automated trading is enabled in your platform</li>
                <li>Verify your account has sufficient funds</li>
                <li>Ensure your strategy conditions are being met</li>
                <li>Check risk management settings</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="mb-4">
          <h4 class="text-lg font-medium mb-2">Software Issues</h4>
          <div class="space-y-3">
            <div>
              <p class="font-medium">Problem: Software crashes or freezes</p>
              <p class="mt-1">Solutions:</p>
              <ul class="list-disc ml-5">
                <li>Update to the latest version of Binary Baseline</li>
                <li>Restart your computer</li>
                <li>Check system requirements</li>
                <li>Close other resource-intensive applications</li>
              </ul>
            </div>
            
            <div>
              <p class="font-medium">Problem: Indicators not displaying correctly</p>
              <p class="mt-1">Solutions:</p>
              <ul class="list-disc ml-5">
                <li>Verify indicator parameters</li>
                <li>Reset indicator settings to default</li>
                <li>Check for updates to Binary Baseline</li>
              </ul>
            </div>
          </div>
        </div>
      `
    }
  ]);

  const toggleSection = (index: number) => {
    setSections(sections.map((section, i) => {
      if (i === index) {
        return { ...section, expanded: !section.expanded };
      }
      return section;
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Documentation</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            Welcome to the Binary Baseline documentation. Here you'll find comprehensive guides and resources to help you get the most out of our automated trading platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <CardGradient className="p-4 flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-semibold mb-1">User Guides</h3>
              <p className="text-sm text-gray-400">Step-by-step instructions for using Binary Baseline</p>
            </CardGradient>
            
            <CardGradient className="p-4 flex flex-col items-center text-center">
              <Code className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-semibold mb-1">API Documentation</h3>
              <p className="text-sm text-gray-400">Technical documentation for platform integration</p>
            </CardGradient>
            
            <CardGradient className="p-4 flex flex-col items-center text-center">
              <Check className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Best Practices</h3>
              <p className="text-sm text-gray-400">Recommendations for optimal trading results</p>
            </CardGradient>
          </div>
          
          <div className="space-y-4 mb-12">
            {sections.map((section, index) => (
              <CardGradient key={index} className="p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleSection(index)}
                >
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  {section.expanded ? 
                    <ChevronUp className="h-5 w-5 text-primary" /> : 
                    <ChevronDown className="h-5 w-5 text-primary" />
                  }
                </div>
                
                {section.expanded && (
                  <div 
                    className="mt-4 prose prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </CardGradient>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}