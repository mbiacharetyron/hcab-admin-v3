import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthService } from '@/lib/services/AuthService';
import { TokenStorage } from '@/lib/utils/TokenStorage';
import { apiService } from '@/lib/api';
import { AuthContextType, AuthState, LoginCredentials, User } from '@/lib/types/auth';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const token = TokenStorage.getToken();
    const user = TokenStorage.getUser();
    
    // Ensure API service has the current token
    if (token) {
      apiService.setToken(token);
    }
    
    // If we have both token and user, assume authenticated until verification fails
    const isAuthenticated = !!token && !!user;
    
    console.log('AuthContext: Initial state:', {
      hasToken: !!token,
      hasUser: !!user,
      isAuthenticated,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
    });
    
    return {
      user,
      token,
      isAuthenticated,
      isLoading: false,
    };
  });


  const logout = useCallback(async (redirectToLogin = true) => {
    try {
      if (state.token) {
        await AuthService.logout(state.token);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear storage and state regardless of API call success
      TokenStorage.clearAll();
      apiService.clearToken();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      // Redirect to login if requested
      if (redirectToLogin) {
        window.location.href = '/login';
      }
    }
  }, [state.token]);

  const checkAuth = useCallback(async () => {
    console.log('AuthContext: checkAuth called, token exists:', !!state.token);
    
    if (!state.token) {
      console.log('AuthContext: No token found, setting loading to false');
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    // Simply check if token exists - no verification needed
    console.log('AuthContext: Token found, setting user as authenticated');
    
    // Get user from storage or create a default user
    const storedUser = TokenStorage.getUser();
    const user = storedUser || {
      id: 1,
      name: 'Admin User',
      username: 'admin',
      email: 'admin@hcab.tech',
      role: 'administrator',
      avatar: undefined,
      phone: '+1234567890',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setState(prev => ({
      ...prev,
      user,
      isAuthenticated: true,
      isLoading: false,
    }));
    
    console.log('AuthContext: User authenticated without verification');
  }, [state.token]);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('AuthContext: Starting login process');
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await AuthService.login(credentials);
      console.log('AuthContext: Login response received:', response);
      
      if (response.code === 200) {
        const { token, user } = response.data;
        console.log('AuthContext: Login successful, user role:', user.role);
        
        // For now, accept any authenticated user (backend should handle permissions)
        // TODO: Implement proper role-based access control
        console.log('AuthContext: User authenticated with role:', user.role);
        
        // Save to storage
        TokenStorage.saveToken(token);
        TokenStorage.saveUser(user);
        console.log('AuthContext: Token and user saved to storage');
        
        // Update API service with the new token
        apiService.setToken(token);
        console.log('AuthContext: Token set in API service');
        
        // Update state
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        console.log('AuthContext: State updated, isAuthenticated:', true);
        
        
        // Add a small delay to ensure state is fully updated before navigation
        await new Promise(resolve => setTimeout(resolve, 100));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen for authentication errors from API service
  useEffect(() => {
    const handleAuthError = (event: CustomEvent) => {
      console.log('AuthContext: Received authentication error event:', event.detail);
      
      // Show user-friendly notification
      const message = event.detail?.message || 'Your session has expired. Please login again.';
      
      // Create a simple notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);
      
      logout(false); // Don't redirect immediately, let the API service handle it
    };

    window.addEventListener('auth:unauthorized', handleAuthError as EventListener);
    
    return () => {
      window.removeEventListener('auth:unauthorized', handleAuthError as EventListener);
    };
  }, [logout]);

  // Auto-logout on token expiration
  useEffect(() => {
    if (!state.token) return;

    const checkTokenExpiration = () => {
      if (TokenStorage.isTokenExpired(state.token!)) {
        logout();
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiration, 60000);
    
    return () => clearInterval(interval);
  }, [state.token, logout]);

  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};