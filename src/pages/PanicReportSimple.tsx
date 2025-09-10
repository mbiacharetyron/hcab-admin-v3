import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Eye
} from "lucide-react";
import { usePanicManagementData } from "@/hooks/usePanicManagement";
import { useState } from "react";
import { format } from "date-fns";

const PanicReportSimple = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');

  // Fetch panic data with simple parameters
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
  });

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
        <div className="min-h-screen bg-gray-50">
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-600" />
              <h3 className="text-lg font-semibold">Loading Panic Reports...</h3>
              <p className="text-gray-600">Please wait while we fetch emergency data</p>
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
        <div className="min-h-screen bg-gray-50">
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <AlertTriangle className="w-8 h-8 mx-auto text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Failed to Load Panic Data</h3>
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
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Panic Reports</h1>
                  <p className="text-gray-600">Emergency reports requiring attention</p>
                </div>
              </div>
              <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Statistics Cards */}
          {statistics ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Reports</p>
                      <p className="text-2xl font-bold text-gray-900">{statistics.total_reports}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unresolved</p>
                      <p className="text-2xl font-bold text-orange-600">{statistics.unresolved_reports}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-green-600">{statistics.resolved_reports}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recent (24h)</p>
                      <p className="text-2xl font-bold text-blue-600">{statistics.recent_reports}</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-4">
                <div className="text-center text-gray-500">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                  <p>Statistics not available</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Status:</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="unresolved">Unresolved</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">User Type:</label>
                  <select 
                    value={userTypeFilter} 
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="driver">Drivers</option>
                    <option value="rider">Riders</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  Showing {pagination?.total_items || 0} reports
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panic Reports List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Emergency Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!panicReports || panicReports.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Panic Reports</h3>
                  <p className="text-gray-600">No emergency reports found for the current filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {panicReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-bold text-gray-900">#{report.id}</span>
                            {getUserTypeBadge(report.user?.role || 'rider')}
                            {getStatusBadge(report.is_resolved)}
                          </div>

                          {/* User Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>User Information</span>
                              </h4>
                              <div className="text-sm space-y-1">
                                <p><span className="font-medium">Name:</span> {report.user?.name || 'Unknown'}</p>
                                <p className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span className="font-medium">Phone:</span> {report.user?.phone || 'N/A'}
                                </p>
                                <p className="text-gray-600">{report.user?.email || 'N/A'}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>Location</span>
                              </h4>
                              <div className="text-sm space-y-1">
                                <p><span className="font-medium">Address:</span> {report.location || 'Unknown location'}</p>
                                <p className="text-gray-600">
                                  {report.latitude?.toFixed(6) || 'N/A'}, {report.longitude?.toFixed(6) || 'N/A'}
                                </p>
                                {report.description && (
                                  <p className="text-gray-600 italic">"{report.description}"</p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Booking Info */}
                          {report.booking && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                                <Car className="w-4 h-4" />
                                <span>Associated Booking</span>
                              </h4>
                              <div className="text-sm space-y-1">
                                <p><span className="font-medium">Booking ID:</span> #{report.booking.id}</p>
                                <p><span className="font-medium">Route:</span> {report.booking.source_name} → {report.booking.destination_name}</p>
                                <p><span className="font-medium">Status:</span> {report.booking.status}</p>
                                <p><span className="font-medium">Fare:</span> {report.booking.ride_fare} XAF</p>
                              </div>
                            </div>
                          )}

                          {/* Timestamp */}
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>Reported on {format(new Date(report.created_at), "MMM dd, yyyy 'at' HH:mm")}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="ml-4 flex flex-col space-y-2">
                          {!report.is_resolved && (
                            <Button
                              size="sm"
                              onClick={() => handleResolvePanic(report.id)}
                              disabled={isResolving}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 ? (
            <Card>
              <CardContent className="p-4">
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
                    >
                      Previous
                    </Button>
                    <span className="px-3 py-1 text-sm bg-gray-100 rounded">
                      {currentPage}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= pagination.total_pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PanicReportSimple;
