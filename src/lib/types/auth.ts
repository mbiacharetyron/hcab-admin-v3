export interface LoginCredentials {
  username: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface LogoutResponse {
  code: number;
  message: string;
}

export interface VerifyTokenResponse {
  code: number;
  message: string;
  data: {
    user: User;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  role: string;
  avatar?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}
