import { useQuery } from '@tanstack/react-query';
import { getDrivers, getOnlineDriverCoordinates } from '@/lib/api';
import type { DriversResponse, OnlineDriverCoordinates } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

// Drivers list hook with filtering and pagination
export const useDrivers = (params?: {
  search?: string;
  online_status?: 'online' | 'offline' | 'all';
  validated?: 'validated' | 'invalidated' | 'all';
  page?: number;
  limit?: number;
  lang?: string;
}) => {
  return useQuery({
    queryKey: ['drivers', params],
    queryFn: () => getDrivers(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES, // Use rides interval for now
    staleTime: 30000, // Consider data stale after 30 seconds
    retry: 2,
    retryDelay: 1000,
  });
};

// Online driver coordinates hook for map display
export const useOnlineDriverCoordinates = () => {
  return useQuery({
    queryKey: ['online-driver-coordinates'],
    queryFn: getOnlineDriverCoordinates,
    refetchInterval: 10000, // Refresh every 10 seconds for real-time map updates
    staleTime: 5000, // Consider data stale after 5 seconds
    retry: 2,
    retryDelay: 1000,
  });
};

// Enhanced drivers hook that combines drivers data with statistics
export const useEnhancedDrivers = (params?: Parameters<typeof useDrivers>[0]) => {
  const driversQuery = useDrivers(params);
  
  return {
    drivers: driversQuery.data?.drivers || [],
    statistics: driversQuery.data?.statistics,
    pagination: driversQuery.data?.pagination,
    isLoading: driversQuery.isLoading,
    error: driversQuery.error,
    refetch: driversQuery.refetch,
  };
};
