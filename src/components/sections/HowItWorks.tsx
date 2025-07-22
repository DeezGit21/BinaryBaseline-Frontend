import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardGradient } from "@/components/ui/card-gradient";
import { Monitor, Bell, Bolt, Settings } from "@/lib/icons";
import { MetaTrader5Logo, PocketOptionLogo } from "@/components/PlatformLogos";

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const steps = [
    {
      icon: <Monitor className="text-accent text-2xl" />,
      title: "Load MT5 Charts",
      description: "Load 1-10+ chart templates using Binary Baseline's strategies in MetaTrader 5.",
    },
    {
      icon: <Bell className="text-accent text-2xl" />,
      title: "Detect Signals",
      description: "Custom alerts detect buy/sell opportunities using your chosen strategy.",
    },
    {
      icon: <Bolt className="text-accent text-2xl" />,
      title: "Instant Execution",
      description: "Trades are placed on Pocket Option within 2 seconds of signal detection.",
    },
    {
      icon: <Settings className="text-accent text-2xl" />,
      title: "Manage & Scale",
      description: "Manage, tweak and scale your strategy using the dashboard.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      id="how-it-works" 
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 chart-grid opacity-10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Binary Baseline operates seamlessly between MetaTrader 5 and Pocket Option, providing a streamlined trading experience.
          </p>
        </div>
        
        <motion.div 
          className="relative mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="hidden lg:block absolute h-1 bg-gradient-to-r from-accent to-primary top-1/2 left-0 right-0 transform -translate-y-1/2 z-0 opacity-50"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-0 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="w-full lg:w-1/4 flex flex-col items-center relative"
                variants={itemVariants}
              >
                <div className="w-16 h-16 rounded-full bg-secondary border-2 border-accent flex items-center justify-center mb-5 shadow-lg shadow-accent/20">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                <p className="text-gray-400 text-center">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 z-1">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60" />
                      </svg>
                    </div>
                    <div className="block lg:hidden h-10 w-1 bg-gradient-to-b from-accent to-primary my-3"></div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <CardGradient className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="gradient-text">
                Platform Integration
              </span>
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center mb-8 md:mb-0">
                <div className="mb-4 inline-block">
                  <MetaTrader5Logo width={64} height={64} />
                </div>
                <h4 className="text-lg font-semibold">MetaTrader 5</h4>
                <p className="text-gray-400 text-sm">Chart Analysis & Signals</p>
              </div>
              
              <div className="flex flex-col items-center mx-4 md:mx-0">
                <svg className="hidden md:block text-accent text-2xl mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="block md:hidden text-accent text-2xl mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              
              <div className="text-center mb-8 md:mb-0">
                <div className="mb-4 inline-block">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
                    <img 
                      src="/api/assets/Screenshot_20250316_142142_Chrome.jpg" 
                      alt="Binary Baseline Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-semibold">Binary Baseline</h4>
                <p className="text-gray-400 text-sm">Signal Processing & Execution</p>
              </div>
              
              <div className="flex flex-col items-center mx-4 md:mx-0">
                <svg className="hidden md:block text-accent text-2xl mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="block md:hidden text-accent text-2xl mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              
              <div className="text-center">
                <div className="mb-4 inline-block">
                  <div className="h-16 w-16 rounded-full bg-[#0b1735] flex items-center justify-center">
                    <PocketOptionLogo width={48} height={48} />
                  </div>
                </div>
                <h4 className="text-lg font-semibold">Pocket Option</h4>
                <p className="text-gray-400 text-sm">Trade Execution Platform</p>
              </div>
            </div>
          </CardGradient>
        </motion.div>
        
        {/* Trading Screenshots Showcase */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Live Trading Results</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See Binary Baseline in action with real trading screenshots from our platform integrations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-center">MetaTrader 5 Multi-Chart Setup</h4>
              <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
                <img 
                  src="/api/assets/Screenshot 23 STRAT 9 CHARTS_1752739471410.png" 
                  alt="MetaTrader 5 showing multiple currency pair charts with Binary Baseline indicators"
                  className="w-full h-auto"
                />
                <div className="absolute top-3 right-3 bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Live Charts
                </div>
              </div>

            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-center">Pocket Option Trading Results</h4>

              <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-secondary/50">
                <img 
                  src="/api/assets/Screenshot 2025-03-30 145248_1752722190574.png" 
                  alt="Pocket Option showing live trades with +92% profit signals"
                  className="w-full h-auto"
                />
                <div className="absolute top-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  +92% Profit
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
