import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const PanicReportTest = () => {
  console.log('🚨 TEST COMPONENT: Rendering PanicReportTest');
  
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
        {/* Simple Header */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <div className="px-6 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Panic Reports - Test</h1>
                <p className="text-gray-600 text-lg">Testing basic rendering</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Test Card */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Test Status</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">✅ Component is rendering successfully!</p>
                  <p className="text-green-700 text-sm">This confirms the basic structure works.</p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium">🔍 Next Steps:</p>
                  <ul className="text-blue-700 text-sm mt-2 space-y-1">
                    <li>• Check browser console for any error messages</li>
                    <li>• Verify the API calls are being made</li>
                    <li>• Check if data is being received</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">⚠️ If you see this, the issue is with data fetching, not rendering</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Test Button */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">API Test</h2>
              <Button 
                onClick={() => {
                  console.log('🚨 TEST: Button clicked, testing API call...');
                  fetch('https://api.hcab.tech/api/v1/admin/panic-reports')
                    .then(response => {
                      console.log('🚨 TEST: API Response status:', response.status);
                      return response.json();
                    })
                    .then(data => {
                      console.log('🚨 TEST: API Response data:', data);
                    })
                    .catch(error => {
                      console.error('🚨 TEST: API Error:', error);
                    });
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Test API Call
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PanicReportTest;

