import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardGradient } from "@/components/ui/card-gradient";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import NewStripePricingTable from "./NewStripePricingTable";

const Pricing = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      id="pricing" 
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 chart-grid opacity-10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              Subscription Tiers
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Choose the plan that suits your trading needs. All plans include a free trial period.
          </p>
        </div>
        
        {/* Stripe Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <NewStripePricingTable 
            pricingTableId="prctbl_1ROtZ9Kv2OHvZcWvyENirGTf"
            publishableKey="pk_live_51R5ZNgKv2OHvZcWvNDpElImAx7rz6QHFBZ2cd1podK1Ewm1OKcAPXHMbntiHOkzkoQLncc0zc3gv7klFsMXx7qxT00mao18KKL"
          />
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <CardGradient className="p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">
                Free Trial Period
              </span>
            </h3>
            <p className="text-gray-300 mb-6">
              Test Binary Baseline with full features for your free trial period. Cancel anytime during the trial and you won't be charged.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <img src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-White-Logo.wine.svg" alt="Stripe secure payments" className="h-10" />
              <div className="flex items-center text-gray-400">
                <Lock className="mr-2" size={16} />
                <span>Secure payments via Stripe</span>
              </div>
            </div>
            
            <Button asChild className="mt-2">
              <Link href="/pricing">
                View Detailed Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardGradient>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
