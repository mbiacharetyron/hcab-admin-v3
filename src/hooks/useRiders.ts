import { useQuery } from '@tanstack/react-query';
import { getRiders } from '@/lib/api';
import type { RidersResponse } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

export const useRiders = (params?: {
  search?: string;
  is_validated?: 'validated' | 'invalidated' | 'all';
  is_active?: 'active' | 'inactive' | 'all';
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  lang?: string;
}) => {
  return useQuery({
    queryKey: ['admin/riders', params],
    queryFn: () => getRiders(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useEnhancedRiders = (params?: Parameters<typeof useRiders>[0]) => {
  const ridersQuery = useRiders(params);

  // Debug logging
  console.log('useEnhancedRiders Debug:', {
    rawData: ridersQuery.data,
    data: ridersQuery.data?.data,
    statistics: ridersQuery.data?.statistics,
    pagination: ridersQuery.data?.pagination,
    isLoading: ridersQuery.isLoading,
    error: ridersQuery.error
  });

  // Handle different possible data structures
  const riders = ridersQuery.data?.data || ridersQuery.data?.riders || [];
  const statistics = ridersQuery.data?.statistics || ridersQuery.data?.stats;
  const pagination = ridersQuery.data?.pagination || ridersQuery.data?.meta;

  return {
    riders,
    statistics,
    pagination,
    isLoading: ridersQuery.isLoading,
    error: ridersQuery.error,
    refetch: ridersQuery.refetch,
  };
};
