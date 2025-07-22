import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { CardGradient } from '@/components/ui/card-gradient';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const STRIPE_PUBLIC_KEY = 'pk_live_51R5ZNgKv2OHvZcWvNDpElImAx7rz6QHFBZ2cd1podK1Ewm1OKcAPXHMbntiHOkzkoQLncc0zc3gv7klFsMXx7qxT00mao18KKL';
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
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
      } else {
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
        
        // Redirect to success page
        setLocation('/payment-success');
      }
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
          "Complete Purchase"
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const { toast } = useToast();
  
  // Get plan details from URL or default to "pro"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    if (planParam && ["basic", "pro", "elite"].includes(planParam)) {
      setSelectedPlan(planParam);
    }
  }, []);
  
  // Define product pricing based on selected plan
  const productOptions = {
    basic: {
      name: "Binary Baseline - Basic License",
      price: 199,
      description: "Access to basic trading features with up to 100 trades per day",
      features: [
        "Access to core Binary Baseline software",
        "MetaTrader 5 integration",
        "100 trades per day limit",
        "1 active chart",
        "Email support",
        "1 year of updates"
      ]
    },
    pro: {
      name: "Binary Baseline - Pro License",
      price: 321,
      description: "Full-featured trading solution with advanced strategies",
      features: [
        "Access to all Binary Baseline features",
        "MetaTrader 5 integration",
        "500 trades per day",
        "3 active charts",
        "Priority email support",
        "Advanced strategies package",
        "1 year of updates"
      ]
    },
    elite: {
      name: "Binary Baseline - Elite License",
      price: 499,
      description: "Ultimate trading solution with unlimited usage",
      features: [
        "Access to all Binary Baseline features",
        "MetaTrader 5 integration",
        "Unlimited trades per day",
        "Unlimited active charts",
        "Premium 24/7 support",
        "All strategy packages included",
        "Custom strategy development",
        "Lifetime free updates"
      ]
    }
  };
  
  // Get current product details based on selected plan
  const product = productOptions[selectedPlan as keyof typeof productOptions];
  const amount = product.price;
  const productName = product.name;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount,
          productName,
          plan: selectedPlan
        });
        
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Could not initialize payment. Please try again.");
        }
      } catch (err: any) {
        console.error("Error creating payment intent:", err);
        setError(err.message || "Failed to create payment");
        toast({
          title: "Payment Error",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [amount, productName, selectedPlan, toast]);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          <span className="gradient-text">Complete Your Purchase</span>
        </h1>
        
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {Object.entries(productOptions).map(([key, planOption]) => (
              <div 
                key={key}
                className={`rounded-lg border p-4 cursor-pointer transition-all ${
                  selectedPlan === key 
                    ? 'border-primary bg-primary/10' 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => {
                  if (!loading) {
                    setSelectedPlan(key);
                  }
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                  {selectedPlan === key && (
                    <Check className="text-primary h-5 w-5" />
                  )}
                </div>
                <p className="text-xl font-bold mb-2">${planOption.price}</p>
                <p className="text-sm text-gray-400">{planOption.description.split(' ').slice(0, 6).join(' ')}...</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <CardGradient className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">Product</p>
                <p className="text-xl font-bold">{productName}</p>
                <p className="text-gray-400 mt-1">{product.description}</p>
              </div>
              
              <div className="flex justify-between items-baseline border-t border-gray-700 pt-4">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">${amount.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between items-baseline">
                <p className="text-muted-foreground">Taxes</p>
                <p className="font-medium">$0.00</p>
              </div>
              
              <div className="flex justify-between items-baseline border-t border-gray-700 pt-4">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-xl font-bold">${amount.toFixed(2)}</p>
              </div>
              
              <div className="mt-6">
                <p className="text-muted-foreground">Includes</p>
                <div className="mt-2 space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="text-primary mr-2 mt-1" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-md p-3 mt-4 flex items-start">
                <svg className="flex-shrink-0 h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-300">
                    By completing this purchase, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and acknowledge you've read our <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </CardGradient>
          
          {/* Payment Form */}
          <CardGradient className="p-6">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p>Preparing payment form...</p>
              </div>
            )}
            
            {error && (
              <div className="bg-destructive/20 p-4 rounded-md flex items-start mb-4">
                <AlertCircle className="text-destructive mr-2 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="font-medium text-destructive">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
            
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
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