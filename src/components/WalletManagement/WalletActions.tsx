import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Lock, 
  Unlock, 
  ArrowRightLeft, 
  Shield, 
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useLockWallet, useUnlockWallet, useTransferLockedBalance } from "@/hooks/useWalletBalances";
import { toast } from "sonner";
import type { WalletBalanceUser } from "@/lib/api";

interface WalletActionsProps {
  user: WalletBalanceUser;
}

export const WalletActions = ({ user }: WalletActionsProps) => {
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [lockReason, setLockReason] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const lockWalletMutation = useLockWallet();
  const unlockWalletMutation = useUnlockWallet();
  const transferBalanceMutation = useTransferLockedBalance();

  const isWalletLocked = user.wallet.is_locked;
  const hasLockedBalance = Number(user.wallet.locked_balance || 0) > 0;
  
  // Debug logging to help identify data type issues
  console.log('WalletActions - user.wallet:', user.wallet);
  console.log('WalletActions - locked_balance type:', typeof user.wallet.locked_balance, 'value:', user.wallet.locked_balance);

  const handleLockWallet = async () => {
    if (!lockReason.trim()) {
      toast.error("Please provide a reason for locking the wallet");
      return;
    }

    try {
      await lockWalletMutation.mutateAsync({
        userId: user.id,
        data: {
          reason: lockReason.trim(),
          lang: 'en'
        }
      });
      
      toast.success("Wallet locked successfully");
      setLockDialogOpen(false);
      setLockReason("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to lock wallet");
    }
  };

  const handleUnlockWallet = async () => {
    try {
      await unlockWalletMutation.mutateAsync({
        userId: user.id,
        data: {
          lang: 'en'
        }
      });
      
      toast.success("Wallet unlocked successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to unlock wallet");
    }
  };

  const handleTransferBalance = async () => {
    const amount = transferAmount ? parseFloat(transferAmount) : undefined;
    
    if (amount !== undefined && (amount <= 0 || amount > Number(user.wallet.locked_balance || 0))) {
      toast.error("Invalid transfer amount");
      return;
    }

    try {
      const result = await transferBalanceMutation.mutateAsync({
        userId: user.id,
        data: {
          amount,
          lang: 'en'
        }
      });
      
      const transferredAmount = result.data.amount_transferred;
      toast.success(`Successfully transferred ${transferredAmount.toFixed(2)} XAF to available balance`);
      setTransferDialogOpen(false);
      setTransferAmount("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to transfer balance");
    }
  };

  const formatBalance = (amount: number | string | undefined) => {
    const numAmount = Number(amount || 0);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Wallet Status */}
        <div className="px-2 py-1.5">
          <div className="flex items-center space-x-2">
            {isWalletLocked ? (
              <>
                <Lock className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-700">Wallet Locked</span>
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Wallet Unlocked</span>
              </>
            )}
          </div>
          {isWalletLocked && user.wallet.lock_reason && (
            <p className="text-xs text-gray-500 mt-1">{user.wallet.lock_reason}</p>
          )}
        </div>
        
        <DropdownMenuSeparator />

        {/* Lock/Unlock Actions */}
        {!isWalletLocked ? (
          <Dialog open={lockDialogOpen} onOpenChange={setLockDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Lock className="mr-2 h-4 w-4 text-red-500" />
                <span>Lock Wallet</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Lock Wallet</span>
                </DialogTitle>
                <DialogDescription>
                  Lock {user.name}'s wallet to prevent withdrawals. This action will be logged and can be reversed.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                      Current Balance: {formatBalance(user.wallet.total_balance)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lock-reason">Reason for locking *</Label>
                  <Textarea
                    id="lock-reason"
                    placeholder="Enter the reason for locking this wallet..."
                    value={lockReason}
                    onChange={(e) => setLockReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setLockDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLockWallet}
                  disabled={lockWalletMutation.isPending || !lockReason.trim()}
                >
                  {lockWalletMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Locking...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Lock Wallet
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Unlock className="mr-2 h-4 w-4 text-green-500" />
                <span>Unlock Wallet</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlock Wallet</span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to unlock {user.name}'s wallet? This will restore withdrawal capabilities.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Current Balance: {formatBalance(user.wallet.total_balance)}
                  </span>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleUnlockWallet}
                  disabled={unlockWalletMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {unlockWalletMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <Unlock className="mr-2 h-4 w-4" />
                      Unlock Wallet
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Transfer Balance Action */}
        {hasLockedBalance && (
          <>
            <DropdownMenuSeparator />
            <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ArrowRightLeft className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Transfer Locked Balance</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <ArrowRightLeft className="h-5 w-5 text-blue-500" />
                    <span>Transfer Locked Balance</span>
                  </DialogTitle>
                  <DialogDescription>
                    Transfer locked balance to available balance for {user.name}.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                          Locked Balance
                        </span>
                      </div>
                      <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                        {formatBalance(user.wallet.locked_balance)}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Available Balance
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-900 dark:text-green-100">
                        {formatBalance(user.wallet.available_balance)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transfer-amount">
                      Amount to transfer (leave empty to transfer all)
                    </Label>
                    <Input
                      id="transfer-amount"
                      type="number"
                      placeholder={`Max: ${Number(user.wallet.locked_balance || 0).toFixed(2)} XAF`}
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      min="0"
                      max={Number(user.wallet.locked_balance || 0)}
                      step="0.01"
                    />
                    <p className="text-xs text-gray-500">
                      Leave empty to transfer the entire locked balance ({formatBalance(user.wallet.locked_balance)})
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTransferDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleTransferBalance}
                    disabled={transferBalanceMutation.isPending}
                  >
                    {transferBalanceMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Transferring...
                      </>
                    ) : (
                      <>
                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                        Transfer Balance
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
