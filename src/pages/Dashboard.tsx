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
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {

    const { data: statsResponse, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();
    const { rides, meta, isLoading: ridesLoading, error: ridesError, refetch } = useEnhancedRides();

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
      changeType: (displayStats?.ongoing_trips || 0) > 0 ? "positive" : "neutral" as const,
      variant: "green" as const,
      isLoading: statsLoading
    },
    {
      title: "Drivers Online", 
      value: displayStats?.online_drivers?.toString() || "0",
      icon: <Users className="w-6 h-6" />,
      change: `${displayStats?.online_drivers || 0} drivers available`,
      changeType: (displayStats?.online_drivers || 0) > 0 ? "positive" : "neutral" as const,
      variant: "orange" as const,
      isLoading: statsLoading
    },
    {
      title: "Pending Trips",
      value: displayStats?.pending_trips?.toString() || "0", 
      icon: <Clock className="w-6 h-6" />,
      change: `${displayStats?.pending_trips || 0} waiting`,
      changeType: (displayStats?.pending_trips || 0) > 0 ? "negative" : "neutral" as const,
      variant: "purple" as const,
      isLoading: statsLoading
    },
    {
      title: "Alerts/Panics",
      value: displayStats?.panics?.toString() || "0",
      icon: <AlertTriangle className="w-6 h-6" />,
      change: (displayStats?.panics || 0) > 0 ? `${displayStats?.panics || 0} active alerts` : "All clear",
      changeType: (displayStats?.panics || 0) > 0 ? "negative" : "positive" as const,
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to H-Cab Admin Dashboard</p>
          </div>
            <div className="flex items-center space-x-4">
              <ApiStatus 
                isConnected={!!stats && !statsError}
                isLoading={statsLoading}
                lastUpdated={stats ? new Date() : undefined}
                error={statsError?.message}
                fallbackMode={!stats && !statsLoading}
              />
              <button
                onClick={() => {
                  refetchStats();
                  refetch();
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                title="Refresh Dashboard Data"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsError ? (
            // Show error state for stats section only
            <div className="col-span-full">
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-destructive">Stats Loading Failed</h3>
                      <p className="text-sm text-muted-foreground">
                        {statsError.message || "Unable to load dashboard statistics"}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => refetchStats()}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Retry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Show stats cards normally
            statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
            ))
          )}
        </div>

        {/* Map and Recent Rides */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map */}
          <div className="xl:col-span-2">
            {statsError ? (
              <Card className="border-orange-200 bg-orange-50 h-full">
                <CardContent className="p-6 flex items-center justify-center h-full">
                  <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-orange-800 mb-2">Map Unavailable</h3>
                    <p className="text-sm text-orange-700 mb-3">
                      Map requires stats data to display driver and trip information
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => refetchStats()}
                      className="bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Retry Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
            <MapSection 
              onlineDrivers={displayStats?.online_drivers || 0}
              activeTrips={displayStats?.ongoing_trips || 0}
            />
            )}
          </div>

          {/* Recent Rides Table */}
          <div className="xl:col-span-1">
            {ridesError ? (
              // Show error state for rides section only
              <Card className="border-destructive/50 bg-destructive/5 h-fit">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-destructive text-sm">Rides Loading Failed</h3>
                      <p className="text-xs text-muted-foreground">
                        {ridesError.message || "Unable to load recent rides"}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => refetch()}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs px-2 py-1"
                    >
                      Retry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
            <DataTable 
              title="Recent Rides"
              columns={recentRideColumns}
              data={recentRides}
              className="h-fit"
              isLoading={ridesLoading}
              actions={false}
            />
            )}
          </div>
        </div>

        {/* Full Rides Table */}
        {ridesError ? (
          // Show error state for rides table section only
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">Rides Table Loading Failed</h3>
                  <p className="text-sm text-muted-foreground">
                    {ridesError.message || "Unable to load rides data"}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => refetch()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
        <DataTable 
          title="All Rides"
          columns={rideColumns}
          data={rides || []}
          isLoading={ridesLoading}
          searchable={true}
          onRefresh={refetch}
          searchPlaceholder="Search rides..."
        />
        )}
        
        {/* Pagination Info */}
        {!ridesError && rides && rides.length > 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Showing {rides.length} rides
            {meta && (
              <span> • Page {meta.current_page} of {meta.total_pages} • Total: {meta.total_items}</span>
            )}
          </div>
        )}
      </div>
      
    </AdminLayout>
  );
};

export default Dashboard;