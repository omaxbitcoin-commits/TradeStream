import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'bet' | 'system';
  betInfo?: {
    option: string;
    amount: string;
    type: 'buy' | 'sell';
  };
}

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'tennis_expert',
    message: 'Djokovic has been training hard for this. His recent form looks incredible!',
    timestamp: new Date(Date.now() - 300000),
    type: 'message'
  },
  {
    id: '2',
    user: 'sports_bettor',
    message: '',
    timestamp: new Date(Date.now() - 240000),
    type: 'bet',
    betInfo: {
      option: 'Novak Djokovic',
      amount: '$150',
      type: 'buy'
    }
  },
  {
    id: '3',
    user: 'alcaraz_fan',
    message: 'Alcaraz is younger and has more energy. Plus he beat Djokovic last time they met.',
    timestamp: new Date(Date.now() - 180000),
    type: 'message'
  },
  {
    id: '4',
    user: 'crypto_trader',
    message: '',
    timestamp: new Date(Date.now() - 120000),
    type: 'bet',
    betInfo: {
      option: 'Carlos Alcaraz',
      amount: '$75',
      type: 'buy'
    }
  },
  {
    id: '5',
    user: 'system',
    message: 'New high volume bet placed on Djokovic!',
    timestamp: new Date(Date.now() - 60000),
    type: 'system'
  }
];

interface MarketChatProps {
  marketId: string;
}

export function MarketChat({ marketId }: MarketChatProps) {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState<ChatMessage[]>(sampleMessages);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to the backend
    setNewMessage('');
  };

  const getUserInitials = (username: string) => {
    return username.split('_').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span>Market Discussion</span>
          <Badge variant="secondary" className="text-xs">
            {messages.length} messages
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <div className="space-y-3 max-h-96 overflow-y-auto" data-testid="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.type === 'system' ? (
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <span className="text-sm text-muted-foreground">{message.message}</span>
                </div>
              ) : message.type === 'bet' ? (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {getUserInitials(message.user)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{message.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {message.betInfo?.type === 'buy' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">
                      {message.betInfo?.type === 'buy' ? 'Bought' : 'Sold'} {message.betInfo?.amount} on{' '}
                    </span>
                    <span className="font-medium">{message.betInfo?.option}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-2">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs">
                      {getUserInitials(message.user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground break-words">{message.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Share your thoughts..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
              data-testid="input-new-message"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="sm"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Be respectful and follow community guidelines
          </p>
        </div>
      </CardContent>
    </Card>
  );
}