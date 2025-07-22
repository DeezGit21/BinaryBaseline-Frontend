import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Link } from "wouter";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { 
  BookOpen, 
  Monitor, 
  ArrowRight, 
  FileText,
  Download,
  BarChart3,
  Settings,
  Star
} from "lucide-react";

export default function HowToGuides() {
  // Hard-coded guides with images and detailed instructions
  const guides = [
    {
      id: "mt5-download",
      title: "Download MetaTrader 5",
      description: "How to download and install the MetaTrader 5 platform",
      icon: <Download className="h-10 w-10 text-primary" />,
      route: "/how-to/download-mt5"
    },
    {
      id: "mt5-chart-setup",
      title: "MT5 Chart Setup with EABiBOT",
      description: "Set up your MetaTrader 5 charts and install EABiBOT for OTC markets",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      route: "/how-to/mt5-chart-setup"
    },
    {
      id: "binary-baseline-setup",
      title: "Binary Baseline Setup",
      description: "Install and configure the Binary Baseline application",
      icon: <Settings className="h-10 w-10 text-primary" />,
      route: "/how-to/binary-baseline-setup"
    },
    {
      id: "mt5-favorites",
      title: "MT5 Favorites Setup",
      description: "Set up your favorites in MetaTrader 5 with Binary Baseline",
      icon: <Star className="h-10 w-10 text-primary" />,
      route: "/how-to/mt5-favorites"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">How-To Guides</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            Welcome to the Binary Baseline How-To Guides. Here you'll find step-by-step instructions for setting up and
            using all aspects of the Binary Baseline platform and its integrations. Follow these guides in order for the best setup experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {guides.map((guide, index) => (
              <CardGradient key={guide.id} className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{guide.title}</h3>
                    <p className="text-gray-400 text-sm">{guide.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center my-6 flex-grow">
                  {guide.icon}
                </div>
                
                <Button asChild className="w-full mt-2">
                  <Link href={guide.route}>
                    View Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardGradient>
            ))}
          </div>
          
          <CardGradient className="p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
                <p className="text-gray-300">
                  We recommend following these guides in order for the best setup experience.
                  If you need additional help, our support team is available to assist you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link href="/documentation">
                    <FileText className="mr-2 h-4 w-4" /> Documentation
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/support">
                    <ArrowRight className="mr-2 h-4 w-4" /> Get Support
                  </Link>
                </Button>
              </div>
            </div>
          </CardGradient>
          
          <div className="flex justify-center">
            <Monitor className="text-primary h-12 w-12 opacity-20" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}