import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import StrategiesLibrary from "@/pages/strategies-library";
import Checkout from "@/pages/checkout";
import PaymentSuccess from "@/pages/payment-success";
import Download from "@/pages/download";
import Subscribe from "@/pages/subscribe";
import PricingPage from "@/pages/pricing";
import StrategyPerformancePage from "@/pages/strategy-performance";
import Documentation from "@/pages/documentation";
import Support from "@/pages/support";
import Feedback from "@/pages/feedback";
import Community from "@/pages/community";
import IndicatorAddons from "@/pages/indicator-addons";
import AdminUpload from "@/pages/admin-upload";
import UploadFile from "@/pages/upload-file";
import HowToGuides from "@/pages/how-to";
import AdminDownloads from "@/pages/admin/downloads";
import AdminUploadDownload from "@/pages/admin/upload-download";
import AdminPage from "@/pages/admin";
import AdminUsers from "@/pages/admin/users";
import AdminReports from "@/pages/admin/reports";
import AnalyticsDashboard from "@/pages/admin/analytics-dashboard";
import AdminLicenseKeys from "@/pages/admin/license-keys";

// Import How-To guide pages
import DownloadMT5Guide from "@/pages/how-to/download-mt5";
import MT5ChartSetupGuide from "@/pages/how-to/mt5-chart-setup";
import BinaryBaselineSetupGuide from "@/pages/how-to/binary-baseline-setup";
import MT5FavoritesGuide from "@/pages/how-to/mt5-favorites";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/strategies-library" component={StrategiesLibrary} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/download" component={Download} />
      <Route path="/indicator-addons" component={IndicatorAddons} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/support" component={Support} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/community" component={Community} />
      <Route path="/admin-upload" component={AdminUpload} />
      <Route path="/upload-file" component={UploadFile} />
      <Route path="/how-to" component={HowToGuides} />
      <Route path="/how-to/download-mt5" component={DownloadMT5Guide} />
      <Route path="/how-to/mt5-chart-setup" component={MT5ChartSetupGuide} />
      <Route path="/how-to/binary-baseline-setup" component={BinaryBaselineSetupGuide} />
      <Route path="/how-to/mt5-favorites" component={MT5FavoritesGuide} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/login" component={AuthPage} />
      <Route path="/admin/downloads" component={AdminDownloads} />
      <Route path="/admin/upload-download" component={AdminUploadDownload} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/reports" component={AdminReports} />
      <Route path="/admin/analytics" component={AnalyticsDashboard} />
      <Route path="/admin/license-keys" component={AdminLicenseKeys} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
