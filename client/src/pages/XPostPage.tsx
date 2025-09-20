
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
  RotateCcw,
  List,
  Grid,
  Layout,
  Layers
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
  arrangement: 'centered' | 'list' | 'banner' | 'split' | 'grid';
}

interface ImageTemplate {
  id: string;
  name: string;
  theme: 'dark' | 'light' | 'gradient' | 'neon' | 'minimal' | 'bitcoin';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    gold?: string;
    copper?: string;
  };
  layout: 'centered' | 'left-aligned' | 'split' | 'overlay' | 'banner' | 'list' | 'grid';
}

const postTemplates: PostTemplate[] = [
  {
    id: 'launch',
    name: 'Product Launch',
    category: 'Announcement',
    content: '🚀 Exciting news! We\'re launching a game-changing feature on @OmaxProPlatform\n\n✨ Real-time token tracking\n📊 Advanced analytics\n🔥 Lightning-fast trades\n\nReady to revolutionize your crypto experience?',
    hashtags: ['#OmaxPro', '#DeFi', '#CryptoTrading', '#Innovation'],
    icon: <Zap className="w-5 h-5" />,
    style: 'announcement',
    arrangement: 'banner'
  },
  {
    id: 'milestone',
    name: 'Milestone Achievement',
    category: 'Achievement',
    content: '🎉 MILESTONE ACHIEVED! 🎉\n\n@OmaxProPlatform just hit 100K+ active traders!\n\n📈 $50M+ volume traded\n🌟 99.9% uptime\n🚀 Growing stronger every day\n\nThank you to our amazing community! 💜',
    hashtags: ['#OmaxPro', '#Milestone', '#Community', '#Growth'],
    icon: <Target className="w-5 h-5" />,
    style: 'achievement',
    arrangement: 'centered'
  },
  {
    id: 'feature',
    name: 'Feature Highlight',
    category: 'Feature',
    content: '🔥 FEATURE SPOTLIGHT 🔥\n\nOmaxPro\'s Price Chart just got an upgrade!\n\n• 📊 Candlestick patterns\n• ⚡ Real-time updates\n• 📈 Multiple timeframes\n• 🎯 Advanced indicators\n\nTrading made simple. Trading made powerful.',
    hashtags: ['#OmaxPro', '#Features', '#Trading', '#Charts'],
    icon: <BarChart3 className="w-5 h-5" />,
    style: 'feature',
    arrangement: 'list'
  },
  {
    id: 'stats',
    name: 'Platform Stats',
    category: 'Statistics',
    content: '📊 OMAXPRO BY THE NUMBERS 📊\n\n👥 500K+ Users          💰 $100M+ Volume\n🌍 150+ Countries      ⚡ <1s Trade Execution\n🛡️ 100% Secure          🚀 24/7 Support\n\nJoin the revolution in crypto trading! 🚀',
    hashtags: ['#OmaxPro', '#Stats', '#CryptoStats', '#Platform'],
    icon: <BarChart3 className="w-5 h-5" />,
    style: 'stats',
    arrangement: 'grid'
  },
  {
    id: 'community',
    name: 'Community Focus',
    category: 'Community',
    content: '💜 COMMUNITY LOVE 💜\n\nOur traders are the heart of @OmaxProPlatform\n\n🤝 Supporting each other\n📚 Sharing knowledge\n🎯 Growing together\n✨ Building the future\n\nWhat makes our community special? YOU! 🙌',
    hashtags: ['#OmaxProCommunity', '#Together', '#Traders', '#Support'],
    icon: <Users className="w-5 h-5" />,
    style: 'community',
    arrangement: 'split'
  },
  {
    id: 'update',
    name: 'Platform Update',
    category: 'Update',
    content: '🔄 PLATFORM UPDATE 🔄\n\nNew features live on @OmaxProPlatform:\n\n✅ Enhanced security\n✅ Faster load times\n✅ Mobile optimization\n✅ Better UX\n\nUpdate now for the best trading experience! 📱💻',
    hashtags: ['#Update', '#OmaxPro', '#Enhancement', '#UserExperience'],
    icon: <Zap className="w-5 h-5" />,
    style: 'update',
    arrangement: 'list'
  }
];

const imageTemplates: ImageTemplate[] = [
  {
    id: 'bitcoin-gold',
    name: 'Bitcoin Gold',
    theme: 'bitcoin',
    colors: {
      primary: '#F7931A',
      secondary: '#FFB84D',
      accent: '#FFC966',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #2D1B69 30%, #F7931A 100%)',
      text: '#FFFFFF',
      gold: '#FFD700',
      copper: '#B87333'
    },
    layout: 'centered'
  },
  {
    id: 'bitcoin-dark',
    name: 'Bitcoin Dark',
    theme: 'bitcoin',
    colors: {
      primary: '#F7931A',
      secondary: '#FF8C00',
      accent: '#FFB84D',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)',
      text: '#FFFFFF',
      gold: '#FFD700',
      copper: '#CD7F32'
    },
    layout: 'banner'
  },
  {
    id: 'bitcoin-copper',
    name: 'Bitcoin Copper',
    theme: 'bitcoin',
    colors: {
      primary: '#B87333',
      secondary: '#D2691E',
      accent: '#F7931A',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #3D2B1F 50%, #B87333 100%)',
      text: '#FFFFFF',
      gold: '#FFD700',
      copper: '#B87333'
    },
    layout: 'split'
  },
  {
    id: 'bitcoin-gradient',
    name: 'Bitcoin Gradient',
    theme: 'bitcoin',
    colors: {
      primary: '#F7931A',
      secondary: '#FFD700',
      accent: '#FFA500',
      background: 'radial-gradient(circle at 30% 20%, #1A0B2E 0%, #2D1B69 40%, #F7931A 100%)',
      text: '#FFFFFF',
      gold: '#FFD700',
      copper: '#B87333'
    },
    layout: 'overlay'
  },
  {
    id: 'bitcoin-minimal',
    name: 'Bitcoin Minimal',
    theme: 'bitcoin',
    colors: {
      primary: '#F7931A',
      secondary: '#FFB84D',
      accent: '#FFD700',
      background: 'linear-gradient(135deg, #2A2A2A 0%, #3A3A3A 100%)',
      text: '#FFFFFF',
      gold: '#FFD700',
      copper: '#CD7F32'
    },
    layout: 'left-aligned'
  },
  {
    id: 'bitcoin-list',
    name: 'Bitcoin List',
    theme: 'bitcoin',
    colors: {
      primary: '#F7931A',
      secondary: '#FFB84D',
      accent: '#FFD700',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      text: '#FFFFFF',
      gold: '#FFD700',
      copper: '#B87333'
    },
    layout: 'list'
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
  const [customTitle, setCustomTitle] = useState('OMAXPRO');
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
    
    // Apply template-specific gradients
    if (selectedImageTemplate.id === 'bitcoin-gold') {
      gradient.addColorStop(0, '#1A1A1A');
      gradient.addColorStop(0.3, '#2D1B69');
      gradient.addColorStop(1, '#F7931A');
    } else if (selectedImageTemplate.id === 'bitcoin-dark') {
      gradient.addColorStop(0, '#0A0A0A');
      gradient.addColorStop(0.5, '#1A1A1A');
      gradient.addColorStop(1, '#2A2A2A');
    } else if (selectedImageTemplate.id === 'bitcoin-copper') {
      gradient.addColorStop(0, '#1A1A1A');
      gradient.addColorStop(0.5, '#3D2B1F');
      gradient.addColorStop(1, '#B87333');
    } else if (selectedImageTemplate.id === 'bitcoin-gradient') {
      const radialGradient = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.2, 0, canvas.width * 0.3, canvas.height * 0.2, canvas.width);
      radialGradient.addColorStop(0, '#1A0B2E');
      radialGradient.addColorStop(0.4, '#2D1B69');
      radialGradient.addColorStop(1, '#F7931A');
      ctx.fillStyle = radialGradient;
    } else if (selectedImageTemplate.id === 'bitcoin-minimal') {
      gradient.addColorStop(0, '#2A2A2A');
      gradient.addColorStop(1, '#3A3A3A');
    } else {
      gradient.addColorStop(0, '#1A1A1A');
      gradient.addColorStop(1, '#2D2D2D');
    }

    if (selectedImageTemplate.id !== 'bitcoin-gradient') {
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add Bitcoin-themed grid pattern
    ctx.strokeStyle = selectedImageTemplate.colors.primary + '08';
    ctx.lineWidth = 1;
    const gridSize = 40;
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

    // Draw OMAX diamond logo
    const logoSize = 70;
    let logoX = canvas.width / 2;
    let logoY = 160;

    if (selectedImageTemplate.layout === 'left-aligned') {
      logoX = 150;
      logoY = 150;
    } else if (selectedImageTemplate.layout === 'banner') {
      logoY = 120;
    }

    ctx.save();
    ctx.translate(logoX, logoY);
    ctx.rotate(Math.PI / 4);
    
    // Outer glow
    ctx.shadowColor = selectedImageTemplate.colors.primary;
    ctx.shadowBlur = 25;
    ctx.fillStyle = selectedImageTemplate.colors.primary;
    ctx.fillRect(-logoSize/2, -logoSize/2, logoSize, logoSize);
    
    // Inner diamond with gold accent
    ctx.shadowBlur = 10;
    ctx.fillStyle = selectedImageTemplate.colors.gold || selectedImageTemplate.colors.accent;
    ctx.fillRect(-logoSize/3, -logoSize/3, logoSize*2/3, logoSize*2/3);
    
    ctx.restore();

    // Draw OMAXPRO brand name
    ctx.fillStyle = selectedImageTemplate.colors.text;
    ctx.font = 'bold 68px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = selectedImageTemplate.layout === 'left-aligned' ? 'left' : 'center';
    
    let brandX = selectedImageTemplate.layout === 'left-aligned' ? 150 : canvas.width / 2;
    let brandY = logoY + 110;
    
    // Add text glow effect
    ctx.shadowColor = selectedImageTemplate.colors.primary;
    ctx.shadowBlur = 15;
    ctx.fillText(customTitle, brandX, brandY);

    // Draw subtitle with copper accent
    ctx.shadowBlur = 8;
    ctx.font = 'normal 32px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.copper || selectedImageTemplate.colors.secondary;
    ctx.fillText(customSubtitle, brandX, brandY + 50);

    // Draw main content based on layout
    ctx.shadowBlur = 0;
    ctx.font = 'bold 42px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.text;
    
    const contentY = brandY + 120;
    const lines = customImageText.split('\n');

    if (selectedImageTemplate.layout === 'list') {
      // List layout with bullet points
      lines.forEach((line, index) => {
        const bulletX = brandX + (selectedImageTemplate.layout === 'left-aligned' ? 0 : -300);
        const textX = bulletX + 40;
        
        // Draw bullet point
        ctx.fillStyle = selectedImageTemplate.colors.primary;
        ctx.beginPath();
        ctx.arc(bulletX, contentY + (index * 55), 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw text
        ctx.fillStyle = selectedImageTemplate.colors.text;
        ctx.font = 'normal 36px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(line.replace(/^[•\-]\s*/, ''), textX, contentY + (index * 55) + 5);
      });
    } else if (selectedImageTemplate.layout === 'grid') {
      // Grid layout for stats
      const gridCols = 2;
      const gridSpacing = 250;
      lines.forEach((line, index) => {
        const col = index % gridCols;
        const row = Math.floor(index / gridCols);
        const gridX = brandX + (col - 0.5) * gridSpacing;
        const gridY = contentY + (row * 60);
        
        ctx.font = 'bold 28px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(line, gridX, gridY);
      });
    } else {
      // Default centered layout
      lines.forEach((line, index) => {
        ctx.textAlign = selectedImageTemplate.layout === 'left-aligned' ? 'left' : 'center';
        ctx.fillText(line, brandX, contentY + (index * 55));
      });
    }

    // Add decorative Bitcoin symbols
    if (selectedImageTemplate.layout === 'overlay') {
      ctx.font = '60px sans-serif';
      ctx.fillStyle = selectedImageTemplate.colors.primary + '20';
      ctx.textAlign = 'center';
      ctx.fillText('₿', canvas.width - 120, 120);
      ctx.fillText('₿', 80, canvas.height - 80);
    }

    // Add footer with updated social handle
    ctx.font = 'normal 22px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.text + '80';
    ctx.textAlign = 'center';
    ctx.fillText('@OmaxProPlatform', canvas.width / 2, canvas.height - 35);

    // Add corner branding
    ctx.font = 'bold 16px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = selectedImageTemplate.colors.primary;
    ctx.textAlign = 'right';
    ctx.fillText('OMAXPRO.COM', canvas.width - 25, 35);
  };

  useEffect(() => {
    drawImageTemplate();
  }, [selectedImageTemplate, customTitle, customSubtitle, customImageText]);

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `omaxpro-post-${selectedImageTemplate.id}-${Date.now()}.png`;
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
        return 'from-accent/10 to-accent/20 border-accent/30 bg-gradient-to-br';
      case 'achievement':
        return 'from-success/10 to-success/20 border-success/30 bg-gradient-to-br';
      case 'feature':
        return 'from-primary/10 to-primary/20 border-primary/30 bg-gradient-to-br';
      case 'stats':
        return 'from-warning/10 to-warning/20 border-warning/30 bg-gradient-to-br';
      case 'community':
        return 'from-purple-500/10 to-purple-500/20 border-purple-500/30 bg-gradient-to-br';
      case 'update':
        return 'from-blue-500/10 to-blue-500/20 border-blue-500/30 bg-gradient-to-br';
      default:
        return 'from-muted/20 to-muted/40 border-border/30 bg-gradient-to-br';
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-br from-surface to-surface/60" data-testid="page-x-post">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-page-title">
          X Post Creator
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          Create engaging X (Twitter) posts and images for OmaxPro with professional templates
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6">
        <div className="flex space-x-2 bg-gradient-to-r from-surface to-surface/80 border-2 border-border/30 rounded-lg p-1">
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
              <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/20 rounded-t-xl border-b border-border/30">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
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
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${getStyleClasses(template.style)} ${
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
                          <div className="p-2 rounded-lg bg-background/30 text-foreground">
                            {template.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{template.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {template.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {template.arrangement}
                              </Badge>
                            </div>
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
                    <div className="p-2 rounded-lg bg-accent/20 text-accent">
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
                        className="min-h-[120px] border-2 border-border/30 focus:border-accent/50 bg-background text-foreground placeholder:text-muted-foreground"
                        data-testid="textarea-custom-content"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Hashtags (space separated)
                      </label>
                      <Input
                        placeholder="#OmaxPro #DeFi #Crypto #Trading"
                        value={customHashtags}
                        onChange={(e) => setCustomHashtags(e.target.value)}
                        className="border-2 border-border/30 focus:border-accent/50 bg-background text-foreground placeholder:text-muted-foreground"
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
              <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/20 rounded-t-xl border-b border-border/30">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    <Share className="w-5 h-5" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    X Post Preview
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* X Post Card Mock */}
                <div className="bg-background border-2 border-border/30 rounded-xl p-4 shadow-sm max-w-sm mx-auto">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="w-10 h-10 border-2 border-accent/30">
                      <AvatarFallback className="text-sm font-semibold bg-accent/20 text-accent">
                        <Diamond className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">OmaxPro</span>
                        <span className="text-accent">✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">@OmaxProPlatform</span>
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
                    className="w-full bg-accent hover:bg-accent/90 text-black"
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
            <Card className="bg-gradient-to-r from-muted/30 to-muted/50 border-2 border-border/30">
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
                  <li>• Tag @OmaxProPlatform for retweets</li>
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
              <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/20 rounded-t-xl border-b border-border/30">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Bitcoin Theme Templates
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
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {template.theme}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.layout}
                          </Badge>
                        </div>
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
                      placeholder="OMAXPRO"
                      className="border-2 border-border/30 focus:border-accent/50 bg-background text-foreground placeholder:text-muted-foreground"
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
                      className="border-2 border-border/30 focus:border-accent/50 bg-background text-foreground placeholder:text-muted-foreground"
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
                      className="min-h-[100px] border-2 border-border/30 focus:border-accent/50 bg-background text-foreground placeholder:text-muted-foreground"
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
              <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/20 rounded-t-xl border-b border-border/30">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
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
                    className="w-full border-2 border-border/30 rounded-lg shadow-sm"
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
                    className="w-full bg-accent hover:bg-accent/90 text-black"
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
            <Card className="bg-gradient-to-r from-muted/30 to-muted/50 border-2 border-border/30">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-accent" />
                  Image Tips
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use 16:9 ratio for optimal X display</li>
                  <li>• Keep text large and readable</li>
                  <li>• High contrast for accessibility</li>
                  <li>• Bitcoin theme maintains brand consistency</li>
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
