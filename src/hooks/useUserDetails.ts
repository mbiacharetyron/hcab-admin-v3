import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '@/lib/api';
import type { UserDetailsResponse } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

// User details hook
export const useUserDetails = (userId: number) => {
  return useQuery({
    queryKey: ['admin/user', userId],
    queryFn: () => getUserDetails(userId),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.USER_DETAILS,
    staleTime: 300000, // Consider data stale after 5 minutes
    retry: 2,
    retryDelay: 1000,
    enabled: !!userId, // Only run query if userId is provided
  });
};
