import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPanicReports, resolvePanicReport } from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import type { PanicReportsResponse, PanicResolveResponse } from '@/lib/api';

export const usePanicReports = (params?: {
  status?: 'resolved' | 'unresolved';
  user_type?: 'driver' | 'rider';
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  lang?: string;
}) => {
  return useQuery<PanicReportsResponse, Error>({
    queryKey: ['admin/panic-reports', params],
    queryFn: () => getPanicReports(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.PANIC_REPORTS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useResolvePanicReport = () => {
  const queryClient = useQueryClient();

  return useMutation<PanicResolveResponse, Error, number>({
    mutationFn: (panicId: number) => resolvePanicReport(panicId),
    onSuccess: () => {
      // Invalidate and refetch panic reports
      queryClient.invalidateQueries({ queryKey: ['admin/panic-reports'] });
    },
    onError: (error) => {
      console.error('Failed to resolve panic report:', error);
    },
  });
};

export const usePanicManagementData = (params?: {
  status?: 'resolved' | 'unresolved';
  user_type?: 'driver' | 'rider';
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  lang?: string;
}) => {
  const panicReportsQuery = usePanicReports(params);
  const resolvePanicMutation = useResolvePanicReport();

  // Safely extract data with proper validation
  const response = panicReportsQuery.data;
  const panicReports = Array.isArray(response?.data) ? response.data : [];
  const statistics = response?.statistics || null;
  const pagination = response?.pagination || null;

  // Log data for debugging
  console.log('Panic Management Data:', {
    hasResponse: !!response,
    hasData: !!response?.data,
    dataType: Array.isArray(response?.data) ? 'array' : typeof response?.data,
    dataLength: Array.isArray(response?.data) ? response.data.length : 'N/A',
    hasStatistics: !!statistics,
    hasPagination: !!pagination,
    isLoading: panicReportsQuery.isLoading,
    error: panicReportsQuery.error
  });

  return {
    panicReports,
    statistics,
    pagination,
    isLoading: panicReportsQuery.isLoading,
    error: panicReportsQuery.error,
    refetch: panicReportsQuery.refetch,
    resolvePanic: resolvePanicMutation.mutate,
    isResolving: resolvePanicMutation.isPending,
    resolveError: resolvePanicMutation.error,
  };
};
