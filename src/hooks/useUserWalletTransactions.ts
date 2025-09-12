import { useQuery } from '@tanstack/react-query';
import { getUserWalletTransactions, UserWalletTransactionsResponse } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

export const useUserWalletTransactions = (
  userId: number,
  params?: {
    page?: number;
    per_page?: number;
    transaction_type?: 'deposit' | 'withdrawal' | 'payment' | 'refund' | 'transfer';
    payment_method?: 'MTN_MOMO' | 'ORANGE_MONEY' | 'STRIPE' | 'WALLET';
    status?: 'pending' | 'completed' | 'failed';
    start_date?: string;
    end_date?: string;
    min_amount?: number;
    max_amount?: number;
    search?: string;
    sort_by?: 'created_at' | 'amount' | 'transaction_type' | 'status';
    sort_order?: 'asc' | 'desc';
    lang?: string;
  }
) => {
  return useQuery<UserWalletTransactionsResponse, Error>({
    queryKey: ['userWalletTransactions', userId, params],
    queryFn: () => getUserWalletTransactions(userId, params),
    enabled: !!userId,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.WALLET_TRANSACTIONS || 30000,
    staleTime: 10000,
    retry: 2,
  });
};

export const useUserWalletTransactionsData = (
  userId: number,
  params?: Parameters<typeof useUserWalletTransactions>[1]
) => {
  const query = useUserWalletTransactions(userId, params);
  
  return {
    user: query.data?.data?.user,
    transactions: query.data?.data?.transactions || [],
    pagination: query.data?.data?.pagination,
    summary: query.data?.data?.summary,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    isError: query.isError,
  };
};


