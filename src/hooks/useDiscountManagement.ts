import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getDiscounts, 
  getDiscount, 
  createDiscount, 
  updateDiscount, 
  deleteDiscount, 
  toggleDiscountStatus,
  getDiscountStats,
  getDiscountUsageHistory
} from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import type { 
  Discount, 
  DiscountCreateRequest, 
  DiscountUpdateRequest, 
  DiscountStats,
  DiscountUsage
} from '@/lib/api';

// Get all discounts with pagination and filtering
export const useDiscounts = (params?: {
  per_page?: number;
  search?: string;
  status?: boolean;
  lang?: string;
}) => {
  return useQuery({
    queryKey: ['admin/discounts', params],
    queryFn: () => getDiscounts(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

// Get single discount details
export const useDiscount = (id: number) => {
  return useQuery({
    queryKey: ['admin/discount', id],
    queryFn: () => getDiscount(id),
    enabled: !!id,
    staleTime: 300000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

// Get discount statistics
export const useDiscountStats = () => {
  return useQuery({
    queryKey: ['admin/discounts/stats'],
    queryFn: () => getDiscountStats(),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

// Get discount usage history
export const useDiscountUsageHistory = (params?: {
  per_page?: number;
  discount_id?: number;
  user_id?: number;
  lang?: string;
}) => {
  return useQuery({
    queryKey: ['admin/discounts/usage', params],
    queryFn: () => getDiscountUsageHistory(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};

// Create discount mutation
export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DiscountCreateRequest) => createDiscount(data),
    onSuccess: () => {
      // Invalidate and refetch discounts list
      queryClient.invalidateQueries({ queryKey: ['admin/discounts'] });
      queryClient.invalidateQueries({ queryKey: ['admin/discounts/stats'] });
    },
    onError: (error) => {
      console.error('Failed to create discount:', error);
    },
  });
};

// Update discount mutation
export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DiscountUpdateRequest }) => 
      updateDiscount(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch discounts list and specific discount
      queryClient.invalidateQueries({ queryKey: ['admin/discounts'] });
      queryClient.invalidateQueries({ queryKey: ['admin/discount', id] });
      queryClient.invalidateQueries({ queryKey: ['admin/discounts/stats'] });
    },
    onError: (error) => {
      console.error('Failed to update discount:', error);
    },
  });
};

// Delete discount mutation
export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDiscount(id),
    onSuccess: () => {
      // Invalidate and refetch discounts list
      queryClient.invalidateQueries({ queryKey: ['admin/discounts'] });
      queryClient.invalidateQueries({ queryKey: ['admin/discounts/stats'] });
    },
    onError: (error) => {
      console.error('Failed to delete discount:', error);
    },
  });
};

// Toggle discount status mutation
export const useToggleDiscountStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleDiscountStatus(id),
    onSuccess: (_, id) => {
      // Invalidate and refetch discounts list and specific discount
      queryClient.invalidateQueries({ queryKey: ['admin/discounts'] });
      queryClient.invalidateQueries({ queryKey: ['admin/discount', id] });
      queryClient.invalidateQueries({ queryKey: ['admin/discounts/stats'] });
    },
    onError: (error) => {
      console.error('Failed to toggle discount status:', error);
    },
  });
};

// Combined hook for discount management page
export const useDiscountManagement = (params?: {
  per_page?: number;
  search?: string;
  status?: boolean;
  lang?: string;
}) => {
  const discountsQuery = useDiscounts(params);
  const statsQuery = useDiscountStats();
  const createMutation = useCreateDiscount();
  const updateMutation = useUpdateDiscount();
  const deleteMutation = useDeleteDiscount();
  const toggleMutation = useToggleDiscountStatus();

  return {
    discounts: discountsQuery.data?.data || discountsQuery.data || [],
    pagination: {
      current_page: discountsQuery.data?.current_page || discountsQuery.data?.data?.current_page || 1,
      total: discountsQuery.data?.total || discountsQuery.data?.data?.total || 0,
      per_page: discountsQuery.data?.per_page || discountsQuery.data?.data?.per_page || 15,
    },
    statistics: statsQuery.data?.data,
    isLoading: discountsQuery.isLoading || statsQuery.isLoading,
    error: discountsQuery.error || statsQuery.error,
    refetch: () => {
      discountsQuery.refetch();
      statsQuery.refetch();
    },
    createDiscount: createMutation.mutate,
    updateDiscount: updateMutation.mutate,
    deleteDiscount: deleteMutation.mutate,
    toggleStatus: toggleMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isToggling: toggleMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    toggleError: toggleMutation.error,
  };
};
