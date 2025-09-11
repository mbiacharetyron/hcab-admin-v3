// Demo data for testing when API is not available
import type { 
  DashboardStats, 
  Ride, 
  User, 
  RideOption, 
  PanicReport, 
  PanicReportsResponse,
  ScheduledNotification,
  ScheduledNotificationsResponse,
  ScheduledNotificationStats,
  WalletBalanceUser,
  WalletBalanceSummary,
  WalletBalancePagination,
  WalletBalancesResponse
} from './api';

export const demoDashboardStats: DashboardStats = {
  trips: {
  ongoing_trips: 12,
    pending_trips: 8,
    completed_today: 45,
    completed_yesterday: 52,
    cancelled_today: 3,
    total_this_month: 1250,
    total_last_month: 1180,
    completion_rate: 85.5,
    average_fare: 1250.75
  },
  users: {
    total_users: 2500,
    total_drivers: 150,
    new_users_today: 12,
    new_drivers_today: 2,
    active_users_today: 180,
    new_users_this_month: 320
  },
  drivers: {
  online_drivers: 45,
    offline_drivers: 105,
    total_drivers: 150,
    active_drivers_today: 42,
    drivers_with_cars: 120,
    drivers_with_documents: 135
  },
  revenue: {
    total_revenue: "1250000.50",
    today_revenue: 8500.25,
    yesterday_revenue: 9200.75,
    this_month_revenue: "125000.00",
    last_month_revenue: "118000.00",
    average_ride_value: "1250.75",
    total_discounts_given: "15000.25"
  },
  wallet: {
    total_wallet_balance: "250000.75",
    total_locked_balance: "15000.00",
    total_transactions_today: 45,
    total_deposits_today: 25,
    total_withdrawals_today: 20,
    pending_withdrawals: 5
  },
  discounts: {
    total_discounts: 8,
    active_discounts: 5,
    total_discount_usage: 1250,
    discount_usage_today: 45,
    total_discount_savings: "15000.25",
    discount_savings_today: 850.50
  },
  alerts: {
    unresolved_panics: 3,
    pending_driver_verifications: 15,
    pending_withdrawals: 5,
    low_balance_users: 25
  },
  recent_activities: [
    {
      type: "booking",
      message: "New booking #1250 from John Doe",
      timestamp: new Date().toISOString(),
      status: "completed",
      amount: "1250.00"
    },
    {
      type: "booking",
      message: "New booking #1249 from Jane Smith",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: "in_progress",
      amount: "850.00"
    },
    {
      type: "booking",
      message: "New booking #1248 from Mike Johnson",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: "cancelled",
      amount: "650.00"
    }
  ]
};

export const demoUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    phone: "+237 612 345 678",
    email: "john.doe@example.com",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    phone: "+237 623 456 789",
    email: "jane.smith@example.com",
    created_at: "2024-01-14T15:45:00Z",
    updated_at: "2024-01-14T15:45:00Z"
  },
  {
    id: 3,
    name: "Mike Johnson",
    username: "mikejohnson",
    phone: "+237 634 567 890",
    email: "mike.johnson@example.com",
    created_at: "2024-01-13T09:15:00Z",
    updated_at: "2024-01-13T09:15:00Z"
  }
];

export const demoRideOptions: RideOption[] = [
  {
    id: 1,
    name: "H-Cab Classic",
    description: "Standard ride service",
    base_fare: 1000,
    per_km_rate: 150,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "H-Cab Premium",
    description: "Premium ride service with luxury vehicles",
    base_fare: 2000,
    per_km_rate: 250,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "H-Cab Express",
    description: "Fast ride service",
    base_fare: 800,
    per_km_rate: 120,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const demoRides: Ride[] = [
  {
    id: 1001,
    rider_id: 1,
    ride_option_id: 1,
    pickup_location: "Douala International Airport, Douala, Cameroon",
    dropoff_location: "Hilton Hotel Douala, Douala, Cameroon",
    status: "completed",
    fare: "2500",
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-01-15T08:30:00Z",
    driver_id: 101,
    payment_status: "paid",
    rating: 5
  },
  {
    id: 1002,
    rider_id: 2,
    ride_option_id: 2,
    pickup_location: "Buea Town, Buea, Cameroon",
    dropoff_location: "University of Buea, Buea, Cameroon",
    status: "in_progress",
    fare: "1800",
    created_at: "2024-01-15T09:15:00Z",
    updated_at: "2024-01-15T09:20:00Z",
    driver_id: 102,
    estimated_arrival: "2024-01-15T09:25:00Z"
  },
  {
    id: 1003,
    rider_id: 3,
    ride_option_id: 1,
    pickup_location: "Yaounde Central Market, Yaounde, Cameroon",
    dropoff_location: "Presidential Palace, Yaounde, Cameroon",
    status: "pending",
    fare: "3200",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 1004,
    rider_id: 1,
    ride_option_id: 3,
    pickup_location: "Limbe Beach, Limbe, Cameroon",
    dropoff_location: "Limbe Wildlife Centre, Limbe, Cameroon",
    status: "cancelled",
    fare: "1500",
    created_at: "2024-01-15T07:30:00Z",
    updated_at: "2024-01-15T07:45:00Z"
  },
  {
    id: 1005,
    rider_id: 2,
    ride_option_id: 2,
    pickup_location: "Kribi Beach, Kribi, Cameroon",
    dropoff_location: "Kribi Port, Kribi, Cameroon",
    status: "failed",
    fare: "2800",
    created_at: "2024-01-15T06:00:00Z",
    updated_at: "2024-01-15T06:15:00Z"
  }
];

// Helper function to get enhanced rides with user and ride option data
export const getDemoEnhancedRides = () => {
  return demoRides.map(ride => ({
    ...ride,
    user: demoUsers.find(user => user.id === ride.rider_id),
    rideOption: demoRideOptions.find(option => option.id === ride.ride_option_id)
  }));
};

// Demo panic reports data
export const demoPanicReports: PanicReport[] = [
  {
    id: 1,
    user_id: 1,
    booking_id: 1001,
    latitude: 4.0483,
    longitude: 9.7043,
    is_resolved: false,
    description: "Driver is acting suspiciously and not following the route",
    location: "Douala International Airport, Douala, Cameroon",
    created_at: "2024-01-15T08:15:00Z",
    updated_at: "2024-01-15T08:15:00Z",
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+237 612 345 678",
      username: "john_doe",
      role: "rider",
      is_active: true,
      is_validated: true,
      is_online: false
    },
    booking: {
      id: 1001,
      status: "in_progress",
      source_name: "Douala International Airport",
      destination_name: "Hilton Hotel Douala",
      ride_fare: 2500,
      booking_time: "2024-01-15T08:00:00Z",
      rider: {
        id: 1,
        name: "John Doe",
        phone: "+237 612 345 678"
      },
      driver: {
        id: 10,
        name: "Driver One",
        phone: "+237 655 123 456"
      }
    }
  },
  {
    id: 2,
    user_id: 2,
    booking_id: 1002,
    latitude: 4.1550,
    longitude: 9.2370,
    is_resolved: true,
    description: "Vehicle breakdown in remote area",
    location: "Buea Town, Buea, Cameroon",
    created_at: "2024-01-15T09:20:00Z",
    updated_at: "2024-01-15T09:45:00Z",
    user: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+237 623 456 789",
      username: "jane_smith",
      role: "rider",
      is_active: true,
      is_validated: true,
      is_online: false
    },
    booking: {
      id: 1002,
      status: "completed",
      source_name: "Buea Town",
      destination_name: "University of Buea",
      ride_fare: 1800,
      booking_time: "2024-01-15T09:00:00Z",
      rider: {
        id: 2,
        name: "Jane Smith",
        phone: "+237 623 456 789"
      },
      driver: {
        id: 11,
        name: "Driver Two",
        phone: "+237 655 234 567"
      }
    }
  },
  {
    id: 3,
    user_id: 3,
    booking_id: null,
    latitude: 3.8480,
    longitude: 11.5021,
    is_resolved: false,
    description: "Feeling unsafe with driver behavior",
    location: "Yaounde Central Market, Yaounde, Cameroon",
    created_at: "2024-01-15T10:05:00Z",
    updated_at: "2024-01-15T10:05:00Z",
    user: {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+237 634 567 890",
      username: "mike_johnson",
      role: "driver",
      is_active: true,
      is_validated: true,
      is_online: false
    },
    booking: null
  },
  {
    id: 4,
    user_id: 1,
    booking_id: 1004,
    latitude: 4.0097,
    longitude: 9.2068,
    is_resolved: true,
    description: "Accident occurred during ride",
    location: "Limbe Beach, Limbe, Cameroon",
    created_at: "2024-01-15T07:35:00Z",
    updated_at: "2024-01-15T08:00:00Z",
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+237 612 345 678",
      username: "john_doe",
      role: "rider",
      is_active: true,
      is_validated: true,
      is_online: false
    },
    booking: {
      id: 1004,
      status: "cancelled",
      source_name: "Limbe Beach",
      destination_name: "Limbe Wildlife Centre",
      ride_fare: 1500,
      booking_time: "2024-01-15T07:00:00Z",
      rider: {
        id: 1,
        name: "John Doe",
        phone: "+237 612 345 678"
      },
      driver: {
        id: 12,
        name: "Driver Three",
        phone: "+237 655 345 678"
      }
    }
  },
  {
    id: 5,
    user_id: 2,
    booking_id: 1005,
    latitude: 2.9389,
    longitude: 9.9103,
    is_resolved: false,
    description: "Driver is intoxicated and driving dangerously",
    location: "Kribi Beach, Kribi, Cameroon",
    created_at: "2024-01-15T06:10:00Z",
    updated_at: "2024-01-15T06:10:00Z",
    user: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+237 623 456 789",
      username: "jane_smith",
      role: "rider",
      is_active: true,
      is_validated: true,
      is_online: false
    },
    booking: {
      id: 1005,
      status: "failed",
      source_name: "Kribi Beach",
      destination_name: "Kribi Port",
      ride_fare: 2800,
      booking_time: "2024-01-15T05:30:00Z",
      rider: {
        id: 2,
        name: "Jane Smith",
        phone: "+237 623 456 789"
      },
      driver: {
        id: 13,
        name: "Driver Four",
        phone: "+237 655 456 789"
      }
    }
  }
];

// Demo panic reports response
export const demoPanicReportsResponse: PanicReportsResponse = {
  success: true,
  message: "Panic reports retrieved successfully",
  data: demoPanicReports,
  pagination: {
    current_page: 1,
    total_items: 5,
    total_pages: 1,
    limit: 10
  },
  statistics: {
    // Basic Statistics
    total_reports: 5,
    resolved_reports: 2,
    unresolved_reports: 3,
    driver_reports: 1,
    rider_reports: 4,
    recent_reports: 3,

    // Time-Based Statistics
    reports_today: 2,
    reports_yesterday: 1,
    reports_this_week: 4,
    reports_last_week: 3,
    reports_this_month: 5,
    reports_last_month: 4,

    // Resolution Statistics
    resolved_today: 1,
    resolved_this_week: 2,
    resolved_this_month: 2,
    average_resolution_time_hours: 2.5,
    resolution_rate_percentage: 40.0,

    // Trend Analysis
    weekly_trend: 33.3,
    monthly_trend: 25.0,
    resolution_trend: 5.0,
    trend_direction: {
      weekly: 'increasing' as const,
      monthly: 'increasing' as const,
      resolution: 'improving' as const
    },

    // Geographic Distribution
    top_locations: [
      { location: "Douala International Airport", count: 2 },
      { location: "Hilton Hotel Douala", count: 1 },
      { location: "Bonanjo Business District", count: 1 },
      { location: "Akwa Shopping Center", count: 1 }
    ],

    // Peak Hours Analysis
    peak_hours: [
      { hour: 8, count: 2, time_period: "8:00 AM - 9:00 AM" },
      { hour: 14, count: 1, time_period: "2:00 PM - 3:00 PM" },
      { hour: 18, count: 1, time_period: "6:00 PM - 7:00 PM" },
      { hour: 20, count: 1, time_period: "8:00 PM - 9:00 PM" }
    ],

    // Context Analysis
    reports_with_booking: 4,
    reports_without_booking: 1,
    booking_context_percentage: 80.0,

    // Summary Insights
    insights: {
      most_active_period: "This week",
      resolution_efficiency: "Good",
      primary_source: "Riders",
      urgency_level: "Medium"
    }
  }
};

// Demo notification devices data
export const demoDevices = [
  {
    id: 1,
    user_id: 1,
    device_token: "fcm_token_123456789",
    device_type: "android" as const,
    device_model: "Samsung Galaxy S21",
    os_version: "Android 12",
    app_version: "1.2.3",
    is_active: true,
    last_seen: "2024-01-15T10:30:00Z",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+237 612 345 678",
      role: "rider" as const
    }
  },
  {
    id: 2,
    user_id: 2,
    device_token: "fcm_token_987654321",
    device_type: "ios" as const,
    device_model: "iPhone 13",
    os_version: "iOS 15.2",
    app_version: "1.2.3",
    is_active: true,
    last_seen: "2024-01-15T09:45:00Z",
    created_at: "2024-01-08T12:00:00Z",
    updated_at: "2024-01-15T09:45:00Z",
    user: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+237 623 456 789",
      role: "driver" as const
    }
  },
  {
    id: 3,
    user_id: 3,
    device_token: "fcm_token_456789123",
    device_type: "web" as const,
    device_model: "Chrome Browser",
    os_version: "Windows 11",
    app_version: "1.2.3",
    is_active: false,
    last_seen: "2024-01-14T16:20:00Z",
    created_at: "2024-01-12T14:30:00Z",
    updated_at: "2024-01-14T16:20:00Z",
    user: {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+237 634 567 890",
      role: "rider" as const
    }
  }
];

// Demo notification logs data
export const demoNotificationLogs = [
  {
    id: 1,
    user_id: 1,
    device_token: "fcm_token_123456789",
    title: "Welcome to H-Cab!",
    body: "Thank you for joining our ride-sharing platform.",
    type: "welcome",
    success: true,
    sent_at: "2024-01-15T08:00:00Z",
    response: "Message sent successfully",
    created_at: "2024-01-15T08:00:00Z"
  },
  {
    id: 2,
    user_id: 2,
    device_token: "fcm_token_987654321",
    title: "Ride Request",
    body: "You have a new ride request from John Doe.",
    type: "ride_request",
    success: true,
    sent_at: "2024-01-15T09:15:00Z",
    response: "Message sent successfully",
    created_at: "2024-01-15T09:15:00Z"
  },
  {
    id: 3,
    user_id: 3,
    device_token: "fcm_token_456789123",
    title: "Payment Confirmation",
    body: "Your payment of XAF 2,500 has been processed.",
    type: "payment",
    success: false,
    sent_at: "2024-01-15T10:30:00Z",
    response: "Device token not found",
    created_at: "2024-01-15T10:30:00Z"
  }
];

// Demo devices response
export const demoDevicesResponse = {
  success: true,
  data: demoDevices,
  pagination: {
    current_page: 1,
    total_items: 3,
    total_pages: 1,
    limit: 15
  },
  statistics: {
    total_devices: 3,
    active_devices: 2,
    inactive_devices: 1,
    android_devices: 1,
    ios_devices: 1,
    web_devices: 1,
    recent_devices: 1
  }
};

// Demo notification logs response
export const demoNotificationLogsResponse = {
  success: true,
  data: demoNotificationLogs,
  pagination: {
    current_page: 1,
    total_items: 3,
    total_pages: 1,
    limit: 15
  },
  metrics: {
    total_notifications: 3,
    successful_notifications: 2,
    failed_notifications: 1,
    today_notifications: 3,
    this_week_notifications: 3,
    this_month_notifications: 3
  }
};

// Demo discount data
export const demoDiscounts = [
  {
    id: 1,
    name: "First Ride Discount",
    description: "Get 20% off your first ride with us!",
    code: null,
    type: "percentage" as const,
    value: 20,
    minimum_amount: 500,
    maximum_discount: 1000,
    usage_limit: null,
    usage_count: 450,
    per_user_limit: 1,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2025-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: true,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Welcome Discount",
    description: "Use code WELCOME2024 for 15% off your ride",
    code: "WELCOME2024",
    type: "percentage" as const,
    value: 15,
    minimum_amount: 1000,
    maximum_discount: 500,
    usage_limit: 200,
    usage_count: 89,
    per_user_limit: 1,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 3,
    name: "Shared Ride Savings",
    description: "Get 25% off when you share your ride",
    code: null,
    type: "percentage" as const,
    value: 25,
    minimum_amount: 800,
    maximum_discount: 750,
    usage_limit: null,
    usage_count: 234,
    per_user_limit: 5,
    applicable_ride_options: [1, 2],
    applicable_ride_classes: [1],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2025-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 4,
    name: "Fixed Savings",
    description: "Get 500 XAF off with code SAVE500",
    code: "SAVE500",
    type: "fixed_amount" as const,
    value: 500,
    minimum_amount: 2000,
    maximum_discount: 500,
    usage_limit: 300,
    usage_count: 156,
    per_user_limit: 2,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 5,
    name: "New User Special",
    description: "30% off for new users (automatic)",
    code: null,
    type: "percentage" as const,
    value: 30,
    minimum_amount: 1000,
    maximum_discount: 1500,
    usage_limit: null,
    usage_count: 78,
    per_user_limit: 1,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2025-12-31T23:59:59Z",
    user_restrictions: { new_users_only: true },
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 6,
    name: "Weekend Special",
    description: "10% off with code WEEKEND",
    code: "WEEKEND",
    type: "percentage" as const,
    value: 10,
    minimum_amount: 1500,
    maximum_discount: 300,
    usage_limit: 100,
    usage_count: 45,
    per_user_limit: 1,
    applicable_ride_options: [1, 2],
    applicable_ride_classes: [1],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 7,
    name: "Free Ride",
    description: "Free ride up to 1000 XAF with code FREERIDE",
    code: "FREERIDE",
    type: "free_ride" as const,
    value: 1000,
    minimum_amount: 0,
    maximum_discount: 1000,
    usage_limit: 50,
    usage_count: 23,
    per_user_limit: 1,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 8,
    name: "Premium Discount",
    description: "15% off premium rides with code PREMIUM",
    code: "PREMIUM",
    type: "percentage" as const,
    value: 15,
    minimum_amount: 3000,
    maximum_discount: 1000,
    usage_limit: 75,
    usage_count: 12,
    per_user_limit: 1,
    applicable_ride_options: [3],
    applicable_ride_classes: [2, 3],
    is_active: false,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-06-30T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  }
];

// Demo discount usage history
export const demoDiscountUsageHistory = [
  {
    id: 1,
    discount: {
      name: "First Ride Discount",
      code: null
    },
    user: {
      name: "John Doe",
      email: "john@example.com"
    },
    booking: {
      id: 1001,
      source_name: "Home",
      destination_name: "Office"
    },
    original_amount: 2500,
    discount_amount: 500,
    final_amount: 2000,
    promo_code: null,
    created_at: "2024-12-15T08:00:00Z"
  },
  {
    id: 2,
    discount: {
      name: "Welcome Discount",
      code: "WELCOME2024"
    },
    user: {
      name: "Jane Smith",
      email: "jane@example.com"
    },
    booking: {
      id: 1002,
      source_name: "Airport",
      destination_name: "Hotel"
    },
    original_amount: 3000,
    discount_amount: 450,
    final_amount: 2550,
    promo_code: "WELCOME2024",
    created_at: "2024-12-15T09:15:00Z"
  },
  {
    id: 3,
    discount: {
      name: "Shared Ride Savings",
      code: null
    },
    user: {
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    booking: {
      id: 1003,
      source_name: "Mall",
      destination_name: "University"
    },
    original_amount: 1800,
    discount_amount: 450,
    final_amount: 1350,
    promo_code: null,
    created_at: "2024-12-15T10:30:00Z"
  },
  {
    id: 4,
    discount: {
      name: "Fixed Savings",
      code: "SAVE500"
    },
    user: {
      name: "Sarah Wilson",
      email: "sarah@example.com"
    },
    booking: {
      id: 1004,
      source_name: "Restaurant",
      destination_name: "Home"
    },
    original_amount: 2200,
    discount_amount: 500,
    final_amount: 1700,
    promo_code: "SAVE500",
    created_at: "2024-12-15T11:45:00Z"
  },
  {
    id: 5,
    discount: {
      name: "New User Special",
      code: null
    },
    user: {
      name: "David Brown",
      email: "david@example.com"
    },
    booking: {
      id: 1005,
      source_name: "Station",
      destination_name: "Beach"
    },
    original_amount: 4000,
    discount_amount: 1200,
    final_amount: 2800,
    promo_code: null,
    created_at: "2024-12-15T12:20:00Z"
  },
  {
    id: 6,
    discount: {
      name: "Free Ride",
      code: "FREERIDE"
    },
    user: {
      name: "Lisa Garcia",
      email: "lisa@example.com"
    },
    booking: {
      id: 1006,
      source_name: "Hospital",
      destination_name: "Pharmacy"
    },
    original_amount: 800,
    discount_amount: 800,
    final_amount: 0,
    promo_code: "FREERIDE",
    created_at: "2024-12-15T13:10:00Z"
  }
];

// Demo discount statistics
export const demoDiscountStats = {
  total_discounts: 8,
  active_discounts: 7,
  inactive_discounts: 1,
  total_usage: 1087,
  total_savings: 450000,
  this_month_usage: 156,
  this_month_savings: 67500,
  top_discounts: [
    {
      id: 1,
      name: "First Ride Discount",
      usages_count: 450
    },
    {
      id: 3,
      name: "Shared Ride Savings",
      usages_count: 234
    },
    {
      id: 4,
      name: "Fixed Savings",
      usages_count: 156
    },
    {
      id: 2,
      name: "Welcome Discount",
      usages_count: 89
    },
    {
      id: 5,
      name: "New User Special",
      usages_count: 78
    }
  ],
  recent_usage: demoDiscountUsageHistory
};


// Demo discounts response
export const demoDiscountsResponse = {
  message: "Discounts retrieved successfully.",
  data: {
    current_page: 1,
    data: demoDiscounts,
    total: demoDiscounts.length,
    per_page: 15,
    first_page_url: "http://localhost:8080/admin/discounts?page=1",
    from: 1,
    last_page: 1,
    last_page_url: "http://localhost:8080/admin/discounts?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false
      },
      {
        url: "http://localhost:8080/admin/discounts?page=1",
        label: "1",
        active: true
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false
      }
    ],
    next_page_url: null,
    path: "http://localhost:8080/admin/discounts",
    prev_page_url: null,
    to: demoDiscounts.length
  },
  code: 200
};

// Demo discount stats response
export const demoDiscountStatsResponse = {
  data: demoDiscountStats
};

// Demo Wallet Balance Data
export const demoWalletBalanceUsers: WalletBalanceUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    role: "rider",
    is_active: true,
    is_online: false,
    has_active_passcode: true,
    wallet: {
      available_balance: 150.50,
      locked_balance: 25.00,
      total_balance: 175.50,
      is_locked: false,
      lock_reason: undefined,
      locked_at: undefined,
      locked_by: undefined
    },
    created_at: "2025-01-15T10:30:00.000000Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    role: "driver",
    is_active: true,
    is_online: true,
    has_active_passcode: true,
    wallet: {
      available_balance: 2500.75,
      locked_balance: 100.00,
      total_balance: 2600.75,
      is_locked: true,
      lock_reason: "Suspicious activity detected",
      locked_at: "2025-01-14T15:30:00.000000Z",
      locked_by: 1
    },
    created_at: "2025-01-10T08:15:00.000000Z"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    role: "rider",
    is_active: true,
    is_online: true,
    has_active_passcode: false,
    wallet: {
      available_balance: 75.25,
      locked_balance: 0.00,
      total_balance: 75.25,
      is_locked: false,
      lock_reason: undefined,
      locked_at: undefined,
      locked_by: undefined
    },
    created_at: "2025-01-20T14:45:00.000000Z"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1234567893",
    role: "driver",
    is_active: false,
    is_online: false,
    has_active_passcode: true,
    wallet: {
      available_balance: 500.00,
      locked_balance: 50.00,
      total_balance: 550.00,
      is_locked: true,
      lock_reason: "Account under review",
      locked_at: "2025-01-12T09:15:00.000000Z",
      locked_by: 1
    },
    created_at: "2025-01-05T16:20:00.000000Z"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    phone: "+1234567894",
    role: "rider",
    is_active: true,
    is_online: false,
    has_active_passcode: true,
    wallet: {
      available_balance: 1200.00,
      locked_balance: 200.00,
      total_balance: 1400.00,
      is_locked: false,
      lock_reason: undefined,
      locked_at: undefined,
      locked_by: undefined
    },
    created_at: "2025-01-12T11:30:00.000000Z"
  },
  {
    id: 6,
    name: "Lisa Garcia",
    email: "lisa@example.com",
    phone: "+1234567895",
    role: "driver",
    is_active: true,
    is_online: true,
    has_active_passcode: true,
    wallet: {
      available_balance: 3200.50,
      locked_balance: 150.00,
      total_balance: 3350.50,
      is_locked: false,
      lock_reason: undefined,
      locked_at: undefined,
      locked_by: undefined
    },
    created_at: "2025-01-08T09:15:00.000000Z"
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@example.com",
    phone: "+1234567896",
    role: "rider",
    is_active: true,
    is_online: false,
    has_active_passcode: false,
    wallet: {
      available_balance: 45.75,
      locked_balance: 0.00,
      total_balance: 45.75,
      is_locked: false,
      lock_reason: undefined,
      locked_at: undefined,
      locked_by: undefined
    },
    created_at: "2025-01-25T13:20:00.000000Z"
  },
  {
    id: 8,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1234567897",
    role: "driver",
    is_active: true,
    is_online: false,
    has_active_passcode: true,
    wallet: {
      available_balance: 1800.25,
      locked_balance: 75.00,
      total_balance: 1875.25,
      is_locked: false,
      lock_reason: undefined,
      locked_at: undefined,
      locked_by: undefined
    },
    created_at: "2025-01-18T15:45:00.000000Z"
  }
];

export const demoWalletBalanceSummary: WalletBalanceSummary = {
  total_users: 8,
  total_available_balance: 9522.00,
  total_locked_balance: 600.00,
  total_balance: 10122.00,
  average_balance: 1265.25,
  locked_wallets_count: 2,
  unlocked_wallets_count: 6
};

export const demoWalletBalancePagination: WalletBalancePagination = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 8
};

export const demoWalletBalancesResponse: WalletBalancesResponse = {
  success: true,
  message: "Wallet balances retrieved successfully",
  data: {
    users: demoWalletBalanceUsers,
    pagination: demoWalletBalancePagination,
    summary: demoWalletBalanceSummary
  },
  code: 200
};

// Demo Scheduled Notifications Data
export const demoScheduledNotifications: ScheduledNotification[] = [
  {
    id: 1,
    title: "System Maintenance Notice",
    title_fr: "Avis de maintenance du système",
    message: "The system will be under maintenance from 2 AM to 4 AM tomorrow. Please plan your rides accordingly.",
    message_fr: "Le système sera en maintenance de 2h à 4h demain. Veuillez planifier vos trajets en conséquence.",
    target_type: "all",
    user_type: undefined,
    target_users: undefined,
    custom_query: undefined,
    notification_data: {
      priority: "high",
      category: "system"
    },
    notification_type: "push",
    scheduled_at: "2025-01-16T02:00:00.000000Z",
    sent_at: undefined,
    status: "pending",
    failure_reason: undefined,
    sent_count: 0,
    failed_count: 0,
    created_by: 1,
    created_at: "2025-01-15T10:00:00.000000Z",
    updated_at: "2025-01-15T10:00:00.000000Z",
    creator: {
      id: 1,
      name: "Admin User",
      email: "admin@hcab.tech"
    }
  },
  {
    id: 2,
    title: "Driver Update Available",
    title_fr: "Mise à jour conducteur disponible",
    message: "New driver guidelines have been published. Please review them in your driver app.",
    message_fr: "De nouvelles directives pour les conducteurs ont été publiées. Veuillez les consulter dans votre application conducteur.",
    target_type: "user_type",
    user_type: "driver",
    target_users: undefined,
    custom_query: undefined,
    notification_data: {
      priority: "medium",
      category: "update"
    },
    notification_type: "all",
    scheduled_at: "2025-01-15T14:30:00.000000Z",
    sent_at: "2025-01-15T14:30:05.000000Z",
    status: "sent",
    failure_reason: undefined,
    sent_count: 145,
    failed_count: 5,
    created_by: 1,
    created_at: "2025-01-15T09:00:00.000000Z",
    updated_at: "2025-01-15T14:30:05.000000Z",
    creator: {
      id: 1,
      name: "Admin User",
      email: "admin@hcab.tech"
    }
  },
  {
    id: 3,
    title: "Welcome to H-Cab!",
    title_fr: "Bienvenue chez H-Cab !",
    message: "Welcome to our ride-sharing platform! Enjoy your first ride with a 20% discount.",
    message_fr: "Bienvenue sur notre plateforme de covoiturage ! Profitez de votre premier trajet avec une réduction de 20%.",
    target_type: "user_type",
    user_type: "rider",
    target_users: undefined,
    custom_query: undefined,
    notification_data: {
      priority: "low",
      category: "promotion"
    },
    notification_type: "push",
    scheduled_at: "2025-01-15T12:00:00.000000Z",
    sent_at: "2025-01-15T12:00:03.000000Z",
    status: "sent",
    failure_reason: undefined,
    sent_count: 1200,
    failed_count: 50,
    created_by: 1,
    created_at: "2025-01-15T08:00:00.000000Z",
    updated_at: "2025-01-15T12:00:03.000000Z",
    creator: {
      id: 1,
      name: "Admin User",
      email: "admin@hcab.tech"
    }
  },
  {
    id: 4,
    title: "Premium Users Exclusive",
    title_fr: "Exclusif aux utilisateurs premium",
    message: "Exclusive offer for premium users! Get 30% off your next 5 rides.",
    message_fr: "Offre exclusive pour les utilisateurs premium ! Obtenez 30% de réduction sur vos 5 prochains trajets.",
    target_type: "custom_query",
    user_type: undefined,
    target_users: undefined,
    custom_query: [
      {
        field: "subscription_type",
        operator: "=",
        value: "premium"
      },
      {
        field: "is_active",
        operator: "=",
        value: "true"
      }
    ],
    notification_data: {
      priority: "high",
      category: "promotion"
    },
    notification_type: "all",
    scheduled_at: "2025-01-16T10:00:00.000000Z",
    sent_at: undefined,
    status: "pending",
    failure_reason: undefined,
    sent_count: 0,
    failed_count: 0,
    created_by: 1,
    created_at: "2025-01-15T11:00:00.000000Z",
    updated_at: "2025-01-15T11:00:00.000000Z",
    creator: {
      id: 1,
      name: "Admin User",
      email: "admin@hcab.tech"
    }
  },
  {
    id: 5,
    title: "Failed Notification",
    title_fr: "Notification échouée",
    message: "This notification failed to send due to server issues.",
    message_fr: "Cette notification a échoué à être envoyée en raison de problèmes de serveur.",
    target_type: "all",
    user_type: undefined,
    target_users: undefined,
    custom_query: undefined,
    notification_data: {
      priority: "medium",
      category: "test"
    },
    notification_type: "push",
    scheduled_at: "2025-01-14T15:00:00.000000Z",
    sent_at: undefined,
    status: "failed",
    failure_reason: "Server timeout during delivery",
    sent_count: 0,
    failed_count: 2500,
    created_by: 1,
    created_at: "2025-01-14T14:00:00.000000Z",
    updated_at: "2025-01-14T15:05:00.000000Z",
    creator: {
      id: 1,
      name: "Admin User",
      email: "admin@hcab.tech"
    }
  }
];

// Demo scheduled notifications stats
export const demoScheduledNotificationStats: ScheduledNotificationStats = {
  total_notifications: 25,
  pending_notifications: 8,
  sent_notifications: 15,
  failed_notifications: 2,
  cancelled_notifications: 0,
  scheduled_today: 3,
  scheduled_this_week: 12,
  scheduled_this_month: 25,
  success_rate: 88.24,
  failure_rate: 11.76
};

// Demo scheduled notifications response
export const demoScheduledNotificationsResponse: ScheduledNotificationsResponse = {
  success: true,
  message: "Scheduled notifications retrieved successfully",
  data: {
    current_page: 1,
    data: demoScheduledNotifications,
    first_page_url: "http://localhost/api/v1/admin/scheduled-notifications?page=1",
    from: 1,
    last_page: 1,
    last_page_url: "http://localhost/api/v1/admin/scheduled-notifications?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false
      },
      {
        url: "http://localhost/api/v1/admin/scheduled-notifications?page=1",
        label: "1",
        active: true
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false
      }
    ],
    next_page_url: null,
    path: "http://localhost/api/v1/admin/scheduled-notifications",
    per_page: 15,
    prev_page_url: null,
    to: 5,
    total: 5
  }
};
