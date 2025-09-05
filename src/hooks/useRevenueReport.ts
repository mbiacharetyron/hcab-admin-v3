import { useQuery } from '@tanstack/react-query';
import { getRevenueStats, getRevenueRides } from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import type { RevenueStatsResponse, RevenueRidesResponse } from '@/lib/api';

export const useRevenueStats = () => {
  return useQuery<RevenueStatsResponse, Error>({
    queryKey: ['admin/revenue-stats'],
    queryFn: getRevenueStats,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useRevenueRides = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery<RevenueRidesResponse, Error>({
    queryKey: ['admin/revenue-rides', params],
    queryFn: () => getRevenueRides(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useRevenueReportData = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}) => {
  const revenueStatsQuery = useRevenueStats();
  const revenueRidesQuery = useRevenueRides(params);

  return {
    revenueStats: revenueStatsQuery.data?.data,
    rides: revenueRidesQuery.data?.data.data || [],
    pagination: {
      current_page: revenueRidesQuery.data?.data.current_page || 1,
      total_items: revenueRidesQuery.data?.data.total || 0,
      total_pages: revenueRidesQuery.data?.data.last_page || 1,
      limit: revenueRidesQuery.data?.data.per_page || 15,
    },
    isLoading: revenueStatsQuery.isLoading || revenueRidesQuery.isLoading,
    error: revenueStatsQuery.error || revenueRidesQuery.error,
    refetch: () => {
      revenueStatsQuery.refetch();
      revenueRidesQuery.refetch();
    },
  };
};
