import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowUpDown, Zap, AlertTriangle, Clock, DollarSign, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface SwapComponentProps {
  tokenSymbol?: string;
  tokenId?: string;
}

interface SwapQuote {
  inputAmount: string;
  outputAmount: string;
  rate: number;
  priceImpact: number;
  fee: number;
  estimatedGas: number;
  slippage: number;
}

interface SwapTransaction {
  transactionId: string;
  status: 'pending' | 'confirmed' | 'failed';
  inputToken: string;
  outputToken: string;
  inputAmount: string;
  outputAmount: string;
  timestamp: number;
}

export function SwapComponent({ tokenSymbol = 'ODIN', tokenId }: SwapComponentProps) {
  const { toast } = useToast();
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState(tokenSymbol);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isQuoting, setIsQuoting] = useState(false);

  // Available tokens for swapping
  const availableTokens = [
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.00000000' },
    { symbol: 'ckBTC', name: 'Chain Key Bitcoin', balance: '0.00000000' },
    { symbol: tokenSymbol, name: `${tokenSymbol} Token`, balance: '0.00000000' },
  ];

  // Get swap quote
  const getSwapQuote = async (from: string, to: string, amount: string): Promise<SwapQuote> => {
    const response = await apiRequest('POST', `/api/swap/quote`, {
      fromToken: from,
      toToken: to,
      amount: amount,
      slippage: slippage
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get quote');
    }
    
    return data.data;
  };

  // Execute swap transaction
  const executeSwap = useMutation({
    mutationFn: async (swapData: {
      fromToken: string;
      toToken: string;
      fromAmount: string;
      toAmount: string;
      slippage: number;
    }) => {
      const response = await apiRequest('POST', '/api/swap/execute', swapData);
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Swap failed');
      }
      
      return data.data;
    },
    onSuccess: (data: SwapTransaction) => {
      toast({
        title: "Swap Initiated",
        description: `Transaction ${data.transactionId} is pending confirmation`,
      });
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      
      // Invalidate balance queries
      queryClient.invalidateQueries({ queryKey: ['/api/wallet/balances'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Swap Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Calculate quote when amounts change
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0 && fromToken !== toToken) {
      setIsQuoting(true);
      
      // Debounce quote requests
      const timer = setTimeout(async () => {
        try {
          const quote = await getSwapQuote(fromToken, toToken, fromAmount);
          setToAmount(quote.outputAmount);
        } catch (error) {
          console.error('Quote error:', error);
          setToAmount('');
        } finally {
          setIsQuoting(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setToAmount('');
      setIsQuoting(false);
    }
  }, [fromAmount, fromToken, toToken, slippage]);

  const handleSwapDirection = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = () => {
    if (!fromAmount || !toAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }

    executeSwap.mutate({
      fromToken,
      toToken,
      fromAmount,
      toAmount,
      slippage
    });
  };

  const isSwapDisabled = !fromAmount || !toAmount || parseFloat(fromAmount) <= 0 || executeSwap.isPending || isQuoting;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Swap Tokens</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            data-testid="button-advanced-settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">From</label>
          <div className="flex space-x-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-32" data-testid="select-from-token">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1"
              data-testid="input-from-amount"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Balance: {availableTokens.find(t => t.symbol === fromToken)?.balance || '0.00000000'}
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapDirection}
            className="rounded-full p-2"
            data-testid="button-swap-direction"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">To</label>
          <div className="flex space-x-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-32" data-testid="select-to-token">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.0"
              value={isQuoting ? 'Loading...' : toAmount}
              readOnly
              className="flex-1 bg-muted"
              data-testid="input-to-amount"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Balance: {availableTokens.find(t => t.symbol === toToken)?.balance || '0.00000000'}
          </div>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Slippage Tolerance (%)</label>
              <div className="flex space-x-2">
                {[0.1, 0.5, 1.0].map((value) => (
                  <Button
                    key={value}
                    variant={slippage === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSlippage(value)}
                    data-testid={`button-slippage-${value}`}
                  >
                    {value}%
                  </Button>
                ))}
                <Input
                  type="number"
                  placeholder="Custom"
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                  className="w-20"
                  step="0.1"
                  min="0.1"
                  max="50"
                  data-testid="input-custom-slippage"
                />
              </div>
            </div>
          </div>
        )}

        {/* Swap Summary */}
        {fromAmount && toAmount && !isQuoting && (
          <div className="space-y-2 p-3 bg-muted rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className="text-orange-500">~0.02%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span>~{(parseFloat(fromAmount) * 0.005).toFixed(8)} {fromToken}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={isSwapDisabled}
          className="w-full py-3 font-bold text-lg"
          data-testid="button-execute-swap"
        >
          {executeSwap.isPending ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Swapping...</span>
            </div>
          ) : isQuoting ? (
            'Getting Quote...'
          ) : (
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Swap {fromToken} for {toToken}</span>
            </div>
          )}
        </Button>

        {/* Warning Message */}
        <div className="flex items-start space-x-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-orange-700 dark:text-orange-300">
            <p className="font-medium mb-1">Trading on bonding curve</p>
            <p>Prices follow a mathematical curve. Large trades may have significant price impact.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}