import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardGradient, CardGradientContent } from "@/components/ui/card-gradient";
import { Bot, ChartBar, Gauge, RefreshCcw, Shield, GitBranch } from "@/lib/icons";

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const features = [
    {
      icon: <Bot className="text-accent text-3xl" />,
      title: "Automated Execution",
      description: "Binary Baseline automatically places trades when signals are detected, eliminating the need for manual intervention.",
    },
    {
      icon: <ChartBar className="text-accent text-3xl" />,
      title: "Strategy Library",
      description: "Access a growing library of proven trading strategies, regularly updated and back-tested for reliability.",
    },
    {
      icon: <Gauge className="text-accent text-3xl" />,
      title: "Real-Time Dashboard",
      description: "Monitor all your trading activity from a central dashboard that provides real-time insights and performance metrics.",
    },
    {
      icon: <RefreshCcw className="text-accent text-3xl" />,
      title: "Multi-Chart Monitoring",
      description: "Run multiple chart strategies simultaneously, with each chart operating independently for maximum opportunity.",
    },
    {
      icon: <Shield className="text-accent text-3xl" />,
      title: "Demo Account Support",
      description: "Practice with a demo account before going live, allowing you to test strategies without risking real capital.",
    },
    {
      icon: <GitBranch className="text-accent text-3xl" />,
      title: "Strategy Customization",
      description: "Tweak and adjust strategies to suit your trading style and risk tolerance through an intuitive interface.",
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
      id="features" 
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Binary Baseline combines powerful technology with user-friendly features to give you an edge in binary options trading.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CardGradient hover="border" className="h-full">
                <div className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </CardGradient>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
