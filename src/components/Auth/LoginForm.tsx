import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Shield, Eye, EyeOff, Info, Zap } from 'lucide-react';
import { TokenStorage } from '@/lib/utils/TokenStorage';
import { getFormErrors } from '@/lib/utils/validation';
import { FormErrors } from '@/lib/types/auth';
import { AuthService } from '@/lib/services/AuthService';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin', // Default role is admin
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Load remember me preference
  useEffect(() => {
    const rememberMe = TokenStorage.getRememberMe();
    setFormData(prev => ({ ...prev, rememberMe }));
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (typeof value === 'string' && errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const formErrors = getFormErrors(formData.username, formData.password);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('Attempting login with credentials:', {
        username: formData.username,
        password: '***',
        role: formData.role
      });

      await login({
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });

      console.log('Login successful, navigating to dashboard');
      
      // Save remember me preference
      TokenStorage.setRememberMe(formData.rememberMe);
      
      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Login failed. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          errorMessage = 'Invalid username, password, or role. Please check your credentials.';
        } else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timeout. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setErrors({
        general: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    const demoCreds = AuthService.getDemoCredentials();
    setFormData(prev => ({
      ...prev,
      username: demoCreds.username,
      password: demoCreds.password,
      role: demoCreds.role,
    }));
    setErrors({});
  };

  const isDemoMode = AuthService.isDemoMode();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-40 translate-y-40"></div>
      
      {/* Language selector */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white cursor-pointer hover:bg-white/30 transition-colors">
          <span className="text-sm font-medium">🇬🇧 English</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-sm border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* H-Cab Logo */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-2">
            <div className="relative">
              <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-8 h-5 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
              </div>
              {/* Menu lines */}
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 space-y-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 space-y-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Hcab</CardTitle>
            <p className="text-gray-600">Admin Dashboard</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo Mode Notice - Only show when demo mode is enabled */}
          {isDemoMode && (
            <Alert className="border-blue-200 bg-blue-50">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                Demo mode is active. Use the demo credentials below for testing.
              </AlertDescription>
            </Alert>
          )}

          {/* Production Mode Notice - Show when demo mode is disabled */}
          {!isDemoMode && (
            <Alert className="border-green-200 bg-green-50">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Production mode: Connecting to H-Cab backend API.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={isSubmitting || isLoading}
                className={`w-full h-12 px-4 border-2 rounded-xl transition-colors ${
                  errors.username 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-blue-200 focus:border-blue-500'
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isSubmitting || isLoading}
                  className={`w-full h-12 px-4 pr-12 border-2 rounded-xl transition-colors ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-blue-200 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Role Field - Hidden but included in request */}
            <div className="hidden">
              <Input
                id="role"
                type="text"
                value={formData.role}
                readOnly
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                  disabled={isSubmitting || isLoading}
                  className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                disabled={isSubmitting || isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {errors.general && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Demo Credentials Button - Only show when demo mode is enabled */}
            {isDemoMode && (
              <Button
                type="button"
                variant="outline"
                onClick={fillDemoCredentials}
                disabled={isSubmitting || isLoading}
                className="w-full h-10 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Zap className="w-4 h-4 mr-2" />
                Fill Demo Credentials
              </Button>
            )}

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isDemoMode ? 'Signing in...' : 'Connecting to server...'}
                </>
              ) : (
                'LOGIN'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
