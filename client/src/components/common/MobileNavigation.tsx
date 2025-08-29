import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Diamond, 
  Search, 
  Compass, 
  Wallet, 
  UserCircle,
  TrendingUp,
  BarChart3,
  Eye,
  Gift,
  Monitor,
  DollarSign,
  Target,
  Bell,
  TrendingDown,
  X
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProfileMenu } from '@/components/modals/ProfileMenu';

export function MobileNavigation() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const closeExplore = () => {
    setIsExploreOpen(false);
  };

  const mainMenuItems = [
    { path: '/trending', label: 'Trending', icon: TrendingUp },
    { path: '/holdings', label: 'Holdings', icon: BarChart3 },
    { path: '/wallet', label: 'Wallet Tracker', icon: Eye },
    { path: '/referral', label: 'Referral', icon: Gift },
    { path: '/trenches', label: 'Monitor', icon: Monitor },
    { path: '/earn', label: 'Earn', icon: DollarSign },
    { path: '/points', label: 'Points', icon: Target },
  ];

  const otherMenuItems = [
    { path: '/sniper', label: 'Sniper', icon: Target },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/pnl-tracker', label: 'P&L Tracker', icon: TrendingDown },
  ];

  return (
    <>
      {/* Explore Menu Overlay */}
      {isExploreOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeExplore}
          data-testid="explore-overlay"
        />
      )}

      {/* Sliding Explore Menu */}
      <div className={`md:hidden fixed bottom-16 left-0 right-0 bg-background border-t border-border z-50 transform transition-transform duration-300 ease-in-out ${
        isExploreOpen ? 'translate-y-0' : 'translate-y-full'
      }`} data-testid="explore-menu">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <button 
              onClick={closeExplore}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-explore"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Menu */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              MAIN MENU
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {mainMenuItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path}>
                  <a 
                    onClick={closeExplore}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                    data-testid={`nav-${label.toLowerCase().replace(' ', '-')}`}
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Menu */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              OTHER
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {otherMenuItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path}>
                  <a 
                    onClick={closeExplore}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                    data-testid={`nav-${label.toLowerCase().replace(' ', '-').replace('&', 'and')}`}
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
        <div className="grid grid-cols-5 h-16">
          <Link href="/">
            <a className={`flex flex-col items-center justify-center transition-colors ${
              isActive('/') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            }`} data-testid="nav-home">
              <Diamond className="text-lg mb-1" />
              <span className="text-xs">Omax</span>
            </a>
          </Link>
          
          <button className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-search">
            <Search className="text-lg mb-1" />
            <span className="text-xs">Search</span>
          </button>
          
          <button 
            onClick={toggleExplore}
            className={`flex flex-col items-center justify-center transition-colors ${
              isExploreOpen ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            }`} 
            data-testid="nav-explore"
          >
            <Compass className="text-lg mb-1" />
            <span className="text-xs">Explore</span>
          </button>
          
          <Link href="/wallet">
            <a className={`flex flex-col items-center justify-center transition-colors ${
              isActive('/wallet') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            }`} data-testid="nav-wallet">
              <Wallet className="text-lg mb-1" />
              <span className="text-xs">Wallet</span>
            </a>
          </Link>
          
          <ProfileMenu>
            <button className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-profile">
              <UserCircle className="text-lg mb-1" />
              <span className="text-xs">Profile</span>
            </button>
          </ProfileMenu>
        </div>
      </nav>
    </>
  );
}
