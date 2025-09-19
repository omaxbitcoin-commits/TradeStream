import React, { useState } from 'react';
import { useOdinTokenPowerHolders, type OdinPowerHolderData } from '@/hooks/useOdinAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Crown, User, DollarSign, TrendingUp } from 'lucide-react';

interface TokenPowerHoldersProps {
  tokenId: string;
}

function formatBalance(balance: number): string {
  if (balance >= 1e9) return `${(balance / 1e9).toFixed(2)}B`;
  if (balance >= 1e6) return `${(balance / 1e6).toFixed(2)}M`;
  if (balance >= 1e3) return `${(balance / 1e3).toFixed(2)}K`;
  return balance.toFixed(2);
}

function formatFiatValue(value: number): string {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

export function TokenPowerHolders({ tokenId }: TokenPowerHoldersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'balance' | 'fiat_value'>('balance');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const { powerHolders, totalCount, isLoading, error } = useOdinTokenPowerHolders(tokenId, currentPage, 20);

  const handleSort = (field: 'balance' | 'fiat_value') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedHolders = [...powerHolders].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortField) {
      case 'balance':
        aValue = a.balance;
        bValue = b.balance;
        break;
      case 'fiat_value':
        aValue = a.fiat_value;
        bValue = b.fiat_value;
        break;
      default:
        return 0;
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Calculate total balance for percentage calculations
  const totalBalance = powerHolders.reduce((sum, holder) => sum + holder.balance, 0);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Power Holders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <span className="ml-2 text-muted-foreground">Loading power holders...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Power Holders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-destructive">Failed to load power holders data</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please try again later
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Power Holders
            <Badge variant="secondary" className="ml-2">
              {totalCount.toLocaleString()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleSort('balance')}
              className="flex items-center gap-1"
            >
              Balance
              {sortField === 'balance' && (
                <span className="text-xs">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleSort('fiat_value')}
              className="flex items-center gap-1"
            >
              <DollarSign className="w-4 h-4" />
              Value
              {sortField === 'fiat_value' && (
                <span className="text-xs">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {powerHolders.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Power Holders Found</h3>
              <p className="text-muted-foreground">
                No major token holders have been identified for this token yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Holder</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">% of Supply</TableHead>
                    <TableHead className="text-right">Fiat Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHolders.map((holder, index) => {
                    const percentage = totalBalance > 0 ? (holder.balance / totalBalance) * 100 : 0;
                    const isTopHolder = index < 3;
                    
                    return (
                      <TableRow key={holder.user} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {isTopHolder ? (
                              <Crown className="w-4 h-4 text-warning" />
                            ) : (
                              <span className="text-sm text-muted-foreground">#{index + 1}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {holder.user_image ? (
                              <img 
                                src={holder.user_image} 
                                alt={holder.user_username || "User"}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-sm">
                                {holder.user_username || `${holder.user.slice(0, 8)}...`}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {holder.user.slice(0, 6)}...{holder.user.slice(-4)}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-mono">
                            <div className="font-medium">
                              {formatBalance(holder.balance)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              tokens
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <div className="font-medium">
                              {percentage.toFixed(2)}%
                            </div>
                            {percentage > 5 && (
                              <TrendingUp className="w-3 h-3 text-warning" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium">
                          {formatFiatValue(holder.fiat_value)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalCount > 20 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalCount)} of {totalCount} holders
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    Page {currentPage} of {Math.ceil(totalCount / 20)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(Math.ceil(totalCount / 20), currentPage + 1))}
                    disabled={currentPage >= Math.ceil(totalCount / 20)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Top 10 Holdings</div>
                <div className="text-lg font-bold">
                  {sortedHolders.slice(0, 10).reduce((sum, holder) => sum + holder.balance, 0) > 0 ? 
                    `${((sortedHolders.slice(0, 10).reduce((sum, holder) => sum + holder.balance, 0) / totalBalance) * 100).toFixed(1)}%` : 
                    '0%'
                  }
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-lg font-bold">
                  {formatFiatValue(powerHolders.reduce((sum, holder) => sum + holder.fiat_value, 0))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}