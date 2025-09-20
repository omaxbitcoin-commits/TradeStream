
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Copy, 
  Download, 
  Share, 
  TrendingUp, 
  Diamond, 
  Zap,
  Target,
  BarChart3,
  Coins,
  Users,
  Calendar,
  Hash
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PostTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  hashtags: string[];
  icon: React.ReactNode;
  style: 'announcement' | 'update' | 'achievement' | 'community' | 'feature' | 'stats';
}

const postTemplates: PostTemplate[] = [
  {
    id: 'launch',
    name: 'Product Launch',
    category: 'Announcement',
    content: '🚀 Exciting news! We\'re launching a game-changing feature on @OmaxPlatform\n\n✨ Real-time token tracking\n📊 Advanced analytics\n🔥 Lightning-fast trades\n\nReady to revolutionize your crypto experience?',
    hashtags: ['#Omax', '#DeFi', '#CryptoTrading', '#Innovation'],
    icon: <Zap className="w-5 h-5" />,
    style: 'announcement'
  },
  {
    id: 'milestone',
    name: 'Milestone Achievement',
    category: 'Achievement',
    content: '🎉 MILESTONE ACHIEVED! 🎉\n\n@OmaxPlatform just hit 100K+ active traders!\n\n📈 $50M+ volume traded\n🌟 99.9% uptime\n🚀 Growing stronger every day\n\nThank you to our amazing community! 💜',
    hashtags: ['#Omax', '#Milestone', '#Community', '#Growth'],
    icon: <Target className="w-5 h-5" />,
    style: 'achievement'
  },
  {
    id: 'feature',
    name: 'Feature Highlight',
    category: 'Feature',
    content: '🔥 FEATURE SPOTLIGHT 🔥\n\nOmax\'s Price Chart just got an upgrade!\n\n📊 Candlestick patterns\n⚡ Real-time updates\n📈 Multiple timeframes\n🎯 Advanced indicators\n\nTrading made simple. Trading made powerful.',
    hashtags: ['#Omax', '#Features', '#Trading', '#Charts'],
    icon: <BarChart3 className="w-5 h-5" />,
    style: 'feature'
  },
  {
    id: 'stats',
    name: 'Platform Stats',
    category: 'Statistics',
    content: '📊 OMAX BY THE NUMBERS 📊\n\n👥 500K+ Users\n💰 $100M+ Volume\n🌍 150+ Countries\n⚡ <1s Trade Execution\n🛡️ 100% Secure\n\nJoin the revolution in crypto trading! 🚀',
    hashtags: ['#Omax', '#Stats', '#CryptoStats', '#Platform'],
    icon: <BarChart3 className="w-5 h-5" />,
    style: 'stats'
  },
  {
    id: 'community',
    name: 'Community Focus',
    category: 'Community',
    content: '💜 COMMUNITY LOVE 💜\n\nOur traders are the heart of @OmaxPlatform\n\n🤝 Supporting each other\n📚 Sharing knowledge\n🎯 Growing together\n✨ Building the future\n\nWhat makes our community special? YOU! 🙌',
    hashtags: ['#OmaxCommunity', '#Together', '#Traders', '#Support'],
    icon: <Users className="w-5 h-5" />,
    style: 'community'
  },
  {
    id: 'update',
    name: 'Platform Update',
    category: 'Update',
    content: '🔄 PLATFORM UPDATE 🔄\n\nNew features live on @OmaxPlatform:\n\n✅ Enhanced security\n✅ Faster load times\n✅ Mobile optimization\n✅ Better UX\n\nUpdate now for the best trading experience! 📱💻',
    hashtags: ['#Update', '#Omax', '#Enhancement', '#UserExperience'],
    icon: <Zap className="w-5 h-5" />,
    style: 'update'
  }
];

export default function XPostPage() {
  const { t } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate | null>(null);
  const [customContent, setCustomContent] = useState('');
  const [customHashtags, setCustomHashtags] = useState('');
  const [previewMode, setPreviewMode] = useState<'template' | 'custom'>('template');

  const handleCopyToClipboard = (content: string, hashtags: string[]) => {
    const fullPost = `${content}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullPost);
  };

  const getStyleClasses = (style: string) => {
    switch (style) {
      case 'announcement':
        return 'from-accent/5 to-accent/10 border-accent/20';
      case 'achievement':
        return 'from-success/5 to-success/10 border-success/20';
      case 'feature':
        return 'from-primary/5 to-primary/10 border-primary/20';
      case 'stats':
        return 'from-warning/5 to-warning/10 border-warning/20';
      case 'community':
        return 'from-purple-500/5 to-purple-500/10 border-purple-500/20';
      case 'update':
        return 'from-blue-500/5 to-blue-500/10 border-blue-500/20';
      default:
        return 'from-muted/30 to-muted/50 border-border/20';
    }
  };

  const getCurrentContent = () => {
    if (previewMode === 'custom') {
      return customContent;
    }
    return selectedTemplate?.content || '';
  };

  const getCurrentHashtags = () => {
    if (previewMode === 'custom') {
      return customHashtags.split(' ').filter(tag => tag.trim());
    }
    return selectedTemplate?.hashtags || [];
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-testid="page-x-post">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-page-title">
          X Post Creator
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          Create engaging X (Twitter) posts for Omax with professional templates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates Section */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-border/50 shadow-lg bg-gradient-to-br from-surface to-surface/80">
            <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-t-xl border-b border-border/30">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Hash className="w-5 h-5" />
                </div>
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Post Templates
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 bg-gradient-to-r ${getStyleClasses(template.style)} ${
                      selectedTemplate?.id === template.id 
                        ? 'ring-2 ring-accent/50 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setPreviewMode('template');
                    }}
                    data-testid={`template-card-${template.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 rounded-lg bg-background/20 text-foreground">
                          {template.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{template.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 line-clamp-3">
                        {template.content}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {template.hashtags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {template.hashtags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.hashtags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Custom Post Section */}
              <div className="mt-6 border-t border-border/30 pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Diamond className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Create Custom Post</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Post Content
                    </label>
                    <Textarea
                      placeholder="Write your custom X post content here..."
                      value={customContent}
                      onChange={(e) => setCustomContent(e.target.value)}
                      className="min-h-[120px] border-2 border-border/30 focus:border-accent/50 bg-background/80"
                      data-testid="textarea-custom-content"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Hashtags (space separated)
                    </label>
                    <Input
                      placeholder="#Omax #DeFi #Crypto #Trading"
                      value={customHashtags}
                      onChange={(e) => setCustomHashtags(e.target.value)}
                      className="border-2 border-border/30 focus:border-accent/50 bg-background/80"
                      data-testid="input-custom-hashtags"
                    />
                  </div>
                  
                  <Button
                    onClick={() => setPreviewMode('custom')}
                    variant="outline"
                    className="w-full"
                    data-testid="button-preview-custom"
                  >
                    Preview Custom Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          {/* X Post Preview */}
          <Card className="border-2 border-border/50 shadow-lg bg-gradient-to-br from-surface to-surface/80">
            <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-t-xl border-b border-border/30">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Share className="w-5 h-5" />
                </div>
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  X Post Preview
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {/* X Post Card Mock */}
              <div className="bg-background border border-border rounded-xl p-4 shadow-sm max-w-sm mx-auto">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10 border-2 border-accent/30">
                    <AvatarFallback className="text-sm font-semibold bg-accent/10 text-accent">
                      <Diamond className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground">Omax</span>
                      <span className="text-accent">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">@OmaxPlatform</span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {getCurrentContent() || 'Select a template or create a custom post to see preview'}
                  </p>
                </div>

                {/* Hashtags */}
                {getCurrentHashtags().length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {getCurrentHashtags().map((tag, index) => (
                      <span key={index} className="text-sm text-accent hover:underline cursor-pointer">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                )}

                {/* Time */}
                <div className="text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Now
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 space-y-2">
                <Button
                  onClick={() => handleCopyToClipboard(getCurrentContent(), getCurrentHashtags())}
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={!getCurrentContent()}
                  data-testid="button-copy-post"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!getCurrentContent()}
                    data-testid="button-download-post"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!getCurrentContent()}
                    data-testid="button-share-post"
                  >
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-r from-muted/30 to-muted/50 border border-border/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-accent" />
                Posting Tips
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use 2-4 relevant hashtags for best reach</li>
                <li>• Keep posts under 280 characters</li>
                <li>• Include emojis for engagement</li>
                <li>• Post during peak hours</li>
                <li>• Tag @OmaxPlatform for retweets</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
