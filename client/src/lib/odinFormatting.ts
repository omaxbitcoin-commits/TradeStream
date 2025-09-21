// Odin.fun specific formatting utilities to match explorer data exactly

// Bitcoin formatting - matches explorer format like "0.00012 BTC"
export function formatBTC(amount: number): string {
  if (amount === 0) return "0 BTC";
  
  // For very small amounts, show 8 decimal places
  if (amount < 0.001) {
    return `${amount.toFixed(8)} BTC`;
  }
  
  // For larger amounts, show appropriate precision
  if (amount >= 1000) {
    return `${amount.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })} BTC`;
  }
  
  if (amount >= 1) {
    return `${amount.toFixed(2)} BTC`;
  }
  
  return `${amount.toFixed(5)} BTC`;
}

// Sats formatting - matches explorer format like "1K sats"
export function formatSats(btcAmount: number): string {
  const sats = Math.round(btcAmount * 100000000); // Convert BTC to sats
  
  if (sats === 0) return "0 sats";
  
  if (sats >= 1000000) {
    return `${(sats / 1000000).toFixed(1)}M sats`;
  }
  
  if (sats >= 1000) {
    return `${(sats / 1000).toFixed(0)}K sats`;
  }
  
  return `${sats} sats`;
}

// Token amount formatting - matches explorer format like "6.65K", "257.95K"
export function formatTokenAmount(amount: number): string {
  if (amount === 0) return "0";
  
  if (amount >= 1e9) {
    return `${(amount / 1e9).toFixed(2)}B`;
  }
  
  if (amount >= 1e6) {
    return `${(amount / 1e6).toFixed(2)}M`;
  }
  
  if (amount >= 1e3) {
    // Always keep 2 decimal places for K/M/B to match explorer exactly
    return `${(amount / 1e3).toFixed(2)}K`;
  }
  
  // For smaller amounts, show with appropriate precision
  if (amount >= 100) {
    return amount.toFixed(0);
  }
  
  if (amount >= 1) {
    return amount.toFixed(2);
  }
  
  return amount.toFixed(6);
}

// Price formatting for BTC pairs - matches explorer precision
export function formatBTCPrice(price: number): string {
  if (price === 0) return "0 BTC";
  
  // Very small prices get more decimal places
  if (price < 0.000001) {
    return `${price.toFixed(8)} BTC`;
  }
  
  if (price < 0.001) {
    return `${price.toFixed(6)} BTC`;
  }
  
  if (price < 1) {
    return `${price.toFixed(5)} BTC`;
  }
  
  return `${price.toFixed(4)} BTC`;
}

// Volume formatting - matches explorer format like "33.59 BTC(24hr)"
export function formatVolume(volume: number, timeframe?: string): string {
  const btcText = formatBTC(volume).replace(" BTC", "");
  const suffix = timeframe ? `(${timeframe})` : "";
  return `${btcText} BTC${suffix}`;
}

// Market cap formatting in BTC
export function formatMarketCapBTC(marketCap: number): string {
  return formatBTC(marketCap);
}

// Progress formatting for bonding curve (as percentage)
export function formatProgress(progress: number): string {
  return `${Math.min(progress * 100, 100).toFixed(1)}%`;
}

// Holders count formatting
export function formatHolders(count: number): string {
  if (count >= 1e6) {
    return `${(count / 1e6).toFixed(1)}M`;
  }
  
  if (count >= 1e3) {
    return `${(count / 1e3).toFixed(1)}K`;
  }
  
  return count.toString();
}

// Time ago formatting - matches explorer compact format (3m ago, 2h ago, 1d ago)
export function formatTimeAgo(timestamp: string | number): string {
  const now = Date.now();
  const time = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
  const diffMs = now - time;
  
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;
  if (diffSeconds > 30) return `${diffSeconds}s ago`;
  return "just now";
}

// Price change formatting with proper +/- signs
export function formatPriceChange(current: number, previous: number): string {
  if (previous === 0) return "+0.00%";
  
  const percentage = ((current - previous) / previous) * 100;
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
}

// Transaction ID formatting for display
export function formatTxId(txId: string): string {
  if (txId.length <= 10) return txId;
  return `${txId.slice(0, 4)}...${txId.slice(-4)}`;
}

// User ID formatting for display (matches explorer user format)
export function formatUserId(userId: string): string {
  if (userId.length <= 10) return userId;
  // Match explorer format like "tca5...ae"  
  return `${userId.slice(0, 4)}...${userId.slice(-2)}`;
}

// USD/Fiat formatting for fiat values - matches explorer $ format
export function formatUSD(value: number): string {
  if (value === 0) return "$0.00";
  
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  
  return `$${value.toFixed(2)}`;
}

// Determine whether to show BTC or sats based on amount
export function formatBTCOrSats(amount: number): string {
  // If amount is very small, show in sats
  if (amount < 0.001) {
    return formatSats(amount);
  }
  return formatBTC(amount);
}