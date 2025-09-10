import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
    const { data: statsResponse, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();

    // Debug logging
    console.log('Dashboard Debug:', {
        statsResponse,
        statsLoading,
        statsError,
        hasData: !!statsResponse?.data
    });

    // Extract stats data from the response
    const stats = statsResponse?.data;

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
      value: `$${parseFloat(stats?.revenue?.total_revenue || "0").toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      change: `$${parseFloat(stats?.revenue?.this_month_revenue || "0").toLocaleString()} this month`,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="space-y-8 p-6">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 text-lg">Welcome to H-Cab Admin Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">System Online</span>
                    </div>
                  <div className="flex items-center space-x-2 text-gray-500">
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
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                  <Button
                  onClick={() => refetchStats()}
                  className="bg-blue-600 hover:bg-blue-700"
                    title="Refresh Dashboard Data"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    <span>Refresh Data</span>
                  </Button>
              </div>
            </div>
          </div>

          {/* Debug Info */}
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
          </Card>

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
              <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Metrics</h2>
              <p className="text-gray-600">Real-time overview of your H-Cab operations</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {primaryStatsData.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                          </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        {stat.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
              ))}
            </div>
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
                            <p className="font-semibold text-gray-900">${activity.amount}</p>
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
                    <span className="font-semibold">${stats?.trips?.average_fare?.toFixed(2) || "0.00"}</span>
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
                    <span className="font-semibold">${stats?.revenue?.today_revenue?.toLocaleString() || "0"}</span>
                    </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">${parseFloat(stats?.revenue?.this_month_revenue || "0").toLocaleString()}</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Ride Value</span>
                    <span className="font-semibold">${parseFloat(stats?.revenue?.average_ride_value || "0").toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discounts Given</span>
                    <span className="font-semibold text-orange-600">${parseFloat(stats?.revenue?.total_discounts_given || "0").toLocaleString()}</span>
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