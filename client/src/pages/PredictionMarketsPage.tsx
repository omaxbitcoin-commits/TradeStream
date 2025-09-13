import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PredictionCard } from '@/components/trading/PredictionCard';
import { CategoryTabs } from '@/components/prediction/CategoryTabs';
import { PredictionFilters } from '@/components/prediction/PredictionFilters';
import { usePredictionMarkets, usePredictionCategories } from '@/hooks/usePredictionMarketsAPI';
import { TrendingUp, Zap, Calendar, Users, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'wouter';

export default function PredictionMarketsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('volume');

  // Fetch data from API
  const { data: markets = [], isLoading: marketsLoading, error: marketsError } = usePredictionMarkets();
  const { data: categories = [], isLoading: categoriesLoading } = usePredictionCategories();

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let filtered = markets.filter(market => {
      const matchesCategory = activeCategory === 'all' || market.category === activeCategory;
      const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           market.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           market.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    // Sort markets
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return parseFloat(b.totalVolumeUSD) - parseFloat(a.totalVolumeUSD);
        case 'activity':
          return b.participants - a.participants;
        case 'newest':
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        default:
          return 0;
      }
    });
  }, [markets, activeCategory, searchTerm, sortBy]);

  // Get featured markets (top 3 by volume)
  const featuredMarkets = useMemo(() => {
    return markets
      .filter(market => market.isActive)
      .sort((a, b) => parseFloat(b.totalVolumeUSD) - parseFloat(a.totalVolumeUSD))
      .slice(0, 3);
  }, [markets]);

  const isLoading = marketsLoading || categoriesLoading;

  return (
    <div data-testid="page-prediction-markets">
      {/* Sticky Categories Bar */}
      {!categoriesLoading && categories.length > 0 && (
        <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Prediction Markets
        </h1>
        <p className="text-muted-foreground text-lg">
          Bet on future events with real money. Create and trade on predictions about sports, politics, crypto, and more.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Total Volume</span>
          </div>
          <div className="font-bold text-lg text-foreground">$3.25M</div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Active Markets</span>
          </div>
          <div className="font-bold text-lg text-foreground">{markets.filter(m => m.isActive).length}</div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Participants</span>
          </div>
          <div className="font-bold text-lg text-foreground">
            {markets.reduce((sum, m) => sum + m.participants, 0).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Resolving Today</span>
          </div>
          <div className="font-bold text-lg text-foreground">2</div>
        </div>
      </div>

      {/* Featured Markets Carousel */}
      {featuredMarkets.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Featured Markets</h2>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredMarkets.map((market) => (
                <CarouselItem key={market.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 xl:basis-1/3">
                  <PredictionCard market={market} variant="hero" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      )}

      {/* Search and Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-surface/50 rounded-lg border border-border">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2"
          data-testid="button-filters"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]" data-testid="select-sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume">Volume</SelectItem>
            <SelectItem value="activity">Activity</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        
        <Link href="/create-prediction">
          <Button className="flex items-center gap-2" data-testid="button-create-prediction">
            <Plus className="h-4 w-4" />
            Create Prediction
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <PredictionFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={setFilters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilters={filters}
      />

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredMarkets.length} prediction markets
          {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading prediction markets...</p>
          </div>
        ) : marketsError ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <TrendingUp className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Error Loading Markets</h3>
            <p className="text-muted-foreground text-center">
              Failed to load prediction markets. Please try again later.
            </p>
          </div>
        ) : filteredMarkets.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <TrendingUp className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Markets Found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm 
                ? `No markets match your search for "${searchTerm}"`
                : 'No markets available in this category.'
              }
            </p>
          </div>
        ) : (
          filteredMarkets.map((market) => (
            <PredictionCard key={market.id} market={market} />
          ))
        )}
      </div>

      {/* Load More (for future pagination) */}
      {filteredMarkets.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing all available markets. More markets coming soon!
          </p>
        </div>
      )}
      </main>
    </div>
  );
}