# H-Cab Panic APIs Documentation

## Overview

The H-Cab Panic APIs provide comprehensive emergency management capabilities for both users and administrators. These APIs handle panic report submission, resolution, and monitoring to ensure user safety during rides.

## Table of Contents

1. [Authentication](#authentication)
2. [User Panic APIs](#user-panic-apis)
3. [Admin Panic APIs](#admin-panic-apis)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Examples](#examples)

---

## Authentication

All panic APIs require authentication using Bearer tokens:

```bash
Authorization: Bearer {your_access_token}
```

- **User APIs**: Require user authentication (driver or rider)
- **Admin APIs**: Require admin role authentication

---

## User Panic APIs

### 1. Report Panic

Submit a panic report during an emergency situation.

**Endpoint:** `POST /api/v1/panic`

**Authentication:** Required (User)

**Request Body:**
```json
{
  "booking_id": 123,
  "latitude": 4.0483,
  "longitude": 9.7043,
  "remarks": "Emergency situation"
}
```

**Parameters:**
- `booking_id` (optional): ID of the associated booking
- `latitude` (required): Latitude coordinate (-90 to 90)
- `longitude` (required): Longitude coordinate (-180 to 180)
- `remarks` (optional): Additional description of the emergency

**Response (200):**
```json
{
  "success": true,
  "message": "Panic report submitted successfully.",
  "data": {
    "id": 1,
    "user_id": 1,
    "booking_id": 123,
    "latitude": 4.0483,
    "longitude": 9.7043,
    "is_resolved": false,
    "description": "Emergency situation",
    "created_at": "2025-01-15T10:00:00.000000Z",
    "updated_at": "2025-01-15T10:00:00.000000Z"
  }
}
```

**Error Responses:**
- `400`: Validation error
- `403`: Unauthorized access to booking
- `500`: Server error

**Features:**
- Automatic SMS notifications to emergency contacts
- Email notifications to emergency contacts
- Location reverse geocoding
- Booking context validation

---

## Admin Panic APIs

### 1. List Panic Reports

Retrieve a paginated list of all panic reports with comprehensive details.

**Endpoint:** `GET /api/v1/admin/panic-reports`

**Authentication:** Required (Admin)

**Query Parameters:**
- `status` (optional): Filter by status (`resolved`, `unresolved`)
- `user_type` (optional): Filter by user type (`driver`, `rider`)
- `start_date` (optional): Start date filter (YYYY-MM-DD)
- `end_date` (optional): End date filter (YYYY-MM-DD)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `lang` (optional): Language preference (`en`, `fr`)

**Response (200):**
```json
{
  "success": true,
  "message": "Panic reports retrieved successfully",
  "data": [
    {
      "id": 1,
      "is_resolved": false,
      "latitude": 4.0483,
      "longitude": 9.7043,
      "description": "Emergency situation during ride",
      "location": "4.0483, 9.7043",
      "created_at": "2025-01-15T10:00:00.000000Z",
      "updated_at": "2025-01-15T10:00:00.000000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+237123456789",
        "username": "johndoe",
        "role": "driver",
        "is_active": true,
        "is_validated": true,
        "is_online": true
      },
      "booking": {
        "id": 1,
        "status": "in_progress",
        "source_name": "123 Main Street, Douala",
        "destination_name": "456 Airport Road, Douala",
        "ride_fare": 25.50,
        "booking_time": "2025-01-15T09:30:00.000000Z",
        "rider": {
          "id": 2,
          "name": "Jane Smith",
          "phone": "+237987654321"
        },
        "driver": {
          "id": 1,
          "name": "John Doe",
          "phone": "+237123456789"
        }
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_items": 50,
    "total_pages": 5,
    "limit": 10
  },
  "statistics": {
    "total_reports": 50,
    "resolved_reports": 30,
    "unresolved_reports": 20,
    "driver_reports": 25,
    "rider_reports": 25,
    "recent_reports": 15
  }
}
```

### 2. Resolve Panic Report

Mark a panic report as resolved.

**Endpoint:** `PUT /api/v1/admin/panic-reports/{id}/resolve`

**Authentication:** Required (Admin)

**Path Parameters:**
- `id`: Panic report ID

**Response (200):**
```json
{
  "success": true,
  "message": "Panic report marked as resolved.",
  "data": {
    "id": 1,
    "user_id": 1,
    "booking_id": 123,
    "latitude": 4.0483,
    "longitude": 9.7043,
    "is_resolved": true,
    "description": "Emergency situation",
    "created_at": "2025-01-15T10:00:00.000000Z",
    "updated_at": "2025-01-15T10:05:00.000000Z"
  }
}
```

**Error Responses:**
- `403`: Unauthorized (admin access required)
- `404`: Panic report not found
- `500`: Server error

---

## Data Models

### PanicReport Model

```json
{
  "id": 1,
  "user_id": 1,
  "booking_id": 123,
  "latitude": 4.0483,
  "longitude": 9.7043,
  "is_resolved": false,
  "description": "Emergency situation",
  "created_at": "2025-01-15T10:00:00.000000Z",
  "updated_at": "2025-01-15T10:00:00.000000Z"
}
```

**Fields:**
- `id`: Unique identifier
- `user_id`: ID of the user who reported the panic
- `booking_id`: Associated booking ID (nullable)
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate
- `is_resolved`: Resolution status (boolean)
- `description`: Additional description (nullable)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### User Model (in panic context)

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+237123456789",
  "username": "johndoe",
  "role": "driver",
  "is_active": true,
  "is_validated": true,
  "is_online": true
}
```

### Booking Model (in panic context)

```json
{
  "id": 1,
  "status": "in_progress",
  "source_name": "123 Main Street, Douala",
  "destination_name": "456 Airport Road, Douala",
  "ride_fare": 25.50,
  "booking_time": "2025-01-15T09:30:00.000000Z",
  "rider": {
    "id": 2,
    "name": "Jane Smith",
    "phone": "+237987654321"
  },
  "driver": {
    "id": 1,
    "name": "John Doe",
    "phone": "+237123456789"
  }
}
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "code": 400
}
```

### Common Error Codes

- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `422`: Unprocessable Entity - Validation errors
- `500`: Internal Server Error - Server error

### Validation Errors

```json
{
  "success": false,
  "message": "Validation error: The latitude field is required.",
  "code": 422
}
```

---

## Rate Limiting

Panic APIs have the following rate limits:

- **User Panic Report**: 5 requests per minute per user
- **Admin List Reports**: 100 requests per minute per admin
- **Admin Resolve Report**: 50 requests per minute per admin

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1640995200
```

---

## Examples

### 1. User Reports Panic During Ride

```bash
curl -X POST "https://api.h-cab.com/api/v1/panic" \
  -H "Authorization: Bearer {user_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "booking_id": 123,
    "latitude": 4.0483,
    "longitude": 9.7043,
    "remarks": "Driver is acting suspiciously"
  }'
```

### 2. Admin Lists Unresolved Panic Reports

```bash
curl -X GET "https://api.h-cab.com/api/v1/admin/panic-reports?status=unresolved&limit=20" \
  -H "Authorization: Bearer {admin_token}"
```

### 3. Admin Resolves Panic Report

```bash
curl -X PUT "https://api.h-cab.com/api/v1/admin/panic-reports/1/resolve" \
  -H "Authorization: Bearer {admin_token}"
```

### 4. Filter Panic Reports by Date Range

```bash
curl -X GET "https://api.h-cab.com/api/v1/admin/panic-reports?start_date=2025-01-01&end_date=2025-01-31" \
  -H "Authorization: Bearer {admin_token}"
```

### 5. Get Driver Panic Reports Only

```bash
curl -X GET "https://api.h-cab.com/api/v1/admin/panic-reports?user_type=driver" \
  -H "Authorization: Bearer {admin_token}"
```

---

## Security Considerations

### 1. Authentication
- All endpoints require valid Bearer tokens
- Admin endpoints verify admin role
- User endpoints verify user ownership of bookings

### 2. Data Privacy
- Panic reports contain sensitive location data
- Access is restricted to authorized users only
- All access is logged for audit purposes

### 3. Emergency Response
- Panic reports trigger immediate notifications
- SMS and email alerts are sent to emergency contacts
- Location data is used for emergency response coordination

---

## Integration Notes

### 1. Frontend Integration
- Use WebSocket connections for real-time panic alerts
- Implement map integration for location visualization
- Provide clear panic button UI for easy access

### 2. Emergency Contact Management
- Emergency contacts are managed separately
- SMS notifications use Twilio integration
- Email notifications use Laravel Mail system

### 3. Location Services
- Reverse geocoding provides human-readable addresses
- Coordinates are stored with 7 decimal precision
- Location data can be used for mapping and routing

---

## Monitoring and Logging

### 1. Logging
- All panic report submissions are logged
- Admin actions are tracked with timestamps
- Error conditions are logged with context

### 2. Metrics
- Panic report statistics are provided in list responses
- Resolution rates can be tracked over time
- Geographic distribution of panic reports

### 3. Alerts
- Real-time notifications for new panic reports
- Escalation procedures for unresolved reports
- Performance monitoring for API response times

---

## Support

For technical support or questions about the Panic APIs:

- **Documentation**: This document and inline API documentation
- **Testing**: Use the provided test scripts and Postman collections
- **Monitoring**: Check application logs for detailed error information
- **Emergency**: Contact emergency services directly for immediate assistance

---

*Last updated: January 2025*
*Version: 1.0*
