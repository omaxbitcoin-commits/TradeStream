import React, { useState } from 'react';
import { useOdinAPI, type OdinTokenData, getOdinImageUrl } from '@/hooks/useOdinAPI';
import { useLanguage } from '@/contexts/LanguageContext';
import { TokenCard } from '@/components/trading/TokenCard';
import { Button } from '@/components/ui/button';
import { Clock, Star, Search, Filter, MoreVertical, Heart, DollarSign } from 'lucide-react';

// Helper function to categorize Odin tokens based on their properties
function categorizeOdinToken(token: OdinTokenData): 'newly_created' | 'about_to_graduate' | 'graduated' {
  // Use bonded status and progress to categorize
  if (token.bonded) {
    return 'graduated';
  } else if (token.progress && token.progress > 0.7) {
    return 'about_to_graduate';
  } else {
    return 'newly_created';
  }
}

// Convert OdinTokenData to the format expected by TokenCard
function convertOdinTokenToTokenCard(token: OdinTokenData) {
  return {
    id: token.id,
    name: token.name,
    symbol: token.ticker,
    contractAddress: token.id, // Use token ID as contract address for Odin
    price: `$${token.price.toFixed(8)}`,
    marketCap: formatNumber(token.marketcap),
    volume24h: formatNumber(token.volume_24),
    change5m: formatPriceChange(token.price, token.price_5m),
    change1h: formatPriceChange(token.price, token.price_1h),
    change6h: formatPriceChange(token.price, token.price_6h),
    change24h: formatPriceChange(token.price, token.price_1d),
    holders: token.holder_count,
    liquidity: formatNumber(token.btc_liquidity),
    age: getTimeAgo(token.created_time),
    isBundled: token.bonded,
    isVerified: token.verified,
    category: categorizeOdinToken(token),
    avatar: getOdinImageUrl('token', token.id)
  };
}

// Utility functions
function formatNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

function formatPriceChange(current: number, previous: number): string {
  if (previous === 0) return "+0.00%";
  const percentage = ((current - previous) / previous) * 100;
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;
  return "Just now";
}

export default function TrenchesPage() {
  const { t } = useLanguage();
  const { tokens: odinTokens, isLoading: odinLoading } = useOdinAPI({ bonded: false }); // Focus on unbonded tokens for trenches
  
  const isLoading = odinLoading;

  // Convert Odin tokens to compatible format and categorize
  const convertedOdinTokens = odinTokens.map(convertOdinTokenToTokenCard);
  const allTokens = convertedOdinTokens;

  // Categorize tokens based on their lifecycle
  const newlyCreated = allTokens.filter(token => token.category === 'newly_created');
  const aboutToGraduate = allTokens.filter(token => token.category === 'about_to_graduate');
  const graduated = allTokens.filter(token => token.category === 'graduated');

  const ColumnHeader = ({ title, price }: { title: string; price: string }) => (
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-foreground">{title}</h3>
          <Button variant="ghost" size="icon" className="w-4 h-4 text-muted-foreground">
            <MoreVertical className="w-3 h-3" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="w-6 h-6" data-testid={`button-search-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Search className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6" data-testid={`button-filter-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Filter className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6" data-testid={`button-sort-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <MoreVertical className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6" data-testid={`button-heart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Heart className="w-3 h-3" />
          </Button>
          <div className="flex items-center space-x-1 bg-background rounded px-2 py-1">
            <DollarSign className="w-3 h-3 text-warning" />
            <span className="text-xs font-medium text-foreground">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ title }: { title: string }) => (
    <div className="h-96 flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h4 className="text-lg font-medium text-foreground mb-2">{t('empty.noCoins')}</h4>
      <p className="text-sm text-muted-foreground max-w-xs">
        Show hidden tokens is enabled. There's no coin data to display right now.
      </p>
    </div>
  );

  const TokenColumn = ({ tokens, title, price }: { tokens: any[]; title: string; price: string }) => (
    <div className="bg-surface border border-border rounded-xl">
      <ColumnHeader title={title} price={price} />
      <div className="h-96 overflow-y-auto">
        {tokens.length === 0 ? (
          <EmptyState title={title} />
        ) : (
          <div>
            {tokens.map(token => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-testid="page-trenches">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-page-title">
          {t('pages.trenches.title')}
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          {t('pages.trenches.subtitle')}
        </p>
      </div>

      {/* Global Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-surface rounded-lg px-3 py-2">
            <Clock className="text-accent" />
            <span className="text-sm font-medium text-foreground">Current</span>
            <div className="flex items-center space-x-1">
              <DollarSign className="text-warning text-xs" />
              <span className="text-sm font-bold text-foreground" data-testid="text-current-token-count">
                0
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-surface rounded-lg px-3 py-2">
            <span className="text-sm text-muted-foreground">Target</span>
            <span className="text-sm font-bold text-foreground" data-testid="text-target-token-count">
              0
            </span>
            <span className="text-sm text-success font-medium" data-testid="text-completion-percentage">
              0%
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Presets:</span>
            <Button variant="outline" size="sm" data-testid="button-preset-n1">N1</Button>
            <Button variant="outline" size="sm" data-testid="button-preset-n2">N2</Button>
            <Button variant="outline" size="sm" data-testid="button-preset-n3">N3</Button>
            <Button variant="ghost" size="icon" className="w-8 h-8" data-testid="button-star-preset">
              <Star className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface border border-border rounded-xl p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TokenColumn
            tokens={newlyCreated}
            title={t('columns.newlyCreated')}
            price="0.001"
          />
          <TokenColumn
            tokens={aboutToGraduate}
            title={t('columns.aboutToGraduate')}
            price="0.0001"
          />
          <TokenColumn
            tokens={graduated}
            title={t('columns.graduated')}
            price="0.0001"
          />
        </div>
      )}
    </main>
  );
}
