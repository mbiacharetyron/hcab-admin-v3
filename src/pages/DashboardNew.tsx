import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Star,
  Activity,
  Zap,
  Shield,
  Phone,
  Calendar,
  RefreshCw,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Timer,
  Navigation
} from "lucide-react";
import { useState, useEffect } from "react";
import { format, subDays, subHours, subMinutes } from "date-fns";

// Enhanced dummy data for comprehensive dashboard
const generateDashboardData = () => {
  const now = new Date();
  
  return {
    // Key Metrics
    metrics: {
      totalRides: 2847,
      activeRides: 23,
      onlineDrivers: 67,
      totalRevenue: 2847500,
      avgRating: 4.8,
      completionRate: 94.2,
      responseTime: 3.2,
      customerSatisfaction: 92.5
    },
    
    // Revenue Analytics
    revenue: {
      today: 125000,
      yesterday: 118500,
      thisWeek: 875000,
      lastWeek: 820000,
      thisMonth: 2847500,
      lastMonth: 2650000,
      growth: 7.4
    },
    
    // Ride Statistics
    rides: {
      completed: 2650,
      inProgress: 23,
      cancelled: 174,
      pending: 12,
      totalDistance: 45678, // km
      avgFare: 1250
    },
    
    // Driver Performance
    drivers: {
      total: 156,
      online: 67,
      offline: 89,
      topPerformers: [
        { id: 1, name: "Jean Baptiste", rating: 4.9, rides: 45, earnings: 125000 },
        { id: 2, name: "Marie Claire", rating: 4.8, rides: 42, earnings: 118000 },
        { id: 3, name: "Pierre Nguema", rating: 4.8, rides: 38, earnings: 112000 }
      ]
    },
    
    // Recent Activity
    recentActivity: [
      {
        id: 1,
        type: "ride_completed",
        message: "Ride #2847 completed successfully",
        time: subMinutes(now, 2),
        amount: 1500,
        status: "success"
      },
      {
        id: 2,
        type: "new_ride",
        message: "New ride request from Douala Airport",
        time: subMinutes(now, 5),
        amount: 2500,
        status: "pending"
      },
      {
        id: 3,
        type: "driver_online",
        message: "Driver Jean Baptiste came online",
        time: subMinutes(now, 8),
        status: "info"
      },
      {
        id: 4,
        type: "payment_received",
        message: "Payment of 1800 XAF received",
        time: subMinutes(now, 12),
        amount: 1800,
        status: "success"
      },
      {
        id: 5,
        type: "ride_cancelled",
        message: "Ride #2845 was cancelled",
        time: subMinutes(now, 15),
        status: "warning"
      }
    ],
    
    // Live Rides
    liveRides: [
      {
        id: 2847,
        rider: "John Doe",
        driver: "Jean Baptiste",
        pickup: "Douala Airport",
        destination: "Hilton Hotel",
        status: "in_progress",
        fare: 2500,
        estimatedArrival: subMinutes(now, 5),
        rating: 4.9
      },
      {
        id: 2848,
        rider: "Marie Smith",
        driver: "Pierre Nguema",
        pickup: "Buea Town",
        destination: "University of Buea",
        status: "picked_up",
        fare: 1800,
        estimatedArrival: subMinutes(now, 8),
        rating: 4.8
      },
      {
        id: 2849,
        rider: "David Johnson",
        driver: "Marie Claire",
        pickup: "Yaounde Central",
        destination: "Nkongsamba",
        status: "en_route",
        fare: 3200,
        estimatedArrival: subMinutes(now, 12),
        rating: 4.7
      }
    ],
    
    // Performance Trends (last 7 days)
    trends: {
      rides: [45, 52, 38, 61, 55, 48, 67],
      revenue: [85000, 95000, 72000, 110000, 98000, 89000, 125000],
      drivers: [45, 48, 42, 55, 52, 49, 67]
    },
    
    // System Status
    systemStatus: {
      api: "operational",
      database: "operational", 
      payment: "operational",
      notifications: "operational",
      maps: "operational"
    }
  };
};

const DashboardNew = () => {
  const [data, setData] = useState(generateDashboardData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateDashboardData());
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData(generateDashboardData());
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "error": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ride_completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "new_ride": return <Car className="w-4 h-4 text-blue-600" />;
      case "driver_online": return <Users className="w-4 h-4 text-green-600" />;
      case "payment_received": return <DollarSign className="w-4 h-4 text-green-600" />;
      case "ride_cancelled": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRideStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "picked_up": return "bg-green-100 text-green-800";
      case "en_route": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="space-y-8 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with H-Cab today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {format(lastUpdated, "HH:mm:ss")}
              </div>
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Rides</p>
                    <p className="text-3xl font-bold text-gray-900">{data.metrics.totalRides.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Rides</p>
                    <p className="text-3xl font-bold text-gray-900">{data.metrics.activeRides}</p>
                    <div className="flex items-center mt-2">
                      <Activity className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600">Live</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Online Drivers</p>
                    <p className="text-3xl font-bold text-gray-900">{data.metrics.onlineDrivers}</p>
                    <div className="flex items-center mt-2">
                      <Users className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">{Math.round((data.metrics.onlineDrivers / data.drivers.total) * 100)}% online</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{data.metrics.totalRevenue.toLocaleString()} XAF</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+{data.revenue.growth}%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{data.metrics.avgRating}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">Excellent</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{data.metrics.completionRate}%</p>
                    <Progress value={data.metrics.completionRate} className="mt-2" />
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">{data.metrics.responseTime}m</p>
                    <div className="flex items-center mt-2">
                      <Timer className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">Fast</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">{data.metrics.customerSatisfaction}%</p>
                    <Progress value={data.metrics.customerSatisfaction} className="mt-2" />
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Rides */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span>Live Rides</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {data.liveRides.length} Active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.liveRides.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Car className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Ride #{ride.id}</p>
                            <p className="text-sm text-gray-600">{ride.rider} → {ride.driver}</p>
                            <p className="text-xs text-gray-500">{ride.pickup} → {ride.destination}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getRideStatusColor(ride.status)}>
                            {ride.status.replace('_', ' ')}
                          </Badge>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{ride.fare} XAF</p>
                          <p className="text-xs text-gray-500">ETA: {format(ride.estimatedArrival, "HH:mm")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500">{format(activity.time, "HH:mm")}</p>
                            {activity.amount && (
                              <span className="text-xs font-semibold text-green-600">
                                {activity.amount} XAF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Performers & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performing Drivers */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>Top Performing Drivers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.drivers.topPerformers.map((driver, index) => (
                    <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{driver.name}</p>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">{driver.rating}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-600">{driver.rides} rides</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{driver.earnings.toLocaleString()} XAF</p>
                        <p className="text-xs text-gray-500">This week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(data.systemStatus).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${status === 'operational' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="font-medium text-gray-900 capitalize">{service}</span>
                      </div>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Overview */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Revenue Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{data.revenue.today.toLocaleString()} XAF</p>
                  <div className="flex items-center justify-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+5.5%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{data.revenue.thisWeek.toLocaleString()} XAF</p>
                  <div className="flex items-center justify-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+6.7%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{data.revenue.thisMonth.toLocaleString()} XAF</p>
                  <div className="flex items-center justify-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{data.revenue.growth}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Avg per Ride</p>
                  <p className="text-2xl font-bold text-gray-900">{data.rides.avgFare.toLocaleString()} XAF</p>
                  <div className="flex items-center justify-center mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+2.1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardNew;


