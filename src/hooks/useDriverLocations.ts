import { useQuery } from '@tanstack/react-query';
import { getOnlineDriverCoordinates } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

export const useDriverLocations = () => {
  return useQuery({
    queryKey: ['admin/drivers/online-coordinates'],
    queryFn: getOnlineDriverCoordinates,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
    retry: 2,
    retryDelay: 1000,
  });
};
