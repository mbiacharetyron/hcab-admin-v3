# H-Cab Admin Dashboard Authentication System

This document describes the comprehensive authentication system implemented for the H-Cab Admin Dashboard.

## Overview

The authentication system provides secure login/logout functionality with JWT token management, protected routes, and a modern user interface. It's designed to work with the H-Cab API endpoints and includes a demo mode for testing purposes (currently disabled).

## Features

- **Secure Login**: Username/password/role authentication with form validation
- **JWT Token Management**: Secure storage and automatic token validation
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Remember Me**: Persistent login state across browser sessions
- **Auto-logout**: Automatic logout on token expiration
- **Demo Mode**: Built-in demo credentials for testing (currently disabled)
- **Responsive Design**: Modern UI that works on all devices
- **Error Handling**: Comprehensive error messages and validation
- **Loading States**: Visual feedback during authentication operations
- **Real API Integration**: Direct connection to H-Cab backend services
- **Role-based Authentication**: Admin role automatically included in login requests

## Architecture

### Components Structure

```
src/
├── components/
│   └── Auth/
│       ├── LoginForm.tsx          # Main login form component
│       └── ProtectedRoute.tsx     # Route protection wrapper
├── contexts/
│   └── AuthContext.tsx            # Global authentication state
├── lib/
│   ├── services/
│   │   └── AuthService.ts         # API service for auth operations
│   ├── types/
│   │   └── auth.ts               # TypeScript interfaces
│   └── utils/
│       ├── TokenStorage.ts        # Token storage utilities
│       └── validation.ts         # Form validation functions
└── pages/
    └── Login.tsx                  # Login page wrapper
```

### Data Flow

1. **Login Process**:
   - User enters credentials
   - Form validation occurs
   - API call to `/auth/login` (real backend) with role="admin"
   - Token and user data stored
   - Redirect to dashboard

2. **Authentication Check**:
   - App startup checks for existing token
   - Token validation with backend (real API)
   - Auto-logout if token expired

3. **Route Protection**:
   - ProtectedRoute component checks auth status
   - Redirects to login if not authenticated
   - Shows loading state during auth check

## API Integration

### Base URL
```
https://api.hcab.tech/api/v1
```

### Endpoints

#### Login
- **POST** `/auth/login`
- **Request Body**: `{ username: string, password: string, role: "admin" }`
- **Response**: `{ code: 200, message: string, data: { token: string, user: UserObject } }`

#### Logout
- **POST** `/auth/logout`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ code: 200, message: string }`

#### Verify Token
- **GET** `/auth/verify`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ code: 200, message: string, data: { user: UserObject } }`

## Demo Mode

The system includes a demo mode for testing purposes, but it's currently **DISABLED**:

- **Demo Credentials** (only available when demo mode is enabled):
  - Username: `admin`
  - Password: `password`
  - Role: `admin`
- **Demo Token**: Pre-generated JWT token for testing
- **Demo User**: Sample user data with admin role

**To enable demo mode for testing**, modify the `DEMO_MODE` constant in `src/lib/services/AuthService.ts`:
```typescript
const DEMO_MODE = true; // Set to true for demo mode
```

**Current Status**: Demo mode is disabled (`DEMO_MODE = false`), so the system makes real API calls to the H-Cab backend.

## Usage

### Basic Login

```tsx
import { useAuth } from '@/contexts/AuthContext';

const { login, isAuthenticated } = useAuth();

const handleLogin = async () => {
  try {
    await login({ 
      username: 'your_username', 
      password: 'your_password',
      role: 'admin' // Role is automatically set to 'admin'
    });
    // Redirect will happen automatically
  } catch (error) {
    // Handle error
  }
};
```

### Protected Routes

```tsx
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Logout

```tsx
import { useAuth } from '@/contexts/AuthContext';

const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  // Redirect will happen automatically
};
```

## Security Features

### Token Storage
- Secure localStorage implementation
- Automatic token expiration checking
- Secure token removal on logout

### Form Validation
- Username format validation (alphanumeric, underscores, hyphens, min 3 chars)
- Required field validation
- Password strength requirements
- Real-time error clearing

### Route Protection
- Automatic authentication checks
- Redirect protection for unauthenticated users
- Loading states during auth verification

### API Security
- HTTPS enforcement for all API calls
- Bearer token authentication
- Proper error handling and logging
- Network error detection and user feedback
- Role-based authentication (admin role required)

### Role-based Authentication
- **Admin Role**: Automatically included in all login requests
- **Hidden Field**: Role field is hidden from UI but sent with request
- **Backend Validation**: Server validates role along with credentials
- **Security**: Prevents unauthorized role access

## Styling and UI

### Design System
- Modern, clean interface
- Blue color scheme matching H-Cab branding
- Responsive design for all screen sizes
- Smooth animations and transitions

### Components Used
- Custom UI components from `@/components/ui/`
- Lucide React icons
- Tailwind CSS for styling
- Responsive grid and flexbox layouts

## Configuration

### Environment Variables
No environment variables are required for basic functionality. The API base URL is hardcoded but can be easily modified.

### Demo Mode Toggle
```typescript
// In src/lib/services/AuthService.ts
const DEMO_MODE = false; // Currently disabled - set to true for demo mode
```

### Token Storage Keys
```typescript
// In src/lib/utils/TokenStorage.ts
private static readonly TOKEN_KEY = 'hcab_admin_token';
private static readonly USER_KEY = 'hcab_admin_user';
private static readonly REMEMBER_ME_KEY = 'hcab_remember_me';
```

### Role Configuration
```typescript
// In src/components/Auth/LoginForm.tsx
const [formData, setFormData] = useState({
  username: '',
  password: '',
  role: 'admin', // Default role - can be modified if needed
  rememberMe: false,
});
```

## Error Handling

### Validation Errors
- Field-specific error messages
- Real-time validation feedback
- Clear error display

### API Errors
- Network error handling with user-friendly messages
- HTTP status code handling (401, 500, etc.)
- Connection timeout detection
- Server error feedback

### Authentication Errors
- Token expiration handling
- Invalid credentials feedback
- Graceful fallback behaviors
- Network connectivity issues
- Role validation errors

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features supported
- LocalStorage support required
- Responsive design for mobile devices

## Testing

### Production Testing
1. Navigate to `/login`
2. Use real H-Cab backend credentials
3. Test form validation
4. Test protected route access
5. Test logout functionality
6. Verify real API integration
7. Verify role="admin" is sent in login request

### Demo Mode Testing (when enabled)
1. Set `DEMO_MODE = true` in AuthService
2. Use "Fill Demo Credentials" button
3. Test login with demo data
4. Verify dashboard access
5. Test logout and redirect

## Troubleshooting

### Common Issues

1. **Login Fails**: Check API endpoint availability and credentials
2. **Network Errors**: Verify internet connection and API endpoint accessibility
3. **Token Expired**: System will auto-logout, user needs to re-login
4. **Route Protection Issues**: Ensure ProtectedRoute wraps protected components
5. **API Connection Issues**: Check if `https://api.hcab.tech` is accessible
6. **Role Validation Errors**: Ensure backend accepts role="admin" in login request

### Debug Information
- Check browser console for error messages
- Verify localStorage contents
- Check network tab for API calls
- Verify authentication context state
- Check API endpoint accessibility
- Verify role field is included in login request body

## Production Deployment

### Current Status
- ✅ Demo mode disabled
- ✅ Real API integration enabled
- ✅ Production-ready error handling
- ✅ Network error detection
- ✅ User-friendly error messages
- ✅ Role-based authentication (admin role)

### API Requirements
- Backend must be accessible at `https://api.hcab.tech/api/v1`
- Authentication endpoints must be functional
- Backend must accept and validate role="admin" in login request
- CORS must be properly configured
- SSL certificate must be valid

## Future Enhancements

- [ ] Refresh token implementation
- [ ] Multi-factor authentication
- [ ] Session timeout warnings
- [ ] Remember me with secure cookies
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Role-based access control
- [ ] Audit logging
- [ ] API rate limiting
- [ ] Offline mode support
- [ ] Multiple role support
- [ ] Role switching functionality

## Support

For technical support or questions about the authentication system, please refer to the development team or create an issue in the project repository.
