import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ApiTester = () => {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testEndpoint = async (endpoint: string, name: string) => {
    setLoading(name);
    try {
      const token = localStorage.getItem('hcab_admin_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`https://api.hcab.tech/api/v1${endpoint}`, {
        method: 'GET',
        headers,
      });

      const data = await response.json();
      
      setResults(prev => ({
        ...prev,
        [name]: {
          status: response.status,
          ok: response.ok,
          data,
          headers: Object.fromEntries(response.headers.entries())
        }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [name]: {
          error: error instanceof Error ? error.message : 'Unknown error',
          status: 'ERROR'
        }
      }));
    } finally {
      setLoading(null);
    }
  };

  const endpoints = [
    { path: '/admin/dashboard/stats', name: 'Dashboard Stats' },
    { path: '/auth/verify', name: 'Auth Verify' },
    { path: '/admin/dashboard/stats', name: 'Dashboard Stats (No Auth)' },
  ];

  return (
    <Card className="fixed top-4 left-4 w-96 max-h-96 overflow-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">API Endpoint Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {endpoints.map(({ path, name }) => (
          <div key={name} className="space-y-1">
            <Button
              size="sm"
              onClick={() => testEndpoint(path, name)}
              disabled={loading === name}
              className="w-full text-xs"
            >
              {loading === name ? 'Testing...' : `Test ${name}`}
            </Button>
            {results[name] && (
              <div className="text-xs bg-gray-100 p-2 rounded">
                <div className="font-bold">{name}:</div>
                <div>Status: {results[name].status}</div>
                {results[name].ok !== undefined && (
                  <div>OK: {String(results[name].ok)}</div>
                )}
                {results[name].data && (
                  <div>Data: {JSON.stringify(results[name].data, null, 2)}</div>
                )}
                {results[name].error && (
                  <div className="text-red-600">Error: {results[name].error}</div>
                )}
              </div>
            )}
          </div>
        ))}
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => setResults({})}
          className="w-full text-xs"
        >
          Clear Results
        </Button>
      </CardContent>
    </Card>
  );
};
