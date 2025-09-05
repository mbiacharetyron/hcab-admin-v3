import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { validateDriver, getDriverValidationStatus } from '@/lib/api';
import type { DriverValidationRequest, DriverValidationStatus } from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import { toast } from 'sonner';

// Get Driver Validation Status Hook
export const useDriverValidationStatus = (driverId: number, lang?: string) => {
  return useQuery({
    queryKey: ['driver-validation-status', driverId, lang],
    queryFn: () => getDriverValidationStatus(driverId, lang),
    staleTime: 300000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
    enabled: !!driverId,
  });
};

// Validate Driver Hook
export const useValidateDriver = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ driverId, data }: { driverId: number; data: DriverValidationRequest }) => 
      validateDriver(driverId, data),
    onSuccess: (_, { driverId }) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['driver-validation-status', driverId] });
      queryClient.invalidateQueries({ queryKey: ['user-details', driverId] });
      queryClient.invalidateQueries({ queryKey: ['admin/drivers'] });
      
      toast.success('Driver validation completed successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to validate driver');
    },
  });
};
