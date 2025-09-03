import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getAllRides, getUserDetails, getRideOptionDetails } from '@/lib/api';
import type { DashboardStats, Ride, User, RideOption } from '@/lib/api';
import { API_CONFIG } from '@/config/api';

// Dashboard stats hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.DASHBOARD_STATS,
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: 2, // Only retry 2 times to avoid infinite loops
    retryDelay: 1000, // Wait 1 second between retries
  });
};

// All rides hook
export const useAllRides = () => {
  return useQuery({
    queryKey: ['all-rides'],
    queryFn: getAllRides,
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDES,
    staleTime: 30000, // Consider data stale after 30 seconds
    retry: 2,
    retryDelay: 1000,
  });
};

// User details hook
export const useUserDetails = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDetails(userId),
    enabled: !!userId, // Only fetch if userId is provided
    staleTime: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.USER_DETAILS,
  });
};

// Ride option details hook
export const useRideOptionDetails = (rideOptionId: number) => {
  return useQuery({
    queryKey: ['ride-option', rideOptionId],
    queryFn: () => getRideOptionDetails(rideOptionId),
    enabled: !!rideOptionId, // Only fetch if rideOptionId is provided
    staleTime: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.RIDE_OPTION_DETAILS,
  });
};

// Enhanced rides hook with user and ride option details
export const useEnhancedRides = () => {
  const { data: ridesResponse, isLoading, error } = useAllRides();
  
  // Extract rides array from the response
  const rides = ridesResponse?.data || [];
  
  // Get unique user IDs and ride option IDs
  const userIds = [...new Set(rides.map(ride => ride.rider_id))];
  const rideOptionIds = [...new Set(rides.map(ride => ride.ride_option_id))];
  
  // Fetch user details for all unique users
  const userQueries = userIds.map(userId => useUserDetails(userId));
  const rideOptionQueries = rideOptionIds.map(rideOptionId => useRideOptionDetails(rideOptionId));
  
  // Check if all queries are loaded
  const allUsersLoaded = userQueries.every(query => !query.isLoading);
  const allRideOptionsLoaded = rideOptionQueries.every(query => !query.isLoading);
  
  // Create lookup maps
  const usersMap = new Map<number, User>();
  const rideOptionsMap = new Map<number, RideOption>();
  
  userQueries.forEach(query => {
    if (query.data) {
      usersMap.set(query.data.id, query.data);
    }
  });
  
  rideOptionQueries.forEach(query => {
    if (query.data) {
      rideOptionsMap.set(query.data.id, query.data);
    }
  });
  
  // Enhance rides with user and ride option data
  const enhancedRides = rides.map(ride => ({
    ...ride,
    user: usersMap.get(ride.rider_id),
    rideOption: rideOptionsMap.get(ride.ride_option_id),
  }));
  
  return {
    rides: enhancedRides,
    meta: ridesResponse?.meta,
    isLoading: isLoading || !allUsersLoaded || !allRideOptionsLoaded,
    error,
    refetch: () => {
      // Refetch all related data
      userQueries.forEach(query => query.refetch());
      rideOptionQueries.forEach(query => query.refetch());
    }
  };
};

