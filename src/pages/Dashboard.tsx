import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapSection } from "@/components/Dashboard/MapSection";
import { 
  Car, 
  Users, 
  Clock, 
  AlertTriangle, 
  Calendar,
  TrendingUp,
  RefreshCw,
  DollarSign,
  Wallet,
  Percent,
  Activity,
  UserCheck,
  CreditCard,
  Shield
} from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboard";
import { useDriverLocations } from "@/hooks/useDriverLocations";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
    const { data: statsResponse, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();
    const { data: driverLocationsResponse, isLoading: driverLocationsLoading, refetch: refetchDriverLocations } = useDriverLocations();

    // Debug logging
    console.log('Dashboard Debug:', {
        statsResponse,
        statsLoading,
        statsError,
        hasData: !!statsResponse?.data,
        driverLocationsResponse,
        driverLocationsLoading
    });

    // Extract stats data from the response
    const stats = statsResponse?.data;

    // Transform driver locations data
    const driverLocations = driverLocationsResponse?.data
      ?.filter(driver => driver.latitude && driver.longitude) // Only include drivers with valid coordinates
      ?.map(driver => ({
        id: driver.id,
        name: driver.username || `Driver ${driver.id}`,
        lat: parseFloat(String(driver.latitude)),
        lng: parseFloat(String(driver.longitude)),
        isOnline: true // All drivers from this endpoint are online
      })) || [];

    // Create sample ride locations for demonstration
    // In a real app, this would come from an API endpoint with ride coordinates
    const rideLocations = [
      {
        id: 1,
        riderId: 101,
        pickup: { lat: 4.0483, lng: 9.7043 }, // Douala center
        destination: { lat: 4.0583, lng: 9.7143 }, // Nearby location
        status: 'in_progress'
      },
      {
        id: 2,
        riderId: 102,
        pickup: { lat: 4.0383, lng: 9.6943 }, // Another location
        destination: { lat: 4.0683, lng: 9.7243 }, // Another destination
        status: 'pending'
      }
    ];

    // Show loading state for initial load
    if (statsLoading) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                <RefreshCw className="w-8 h-8 text-white animate-spin" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-gray-900">Loading Dashboard</h3>
                                <p className="text-gray-600">Please wait while we fetch your dashboard data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
    
    // Check if stats data is available
    if (!stats && !statsLoading) {
      return (
        <AdminLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600 mb-2">Dashboard Data Error</h2>
              <p className="text-gray-600 mb-4">
                {statsError?.message || "Unable to load dashboard data. Please try again."}
              </p>
              <Button 
                onClick={() => refetchStats()} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </AdminLayout>
      );
    }

  // Simple stats cards
  const primaryStatsData = [
    {
      title: "Total Rides",
      value: stats?.trips?.total_this_month?.toLocaleString() || "0",
      icon: <Car className="w-6 h-6" />,
      change: `${stats?.trips?.completion_rate?.toFixed(1) || "0"}% completion rate`,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Active Rides", 
      value: stats?.trips?.ongoing_trips?.toString() || "0",
      icon: <Activity className="w-6 h-6" />,
      change: `${stats?.trips?.pending_trips || 0} pending`,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Online Drivers",
      value: stats?.drivers?.online_drivers?.toString() || "0", 
      icon: <Users className="w-6 h-6" />,
      change: `${stats?.drivers?.total_drivers || 0} total drivers`,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Total Revenue",
      value: `${parseFloat(stats?.revenue?.total_revenue || "0").toLocaleString()} XAF`,
      icon: <DollarSign className="w-6 h-6" />,
      change: `${parseFloat(stats?.revenue?.this_month_revenue || "0").toLocaleString()} XAF this month`,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
          <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Welcome to H-Cab Admin Dashboard</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 rounded-full w-fit">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">System Online</span>
          </div>
                  <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
          </div>
        </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="text-xs sm:text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                  <Button
                  onClick={() => refetchStats()}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                    title="Refresh Dashboard Data"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Refresh Data</span>
                    <span className="sm:hidden">Refresh</span>
                  </Button>
              </div>
            </div>
          </div>

          {/* Debug Info
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800">Debug Info</h3>
                  <p className="text-sm text-blue-700">
                    Loading: {statsLoading ? 'Yes' : 'No'} | 
                    Has Data: {stats ? 'Yes' : 'No'} | 
                    Error: {statsError ? statsError.message : 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Error Status */}
          {statsError && (
            <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">Dashboard Status</h3>
                  <p className="text-sm text-orange-700">
                      Stats data failed to load: {statsError.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
          <div>
              <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Key Metrics</h2>
              <p className="text-sm sm:text-base text-gray-600">Real-time overview of your H-Cab operations</p>
              </div>
              
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {primaryStatsData.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                      <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{stat.change}</p>
                          </div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                        {stat.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
              ))}
            </div>
          </div>

          {/* Live Map Section */}
          <div>
              <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Live Operations Map</h2>
              <p className="text-sm sm:text-base text-gray-600">Real-time view of drivers and active rides</p>
              {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-yellow-700">
                    <strong>Note:</strong> To enable the map, add your Google Maps API key to the environment variables as <code className="text-xs">VITE_GOOGLE_MAPS_API_KEY</code>
                  </p>
                </div>
              )}
        </div>

            <MapSection 
              onlineDrivers={stats?.drivers?.online_drivers || 0}
              activeTrips={stats?.trips?.ongoing_trips || 0}
                        driverLocations={driverLocations}
                        rideLocations={rideLocations}
                        onRefresh={() => {
                          refetchDriverLocations();
                refetchStats();
                        }}
                      />
                    </div>

          {/* Recent Activities Section */}
          {stats?.recent_activities && stats.recent_activities.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
                <p className="text-gray-600">Latest system activities and transactions</p>
                </div>

              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                  <div className="space-y-4">
                    {stats.recent_activities.slice(0, 5).map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            {activity.type === 'booking' ? (
                              <Car className="w-5 h-5 text-white" />
                            ) : (
                              <Activity className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{activity.message}</p>
                            <p className="text-sm text-gray-500">
                              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            activity.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : activity.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activity.status}
                    </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{activity.amount} XAF</p>
                </div>
              </div>
            </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
          </div>
          )}

          {/* Additional Stats */}
          <div>
              <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Metrics</h2>
              <p className="text-gray-600">More detailed system information</p>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Trips Analytics */}
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    <span>Trip Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">{stats?.trips?.total_this_month || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Month</span>
                    <span className="font-semibold">{stats?.trips?.total_last_month || 0}</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Today</span>
                    <span className="font-semibold text-green-600">{stats?.trips?.completed_today || 0}</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Fare</span>
                    <span className="font-semibold">{stats?.trips?.average_fare?.toFixed(2) || "0.00"} XAF</span>
                    </div>
                  </CardContent>
                </Card>

              {/* Driver Analytics */}
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Driver Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Drivers</span>
                    <span className="font-semibold">{stats?.drivers?.total_drivers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">With Cars</span>
                    <span className="font-semibold">{stats?.drivers?.drivers_with_cars || 0}</span>
                </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">With Documents</span>
                    <span className="font-semibold">{stats?.drivers?.drivers_with_documents || 0}</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Offline</span>
                    <span className="font-semibold text-gray-500">{stats?.drivers?.offline_drivers || 0}</span>
                        </div>
                </CardContent>
              </Card>

              {/* Revenue Analytics */}
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>Revenue Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Today</span>
                    <span className="font-semibold">{stats?.revenue?.today_revenue?.toLocaleString() || "0"} XAF</span>
                    </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">{parseFloat(stats?.revenue?.this_month_revenue || "0").toLocaleString()} XAF</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Ride Value</span>
                    <span className="font-semibold">{parseFloat(stats?.revenue?.average_ride_value || "0").toFixed(2)} XAF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discounts Given</span>
                    <span className="font-semibold text-orange-600">{parseFloat(stats?.revenue?.total_discounts_given || "0").toLocaleString()} XAF</span>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;