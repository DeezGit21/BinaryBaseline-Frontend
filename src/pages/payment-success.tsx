import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { Check, DownloadCloud, CreditCard } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentSuccess() {
  const [transactionDetails, setTransactionDetails] = useState({
    amount: "$0.00",
    orderNumber: "N/A",
    date: new Date().toLocaleDateString(),
    plan: "Binary Baseline Subscription"
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Parse URL parameters to check for payment status
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntent = urlParams.get("payment_intent");
        const redirectStatus = urlParams.get("redirect_status");
        
        if (!paymentIntent || redirectStatus !== "succeeded") {
          // If no payment_intent or payment wasn't successful, show error
          toast({
            title: "Payment Verification Failed",
            description: "We couldn't verify your payment details. Please contact support.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Fetch payment details from our backend
        const response = await fetch(`/api/payment-status?payment_intent=${paymentIntent}`);
        
        if (!response.ok) {
          throw new Error("Failed to verify payment status");
        }
        
        const data = await response.json();
        
        // Format the amount with currency symbol
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(data.amount / 100); // Stripe amounts are in cents
        
        setTransactionDetails({
          amount: formattedAmount,
          orderNumber: data.id || `ORD-${paymentIntent.substr(-6)}`,
          date: new Date().toLocaleDateString(),
          plan: data.description || "Binary Baseline Subscription"
        });
        
        // Invalidate any cached user data to refresh subscription status
        queryClient.invalidateQueries({ queryKey: ["/api/user"] });
        queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
        
        toast({
          title: "Payment Processed Successfully",
          description: "Your payment has been processed and your account has been activated.",
        });
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast({
          title: "Payment Verification Error",
          description: "There was an error verifying your payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentDetails();
  }, [toast, queryClient]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full">
        <CardGradient className="p-8 text-center">
          {loading ? (
            <div className="py-8">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold">Verifying Payment</h2>
              <p className="text-gray-400 mt-2">Please wait while we verify your payment details...</p>
            </div>
          ) : (
            <>
              <div className="mb-6 mx-auto rounded-full bg-primary/20 w-20 h-20 flex items-center justify-center">
                <Check className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                <span className="gradient-text">Payment Successful</span>
              </h1>
              
              <p className="text-lg mb-6">
                Thank you for your payment. Your transaction has been completed, and you now have access to Binary Baseline.
              </p>
              
              <div className="border border-gray-700 rounded-md p-4 mb-6">
                <h3 className="font-semibold text-lg mb-3">Transaction Details</h3>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="text-gray-400">Amount:</div>
                  <div className="font-medium">{transactionDetails.amount}</div>
                  
                  <div className="text-gray-400">Order Number:</div>
                  <div className="font-medium">{transactionDetails.orderNumber}</div>
                  
                  <div className="text-gray-400">Date:</div>
                  <div className="font-medium">{transactionDetails.date}</div>
                  
                  <div className="text-gray-400">Plan:</div>
                  <div className="font-medium">{transactionDetails.plan}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button asChild className="w-full flex items-center gap-2">
                  <Link href="/download">
                    <DownloadCloud className="h-4 w-4" />
                    Download Software
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full flex items-center gap-2">
                  <Link href="/dashboard">
                    <CreditCard className="h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                A receipt has been sent to your email address.
              </p>
            </>
          )}
        </CardGradient>
      </div>
    </div>
  );
}