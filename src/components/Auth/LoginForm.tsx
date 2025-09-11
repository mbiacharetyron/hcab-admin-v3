import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Loader2, 
  Shield, 
  Eye, 
  EyeOff, 
  Info, 
  Zap, 
  User, 
  Lock, 
  Car, 
  Star, 
  Sparkles, 
  Crown, 
  Gem, 
  Award, 
  Target, 
  Activity, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor, 
  Wifi, 
  CheckCircle, 
  AlertTriangle,
  Sun,
  Moon,
  Palette,
  Languages,
  Settings,
  BarChart3,
  Users,
  DollarSign,
  MessageSquare,
  FileText,
  Bell,
  MapPin,
  Clock,
  Heart,
  Zap as Lightning
} from 'lucide-react';
import { TokenStorage } from '@/lib/utils/TokenStorage';
import { getFormErrors } from '@/lib/utils/validation';
import { FormErrors } from '@/lib/types/auth';
import { AuthService } from '@/lib/services/AuthService';
import { cn } from '@/lib/utils';

// Import the H-Cab logo
import logoImage from '@/assets/images/logos/logo.png';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/80 to-indigo-800/90"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-3xl transform translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-3xl transform -translate-x-40 translate-y-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl transform -translate-x-32 -translate-y-32 animate-pulse delay-500"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-white/20 animate-bounce delay-300">
        <Car className="w-8 h-8" />
      </div>
      <div className="absolute top-32 right-32 text-white/20 animate-bounce delay-700">
        <Star className="w-6 h-6" />
      </div>
      <div className="absolute bottom-32 left-32 text-white/20 animate-bounce delay-1000">
        <Crown className="w-7 h-7" />
      </div>
      <div className="absolute bottom-20 right-20 text-white/20 animate-bounce delay-500">
        <Gem className="w-6 h-6" />
      </div>
      
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">🇬🇧 English</span>
          <svg className="w-4 h-4 transition-transform hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20">
          <Sun className="w-4 h-4" />
          <span className="text-sm font-medium">Light</span>
        </div>
      </div>

      {/* Main Login Card */}
      <Card className="w-full max-w-lg shadow-2xl bg-white/95 backdrop-blur-md border-0 relative overflow-hidden">
        {/* Card Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center space-y-6 pb-8 pt-8">
            {/* Enhanced H-Cab Logo */}
            <div className="relative mx-auto">
              {/* Logo Container with Glow Effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-30 scale-110"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20">
                  <img 
                    src={logoImage} 
                    alt="H-Cab Logo" 
                    className="w-16 h-16 object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
              
              {/* Floating Elements around Logo */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse delay-500">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            </div>
            
            {/* Enhanced Title Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <Gem className="w-4 h-4 text-purple-500" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  H Cab
                </h1>
                <div className="flex items-center space-x-1">
                  <Gem className="w-4 h-4 text-purple-500" />
                  <Crown className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
              <p className="text-lg text-gray-600 font-medium">Admin Dashboard</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span>Real-time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            {/* Enhanced Demo Mode Notice */}
            {isDemoMode && (
              <Alert className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-blue-500 p-2 rounded-full">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <AlertDescription className="text-blue-800 font-medium">
                    <span className="font-bold">Demo Mode Active</span> - Use demo credentials for testing
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {/* Enhanced Production Mode Notice */}
            {!isDemoMode && (
              <Alert className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-100 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-green-500 p-2 rounded-full">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <AlertDescription className="text-green-800 font-medium">
                    <span className="font-bold">Production Mode</span> - Connecting to H-Cab backend API
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-3">
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-blue-500 p-1 rounded-full">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  Username
                </Label>
                <div className="relative group">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={isSubmitting || isLoading}
                    className={cn(
                      "w-full h-14 px-4 pl-12 border-2 rounded-2xl transition-all duration-300 text-lg font-medium",
                      "focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500",
                      "hover:border-blue-300 hover:shadow-lg",
                      errors.username 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-blue-500'
                    )}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-purple-500 p-1 rounded-full">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={isSubmitting || isLoading}
                    className={cn(
                      "w-full h-14 px-4 pl-12 pr-12 border-2 rounded-2xl transition-all duration-300 text-lg font-medium",
                      "focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                      "hover:border-purple-300 hover:shadow-lg",
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-purple-500'
                    )}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    disabled={isSubmitting || isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.password}
                  </p>
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
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                    disabled={isSubmitting || isLoading}
                    className="border-2 border-gray-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer font-medium">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium hover:underline"
                  disabled={isSubmitting || isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {errors.general && (
                <Alert variant="destructive" className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-100 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-30"></div>
                      <div className="relative bg-red-500 p-2 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <AlertDescription className="text-red-800 font-medium">
                      {errors.general}
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              {/* Demo Credentials Button - Only show when demo mode is enabled */}
              {isDemoMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDemoCredentials}
                  disabled={isSubmitting || isLoading}
                  className="w-full h-12 border-2 border-blue-300 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-400 transition-all duration-300 font-semibold rounded-2xl shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
                      <div className="relative bg-blue-500 p-1 rounded-full">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <span>Fill Demo Credentials</span>
                  </div>
                </Button>
              )}

              {/* Enhanced Login Button */}
              <Button 
                type="submit" 
                className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>{isDemoMode ? 'Signing in...' : 'Connecting to server...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                      <div className="relative bg-white/20 p-1 rounded-full">
                        <Shield className="w-5 h-5" />
                      </div>
                    </div>
                    <span>LOGIN TO DASHBOARD</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          {/* Enhanced Footer */}
          <div className="relative z-10 px-8 pb-6">
            <div className="border-t border-gray-200 pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Powered by HG</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure & Reliable</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span>Always Improving</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  © 2025 H-Cab Admin Dashboard. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
