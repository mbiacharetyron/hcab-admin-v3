// API Configuration
export const API_CONFIG = {
  // Base URL for the H-Cab Admin API
  BASE_URL: 'https://api.hcab.tech/api/v1',
  
  // Demo mode - set to true to use demo data instead of real API calls
  DEMO_MODE: false,
  
  // API Endpoints
  ENDPOINTS: {
    DASHBOARD_STATS: '/dashboard/stats',
    RIDES: '/rides',
    USER: '/user',
    RIDE_OPTION: '/ride-option',
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify-token',
    }
  },
  
  // Request Configuration
  REQUEST_CONFIG: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    REFETCH_INTERVALS: {
      DASHBOARD_STATS: 30000, // 30 seconds
      RIDES: 60000, // 1 minute
      USER_DETAILS: 300000, // 5 minutes
      RIDE_OPTION_DETAILS: 300000, // 5 minutes
      PANIC_REPORTS: 60000, // 1 minute
      NOTIFICATION_LOGS: 60000, // 1 minute
      WALLET_TRANSACTIONS: 30000, // 30 seconds
    }
  }
} as const;

// Environment check
export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
