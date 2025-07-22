import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CardGradient } from "@/components/ui/card-gradient";
import { ChevronDown } from "@/lib/icons";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CardGradient hover="border" className="p-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent"
        >
          <ChevronDown />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </CardGradient>
  );
};

const Faq = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const faqs = [
    {
      question: "How does Binary Baseline connect to Pocket Option?",
      answer: "Binary Baseline uses Pocket Option's API to place trades automatically based on signals received from MetaTrader 5. No third-party services or extra subscriptions are needed."
    },
    {
      question: "Can I use Binary Baseline with a demo account?",
      answer: "Yes, Binary Baseline works with both demo and live Pocket Option accounts. We recommend starting with a demo account to test strategies and get familiar with the platform."
    },
    {
      question: "How many MT5 charts can I run at once?",
      answer: "This depends on your subscription tier: New Trader allows 1 active chart, Pro Trader allows 3 active charts, and Elite Trader offers unlimited charts. Your computer's performance may also affect how many charts you can run efficiently."
    },
    {
      question: "Do I need trading experience to use Binary Baseline?",
      answer: "While Binary Baseline automates the execution process, it's beneficial to have some experience with MetaTrader 5 and basic knowledge of trading and binary options. We provide documentation to help beginners get started, but understanding MT5 platform basics and market fundamentals will significantly improve your trading results."
    },
    {
      question: "What happens if I exceed my daily trade limit?",
      answer: "If you reach your daily trade limit, Binary Baseline will notify you and pause trade execution until your limit resets the following day. You can upgrade your subscription at any time to increase your limit or switch to the Elite Trader tier for unlimited trades."
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
      id="faq" 
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 chart-grid opacity-10 z-0"></div>
      
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">
              Frequently Asked Questions
            </span>
          </h2>
        </div>
        
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
