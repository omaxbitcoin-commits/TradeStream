
import React from 'react';
import { Diamond, Clock, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Diamond className="text-4xl text-accent animate-glow" />
          <span className="text-3xl font-bold text-foreground">OMAX</span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="text-accent w-6 h-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Coming Soon
              </h1>
              <Sparkles className="text-accent w-6 h-6" />
            </div>
            
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              We're building something extraordinary. Get ready for the next generation of DeFi trading tools.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
            <Card className="p-6 bg-surface border-border hover:bg-surface-light transition-colors">
              <div className="text-accent mb-3">
                <Clock className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Advanced trading insights across multiple DEXes
              </p>
            </Card>

            <Card className="p-6 bg-surface border-border hover:bg-surface-light transition-colors">
              <div className="text-accent mb-3">
                <Diamond className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Trading</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered tools for optimal trading strategies
              </p>
            </Card>

            <Card className="p-6 bg-surface border-border hover:bg-surface-light transition-colors">
              <div className="text-accent mb-3">
                <Bell className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Never miss important market movements
              </p>
            </Card>
          </div>

          {/* Notify Me Section */}
          <Card className="p-8 bg-surface border-border max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Be the first to know
            </h3>
            <p className="text-muted-foreground mb-6">
              Get notified when we launch and receive exclusive early access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Notify Me
              </Button>
            </div>
          </Card>

          {/* Launch Timeline */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Launch Timeline</h3>
            <div className="flex justify-center">
              <div className="bg-surface border border-border rounded-lg px-6 py-4">
                <div className="text-3xl font-bold text-accent">Q2 2024</div>
                <div className="text-sm text-muted-foreground">Expected Launch</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Follow us for updates and sneak peeks
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant="outline" size="sm">Twitter</Button>
            <Button variant="outline" size="sm">Discord</Button>
            <Button variant="outline" size="sm">Telegram</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
