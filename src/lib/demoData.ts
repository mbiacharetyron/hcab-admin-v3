// Demo data for testing when API is not available
import type { DashboardStats, Ride, User, RideOption, PanicReport, PanicReportsResponse } from './api';

export const demoDashboardStats: DashboardStats = {
  ongoing_trips: 12,
  online_drivers: 45,
  pending_trips: 8,
  panics: 3
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
      role: "rider"
    },
    booking: {
      id: 1001,
      status: "in_progress",
      source_name: "Douala International Airport",
      destination_name: "Hilton Hotel Douala",
      ride_fare: 2500
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
      role: "rider"
    },
    booking: {
      id: 1002,
      status: "completed",
      source_name: "Buea Town",
      destination_name: "University of Buea",
      ride_fare: 1800
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
      role: "driver"
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
      role: "rider"
    },
    booking: {
      id: 1004,
      status: "cancelled",
      source_name: "Limbe Beach",
      destination_name: "Limbe Wildlife Centre",
      ride_fare: 1500
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
      role: "rider"
    },
    booking: {
      id: 1005,
      status: "failed",
      source_name: "Kribi Beach",
      destination_name: "Kribi Port",
      ride_fare: 2800
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
