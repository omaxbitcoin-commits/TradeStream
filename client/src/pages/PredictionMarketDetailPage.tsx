import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BettingInterface } from "@/components/prediction/BettingInterface";
import { MarketChart } from "@/components/prediction/MarketChart";
import { TopHoldersActivity } from "@/components/prediction/TopHoldersActivity";
import { PriceChart } from "@/components/trading/PriceChart";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  Link as LinkIcon, 
  Share2, 
  Heart,
  BarChart3,
  Coins,
  TreePine
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { PredictionMarket } from "@/types";

export default function PredictionMarketDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: market, isLoading, error } = useQuery({
    queryKey: ["/api/prediction-market", id],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !market?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Failed to load prediction market details
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const predictionMarket: PredictionMarket = market.data;

  const getPredictionTypeIcon = (type: string) => {
    switch (type) {
      case 'binary':
        return <Coins className="h-4 w-4" />;
      case 'multiple':
        return <BarChart3 className="h-4 w-4" />;
      case 'compound':
        return <TreePine className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getPredictionTypeLabel = (type: string) => {
    switch (type) {
      case 'binary':
        return 'Binary (Yes/No)';
      case 'multiple':
        return 'Multiple Choice';
      case 'compound':
        return 'Compound Prediction';
      default:
        return 'Prediction Market';
    }
  };

  const renderOptions = () => {
    if (predictionMarket.predictionType === 'compound') {
      return predictionMarket.options.map((option) => (
        <div key={option.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{option.label}</h4>
            <Badge style={{ backgroundColor: option.color }} className="text-white">
              {option.percentage}%
            </Badge>
          </div>
          <Progress value={option.percentage} className="h-2" />
          <div className="text-sm text-muted-foreground">
            Volume: {option.volume} • Odds: {option.odds}x
          </div>
          
          {option.subOptions && (
            <div className="border-t pt-3 mt-3">
              <p className="text-sm font-medium mb-2">Sub-predictions:</p>
              <div className="grid grid-cols-2 gap-2">
                {option.subOptions.map((subOption) => (
                  <div
                    key={subOption.id}
                    className="bg-muted/50 rounded p-2 text-center"
                  >
                    <div className="font-medium text-sm">{subOption.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {subOption.percentage}% • {subOption.odds}x
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ));
    } else {
      return predictionMarket.options.map((option) => (
        <div key={option.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{option.label}</h4>
            <Badge style={{ backgroundColor: option.color }} className="text-white">
              {option.percentage}%
            </Badge>
          </div>
          <Progress value={option.percentage} className="h-2" />
          <div className="text-sm text-muted-foreground">
            Volume: {option.volume} • Odds: {option.odds}x
          </div>
          {option.ledgerId && (
            <div className="text-xs text-muted-foreground">
              Ledger: {option.ledgerId}
            </div>
          )}
        </div>
      ));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Market Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="gap-1">
                {getPredictionTypeIcon(predictionMarket.predictionType)}
                {getPredictionTypeLabel(predictionMarket.predictionType)}
              </Badge>
              <Badge variant="secondary">{predictionMarket.category}</Badge>
              {predictionMarket.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">
              {predictionMarket.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {predictionMarket.participants.toLocaleString()} participants
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {predictionMarket.totalVolumeUSD} volume
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Ends {formatDistanceToNow(new Date(predictionMarket.endDate), { addSuffix: true })}
              </div>
              <div className="flex items-center gap-1">
                <span>by</span>
                <Badge variant="outline">{predictionMarket.creator}</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {predictionMarket.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Market Image */}
        {predictionMarket.image && (
          <div className="w-full h-48 lg:h-64 rounded-lg overflow-hidden bg-muted mb-6">
            <img 
              src={predictionMarket.image} 
              alt={predictionMarket.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts and Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-80">
                <PriceChart data={[
                  { time: '09:00', price: predictionMarket.options[0]?.percentage || 50 },
                  { time: '12:00', price: (predictionMarket.options[0]?.percentage || 50) + 2 },
                  { time: '15:00', price: (predictionMarket.options[0]?.percentage || 50) - 1 },
                  { time: '18:00', price: predictionMarket.options[0]?.percentage || 50 }
                ]} />
              </div>
            </CardContent>
          </Card>

          {/* Market Options */}
          <Card>
            <CardHeader>
              <CardTitle>Market Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderOptions()}
            </CardContent>
          </Card>

          {/* Description & Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Market Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {predictionMarket.description}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Resolution Criteria</h4>
                {predictionMarket.resolutionDescription && (
                  <p className="text-muted-foreground mb-3">
                    {predictionMarket.resolutionDescription}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  <a 
                    href={predictionMarket.resolutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Official Resolution Source
                  </a>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">End Date</div>
                  <div className="font-medium">
                    {new Date(predictionMarket.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Expiration</div>
                  <div className="font-medium">
                    {new Date(predictionMarket.expirationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Holders & Activity */}
          <TopHoldersActivity 
            topHolders={predictionMarket.topHolders}
            recentActivity={predictionMarket.recentActivity}
          />
        </div>

        {/* Right Column: Betting Interface */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <BettingInterface 
              market={predictionMarket}
              onBetPlaced={(betData) => {
                console.log('Bet placed:', betData);
                // Handle bet placement
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}