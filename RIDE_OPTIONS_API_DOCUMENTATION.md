# Ride Options API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Ride Options Management](#ride-options-management)
7. [Driver Assignment Management](#driver-assignment-management)
8. [Driver Ride History](#driver-ride-history)
9. [Data Models](#data-models)
10. [Usage Examples](#usage-examples)
11. [Best Practices](#best-practices)
12. [Error Codes](#error-codes)

## Overview

The Ride Options API provides comprehensive management capabilities for ride options in the H-Cab platform. It allows administrators to create, read, update, and delete ride options, as well as manage driver assignments to specific ride options and track driver ride history.

### Key Features
- **CRUD Operations**: Create, read, update, and delete ride options
- **Driver Assignment**: Assign and unassign drivers to ride options
- **Driver Management**: View ride options with assignment status for specific drivers
- **Ride History**: Track and filter driver ride history
- **Multilingual Support**: English and French language support
- **Validation**: Comprehensive input validation and error handling

## Authentication

All ride options API endpoints require Bearer token authentication with admin privileges.

```
Authorization: Bearer {your_access_token}
```

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
- `412` - Validation Error
- `500` - Internal Server Error

### Language Support
All endpoints support dual language responses via the `lang` query parameter:
- `?lang=en` (default)
- `?lang=fr`

---

## Ride Options Management

### List All Ride Options
**GET** `/ride-option`

Retrieve all available ride options with their associated ride class information.

#### Parameters
- `lang` (optional): Language preference (`en` or `fr`)

#### Response
```json
{
  "success": true,
  "message": "Ride options retrieved successfully.",
  "data": [
    {
      "id": 1,
      "name": "H-Cab Plus",
      "ride_class_id": 1,
      "base_price": 3000,
      "price_per_km": 250,
      "seat_capacity": 4,
      "description": "Premium ride service with luxury vehicles",
      "created_at": "2025-01-15T10:30:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z",
      "ride_class": {
        "id": 1,
        "name": "Premium",
        "description": "Premium ride class"
      }
    }
  ]
}
```

### Create Ride Option
**POST** `/ride-option`

Create a new ride option.

#### Request Body
```json
{
  "name": "H-Cab Plus",
  "ride_class_id": 1,
  "base_price": 3000,
  "price_per_km": 250,
  "seat_capacity": 4,
  "description": "Premium ride service with luxury vehicles",
  "lang": "en"
}
```

#### Validation Rules
- `name`: Required, string, unique
- `ride_class_id`: Required, integer, must exist in ride_classes table
- `base_price`: Required, numeric, minimum 0
- `price_per_km`: Required, numeric, minimum 0
- `seat_capacity`: Required, integer, minimum 1
- `description`: Optional, string

#### Response
```json
{
  "success": true,
  "message": "Ride Option created successfully.",
  "data": {
    "id": 1,
    "name": "H-Cab Plus",
    "ride_class_id": 1,
    "base_price": 3000,
    "price_per_km": 250,
    "seat_capacity": 4,
    "description": "Premium ride service with luxury vehicles",
    "created_at": "2025-01-15T10:30:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z"
  }
}
```

### Get Ride Option by ID
**GET** `/ride-option/{id}`

Retrieve a specific ride option by its ID.

#### Parameters
- `id`: Ride option ID (path parameter)
- `lang` (optional): Language preference

#### Response
```json
{
  "success": true,
  "message": "Ride Option retrieved successfully.",
  "data": {
    "id": 1,
    "name": "H-Cab Plus",
    "ride_class_id": 1,
    "base_price": 3000,
    "price_per_km": 250,
    "seat_capacity": 4,
    "description": "Premium ride service with luxury vehicles",
    "created_at": "2025-01-15T10:30:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z"
  }
}
```

### Update Ride Option
**PUT** `/ride-option/{id}`

Update an existing ride option.

#### Parameters
- `id`: Ride option ID (path parameter)

#### Request Body
```json
{
  "name": "H-Cab Premium Plus",
  "ride_class_id": 1,
  "base_price": 3500,
  "price_per_km": 300,
  "seat_capacity": 4,
  "description": "Ultimate premium ride service",
  "lang": "en"
}
```

#### Response
```json
{
  "success": true,
  "message": "Ride Option updated successfully.",
  "data": {
    "id": 1,
    "name": "H-Cab Premium Plus",
    "ride_class_id": 1,
    "base_price": 3500,
    "price_per_km": 300,
    "seat_capacity": 4,
    "description": "Ultimate premium ride service",
    "created_at": "2025-01-15T10:30:00.000000Z",
    "updated_at": "2025-01-15T12:45:00.000000Z"
  }
}
```

### Delete Ride Option
**DELETE** `/ride-option/{id}`

Delete a ride option.

#### Parameters
- `id`: Ride option ID (path parameter)
- `lang` (optional): Language preference

#### Response
```json
{
  "success": true,
  "message": "Ride Option deleted successfully."
}
```

---

## Driver Assignment Management

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

#### Validation Rules
- `ride_option_id`: Required, must exist in ride_options table
- `driver_id`: Required, must exist in users table

#### Response
```json
{
  "success": true,
  "message": "Driver successfully assigned to ride option",
  "data": null
}
```

#### Error Responses
```json
// Driver already assigned
{
  "success": false,
  "message": "Driver is already assigned to this ride option",
  "code": 400
}

// Validation error
{
  "success": false,
  "message": "The ride option id field is required.",
  "code": 412
}
```

### Unassign Driver from Ride Option
**POST** `/ride-option/unassign-driver`

Remove a driver from a ride option.

#### Request Body
```json
{
  "ride_option_id": 1,
  "driver_id": 123
}
```

#### Response
```json
{
  "success": true,
  "message": "Driver successfully unassigned from ride option",
  "data": null
}
```

#### Error Responses
```json
// Driver not assigned
{
  "success": false,
  "message": "Driver is not assigned to this ride option",
  "code": 400
}
```

### List Driver Ride Options
**GET** `/ride-options/driver/{driver_id}`

Get all ride options with assignment status for a specific driver.

#### Parameters
- `driver_id`: Driver ID (path parameter)

#### Response
```json
{
  "success": true,
  "message": "Ride options retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "H-Cab Plus",
      "ride_class_id": 1,
      "base_price": 3000,
      "price_per_km": 250,
      "seat_capacity": 4,
      "description": "Premium ride service",
      "created_at": "2025-01-15T10:30:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z",
      "is_assigned": true,
      "ride_class": {
        "id": 1,
        "name": "Premium",
        "description": "Premium ride class"
      }
    },
    {
      "id": 2,
      "name": "H-Cab Economy",
      "ride_class_id": 2,
      "base_price": 2000,
      "price_per_km": 150,
      "seat_capacity": 4,
      "description": "Economy ride service",
      "created_at": "2025-01-15T10:30:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z",
      "is_assigned": false,
      "ride_class": {
        "id": 2,
        "name": "Economy",
        "description": "Economy ride class"
      }
    }
  ]
}
```

---

## Driver Ride History

### List Driver Rides
**GET** `/driver/{driver_id}/rides`

Get all rides for a specific driver with filtering options.

#### Parameters
- `driver_id`: Driver ID (path parameter)
- `status` (optional): Filter by status (`ongoing` or `completed`)
- `start_date` (optional): Filter rides from this date (YYYY-MM-DD)
- `end_date` (optional): Filter rides until this date (YYYY-MM-DD)

#### Response
```json
{
  "success": true,
  "message": "Driver rides retrieved successfully",
  "data": [
    {
      "id": 1,
      "booking_id": 1,
      "rider_id": 456,
      "driver_id": 123,
      "pickup_location": "123 Main Street, Douala",
      "dropoff_location": "456 Airport Road, Douala",
      "status": "completed",
      "fare": 2500,
      "duration": 15,
      "started_at": "2025-01-15T10:30:00.000000Z",
      "completed_at": "2025-01-15T10:45:00.000000Z",
      "created_at": "2025-01-15T10:25:00.000000Z",
      "updated_at": "2025-01-15T10:45:00.000000Z",
      "rider": {
        "id": 456,
        "name": "John Doe",
        "phone": "+237123456789"
      }
    }
  ]
}
```

#### Example with Filters
```bash
GET /driver/123/rides?status=completed&start_date=2025-01-01&end_date=2025-01-31
```

---

## Data Models

### Ride Option Model
```json
{
  "id": 1,
  "name": "H-Cab Plus",
  "ride_class_id": 1,
  "base_price": 3000,
  "price_per_km": 250,
  "seat_capacity": 4,
  "description": "Premium ride service",
  "created_at": "2025-01-15T10:30:00.000000Z",
  "updated_at": "2025-01-15T10:30:00.000000Z"
}
```

### Driver Assignment Model
```json
{
  "ride_option_id": 1,
  "driver_id": 123,
  "assigned_at": "2025-01-15T10:30:00.000000Z"
}
```

### Ride History Model
```json
{
  "id": 1,
  "booking_id": 1,
  "rider_id": 456,
  "driver_id": 123,
  "pickup_location": "123 Main Street",
  "dropoff_location": "456 Airport Road",
  "status": "completed",
  "fare": 2500,
  "duration": 15,
  "started_at": "2025-01-15T10:30:00.000000Z",
  "completed_at": "2025-01-15T10:45:00.000000Z",
  "created_at": "2025-01-15T10:25:00.000000Z",
  "updated_at": "2025-01-15T10:45:00.000000Z"
}
```

---

## Usage Examples

### Complete Ride Option Management Workflow

#### 1. Create a New Ride Option
```bash
curl -X POST \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "H-Cab Business",
    "ride_class_id": 1,
    "base_price": 4000,
    "price_per_km": 350,
    "seat_capacity": 4,
    "description": "Business class ride service"
  }' \
  "https://api.h-cab.com/api/v1/admin/ride-option"
```

#### 2. List All Ride Options
```bash
curl -H "Authorization: Bearer {token}" \
  "https://api.h-cab.com/api/v1/admin/ride-option"
```

#### 3. Assign Driver to Ride Option
```bash
curl -X POST \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "ride_option_id": 1,
    "driver_id": 123
  }' \
  "https://api.h-cab.com/api/v1/admin/ride-option/assign-driver"
```

#### 4. Check Driver's Assigned Ride Options
```bash
curl -H "Authorization: Bearer {token}" \
  "https://api.h-cab.com/api/v1/admin/ride-options/driver/123"
```

#### 5. View Driver's Ride History
```bash
curl -H "Authorization: Bearer {token}" \
  "https://api.h-cab.com/api/v1/admin/driver/123/rides?status=completed&start_date=2025-01-01"
```

### JavaScript/Node.js Example
```javascript
const axios = require('axios');

const API_BASE = 'https://api.h-cab.com/api/v1/admin';
const ACCESS_TOKEN = 'your_access_token';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Create a new ride option
async function createRideOption() {
  try {
    const response = await api.post('/ride-option', {
      name: 'H-Cab Executive',
      ride_class_id: 1,
      base_price: 5000,
      price_per_km: 400,
      seat_capacity: 4,
      description: 'Executive ride service'
    });
    console.log('Ride option created:', response.data);
    return response.data.data.id;
  } catch (error) {
    console.error('Error creating ride option:', error.response?.data);
  }
}

// Assign driver to ride option
async function assignDriver(rideOptionId, driverId) {
  try {
    const response = await api.post('/ride-option/assign-driver', {
      ride_option_id: rideOptionId,
      driver_id: driverId
    });
    console.log('Driver assigned:', response.data);
  } catch (error) {
    console.error('Error assigning driver:', error.response?.data);
  }
}

// Get driver's ride history
async function getDriverRides(driverId) {
  try {
    const response = await api.get(`/driver/${driverId}/rides`, {
      params: {
        status: 'completed',
        start_date: '2025-01-01',
        end_date: '2025-01-31'
      }
    });
    console.log('Driver rides:', response.data);
  } catch (error) {
    console.error('Error getting driver rides:', error.response?.data);
  }
}
```

### PHP Example
```php
<?php

class RideOptionsAPI {
    private $baseUrl;
    private $accessToken;
    
    public function __construct($baseUrl, $accessToken) {
        $this->baseUrl = $baseUrl;
        $this->accessToken = $accessToken;
    }
    
    private function makeRequest($method, $endpoint, $data = null) {
        $url = $this->baseUrl . $endpoint;
        
        $headers = [
            'Authorization: Bearer ' . $this->accessToken,
            'Content-Type: application/json',
            'Accept: application/json'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        if ($method === 'POST' || $method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return [
            'status' => $httpCode,
            'data' => json_decode($response, true)
        ];
    }
    
    public function createRideOption($data) {
        return $this->makeRequest('POST', '/ride-option', $data);
    }
    
    public function assignDriver($rideOptionId, $driverId) {
        return $this->makeRequest('POST', '/ride-option/assign-driver', [
            'ride_option_id' => $rideOptionId,
            'driver_id' => $driverId
        ]);
    }
    
    public function getDriverRides($driverId, $filters = []) {
        $endpoint = "/driver/{$driverId}/rides";
        if (!empty($filters)) {
            $endpoint .= '?' . http_build_query($filters);
        }
        return $this->makeRequest('GET', $endpoint);
    }
}

// Usage
$api = new RideOptionsAPI(
    'https://api.h-cab.com/api/v1/admin',
    'your_access_token'
);

// Create ride option
$result = $api->createRideOption([
    'name' => 'H-Cab Premium',
    'ride_class_id' => 1,
    'base_price' => 3500,
    'price_per_km' => 300,
    'seat_capacity' => 4,
    'description' => 'Premium ride service'
]);

// Assign driver
$api->assignDriver(1, 123);

// Get driver rides
$rides = $api->getDriverRides(123, [
    'status' => 'completed',
    'start_date' => '2025-01-01'
]);
?>
```

---

## Best Practices

### 1. Error Handling
- Always check response status codes
- Handle validation errors gracefully
- Implement retry logic for transient errors
- Log errors for debugging

### 2. Data Validation
- Validate input data before sending requests
- Use appropriate data types for numeric fields
- Ensure required fields are provided
- Check for unique constraints

### 3. Driver Assignment Management
- Check if driver is already assigned before assigning
- Verify driver exists and has correct role
- Handle assignment conflicts appropriately
- Track assignment history

### 4. Performance Optimization
- Use pagination for large datasets
- Implement caching for frequently accessed data
- Filter data at the database level
- Use appropriate indexes

### 5. Security
- Always use HTTPS for API communications
- Validate and sanitize all input data
- Implement proper access controls
- Log all administrative actions

### 6. Monitoring
- Monitor API response times
- Track error rates and types
- Log all ride option changes
- Monitor driver assignment patterns

---

## Error Codes

### Validation Errors (412)
- `The name field is required.`
- `The name already exists.`
- `The ride class ID is required.`
- `The ride class ID does not exist.`
- `The base price must be at least 0.`
- `The price per km must be at least 0.`
- `The seat capacity must be at least 1.`

### Not Found Errors (404)
- `Ride Option not found.`
- `Driver not found.`

### Conflict Errors (400)
- `Driver is already assigned to this ride option.`
- `Driver is not assigned to this ride option.`

### Server Errors (500)
- `An error occurred while creating ride option.`
- `An error occurred while updating the ride option.`
- `An unexpected error occurred while deleting the ride option.`
- `An error occurred while assigning the driver.`
- `An error occurred while unassigning the driver.`

---

## Rate Limiting

The API implements rate limiting to ensure fair usage:
- **Standard endpoints**: 100 requests per minute per user
- **Assignment endpoints**: 50 requests per minute per user
- **History endpoints**: 20 requests per minute per user

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
