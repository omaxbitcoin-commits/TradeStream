import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Users, Activity, Coins, Trophy, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { TopHolder, MarketActivity, Position } from "@/types";

interface TopHoldersActivityProps {
  topHolders?: TopHolder[];
  recentActivity?: MarketActivity[];
  className?: string;
}

export function TopHoldersActivity({ topHolders = [], recentActivity = [], className }: TopHoldersActivityProps) {
  const defaultHolders: TopHolder[] = [
    {
      id: "1",
      userId: "user1",
      username: "CryptoWhale",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      totalPosition: "15,420",
      totalPositionUSD: "$15,420",
      winRate: 78.5,
      positions: [
        { id: "p1", optionId: "1a", optionLabel: "Yes", shares: "8,500", value: "$8,500", averagePrice: "$1.00" },
        { id: "p2", optionId: "1b", optionLabel: "No", shares: "6,920", value: "$6,920", averagePrice: "$1.00" }
      ]
    },
    {
      id: "2",
      userId: "user2",
      username: "SportsBetter",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      totalPosition: "12,750",
      totalPositionUSD: "$12,750",
      winRate: 65.2,
      positions: [
        { id: "p3", optionId: "1a", optionLabel: "Yes", shares: "12,750", value: "$12,750", averagePrice: "$1.00" }
      ]
    },
    {
      id: "3",
      userId: "user3",
      username: "PredictionPro",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      totalPosition: "9,280",
      totalPositionUSD: "$9,280",
      winRate: 82.1,
      positions: [
        { id: "p4", optionId: "1b", optionLabel: "No", shares: "9,280", value: "$9,280", averagePrice: "$1.00" }
      ]
    },
    {
      id: "4",
      userId: "user4",
      username: "MarketMaker",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      totalPosition: "7,650",
      totalPositionUSD: "$7,650",
      winRate: 71.3,
      positions: [
        { id: "p5", optionId: "1a", optionLabel: "Yes", shares: "4,200", value: "$4,200", averagePrice: "$1.00" },
        { id: "p6", optionId: "1b", optionLabel: "No", shares: "3,450", value: "$3,450", averagePrice: "$1.00" }
      ]
    }
  ];

  const defaultActivity: MarketActivity[] = [
    {
      id: "1",
      marketId: "1",
      userId: "user1",
      type: "bet",
      content: "Bought 2,500 shares of Yes",
      amount: "$2,500",
      optionId: "1a",
      timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: "2",
      marketId: "1",
      userId: "user2",
      type: "bet",
      content: "Bought 1,800 shares of No",
      amount: "$1,800",
      optionId: "1b",
      timestamp: new Date(Date.now() - 1000 * 60 * 32)
    },
    {
      id: "3",
      marketId: "1",
      userId: "user3",
      type: "comment",
      content: "This looks like a strong bet based on historical data",
      timestamp: new Date(Date.now() - 1000 * 60 * 45)
    },
    {
      id: "4",
      marketId: "1",
      userId: "user4",
      type: "bet",
      content: "Bought 950 shares of Yes",
      amount: "$950",
      optionId: "1a",
      timestamp: new Date(Date.now() - 1000 * 60 * 67)
    },
    {
      id: "5",
      marketId: "1",
      userId: "user5",
      type: "share",
      content: "Shared this prediction market",
      timestamp: new Date(Date.now() - 1000 * 60 * 89)
    }
  ];

  const displayHolders = topHolders.length > 0 ? topHolders : defaultHolders;
  const displayActivity = recentActivity.length > 0 ? recentActivity : defaultActivity;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bet':
        return <Coins className="h-4 w-4" />;
      case 'comment':
        return <Activity className="h-4 w-4" />;
      case 'share':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'bet':
        return 'text-green-600 dark:text-green-400';
      case 'comment':
        return 'text-blue-600 dark:text-blue-400';
      case 'share':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 75) return 'text-green-600 dark:text-green-400';
    if (winRate >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className={className}>
      <Tabs defaultValue="holders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="holders" className="flex items-center gap-2" data-testid="tab-holders">
            <Trophy className="h-4 w-4" />
            Top Holders
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2" data-testid="tab-activity">
            <Activity className="h-4 w-4" />
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="holders" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Position Holders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {displayHolders.map((holder, index) => (
                    <div
                      key={holder.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                      data-testid={`holder-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground w-6">
                            #{index + 1}
                          </span>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={holder.avatar} alt={holder.username} />
                            <AvatarFallback>
                              {holder.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="font-medium">{holder.username}</div>
                          <div className="text-sm text-muted-foreground">
                            Win Rate: <span className={getWinRateColor(holder.winRate)}>{holder.winRate}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{holder.totalPositionUSD}</div>
                        <div className="text-sm text-muted-foreground">
                          {holder.positions.length} position{holder.positions.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {displayActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                      data-testid={`activity-${activity.id}`}
                    >
                      <div className={`mt-1 ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {activity.userId}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                          {activity.amount && (
                            <Badge variant="secondary" className="text-xs">
                              {activity.amount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {activity.content}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}