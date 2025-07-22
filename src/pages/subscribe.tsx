import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { CardGradient } from '@/components/ui/card-gradient';
import { Loader2, Check, AlertCircle, Mail, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Subscription payment form component
const PaymentForm = ({ clientSecret, tier }: { clientSecret: string, tier: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
        },
      });
  
      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      // The successful payment will redirect to the return_url
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Processing...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>
    </form>
  );
};

// Plan details component
interface PlanDetails {
  name: string;
  price: number;
  tradeLimit: string;
  chartLimit: string;
  features: string[];
}

const getPlanDetails = (tier: string): PlanDetails => {
  switch (tier) {
    case "new_trader":
      return {
        name: "New Trader",
        price: 29,
        tradeLimit: "100 per day",
        chartLimit: "1 active chart",
        features: [
          "Access to basic strategies",
          "Email support",
          "MetaTrader 5 demo support",
        ]
      };
    case "pro_trader":
      return {
        name: "Pro Trader",
        price: 59,
        tradeLimit: "250 per day",
        chartLimit: "3 active charts",
        features: [
          "All trading strategies",
          "Priority email support",
          "Desktop trading compatible",
          "Strategy customization",
        ]
      };
    case "elite_trader":
      return {
        name: "Elite Trader",
        price: 99,
        tradeLimit: "Unlimited",
        chartLimit: "Unlimited",
        features: [
          "All trading strategies",
          "VIP support",
          "Advanced customization",
          "Early access to beta features",
          "Priority trade execution",
        ]
      };
    default:
      return getPlanDetails("pro_trader");
  }
};

// Main subscription page
export default function Subscribe() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Extract tier from URL query params or default to pro_trader
  const tier = window.location.search 
    ? new URLSearchParams(window.location.search).get("tier") || "pro_trader"
    : "pro_trader";
  
  // Plan details for the selected tier
  const planDetails = getPlanDetails(tier);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiRequest("POST", "/api/create-subscription", { 
        tier,
        email,
        name
      });
      
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setError("Could not initialize payment. Please try again.");
      }
    } catch (err: any) {
      console.error("Error creating subscription:", err);
      setError(err.message || "Failed to create subscription");
      toast({
        title: "Subscription Error",
        description: "There was a problem setting up your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Simple email validation
  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="gradient-text">Subscribe to {planDetails.name}</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <CardGradient className="p-6">
            <h2 className="text-xl font-bold mb-4">Plan Summary</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">Subscription</p>
                <p className="text-xl font-bold">{planDetails.name}</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="text-xl font-bold">${planDetails.price}/month</p>
                <p className="text-sm text-muted-foreground">3-day free trial, cancel anytime</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Includes</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-start">
                    <Check className="text-primary mr-2 mt-1" size={16} />
                    <span>{planDetails.tradeLimit} trades</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-primary mr-2 mt-1" size={16} />
                    <span>{planDetails.chartLimit}</span>
                  </div>
                  {planDetails.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="text-primary mr-2 mt-1" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardGradient>
          
          {/* Payment Form */}
          <CardGradient className="p-6">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            
            {error && (
              <div className="bg-destructive/20 p-4 rounded-md flex items-start mb-4">
                <AlertCircle className="text-destructive mr-2 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="font-medium text-destructive">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
            
            {!clientSecret ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name (Optional)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing...
                    </>
                  ) : (
                    "Continue to Payment"
                  )}
                </Button>
              </form>
            ) : (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm clientSecret={clientSecret} tier={tier} />
              </Elements>
            )}
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Secure payments via Stripe</p>
              <img 
                src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-White-Logo.wine.svg" 
                alt="Stripe" 
                className="h-8 mx-auto mt-2" 
              />
            </div>
          </CardGradient>
        </div>
      </div>
    </div>
  );
}