import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CardGradient } from '@/components/ui/card-gradient';
import { CheckCircle, Calendar } from 'lucide-react';

interface StripePricingTableProps {
  className?: string;
}

const StripePricingTable = ({ 
  className = ""
}: StripePricingTableProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${className}`}>
      {/* Daily Plan */}
      <CardGradient className="p-6 flex flex-col">
        <div className="absolute -top-3 right-3 bg-amber-500 text-background px-4 py-1 rounded-full text-xs font-medium">
          NEW!
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Daily Pass</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">$1</span>
            <span className="text-gray-400 ml-2">/day</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Pay only for what you use</p>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>10 trades per day</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>1 indicator installation</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Access to basic strategies</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Email support</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>No commitment</span>
            </li>
            <li className="flex items-start">
              <Calendar className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Daily renewal</span>
            </li>
          </ul>
        </div>
        
        <Button className="w-full" size="lg" asChild>
          <Link href="/subscribe?tier=daily_pass">Start Trial</Link>
        </Button>
      </CardGradient>
      
      {/* New Trader Plan */}
      <CardGradient className="p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-bold">New Trader</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">$29</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">After 3-day free trial</p>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>100 trades per day</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>5 indicator installations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Access to basic strategies</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Email support</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>MetaTrader 5 demo support</span>
            </li>
          </ul>
        </div>
        
        <Button className="w-full" size="lg" asChild>
          <Link href="/subscribe?tier=new_trader">Start Trial</Link>
        </Button>
      </CardGradient>
      
      {/* Pro Trader Plan */}
      <CardGradient className="p-6 flex flex-col border-2 border-primary scale-105 shadow-xl">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-background px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
        
        <div className="mb-4 mt-2">
          <h3 className="text-2xl font-bold">Pro Trader</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">$59</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">After 3-day free trial</p>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>250 trades per day</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>10 indicator installations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>All trading strategies</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Access to all addons</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Priority email support</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Desktop trading compatible</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Strategy customization</span>
            </li>
          </ul>
        </div>
        
        <Button className="w-full" size="lg" asChild>
          <Link href="/subscribe?tier=pro_trader">Start Trial</Link>
        </Button>
      </CardGradient>
      
      {/* Elite Trader Plan */}
      <CardGradient className="p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Elite Trader</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">$99</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">After 3-day free trial</p>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Unlimited trades</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>All indicators & addons</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>All trading strategies</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>VIP support</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Advanced customization</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Early access to beta features</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Priority trade execution</span>
            </li>
          </ul>
        </div>
        
        <Button className="w-full" size="lg" asChild>
          <Link href="/subscribe?tier=elite_trader">Start Trial</Link>
        </Button>
      </CardGradient>
    </div>
  );
};

export default StripePricingTable;