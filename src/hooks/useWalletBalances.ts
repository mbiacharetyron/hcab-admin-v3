import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWalletBalances } from '@/lib/api';
import { API_CONFIG } from '@/config/api';
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

// Wallet Management API Types
export interface LockWalletRequest {
  reason: string;
  lang?: 'en' | 'fr';
}

export interface LockWalletResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    is_locked: boolean;
    lock_reason: string;
    locked_at: string;
    locked_by: number;
  };
}

export interface UnlockWalletRequest {
  lang?: 'en' | 'fr';
}

export interface UnlockWalletResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    is_locked: boolean;
    lock_reason: null;
    locked_at: null;
    locked_by: null;
  };
}

export interface TransferBalanceRequest {
  amount?: number;
  lang?: 'en' | 'fr';
}

export interface TransferBalanceResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    amount_transferred: number;
    new_available_balance: number;
    new_locked_balance: number;
    total_balance: number;
  };
}

// Wallet Management API Functions
const lockWallet = async (userId: number, data: LockWalletRequest): Promise<LockWalletResponse> => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/admin/wallets/${userId}/lock`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const unlockWallet = async (userId: number, data: UnlockWalletRequest): Promise<UnlockWalletResponse> => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/admin/wallets/${userId}/unlock`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const transferLockedBalance = async (userId: number, data: TransferBalanceRequest): Promise<TransferBalanceResponse> => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/admin/wallets/${userId}/transfer-locked-balance`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Wallet Management Hooks
export const useLockWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: LockWalletRequest }) => 
      lockWallet(userId, data),
    onSuccess: () => {
      // Invalidate wallet balances queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
    },
  });
};

export const useUnlockWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UnlockWalletRequest }) => 
      unlockWallet(userId, data),
    onSuccess: () => {
      // Invalidate wallet balances queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
    },
  });
};

export const useTransferLockedBalance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: TransferBalanceRequest }) => 
      transferLockedBalance(userId, data),
    onSuccess: () => {
      // Invalidate wallet balances queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['walletBalances'] });
    },
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
