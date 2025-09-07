import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PredictionCard } from '@/components/trading/PredictionCard';
import { CategoryTabs } from '@/components/prediction/CategoryTabs';
import { PredictionFilters } from '@/components/prediction/PredictionFilters';
import { PredictionMarket, PredictionCategory } from '@/types';
import { TrendingUp, Zap, Calendar, Users } from 'lucide-react';

// Sample data - this will be replaced with API calls
const sampleCategories: PredictionCategory[] = [
  { id: 'sports', name: 'Sports', icon: '⚽', count: 15, color: '#10b981' },
  { id: 'politics', name: 'Politics', icon: '🏛️', count: 8, color: '#3b82f6' },
  { id: 'crypto', name: 'Crypto', icon: '₿', count: 12, color: '#f59e0b' },
  { id: 'tech', name: 'Technology', icon: '💻', count: 6, color: '#8b5cf6' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', count: 9, color: '#ef4444' },
  { id: 'economy', name: 'Economy', icon: '📈', count: 4, color: '#06b6d4' },
];

const sampleMarkets: PredictionMarket[] = [
  {
    id: '1',
    title: '2025 US Open Winner (M)',
    description: 'Who will win the 2025 US Open Men\'s Singles Championship?',
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
      { id: '1c', label: 'Other', odds: 8.5, percentage: 13, volume: '$155K', color: '#6b7280' }
    ],
    isActive: true,
    creator: 'sportsbet_pro',
    featured: true,
    tags: ['Tennis', 'Grand Slam', 'ATP']
  },
  {
    id: '2',
    title: 'Bitcoin close price on Sep 30th',
    description: 'What will be the Bitcoin closing price on September 30th, 2025?',
    image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
    category: 'crypto',
    endDate: new Date('2025-09-30'),
    totalVolume: '950K',
    totalVolumeUSD: '$950K',
    totalVolumeSats: '1.4M sats',
    participants: 892,
    options: [
      { id: '2a', label: '$110,000 - $112,249', odds: 4.0, percentage: 25, volume: '$237K', color: '#10b981' },
      { id: '2b', label: '$112,250 - $112,500', odds: 4.3, percentage: 23, volume: '$218K', color: '#ef4444' },
      { id: '2c', label: '$112,500+', odds: 4.8, percentage: 21, volume: '$199K', color: '#f59e0b' },
      { id: '2d', label: 'Other Range', odds: 3.2, percentage: 31, volume: '$296K', color: '#6b7280' }
    ],
    isActive: true,
    creator: 'crypto_analyst',
    featured: false,
    tags: ['Bitcoin', 'Price Prediction', 'BTC']
  },
  {
    id: '3',
    title: 'BAL Ravens vs BUF Bills (Sep 7): Ravens win?',
    description: 'Will the Baltimore Ravens win against Buffalo Bills on September 7th?',
    image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
    category: 'sports',
    endDate: new Date('2025-09-07'),
    totalVolume: '680K',
    totalVolumeUSD: '$680K',
    totalVolumeSats: '1.02M sats',
    participants: 634,
    options: [
      { id: '3a', label: 'Yes', odds: 1.85, percentage: 53, volume: '$360K', color: '#10b981' },
      { id: '3b', label: 'No', odds: 2.1, percentage: 47, volume: '$320K', color: '#ef4444' }
    ],
    isActive: true,
    creator: 'nfl_predictor',
    featured: false,
    tags: ['NFL', 'Ravens', 'Bills']
  },
  {
    id: '4',
    title: 'Grey Cup Winner 2025',
    description: 'Which team will win the 2025 Grey Cup Championship?',
    image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
    category: 'sports',
    endDate: new Date('2025-11-23'),
    totalVolume: '420K',
    totalVolumeUSD: '$420K',
    totalVolumeSats: '630K sats',
    participants: 387,
    options: [
      { id: '4a', label: 'Calgary Stampeders', odds: 3.4, percentage: 29, volume: '$122K', color: '#dc2626' },
      { id: '4b', label: 'Saskatchewan Roughriders', odds: 4.1, percentage: 22, volume: '$92K', color: '#10b981' },
      { id: '4c', label: 'Montreal Alouettes', odds: 8.3, percentage: 12, volume: '$50K', color: '#3b82f6' },
      { id: '4d', label: 'Other Team', odds: 2.1, percentage: 37, volume: '$156K', color: '#6b7280' }
    ],
    isActive: true,
    creator: 'cfl_fan',
    featured: false,
    tags: ['CFL', 'Grey Cup', 'Canadian Football']
  }
];

export default function PredictionMarketsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // Filter markets based on category and search
  const filteredMarkets = sampleMarkets.filter(market => {
    const matchesCategory = activeCategory === 'all' || market.category === activeCategory;
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-testid="page-prediction-markets">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Prediction Markets
        </h1>
        <p className="text-muted-foreground">
          Bet on future events with real money. Create and trade on predictions about sports, politics, crypto, and more.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
          <div className="font-bold text-lg text-foreground">{sampleMarkets.filter(m => m.isActive).length}</div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Participants</span>
          </div>
          <div className="font-bold text-lg text-foreground">
            {sampleMarkets.reduce((sum, m) => sum + m.participants, 0).toLocaleString()}
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

      {/* Categories */}
      <div className="mb-6">
        <CategoryTabs
          categories={sampleCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
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
          {activeCategory !== 'all' && ` in ${sampleCategories.find(c => c.id === activeCategory)?.name}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.length === 0 ? (
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
  );
}