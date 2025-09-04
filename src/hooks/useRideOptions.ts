import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getRideOptions, 
  getRideOption, 
  createRideOption, 
  updateRideOption, 
  deleteRideOption,
  assignDriverToRideOption,
  unassignDriverFromRideOption,
  getDriverRideOptions,
  getDriverRides
} from '@/lib/api';
import type { 
  RideOption, 
  DriverAssignmentRequest, 
  DriverRide 
} from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import { toast } from 'sonner';

// Ride Options List Hook
export const useRideOptions = (lang?: string) => {
  return useQuery({
    queryKey: ['admin/ride-options', lang],
    queryFn: () => getRideOptions(lang),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDE_OPTION_DETAILS,
    staleTime: 300000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

// Single Ride Option Hook
export const useRideOption = (id: number, lang?: string) => {
  return useQuery({
    queryKey: ['admin/ride-option', id, lang],
    queryFn: () => getRideOption(id, lang),
    staleTime: 300000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
    enabled: !!id,
  });
};

// Create Ride Option Hook
export const useCreateRideOption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createRideOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin/ride-options'] });
      toast.success('Ride option created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create ride option');
    },
  });
};

// Update Ride Option Hook
export const useUpdateRideOption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateRideOption>[1] }) => 
      updateRideOption(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin/ride-options'] });
      queryClient.invalidateQueries({ queryKey: ['admin/ride-option', id] });
      toast.success('Ride option updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update ride option');
    },
  });
};

// Delete Ride Option Hook
export const useDeleteRideOption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, lang }: { id: number; lang?: string }) => 
      deleteRideOption(id, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin/ride-options'] });
      toast.success('Ride option deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete ride option');
    },
  });
};

// Assign Driver Hook
export const useAssignDriver = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: assignDriverToRideOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin/ride-options'] });
      queryClient.invalidateQueries({ queryKey: ['admin/driver-ride-options'] });
      toast.success('Driver assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to assign driver');
    },
  });
};

// Unassign Driver Hook
export const useUnassignDriver = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: unassignDriverFromRideOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin/ride-options'] });
      queryClient.invalidateQueries({ queryKey: ['admin/driver-ride-options'] });
      toast.success('Driver unassigned successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to unassign driver');
    },
  });
};

// Driver Ride Options Hook
export const useDriverRideOptions = (driverId: number) => {
  return useQuery({
    queryKey: ['admin/driver-ride-options', driverId],
    queryFn: () => getDriverRideOptions(driverId),
    staleTime: 300000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
    enabled: !!driverId,
  });
};

// Driver Rides Hook
export const useDriverRides = (
  driverId: number, 
  params?: {
    status?: 'ongoing' | 'completed';
    start_date?: string;
    end_date?: string;
  }
) => {
  return useQuery({
    queryKey: ['admin/driver-rides', driverId, params],
    queryFn: () => getDriverRides(driverId, params),
    staleTime: 60000, // 1 minute
    retry: 2,
    retryDelay: 1000,
    enabled: !!driverId,
  });
};
