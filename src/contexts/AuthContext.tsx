import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '@/lib/services/AuthService';
import { TokenStorage } from '@/lib/utils/TokenStorage';
import { AuthContextType, AuthState, LoginCredentials, User } from '@/lib/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    
    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading: false,
    };
  });

  const checkAuth = async () => {
    console.log('AuthContext: checkAuth called, token exists:', !!state.token);
    
    if (!state.token) {
      console.log('AuthContext: No token found, setting loading to false');
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      console.log('AuthContext: Starting token verification');
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Check if token is expired
      if (TokenStorage.isTokenExpired(state.token)) {
        console.log('AuthContext: Token expired, logging out');
        logout();
        return;
      }

      // Verify token with backend
      const user = await AuthService.verifyToken(state.token);
      console.log('AuthContext: Token verified, user role:', user.role);
      
      // For now, accept any authenticated user (backend should handle permissions)
      // TODO: Implement proper role-based access control
      console.log('AuthContext: User verified with role:', user.role);
      
      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
      console.log('AuthContext: Authentication state updated');
      
      // Update stored user data
      TokenStorage.saveUser(user);
    } catch (error) {
      console.error('AuthContext: Token verification failed:', error);
      logout();
    }
  };

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
        
        // Update state
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        console.log('AuthContext: State updated, isAuthenticated:', true);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.token) {
        await AuthService.logout(state.token);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear storage and state regardless of API call success
      TokenStorage.clearAll();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

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
  }, [state.token]);

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
