import { CardGradient } from "@/components/ui/card-gradient";
import NewStripePricingTable from "@/components/sections/NewStripePricingTable";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild size="sm" className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Binary Baseline Pricing</span>
          </h1>
          <p className="text-lg text-gray-300">
            Choose the subscription tier that best suits your trading needs.
            All plans include a free trial period.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <NewStripePricingTable 
            pricingTableId="prctbl_1ROtZ9Kv2OHvZcWvyENirGTf"
            publishableKey="pk_live_51R5ZNgKv2OHvZcWvNDpElImAx7rz6QHFBZ2cd1podK1Ewm1OKcAPXHMbntiHOkzkoQLncc0zc3gv7klFsMXx7qxT00mao18KKL"
          />
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto bg-card border rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2 text-center">Important Information</h3>
          <div>
            <h4 className="font-medium text-gray-200 mb-1">Hardware Requirements</h4>
            <p className="mb-1 text-gray-300">The number of charts you can run simultaneously depends on your computer's specifications:</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-300">
              <li><strong>For 5-10 charts:</strong> Recommended 32GB RAM or larger with i7 processor or better</li>
              <li><strong>For up to 5 charts:</strong> Standard 8GB RAM with i3 or i5 processor</li>
            </ul>
            <p className="mt-1 text-gray-300">Using more charts than your system can handle may cause performance issues.</p>
          </div>
        </div>
        
        <div className="mt-8 max-w-2xl mx-auto text-center">
          <p className="text-gray-400">
            Questions about our pricing? <a href="#" className="text-primary hover:underline">Contact our support team</a> for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}