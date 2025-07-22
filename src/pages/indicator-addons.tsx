import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { DownloadCloud, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";

interface IndicatorAddon {
  id: string;
  name: string;
  description: string;
  version: string;
  fileSize: string;
  downloadUrl: string;
  category: string;
  releaseDate: string;
  requiresSubscription: boolean;
}

export default function IndicatorAddons() {
  const [, navigate] = useLocation();
  const [openCategory, setOpenCategory] = useState<string | null>("all");

  // Fetch subscription status
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['/api/subscriptions/active']
  });
  
  const hasActiveSubscription = !!subscription;

  // Real indicator addons
  const indicatorAddons: IndicatorAddon[] = [
    {
      id: "adaptive-2-0",
      name: "Adaptive 2.0",
      description: "Advanced self-adapting trading indicator that continuously learns and optimizes from market patterns. Features automatic parameter adjustment, enhanced signal filtering, and improved performance over time through machine learning algorithms.",
      version: "2.0.0",
      fileSize: "156 KB",
      downloadUrl: "/Adaptive2.0.zip",
      category: "Trend",
      releaseDate: "June 13, 2025",
      requiresSubscription: false
    }
  ];

  const categories = ["all", ...Array.from(new Set(indicatorAddons.map(addon => addon.category)))];
  
  const filteredAddons = openCategory === "all" 
    ? indicatorAddons 
    : indicatorAddons.filter(addon => addon.category === openCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  // Handle download - redirect to subscription page only if indicator requires subscription
  const handleDownload = (e: React.MouseEvent, addon: IndicatorAddon) => {
    if (addon.requiresSubscription && !hasActiveSubscription) {
      e.preventDefault();
      navigate("/subscribe?tier=pro_trader");
    }
    // For free indicators (like Adaptive 2.0), allow direct download
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Indicator Addons</h1>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Browse indicators and tools to enhance your Binary Baseline trading experience. 
              Download the latest Adaptive 2.0 indicator with advanced self-learning capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <CardGradient className="p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button 
                      key={category}
                      variant={openCategory === category ? "default" : "ghost"} 
                      className="w-full justify-start capitalize" 
                      onClick={() => setOpenCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="flex items-start gap-2 mb-4 bg-green-900/20 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-green-300">
                      Installation instructions are included in each download package. 
                      The Adaptive 2.0 indicator is available for free download.
                    </p>
                  </div>
                  

                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/download">
                      Return to Downloads
                    </Link>
                  </Button>
                </div>
              </CardGradient>
            </div>
            
            <div className="md:col-span-3">
              <div className="space-y-4">
                {filteredAddons.map(addon => (
                  <CardGradient key={addon.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{addon.name}</h3>
                        <p className="text-gray-300 mb-2">{addon.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                          <span>Version: {addon.version}</span>
                          <span>•</span>
                          <span>Size: {addon.fileSize}</span>
                          <span>•</span>
                          <span>Released: {addon.releaseDate}</span>
                          <span>•</span>
                          <span className="capitalize">Category: {addon.category}</span>
                        </div>
                      </div>
                      <div>
                        {!addon.requiresSubscription || hasActiveSubscription ? (
                          <Button className="flex items-center gap-2" asChild>
                            <a 
                              href={addon.downloadUrl} 
                              download
                              onClick={(e) => handleDownload(e, addon)}
                            >
                              <DownloadCloud className="h-4 w-4" />
                              <span>Download</span>
                            </a>
                          </Button>
                        ) : (
                          <Button 
                            className="flex items-center gap-2" 
                            variant="secondary"
                            onClick={() => navigate("/subscribe?tier=pro_trader")}
                          >
                            <Lock className="h-4 w-4" />
                            <span>PRO Only</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardGradient>
                ))}
                
                {filteredAddons.length === 0 && (
                  <div className="text-center p-8 bg-secondary/20 rounded-lg">
                    <p className="text-gray-400">No indicators found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}