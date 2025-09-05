import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sendNotification, sendTestNotification, getDevices, getNotificationLogs } from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import type { 
  NotificationRequest, 
  NotificationResponse, 
  DeviceInfo, 
  DeviceStats, 
  NotificationLog, 
  NotificationMetrics 
} from '@/lib/api';

export const useSendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<NotificationResponse, Error, NotificationRequest>({
    mutationFn: (request: NotificationRequest) => sendNotification(request),
    onSuccess: () => {
      // Invalidate notification logs to refresh data
      queryClient.invalidateQueries({ queryKey: ['admin/notification-logs'] });
    },
    onError: (error) => {
      console.error('Failed to send notification:', error);
    },
  });
};

export const useSendTestNotification = () => {
  return useMutation<NotificationResponse, Error, Parameters<typeof sendTestNotification>[0]>({
    mutationFn: (request) => sendTestNotification(request),
    onError: (error) => {
      console.error('Failed to send test notification:', error);
    },
  });
};

export const useDevices = (params?: {
  page?: number;
  limit?: number;
  device_type?: 'ios' | 'android' | 'web' | 'unknown';
  is_active?: boolean;
  user_id?: number;
}) => {
  return useQuery<{
    success: boolean;
    data: DeviceInfo[];
    pagination: {
      current_page: number;
      total_items: number;
      total_pages: number;
      limit: number;
    };
    statistics: DeviceStats;
  }, Error>({
    queryKey: ['admin/devices', params],
    queryFn: () => getDevices(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useNotificationLogs = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  success?: boolean;
  user_id?: number;
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery<{
    success: boolean;
    data: NotificationLog[];
    pagination: {
      current_page: number;
      total_items: number;
      total_pages: number;
      limit: number;
    };
    metrics: NotificationMetrics;
  }, Error>({
    queryKey: ['admin/notification-logs', params],
    queryFn: () => getNotificationLogs(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useNotificationManagement = (params?: {
  devicesPage?: number;
  devicesLimit?: number;
  logsPage?: number;
  logsLimit?: number;
  device_type?: 'ios' | 'android' | 'web' | 'unknown';
  is_active?: boolean;
  user_id?: number;
  type?: string;
  success?: boolean;
  start_date?: string;
  end_date?: string;
}) => {
  const devicesQuery = useDevices({
    page: params?.devicesPage,
    limit: params?.devicesLimit,
    device_type: params?.device_type,
    is_active: params?.is_active,
    user_id: params?.user_id,
  });

  const logsQuery = useNotificationLogs({
    page: params?.logsPage,
    limit: params?.logsLimit,
    type: params?.type,
    success: params?.success,
    user_id: params?.user_id,
    start_date: params?.start_date,
    end_date: params?.end_date,
  });

  const sendNotificationMutation = useSendNotification();
  const sendTestNotificationMutation = useSendTestNotification();

  return {
    // Devices data
    devices: devicesQuery.data?.data || [],
    deviceStats: devicesQuery.data?.statistics,
    devicesPagination: devicesQuery.data?.pagination,
    devicesLoading: devicesQuery.isLoading,
    devicesError: devicesQuery.error,
    refetchDevices: devicesQuery.refetch,

    // Notification logs data
    logs: logsQuery.data?.data || [],
    metrics: logsQuery.data?.metrics,
    logsPagination: logsQuery.data?.pagination,
    logsLoading: logsQuery.isLoading,
    logsError: logsQuery.error,
    refetchLogs: logsQuery.refetch,

    // Mutations
    sendNotification: sendNotificationMutation.mutate,
    sendTestNotification: sendTestNotificationMutation.mutate,
    isSending: sendNotificationMutation.isPending,
    isSendingTest: sendTestNotificationMutation.isPending,
    sendError: sendNotificationMutation.error,
    testError: sendTestNotificationMutation.error,

    // Combined loading state
    isLoading: devicesQuery.isLoading || logsQuery.isLoading,
    error: devicesQuery.error || logsQuery.error,
  };
};
