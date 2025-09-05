import { useQuery } from '@tanstack/react-query';
import { getWalletStats, getWalletTransactions, getS3PBalance } from '@/lib/api';
import type { WalletStatsResponse, WalletTransactionsResponse, S3PBalanceResponse } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

export const useWalletStats = () => {
  return useQuery<WalletStatsResponse, Error>({
    queryKey: ['admin/wallet-stats'],
    queryFn: getWalletStats,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

export const useWalletTransactions = (params?: {
  page?: number;
  limit?: number;
  transaction_type?: 'deposit' | 'withdrawal';
  status?: 'completed' | 'pending' | 'failed';
  payment_method?: string;
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery<WalletTransactionsResponse, Error>({
    queryKey: ['admin/wallet-transactions', params],
    queryFn: () => getWalletTransactions(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30 * 1000, // 30 seconds
    retry: 2,
    retryDelay: 1000,
  });
};

export const useS3PBalance = () => {
  return useQuery<S3PBalanceResponse, Error>({
    queryKey: ['admin/s3p-balance'],
    queryFn: getS3PBalance,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

// Combined hook for transaction report data
export const useTransactionReportData = (params?: {
  page?: number;
  limit?: number;
  transaction_type?: 'deposit' | 'withdrawal';
  status?: 'completed' | 'pending' | 'failed';
  payment_method?: string;
  start_date?: string;
  end_date?: string;
}) => {
  const walletStatsQuery = useWalletStats();
  const walletTransactionsQuery = useWalletTransactions(params);
  const s3pBalanceQuery = useS3PBalance();

  return {
    walletStats: walletStatsQuery.data?.data,
    transactions: walletTransactionsQuery.data?.data.transactions || [],
    pagination: walletTransactionsQuery.data?.data.meta,
    s3pBalance: s3pBalanceQuery.data?.data.balance,
    isLoading: walletStatsQuery.isLoading || walletTransactionsQuery.isLoading || s3pBalanceQuery.isLoading,
    error: walletStatsQuery.error || walletTransactionsQuery.error || s3pBalanceQuery.error,
    refetch: () => {
      walletStatsQuery.refetch();
      walletTransactionsQuery.refetch();
      s3pBalanceQuery.refetch();
    },
  };
};
