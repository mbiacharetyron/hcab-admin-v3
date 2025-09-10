// Demo data for testing when API is not available
import type { DashboardStats, Ride, User, RideOption, PanicReport, PanicReportsResponse } from './api';

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
    total_reports: 5,
    resolved_reports: 2,
    unresolved_reports: 3,
    driver_reports: 1,
    rider_reports: 4,
    recent_reports: 3
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
    name: "Welcome Bonus",
    description: "Get 20% off your first ride",
    code: "WELCOME20",
    type: "percentage" as const,
    value: 20,
    minimum_amount: 1000,
    maximum_discount: 2000,
    usage_limit: 1000,
    usage_count: 245,
    per_user_limit: 1,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: true,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Weekend Special",
    description: "Fixed XAF 500 off weekend rides",
    code: "WEEKEND500",
    type: "fixed_amount" as const,
    value: 500,
    minimum_amount: 2000,
    maximum_discount: 500,
    usage_limit: 500,
    usage_count: 89,
    per_user_limit: 2,
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
    id: 3,
    name: "Free Ride Friday",
    description: "One free ride every Friday",
    code: "FREEFRIDAY",
    type: "free_ride" as const,
    value: 0,
    minimum_amount: 0,
    maximum_discount: 5000,
    usage_limit: 200,
    usage_count: 67,
    per_user_limit: 1,
    applicable_ride_options: [1, 2, 3],
    applicable_ride_classes: [1, 2, 3],
    is_active: true,
    starts_at: "2024-01-01T00:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    user_restrictions: {},
    is_first_ride_only: false,
    is_shared_ride_only: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  }
];

// Demo discount statistics
export const demoDiscountStats = {
  total_discounts: 3,
  active_discounts: 3,
  inactive_discounts: 0,
  total_usage: 401,
  total_savings: 125000,
  this_month_usage: 45,
  this_month_savings: 15000
};

// Demo discount usage history
export const demoDiscountUsageHistory = [
  {
    id: 1,
    booking_id: 1001,
    discount_id: 1,
    discount: {
      name: "Welcome Bonus"
    },
    user: {
      name: "John Doe"
    },
    original_amount: 2500,
    discount_amount: 500,
    created_at: "2024-01-15T08:00:00Z"
  },
  {
    id: 2,
    booking_id: 1002,
    discount_id: 2,
    discount: {
      name: "Weekend Special"
    },
    user: {
      name: "Jane Smith"
    },
    original_amount: 3000,
    discount_amount: 500,
    created_at: "2024-01-15T09:15:00Z"
  },
  {
    id: 3,
    booking_id: 1003,
    discount_id: 3,
    discount: {
      name: "Free Ride Friday"
    },
    user: {
      name: "Mike Johnson"
    },
    original_amount: 1800,
    discount_amount: 1800,
    created_at: "2024-01-15T10:30:00Z"
  }
];

// Demo discounts response
export const demoDiscountsResponse = {
  success: true,
  message: "Discounts retrieved successfully",
  data: demoDiscounts,
  pagination: {
    current_page: 1,
    total_items: 3,
    total_pages: 1,
    per_page: 15
  },
  statistics: demoDiscountStats,
  usage_history: demoDiscountUsageHistory
};
