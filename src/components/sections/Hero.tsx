import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { ChartLineUp, Bolt, ChartBar, Monitor } from "@/lib/icons";
import VisitCounter from "@/components/VisitCounter";

const Hero = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

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
    <section ref={sectionRef} className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 px-4">
      <div className="absolute inset-0 grid-background opacity-30 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Automated Trading</span> 
              <span className="block">For Binary Options</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-lg mx-auto lg:mx-0">
              A high-performance platform that runs directly off MetaTrader 5, executing trades on Pocket Option in real time.
            </p>
            
            <div className="mb-8 flex justify-center lg:justify-start">
              <VisitCounter path="/" threshold={250} />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#pricing">
                <ButtonGradient size="lg">
                  Start 3-Day Free Trial
                </ButtonGradient>
              </a>
              <a href="#how-it-works">
                <ButtonGradient size="lg" variant="outline">
                  How It Works
                </ButtonGradient>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl opacity-30 rounded-full"></div>
              <div className="relative z-10 rounded-lg shadow-2xl border border-accent/20 bg-secondary/30 overflow-hidden">
                <img 
                  src="/api/assets/Screenshot 2025-04-06 152916_1752722190576.png" 
                  alt="Live Binary Baseline trading interface showing high win rate results"
                  className="w-full h-auto"
                />
                <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-2 rounded-full text-sm font-bold">
                  +92% Profit
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded text-sm">
                  Live Trading Results
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 border border-muted">
            <div className="text-accent mb-2">
              <ChartLineUp size={28} />
            </div>
            <h3 className="text-xl font-bold mb-1">Direct Integration</h3>
            <p className="text-gray-400 text-sm">MT5 to Pocket Option without third parties</p>
          </div>
          
          <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 border border-muted">
            <div className="text-accent mb-2">
              <Bolt size={28} />
            </div>
            <h3 className="text-xl font-bold mb-1">Instant Execution</h3>
            <p className="text-gray-400 text-sm">Trades executed in under 2 seconds</p>
          </div>
          
          <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 border border-muted">
            <div className="text-accent mb-2">
              <ChartBar size={28} />
            </div>
            <h3 className="text-xl font-bold mb-1">Multiple Charts</h3>
            <p className="text-gray-400 text-sm">Run up to 10+ MT5 charts simultaneously</p>
          </div>
          
          <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 border border-muted">
            <div className="text-accent mb-2">
              <Monitor size={28} />
            </div>
            <h3 className="text-xl font-bold mb-1">Desktop Client</h3>
            <p className="text-gray-400 text-sm">Optimized for MetaTrader 5 on desktop</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
