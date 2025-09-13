import React from 'react';
import { Link } from 'wouter';
import { PredictionMarket } from '@/types';
import { Users, DollarSign, Clock, TrendingUp, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useLanguage } from '@/contexts/LanguageContext';
import sportsImage from '@assets/c8bda1d5-e4b4-4457-8907-cd8e80a0ffd6_1757799921805.png';

interface PredictionCardProps {
  market: PredictionMarket;
  showFull?: boolean;
  variant?: 'default' | 'hero';
}

export function PredictionCard({ market, showFull = false, variant = 'default' }: PredictionCardProps) {
  const { t } = useLanguage();
  
  const formatTimeRemaining = (endDate: Date | string) => {
    const now = new Date();
    let endDateObj: Date;
    
    if (typeof endDate === 'string') {
      endDateObj = new Date(endDate);
    } else if (endDate instanceof Date) {
      endDateObj = endDate;
    } else {
      return 'Invalid date';
    }
    
    // Check if date is valid
    if (isNaN(endDateObj.getTime())) {
      return 'Invalid date';
    }
    
    const diff = endDateObj.getTime() - now.getTime();
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d left`;
    return `${hours}h left`;
  };

  const getPlaceholderImage = (category: string) => {
    const placeholders = {
      sports: sportsImage,
      crypto: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&auto=format',
      politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=200&fit=crop&auto=format',
      entertainment: 'https://images.unsplash.com/photo-1489599363715-049ef8e7e4ee?w=400&h=200&fit=crop&auto=format',
      default: sportsImage
    };
    return placeholders[category as keyof typeof placeholders] || placeholders.default;
  };

  const mainOptions = market.options.slice(0, 2);
  const additionalOptions = market.options.slice(2);

  const cardClasses = variant === 'hero' 
    ? "bg-gradient-to-br from-surface to-surface/80 border border-accent/50 rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group relative"
    : "bg-surface border border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group";

  return (
    <Link href={`/prediction/${market.id}`} className="block">
      <div className={cardClasses} data-testid={`prediction-card-${market.id}`}>
        {/* Compact Header with Image and Title Side-by-Side */}
        <div className="flex items-start gap-3 p-3 sm:p-4">
          {/* Small Image */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
              <img 
                src={market.image || getPlaceholderImage(market.category)} 
                alt={market.title}
                className={`w-full h-full object-cover ${variant === 'hero' ? 'filter brightness-90' : ''}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getPlaceholderImage(market.category);
                }}
                data-testid={`prediction-image-${market.id}`}
              />
            </div>
            {/* Status Badge on Image */}
            <div className="absolute -top-1 -right-1">
              <Badge variant={market.isActive ? "default" : "secondary"} className="text-xs h-5">
                {market.isActive ? "Live" : "Ended"}
              </Badge>
            </div>
          </div>

          {/* Title and Info Beside Image */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <Badge variant="outline" className="text-xs mb-1" data-testid={`prediction-category-${market.id}`}>
                  {market.category}
                </Badge>
                <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2 group-hover:text-accent transition-colors" data-testid={`prediction-title-${market.id}`}>
                  {market.title}
                </h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className="text-xs bg-background/80">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">{formatTimeRemaining(market.endDate)}</span>
                  <span className="sm:hidden">{formatTimeRemaining(market.endDate).replace(' left', '')}</span>
                </Badge>
                {market.featured && (
                  <Badge variant="outline" className="text-xs bg-warning/10 border-warning text-warning">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span data-testid={`prediction-participants-${market.id}`}>
                  {market.participants.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3 h-3" />
                  <span data-testid={`prediction-volume-usd-${market.id}`} className="hidden sm:inline">
                    {market.totalVolumeUSD}
                  </span>
                  <span data-testid={`prediction-volume-usd-mobile-${market.id}`} className="sm:hidden">
                    {market.totalVolumeUSD.replace('$', '$').replace('K', 'k').replace('M', 'm')}
                  </span>
                </div>
                <div className="flex items-center space-x-1 hidden sm:flex">
                  <Bitcoin className="w-3 h-3" />
                  <span data-testid={`prediction-volume-sats-${market.id}`}>
                    {market.totalVolumeSats}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">

          {/* Market Type Indicator and Binary Progress Bar */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {market.marketType === 'binary' ? 'Yes/No' : 
                   market.marketType === 'multiple_choice' ? 'Multiple Choice' : 'Compound'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {market.options.length} options
                </span>
              </div>
            </div>
            
            {/* Segmented Progress Bar for Binary Markets */}
            {market.marketType === 'binary' && market.options.length >= 2 && (
              <div className="flex rounded-lg overflow-hidden h-2 bg-muted">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${market.options[0].percentage}%`, 
                    backgroundColor: market.options[0].color 
                  }}
                />
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${market.options[1].percentage}%`, 
                    backgroundColor: market.options[1].color 
                  }}
                />
              </div>
            )}
          </div>

          {/* Prediction Options with Enhanced Scrolling */}
          <div className="relative mb-3">
            <ScrollArea className={`${variant === 'hero' ? 'h-36' : 'h-32'} w-full rounded-lg border border-border/50`}>
              <div className="space-y-1.5 p-2">
                {market.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border-2 transition-all hover:scale-[1.01] hover:shadow-sm group bg-background/50 ${variant === 'hero' ? 'hover:shadow-md' : ''}`}
                    style={{ borderColor: option.color + '30' }}
                    data-testid={`prediction-option-${option.id}`}
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-background shadow-sm"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="font-medium text-xs sm:text-sm truncate group-hover:text-accent transition-colors">
                        {option.label}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-xs" style={{ color: option.color }}>
                        {option.percentage}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {option.odds.toFixed(2)}x
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Gradient fade at bottom to indicate more content */}
            {market.options.length > 3 && (
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-surface/90 to-transparent pointer-events-none rounded-b-lg" />
            )}
          </div>

          {/* Scroll indicator with count */}
          {market.options.length > 3 && (
            <div className="flex items-center justify-center mb-2">
              <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                {market.options.length} options • scroll to view all
              </span>
            </div>
          )}

          {/* Tags */}
          {market.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {market.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {market.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{market.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}