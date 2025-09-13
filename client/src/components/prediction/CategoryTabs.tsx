import React from 'react';
import { PredictionCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryTabsProps {
  categories: PredictionCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* Mobile: horizontal scroll */}
      <div className="block lg:hidden">
        <div className="overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('all')}
              className="flex items-center space-x-2 whitespace-nowrap"
              data-testid="category-all"
            >
              <span>All Markets</span>
              <Badge variant="secondary" className="text-xs">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </Badge>
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => onCategoryChange(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
                data-testid={`category-${category.id}`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ 
                    backgroundColor: category.color + '20',
                    color: category.color 
                  }}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Large screens: fit all categories with wrapping to prevent overflow */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap gap-1 xl:gap-2">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('all')}
            className="flex items-center space-x-1 lg:space-x-2 whitespace-nowrap lg:px-2 xl:px-3"
            data-testid="category-all"
          >
            <span className="lg:text-sm xl:text-base">All</span>
            <Badge variant="secondary" className="text-xs">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </Badge>
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => onCategoryChange(category.id)}
              className="flex items-center space-x-1 lg:space-x-2 whitespace-nowrap lg:px-2 xl:px-3"
              data-testid={`category-${category.id}`}
            >
              <span className="lg:text-sm xl:text-base">{category.icon}</span>
              <span className="lg:text-sm xl:text-base">{category.name}</span>
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: category.color + '20',
                  color: category.color 
                }}
              >
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}