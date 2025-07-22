import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { CardGradient, CardGradientContent } from "@/components/ui/card-gradient";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { ChartLineUp, ChartBar, ChartArea, ArrowRight } from "@/lib/icons";

const Strategies = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const strategies = [
    {
      icon: <ChartLineUp size={32} className="text-accent" />,
      name: "SuperTrend",
      category: "Trend Following",
      badge: {
        text: "Popular",
        color: "bg-accent/20 text-accent",
      },
      description: "The SuperTrend strategy identifies trend direction and potential reversal points using a combination of ATR and price action.",
      timeframes: "M1, M5, M15",
    },
    {
      icon: <ChartBar size={32} className="text-accent" />,
      name: "GreenLine",
      category: "Reversal",
      badge: {
        text: "New",
        color: "bg-green-500/20 text-green-500",
      },
      description: "The GreenLine strategy identifies potential entry points after a trend reversal has been confirmed with multiple indicators.",
      timeframes: "M1, M5",
    },
    {
      icon: <ChartArea size={32} className="text-accent" />,
      name: "ADX Momentum",
      category: "Momentum",
      badge: {
        text: "Advanced",
        color: "bg-yellow-500/20 text-yellow-500",
      },
      description: "The ADX Momentum strategy combines trend strength detection with momentum indicators for high-probability entries.",
      timeframes: "M5, M15, M30",
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
      id="strategies" 
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              Strategy Library
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Binary Baseline comes with a growing library of pre-configured strategies, with new additions regularly.
          </p>
        </div>
        
        <motion.div 
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-secondary/50 backdrop-blur-md rounded-lg border border-accent/20 p-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-300">20+ Strategies</h4>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-300">Multiple Charts</h4>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-300">Real-Time Alerts</h4>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Complete Strategy Library</h3>
              <p className="text-gray-400 text-sm">Pre-configured strategies with regular updates and new additions</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {strategies.map((strategy, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CardGradient hover="border" className="overflow-hidden h-full">
                <div className="h-40 bg-secondary relative overflow-hidden">
                  <div className="absolute inset-0 chart-grid"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2">
                        {strategy.icon}
                      </div>
                      <h4 className="text-xl font-bold">{strategy.name}</h4>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">{strategy.category}</span>
                    <span className={`px-3 py-1 ${strategy.badge.color} rounded-full text-xs`}>{strategy.badge.text}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {strategy.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Timeframes: {strategy.timeframes}</span>
                    <span className="text-accent">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </CardGradient>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <ButtonGradient className="inline-flex items-center mr-4">
            <Link href="/strategies-library" className="flex items-center">
              <span>View Strategies Library</span>
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </ButtonGradient>
          <a href="#pricing" className="inline-block mt-4 md:mt-0">
            <ButtonGradient className="inline-flex items-center">
              <span>Subscribe Now</span>
              <ArrowRight className="ml-2" size={18} />
            </ButtonGradient>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Strategies;
