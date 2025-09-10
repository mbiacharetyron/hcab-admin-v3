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

  // Debug logging (can be enabled for troubleshooting)
  // console.log('🚨 HOOK DEBUG: usePanicManagementData called');

  // Safely extract data with proper validation
  const response = panicReportsQuery.data;

  // Enhanced data extraction with fallbacks
  let panicReports = [];
  let statistics = null;
  let pagination = null;

  if (response) {
    // Handle different response structures
    if (Array.isArray(response)) {
      // If response is directly an array
      panicReports = response;
      // console.log('🚨 HOOK DEBUG: Response is direct array, length =', panicReports.length);
    } else if (response.data) {
      // Standard structure with data property
      panicReports = Array.isArray(response.data) ? response.data : [];
      statistics = response.statistics || null;
      pagination = response.pagination || null;
      // console.log('🚨 HOOK DEBUG: Standard structure - reports:', panicReports.length, 'stats:', !!statistics, 'pagination:', !!pagination);
    } else if (response.panicReports) {
      // Real API structure - panicReports is directly in response
      panicReports = Array.isArray(response.panicReports) ? response.panicReports : [];
      statistics = response.statistics || null;
      pagination = response.pagination || null;
      // console.log('🚨 HOOK DEBUG: Real API structure - reports:', panicReports.length, 'stats:', !!statistics, 'pagination:', !!pagination);
    } else {
      // console.log('🚨 HOOK DEBUG: Unknown response structure:', Object.keys(response));
    }
  }

  // console.log('🚨 HOOK DEBUG: Final extracted data =', {
  //   panicReportsLength: panicReports.length,
  //   hasStatistics: !!statistics,
  //   hasPagination: !!pagination,
  //   isLoading: panicReportsQuery.isLoading,
  //   error: panicReportsQuery.error?.message
  // });

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
