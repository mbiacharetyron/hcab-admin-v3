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

// Driver Validation Types
export interface DriverValidationRequest {
  action: 'approve' | 'reject';
  reason: string;
  admin_notes?: string;
  lang?: string;
}

export interface DriverValidationResponse {
  success: boolean;
  message: string;
  data: {
    driver_id: number;
    driver_name: string;
    driver_email: string;
    action: 'approve' | 'reject';
    is_validated: boolean;
    validated_at: string;
    validated_by: number;
    validated_by_name: string;
    reason: string;
    admin_notes?: string;
  };
}

export interface DriverValidationStatus {
  driver: {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    is_validated: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  submission_status: {
    doc_submitted: boolean;
    car_submitted: boolean;
    bank_submitted: boolean;
    car_photos_submitted: boolean;
    id_document_submitted: boolean;
    license_submitted: boolean;
    insurance_submitted: boolean;
    registration_submitted: boolean;
    car_inspection_submitted: boolean;
  };
  completion_percentage: number;
  missing_requirements: string[];
  can_be_validated: boolean;
  documents: {
    license_number?: string;
    license_expiry?: string;
    insurance_number?: string;
    insurance_expiry?: string;
    car_registration?: string;
    car_registration_expiry?: string;
    car_inspection_date?: string;
    id_document_type?: string;
    id_document_number?: string;
  };
  car_details: {
    car_brand?: string;
    car_model?: string;
    model_year?: string;
    car_color?: string;
    license_plate?: string;
    vin_number?: string;
    seat_number?: number;
  };
  bank_details: {
    bank_name?: string;
    account_number?: string;
    account_holder_name?: string;
  };
}

export interface DriverValidationStatusResponse {
  success: boolean;
  message: string;
  data: DriverValidationStatus;
}

// Booking Report Types
export interface WeeklyRideStats {
  total_booked: number;
  completed: number;
  scheduled: number;
  cancelled: number;
}

export interface PercentageChange {
  total_booked: number;
  completed: number;
  scheduled: number;
  cancelled: number;
}

export interface PercentageRide {
  completed: number;
  scheduled: number;
  cancelled: number;
}

export interface WeeklyRideStatsData {
  current_week: WeeklyRideStats;
  previous_week: WeeklyRideStats;
  percentage_change: PercentageChange;
  percentage_ride: PercentageRide;
}

export interface WeeklyRideStatsResponse {
  message: string;
  data: WeeklyRideStatsData;
  code: number;
}

// Booking Report Ride Interface (matches actual API response)
export interface BookingReportRide {
  id: number;
  booking_id: number;
  status: string;
  ride_fare: string;
  distance: string | null;
  duration: string | null;
  source_name: string;
  destination_name: string;
  source_lat: string;
  source_lng: string;
  destination_lat: string;
  destination_lng: string;
  booking_time: string;
  trip_start_time: string | null;
  trip_end_time: string | null;
  created_at: string;
  updated_at: string;
  rider?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    is_active: boolean;
    is_validated: boolean;
  };
  driver?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    is_active: boolean;
    is_validated: boolean;
    is_online: boolean;
  } | null;
  ride_option?: {
    id: number;
    name: string;
    base_price: string;
    price_per_km: string;
    seat_capacity: number;
    description: string;
  };
}

export interface BookingReportRidesResponse {
  success: boolean;
  message: string;
  data: BookingReportRide[];
  pagination: {
    current_page: number;
    total_items: number;
    total_pages: number;
    limit: number;
  };
}

// Transaction Report Types
export interface WalletStats {
  total_balance: number;
  current_week: {
    withdrawals: number;
    deposits: number;
    pending: number;
  };
  previous_week: {
    withdrawals: number;
    deposits: number;
    pending: number;
  };
  percentage_change: {
    withdrawals: number;
    deposits: number;
    pending: number;
  };
}

export interface WalletStatsResponse {
  message: string;
  data: WalletStats;
  code: number;
}

export interface WalletTransaction {
  id: number;
  user_id: number;
  booking_id: number | null;
  transaction_type: 'deposit' | 'withdrawal';
  message: string | null;
  error_code: string | null;
  transaction_id: string;
  s3p_ptn: string | null;
  payment_method: string;
  phone_number: string | null;
  fee: string;
  revenue: string;
  merchant_debit_amount: string | null;
  amount: string;
  final_amount: string;
  s3p_receiptNumber: string | null;
  stripe_payment_intent_id: string | null;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface WalletTransactionsResponse {
  message: string;
  data: {
    transactions: WalletTransaction[];
    meta: {
      current_page: number;
      total_items: number;
      total_pages: number;
      limit: number;
    };
  };
  code: number;
}

export interface S3PBalanceResponse {
  message: string;
  data: {
    balance: number;
  };
  code: number;
}

// Revenue Report Interfaces
export interface RevenueStats {
  total_revenue: number;
  revenue_breakdown: {
    ride_revenue: string;
    wallet_revenue: string;
  };
  current_period: {
    week: {
      total: number;
      ride_revenue: string;
      wallet_revenue: string;
    };
    month: {
      total: number;
      ride_revenue: string;
      wallet_revenue: string;
    };
    year: {
      total: number;
      ride_revenue: string;
      wallet_revenue: string;
    };
  };
  previous_period: {
    week: {
      total: number;
      ride_revenue: string;
      wallet_revenue: string;
    };
    month: {
      total: number;
      ride_revenue: string;
      wallet_revenue: string;
    };
    year: {
      total: number;
      ride_revenue: string;
      wallet_revenue: string;
    };
  };
  percentage_change: {
    week: number;
    month: number;
    year: number;
  };
}

export interface RevenueStatsResponse {
  message: string;
  data: RevenueStats;
  code: number;
}

export interface RevenueRide {
  id: number;
  ride_id: number;
  total_fare: string;
  platform_revenue: string;
  driver_revenue: string;
  status: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  ride: {
    id: number;
    rider_id: number;
    driver_id: number;
    source_name: string;
    source_lat: string;
    source_lng: string;
    destination_name: string;
    destination_lat: string;
    destination_lng: string;
    booking_time: string;
    status: string;
    ride_type: string;
    total_seats: number | null;
    available_seats: number | null;
    route_data: string | null;
    waiting_until: string | null;
    is_shared_ride: boolean;
    shared_ride_price: string | null;
    total_shared_price: string | null;
    cancelled_by: string | null;
    ride_option_id: number;
    discount_id: number | null;
    promo_code: string | null;
    ride_fare: string;
    original_fare: string;
    discount_amount: string;
    final_fare: string;
    discount_details: {
      discount_name: string;
      discount_type: string;
      discount_value: string;
      discount_percentage: number;
    } | null;
    driver_fare: string;
    cancellation_reason: string | null;
    created_at: string;
    updated_at: string;
    trip_start_time: string;
    trip_end_time: string;
    trip_duration: string;
    is_paid: boolean;
    deleted_at: string | null;
  };
}

export interface RevenueRidesResponse {
  status: string;
  data: {
    current_page: number;
    data: RevenueRide[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
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
  async getAllRides(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<BookingReportRidesResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      
      const url = `/admin/rides${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      console.log('API: Fetching rides from:', `${this.baseURL}${url}`);
      const result = await this.request<BookingReportRidesResponse>(url);
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

  // Driver Validation Management
  async validateDriver(driverId: number, data: DriverValidationRequest): Promise<DriverValidationResponse> {
    try {
      console.log('API: Validating driver:', driverId, data);
      const result = await this.request<DriverValidationResponse>(`/admin/driver/${driverId}/validate`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('API: Driver validation response:', result);
      return result;
    } catch (error) {
      console.error('API: Driver validation error:', error);
      throw error;
    }
  }

  async getDriverValidationStatus(driverId: number, lang?: string): Promise<DriverValidationStatusResponse> {
    try {
      const endpoint = `/admin/driver/${driverId}/validation-status${lang ? `?lang=${lang}` : ''}`;
      console.log('API: Fetching driver validation status from:', `${this.baseURL}${endpoint}`);
      const result = await this.request<DriverValidationStatusResponse>(endpoint);
      console.log('API: Driver validation status response:', result);
      return result;
    } catch (error) {
      console.error('API: Driver validation status fetch error:', error);
      throw error;
    }
  }

  // Booking Report Management
  async getWeeklyRideStats(): Promise<WeeklyRideStatsResponse> {
    try {
      console.log('API: Fetching weekly ride stats from:', `${this.baseURL}/admin/weekly-ride-stats`);
      const result = await this.request<WeeklyRideStatsResponse>('/admin/weekly-ride-stats');
      console.log('API: Weekly ride stats response:', result);
      return result;
    } catch (error) {
      console.error('API: Weekly ride stats fetch error:', error);
      throw error;
    }
  }

  // Transaction Report Management
  async getWalletStats(): Promise<WalletStatsResponse> {
    try {
      console.log('API: Fetching wallet stats from:', `${this.baseURL}/admin/wallet-stats`);
      const result = await this.request<WalletStatsResponse>('/admin/wallet-stats');
      console.log('API: Wallet stats response:', result);
      return result;
    } catch (error) {
      console.error('API: Wallet stats fetch error:', error);
      throw error;
    }
  }

  async getWalletTransactions(params?: {
    page?: number;
    limit?: number;
    transaction_type?: 'deposit' | 'withdrawal';
    status?: 'completed' | 'pending' | 'failed';
    payment_method?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<WalletTransactionsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.transaction_type) queryParams.append('transaction_type', params.transaction_type);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.payment_method) queryParams.append('payment_method', params.payment_method);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      
      const url = `/admin/wallet-transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      console.log('API: Fetching wallet transactions from:', `${this.baseURL}${url}`);
      const result = await this.request<WalletTransactionsResponse>(url);
      console.log('API: Wallet transactions response:', result);
      return result;
    } catch (error) {
      console.error('API: Wallet transactions fetch error:', error);
      throw error;
    }
  }

  async getS3PBalance(): Promise<S3PBalanceResponse> {
    try {
      console.log('API: Fetching S3P balance from:', `${this.baseURL}/admin/s3p/balance`);
      const result = await this.request<S3PBalanceResponse>('/admin/s3p/balance');
      console.log('API: S3P balance response:', result);
      return result;
    } catch (error) {
      console.error('API: S3P balance fetch error:', error);
      throw error;
    }
  }

  // Revenue Report Management
  async getRevenueStats(): Promise<RevenueStatsResponse> {
    try {
      console.log('API: Fetching revenue stats from:', `${this.baseURL}/admin/revenue/stats`);
      const result = await this.request<RevenueStatsResponse>('/admin/revenue/stats');
      console.log('API: Revenue stats response:', result);
      return result;
    } catch (error) {
      console.error('API: Revenue stats fetch error:', error);
      throw error;
    }
  }

  async getRevenueRides(params?: {
    page?: number;
    limit?: number;
    status?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<RevenueRidesResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);

      const url = `/admin/revenue/rides${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      console.log('API: Fetching revenue rides from:', `${this.baseURL}${url}`);
      const result = await this.request<RevenueRidesResponse>(url);
      console.log('API: Revenue rides response:', result);
      return result;
    } catch (error) {
      console.error('API: Revenue rides fetch error:', error);
      throw error;
    }
  }

  // Panic Management
  async getPanicReports(params?: {
    status?: 'resolved' | 'unresolved';
    user_type?: 'driver' | 'rider';
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
    lang?: string;
  }): Promise<PanicReportsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.status) queryParams.append('status', params.status);
      if (params?.user_type) queryParams.append('user_type', params.user_type);
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.lang) queryParams.append('lang', params.lang);

      const url = `/admin/panic-reports${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      console.log('API: Fetching panic reports from:', `${this.baseURL}${url}`);
      const result = await this.request<PanicReportsResponse>(url);
      console.log('API: Panic reports response:', result);
      return result;
    } catch (error) {
      console.error('API: Panic reports fetch error:', error);
      throw error;
    }
  }

  async resolvePanicReport(panicId: number): Promise<PanicResolveResponse> {
    try {
      console.log('API: Resolving panic report:', `${this.baseURL}/admin/panic-reports/${panicId}/resolve`);
      const result = await this.request<PanicResolveResponse>(`/admin/panic-reports/${panicId}/resolve`, {
        method: 'PUT',
      });
      console.log('API: Panic report resolve response:', result);
      return result;
    } catch (error) {
      console.error('API: Panic report resolve error:', error);
      throw error;
    }
  }

  // Discount Management
  async getDiscounts(params?: {
    per_page?: number;
    search?: string;
    status?: boolean;
    lang?: string;
  }): Promise<DiscountsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status !== undefined) queryParams.append('status', params.status.toString());
      if (params?.lang) queryParams.append('lang', params.lang);

      const url = `/admin/discounts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const result = await this.request<DiscountsResponse>(url);
      return result;
    } catch (error) {
      console.error('API: Discounts fetch error:', error);
      throw error;
    }
  }

  async getDiscount(id: number): Promise<{ data: Discount }> {
    try {
      const result = await this.request<{ data: Discount }>(`/admin/discounts/${id}`);
      return result;
    } catch (error) {
      console.error('API: Discount fetch error:', error);
      throw error;
    }
  }

  async createDiscount(data: DiscountCreateRequest): Promise<{ data: Discount }> {
    try {
      const result = await this.request<{ data: Discount }>('/admin/discounts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return result;
    } catch (error) {
      console.error('API: Discount create error:', error);
      throw error;
    }
  }

  async updateDiscount(id: number, data: DiscountUpdateRequest): Promise<{ data: Discount }> {
    try {
      const result = await this.request<{ data: Discount }>(`/admin/discounts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return result;
    } catch (error) {
      console.error('API: Discount update error:', error);
      throw error;
    }
  }

  async deleteDiscount(id: number): Promise<{ message: string }> {
    try {
      const result = await this.request<{ message: string }>(`/admin/discounts/${id}`, {
        method: 'DELETE',
      });
      return result;
    } catch (error) {
      console.error('API: Discount delete error:', error);
      throw error;
    }
  }

  async toggleDiscountStatus(id: number): Promise<{ data: { id: number; is_active: boolean } }> {
    try {
      const result = await this.request<{ data: { id: number; is_active: boolean } }>(`/admin/discounts/${id}/toggle-status`, {
        method: 'PUT',
      });
      return result;
    } catch (error) {
      console.error('API: Discount status toggle error:', error);
      throw error;
    }
  }

  async getDiscountStats(): Promise<{ data: DiscountStats }> {
    try {
      const result = await this.request<{ data: DiscountStats }>('/admin/discounts/stats/overview');
      return result;
    } catch (error) {
      console.error('API: Discount stats fetch error:', error);
      throw error;
    }
  }

  async getDiscountUsageHistory(params?: {
    per_page?: number;
    discount_id?: number;
    user_id?: number;
    lang?: string;
  }): Promise<DiscountUsageResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.discount_id) queryParams.append('discount_id', params.discount_id.toString());
      if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
      if (params?.lang) queryParams.append('lang', params.lang);

      const url = `/admin/discounts/usage/history${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const result = await this.request<DiscountUsageResponse>(url);
      return result;
    } catch (error) {
      console.error('API: Discount usage history fetch error:', error);
      throw error;
    }
  }

  // Firebase Notifications
  async sendNotification(request: NotificationRequest): Promise<NotificationResponse> {
    try {
      console.log('API: Sending notification:', `${this.baseURL}/admin/notifications/send`);
      const result = await this.request<NotificationResponse>('/admin/notifications/send', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      console.log('API: Notification send response:', result);
      return result;
    } catch (error) {
      console.error('API: Notification send error:', error);
      throw error;
    }
  }

  async sendTestNotification(request: {
    title: string;
    body: string;
    device_token?: string;
    device_tokens?: string[];
    data?: Record<string, string | number | boolean>;
  }): Promise<NotificationResponse> {
    try {
      const endpoint = request.device_tokens ? '/test/notification/multiple' : '/test/notification/single';
      console.log('API: Sending test notification:', `${this.baseURL}${endpoint}`);
      const result = await this.request<NotificationResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
      });
      console.log('API: Test notification response:', result);
      return result;
    } catch (error) {
      console.error('API: Test notification error:', error);
      throw error;
    }
  }

  async getDevices(params?: {
    page?: number;
    limit?: number;
    device_type?: 'ios' | 'android' | 'web' | 'unknown';
    is_active?: boolean;
    user_id?: number;
  }): Promise<{
    success: boolean;
    data: DeviceInfo[];
    pagination: {
      current_page: number;
      total_items: number;
      total_pages: number;
      limit: number;
    };
    statistics: DeviceStats;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.device_type) queryParams.append('device_type', params.device_type);
      if (params?.is_active !== undefined) queryParams.append('is_active', params.is_active.toString());
      if (params?.user_id) queryParams.append('user_id', params.user_id.toString());

      const url = `/admin/devices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      console.log('API: Fetching devices from:', `${this.baseURL}${url}`);
      const result = await this.request<{
        success: boolean;
        data: DeviceInfo[];
        pagination: {
          current_page: number;
          total_items: number;
          total_pages: number;
          limit: number;
        };
        statistics: DeviceStats;
      }>(url);
      console.log('API: Devices response:', result);
      return result;
    } catch (error) {
      console.error('API: Devices fetch error:', error);
      throw error;
    }
  }

  async getNotificationLogs(params?: {
    page?: number;
    limit?: number;
    type?: string;
    success?: boolean;
    user_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<{
    success: boolean;
    data: NotificationLog[];
    pagination: {
      current_page: number;
      total_items: number;
      total_pages: number;
      limit: number;
    };
    metrics: NotificationMetrics;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.type) queryParams.append('type', params.type);
      if (params?.success !== undefined) queryParams.append('success', params.success.toString());
      if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
      if (params?.start_date) queryParams.append('start_date', params.start_date);
      if (params?.end_date) queryParams.append('end_date', params.end_date);

      const url = `/admin/notification-logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      console.log('API: Fetching notification logs from:', `${this.baseURL}${url}`);
      const result = await this.request<{
        success: boolean;
        data: NotificationLog[];
        pagination: {
          current_page: number;
          total_items: number;
          total_pages: number;
          limit: number;
        };
        metrics: NotificationMetrics;
      }>(url);
      console.log('API: Notification logs response:', result);
      return result;
    } catch (error) {
      console.error('API: Notification logs fetch error:', error);
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
export const getAllRides = (params?: Parameters<typeof apiService.getAllRides>[0]) => apiService.getAllRides(params);
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

// Driver Validation API exports
export const validateDriver = (driverId: number, data: DriverValidationRequest) => apiService.validateDriver(driverId, data);
export const getDriverValidationStatus = (driverId: number, lang?: string) => apiService.getDriverValidationStatus(driverId, lang);

// Booking Report API exports
export const getWeeklyRideStats = () => apiService.getWeeklyRideStats();

// Transaction Report API exports
export const getWalletStats = () => apiService.getWalletStats();
export const getWalletTransactions = (params?: Parameters<typeof apiService.getWalletTransactions>[0]) => apiService.getWalletTransactions(params);
export const getS3PBalance = () => apiService.getS3PBalance();

// Revenue Report API exports
export const getRevenueStats = () => apiService.getRevenueStats();
export const getRevenueRides = (params?: Parameters<typeof apiService.getRevenueRides>[0]) => apiService.getRevenueRides(params);

// Panic Management API exports
export const getPanicReports = (params?: Parameters<typeof apiService.getPanicReports>[0]) => apiService.getPanicReports(params);
export const resolvePanicReport = (panicId: number) => apiService.resolvePanicReport(panicId);

// Discount Management API exports
export const getDiscounts = (params?: Parameters<typeof apiService.getDiscounts>[0]) => apiService.getDiscounts(params);
export const getDiscount = (id: number) => apiService.getDiscount(id);
export const createDiscount = (data: DiscountCreateRequest) => apiService.createDiscount(data);
export const updateDiscount = (id: number, data: DiscountUpdateRequest) => apiService.updateDiscount(id, data);
export const deleteDiscount = (id: number) => apiService.deleteDiscount(id);
export const toggleDiscountStatus = (id: number) => apiService.toggleDiscountStatus(id);
export const getDiscountStats = () => apiService.getDiscountStats();
export const getDiscountUsageHistory = (params?: Parameters<typeof apiService.getDiscountUsageHistory>[0]) => apiService.getDiscountUsageHistory(params);

// Firebase Notifications API exports
export const sendNotification = (request: NotificationRequest) => apiService.sendNotification(request);
export const sendTestNotification = (request: Parameters<typeof apiService.sendTestNotification>[0]) => apiService.sendTestNotification(request);
export const getDevices = (params?: Parameters<typeof apiService.getDevices>[0]) => apiService.getDevices(params);
export const getNotificationLogs = (params?: Parameters<typeof apiService.getNotificationLogs>[0]) => apiService.getNotificationLogs(params);

// Firebase Notifications Interfaces
export interface NotificationRequest {
  title: string;
  body: string;
  device_token?: string;
  device_tokens?: string[];
  target_type?: 'all' | 'drivers' | 'riders';
  user_ids?: number[];
  data?: Record<string, string | number | boolean>;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    name?: string;
    successful?: Array<{
      device_token: string;
      status: string;
      result: string;
    }>;
    failed?: Array<{
      device_token: string;
      error: string;
    }>;
  };
}

export interface DeviceInfo {
  id: number;
  user_id: number;
  device_token: string;
  device_type: 'ios' | 'android' | 'web' | 'unknown';
  is_active: boolean;
  last_used_at: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: 'driver' | 'rider';
  };
}

export interface DeviceStats {
  total_devices: number;
  active_devices: number;
  ios_devices: number;
  android_devices: number;
  web_devices: number;
  recent_devices: number;
  inactive_devices: number;
}

export interface NotificationLog {
  id: number;
  user_id: number;
  type: string;
  title: string;
  body: string;
  success: boolean;
  error_message?: string;
  sent_at: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: 'driver' | 'rider';
  };
}

export interface NotificationMetrics {
  total_sent: number;
  success_rate: number;
  failure_rate: number;
  top_errors: Array<{
    error_message: string;
    count: number;
  }>;
  delivery_stats: {
    today: number;
    this_week: number;
    this_month: number;
  };
}

// Panic Management Interfaces
export interface PanicReport {
  id: number;
  user_id: number;
  booking_id: number | null;
  latitude: number;
  longitude: number;
  is_resolved: boolean;
  description: string | null;
  location: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    role: 'driver' | 'rider';
    is_active: boolean;
    is_validated: boolean;
    is_online: boolean;
  };
  booking?: {
    id: number;
    status: string;
    source_name: string;
    destination_name: string;
    ride_fare: number;
    booking_time: string;
    rider: {
      id: number;
      name: string;
      phone: string;
    };
    driver: {
      id: number;
      name: string;
      phone: string;
    };
  };
}

export interface PanicReportsResponse {
  success: boolean;
  message: string;
  data: PanicReport[];
  pagination: {
    current_page: number;
    total_items: number;
    total_pages: number;
    limit: number;
  };
  statistics: {
    total_reports: number;
    resolved_reports: number;
    unresolved_reports: number;
    driver_reports: number;
    rider_reports: number;
    recent_reports: number;
  };
}

export interface PanicResolveResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    booking_id: number | null;
    latitude: number;
    longitude: number;
    is_resolved: boolean;
    description: string | null;
    created_at: string;
    updated_at: string;
  };
}

// Discount System Interfaces
export interface Discount {
  id: number;
  name: string;
  description?: string;
  code?: string;
  type: 'percentage' | 'fixed_amount' | 'free_ride';
  value: number;
  minimum_amount?: number;
  maximum_discount?: number;
  usage_limit?: number;
  usage_count: number;
  per_user_limit: number;
  applicable_ride_options?: number[];
  applicable_ride_classes?: number[];
  is_active: boolean;
  starts_at?: string;
  expires_at?: string;
  user_restrictions?: Record<string, unknown>;
  is_first_ride_only: boolean;
  is_shared_ride_only: boolean;
  created_at: string;
  updated_at?: string;
}

export interface DiscountUsage {
  id: number;
  discount_id: number;
  user_id: number;
  booking_id?: number;
  original_amount: number;
  discount_amount: number;
  final_amount: number;
  promo_code?: string;
  discount_details?: Record<string, unknown>;
  created_at: string;
  discount?: {
    name: string;
    code?: string;
  };
  user?: {
    name: string;
    email: string;
  };
  booking?: {
    id: number;
    source_name: string;
    destination_name: string;
  };
}

export interface DiscountStats {
  total_discounts: number;
  active_discounts: number;
  total_usage: number;
  total_savings: number;
  top_discounts: Array<{
    id: number;
    name: string;
    usages_count: number;
  }>;
  recent_usage: Array<{
    id: number;
    discount: {
      name: string;
    };
    user: {
      name: string;
    };
    original_amount: number;
    discount_amount: number;
    created_at: string;
  }>;
}

export interface DiscountCreateRequest {
  name: string;
  description?: string;
  code?: string;
  type: 'percentage' | 'fixed_amount' | 'free_ride';
  value: number;
  minimum_amount?: number;
  maximum_discount?: number;
  usage_limit?: number;
  per_user_limit?: number;
  applicable_ride_options?: number[];
  applicable_ride_classes?: number[];
  is_active?: boolean;
  starts_at?: string;
  expires_at?: string;
  user_restrictions?: Record<string, unknown>;
  is_first_ride_only?: boolean;
  is_shared_ride_only?: boolean;
  lang?: string;
}

export type DiscountUpdateRequest = Partial<DiscountCreateRequest>;

export interface DiscountsResponse {
  current_page: number;
  data: Discount[];
  total: number;
  per_page: number;
}

export interface DiscountUsageResponse {
  current_page: number;
  data: DiscountUsage[];
  total: number;
  per_page: number;
}
