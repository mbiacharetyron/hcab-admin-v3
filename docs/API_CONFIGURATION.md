# API Configuration Guide

This guide explains how to configure the H-Cab Admin Dashboard to connect to your API.

## Current Configuration

The dashboard is already configured to consume the following API endpoint:

```
GET /api/v1/admin/dashboard/stats
```

**Response Format:**
```json
{
    "message": "Dashboard statistics retrieved successfully.",
    "data": {
        "ongoing_trips": 4,
        "online_drivers": 2,
        "pending_trips": 7,
        "panics": 2
    },
    "code": 200
}
```

## Environment Variables

To configure the API connection, you can set the following environment variables:

### For Development (create `.env.local` file)
```bash
# API Configuration
VITE_API_BASE_URL=https://api.hcab.tech/api/v1/admin

# Dashboard Configuration
VITE_DEMO_MODE=false
```

### For Production
```bash
# API Configuration
VITE_API_BASE_URL=https://your-production-api.com/api/v1/admin

# Dashboard Configuration
VITE_DEMO_MODE=false
```

## Configuration Options

### API Base URL
- **Default**: `https://api.hcab.tech/api/v1/admin`
- **Custom**: Set `VITE_API_BASE_URL` environment variable

### Demo Mode
- **Enabled**: `VITE_DEMO_MODE=true` (uses mock data)
- **Disabled**: `VITE_DEMO_MODE=false` (uses real API)

## Features

The dashboard automatically:

1. **Fetches real-time data** every 30 seconds from your API
2. **Displays statistics** in beautiful cards:
   - Active Trips
   - Drivers Online
   - Pending Trips
   - Alerts/Panics
3. **Handles authentication** using JWT tokens
4. **Provides error handling** and loading states
5. **Refreshes data** automatically

## Authentication

The dashboard expects JWT authentication. Make sure your API:
- Accepts `Authorization: Bearer {token}` headers
- Returns proper error responses for unauthorized requests
- Handles token expiration gracefully

## Testing

To test the API connection:

1. Set `VITE_DEMO_MODE=false` in your environment
2. Ensure your API is accessible
3. Start the development server: `npm run dev`
4. Login with valid credentials
5. Check the dashboard for real-time data

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your API allows requests from the dashboard domain
2. **Authentication Errors**: Check that your JWT token is valid
3. **Network Errors**: Verify the API base URL is correct and accessible

### Debug Mode

Enable debug logging by checking the browser console for API request/response details.

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API endpoint is working with tools like Postman
3. Ensure your authentication tokens are valid
