import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('ProtectedRoute: Render state:', { isAuthenticated, isLoading });

  useEffect(() => {
    console.log('ProtectedRoute: Effect 1 - checking auth');
    // Only check authentication on mount, not when isAuthenticated changes
    if (!isAuthenticated && !isLoading) {
      console.log('ProtectedRoute: Calling checkAuth');
      checkAuth().catch(() => {
        console.log('ProtectedRoute: checkAuth failed, redirecting to login');
        navigate('/login');
      });
    }
  }, [checkAuth, navigate]); // Removed isAuthenticated and isLoading from dependencies

  useEffect(() => {
    console.log('ProtectedRoute: Effect 2 - redirecting if not authenticated');
    // Redirect to login if not authenticated after loading
    if (!isLoading && !isAuthenticated) {
      console.log('ProtectedRoute: Redirecting to login');
      
      // Store the current path for redirect after login
      const currentPath = location.pathname + location.search;
      if (currentPath !== '/login') {
        localStorage.setItem('auth_redirect_path', currentPath);
      }
      
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

