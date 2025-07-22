import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardGradient } from "@/components/ui/card-gradient";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { Bolt, ChartLineUp, Bot, Expand, ArrowRight } from "@/lib/icons";

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const reasons = [
    {
      icon: <Bolt className="text-accent text-4xl" />,
      title: "No Middleman Delay",
      description: "Direct integration means trades are placed in under 2 seconds, giving you a crucial edge in fast-moving markets."
    },
    {
      icon: <ChartLineUp className="text-accent text-4xl" />,
      title: "Proven Strategies",
      description: "All strategies are thoroughly back-tested and continuously updated to adapt to changing market conditions."
    },
    {
      icon: <Bot className="text-accent text-4xl" />,
      title: "Hands-Free Trading",
      description: "Once set up, Binary Baseline handles everything—no need for constant monitoring or manual trade execution."
    },
    {
      icon: <Expand className="text-accent text-4xl" />,
      title: "Built for Speed & Scale",
      description: "Whether you're running a single chart or a dozen, Binary Baseline maintains performance without compromising speed."
    }
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
      id="testimonials" 
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              Why Traders Choose Us
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Binary Baseline was built by traders, for traders, focusing on what matters most.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CardGradient hover="border" className="p-8">
                <div className="flex items-start mb-6">
                  <div className="mr-4 mt-1">{reason.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-gray-400">{reason.description}</p>
                  </div>
                </div>
              </CardGradient>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="#pricing">
            <ButtonGradient size="lg" className="inline-flex items-center">
              <span>Start Your 3-Day Free Trial</span>
              <ArrowRight className="ml-2" size={20} />
            </ButtonGradient>
          </a>
          <p className="text-gray-400 mt-4">No credit card required for trial • Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
