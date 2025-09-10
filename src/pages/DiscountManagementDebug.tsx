import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent, RefreshCw } from "lucide-react";
import { useDiscountManagement } from "@/hooks/useDiscountManagement";

const DiscountManagementDebug = () => {
  const { 
    discounts, 
    statistics, 
    pagination, 
    isLoading, 
    error, 
    refetch
  } = useDiscountManagement({
    per_page: 10,
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Discount Management - Debug
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Debugging data structure and API responses
          </p>
        </div>

        {/* Debug Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-green-500" />
              Debug Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Loading State:</h4>
                <p className="text-sm">{isLoading ? 'Loading...' : 'Not loading'}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Error State:</h4>
                <p className="text-sm text-red-600">{error ? error.message : 'No error'}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Discounts Count:</h4>
                <p className="text-sm">{discounts?.length || 0}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Has Statistics:</h4>
                <p className="text-sm">{statistics ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Raw Data:</h4>
              <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto max-h-40">
                {JSON.stringify({ discounts, statistics, pagination }, null, 2)}
              </pre>
            </div>

            <Button onClick={() => refetch()} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refetch Data
            </Button>
          </CardContent>
        </Card>

        {/* Simple Data Display */}
        {discounts && discounts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Discounts Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discounts.map((discount: any, index: number) => (
                  <div key={index} className="border rounded p-4">
                    <h4 className="font-semibold">{discount.name || `Discount #${index + 1}`}</h4>
                    <p className="text-sm text-gray-600">
                      Type: {discount.type || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Value: {discount.value || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Code: {discount.code || 'No code'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {discount.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {statistics && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistics Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{statistics.total_discounts || 0}</div>
                  <div className="text-sm text-gray-600">Total Discounts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{statistics.active_discounts || 0}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statistics.total_usage || 0}</div>
                  <div className="text-sm text-gray-600">Total Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{statistics.total_savings || 0}</div>
                  <div className="text-sm text-gray-600">Total Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default DiscountManagementDebug;


