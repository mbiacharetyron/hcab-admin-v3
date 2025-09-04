import { API_CONFIG } from '@/config/api';

// API Base URL - Use the main API for auth and dashboard stats
const API_BASE_URL = API_CONFIG.BASE_URL;

// Demo mode flag - set to true to use demo data instead of real API calls
const DEMO_MODE = API_CONFIG.DEMO_MODE;

// Types
export interface DashboardStats {
  ongoing_trips: number;
  online_drivers: number;
  pending_trips: number;
  panics: number;
}

export interface Ride {
  id: number;
  rider_id: number;
  driver_id?: number;
  source_name: string;
  source_lat: string;
  source_lng: string;
  destination_name: string;
  destination_lat: string;
  destination_lng: string;
  booking_time: string;
  status: string;
  ride_type: string;
  total_seats?: number;
  available_seats?: number;
  route_data?: any;
  waiting_until?: string;
  is_shared_ride: boolean;
  shared_ride_price?: string;
  total_shared_price?: string;
  cancelled_by?: number;
  ride_option_id: number;
  discount_id?: number;
  promo_code?: string;
  ride_fare: string;
  original_fare: string;
  discount_amount: string;
  final_fare: string;
  discount_details?: {
    discount_name?: string;
    discount_type?: string;
    discount_value?: string;
    discount_percentage: number;
  };
  driver_fare: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
  trip_start_time?: string;
  trip_end_time?: string;
  trip_duration?: string;
  is_paid: boolean;
  deleted_at?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface RideOption {
  id: number;
  name: string;
  description: string;
  base_fare?: number;
  per_km_rate?: number;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  is_online: boolean;
  is_validated: boolean;
  created_at: string;
}

export interface DriversResponse {
  message: string;
  statistics: {
    total_drivers: number;
    online_drivers: number;
    offline_drivers: number;
    validated_drivers: number;
  };
  drivers: Driver[];
  pagination: {
    current_page: number;
    total_items: number;
    total_pages: number;
    limit: number;
  };
}

export interface OnlineDriverCoordinates {
  id: number;
  username: string;
  latitude: number;
  longitude: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Import demo data
import { 
  demoDashboardStats, 
  demoRides, 
  demoUsers, 
  demoRideOptions,
  getDemoEnhancedRides 
} from './demoData';

// API Service Class
class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('hcab_admin_token') || localStorage.getItem('admin_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // For authentication endpoints, never use demo mode - always make real API calls
    if (endpoint.startsWith('/auth/')) {
      const url = `${this.baseURL}${endpoint}`;
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const config: RequestInit = {
        ...options,
        headers,
      };

      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    }

    // If in demo mode, return demo data for non-auth endpoints
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      switch (endpoint) {
        case '/dashboard/stats':
          return demoDashboardStats as T;
        case '/rides':
          return demoRides as T;
        case '/user/1':
          return demoUsers[0] as T;
        case '/user/2':
          return demoUsers[1] as T;
        case '/user/3':
          return demoUsers[2] as T;
        case '/ride-option/1':
          return demoRideOptions[0] as T;
        case '/ride-option/2':
          return demoRideOptions[1] as T;
        case '/ride-option/3':
          return demoRideOptions[2] as T;
        default:
          throw new Error(`Demo endpoint not found: ${endpoint}`);
      }
    }

    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      // Add timeout support
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorMessage = response.status === 401 
          ? 'Unauthorized - Please login again'
          : response.status === 403 
          ? 'Forbidden - Insufficient permissions'
          : response.status === 404 
          ? 'Endpoint not found'
          : response.status === 500 
          ? 'Internal server error'
          : `HTTP error! status: ${response.status}`;
          
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Validate response structure for dashboard stats
      if (endpoint === '/dashboard/stats' && data.data) {
        const requiredFields = ['ongoing_trips', 'online_drivers', 'pending_trips', 'panics'];
        const missingFields = requiredFields.filter(field => !(field in data.data));
        
        if (missingFields.length > 0) {
          console.warn('Dashboard stats response missing fields:', missingFields);
        }
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - API is taking too long to respond');
        }
        throw error;
      }
      
      throw new Error('Network error - Unable to connect to API');
    }
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<{ data: DashboardStats; message: string; code: number }> {
    try {
      // Try different possible endpoints
      const endpoints = [
        '/admin/dashboard/stats'
        // '/dashboard/stats',
        // '/admin/stats'
      ];
      
      let lastError: any;
      
      for (const endpoint of endpoints) {
        try {
          console.log('API: Trying endpoint:', endpoint);
          const result = await this.request<{ data: DashboardStats; message: string; code: number }>(endpoint);
          console.log('API: Dashboard stats response from', endpoint, ':', result);
          return result;
        } catch (error) {
          console.log('API: Endpoint', endpoint, 'failed:', error);
          lastError = error;
          continue;
        }
      }
      
      // If all endpoints fail, throw the last error
      throw lastError || new Error('All dashboard stats endpoints failed');
    } catch (error) {
      console.error('API: All dashboard stats endpoints failed:', error);
      throw error;
    }
  }

  // All Rides
  async getAllRides(): Promise<{ data: Ride[]; meta: any }> {
    try {
      console.log('API: Fetching rides from:', `${this.baseURL}/admin/rides`);
      const result = await this.request<{ data: Ride[]; meta: any }>('/admin/rides');
      console.log('API: Rides response:', result);
      return result;
    } catch (error) {
      console.error('API: Rides fetch error:', error);
      throw error;
    }
  }

  // User Details
  async getUserDetails(userId: number): Promise<User> {
    return this.request<User>(`/user/${userId}`);
  }

  // Ride Option Details
  async getRideOptionDetails(rideOptionId: number): Promise<RideOption> {
    return this.request<RideOption>(`/ride-option/${rideOptionId}`);
  }

  // Drivers Management
  async getDrivers(params?: {
    search?: string;
    online_status?: 'online' | 'offline' | 'all';
    validated?: 'validated' | 'invalidated' | 'all';
    page?: number;
    limit?: number;
    lang?: string;
  }): Promise<DriversResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.search) queryParams.append('search', params.search);
      if (params?.online_status) queryParams.append('online_status', params.online_status);
      if (params?.validated) queryParams.append('validated', params.validated);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.lang) queryParams.append('lang', params.lang);

      const endpoint = `/drivers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('API: Fetching drivers from:', `${this.baseURL}${endpoint}`);
      
      const result = await this.request<DriversResponse>(endpoint);
      console.log('API: Drivers response:', result);
      return result;
    } catch (error) {
      console.error('API: Drivers fetch error:', error);
      throw error;
    }
  }

  // Get Online Driver Coordinates
  async getOnlineDriverCoordinates(): Promise<{ success: boolean; message: string; data: OnlineDriverCoordinates[] }> {
    try {
      console.log('API: Fetching online driver coordinates from:', `${this.baseURL}/drivers/online-coordinates`);
      const result = await this.request<{ success: boolean; message: string; data: OnlineDriverCoordinates[] }>('/drivers/online-coordinates');
      console.log('API: Online driver coordinates response:', result);
      return result;
    } catch (error) {
      console.error('API: Online driver coordinates fetch error:', error);
      throw error;
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('hcab_admin_token', token);
    // Keep backward compatibility
    localStorage.setItem('admin_token', token);
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('hcab_admin_token');
    localStorage.removeItem('admin_token');
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Check if in demo mode
  isDemoMode(): boolean {
    return DEMO_MODE;
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual functions for convenience
export const getDashboardStats = () => apiService.getDashboardStats();
export const getAllRides = () => apiService.getAllRides();
export const getUserDetails = (userId: number) => apiService.getUserDetails(userId);
export const getRideOptionDetails = (rideOptionId: number) => apiService.getRideOptionDetails(rideOptionId);
export const getDrivers = (params?: Parameters<typeof apiService.getDrivers>[0]) => apiService.getDrivers(params);
export const getOnlineDriverCoordinates = () => apiService.getOnlineDriverCoordinates();
