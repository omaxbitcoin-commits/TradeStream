import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { MobileNavigation } from "@/components/common/MobileNavigation";
import TrendingPage from "@/pages/TrendingPage";
import TrenchesPage from "@/pages/TrenchesPage";
import TokenPage from "@/pages/TokenPage";
import WalletPage from "@/pages/WalletPage";
import EarnPage from "@/pages/EarnPage";
import HoldingsPage from "@/pages/HoldingsPage";
import WalletManagerPage from "@/pages/WalletManagerPage";
import SniperPage from "@/pages/SniperPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import PredictionMarketsPage from "@/pages/PredictionMarketsPage";
import PredictionMarketDetailPage from "@/pages/PredictionMarketDetailPage";
import CreatePredictionPage from "@/pages/CreatePredictionPage";
import XPostPage from "@/pages/XPostPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen pb-20 md:pb-12">
      <Header />
      <Switch>
        <Route path="/" component={TrendingPage} />
        <Route path="/trending" component={TrendingPage} />
        <Route path="/trenches" component={TrenchesPage} />
        <Route path="/token/:id" component={TokenPage} />
        <Route path="/wallet" component={WalletPage} />
        <Route path="/earn" component={EarnPage} />
        <Route path="/holdings" component={HoldingsPage} />
        <Route path="/wallet-manager" component={WalletManagerPage} />
        <Route path="/sniper" component={SniperPage} />
        <Route path="/prediction-markets" component={PredictionMarketsPage} />
        <Route path="/create-prediction" component={CreatePredictionPage} />
        <Route path="/prediction/:id" component={PredictionMarketDetailPage} />
        <Route path="/x-post" component={XPostPage} />
        <Route path="/coming-soon" component={ComingSoonPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <MobileNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors">
              <Toaster />
              <Router />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
