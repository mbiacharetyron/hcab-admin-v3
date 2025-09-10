import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  XCircle,
  MapPin,
  User,
  Car,
  Clock,
  Phone,
  Eye,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  BarChart3,
  Map,
  Activity,
  Shield,
  Zap,
  Target,
  Users,
  Timer,
  Globe,
  Filter
} from "lucide-react";
import { usePanicManagementData } from "@/hooks/usePanicManagement";
import { useState } from "react";
import { format, subDays, subWeeks, subMonths } from "date-fns";
import { API_CONFIG } from "@/config/api";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const PanicReportEnhanced = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  // console.log('🚨 COMPONENT DEBUG: PanicReportEnhanced rendering');

  // Calculate date filters
  const getDateFilters = () => {
    const today = new Date();
    switch (dateRange) {
      case 'today':
        return {
          start_date: format(today, 'yyyy-MM-dd'),
          end_date: format(today, 'yyyy-MM-dd')
        };
      case 'week':
        return {
          start_date: format(subWeeks(today, 1), 'yyyy-MM-dd'),
          end_date: format(today, 'yyyy-MM-dd')
        };
      case 'month':
        return {
          start_date: format(subMonths(today, 1), 'yyyy-MM-dd'),
          end_date: format(today, 'yyyy-MM-dd')
        };
      default:
        return {};
    }
  };

  const dateFilters = getDateFilters();

  // Fetch panic data with enhanced parameters
  const { 
    panicReports, 
    statistics, 
    pagination, 
    isLoading, 
    error, 
    refetch,
    resolvePanic,
    isResolving
  } = usePanicManagementData({
    page: currentPage,
    limit: 10,
    status: statusFilter !== 'all' ? statusFilter as 'resolved' | 'unresolved' : undefined,
    user_type: userTypeFilter !== 'all' ? userTypeFilter as 'driver' | 'rider' : undefined,
    ...dateFilters
  });

  // console.log('🚨 COMPONENT DEBUG: Data received =', {
  //   panicReports: panicReports?.length || 0,
  //   hasStatistics: !!statistics,
  //   hasPagination: !!pagination,
  //   isLoading,
  //   error: error?.message,
  //   isResolving
  // });

  // Helper functions
  const getStatusBadge = (isResolved: boolean) => {
    if (isResolved) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Unresolved
        </Badge>
      );
    }
  };

  const getUserTypeBadge = (role: 'driver' | 'rider') => {
    if (role === 'driver') {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Car className="w-3 h-3 mr-1" />
          Driver
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          <User className="w-3 h-3 mr-1" />
          Rider
        </Badge>
      );
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency.toLowerCase()) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'average':
        return 'text-yellow-600 bg-yellow-100';
      case 'needs improvement':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleResolvePanic = (panicId: number) => {
    if (window.confirm('Are you sure you want to mark this panic report as resolved?')) {
      resolvePanic(panicId);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Loading state
  if (isLoading && !panicReports?.length) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Loading Panic Reports</h3>
                <p className="text-gray-600">Please wait while we fetch emergency data and analytics...</p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <AlertTriangle className="w-16 h-16 mx-auto text-red-600" />
              <h3 className="text-xl font-bold text-red-800">Failed to Load Panic Data</h3>
              <p className="text-red-600">{error.message || "Unable to load panic reports"}</p>
              <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }


  return (
    <ErrorBoundary>
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <div className="px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Panic Reports</h1>
                    <p className="text-gray-600 text-lg">Emergency reports and comprehensive analytics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getUrgencyColor(statistics?.insights?.urgency_level || 'low')}`}>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span className="font-medium">Urgency: {statistics?.insights?.urgency_level || 'Low'}</span>
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
                  {API_CONFIG.DEMO_MODE && (
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="font-medium">Demo Mode</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Debug Panel */}
          {debugMode && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-yellow-800">Debug Information</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setDebugMode(false)}
                  >
                    Hide Debug
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>API Mode:</strong> {API_CONFIG.DEMO_MODE ? 'Demo' : 'Production'}</p>
                    <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
                    <p><strong>Has Error:</strong> {error ? 'Yes' : 'No'}</p>
                    <p><strong>Error Message:</strong> {error?.message || 'None'}</p>
                  </div>
                  <div>
                    <p><strong>Panic Reports:</strong> {panicReports?.length || 0}</p>
                    <p><strong>Has Statistics:</strong> {statistics ? 'Yes' : 'No'}</p>
                    <p><strong>Has Pagination:</strong> {pagination ? 'Yes' : 'No'}</p>
                    <p><strong>Current Page:</strong> {currentPage}</p>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded">
                    <p className="text-red-800 font-medium">Error Details:</p>
                    <p className="text-red-700 text-sm">{error.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Debug Toggle Button */}
          {/* {!debugMode && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDebugMode(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                Show Debug Info
              </Button>
            </div>
          )} */}

          {/* Enhanced Statistics Overview */}
          {(statistics || !isLoading) && (
            <div className="space-y-6">
              {/* Primary Stats */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Reports</p>
                          <p className="text-3xl font-bold text-gray-900">{statistics?.total_reports || 0}</p>
                          <div className="flex items-center mt-2">
                            {getTrendIcon(statistics?.trend_direction?.monthly || 'stable')}
                            <span className="text-sm text-gray-600 ml-1">
                              {statistics?.monthly_trend > 0 ? '+' : ''}{statistics?.monthly_trend || 0} this month
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Unresolved</p>
                          <p className="text-3xl font-bold text-orange-600">{statistics?.unresolved_reports || 0}</p>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${statistics?.total_reports ? (statistics.unresolved_reports / statistics.total_reports) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <XCircle className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                          <p className="text-3xl font-bold text-green-600">{(statistics?.resolution_rate_percentage || 0).toFixed(1)}%</p>
                          <div className="flex items-center mt-2">
                            {getTrendIcon(statistics?.trend_direction?.resolution || 'stable')}
                            <span className="text-sm text-gray-600 ml-1">
                              {(statistics?.resolution_trend || 0) > 0 ? '+' : ''}{statistics?.resolution_trend || 0}% trend
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                          <p className="text-3xl font-bold text-blue-600">{(statistics?.average_resolution_time_hours || 0).toFixed(1)}h</p>
                          <div className="flex items-center mt-2">
                            <Timer className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600 ml-1">
                              {statistics?.insights?.resolution_efficiency || 'Good'}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Time-Based Analytics */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Time-Based Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>Recent Activity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Today</span>
                        <span className="font-semibold">{statistics.reports_today}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Yesterday</span>
                        <span className="font-semibold">{statistics.reports_yesterday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">This Week</span>
                        <span className="font-semibold">{statistics.reports_this_week}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Week</span>
                        <span className="font-semibold">{statistics.reports_last_week}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-semibold">{statistics.reports_this_month}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Month</span>
                        <span className="font-semibold">{statistics.reports_last_month}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <span>Resolution Progress</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Resolved Today</span>
                        <span className="font-semibold text-green-600">{statistics.resolved_today}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Resolved This Week</span>
                        <span className="font-semibold text-green-600">{statistics.resolved_this_week}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Resolved This Month</span>
                        <span className="font-semibold text-green-600">{statistics.resolved_this_month}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Overall Resolution Rate</span>
                          <span className="text-sm font-semibold">{statistics.resolution_rate_percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={statistics.resolution_rate_percentage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Geographic & Peak Hours Analysis */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Geographic & Time Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Map className="w-5 h-5 text-purple-600" />
                        <span>Top Locations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {statistics.top_locations?.slice(0, 5).map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{location.location}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{location.count}</p>
                              <p className="text-xs text-gray-500">reports</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-orange-600" />
                        <span>Peak Hours</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {statistics.peak_hours?.slice(0, 5).map((peak, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <Clock className="w-4 h-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{peak.time_period}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{peak.count}</p>
                              <p className="text-xs text-gray-500">reports</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Context Analysis & Insights */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Context Analysis & Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Car className="w-5 h-5 text-blue-600" />
                        <span>Booking Context</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">With Booking</span>
                        <span className="font-semibold">{statistics.reports_with_booking}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Without Booking</span>
                        <span className="font-semibold">{statistics.reports_without_booking}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Booking Context</span>
                          <span className="text-sm font-semibold">{statistics.booking_context_percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={statistics.booking_context_percentage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        <span>User Distribution</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Driver Reports</span>
                        <span className="font-semibold">{statistics.driver_reports}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rider Reports</span>
                        <span className="font-semibold">{statistics.rider_reports}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Primary Source</span>
                          <span className="text-sm font-semibold">{statistics.insights?.primary_source}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${(statistics.driver_reports / (statistics.driver_reports + statistics.rider_reports)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span>System Insights</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Most Active Period</span>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {statistics.insights?.most_active_period}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Resolution Efficiency</span>
                          <Badge className={getEfficiencyColor(statistics.insights?.resolution_efficiency || 'Good')}>
                            {statistics.insights?.resolution_efficiency}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Urgency Level</span>
                          <Badge className={getUrgencyColor(statistics.insights?.urgency_level || 'Low')}>
                            {statistics.insights?.urgency_level}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Filters */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <span>Filters & Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="unresolved">Unresolved</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">User Type</label>
                  <select 
                    value={userTypeFilter} 
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Users</option>
                    <option value="driver">Drivers</option>
                    <option value="rider">Riders</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date Range</label>
                  <select 
                    value={dateRange} 
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Results</label>
                  <div className="text-sm text-gray-600 py-2">
                    {pagination?.total_items || 0} reports found
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Panic Reports List */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Emergency Reports</span>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {pagination?.total_items || 0} Total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!panicReports || panicReports.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Panic Reports</h3>
                  <p className="text-gray-600">No emergency reports found for the current filters.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {panicReports.map((report) => (
                    <div key={report.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50/50 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-4">
                          {/* Header */}
                          <div className="flex items-center space-x-4">
                            <span className="text-xl font-bold text-gray-900">#{report.id}</span>
                            {getUserTypeBadge(report.user?.role || 'rider')}
                            {getStatusBadge(report.is_resolved)}
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{format(new Date(report.created_at), "MMM dd, yyyy 'at' HH:mm")}</span>
                            </div>
                          </div>

                          {/* User & Location Info */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <User className="w-5 h-5" />
                                <span>User Information</span>
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <p><span className="font-medium">Name:</span> {report.user?.name || 'Unknown'}</p>
                                <p className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4" />
                                  <span className="font-medium">Phone:</span> {report.user?.phone || 'N/A'}
                                </p>
                                <p className="text-gray-600">{report.user?.email || 'N/A'}</p>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${report.user?.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                  <span className="text-sm text-gray-600">
                                    {report.user?.is_online ? 'Online' : 'Offline'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <MapPin className="w-5 h-5" />
                                <span>Location Details</span>
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <p><span className="font-medium">Address:</span> {report.location || 'Unknown location'}</p>
                                <p className="text-gray-600 font-mono text-sm">
                                  {report.latitude ? parseFloat(report.latitude).toFixed(6) : 'N/A'}, {report.longitude ? parseFloat(report.longitude).toFixed(6) : 'N/A'}
                                </p>
                                {report.description && (
                                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                    <p className="text-sm text-gray-700 italic">"{report.description}"</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Booking Info */}
                          {report.booking && (
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <Car className="w-5 h-5" />
                                <span>Associated Booking</span>
                              </h4>
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p><span className="font-medium">Booking ID:</span> #{report.booking.id}</p>
                                    <p><span className="font-medium">Status:</span> 
                                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                                        {report.booking.status}
                                      </Badge>
                                    </p>
                                  </div>
                                  <div>
                                    <p><span className="font-medium">Fare:</span> {report.booking.ride_fare} XAF</p>
                                    <p><span className="font-medium">Time:</span> {format(new Date(report.booking.booking_time), "MMM dd, HH:mm")}</p>
                                  </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-blue-200">
                                  <p><span className="font-medium">Route:</span></p>
                                  <p className="text-sm text-gray-700">
                                    {report.booking.source_name} → {report.booking.destination_name}
                                  </p>
                                </div>
                                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium text-sm">Rider:</p>
                                    <p className="text-sm text-gray-700">{report.booking.rider.name} ({report.booking.rider.phone})</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">Driver:</p>
                                    <p className="text-sm text-gray-700">{report.booking.driver.name} ({report.booking.driver.phone})</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="ml-6 flex flex-col space-y-3">
                          {!report.is_resolved && (
                            <Button
                              size="sm"
                              onClick={() => handleResolvePanic(report.id)}
                              disabled={isResolving}
                              className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Resolve
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            View on Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {panicReports?.length || 0} of {pagination.total_items} reports
                    (Page {pagination.current_page} of {pagination.total_pages})
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="hover:bg-gray-50"
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg font-medium">
                      {currentPage}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= pagination.total_pages}
                      className="hover:bg-gray-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
    </ErrorBoundary>
  );
};

export default PanicReportEnhanced;
