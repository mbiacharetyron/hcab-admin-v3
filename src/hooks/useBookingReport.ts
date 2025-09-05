import { useQuery } from '@tanstack/react-query';
import { getWeeklyRideStats, getAllRides } from '@/lib/api';
import type { WeeklyRideStatsResponse } from '@/lib/api';
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

export const useBookingReportData = () => {
  const weeklyStatsQuery = useWeeklyRideStats();
  const ridesQuery = useQuery({
    queryKey: ['admin/rides'],
    queryFn: getAllRides,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });

  return {
    weeklyStats: weeklyStatsQuery.data?.data,
    rides: ridesQuery.data?.data || [],
    ridesMeta: ridesQuery.data?.meta,
    isLoading: weeklyStatsQuery.isLoading || ridesQuery.isLoading,
    error: weeklyStatsQuery.error || ridesQuery.error,
    refetch: () => {
      weeklyStatsQuery.refetch();
      ridesQuery.refetch();
    },
  };
};
