import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { TokenData, APIResponse, PredictionMarket, PredictionCategory } from "../client/src/types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Odin API endpoints
  app.get("/api/odin/tokens", async (req, res) => {
    try {
      const odinTokens: TokenData[] = [
        {
          id: "odin-1",
          name: "OdinCoin",
          symbol: "ODIN",
          contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
          price: "0.00042",
          marketCap: "125.4K",
          volume24h: "8.2K",
          change5m: "+2.1%",
          change1h: "+5.8%",
          change6h: "+12.3%",
          change24h: "+18.7%",
          holders: 342,
          liquidity: "45.6K",
          age: "2 days ago",
          isBundled: false,
          isVerified: true,
          category: "newly_created",
          avatar: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop"
        },
        {
          id: "odin-2",
          name: "ValhallaToken",
          symbol: "VHAL",
          contractAddress: "0x2345678901bcdef12345678901bcdef123456789",
          price: "0.00138",
          marketCap: "89.7K",
          volume24h: "12.1K",
          change5m: "-1.2%",
          change1h: "+3.4%",
          change6h: "+8.9%",
          change24h: "+15.2%",
          holders: 198,
          liquidity: "32.8K",
          age: "1 day ago",
          isBundled: false,
          isVerified: false,
          category: "about_to_graduate",
          avatar: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop"
        },
        {
          id: "odin-3",
          name: "RagnarokCoin",
          symbol: "RAGN",
          contractAddress: "0x3456789012cdef123456789012cdef1234567890",
          price: "0.00567",
          marketCap: "234.5K",
          volume24h: "19.8K",
          change5m: "+0.8%",
          change1h: "+2.1%",
          change6h: "-3.2%",
          change24h: "+9.4%",
          holders: 567,
          liquidity: "78.9K",
          age: "5 days ago",
          isBundled: true,
          isVerified: true,
          category: "graduated",
          avatar: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=64&h=64&fit=crop"
        },
        {
          id: "odin-4",
          name: "ThorToken",
          symbol: "THOR",
          contractAddress: "0x456789013def123456789013def12345678901a",
          price: "0.00089",
          marketCap: "156.8K",
          volume24h: "7.3K",
          change5m: "+1.5%",
          change1h: "-0.8%",
          change6h: "+4.6%",
          change24h: "+22.1%",
          holders: 423,
          liquidity: "51.2K",
          age: "3 days ago",
          isBundled: false,
          isVerified: true,
          category: "newly_created",
          avatar: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=64&h=64&fit=crop"
        },
        {
          id: "odin-5",
          name: "AsgardCoin",
          symbol: "ASGD",
          contractAddress: "0x56789014ef123456789014ef123456789014ef1",
          price: "0.00234",
          marketCap: "98.3K",
          volume24h: "5.7K",
          change5m: "-0.3%",
          change1h: "+1.2%",
          change6h: "+7.8%",
          change24h: "+11.5%",
          holders: 289,
          liquidity: "28.4K",
          age: "6 hours ago",
          isBundled: false,
          isVerified: false,
          category: "newly_created",
          avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop"
        }
      ];

      const response: APIResponse<TokenData[]> = {
        success: true,
        data: odinTokens
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<TokenData[]> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch Odin tokens"
      };
      res.status(500).json(errorResponse);
    }
  });

  // AstroApe API endpoints
  app.get("/api/astroape/tokens", async (req, res) => {
    try {
      const astroapeTokens: TokenData[] = [
        {
          id: "astro-1",
          name: "GalaxyCoin",
          symbol: "GLXY",
          contractAddress: "0x6789015f123456789015f123456789015f12345",
          price: "0.00156",
          marketCap: "287.9K",
          volume24h: "34.2K",
          change5m: "+3.7%",
          change1h: "+8.9%",
          change6h: "+15.6%",
          change24h: "+28.3%",
          holders: 678,
          liquidity: "89.7K",
          age: "12 hours ago",
          isBundled: false,
          isVerified: true,
          category: "about_to_graduate",
          avatar: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=64&h=64&fit=crop"
        },
        {
          id: "astro-2",
          name: "NebulaToken",
          symbol: "NEBU",
          contractAddress: "0x789016123456789016123456789016123456789",
          price: "0.00078",
          marketCap: "145.7K",
          volume24h: "18.9K",
          change5m: "+1.9%",
          change1h: "+4.3%",
          change6h: "-2.1%",
          change24h: "+13.8%",
          holders: 394,
          liquidity: "42.3K",
          age: "1 day ago",
          isBundled: true,
          isVerified: false,
          category: "newly_created",
          avatar: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=64&h=64&fit=crop"
        },
        {
          id: "astro-3",
          name: "StardustCoin",
          symbol: "STAR",
          contractAddress: "0x89017123456789017123456789017123456789a",
          price: "0.00345",
          marketCap: "456.2K",
          volume24h: "67.8K",
          change5m: "+0.5%",
          change1h: "+2.8%",
          change6h: "+9.7%",
          change24h: "+19.4%",
          holders: 892,
          liquidity: "134.5K",
          age: "4 days ago",
          isBundled: false,
          isVerified: true,
          category: "graduated",
          avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=64&h=64&fit=crop"
        },
        {
          id: "astro-4",
          name: "CosmicToken",
          symbol: "COSM",
          contractAddress: "0x9018123456789018123456789018123456789ab",
          price: "0.00067",
          marketCap: "112.6K",
          volume24h: "9.4K",
          change5m: "-1.1%",
          change1h: "+0.9%",
          change6h: "+5.2%",
          change24h: "+16.7%",
          holders: 256,
          liquidity: "38.9K",
          age: "8 hours ago",
          isBundled: false,
          isVerified: false,
          category: "newly_created",
          avatar: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=64&h=64&fit=crop"
        },
        {
          id: "astro-5",
          name: "OrionCoin",
          symbol: "ORION",
          contractAddress: "0x019123456789019123456789019123456789abc",
          price: "0.00189",
          marketCap: "203.4K",
          volume24h: "25.7K",
          change5m: "+2.3%",
          change1h: "+6.1%",
          change6h: "+11.8%",
          change24h: "+24.9%",
          holders: 534,
          liquidity: "67.8K",
          age: "2 days ago",
          isBundled: false,
          isVerified: true,
          category: "about_to_graduate",
          avatar: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=64&h=64&fit=crop"
        }
      ];

      const response: APIResponse<TokenData[]> = {
        success: true,
        data: astroapeTokens
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<TokenData[]> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch AstroApe tokens"
      };
      res.status(500).json(errorResponse);
    }
  });

  // Tyche API endpoints
  app.get("/api/tyche/tokens", async (req, res) => {
    try {
      const tycheTokens: TokenData[] = [
        {
          id: "tyche-1",
          name: "Tyche Token",
          symbol: "TYCHE",
          contractAddress: "0x1a123456789a123456789a123456789a123456789",
          price: "0.00892",
          marketCap: "892.0K",
          volume24h: "214.0K",
          change5m: "+12.3%",
          change1h: "+18.7%",
          change6h: "+25.1%",
          change24h: "+31.4%",
          holders: 456,
          liquidity: "134.5K",
          age: "2 days ago",
          isBundled: false,
          isVerified: true,
          category: "graduated",
          avatar: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop"
        },
        {
          id: "tyche-2",
          name: "LuckToken",
          symbol: "LUCK",
          contractAddress: "0x2b123456789b123456789b123456789b123456789",
          price: "0.00123",
          marketCap: "189.7K",
          volume24h: "23.1K",
          change5m: "+1.8%",
          change1h: "+3.5%",
          change6h: "-1.7%",
          change24h: "+12.9%",
          holders: 467,
          liquidity: "56.4K",
          age: "18 hours ago",
          isBundled: true,
          isVerified: false,
          category: "about_to_graduate",
          avatar: "https://images.unsplash.com/photo-1578662996442-44f60036fc0c?w=64&h=64&fit=crop"
        },
        {
          id: "tyche-3",
          name: "DestinyCoin",
          symbol: "DEST",
          contractAddress: "0x3c123456789c123456789c123456789c123456789",
          price: "0.00456",
          marketCap: "567.3K",
          volume24h: "89.2K",
          change5m: "+0.9%",
          change1h: "+4.2%",
          change6h: "+13.6%",
          change24h: "+26.8%",
          holders: 1234,
          liquidity: "178.9K",
          age: "6 days ago",
          isBundled: false,
          isVerified: true,
          category: "graduated",
          avatar: "https://images.unsplash.com/photo-1535191042502-e6a9a2cd1e86?w=64&h=64&fit=crop"
        },
        {
          id: "tyche-4",
          name: "ChanceToken",
          symbol: "CHAN",
          contractAddress: "0x4d123456789d123456789d123456789d123456789",
          price: "0.00034",
          marketCap: "78.9K",
          volume24h: "6.7K",
          change5m: "-0.7%",
          change1h: "+1.4%",
          change6h: "+6.3%",
          change24h: "+8.7%",
          holders: 189,
          liquidity: "23.4K",
          age: "4 hours ago",
          isBundled: false,
          isVerified: false,
          category: "newly_created",
          avatar: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=64&h=64&fit=crop"
        },
        {
          id: "tyche-5",
          name: "SerendipityCoin",
          symbol: "SEREN",
          contractAddress: "0x5e123456789e123456789e123456789e123456789",
          price: "0.00198",
          marketCap: "245.1K",
          volume24h: "31.8K",
          change5m: "+2.7%",
          change1h: "+7.3%",
          change6h: "+14.9%",
          change24h: "+21.4%",
          holders: 612,
          liquidity: "73.2K",
          age: "1 day ago",
          isBundled: false,
          isVerified: true,
          category: "about_to_graduate",
          avatar: "https://images.unsplash.com/photo-1516339901926-36d01238458a?w=64&h=64&fit=crop"
        }
      ];

      const response: APIResponse<TokenData[]> = {
        success: true,
        data: tycheTokens
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<TokenData[]> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch Tyche tokens"
      };
      res.status(500).json(errorResponse);
    }
  });

  // KongSwap API
  app.get('/api/kongswap/tokens', (req, res) => {
    const mockTokens: TokenData[] = [
      {
        id: 'kongswap-1',
        name: 'Kong Token',
        symbol: 'KONG',
        contractAddress: '0x1b123456789b123456789b123456789b123456789',
        price: '0.01234',
        marketCap: '1234.0K',
        volume24h: '345.0K',
        change5m: '+8.9%',
        change1h: '+14.2%',
        change6h: '+19.8%',
        change24h: '+27.3%',
        holders: 789,
        liquidity: '456.7K',
        age: '1 day ago',
        isBundled: false,
        isVerified: true,
        category: 'graduated',
        avatar: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop"
      }
    ];

    res.json({
      success: true,
      data: mockTokens
    });
  });

  // Token details endpoint
  app.get("/api/token/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // In production, fetch token details from appropriate API based on token source
      const response: APIResponse<TokenData> = {
        success: false,
        error: "Token not found"
      };

      res.status(404).json(response);
    } catch (error) {
      const errorResponse: APIResponse<TokenData> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch token details"
      };
      res.status(500).json(errorResponse);
    }
  });

  // Wallet management endpoints
  app.post("/api/wallets", async (req, res) => {
    try {
      // Validate wallet address and add to tracking
      const { address, name } = req.body;

      if (!address) {
        return res.status(400).json({
          success: false,
          error: "Wallet address is required"
        });
      }

      // In production, validate address format and add to database
      const response = {
        success: true,
        data: {
          id: Date.now().toString(),
          address,
          name: name || `Wallet ${address.slice(0, 8)}...`,
          isTracked: true
        }
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to add wallet"
      });
    }
  });

  app.get("/api/wallets", async (req, res) => {
    try {
      // Return user's tracked wallets
      const response = {
        success: true,
        data: []
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch wallets"
      });
    }
  });

  // Wallet balance endpoints
  app.get("/api/wallet/balances", async (req, res) => {
    try {
      // In production, this would fetch real wallet balances
      const response = {
        success: true,
        data: [
          {
            network: 'bitcoin',
            token: 'BTC',
            balance: '0.00000000',
            usdValue: '0.00',
            address: 'bc1qn559veuv6khmhyx45kpuz3e427srngtmpnk5zl'
          },
          {
            network: 'internet-computer',
            token: 'ckBTC',
            balance: '0.00000000',
            usdValue: '0.00',
            address: 'rdmx6-jaaaa-aaaah-qcaiq-cai'
          }
        ]
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch wallet balances"
      });
    }
  });

  app.get("/api/wallet/fees", async (req, res) => {
    try {
      // In production, this would fetch real network fees
      const response = {
        success: true,
        data: [
          {
            network: 'bitcoin',
            fee: '0.00000703',
            feeToken: 'BTC'
          },
          {
            network: 'internet-computer',
            fee: '0.00000100',
            feeToken: 'ckBTC'
          }
        ]
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch transaction fees"
      });
    }
  });

  app.post("/api/wallet/deposit", async (req, res) => {
    try {
      const { network, token } = req.body;

      // In production, this would generate a real deposit address
      let address;
      if (network === 'bitcoin') {
        address = 'bc1qn559veuv6khmhyx45kpuz3e427srngtmpnk5zl';
      } else {
        address = 'rdmx6-jaaaa-aaaah-qcaiq-cai';
      }

      const response = {
        success: true,
        data: { address }
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to create deposit address"
      });
    }
  });

  app.post("/api/wallet/withdraw", async (req, res) => {
    try {
      const { network, token, amount, destinationAddress } = req.body;

      // In production, this would initiate a real withdrawal
      const transactionId = 'tx_' + Date.now().toString();

      const response = {
        success: true,
        data: { transactionId }
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to initiate withdrawal"
      });
    }
  });

  // Prediction Markets API endpoints
  app.get("/api/prediction-markets", async (req, res) => {
    try {
      const sampleMarkets: PredictionMarket[] = [
        {
          id: '1',
          title: 'Will Bitcoin reach ATH before year ends?',
          description: 'This market will resolve to "Yes" if Bitcoin (BTC) reaches a new all-time high (above $69,000) before December 31st, 2025. Resolution will be based on CoinGecko or CoinMarketCap data.',
          image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
          category: 'crypto',
          endDate: new Date('2025-12-31'),
          totalVolume: '1.2M',
          totalVolumeUSD: '$1.2M',
          totalVolumeSats: '1.8M sats',
          participants: 1247,
          options: [
            { id: '1a', label: 'Yes', odds: 1.85, percentage: 54, volume: '$648K', color: '#10b981' },
            { id: '1b', label: 'No', odds: 2.2, percentage: 46, volume: '$552K', color: '#ef4444' }
          ],
          isActive: true,
          creator: 'crypto_oracle',
          featured: true,
          tags: ['Bitcoin', 'BTC', 'ATH'],
          marketType: 'binary',
          resolutionLink: 'https://coingecko.com/en/coins/bitcoin'
        },
        {
          id: '2',
          title: '2025 US Open Winner (Men\'s Singles)',
          description: 'Which player will win the 2025 US Open Men\'s Singles Championship? The market will resolve to the winner of the final match.',
          image: '/attached_assets/4efa8902-d287-4d3b-8bc0-9c8d8122160f_1757244824549.png',
          category: 'sports',
          endDate: new Date('2025-09-15'),
          totalVolume: '950K',
          totalVolumeUSD: '$950K',
          totalVolumeSats: '1.4M sats',
          participants: 892,
          options: [
            { id: '2a', label: 'Novak Djokovic', odds: 3.2, percentage: 31, volume: '$295K', color: '#10b981' },
            { id: '2b', label: 'Carlos Alcaraz', odds: 3.8, percentage: 26, volume: '$247K', color: '#ef4444' },
            { id: '2c', label: 'Jannik Sinner', odds: 4.5, percentage: 22, volume: '$209K', color: '#f59e0b' },
            { id: '2d', label: 'Daniil Medvedev', odds: 6.0, percentage: 17, volume: '$162K', color: '#8b5cf6' },
            { id: '2e', label: 'Other Player', odds: 12.5, percentage: 8, volume: '$76K', color: '#6b7280' }
          ],
          isActive: true,
          creator: 'tennis_expert',
          featured: false,
          tags: ['Tennis', 'US Open', 'ATP'],
          marketType: 'multiple_choice',
          resolutionLink: 'https://usopen.org/en_US/scores/schedule/index.html'
        },
        {
          id: '3',
          title: 'Will Trump win 2024 Presidential Election AND serve full term?',
          description: 'This compound prediction resolves to "Yes" only if both conditions are met: Trump wins the 2024 election AND serves the full presidential term without resignation or removal.',
          image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
          category: 'politics',
          endDate: new Date('2029-01-20'),
          totalVolume: '680K',
          totalVolumeUSD: '$680K',
          totalVolumeSats: '1.02M sats',
          participants: 634,
          options: [
            { id: '3a', label: 'Election Win', odds: 2.1, percentage: 48, volume: '$326K', color: '#10b981' },
            { id: '3b', label: 'Full Term Service', odds: 3.2, percentage: 31, volume: '$211K', color: '#f59e0b' },
            { id: '3c', label: 'Both Conditions', odds: 4.5, percentage: 22, volume: '$150K', color: '#8b5cf6' }
          ],
          isActive: true,
          creator: 'political_analyst',
          featured: false,
          tags: ['Politics', 'US Election', 'Presidential'],
          marketType: 'compound',
          resolutionLink: 'https://ballotpedia.org/Presidential_election,_2024'
        },
        {
          id: '4',
          title: 'Next Company to Reach $4T Market Cap',
          description: 'Which publicly traded company will be the first to reach a $4 trillion market capitalization after Apple and Microsoft?',
          image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
          category: 'economy',
          endDate: new Date('2026-12-31'),
          totalVolume: '420K',
          totalVolumeUSD: '$420K',
          totalVolumeSats: '630K sats',
          participants: 387,
          options: [
            { id: '4a', label: 'Google (Alphabet)', odds: 3.5, percentage: 29, volume: '$122K', color: '#10b981' },
            { id: '4b', label: 'Amazon', odds: 4.2, percentage: 24, volume: '$101K', color: '#ef4444' },
            { id: '4c', label: 'Tesla', odds: 5.8, percentage: 17, volume: '$71K', color: '#f59e0b' },
            { id: '4d', label: 'Meta', odds: 7.1, percentage: 14, volume: '$59K', color: '#8b5cf6' },
            { id: '4e', label: 'NVIDIA', odds: 6.2, percentage: 16, volume: '$67K', color: '#06b6d4' }
          ],
          isActive: true,
          creator: 'market_watcher',
          featured: false,
          tags: ['Stocks', 'Market Cap', 'Tech'],
          marketType: 'multiple_choice',
          resolutionLink: 'https://companiesmarketcap.com'
        }
      ];

      const response: APIResponse<PredictionMarket[]> = {
        success: true,
        data: sampleMarkets
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<PredictionMarket[]> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch prediction markets"
      };
      res.status(500).json(errorResponse);
    }
  });

  app.get("/api/prediction-categories", async (req, res) => {
    try {
      const sampleCategories: PredictionCategory[] = [
        { id: 'sports', name: 'Sports', icon: '⚽', count: 15, color: '#10b981' },
        { id: 'politics', name: 'Politics', icon: '🏛️', count: 8, color: '#3b82f6' },
        { id: 'crypto', name: 'Crypto', icon: '₿', count: 12, color: '#f59e0b' },
        { id: 'tech', name: 'Technology', icon: '💻', count: 6, color: '#8b5cf6' },
        { id: 'entertainment', name: 'Entertainment', icon: '🎬', count: 9, color: '#ef4444' },
        { id: 'economy', name: 'Economy', icon: '📈', count: 4, color: '#06b6d4' },
      ];

      const response: APIResponse<PredictionCategory[]> = {
        success: true,
        data: sampleCategories
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<PredictionCategory[]> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch prediction categories"
      };
      res.status(500).json(errorResponse);
    }
  });

  app.get("/api/prediction-market/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // In production, fetch from database
      // For demo, return the market that matches the ID, or default to market 1
      const markets = [
        {
          id: '1',
          title: 'Will Bitcoin reach ATH before year ends?',
          description: 'This market will resolve to "Yes" if Bitcoin (BTC) reaches a new all-time high (above $69,000) before December 31st, 2025. Resolution will be based on CoinGecko or CoinMarketCap data.',
          image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
          category: 'crypto',
          endDate: new Date('2025-12-31'),
          totalVolume: '1.2M',
          totalVolumeUSD: '$1.2M',
          totalVolumeSats: '1.8M sats',
          participants: 1247,
          options: [
            { id: '1a', label: 'Yes', odds: 1.85, percentage: 54, volume: '$648K', color: '#10b981' },
            { id: '1b', label: 'No', odds: 2.2, percentage: 46, volume: '$552K', color: '#ef4444' }
          ],
          isActive: true,
          creator: 'crypto_oracle',
          featured: true,
          tags: ['Bitcoin', 'BTC', 'ATH'],
          marketType: 'binary' as const,
          resolutionLink: 'https://coingecko.com/en/coins/bitcoin'
        },
        {
          id: '2',
          title: '2025 US Open Winner (Men\'s Singles)',
          description: 'Which player will win the 2025 US Open Men\'s Singles Championship? The market will resolve to the winner of the final match.',
          image: '/attached_assets/4efa8902-d287-4d3b-8bc0-9c8d8122160f_1757244824549.png',
          category: 'sports',
          endDate: new Date('2025-09-15'),
          totalVolume: '950K',
          totalVolumeUSD: '$950K',
          totalVolumeSats: '1.4M sats',
          participants: 892,
          options: [
            { id: '2a', label: 'Novak Djokovic', odds: 3.2, percentage: 31, volume: '$295K', color: '#10b981' },
            { id: '2b', label: 'Carlos Alcaraz', odds: 3.8, percentage: 26, volume: '$247K', color: '#ef4444' },
            { id: '2c', label: 'Jannik Sinner', odds: 4.5, percentage: 22, volume: '$209K', color: '#f59e0b' },
            { id: '2d', label: 'Daniil Medvedev', odds: 6.0, percentage: 17, volume: '$162K', color: '#8b5cf6' },
            { id: '2e', label: 'Other Player', odds: 12.5, percentage: 8, volume: '$76K', color: '#6b7280' }
          ],
          isActive: true,
          creator: 'tennis_expert',
          featured: false,
          tags: ['Tennis', 'US Open', 'ATP'],
          marketType: 'multiple_choice' as const,
          resolutionLink: 'https://usopen.org/en_US/scores/schedule/index.html'
        },
        {
          id: '3',
          title: 'Will Trump win 2024 Presidential Election AND serve full term?',
          description: 'This compound prediction resolves to "Yes" only if both conditions are met: Trump wins the 2024 election AND serves the full presidential term without resignation or removal.',
          image: '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
          category: 'politics',
          endDate: new Date('2029-01-20'),
          totalVolume: '680K',
          totalVolumeUSD: '$680K',
          totalVolumeSats: '1.02M sats',
          participants: 634,
          options: [
            { id: '3a', label: 'Election Win', odds: 2.1, percentage: 48, volume: '$326K', color: '#10b981' },
            { id: '3b', label: 'Full Term Service', odds: 3.2, percentage: 31, volume: '$211K', color: '#f59e0b' },
            { id: '3c', label: 'Both Conditions', odds: 4.5, percentage: 22, volume: '$150K', color: '#8b5cf6' }
          ],
          isActive: true,
          creator: 'political_analyst',
          featured: false,
          tags: ['Politics', 'US Election', 'Presidential'],
          marketType: 'compound' as const,
          resolutionLink: 'https://ballotpedia.org/Presidential_election,_2024'
        }
      ];

      const sampleMarket = markets.find(market => market.id === id) || markets[0];

      const response: APIResponse<PredictionMarket> = {
        success: true,
        data: sampleMarket
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<PredictionMarket> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch prediction market"
      };
      res.status(500).json(errorResponse);
    }
  });

  // Create prediction market endpoint
  app.post("/api/prediction-markets", async (req, res) => {
    try {
      const { title, description, category, endDate, resolutionLink, marketType, options, tags, image, creator } = req.body;

      // Validate required fields
      if (!title || !description || !category || !endDate || !resolutionLink || !marketType || !options || !creator) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields"
        });
      }

      // Validate market type
      if (!['binary', 'multiple_choice', 'compound'].includes(marketType)) {
        return res.status(400).json({
          success: false,
          error: "Market type must be 'binary', 'multiple_choice', or 'compound'"
        });
      }

      // Validate options based on market type
      if (marketType === 'binary' && options.length !== 2) {
        return res.status(400).json({
          success: false,
          error: "Binary markets must have exactly 2 options (Yes/No)"
        });
      }

      if (marketType === 'multiple_choice' && options.length < 2) {
        return res.status(400).json({
          success: false,
          error: "Multiple choice markets must have at least 2 options"
        });
      }

      if (marketType === 'compound' && options.length < 2) {
        return res.status(400).json({
          success: false,
          error: "Compound markets must have at least 2 options"
        });
      }

      // In production, this would save to database
      const newMarket: PredictionMarket = {
        id: Date.now().toString(),
        title,
        description,
        image: image || '/attached_assets/986993f7-098f-4f15-9e67-4b122dcb6357_1757244824568.png',
        category,
        endDate: new Date(endDate),
        totalVolume: '0',
        totalVolumeUSD: '$0',
        totalVolumeSats: '0 sats',
        participants: 0,
        options: options.map((option: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          label: option.label,
          odds: option.odds || (marketType === 'binary' ? 2.0 : (100 / options.length) * 0.02),
          percentage: marketType === 'binary' ? 50 : Math.floor(100 / options.length),
          volume: '$0',
          color: marketType === 'binary' ? (index === 0 ? '#10b981' : '#ef4444') : 
                 [`#10b981`, `#ef4444`, `#f59e0b`, `#8b5cf6`, `#06b6d4`, `#ec4899`][index % 6]
        })),
        isActive: true,
        creator,
        featured: false,
        tags: tags || [],
        marketType,
        resolutionLink
      };

      const response: APIResponse<PredictionMarket> = {
        success: true,
        data: newMarket
      };

      res.json(response);
    } catch (error) {
      const errorResponse: APIResponse<PredictionMarket> = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create prediction market"
      };
      res.status(500).json(errorResponse);
    }
  });

  // Swap API endpoints
  app.post("/api/swap/quote", async (req, res) => {
    try {
      const { fromToken, toToken, amount, slippage } = req.body;
      
      if (!fromToken || !toToken || !amount) {
        return res.status(400).json({
          success: false,
          error: "Missing required parameters"
        });
      }

      // Simulate bonding curve pricing for Odin tokens
      const baseRate = fromToken === 'BTC' ? 21000000 : 0.0000476; // Approximate BTC to token rate
      const inputAmount = parseFloat(amount);
      
      // Calculate price impact based on trade size
      const priceImpact = Math.min(inputAmount * 0.001, 0.05); // Max 5% impact
      const adjustedRate = baseRate * (1 - priceImpact);
      
      const outputAmount = fromToken === 'BTC' 
        ? (inputAmount * adjustedRate).toFixed(0) 
        : (inputAmount / adjustedRate).toFixed(8);
      
      const fee = inputAmount * 0.005; // 0.5% fee
      
      const quote = {
        inputAmount: amount,
        outputAmount,
        rate: adjustedRate,
        priceImpact: priceImpact * 100,
        fee,
        estimatedGas: 0.00001,
        slippage: slippage || 0.5
      };

      res.json({
        success: true,
        data: quote
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get swap quote"
      });
    }
  });

  app.post("/api/swap/execute", async (req, res) => {
    try {
      const { fromToken, toToken, fromAmount, toAmount, slippage } = req.body;
      
      if (!fromToken || !toToken || !fromAmount || !toAmount) {
        return res.status(400).json({
          success: false,
          error: "Missing required parameters"
        });
      }

      // Simulate transaction execution
      const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // In production, this would:
      // 1. Validate wallet balances
      // 2. Execute the swap on-chain
      // 3. Update user balances
      // 4. Return transaction hash
      
      const swapTransaction = {
        transactionId,
        status: 'pending' as const,
        inputToken: fromToken,
        outputToken: toToken,
        inputAmount: fromAmount,
        outputAmount: toAmount,
        timestamp: Date.now()
      };

      // Simulate confirmation after 3 seconds
      setTimeout(() => {
        console.log(`Transaction ${transactionId} confirmed`);
      }, 3000);

      res.json({
        success: true,
        data: swapTransaction
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to execute swap"
      });
    }
  });

  app.get("/api/swap/history", async (req, res) => {
    try {
      // Mock swap history
      const history = [
        {
          transactionId: "tx_1705123456_abc123",
          status: "confirmed",
          inputToken: "BTC",
          outputToken: "ODIN",
          inputAmount: "0.00100000",
          outputAmount: "21000",
          timestamp: Date.now() - 3600000
        },
        {
          transactionId: "tx_1705123400_def456",
          status: "confirmed",
          inputToken: "ODIN",
          outputToken: "BTC",
          inputAmount: "10500",
          outputAmount: "0.00050000",
          timestamp: Date.now() - 7200000
        }
      ];

      res.json({
        success: true,
        data: history
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch swap history"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}