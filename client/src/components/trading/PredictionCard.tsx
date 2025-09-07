import React from 'react';
import { Link } from 'wouter';
import { PredictionMarket } from '@/types';
import { Users, DollarSign, Clock, TrendingUp, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionCardProps {
  market: PredictionMarket;
  showFull?: boolean;
}

export function PredictionCard({ market, showFull = false }: PredictionCardProps) {
  const { t } = useLanguage();
  
  const formatTimeRemaining = (endDate: Date | string) => {
    const now = new Date();
    const endDateObj = typeof endDate === 'string' ? new Date(endDate) : endDate;
    const diff = endDateObj.getTime() - now.getTime();
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d left`;
    return `${hours}h left`;
  };

  const mainOptions = market.options.slice(0, 2);
  const additionalOptions = market.options.slice(2);

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent transition-colors group" data-testid={`prediction-card-${market.id}`}>
      {/* Image and Status */}
      <div className="relative">
        <img 
          src={market.image} 
          alt={market.title}
          className="w-full h-48 object-cover"
          data-testid={`prediction-image-${market.id}`}
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <Badge variant={market.isActive ? "default" : "secondary"} className="text-xs">
            {market.isActive ? "Live" : "Ended"}
          </Badge>
          {market.featured && (
            <Badge variant="outline" className="text-xs bg-warning/10 border-warning text-warning">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeRemaining(market.endDate)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category and Title */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs mb-2" data-testid={`prediction-category-${market.id}`}>
            {market.category}
          </Badge>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-accent transition-colors" data-testid={`prediction-title-${market.id}`}>
            {market.title}
          </h3>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span data-testid={`prediction-participants-${market.id}`}>
              {market.participants.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-3 h-3" />
              <span data-testid={`prediction-volume-usd-${market.id}`}>
                {market.totalVolumeUSD}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Bitcoin className="w-3 h-3" />
              <span data-testid={`prediction-volume-sats-${market.id}`}>
                {market.totalVolumeSats}
              </span>
            </div>
          </div>
        </div>

        {/* Main Prediction Options */}
        <div className="space-y-2 mb-3">
          {mainOptions.map((option) => (
            <Link key={option.id} href={`/prediction/${market.id}`}>
              <Button
                variant="outline"
                className={`w-full flex items-center justify-between p-3 h-auto transition-all hover:scale-[1.02] border-2`}
                style={{ borderColor: option.color + '40' }}
                data-testid={`prediction-option-${option.id}`}
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="font-medium">{option.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm" style={{ color: option.color }}>
                    {option.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {option.odds.toFixed(2)}x
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>

        {/* Additional Options (if more than 2) */}
        {additionalOptions.length > 0 && (
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                +{additionalOptions.length} more options
              </span>
              <div className="flex space-x-1">
                {additionalOptions.slice(0, 3).map((option, index) => (
                  <div
                    key={option.id}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: option.color }}
                    title={`${option.label}: ${option.percentage}%`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {market.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
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
  );
}