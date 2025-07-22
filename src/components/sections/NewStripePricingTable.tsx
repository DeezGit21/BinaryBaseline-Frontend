import { useEffect } from 'react';

interface StripeScriptProps {
  src: string;
}

// Component to load Stripe script
const StripeScript = ({ src }: StripeScriptProps) => {
  useEffect(() => {
    // Check if script already exists to avoid duplicate loading
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up
        document.body.removeChild(script);
      };
    }
  }, [src]);

  return null;
};

interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
}

const StripePricingTable = ({ 
  pricingTableId = "prctbl_1ROtZ9Kv2OHvZcWvyENirGTf",
  publishableKey = "pk_live_51R5ZNgKv2OHvZcWvNDpElImAx7rz6QHFBZ2cd1podK1Ewm1OKcAPXHMbntiHOkzkoQLncc0zc3gv7klFsMXx7qxT00mao18KKL"
}: StripePricingTableProps) => {
  return (
    <>
      <StripeScript src="https://js.stripe.com/v3/pricing-table.js" />
      <div className="w-full">
        <stripe-pricing-table 
          pricing-table-id={pricingTableId}
          publishable-key={publishableKey}
        ></stripe-pricing-table>
      </div>
    </>
  );
};

// Add custom elements to the Window interface
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'pricing-table-id': string;
          'publishable-key': string;
        },
        HTMLElement
      >;
    }
  }
}

export default StripePricingTable;