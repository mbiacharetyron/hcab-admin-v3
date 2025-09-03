import { useAuth } from '@/contexts/AuthContext';
import { TokenStorage } from '@/lib/utils/TokenStorage';

export const AuthDebug = () => {
  const { user, token, isAuthenticated, isLoading } = useAuth();
  
  const storedToken = TokenStorage.getToken();
  const storedUser = TokenStorage.getUser();
  const isTokenExpired = storedToken ? TokenStorage.isTokenExpired(storedToken) : null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <div>Context State:</div>
        <div>• isAuthenticated: {String(isAuthenticated)}</div>
        <div>• isLoading: {String(isLoading)}</div>
        <div>• user: {user ? `${user.name} (${user.role})` : 'null'}</div>
        <div>• token: {token ? `${token.substring(0, 20)}...` : 'null'}</div>
        
        <div className="mt-2">Storage State:</div>
        <div>• storedToken: {storedToken ? `${storedToken.substring(0, 20)}...` : 'null'}</div>
        <div>• storedUser: {storedUser ? `${storedUser.name} (${storedUser.role})` : 'null'}</div>
        <div>• isTokenExpired: {String(isTokenExpired)}</div>
        
        <div className="mt-2">Actions:</div>
        <button 
          onClick={() => {
            console.log('Auth Context State:', { user, token, isAuthenticated, isLoading });
            console.log('Token Storage:', { 
              storedToken, 
              storedUser, 
              isTokenExpired 
            });
          }}
          className="bg-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-700"
        >
          Log to Console
        </button>
      </div>
    </div>
  );
};
