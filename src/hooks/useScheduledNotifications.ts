import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getScheduledNotifications, 
  getScheduledNotification, 
  createScheduledNotification, 
  cancelScheduledNotification, 
  rescheduleNotification, 
  getScheduledNotificationStats 
} from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import type { 
  ScheduledNotificationsResponse, 
  ScheduledNotificationResponse, 
  ScheduledNotificationCreateRequest, 
  ScheduledNotificationRescheduleRequest,
  ScheduledNotificationStatsResponse 
} from '@/lib/api';

export const useScheduledNotifications = (params?: {
  status?: 'pending' | 'sent' | 'failed' | 'cancelled';
  target_type?: 'all' | 'specific_users' | 'user_type' | 'custom_query';
  user_type?: 'rider' | 'driver' | 'admin';
  notification_type?: 'push' | 'email' | 'sms' | 'all';
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
  per_page?: number;
  lang?: string;
}) => {
  return useQuery<ScheduledNotificationsResponse, Error>({
    queryKey: ['admin/scheduled-notifications', params],
    queryFn: () => getScheduledNotifications(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.NOTIFICATION_LOGS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useScheduledNotification = (id: number) => {
  return useQuery<ScheduledNotificationResponse, Error>({
    queryKey: ['admin/scheduled-notifications', id],
    queryFn: () => getScheduledNotification(id),
    enabled: !!id,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useScheduledNotificationStats = () => {
  return useQuery<ScheduledNotificationStatsResponse, Error>({
    queryKey: ['admin/scheduled-notifications/stats'],
    queryFn: () => getScheduledNotificationStats(),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useCreateScheduledNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ScheduledNotificationCreateRequest>({
    mutationFn: (data: ScheduledNotificationCreateRequest) => createScheduledNotification(data),
    onSuccess: () => {
      // Invalidate and refetch scheduled notifications
      queryClient.invalidateQueries({ queryKey: ['admin/scheduled-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['admin/scheduled-notifications/stats'] });
    },
    onError: (error) => {
      console.error('Failed to create scheduled notification:', error);
    },
  });
};

export const useCancelScheduledNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, number>({
    mutationFn: (id: number) => cancelScheduledNotification(id),
    onSuccess: () => {
      // Invalidate and refetch scheduled notifications
      queryClient.invalidateQueries({ queryKey: ['admin/scheduled-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['admin/scheduled-notifications/stats'] });
    },
    onError: (error) => {
      console.error('Failed to cancel scheduled notification:', error);
    },
  });
};

export const useRescheduleNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: number; data: ScheduledNotificationRescheduleRequest }>({
    mutationFn: ({ id, data }) => rescheduleNotification(id, data),
    onSuccess: () => {
      // Invalidate and refetch scheduled notifications
      queryClient.invalidateQueries({ queryKey: ['admin/scheduled-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['admin/scheduled-notifications/stats'] });
    },
    onError: (error) => {
      console.error('Failed to reschedule notification:', error);
    },
  });
};

export const useScheduledNotificationManagement = (params?: {
  status?: 'pending' | 'sent' | 'failed' | 'cancelled';
  target_type?: 'all' | 'specific_users' | 'user_type' | 'custom_query';
  user_type?: 'rider' | 'driver' | 'admin';
  notification_type?: 'push' | 'email' | 'sms' | 'all';
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
  per_page?: number;
  lang?: string;
}) => {
  const scheduledNotificationsQuery = useScheduledNotifications(params);
  const statsQuery = useScheduledNotificationStats();
  const createMutation = useCreateScheduledNotification();
  const cancelMutation = useCancelScheduledNotification();
  const rescheduleMutation = useRescheduleNotification();

  return {
    // Scheduled notifications data
    scheduledNotifications: scheduledNotificationsQuery.data?.data?.data || [],
    pagination: scheduledNotificationsQuery.data?.data,
    refetch: scheduledNotificationsQuery.refetch,

    // Statistics data
    stats: statsQuery.data?.data,
    statsLoading: statsQuery.isLoading,
    statsError: statsQuery.error,
    refetchStats: statsQuery.refetch,

    // Mutations
    createScheduledNotification: createMutation.mutate,
    cancelScheduledNotification: cancelMutation.mutate,
    rescheduleNotification: rescheduleMutation.mutate,
    isCreating: createMutation.isPending,
    isCancelling: cancelMutation.isPending,
    isRescheduling: rescheduleMutation.isPending,
    createError: createMutation.error,
    cancelError: cancelMutation.error,
    rescheduleError: rescheduleMutation.error,

    // Combined loading state
    isLoading: scheduledNotificationsQuery.isLoading || statsQuery.isLoading,
    error: scheduledNotificationsQuery.error || statsQuery.error,
  };
};
