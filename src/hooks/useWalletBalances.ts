import { useQuery } from '@tanstack/react-query';
import { getWalletBalances } from '@/lib/api';
import type { 
  WalletBalancesResponse, 
  WalletBalanceUser, 
  WalletBalanceSummary, 
  WalletBalancePagination 
} from '@/lib/api';

interface UseWalletBalancesParams {
  role?: 'rider' | 'driver' | 'admin';
  min_balance?: number;
  max_balance?: number;
  balance_type?: 'available' | 'locked' | 'total';
  is_active?: boolean;
  is_online?: boolean;
  has_passcode?: boolean;
  search?: string;
  sort_by?: 'name' | 'email' | 'available_balance' | 'locked_balance' | 'total_balance' | 'created_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
  lang?: 'en' | 'fr';
}

export const useWalletBalances = (params?: UseWalletBalancesParams) => {
  return useQuery<WalletBalancesResponse>({
    queryKey: ['walletBalances', params],
    queryFn: () => getWalletBalances(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useWalletBalanceManagement = (params?: UseWalletBalancesParams) => {
  const walletBalancesQuery = useWalletBalances(params);

  return {
    // Wallet balances data
    users: walletBalancesQuery.data?.data?.users || [],
    pagination: walletBalancesQuery.data?.data?.pagination,
    summary: walletBalancesQuery.data?.data?.summary,
    isLoading: walletBalancesQuery.isLoading,
    error: walletBalancesQuery.error,
    refetch: walletBalancesQuery.refetch,
  };
};
