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
  route_data?: Record<string, unknown>;
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

export interface CarDetails {
  id: number;
  user_id: number;
  car_brand: string;
  car_brand_model: string;
  model_year: string;
  car_color: string;
  license_plate: string;
  seat_number: number;
  created_at: string;
  updated_at: string;
}

export interface BankDetails {
  id: number;
  user_id: number;
  bank_name: string;
  account_number: number;
  ifsc_code: string;
  beneficiary_name: string;
  created_at: string;
  updated_at: string;
}

export interface DriverDocuments {
  id: number;
  user_id: number;
  license_number: string;
  license_front_side: string;
  license_back_side: string;
  expiry_date: string;
  insurance_number: string;
  insurance_expiry_date: string;
  insurance_image: string;
  car_registration: string | null;
  car_registration_expiry_date: string;
  car_registration_photo: string;
  car_inspection_date: string;
  car_inspection_photo: string;
  id_document_type: string;
  id_document_number: string;
  id_document_front: string;
  id_document_back: string;
  created_at: string;
  updated_at: string;
}

export interface DetailedUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  role: string;
  cab_mode: string | null;
  in_drive: boolean;
  image: string;
  is_active: boolean;
  otp_verified: boolean;
  bank_submitted: boolean;
  car_submitted: boolean;
  doc_submitted: boolean;
  car_photos_submitted: boolean;
  id_document_submitted: boolean;
  license_submitted: boolean;
  insurance_submitted: boolean;
  registration_submitted: boolean;
  car_inspection_submitted: boolean;
  is_online: boolean;
  is_validated: boolean;
  last_login_at: string;
  has_active_passcode: boolean;
  passcode_activated_at: string | null;
  passcode_last_used_at: string | null;
  passcode_attempts: number;
  passcode_locked_until: string | null;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
  deleted_at: string | null;
  referral_code: string;
  referred_by: string | null;
  language: string;
  car_details: CarDetails;
  bank_details: BankDetails;
  driver_documents: DriverDocuments;
}

export interface UserDetailsResponse {
  message: string;
  data: DetailedUser;
  code: number;
}

export interface RideClass {
  id: number;
  name: string;
  description: string;
}

export interface RideOption {
  id: number;
  name: string;
  ride_class_id: number;
  base_price: number;
  price_per_km: number;
  seat_capacity: number;
  description: string;
  created_at: string;
  updated_at: string;
  ride_class?: RideClass;
  is_assigned?: boolean;
}

export interface RideOptionsResponse {
  success: boolean;
  message: string;
  data: RideOption[];
}

export interface RideOptionResponse {
  success: boolean;
  message: string;
  data: RideOption;
}

export interface DriverAssignmentRequest {
  ride_option_id: number;
  driver_id: number;
}

export interface DriverAssignmentResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface DriverRide {
  id: number;
  booking_id: number;
  rider_id: number;
  driver_id: number;
  pickup_location: string;
  dropoff_location: string;
  status: string;
  fare: number;
  duration: number;
  started_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export interface DriverRidesResponse {
  success: boolean;
  message: string;
  data: DriverRide[];
}

export interface Rider {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  role: string;
  is_online: boolean;
  is_validated: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RidersResponse {
  success: boolean;
  message: string;
  data: Rider[];
  statistics: {
    total_riders: number;
    online_riders: number;
    offline_riders: number;
    validated_riders: number;
    active_riders: number;
  };
  pagination: {
    current_page: number;
    total_items: number;
    total_pages: number;
    limit: number;
  };
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
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers as Record<string, string>),
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
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
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
      
      let lastError: Error;
      
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
  async getAllRides(): Promise<{ data: Ride[]; meta: Record<string, unknown> }> {
    try {
      console.log('API: Fetching rides from:', `${this.baseURL}/admin/rides`);
      const result = await this.request<{ data: Ride[]; meta: Record<string, unknown> }>('/admin/rides');
      console.log('API: Rides response:', result);
      return result;
    } catch (error) {
      console.error('API: Rides fetch error:', error);
      throw error;
    }
  }

  // User Details
  async getUserDetails(userId: number): Promise<UserDetailsResponse> {
    try {
      console.log('API: Fetching user details from:', `${this.baseURL}/admin/user/${userId}`);
      const result = await this.request<UserDetailsResponse>(`/admin/user/${userId}`);
      console.log('API: User details response:', result);
      return result;
    } catch (error) {
      console.error('API: User details fetch error:', error);
      throw error;
    }
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

      const endpoint = `/admin/drivers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
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
      console.log('API: Fetching online driver coordinates from:', `${this.baseURL}/admin/drivers/online-coordinates`);
      const result = await this.request<{ success: boolean; message: string; data: OnlineDriverCoordinates[] }>('/admin/drivers/online-coordinates');
      console.log('API: Online driver coordinates response:', result);
      return result;
    } catch (error) {
      console.error('API: Online driver coordinates fetch error:', error);
      throw error;
    }
  }

  // Ride Options Management
  async getRideOptions(lang?: string): Promise<RideOptionsResponse> {
    try {
      const endpoint = `/admin/ride-option${lang ? `?lang=${lang}` : ''}`;
      console.log('API: Fetching ride options from:', `${this.baseURL}${endpoint}`);
      const result = await this.request<RideOptionsResponse>(endpoint);
      console.log('API: Ride options response:', result);
      return result;
    } catch (error) {
      console.error('API: Ride options fetch error:', error);
      throw error;
    }
  }

  async getRideOption(id: number, lang?: string): Promise<RideOptionResponse> {
    try {
      const endpoint = `/admin/ride-option/${id}${lang ? `?lang=${lang}` : ''}`;
      console.log('API: Fetching ride option from:', `${this.baseURL}${endpoint}`);
      const result = await this.request<RideOptionResponse>(endpoint);
      console.log('API: Ride option response:', result);
      return result;
    } catch (error) {
      console.error('API: Ride option fetch error:', error);
      throw error;
    }
  }

  async createRideOption(data: {
    name: string;
    ride_class_id: number;
    base_price: number;
    price_per_km: number;
    seat_capacity: number;
    description?: string;
    lang?: string;
  }): Promise<RideOptionResponse> {
    try {
      console.log('API: Creating ride option:', data);
      const result = await this.request<RideOptionResponse>('/admin/ride-option', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('API: Ride option created:', result);
      return result;
    } catch (error) {
      console.error('API: Ride option creation error:', error);
      throw error;
    }
  }

  async updateRideOption(id: number, data: {
    name: string;
    ride_class_id: number;
    base_price: number;
    price_per_km: number;
    seat_capacity: number;
    description?: string;
    lang?: string;
  }): Promise<RideOptionResponse> {
    try {
      console.log('API: Updating ride option:', id, data);
      const result = await this.request<RideOptionResponse>(`/admin/ride-option/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      console.log('API: Ride option updated:', result);
      return result;
    } catch (error) {
      console.error('API: Ride option update error:', error);
      throw error;
    }
  }

  async deleteRideOption(id: number, lang?: string): Promise<{ success: boolean; message: string }> {
    try {
      const endpoint = `/admin/ride-option/${id}${lang ? `?lang=${lang}` : ''}`;
      console.log('API: Deleting ride option:', `${this.baseURL}${endpoint}`);
      const result = await this.request<{ success: boolean; message: string }>(endpoint, {
        method: 'DELETE',
      });
      console.log('API: Ride option deleted:', result);
      return result;
    } catch (error) {
      console.error('API: Ride option deletion error:', error);
      throw error;
    }
  }

  // Driver Assignment Management
  async assignDriverToRideOption(data: DriverAssignmentRequest): Promise<DriverAssignmentResponse> {
    try {
      console.log('API: Assigning driver to ride option:', data);
      const result = await this.request<DriverAssignmentResponse>('/admin/ride-option/assign-driver', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('API: Driver assigned:', result);
      return result;
    } catch (error) {
      console.error('API: Driver assignment error:', error);
      throw error;
    }
  }

  async unassignDriverFromRideOption(data: DriverAssignmentRequest): Promise<DriverAssignmentResponse> {
    try {
      console.log('API: Unassigning driver from ride option:', data);
      const result = await this.request<DriverAssignmentResponse>('/admin/ride-option/unassign-driver', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('API: Driver unassigned:', result);
      return result;
    } catch (error) {
      console.error('API: Driver unassignment error:', error);
      throw error;
    }
  }

  async getDriverRideOptions(driverId: number): Promise<RideOptionsResponse> {
    try {
      console.log('API: Fetching driver ride options for driver:', driverId);
      const result = await this.request<RideOptionsResponse>(`/admin/ride-options/driver/${driverId}`);
      console.log('API: Driver ride options response:', result);
      return result;
    } catch (error) {
      console.error('API: Driver ride options fetch error:', error);
      throw error;
    }
  }

  async getDriverRides(driverId: number, params?: {
    status?: 'ongoing' | 'completed';
    start_date?: string;
    end_date?: string;
  }): Promise<DriverRidesResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);

      const endpoint = `/admin/driver/${driverId}/rides${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('API: Fetching driver rides from:', `${this.baseURL}${endpoint}`);
      const result = await this.request<DriverRidesResponse>(endpoint);
      console.log('API: Driver rides response:', result);
      return result;
    } catch (error) {
      console.error('API: Driver rides fetch error:', error);
      throw error;
    }
  }

  // Riders Management
  async getRiders(params?: {
    search?: string;
    is_validated?: 'validated' | 'invalidated' | 'all';
    is_active?: 'active' | 'inactive' | 'all';
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
    lang?: string;
  }): Promise<RidersResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.is_validated && params.is_validated !== 'all') queryParams.append('is_validated', params.is_validated);
      if (params?.is_active && params.is_active !== 'all') queryParams.append('is_active', params.is_active);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.lang) queryParams.append('lang', params.lang);

      const endpoint = `/admin/riders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('API: Fetching riders from:', `${this.baseURL}${endpoint}`);
      const result = await this.request<RidersResponse>(endpoint);
      console.log('API: Riders response:', result);
      console.log('API: Riders response structure:', {
        success: result.success,
        message: result.message,
        hasData: !!result.data,
        dataLength: result.data?.length,
        hasStatistics: !!result.statistics,
        hasPagination: !!result.pagination
      });
      return result;
    } catch (error) {
      console.error('API: Riders fetch error:', error);
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

// Ride Options API exports
export const getRideOptions = (lang?: string) => apiService.getRideOptions(lang);
export const getRideOption = (id: number, lang?: string) => apiService.getRideOption(id, lang);
export const createRideOption = (data: Parameters<typeof apiService.createRideOption>[0]) => apiService.createRideOption(data);
export const updateRideOption = (id: number, data: Parameters<typeof apiService.updateRideOption>[1]) => apiService.updateRideOption(id, data);
export const deleteRideOption = (id: number, lang?: string) => apiService.deleteRideOption(id, lang);
export const assignDriverToRideOption = (data: DriverAssignmentRequest) => apiService.assignDriverToRideOption(data);
export const unassignDriverFromRideOption = (data: DriverAssignmentRequest) => apiService.unassignDriverFromRideOption(data);
export const getDriverRideOptions = (driverId: number) => apiService.getDriverRideOptions(driverId);
export const getDriverRides = (driverId: number, params?: Parameters<typeof apiService.getDriverRides>[1]) => apiService.getDriverRides(driverId, params);

// Riders API exports
export const getRiders = (params?: Parameters<typeof apiService.getRiders>[0]) => apiService.getRiders(params);
