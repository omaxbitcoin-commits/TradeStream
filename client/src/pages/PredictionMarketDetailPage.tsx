import React, { useState } from 'react';
import { useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { PredictionMarket, PredictionOption } from '@/types';
import { BettingInterface } from '@/components/prediction/BettingInterface';
import { MarketChat } from '@/components/prediction/MarketChat';
import { MarketChart } from '@/components/prediction/MarketChart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Share, Clock, Users, DollarSign, Bitcoin, TrendingUp, Calendar, Info } from 'lucide-react';
import { Link } from 'wouter';

// Sample market data (in a real app, this would be fetched based on the ID)
const sampleMarket: PredictionMarket = {
  id: '1',
  title: '2025 US Open Winner (M)',
  description: 'This market will resolve to the player that wins the 2025 US Open Men\'s Singles Tournament. Otherwise, this market will resolve to "No" if listed player wins the 2025 US Open Men\'s Singles Tournament. The primary resolution source will be official information from the US Open organization and other authoritative sources concerning how event occurs.',
  image: '/attached_assets/4efa8902-d287-4d3b-8bc0-9c8d8122160f_1757244824549.png',
  category: 'sports',
  endDate: new Date('2025-09-15'),
  totalVolume: '1.2M',
  totalVolumeUSD: '$1.2M',
  totalVolumeSats: '1.8M sats',
  participants: 1247,
  options: [
    { id: '1a', label: 'Novak Djokovic', odds: 2.1, percentage: 49, volume: '$589K', color: '#10b981' },
    { id: '1b', label: 'Carlos Alcaraz', odds: 2.3, percentage: 38, volume: '$456K', color: '#ef4444' },
    { id: '1c', label: 'Other Player', odds: 8.5, percentage: 13, volume: '$155K', color: '#6b7280' }
  ],
  isActive: true,
  creator: 'sportsbet_pro',
  featured: true,
  tags: ['Tennis', 'Grand Slam', 'ATP']
};

export default function PredictionMarketDetailPage() {
  const { t } = useLanguage();
  const [, params] = useRoute('/prediction/:id');
  const [selectedOption, setSelectedOption] = useState<PredictionOption | undefined>();
  
  const marketId = params?.id || '1';
  // In a real app, you would fetch the market data based on the ID
  const market = sampleMarket;

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    if (diff <= 0) return 'Market Closed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours remaining`;
    return `${hours} hours remaining`;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-testid="page-prediction-detail">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/prediction-markets">
          <Button variant="ghost" className="flex items-center space-x-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Markets</span>
          </Button>
        </Link>
      </div>

      {/* Market Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Market Image */}
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <img 
              src={market.image} 
              alt={market.title}
              className="w-full lg:w-80 h-48 lg:h-60 object-cover rounded-xl"
            />
          </div>

          {/* Market Info */}
          <div className="flex-1 space-y-4">
            {/* Title and Status */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{market.category}</Badge>
                <Badge variant={market.isActive ? "default" : "secondary"}>
                  {market.isActive ? "Live" : "Ended"}
                </Badge>
                {market.featured && (
                  <Badge variant="outline" className="bg-warning/10 border-warning text-warning">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {market.title}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatTimeRemaining(market.endDate)}</span>
              </div>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface border border-border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Volume (USD)</span>
                </div>
                <div className="font-bold text-lg">{market.totalVolumeUSD}</div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Bitcoin className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Volume (Sats)</span>
                </div>
                <div className="font-bold text-lg">{market.totalVolumeSats}</div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Participants</span>
                </div>
                <div className="font-bold text-lg">{market.participants.toLocaleString()}</div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Options</span>
                </div>
                <div className="font-bold text-lg">{market.options.length}</div>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Share className="w-4 h-4" />
                <span>Share Market</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart and Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Chart */}
          <MarketChart market={market} />

          {/* Market Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Market Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed mb-4">
                {market.description}
              </p>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Market Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Creator:</span>
                      <span className="font-medium">{market.creator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution Date:</span>
                      <span className="font-medium">{market.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market ID:</span>
                      <span className="font-medium font-mono text-xs">{market.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-medium ${market.isActive ? 'text-success' : 'text-muted-foreground'}`}>
                        {market.isActive ? 'Active' : 'Ended'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                {market.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {market.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Market Chat - Mobile/Tablet */}
          <div className="lg:hidden">
            <MarketChat marketId={marketId} />
          </div>
        </div>

        {/* Right Column - Betting Interface and Chat */}
        <div className="space-y-6">
          {/* Betting Interface */}
          <BettingInterface
            market={market}
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
          />

          {/* Market Chat - Desktop */}
          <div className="hidden lg:block">
            <MarketChat marketId={marketId} />
          </div>
        </div>
      </div>
    </main>
  );
}