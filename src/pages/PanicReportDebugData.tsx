import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { usePanicManagementData } from "@/hooks/usePanicManagement";
import { useState } from "react";

const PanicReportDebugData = () => {
  const [showDebug, setShowDebug] = useState(true);
  
  console.log('🚨 DEBUG DATA: Component rendering');
  
  // Fetch panic data with enhanced parameters
  const { 
    panicReports, 
    statistics, 
    pagination, 
    isLoading, 
    error, 
    refetch
  } = usePanicManagementData({
    page: 1,
    limit: 10
  });

  console.log('🚨 DEBUG DATA: Hook data =', {
    panicReports: panicReports?.length || 0,
    hasStatistics: !!statistics,
    hasPagination: !!pagination,
    isLoading,
    error: error?.message
  });

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <div className="px-6 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Panic Reports - Debug Data</h1>
                <p className="text-gray-600 text-lg">Testing data fetching hooks</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Debug Panel - Always Visible */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-yellow-800">Data Fetching Debug</h3>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowDebug(!showDebug)}
                >
                  {showDebug ? 'Hide' : 'Show'} Details
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
                  <p><strong>Has Error:</strong> {error ? 'Yes' : 'No'}</p>
                  <p><strong>Error Message:</strong> {error?.message || 'None'}</p>
                  <p><strong>Error Type:</strong> {error?.name || 'None'}</p>
                </div>
                <div>
                  <p><strong>Panic Reports:</strong> {panicReports?.length || 0}</p>
                  <p><strong>Has Statistics:</strong> {statistics ? 'Yes' : 'No'}</p>
                  <p><strong>Has Pagination:</strong> {pagination ? 'Yes' : 'No'}</p>
                  <p><strong>Data Type:</strong> {Array.isArray(panicReports) ? 'Array' : typeof panicReports}</p>
                </div>
              </div>

              {showDebug && (
                <div className="mt-4 space-y-4">
                  {error && (
                    <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Error Details:</h4>
                      <p className="text-red-700 text-sm font-mono">{error.message}</p>
                      {error.stack && (
                        <details className="mt-2">
                          <summary className="text-sm text-red-600 cursor-pointer">Stack Trace</summary>
                          <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">{error.stack}</pre>
                        </details>
                      )}
                    </div>
                  )}

                  <div className="p-4 bg-blue-100 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Raw Data:</h4>
                    <pre className="text-xs text-blue-700 whitespace-pre-wrap">
                      {JSON.stringify({
                        panicReports: panicReports?.slice(0, 2), // Show first 2 items
                        statistics: statistics ? Object.keys(statistics) : null,
                        pagination: pagination,
                        isLoading,
                        error: error?.message
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-800">Loading Panic Reports...</h3>
                <p className="text-blue-600">Fetching data from API</p>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
                <p className="text-red-600 mb-4">{error.message}</p>
                <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Success State */}
          {!isLoading && !error && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-green-800">Data Loaded Successfully!</h3>
                <p className="text-green-600">
                  Found {panicReports?.length || 0} panic reports
                </p>
                {statistics && (
                  <p className="text-green-600">
                    Statistics: {Object.keys(statistics).length} fields available
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Test Button */}
          <div className="text-center">
            <Button 
              onClick={() => {
                console.log('🚨 DEBUG DATA: Manual test button clicked');
                console.log('🚨 DEBUG DATA: Current state =', {
                  isLoading,
                  error: error?.message,
                  panicReports: panicReports?.length,
                  statistics: !!statistics,
                  pagination: !!pagination
                });
                refetch();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Test Data Fetch
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PanicReportDebugData;
