import { useQuery } from '@tanstack/react-query';
import { getWeeklyRideStats, getAllRides } from '@/lib/api';
import type { WeeklyRideStatsResponse, BookingReportRide, BookingReportRidesResponse } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

export const useWeeklyRideStats = () => {
  return useQuery<WeeklyRideStatsResponse, Error>({
    queryKey: ['weekly-ride-stats'],
    queryFn: getWeeklyRideStats,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

export const useBookingReportData = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}) => {
  const weeklyStatsQuery = useWeeklyRideStats();
  const ridesQuery = useQuery<BookingReportRidesResponse, Error>({
    queryKey: ['admin/rides', params],
    queryFn: () => getAllRides(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });

  return {
    weeklyStats: weeklyStatsQuery.data?.data,
    rides: ridesQuery.data?.data || [],
    pagination: ridesQuery.data?.pagination,
    isLoading: weeklyStatsQuery.isLoading || ridesQuery.isLoading,
    error: weeklyStatsQuery.error || ridesQuery.error,
    refetch: () => {
      weeklyStatsQuery.refetch();
      ridesQuery.refetch();
    },
  };
};
