import { 
  LoginCredentials, 
  LoginResponse, 
  LogoutResponse, 
  VerifyTokenResponse,
  User 
} from '../types/auth';

const API_BASE_URL = 'https://api.hcab.tech/api/v1/admin';
const API_BASE_URL_1 = 'https://api.hcab.tech/api/v1';

// Demo mode flag - set to false to use real API calls
const DEMO_MODE = false;

// Demo user data for testing (only used when DEMO_MODE is true)
const DEMO_USER: User = {
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

const DEMO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIFVzZXIiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBoY2FiLnRlY2giLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Demo mode login (only for testing)
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo validation
      if (credentials.username === 'admin' && credentials.password === 'password' && credentials.role === 'admin') {
        return {
          code: 200,
          message: 'Login successful',
          data: {
            token: DEMO_TOKEN,
            user: DEMO_USER,
          },
        };
      } else {
        throw new Error('Invalid username, password, or role');
      }
    }

    // Real API call to backend
    const response = await fetch(`${API_BASE_URL_1}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async logout(token: string): Promise<LogoutResponse> {
    // Demo mode logout (only for testing)
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        code: 200,
        message: 'Logout successful',
      };
    }

    // Real API call to backend
    const response = await fetch(`${API_BASE_URL_1}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async verifyToken(token: string): Promise<User> {
    // Demo mode token verification (only for testing)
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (token === DEMO_TOKEN) {
        return DEMO_USER;
      } else {
        throw new Error('Invalid token');
      }
    }

    // Real API call to backend
    const response = await fetch(`${API_BASE_URL_1}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: VerifyTokenResponse = await response.json();
    return data.data.user;
  }

  // Helper method to check if in demo mode
  static isDemoMode(): boolean {
    return DEMO_MODE;
  }

  // Helper method to get demo credentials (only for testing when demo mode is enabled)
  static getDemoCredentials(): { username: string; password: string; role: string } {
    return {
      username: 'admin',
      password: 'password',
      role: 'admin',
    };
  }
}
