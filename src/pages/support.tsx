import { useState } from "react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { CardGradient } from "@/components/ui/card-gradient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

export default function Support() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your server
    console.log("Support form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const faqs = [
    {
      question: "How do I install Binary Baseline?",
      answer: "Installation is simple. Download the installer from the Downloads page, double-click the file, and follow the on-screen instructions. The app will create desktop shortcuts automatically."
    },
    {
      question: "How do I connect Binary Baseline to my trading account?",
      answer: "In the app settings, navigate to 'Platform Integration' and select your trading platform (MetaTrader 5 or Pocket Option). Enter your account credentials or API keys as prompted and test the connection."
    },
    {
      question: "What if the automated trading is not working?",
      answer: "First, ensure that you have allowed automated trading in your platform settings. Verify your connection status in Binary Baseline, check that your strategy is activated, and confirm you have sufficient funds in your trading account."
    },
    {
      question: "How do I update Binary Baseline?",
      answer: "Binary Baseline will notify you when updates are available. Simply click on the update notification and follow the prompts. The update process is automatic and will preserve all your settings and configurations."
    },
    {
      question: "Is my subscription transferable to another computer?",
      answer: "Yes, your subscription is tied to your account, not your device. You can install Binary Baseline on a new computer and log in with your account credentials to activate your subscription."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <HelpCircle className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Support</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            Need help with Binary Baseline? Our support team is ready to assist you. Check out our frequently asked questions below or reach out to us directly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <CardGradient className="p-6 flex flex-col items-center text-center">
              <Mail className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Email Support</h3>
              <p className="text-gray-400 mb-3">24/7 response within 24 hours</p>
              <a href="mailto:support@binary-baseline.com" className="text-primary hover:underline">
                support@binary-baseline.com
              </a>
            </CardGradient>
            
            <CardGradient className="p-6 flex flex-col items-center text-center">
              <MessageSquare className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-gray-400 mb-3">Available during business hours</p>
              <Button variant="ghost" className="text-primary hover:underline">
                Start Chat
              </Button>
            </CardGradient>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <CardGradient key={index} className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardGradient>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Contact Us</span>
            </h2>
            
            <CardGradient className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
                    <Check className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-4">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </CardGradient>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}