import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '@/config/api';

// Types based on the API documentation
export interface Device {
  id: number;
  device_name: string;
  device_type: 'ios' | 'android' | 'web';
  device_model: string;
  os_version: string;
  app_version: string;
  is_active: boolean;
  last_active_at: string;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'rider' | 'driver' | 'admin';
  is_active: boolean;
  is_online: boolean;
  created_at: string;
  devices: Device[];
  device_count: number;
  active_device_count: number;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface DeviceTypes {
  ios: number;
  android: number;
  web: number;
}

export interface Summary {
  total_users: number;
  users_with_devices: number;
  total_devices: number;
  active_devices: number;
  device_types: DeviceTypes;
}

export interface UserDevicesResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: Pagination;
    summary: Summary;
  };
}

// API function to fetch users with devices
const getUserDevices = async (params?: {
  role?: 'rider' | 'driver' | 'admin';
  device_type?: 'ios' | 'android' | 'web';
  is_active?: boolean;
  device_active?: boolean;
  search?: string;
  sort_by?: 'name' | 'email' | 'created_at' | 'last_active_at' | 'device_count';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
  lang?: 'en' | 'fr';
}): Promise<UserDevicesResponse> => {
  // Demo mode fallback
  if (API_CONFIG.DEMO_MODE) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Demo data loaded successfully",
          data: {
            users: [
              {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                phone: "+1234567890",
                role: "rider",
                is_active: true,
                is_online: true,
                created_at: "2025-01-15T10:30:00.000000Z",
                devices: [
                  {
                    id: 1,
                    device_name: "John's iPhone",
                    device_type: "ios",
                    device_model: "iPhone 12",
                    os_version: "15.0",
                    app_version: "1.2.3",
                    is_active: true,
                    last_active_at: "2025-01-15T10:30:00.000000Z",
                    created_at: "2025-01-15T10:30:00.000000Z"
                  }
                ],
                device_count: 1,
                active_device_count: 1
              }
            ],
            pagination: {
              current_page: 1,
              last_page: 1,
              per_page: 15,
              total: 1
            },
            summary: {
              total_users: 1,
              users_with_devices: 1,
              total_devices: 1,
              active_devices: 1,
              device_types: {
                ios: 1,
                android: 0,
                web: 0
              }
            }
          }
        });
      }, 1000);
    });
  }

  const searchParams = new URLSearchParams();
  
  if (params?.role) searchParams.append('role', params.role);
  if (params?.device_type) searchParams.append('device_type', params.device_type);
  if (params?.is_active !== undefined) searchParams.append('is_active', params.is_active.toString());
  if (params?.device_active !== undefined) searchParams.append('device_active', params.device_active.toString());
  if (params?.search) searchParams.append('search', params.search);
  if (params?.sort_by) searchParams.append('sort_by', params.sort_by);
  if (params?.sort_order) searchParams.append('sort_order', params.sort_order);
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
  if (params?.lang) searchParams.append('lang', params.lang);

  const token = localStorage.getItem('admin_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/admin/users/devices?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Main hook for users with devices
export const useUserDevices = (params?: {
  role?: 'rider' | 'driver' | 'admin';
  device_type?: 'ios' | 'android' | 'web';
  is_active?: boolean;
  device_active?: boolean;
  search?: string;
  sort_by?: 'name' | 'email' | 'created_at' | 'last_active_at' | 'device_count';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
  lang?: 'en' | 'fr';
}) => {
  return useQuery({
    queryKey: ['user-devices', params],
    queryFn: () => getUserDevices(params),
    refetchInterval: API_CONFIG.REQUEST_CONFIG.REFETCH_INTERVALS.USER_DETAILS,
    staleTime: 30000, // Consider data stale after 30 seconds
    retry: 2,
    retryDelay: 1000,
  });
};

// Enhanced hook that provides structured data
export const useEnhancedUserDevices = (params?: Parameters<typeof useUserDevices>[0]) => {
  const userDevicesQuery = useUserDevices(params);
  
  return {
    users: userDevicesQuery.data?.data?.users || [],
    pagination: userDevicesQuery.data?.data?.pagination,
    summary: userDevicesQuery.data?.data?.summary,
    isLoading: userDevicesQuery.isLoading,
    error: userDevicesQuery.error,
    refetch: userDevicesQuery.refetch,
    isSuccess: userDevicesQuery.isSuccess,
  };
};

// Hook for device statistics only
export const useDeviceStatistics = () => {
  const { summary, isLoading, error } = useEnhancedUserDevices({ per_page: 1 });
  
  return {
    statistics: summary,
    isLoading,
    error,
  };
};

// Hook for users with specific device type
export const useUsersByDeviceType = (deviceType: 'ios' | 'android' | 'web') => {
  return useEnhancedUserDevices({ 
    device_type: deviceType,
    per_page: 50 
  });
};

// Hook for active devices only
export const useActiveDevices = () => {
  return useEnhancedUserDevices({ 
    device_active: true,
    per_page: 50 
  });
};
