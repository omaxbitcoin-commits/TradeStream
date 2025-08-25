import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWalletBalances, useTransactionFees, useDepositAddress, useWithdrawFunds } from '@/hooks/useWalletAPI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wallet, 
  Download, 
  Upload, 
  Plus, 
  Copy, 
  QrCode, 
  Settings,
  ArrowUpCircle,
  ArrowDownCircle,
  Bitcoin,
  Globe
} from 'lucide-react';

export default function WalletManagerPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('deposits');
  const [selectedNetwork, setSelectedNetwork] = useState('bitcoin');
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  
  const { data: balances = [], isLoading: balancesLoading } = useWalletBalances();
  const { data: fees = [], isLoading: feesLoading } = useTransactionFees();
  const depositMutation = useDepositAddress();
  const withdrawMutation = useWithdrawFunds();

  const networks = [
    { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin, token: 'BTC' },
    { id: 'internet-computer', name: 'Internet Computer', icon: Globe, token: 'ckBTC' }
  ];

  const currentBalance = balances.find(b => b.network === selectedNetwork && b.token === selectedToken);
  const networkFee = fees.find(f => f.network === selectedNetwork);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !destinationAddress) return;
    
    withdrawMutation.mutate({
      network: selectedNetwork as 'bitcoin' | 'internet-computer',
      token: selectedToken as 'BTC' | 'ckBTC',
      amount: withdrawAmount,
      destinationAddress
    });
  };

  const handleUpdateBalance = () => {
    // Trigger balance refresh
    window.location.reload();
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-testid="page-wallet-manager">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-page-title">
          Wallet Manager
        </h1>
        <p className="text-muted-foreground">Manage all your wallets here.</p>
      </div>

      {/* Wallet Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" data-testid="button-deposit">
            <ArrowDownCircle className="w-4 h-4 mr-2" />
            Deposit
          </Button>
          <Button variant="outline" size="sm" data-testid="button-withdraw">
            <ArrowUpCircle className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
          <Button variant="outline" size="sm" data-testid="button-import-wallet">
            <Download className="w-4 h-4 mr-2" />
            Import wallet
          </Button>
        </div>
        
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-generate-wallet">
          <Plus className="w-4 h-4 mr-2" />
          Generate New Wallet
        </Button>
      </div>

      {/* Wallet Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="deposits" data-testid="tab-deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdraw" data-testid="tab-withdraw">Withdraw</TabsTrigger>
                <TabsTrigger value="logs" data-testid="tab-logs">Logs</TabsTrigger>
              </TabsList>
              
              {/* Balance Display */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-foreground">Wallets</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground" data-testid="text-total-balance">
                    $ {currentBalance?.usdValue || '0.00'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <TabsContent value="deposits" className="mt-0">
                <div className="space-y-6">
                  {/* Network Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select the network
                    </label>
                    <Select value={selectedNetwork} onValueChange={(value) => {
                      setSelectedNetwork(value);
                      const network = networks.find(n => n.id === value);
                      if (network) setSelectedToken(network.token);
                    }}>
                      <SelectTrigger data-testid="select-network">
                        <div className="flex items-center space-x-2">
                          {networks.find(n => n.id === selectedNetwork)?.icon && 
                            React.createElement(networks.find(n => n.id === selectedNetwork)!.icon, { 
                              className: "w-4 h-4 text-warning" 
                            })
                          }
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map(network => (
                          <SelectItem key={network.id} value={network.id}>
                            <div className="flex items-center space-x-2">
                              <network.icon className="w-4 h-4 text-warning" />
                              <span>{network.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Token Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select the token
                    </label>
                    <Select value={selectedToken} onValueChange={setSelectedToken}>
                      <SelectTrigger data-testid="select-token">
                        <div className="flex items-center space-x-2">
                          <Bitcoin className="w-4 h-4 text-warning" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BTC">
                          <div className="flex items-center space-x-2">
                            <Bitcoin className="w-4 h-4 text-warning" />
                            <span>Bitcoin</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ckBTC">
                          <div className="flex items-center space-x-2">
                            <Bitcoin className="w-4 h-4 text-warning" />
                            <span>Chain Key Bitcoin</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Deposit Address */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Deposit address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={currentBalance?.address || ''}
                        readOnly
                        className="flex-1 bg-background"
                        data-testid="input-deposit-address"
                      />
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleCopyAddress(currentBalance?.address || '')}
                        data-testid="button-copy-address"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Update Balance */}
                  <div className="flex justify-between items-center">
                    <Button 
                      onClick={handleUpdateBalance}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      data-testid="button-update-balance"
                    >
                      Update balance
                    </Button>
                    <Button variant="outline" data-testid="button-show-qr">
                      Show QR Code
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="withdraw" className="mt-0">
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground">
                    No upcoming transaction
                  </div>

                  {/* Network Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select the network
                    </label>
                    <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                      <SelectTrigger data-testid="select-withdraw-network">
                        <div className="flex items-center space-x-2">
                          <Bitcoin className="w-4 h-4 text-warning" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map(network => (
                          <SelectItem key={network.id} value={network.id}>
                            <div className="flex items-center space-x-2">
                              <network.icon className="w-4 h-4 text-warning" />
                              <span>{network.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Token Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select the token
                    </label>
                    <Select value={selectedToken} onValueChange={setSelectedToken}>
                      <SelectTrigger data-testid="select-withdraw-token">
                        <div className="flex items-center space-x-2">
                          <Bitcoin className="w-4 h-4 text-warning" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BTC">Bitcoin</SelectItem>
                        <SelectItem value="ckBTC">Chain Key Bitcoin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Destination Address */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Wallet address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Destination Address"
                        value={destinationAddress}
                        onChange={(e) => setDestinationAddress(e.target.value)}
                        className="flex-1"
                        data-testid="input-destination-address"
                      />
                      <Button variant="outline" size="sm" data-testid="button-paste-address">
                        {selectedToken}
                      </Button>
                    </div>
                  </div>

                  {/* Withdraw Amount */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Withdraw Amount
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="flex-1"
                        data-testid="input-withdraw-amount"
                      />
                      <Button variant="outline" size="sm" data-testid="button-max-amount">
                        All
                      </Button>
                    </div>
                  </div>

                  {/* Fee Information */}
                  <div className="bg-background border border-border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Inter network fee</span>
                      <span className="text-sm font-medium text-foreground" data-testid="text-inter-fee">
                        {networkFee ? `${networkFee.fee} ${networkFee.feeToken}` : '0.00000100 BTC'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{selectedNetwork} network fee</span>
                      <span className="text-sm font-medium text-foreground" data-testid="text-network-fee">
                        {networkFee ? `${networkFee.fee} ${networkFee.feeToken}` : '0.00000703 BTC'}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Receive amount</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-warning" data-testid="text-receive-amount">
                            -{withdrawAmount || '0.00000000'} {selectedToken}
                          </div>
                          <div className="text-xs text-muted-foreground">0.01 USD</div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-muted-foreground">Minimum amount</span>
                        <span className="text-sm font-medium text-warning" data-testid="text-minimum-amount">
                          0.0005 {selectedToken}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Withdraw Button */}
                  <Button 
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || !destinationAddress || withdrawMutation.isPending}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3"
                    data-testid="button-withdraw"
                  >
                    {withdrawMutation.isPending ? 'Processing...' : 'Withdraw'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="logs" className="mt-0">
                <div className="text-center py-12">
                  <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Transaction Logs</h3>
                  <p className="text-sm text-muted-foreground">
                    Your transaction history will appear here once you make deposits or withdrawals.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}