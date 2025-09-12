import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserDetails, deleteUserAccount } from '@/lib/api';
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

// Delete user account hook
export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => deleteUserAccount(userId),
    onSuccess: (data, userId) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['admin/user', userId] });
      queryClient.invalidateQueries({ queryKey: ['user-devices'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      console.log('User account deleted successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to delete user account:', error);
    },
  });
};
