# Users with Devices API Documentation

## Overview

The Users with Devices API allows administrators to view all users along with their associated device information. This API provides comprehensive device management capabilities including device details, status tracking, and activity monitoring.

## Features

- **Comprehensive User Data**: View user information with associated devices
- **Device Information**: Detailed device specifications and status
- **Advanced Filtering**: Filter by user role, device type, activity status
- **Search Functionality**: Search across users and device names
- **Flexible Sorting**: Sort by various fields including device count
- **Pagination**: Efficient pagination for large datasets
- **Summary Statistics**: Overall device and user statistics
- **Bilingual Support**: Response messages in English and French

## API Endpoint

**GET** `/api/v1/admin/users/devices`

### Authentication
- **Required**: Bearer token
- **Role**: Admin only

---

## Query Parameters

### Filtering Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `role` | string | Filter by user role | `rider`, `driver`, `admin` |
| `device_type` | string | Filter by device type | `ios`, `android`, `web` |
| `is_active` | boolean | Filter by user active status | `true`, `false` |
| `device_active` | boolean | Filter by device active status | `true`, `false` |
| `search` | string | Search by name, email, phone, or device name | `john@example.com` |

### Sorting Parameters

| Parameter | Type | Description | Options | Default |
|-----------|------|-------------|---------|---------|
| `sort_by` | string | Sort by field | `name`, `email`, `created_at`, `last_active_at`, `device_count` | `created_at` |
| `sort_order` | string | Sort order | `asc`, `desc` | `desc` |

### Pagination Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | `1` |
| `per_page` | integer | Items per page | `15` |

### Language Parameter

| Parameter | Type | Description | Options | Default |
|-----------|------|-------------|---------|---------|
| `lang` | string | Language for response messages | `en`, `fr` | `en` |

---

## Response Format

### Success Response (200)

```json
{
  "success": true,
  "message": "Users with devices retrieved successfully",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "role": "rider",
        "is_active": true,
        "is_online": false,
        "created_at": "2025-01-15T10:30:00.000000Z",
        "devices": [
          {
            "id": 1,
            "device_name": "John's iPhone",
            "device_type": "ios",
            "device_model": "iPhone 12",
            "os_version": "15.0",
            "app_version": "1.2.3",
            "is_active": true,
            "last_active_at": "2025-01-15T10:30:00.000000Z",
            "created_at": "2025-01-15T10:30:00.000000Z"
          }
        ],
        "device_count": 1,
        "active_device_count": 1
      }
    ],
    "pagination": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 15,
      "total": 75
    },
    "summary": {
      "total_users": 75,
      "users_with_devices": 60,
      "total_devices": 120,
      "active_devices": 95,
      "device_types": {
        "ios": 45,
        "android": 50,
        "web": 25
      }
    }
  }
}
```

### Error Responses

#### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required",
  "code": 403
}
```

#### 500 Server Error
```json
{
  "success": false,
  "message": "An error occurred while retrieving users with devices",
  "code": 500
}
```

---

## Usage Examples

### 1. Get All Users with Devices

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 2. Filter by User Role

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?role=driver" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 3. Filter by Device Type

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?device_type=ios" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 4. Filter by Active Devices Only

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?device_active=true" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 5. Search Users and Devices

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?search=iPhone" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 6. Sort by Device Count

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?sort_by=device_count&sort_order=desc" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 7. Complex Filtering

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?role=rider&device_type=android&device_active=true&sort_by=last_active_at&sort_order=desc" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 8. Pagination

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?page=2&per_page=20" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 9. French Language Response

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/devices?lang=fr" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

---

## Filtering Logic

### User Filters

- **`role`**: Filter users by their role (rider, driver, admin)
- **`is_active`**: Filter by user account status (active/inactive)

### Device Filters

- **`device_type`**: Filter by device type (ios, android, web)
- **`device_active`**: Filter by device active status

### Search Functionality

The `search` parameter searches across:
- User name (partial match)
- User email address (partial match)
- User phone number (partial match)
- Device name (partial match)

### Sorting Options

- **`name`**: Sort by user name
- **`email`**: Sort by user email
- **`created_at`**: Sort by user creation date
- **`last_active_at`**: Sort by device last activity
- **`device_count`**: Sort by number of devices per user

---

## Response Data Structure

### User Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | User ID |
| `name` | string | User's full name |
| `email` | string | User's email address |
| `phone` | string | User's phone number |
| `role` | string | User role (`rider`, `driver`, `admin`) |
| `is_active` | boolean | Account active status |
| `is_online` | boolean | Current online status |
| `created_at` | string | Account creation timestamp |
| `devices` | array | Array of device objects |
| `device_count` | integer | Total number of devices |
| `active_device_count` | integer | Number of active devices |

### Device Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Device ID |
| `device_name` | string | Device name |
| `device_type` | string | Device type (`ios`, `android`, `web`) |
| `device_model` | string | Device model |
| `os_version` | string | Operating system version |
| `app_version` | string | Application version |
| `is_active` | boolean | Device active status |
| `last_active_at` | string | Last activity timestamp |
| `created_at` | string | Device registration timestamp |

### Pagination Object

| Field | Type | Description |
|-------|------|-------------|
| `current_page` | integer | Current page number |
| `last_page` | integer | Last page number |
| `per_page` | integer | Items per page |
| `total` | integer | Total number of items |

### Summary Object

| Field | Type | Description |
|-------|------|-------------|
| `total_users` | integer | Total number of users |
| `users_with_devices` | integer | Users who have registered devices |
| `total_devices` | integer | Total number of devices |
| `active_devices` | integer | Number of active devices |
| `device_types` | object | Device count by type |

---

## Performance Considerations

### Database Optimization

- Uses efficient joins for device relationships
- Implements proper indexing on filterable fields
- Pagination prevents memory issues with large datasets

### Query Optimization

- Filters are applied at database level
- Sorting uses database indexes when possible
- Summary statistics are calculated efficiently

### Caching Recommendations

- Consider caching summary statistics for better performance
- Implement Redis caching for frequently accessed data
- Use database query result caching for common filter combinations

---

## Security Considerations

### Access Control

- **Admin Only**: Only users with `admin` role can access this endpoint
- **Authentication Required**: Valid bearer token required
- **Audit Logging**: All access attempts are logged

### Data Privacy

- Sensitive device information is properly handled
- Device tokens are not exposed in the response
- User authentication details are protected

### Rate Limiting

- Consider implementing rate limiting for this endpoint
- Monitor for unusual access patterns
- Implement request throttling for large queries

---

## Error Handling

### Common Error Scenarios

1. **Unauthorized Access**: Non-admin users attempting to access
2. **Invalid Parameters**: Malformed or invalid query parameters
3. **Database Errors**: Connection or query execution failures
4. **Server Errors**: Internal server issues

### Error Response Format

All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "code": 400
}
```

---

## Integration Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

async function getUsersWithDevices(filters = {}) {
  try {
    const response = await axios.get('/api/v1/admin/users/devices', {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Accept': 'application/json'
      },
      params: filters
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching users with devices:', error.response.data);
    throw error;
  }
}

// Usage examples
const allUsers = await getUsersWithDevices();
const iosUsers = await getUsersWithDevices({ device_type: 'ios' });
const activeDevices = await getUsersWithDevices({ 
  device_active: true, 
  sort_by: 'device_count', 
  sort_order: 'desc' 
});
```

### PHP

```php
<?php

function getUsersWithDevices($filters = []) {
    $url = 'https://api.example.com/api/v1/admin/users/devices';
    $queryString = http_build_query($filters);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url . '?' . $queryString);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $adminToken,
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    } else {
        throw new Exception('API request failed: ' . $response);
    }
}

// Usage examples
$allUsers = getUsersWithDevices();
$iosUsers = getUsersWithDevices(['device_type' => 'ios']);
$activeDevices = getUsersWithDevices([
    'device_active' => true,
    'sort_by' => 'device_count',
    'sort_order' => 'desc'
]);
?>
```

---

## Use Cases

### Device Management

- **Device Monitoring**: Track device usage and activity
- **Device Analytics**: Analyze device type distribution
- **Device Status**: Monitor active/inactive devices
- **User Device Mapping**: Understand user-device relationships

### User Analytics

- **User Behavior**: Analyze user device preferences
- **Platform Usage**: Track iOS vs Android usage
- **Activity Patterns**: Monitor user activity through devices
- **Device Adoption**: Track new device registrations

### Administrative Tasks

- **User Support**: Help users with device-related issues
- **Security Monitoring**: Track suspicious device activity
- **Platform Optimization**: Optimize for popular device types
- **User Engagement**: Monitor user engagement through devices

---

## Future Enhancements

### Planned Features

1. **Device Management**: Add/remove devices for users
2. **Device Analytics**: Advanced device usage analytics
3. **Push Notification Management**: Manage device tokens
4. **Device Security**: Device authentication and validation
5. **Bulk Operations**: Mass device operations for admin users
6. **Device History**: Track device registration history

### API Versioning

- Current version: v1
- Backward compatibility maintained
- New features added in future versions
- Deprecation notices provided in advance

---

## Support and Documentation

### Additional Resources

- [Admin Dashboard API Documentation](./ENHANCED_DASHBOARD_API.md)
- [Wallet Balances API Documentation](./WALLET_BALANCES_API.md)
- [User Management API Documentation](./USER_MANAGEMENT_API.md)

### Contact Information

For technical support or API questions:
- Email: support@example.com
- Documentation: https://docs.example.com
- API Status: https://status.example.com
