
import React, { useState, useRef, useEffect } from 'react';
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
  Hash,
  Image as ImageIcon,
  Palette,
  Type,
  Move,
  RotateCcw
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

interface ImageTemplate {
  id: string;
  name: string;
  theme: 'dark' | 'light' | 'gradient' | 'neon' | 'minimal';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  layout: 'centered' | 'left-aligned' | 'split' | 'overlay' | 'banner';
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

const imageTemplates: ImageTemplate[] = [
  {
    id: 'dark-gradient',
    name: 'Dark Gradient',
    theme: 'dark',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#10B981',
      background: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #262626 100%)',
      text: '#FFFFFF'
    },
    layout: 'centered'
  },
  {
    id: 'neon-purple',
    name: 'Neon Purple',
    theme: 'neon',
    colors: {
      primary: '#A855F7',
      secondary: '#EC4899',
      accent: '#06FFA5',
      background: 'radial-gradient(circle at 30% 20%, #1A0B2E 0%, #16213E 40%, #0F3460 100%)',
      text: '#FFFFFF'
    },
    layout: 'overlay'
  },
  {
    id: 'light-minimal',
    name: 'Light Minimal',
    theme: 'minimal',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#10B981',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
      text: '#1E293B'
    },
    layout: 'left-aligned'
  },
  {
    id: 'crypto-gold',
    name: 'Crypto Gold',
    theme: 'gradient',
    colors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      accent: '#10B981',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #2D1B69 50%, #F59E0B 100%)',
      text: '#FFFFFF'
    },
    layout: 'split'
  },
  {
    id: 'bitcoin-orange',
    name: 'Bitcoin Orange',
    theme: 'gradient',
    colors: {
      primary: '#F7931A',
      secondary: '#FF6B35',
      accent: '#00D2FF',
      background: 'linear-gradient(135deg, #000000 0%, #1A1A1A 30%, #F7931A 100%)',
      text: '#FFFFFF'
    },
    layout: 'banner'
  },
  {
    id: 'defi-blue',
    name: 'DeFi Blue',
    theme: 'gradient',
    colors: {
      primary: '#0EA5E9',
      secondary: '#3B82F6',
      accent: '#06FFA5',
      background: 'linear-gradient(135deg, #0C1426 0%, #1E3A8A 50%, #0EA5E9 100%)',
      text: '#FFFFFF'
    },
    layout: 'centered'
  }
];

export default function XPostPage() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate | null>(null);
  const [selectedImageTemplate, setSelectedImageTemplate] = useState<ImageTemplate>(imageTemplates[0]);
  const [customContent, setCustomContent] = useState('');
  const [customHashtags, setCustomHashtags] = useState('');
  const [previewMode, setPreviewMode] = useState<'template' | 'custom'>('template');
  const [imageMode, setImageMode] = useState<'text' | 'image'>('text');
  const [customTitle, setCustomTitle] = useState('OMAX PLATFORM');
  const [customSubtitle, setCustomSubtitle] = useState('The Future of DeFi Trading');
  const [customImageText, setCustomImageText] = useState('🚀 Revolutionary Trading Experience');

  const drawImageTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for Twitter (16:9 aspect ratio)
    canvas.width = 1200;
    canvas.height = 675;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    if (selectedImageTemplate.colors.background.includes('linear-gradient')) {
      // Parse gradient colors from CSS
      if (selectedImageTemplate.id === 'dark-gradient') {
        gradient.addColorStop(0, '#0F0F0F');
        gradient.addColorStop(0.5, '#1A1A1A');
        gradient.addColorStop(1, '#262626');
      } else if (selectedImageTemplate.id === 'neon-purple') {
        gradient.addColorStop(0, '#1A0B2E');
        gradient.addColorStop(0.4, '#16213E');
        gradient.addColorStop(1, '#0F3460');
      } else if (selectedImageTemplate.id === 'light-minimal') {
        gradient.addColorStop(0, '#F8FAFC');
        gradient.addColorStop(1, '#E2E8F0');
      } else if (selectedImageTemplate.id === 'crypto-gold') {
        gradient.addColorStop(0, '#1A1A1A');
        gradient.addColorStop(0.5, '#2D1B69');
        gradient.addColorStop(1, '#F59E0B');
      } else if (selectedImageTemplate.id === 'bitcoin-orange') {
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.3, '#1A1A1A');
        gradient.addColorStop(1, '#F7931A');
      } else if (selectedImageTemplate.id === 'defi-blue') {
        gradient.addColorStop(0, '#0C1426');
        gradient.addColorStop(0.5, '#1E3A8A');
        gradient.addColorStop(1, '#0EA5E9');
      }
    } else {
      gradient.addColorStop(0, selectedImageTemplate.colors.background);
      gradient.addColorStop(1, selectedImageTemplate.colors.primary);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle grid pattern for some themes
    if (selectedImageTemplate.theme === 'neon' || selectedImageTemplate.id === 'crypto-gold') {
      ctx.strokeStyle = selectedImageTemplate.colors.primary + '10';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Draw OMAX logo (diamond shape)
    const logoSize = 80;
    const logoX = selectedImageTemplate.layout === 'left-aligned' ? 100 : canvas.width / 2;
    const logoY = selectedImageTemplate.layout === 'banner' ? 150 : 180;

    ctx.save();
    ctx.translate(logoX, logoY);
    ctx.rotate(Math.PI / 4);
    
    // Outer glow
    ctx.shadowColor = selectedImageTemplate.colors.primary;
    ctx.shadowBlur = 20;
    ctx.fillStyle = selectedImageTemplate.colors.primary;
    ctx.fillRect(-logoSize/2, -logoSize/2, logoSize, logoSize);
    
    // Inner diamond
    ctx.shadowBlur = 0;
    ctx.fillStyle = selectedImageTemplate.colors.accent;
    ctx.fillRect(-logoSize/3, -logoSize/3, logoSize*2/3, logoSize*2/3);
    
    ctx.restore();

    // Draw brand name
    ctx.fillStyle = selectedImageTemplate.colors.text;
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.textAlign = selectedImageTemplate.layout === 'left-aligned' ? 'left' : 'center';
    
    const brandX = selectedImageTemplate.layout === 'left-aligned' ? 100 : canvas.width / 2;
    const brandY = logoY + 120;
    
    // Add text shadow/glow
    ctx.shadowColor = selectedImageTemplate.colors.primary;
    ctx.shadowBlur = 10;
    ctx.fillText(customTitle, brandX, brandY);

    // Draw subtitle
    ctx.shadowBlur = 5;
    ctx.font = 'normal 36px Inter, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.text + 'CC';
    ctx.fillText(customSubtitle, brandX, brandY + 60);

    // Draw main content
    ctx.shadowBlur = 0;
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.text;
    
    const contentY = brandY + 140;
    const lines = customImageText.split('\n');
    lines.forEach((line, index) => {
      ctx.fillText(line, brandX, contentY + (index * 60));
    });

    // Draw decorative elements based on layout
    if (selectedImageTemplate.layout === 'overlay') {
      // Add geometric shapes
      ctx.fillStyle = selectedImageTemplate.colors.accent + '20';
      ctx.beginPath();
      ctx.arc(canvas.width - 150, 150, 100, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = selectedImageTemplate.colors.secondary + '15';
      ctx.beginPath();
      ctx.arc(100, canvas.height - 100, 80, 0, Math.PI * 2);
      ctx.fill();
    }

    if (selectedImageTemplate.layout === 'split') {
      // Add vertical accent line
      ctx.fillStyle = selectedImageTemplate.colors.accent;
      ctx.fillRect(canvas.width / 2 - 2, 100, 4, canvas.height - 200);
    }

    // Add footer with social handle
    ctx.font = 'normal 24px Inter, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.text + '80';
    ctx.textAlign = 'center';
    ctx.fillText('@OmaxPlatform', canvas.width / 2, canvas.height - 40);

    // Add corner branding
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.primary;
    ctx.textAlign = 'right';
    ctx.fillText('OMAX.PRO', canvas.width - 30, 40);
  };

  useEffect(() => {
    drawImageTemplate();
  }, [selectedImageTemplate, customTitle, customSubtitle, customImageText]);

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `omax-post-${selectedImageTemplate.id}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

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
          Create engaging X (Twitter) posts and images for Omax with professional templates
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6">
        <div className="flex space-x-2 bg-surface border border-border rounded-lg p-1">
          <Button
            variant={imageMode === 'text' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setImageMode('text')}
            className="flex-1"
          >
            <Type className="w-4 h-4 mr-2" />
            Text Posts
          </Button>
          <Button
            variant={imageMode === 'image' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setImageMode('image')}
            className="flex-1"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Image Posts
          </Button>
        </div>
      </div>

      {imageMode === 'text' ? (
        // Text Post Creation Mode
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
      ) : (
        // Image Post Creation Mode
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Templates and Customization */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border/50 shadow-lg bg-gradient-to-br from-surface to-surface/80">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-t-xl border-b border-border/30">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Image Templates
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Template Selection */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {imageTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedImageTemplate.id === template.id 
                          ? 'ring-2 ring-accent/50 shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedImageTemplate(template)}
                    >
                      <CardContent className="p-3">
                        <div 
                          className="h-20 rounded-lg mb-3"
                          style={{ background: template.colors.background }}
                        >
                          <div className="flex items-center justify-center h-full">
                            <Diamond className="w-6 h-6" style={{ color: template.colors.primary }} />
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm text-foreground">{template.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {template.theme}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Customization Controls */}
                <div className="space-y-4 border-t border-border/30 pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Customize Content</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Main Title
                    </label>
                    <Input
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="OMAX PLATFORM"
                      className="border-2 border-border/30 focus:border-accent/50 bg-background/80"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subtitle
                    </label>
                    <Input
                      value={customSubtitle}
                      onChange={(e) => setCustomSubtitle(e.target.value)}
                      placeholder="The Future of DeFi Trading"
                      className="border-2 border-border/30 focus:border-accent/50 bg-background/80"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Main Text Content
                    </label>
                    <Textarea
                      value={customImageText}
                      onChange={(e) => setCustomImageText(e.target.value)}
                      placeholder="🚀 Revolutionary Trading Experience"
                      className="min-h-[100px] border-2 border-border/30 focus:border-accent/50 bg-background/80"
                    />
                  </div>

                  <Button
                    onClick={drawImageTemplate}
                    variant="outline"
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Regenerate Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Preview and Actions */}
          <div className="space-y-6">
            <Card className="border-2 border-border/50 shadow-lg bg-gradient-to-br from-surface to-surface/80">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-t-xl border-b border-border/30">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Image Preview
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* Canvas Preview */}
                <div className="mb-4">
                  <canvas
                    ref={canvasRef}
                    className="w-full border border-border/30 rounded-lg shadow-sm"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>

                <div className="text-xs text-muted-foreground mb-4 text-center">
                  1200 x 675 px (16:9 ratio) - Perfect for X/Twitter
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={handleDownloadImage}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Tips */}
            <Card className="bg-gradient-to-r from-muted/30 to-muted/50 border border-border/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-accent" />
                  Image Tips
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use 16:9 ratio for optimal X display</li>
                  <li>• Keep text large and readable</li>
                  <li>• High contrast for accessibility</li>
                  <li>• Include brand elements consistently</li>
                  <li>• Test on mobile devices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
