import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { usePanicManagementData } from "@/hooks/usePanicManagement";
import { useState } from "react";

const PanicManagementWorking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);

  // API call with minimal parameters
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
    limit,
  });

  const handleResolvePanic = (panicId: number) => {
    if (window.confirm('Are you sure you want to mark this panic report as resolved?')) {
      resolvePanic(panicId);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Panic Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Emergency Response & Safety Monitoring
              </p>
            </div>
            <Button
              onClick={() => refetch()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="text-lg font-bold text-red-800">Error Loading Data</h3>
                  <p className="text-red-600">{error.message}</p>
                </div>
                <Button onClick={() => refetch()} variant="outline" className="border-red-300 text-red-700">
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.total_reports}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Unresolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{statistics.unresolved_reports}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{statistics.resolved_reports}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Recent (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{statistics.recent_reports}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Panic Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Panic Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                <p>Loading panic reports...</p>
              </div>
            ) : panicReports.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No panic reports found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {panicReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-semibold">#{report.id}</span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {report.user.role}
                          </span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            report.is_resolved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {report.is_resolved ? 'Resolved' : 'Unresolved'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p><strong>User:</strong> {report.user.name} ({report.user.phone})</p>
                          <p><strong>Location:</strong> {report.location}</p>
                          {report.description && (
                            <p><strong>Description:</strong> {report.description}</p>
                          )}
                          <p><strong>Reported:</strong> {new Date(report.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {!report.is_resolved && (
                          <Button
                            size="sm"
                            onClick={() => handleResolvePanic(report.id)}
                            disabled={isResolving}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination Info */}
        {pagination && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {pagination.current_page} of {pagination.total_pages} pages 
            ({pagination.total_items} total reports)
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PanicManagementWorking;
