# Authentication Error Handling

This document describes the comprehensive authentication error handling system implemented in the H-Cab Admin Dashboard.

## Overview

The system automatically detects when API requests return authentication errors (specifically `{"message": "Unauthenticated."}`) and handles them gracefully by:

1. **Detecting Authentication Errors**: Automatically detecting 401 responses with "Unauthenticated." message
2. **Preserving User Intent**: Storing the current page URL for redirect after re-authentication
3. **User-Friendly Notifications**: Showing clear error messages to users
4. **Automatic Redirect**: Redirecting users to the login page
5. **Return to Original Page**: After successful login, redirecting users back to their intended destination

## How It Works

### 1. API Service Detection

The `ApiService` class in `src/lib/api.ts` automatically detects authentication errors:

```typescript
if (response.status === 401) {
  const errorData = await response.json().catch(() => ({}));
  if (errorData.message === 'Unauthenticated.') {
    this.handleAuthenticationError();
  }
}
```

### 2. Global Error Handler

When an authentication error is detected:

1. **Clear Token**: Immediately clears the stored authentication token
2. **Store Current Path**: Saves the current page URL (excluding login and root pages)
3. **Dispatch Event**: Sends a custom event to notify the authentication context
4. **User Notification**: Shows a user-friendly error message

### 3. Authentication Context Response

The `AuthContext` listens for authentication error events and:

1. **Logout User**: Clears user session and state
2. **Show Notification**: Displays a red notification with error message
3. **Auto-remove Notification**: Removes notification after 5 seconds

### 4. Route Protection

The `ProtectedRoute` component:

1. **Preserves Destination**: Stores the current path when redirecting to login
2. **Handles Redirects**: Manages navigation between protected routes and login

### 5. Login Form Redirect

After successful login, the `LoginForm`:

1. **Checks Stored Path**: Looks for a previously stored redirect path
2. **Redirects Appropriately**: Navigates to the stored path or defaults to dashboard
3. **Cleans Up**: Removes the stored redirect path

## User Experience Flow

1. **User is on a protected page** (e.g., `/dashboard/analytics`)
2. **Token expires** during API request
3. **System detects error** and shows notification: "Session expired. Please login again."
4. **User is redirected** to login page
5. **User logs in successfully**
6. **User is redirected back** to `/dashboard/analytics`

## Testing

You can test the authentication error handling by:

1. **Browser Console**: Run `testAuthError()` in the browser console
2. **Manual Token Expiry**: Wait for token to expire naturally
3. **API Simulation**: Modify API responses to return authentication errors

## Configuration

The system works automatically without additional configuration. Key behaviors:

- **Notification Duration**: 5 seconds
- **Excluded Paths**: `/login` and `/` (root) are not stored for redirect
- **Error Message**: "Session expired. Please login again."
- **Default Redirect**: Dashboard page if no stored path exists

## Files Modified

- `src/lib/api.ts` - API service with error detection
- `src/contexts/AuthContext.tsx` - Authentication context with error handling
- `src/components/Auth/ProtectedRoute.tsx` - Route protection with path preservation
- `src/components/Auth/LoginForm.tsx` - Login form with redirect logic

## Error Message Format

The system specifically looks for this error response format:

```json
{
  "message": "Unauthenticated."
}
```

This exact format triggers the authentication error handling flow.

## Benefits

- **Seamless User Experience**: Users don't lose their place in the application
- **Clear Communication**: Users understand what happened and what to do
- **Automatic Recovery**: System handles token expiry without manual intervention
- **Consistent Behavior**: All API endpoints are protected uniformly
- **Developer Friendly**: Easy to test and debug with provided utilities


