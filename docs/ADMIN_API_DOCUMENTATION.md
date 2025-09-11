# Admin API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Dashboard & Statistics APIs](#dashboard--statistics-apis)
7. [User Management APIs](#user-management-apis)
8. [Ride Management APIs](#ride-management-apis)
9. [Ride Class Management APIs](#ride-class-management-apis)
10. [Ride Option Management APIs](#ride-option-management-apis)
11. [Wallet & Transaction APIs](#wallet--transaction-apis)
12. [Revenue Management APIs](#revenue-management-apis)
13. [Discount Management APIs](#discount-management-apis)
14. [FAQ Management APIs](#faq-management-apis)
15. [Notification APIs](#notification-apis)
16. [Panic Report APIs](#panic-report-apis)
17. [Payment Integration APIs](#payment-integration-apis)
18. [Best Practices](#best-practices)
19. [Rate Limiting](#rate-limiting)

## Overview

The Admin API provides comprehensive management capabilities for the H-Cab ride-sharing platform. It includes endpoints for managing users, rides, payments, notifications, and system analytics. All admin endpoints require proper authentication and admin role authorization.

## Authentication

All admin API endpoints require Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your_access_token}
```

### Getting an Access Token

1. Login via the admin login endpoint
2. Use the returned access token for subsequent API calls
3. Tokens expire after a specified time period

## Base URL

```
https://your-domain.com/api/v1/admin
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "code": 400
}
```

## Error Handling

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (Admin access required)
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Language Support
Most endpoints support dual language responses (English/French) via the `lang` query parameter:
- `?lang=en` (default)
- `?lang=fr`

---

## Dashboard & Statistics APIs

### Get Dashboard Statistics
**GET** `/dashboard/stats`

Retrieve key dashboard metrics including ongoing trips, online drivers, pending trips, and panic alerts.

#### Parameters
- `lang` (optional): Language preference (`en` or `fr`)

#### Response
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "ongoing_trips": 5,
    "online_drivers": 20,
    "pending_trips": 8,
    "panics": 2
  }
}
```

### Get Daily Ride Statistics
**GET** `/daily-ride-stats`

Get daily ride statistics for the past 7 days.

#### Parameters
- `lang` (optional): Language preference
- `days` (optional): Number of days to retrieve (default: 7)

#### Response
```json
{
  "success": true,
  "message": "Daily ride statistics retrieved successfully",
  "data": [
    {
      "date": "2025-01-15",
      "total_rides": 45,
      "completed_rides": 42,
      "cancelled_rides": 3,
      "revenue": 1250.50
    }
  ]
}
```

### Get Weekly Ride Statistics
**GET** `/weekly-ride-stats`

Get weekly ride statistics for the past 4 weeks.

#### Response
```json
{
  "success": true,
  "message": "Weekly ride statistics retrieved successfully",
  "data": [
    {
      "week": "2025-W03",
      "total_rides": 280,
      "completed_rides": 265,
      "cancelled_rides": 15,
      "revenue": 8750.25
    }
  ]
}
```

---

## User Management APIs

### List Drivers
**GET** `/drivers`

Retrieve a paginated list of all drivers with dashboard statistics, search, and filtering capabilities.

#### Parameters
- `search` (optional): Search by name, email, phone, or username
- `online_status` (optional): Filter by online status (`online`, `offline`, `all`)
- `validated` (optional): Filter by validation status (`validated`, `invalidated`, `all`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `lang` (optional): Language preference

#### Response
```json
{
  "message": "Drivers retrieved successfully",
  "statistics": {
    "total_drivers": 4,
    "online_drivers": 0,
    "offline_drivers": 4,
    "validated_drivers": 1
  },
  "drivers": [
    {
      "id": 252,
      "name": "Garth Tonye Biaga Fog",
      "email": "du4life@hotmail.fr",
      "phone": "+237693890763",
      "username": "Tony",
      "is_online": false,
      "is_validated": false,
      "created_at": "09/02/2025"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_items": 4,
    "total_pages": 1,
    "limit": 10
  }
}
```

### List Riders
**GET** `/riders`

Retrieve a paginated list of all riders with filtering capabilities.

#### Parameters
- `search` (optional): Search by name, email, phone, or username
- `is_validated` (optional): Filter by validation status
- `is_active` (optional): Filter by active status
- `start_date` (optional): Filter by creation date (YYYY-MM-DD)
- `end_date` (optional): Filter by creation date (YYYY-MM-DD)
- `page` (optional): Page number
- `limit` (optional): Items per page
- `lang` (optional): Language preference

### Get User Details
**GET** `/user/{id}`

Retrieve detailed information about a specific user.

#### Parameters
- `id`: User ID
- `lang` (optional): Language preference

#### Response
```json
{
  "success": true,
  "message": "User details retrieved successfully",
  "data": {
    "id": 252,
    "name": "Garth Tonye Biaga Fog",
    "email": "du4life@hotmail.fr",
    "phone": "+237693890763",
    "username": "Tony",
    "role": "driver",
    "is_online": false,
    "is_validated": false,
    "is_active": true,
    "created_at": "2025-02-09T00:00:00.000000Z",
    "updated_at": "2025-02-09T00:00:00.000000Z"
  }
}
```

### Get Online Drivers Coordinates
**GET** `/drivers/online-coordinates`

Get real-time coordinates of all online drivers for map display.

#### Response
```json
{
  "success": true,
  "message": "Online driver coordinates fetched successfully",
  "data": [
    {
      "id": 123,
      "username": "Driver1",
      "latitude": 4.0511,
      "longitude": 9.7679
    }
  ]
}
```

### Delete User Account
**DELETE** `/user/{id}/delete-account`

Permanently delete a user account (soft delete).

#### Parameters
- `id`: User ID
- `lang` (optional): Language preference

---

## Ride Management APIs

### List Rides
**GET** `/rides`

Retrieve a paginated list of all rides with filtering capabilities.

#### Parameters
- `ride_type` (optional): Filter by ride type
- `status` (optional): Filter by status (`pending`, `in_progress`, `completed`, `cancelled`)
- `start_date` (optional): Start date filter (YYYY-MM-DD)
- `end_date` (optional): End date filter (YYYY-MM-DD)
- `page` (optional): Page number
- `limit` (optional): Items per page
- `lang` (optional): Language preference

#### Response
```json
{
  "success": true,
  "message": "Rides retrieved successfully",
  "data": [
    {
      "id": 1,
      "rider_id": 123,
      "driver_id": 456,
      "pickup_location": "Douala, Cameroon",
      "destination": "Yaounde, Cameroon",
      "status": "completed",
      "fare": 15000,
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_items": 50,
    "total_pages": 5,
    "limit": 10
  }
}
```

---

## Ride Class Management APIs

### List Ride Classes
**GET** `/ride-class`

Retrieve all available ride classes.

#### Response
```json
{
  "success": true,
  "message": "Ride classes retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Economy",
      "description": "Basic ride service",
      "base_fare": 500,
      "per_km_rate": 100,
      "is_active": true
    }
  ]
}
```

### Create Ride Class
**POST** `/ride-class`

Create a new ride class.

#### Request Body
```json
{
  "name": "Premium",
  "description": "Premium ride service with luxury vehicles",
  "base_fare": 1000,
  "per_km_rate": 200,
  "is_active": true
}
```

### Get Ride Class
**GET** `/ride-class/{id}`

Retrieve a specific ride class by ID.

### Update Ride Class
**PUT** `/ride-class/{id}`

Update an existing ride class.

### Delete Ride Class
**DELETE** `/ride-class/{id}`

Delete a ride class.

---

## Ride Option Management APIs

### List Ride Options
**GET** `/ride-option`

Retrieve all available ride options.

### Create Ride Option
**POST** `/ride-option`

Create a new ride option.

### Get Ride Option
**GET** `/ride-option/{id}`

Retrieve a specific ride option.

### Update Ride Option
**PUT** `/ride-option/{id}`

Update an existing ride option.

### Delete Ride Option
**DELETE** `/ride-option/{id}`

Delete a ride option.

### Assign Driver to Ride Option
**POST** `/ride-option/assign-driver`

Assign a driver to a specific ride option.

#### Request Body
```json
{
  "ride_option_id": 1,
  "driver_id": 123
}
```

### Unassign Driver from Ride Option
**POST** `/ride-option/unassign-driver`

Remove a driver from a ride option.

### List Driver Ride Options
**GET** `/ride-options/driver/{driver_id}`

Get all ride options assigned to a specific driver.

### List Driver Rides
**GET** `/driver/{driver_id}/rides`

Get all rides for a specific driver.

---

## Wallet & Transaction APIs

### Get Wallet Statistics
**GET** `/wallet-stats`

Retrieve overall wallet statistics including total balance, weekly transactions, and trends.

#### Response
```json
{
  "success": true,
  "message": "Wallet statistics retrieved successfully",
  "data": {
    "total_balance": 125000.50,
    "weekly_withdrawals": 45000.00,
    "weekly_deposits": 55000.00,
    "pending_transactions": 5000.00,
    "percentage_change": 12.5
  }
}
```

### List Wallet Transactions
**GET** `/wallet-transactions`

Retrieve a paginated list of all wallet transactions.

#### Parameters
- `type` (optional): Transaction type filter
- `status` (optional): Transaction status filter
- `start_date` (optional): Start date filter
- `end_date` (optional): End date filter
- `page` (optional): Page number
- `limit` (optional): Items per page
- `lang` (optional): Language preference

### Get S3P Account Balance
**GET** `/s3p/balance`

Get the current S3P payment gateway account balance.

#### Response
```json
{
  "success": true,
  "message": "Account balance retrieved successfully",
  "data": {
    "balance": 250000.00,
    "currency": "XAF",
    "last_updated": "2025-01-15T10:30:00Z"
  }
}
```

---

## Revenue Management APIs

### List Ride Revenues
**GET** `/revenue/rides`

Retrieve revenue data for all rides.

### Get Total Revenue
**GET** `/revenue/total`

Get total platform revenue statistics.

### Get Ride Revenue
**GET** `/revenue/rides/{rideId}`

Get revenue details for a specific ride.

### Get Revenue Statistics
**GET** `/revenue/stats`

Get comprehensive revenue statistics and analytics.

---

## Discount Management APIs

### List Discounts
**GET** `/discounts`

Retrieve all available discounts.

### Create Discount
**POST** `/discounts`

Create a new discount.

#### Request Body
```json
{
  "code": "WELCOME20",
  "description": "Welcome discount for new users",
  "type": "percentage",
  "value": 20,
  "min_amount": 1000,
  "max_discount": 5000,
  "usage_limit": 100,
  "valid_from": "2025-01-01",
  "valid_until": "2025-12-31",
  "is_active": true
}
```

### Get Discount
**GET** `/discounts/{id}`

Retrieve a specific discount.

### Update Discount
**PUT** `/discounts/{id}`

Update an existing discount.

### Delete Discount
**DELETE** `/discounts/{id}`

Delete a discount.

### Toggle Discount Status
**PUT** `/discounts/{id}/toggle-status`

Enable or disable a discount.

### Get Discount Statistics
**GET** `/discounts/stats/overview`

Get overview statistics for all discounts.

### Get Discount Usage History
**GET** `/discounts/usage/history`

Get detailed usage history for discounts.

---

## FAQ Management APIs

### List FAQs
**GET** `/faq`

Retrieve all frequently asked questions.

### Create FAQ
**POST** `/faq`

Create a new FAQ entry.

#### Request Body
```json
{
  "question": "How do I book a ride?",
  "answer": "You can book a ride by opening the app and selecting your destination.",
  "category": "booking",
  "is_active": true
}
```

### Get FAQ
**GET** `/faq/{id}`

Retrieve a specific FAQ.

### Update FAQ
**PUT** `/faq/{id}`

Update an existing FAQ.

### Delete FAQ
**DELETE** `/faq/{id}`

Delete an FAQ.

### Toggle FAQ Status
**PUT** `/faq/{id}/toggle-status`

Enable or disable an FAQ.

---

## Notification APIs

### Send Notification
**POST** `/notifications/send`

Send push notifications to users.

#### Request Body
```json
{
  "title": "Important Update",
  "body": "We have an important update for you.",
  "target_type": "riders",
  "data": {
    "type": "announcement",
    "action": "open_app"
  },
  "user_ids": [1, 2, 3],
  "lang": "en"
}
```

#### Parameters
- `title`: Notification title
- `body`: Notification message
- `target_type`: Target user type (`all`, `riders`, `drivers`)
- `data` (optional): Additional data payload
- `user_ids` (optional): Specific user IDs to target
- `lang` (optional): Language preference

#### Response
```json
{
  "success": true,
  "message": "Notification sent successfully",
  "data": {
    "total_users_targeted": 150,
    "total_devices_targeted": 200,
    "successful_notifications": 180,
    "failed_notifications": 20,
    "target_type": "riders",
    "notification_details": {
      "title": "Important Update",
      "body": "We have an important update for you.",
      "data": {}
    }
  }
}
```

---

## Panic Report APIs

### Resolve Panic Report
**PUT** `/panic-reports/{id}/resolve`

Mark a panic report as resolved.

#### Parameters
- `id`: Panic report ID
- `lang` (optional): Language preference

#### Request Body
```json
{
  "resolution_notes": "Issue resolved by contacting the driver",
  "resolved_by": "admin_user_id"
}
```

---

## Payment Integration APIs

### S3P Payment Gateway Integration

The system integrates with S3P payment gateway for processing payments. The following endpoints provide access to payment-related functionality:

- **Account Balance**: Get current S3P account balance
- **Transaction Processing**: Handle payment transactions
- **Payment Verification**: Verify payment status

---

## Best Practices

### 1. Authentication
- Always include the Bearer token in the Authorization header
- Ensure the user has admin role before making API calls
- Handle token expiration gracefully

### 2. Error Handling
- Check response status codes
- Parse error messages for user feedback
- Implement retry logic for transient errors

### 3. Pagination
- Use pagination for large datasets
- Implement proper page navigation
- Set appropriate page limits

### 4. Filtering and Search
- Use query parameters for filtering
- Implement client-side caching for frequently accessed data
- Provide clear feedback for empty results

### 5. Rate Limiting
- Respect API rate limits
- Implement exponential backoff for retries
- Monitor API usage

### 6. Data Validation
- Validate input data before sending requests
- Handle validation errors appropriately
- Provide clear error messages

### 7. Security
- Never expose sensitive data in client-side code
- Use HTTPS for all API communications
- Implement proper access controls

---

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Standard endpoints**: 100 requests per minute per user
- **Heavy endpoints**: 20 requests per minute per user
- **Bulk operations**: 10 requests per minute per user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Support

For API support and questions:
- Email: support@h-cab.com
- Documentation: https://docs.h-cab.com
- Status Page: https://status.h-cab.com

---

*Last updated: January 2025*
*API Version: v1*
