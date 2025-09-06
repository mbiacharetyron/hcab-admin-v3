import { AdminLayout } from "@/components/Layout/AdminLayout";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { MapSection } from "@/components/Dashboard/MapSection";
import { ApiStatus } from "@/components/Dashboard/ApiStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Users, 
  Clock, 
  AlertTriangle, 
  Calendar,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from "lucide-react";
import { useDashboardStats, useEnhancedRides } from "@/hooks/useDashboard";
import { useDriverLocations } from "@/hooks/useDriverLocations";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
    const { data: statsResponse, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();
    const { rides, meta, isLoading: ridesLoading, error: ridesError, refetch } = useEnhancedRides();
    const { data: driverLocationsResponse, isLoading: driverLocationsLoading, refetch: refetchDriverLocations } = useDriverLocations();

    // Show loading state if any critical data is loading
    const isInitialLoading = statsLoading || ridesLoading || driverLocationsLoading;

    // Extract stats data from the response
    const stats = statsResponse?.data;

    // Fallback demo data if API fails
    const fallbackStats = {
      ongoing_trips: 4,
      online_drivers: 2,
      pending_trips: 7,
      panics: 2
    };

    // Use fallback data if API fails
    const displayStats = stats || fallbackStats;

    // Show loading state for initial load
    if (isInitialLoading) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-large">
                                <RefreshCw className="w-8 h-8 text-white animate-spin" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-foreground">Loading Dashboard</h3>
                                <p className="text-muted-foreground">Please wait while we fetch your dashboard data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

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

    // Transform ride locations data (using recent rides)
    const rideLocations = rides?.slice(0, 5).map(ride => ({
      id: ride.id,
      riderId: ride.rider_id,
      pickup: {
        lat: parseFloat(String(ride.source_lat)) || 4.0483,
        lng: parseFloat(String(ride.source_lng)) || 9.7043
      },
      destination: {
        lat: parseFloat(String(ride.destination_lat)) || 4.0483,
        lng: parseFloat(String(ride.destination_lng)) || 9.7043
      },
      status: ride.status
    })) || [];
    
    // Ensure displayStats is always defined
    if (!displayStats) {
      return (
        <AdminLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600 mb-2">Dashboard Data Error</h2>
              <p className="text-gray-600 mb-4">Unable to load dashboard data. Please try again.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        </AdminLayout>
      );
    }

  // Prepare stats data for the cards
  const statsData = [
    {
      title: "Active Trips",
      value: displayStats?.ongoing_trips?.toString() || "0",
      icon: <Car className="w-6 h-6" />,
      change: `${(displayStats?.ongoing_trips || 0) > 0 ? '+' : ''}${displayStats?.ongoing_trips || 0} active now`,
      changeType: ((displayStats?.ongoing_trips || 0) > 0 ? "positive" : "neutral") as "positive" | "neutral" | "negative",
      variant: "green" as const,
      isLoading: statsLoading
    },
    {
      title: "Drivers Online", 
      value: displayStats?.online_drivers?.toString() || "0",
      icon: <Users className="w-6 h-6" />,
      change: `${displayStats?.online_drivers || 0} drivers available`,
      changeType: ((displayStats?.online_drivers || 0) > 0 ? "positive" : "neutral") as "positive" | "neutral" | "negative",
      variant: "orange" as const,
      isLoading: statsLoading
    },
    {
      title: "Pending Trips",
      value: displayStats?.pending_trips?.toString() || "0", 
      icon: <Clock className="w-6 h-6" />,
      change: `${displayStats?.pending_trips || 0} waiting`,
      changeType: ((displayStats?.pending_trips || 0) > 0 ? "negative" : "neutral") as "positive" | "neutral" | "negative",
      variant: "purple" as const,
      isLoading: statsLoading
    },
    {
      title: "Alerts/Panics",
      value: displayStats?.panics?.toString() || "0",
      icon: <AlertTriangle className="w-6 h-6" />,
      change: (displayStats?.panics || 0) > 0 ? `${displayStats?.panics || 0} active alerts` : "All clear",
      changeType: ((displayStats?.panics || 0) > 0 ? "negative" : "positive") as "positive" | "neutral" | "negative",
      variant: "red" as const,
      isLoading: statsLoading
    }
  ];


  // Get recent rides (last 3)
  const recentRides = rides?.slice(0, 3) || [];

  // Define table columns
  const rideColumns: DataTableColumn[] = [
    { key: "id", title: "ID", width: "80px" },
    { key: "rider_id", title: "RIDER ID", width: "100px" },
    { key: "source_name", title: "SOURCE", width: "250px" },
    { key: "destination_name", title: "DESTINATION", width: "250px" },
    { key: "booking_time", title: "BOOKING TIME", width: "150px" },
    { key: "status", title: "STATUS", width: "100px" },
    { key: "ride_type", title: "TYPE", width: "100px" },
    { key: "final_fare", title: "FARE", width: "100px" },
    { key: "is_paid", title: "PAID", width: "80px" }
  ];

  // Recent rides columns (fewer columns for sidebar)
  const recentRideColumns: DataTableColumn[] = [
    { key: "id", title: "ID", width: "60px" },
    { key: "rider_id", title: "RIDER", width: "80px" },
    { key: "source_name", title: "SOURCE", width: "150px" },
    { key: "status", title: "STATUS", width: "80px" }
  ];

  // Individual section error handling - don't crash the entire dashboard
  const hasCriticalError = false; // We'll handle errors per section instead
    
    // Add a simple loading check
    if (statsLoading && ridesLoading) {
    return (
      <AdminLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
              <p className="text-sm text-gray-500 mt-2">Stats: {statsLoading ? 'Loading' : 'Loaded'}, Rides: {ridesLoading ? 'Loading' : 'Loaded'}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="space-y-8 p-6">
          {/* Enhanced Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-large">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        Dashboard
                      </h1>
                      <p className="text-muted-foreground text-lg">Welcome to H-Cab Admin Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-success-light rounded-full">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-success font-medium">System Online</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <ApiStatus 
                    isConnected={!!stats && !statsError}
                    isLoading={statsLoading}
                    lastUpdated={stats ? new Date() : undefined}
                    error={statsError?.message}
                    fallbackMode={!stats && !statsLoading}
                  />
                  <Button
                    onClick={() => {
                      refetchStats();
                      refetch();
                    }}
                    className="bg-gradient-primary hover:shadow-medium transition-all duration-300 hover:scale-105"
                    title="Refresh Dashboard Data"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    <span>Refresh Data</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        {/* Dashboard Status Summary */}
        {(statsError || ridesError) && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">Dashboard Status</h3>
                  <p className="text-sm text-orange-700">
                    {statsError && ridesError 
                      ? "Both stats and rides data failed to load" 
                      : statsError 
                      ? "Stats data failed to load" 
                      : "Rides data failed to load"
                    }. Other sections continue to work normally.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

          {/* Enhanced Stats Cards */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Key Metrics</h2>
                <p className="text-muted-foreground">Real-time overview of your H-Cab operations</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsError ? (
                  // Show error state for stats section only
                  <div className="col-span-full">
                    <Card className="border-destructive/50 bg-destructive/5 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-destructive text-lg">Stats Loading Failed</h3>
                            <p className="text-sm text-muted-foreground">
                              {statsError.message || "Unable to load dashboard statistics"}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => refetchStats()}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 transition-all duration-300"
                          >
                            Retry
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  // Show stats cards normally with staggered animation
                  statsData.map((stat, index) => (
                    <div 
                      key={index} 
                      className="animate-in slide-in-from-bottom-4 fade-in duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <StatsCard {...stat} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Map and Recent Rides Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Live Operations</h2>
                <p className="text-muted-foreground">Real-time map view and recent ride activity</p>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Enhanced Map */}
                <div className="xl:col-span-2">
                  {statsError ? (
                    <Card className="border-orange-200 bg-orange-50/80 backdrop-blur-sm h-full">
                      <CardContent className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="font-semibold text-orange-800 mb-2 text-lg">Map Unavailable</h3>
                          <p className="text-sm text-orange-700 mb-4 max-w-sm">
                            Map requires stats data to display driver and trip information
                          </p>
                          <Button 
                            size="sm" 
                            onClick={() => refetchStats()}
                            className="bg-orange-600 text-white hover:bg-orange-700 hover:scale-105 transition-all duration-300"
                          >
                            Retry Stats
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="animate-in slide-in-from-left-4 fade-in duration-700">
                      <MapSection 
                        onlineDrivers={displayStats?.online_drivers || 0}
                        activeTrips={displayStats?.ongoing_trips || 0}
                        driverLocations={driverLocations}
                        rideLocations={rideLocations}
                        onRefresh={() => {
                          refetchDriverLocations();
                          refetch();
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Enhanced Recent Rides Table */}
                <div className="xl:col-span-1">
                  {ridesError ? (
                    // Show error state for rides section only
                    <Card className="border-destructive/50 bg-destructive/5/80 backdrop-blur-sm h-fit">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-destructive">Rides Loading Failed</h3>
                            <p className="text-xs text-muted-foreground">
                              {ridesError.message || "Unable to load recent rides"}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => refetch()}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 transition-all duration-300"
                          >
                            Retry
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-700" style={{ animationDelay: '200ms' }}>
                      <DataTable 
                        title="Recent Rides"
                        columns={recentRideColumns}
                        data={recentRides}
                        className="h-fit"
                        isLoading={ridesLoading}
                        actions={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Full Rides Table */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">All Rides</h2>
                <p className="text-muted-foreground">Complete overview of all ride transactions</p>
              </div>
              
              {ridesError ? (
                // Show error state for rides table section only
                <Card className="border-destructive/50 bg-destructive/5/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-destructive text-lg">Rides Table Loading Failed</h3>
                        <p className="text-sm text-muted-foreground">
                          {ridesError.message || "Unable to load rides data"}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => refetch()}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 transition-all duration-300"
                      >
                        Retry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-700" style={{ animationDelay: '400ms' }}>
                  <DataTable 
                    title="All Rides"
                    columns={rideColumns}
                    data={rides || []}
                    isLoading={ridesLoading}
                    searchable={true}
                    onRefresh={refetch}
                    searchPlaceholder="Search rides..."
                  />
                </div>
              )}
              
              {/* Enhanced Pagination Info */}
              {!ridesError && rides && rides.length > 0 && (
                <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Showing {rides.length} rides</span>
                      </div>
                      {meta && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Page {String(meta.current_page)} of {String(meta.total_pages)}</span>
                        </div>
                      )}
                    </div>
                    {meta && (
                      <div className="text-sm font-medium text-foreground">
                        Total: {String(meta.total_items)} rides
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </AdminLayout>
  );
};

export default Dashboard;