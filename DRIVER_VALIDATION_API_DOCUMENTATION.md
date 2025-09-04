# Driver Validation API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Driver Validation Endpoints](#driver-validation-endpoints)
7. [Data Models](#data-models)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)
10. [Error Codes](#error-codes)

## Overview

The Driver Validation API provides comprehensive management capabilities for validating and managing driver applications in the H-Cab platform. It allows administrators to approve or reject driver applications, track validation status, and monitor document submission progress.

### Key Features
- **Driver Validation**: Approve or reject driver applications with detailed reasons
- **Status Tracking**: Monitor driver validation status and document submission progress
- **Document Management**: Track all required documents and their submission status
- **Completion Percentage**: Calculate driver application completion percentage
- **Audit Trail**: Comprehensive logging of all validation actions
- **Multilingual Support**: English and French language support
- **Validation Rules**: Enforce minimum completion requirements before validation

## Authentication

All driver validation API endpoints require Bearer token authentication with admin privileges.

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
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (Admin access required)
- `404` - Not Found
- `500` - Internal Server Error

### Language Support
All endpoints support dual language responses via the `lang` query parameter:
- `?lang=en` (default)
- `?lang=fr`

---

## Driver Validation Endpoints

### Validate Driver
**POST** `/driver/{id}/validate`

Approve or reject a driver application with detailed reasoning and admin notes.

#### Parameters
- `id`: Driver ID (path parameter)
- `lang` (optional): Language preference (`en` or `fr`)

#### Request Body
```json
{
  "action": "approve",
  "reason": "All documents verified and approved",
  "admin_notes": "Driver meets all requirements and has clean background check",
  "lang": "en"
}
```

#### Validation Rules
- `action`: Required, must be `approve` or `reject`
- `reason`: Required, string, maximum 500 characters
- `admin_notes`: Optional, string, maximum 1000 characters
- `lang`: Optional, must be `en` or `fr`

#### Response
```json
{
  "success": true,
  "message": "Driver validation completed successfully",
  "data": {
    "driver_id": 123,
    "driver_name": "John Doe",
    "driver_email": "john@example.com",
    "action": "approve",
    "is_validated": true,
    "validated_at": "2025-01-15T10:30:00.000000Z",
    "validated_by": 1,
    "validated_by_name": "Admin User",
    "reason": "All documents verified and approved",
    "admin_notes": "Driver meets all requirements and has clean background check"
  }
}
```

#### Error Responses
```json
// Driver already validated
{
  "success": false,
  "message": "Driver is already validated",
  "code": 400
}

// Driver already rejected
{
  "success": false,
  "message": "Driver is already rejected",
  "code": 400
}

// Validation error
{
  "success": false,
  "message": "Validation action is required",
  "code": 400
}
```

### Get Driver Validation Status
**GET** `/driver/{id}/validation-status`

Retrieve detailed validation status and submission information for a specific driver.

#### Parameters
- `id`: Driver ID (path parameter)
- `lang` (optional): Language preference (`en` or `fr`)

#### Response
```json
{
  "success": true,
  "message": "Driver validation status retrieved successfully",
  "data": {
    "driver": {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+237123456789",
      "username": "johndoe",
      "is_validated": false,
      "is_active": true,
      "created_at": "2025-01-10T08:00:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z"
    },
    "submission_status": {
      "doc_submitted": true,
      "car_submitted": true,
      "bank_submitted": false,
      "car_photos_submitted": true,
      "id_document_submitted": true,
      "license_submitted": true,
      "insurance_submitted": true,
      "registration_submitted": true,
      "car_inspection_submitted": true
    },
    "completion_percentage": 89,
    "missing_requirements": ["bank_submitted"],
    "can_be_validated": true,
    "documents": {
      "license_number": "DL123456789",
      "license_expiry": "2026-12-31",
      "insurance_number": "INS987654321",
      "insurance_expiry": "2025-06-30",
      "car_registration": "REG456789123",
      "car_registration_expiry": "2025-08-15",
      "car_inspection_date": "2025-01-01",
      "id_document_type": "passport",
      "id_document_number": "P123456789"
    },
    "car_details": {
      "car_brand": "Toyota",
      "car_model": "Camry",
      "model_year": "2020",
      "car_color": "White",
      "license_plate": "ABC-123",
      "vin_number": "1HGBH41JXMN109186",
      "seat_number": 4
    },
    "bank_details": {
      "bank_name": "First Bank",
      "account_number": "1234567890",
      "account_holder_name": "John Doe"
    }
  }
}
```

#### Error Responses
```json
// Driver not found
{
  "success": false,
  "message": "Driver not found",
  "code": 404
}

// Unauthorized access
{
  "success": false,
  "message": "Admin access required",
  "code": 403
}
```

---

## Data Models

### Driver Validation Request
```json
{
  "action": "approve|reject",
  "reason": "string (max 500 chars)",
  "admin_notes": "string (max 1000 chars, optional)",
  "lang": "en|fr (optional)"
}
```

### Driver Validation Response
```json
{
  "driver_id": 123,
  "driver_name": "John Doe",
  "driver_email": "john@example.com",
  "action": "approve|reject",
  "is_validated": true,
  "validated_at": "2025-01-15T10:30:00.000000Z",
  "validated_by": 1,
  "validated_by_name": "Admin User",
  "reason": "All documents verified and approved",
  "admin_notes": "Additional admin notes"
}
```

### Driver Validation Status Response
```json
{
  "driver": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+237123456789",
    "username": "johndoe",
    "is_validated": false,
    "is_active": true,
    "created_at": "2025-01-10T08:00:00.000000Z",
    "updated_at": "2025-01-15T10:30:00.000000Z"
  },
  "submission_status": {
    "doc_submitted": true,
    "car_submitted": true,
    "bank_submitted": false,
    "car_photos_submitted": true,
    "id_document_submitted": true,
    "license_submitted": true,
    "insurance_submitted": true,
    "registration_submitted": true,
    "car_inspection_submitted": true
  },
  "completion_percentage": 89,
  "missing_requirements": ["bank_submitted"],
  "can_be_validated": true,
  "documents": {
    "license_number": "DL123456789",
    "license_expiry": "2026-12-31",
    "insurance_number": "INS987654321",
    "insurance_expiry": "2025-06-30",
    "car_registration": "REG456789123",
    "car_registration_expiry": "2025-08-15",
    "car_inspection_date": "2025-01-01",
    "id_document_type": "passport",
    "id_document_number": "P123456789"
  },
  "car_details": {
    "car_brand": "Toyota",
    "car_model": "Camry",
    "model_year": "2020",
    "car_color": "White",
    "license_plate": "ABC-123",
    "vin_number": "1HGBH41JXMN109186",
    "seat_number": 4
  },
  "bank_details": {
    "bank_name": "First Bank",
    "account_number": "1234567890",
    "account_holder_name": "John Doe"
  }
}
```

---

## Usage Examples

### Complete Driver Validation Workflow

#### 1. Check Driver Validation Status
```bash
curl -H "Authorization: Bearer {token}" \
  "https://api.h-cab.com/api/v1/admin/driver/123/validation-status"
```

#### 2. Approve Driver
```bash
curl -X POST \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "approve",
    "reason": "All documents verified and approved",
    "admin_notes": "Driver meets all requirements and has clean background check"
  }' \
  "https://api.h-cab.com/api/v1/admin/driver/123/validate"
```

#### 3. Reject Driver
```bash
curl -X POST \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "reject",
    "reason": "Incomplete documentation",
    "admin_notes": "Missing bank details and car inspection certificate"
  }' \
  "https://api.h-cab.com/api/v1/admin/driver/123/validate"
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

// Get driver validation status
async function getDriverValidationStatus(driverId) {
  try {
    const response = await api.get(`/driver/${driverId}/validation-status`);
    console.log('Driver validation status:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error getting driver validation status:', error.response?.data);
  }
}

// Validate driver (approve or reject)
async function validateDriver(driverId, action, reason, adminNotes = null) {
  try {
    const response = await api.post(`/driver/${driverId}/validate`, {
      action,
      reason,
      admin_notes: adminNotes
    });
    console.log('Driver validation result:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error validating driver:', error.response?.data);
  }
}

// Complete validation workflow
async function validateDriverWorkflow(driverId) {
  try {
    // Step 1: Check current status
    const status = await getDriverValidationStatus(driverId);
    
    if (!status.can_be_validated) {
      console.log(`Driver ${driverId} cannot be validated yet. Missing: ${status.missing_requirements.join(', ')}`);
      return;
    }
    
    // Step 2: Approve driver
    const result = await validateDriver(
      driverId, 
      'approve', 
      'All documents verified and approved',
      'Driver meets all requirements'
    );
    
    console.log(`Driver ${driverId} validation completed:`, result);
  } catch (error) {
    console.error('Validation workflow error:', error);
  }
}
```

### PHP Example
```php
<?php

class DriverValidationAPI {
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
        
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
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
    
    public function getDriverValidationStatus($driverId) {
        return $this->makeRequest('GET', "/driver/{$driverId}/validation-status");
    }
    
    public function validateDriver($driverId, $action, $reason, $adminNotes = null) {
        $data = [
            'action' => $action,
            'reason' => $reason
        ];
        
        if ($adminNotes) {
            $data['admin_notes'] = $adminNotes;
        }
        
        return $this->makeRequest('POST', "/driver/{$driverId}/validate", $data);
    }
    
    public function approveDriver($driverId, $reason, $adminNotes = null) {
        return $this->validateDriver($driverId, 'approve', $reason, $adminNotes);
    }
    
    public function rejectDriver($driverId, $reason, $adminNotes = null) {
        return $this->validateDriver($driverId, 'reject', $reason, $adminNotes);
    }
}

// Usage
$api = new DriverValidationAPI(
    'https://api.h-cab.com/api/v1/admin',
    'your_access_token'
);

// Get driver validation status
$status = $api->getDriverValidationStatus(123);
echo "Completion: " . $status['data']['data']['completion_percentage'] . "%\n";

// Approve driver
$result = $api->approveDriver(
    123, 
    'All documents verified and approved',
    'Driver meets all requirements'
);

if ($result['status'] === 200) {
    echo "Driver approved successfully\n";
} else {
    echo "Error: " . $result['data']['message'] . "\n";
}
?>
```

---

## Best Practices

### 1. Validation Workflow
- Always check driver validation status before making validation decisions
- Ensure minimum completion percentage (80%) before approving
- Review all submitted documents thoroughly
- Provide detailed reasons for approval or rejection
- Use admin notes for internal tracking

### 2. Error Handling
- Check response status codes
- Handle validation errors gracefully
- Implement retry logic for transient errors
- Log all validation actions for audit purposes

### 3. Security
- Always use HTTPS for API communications
- Validate and sanitize all input data
- Implement proper access controls
- Log all administrative actions

### 4. Performance
- Cache driver validation status when appropriate
- Use pagination for large datasets
- Implement proper database indexes
- Monitor API response times

### 5. Monitoring
- Track validation approval/rejection rates
- Monitor completion percentages
- Log all validation actions
- Set up alerts for failed validations

---

## Error Codes

### Validation Errors (400)
- `Validation action is required.`
- `Action must be "approve" or "reject".`
- `Reason is required.`
- `Reason cannot exceed 500 characters.`
- `Admin notes cannot exceed 1000 characters.`
- `Driver is already validated.`
- `Driver is already rejected.`

### Authorization Errors (403)
- `Admin access required.`
- `Unauthorized access.`

### Not Found Errors (404)
- `Driver not found.`

### Server Errors (500)
- `An error occurred while validating the driver.`
- `An error occurred while retrieving driver validation status.`

---

## Document Submission Requirements

### Required Documents
1. **Driver License** (`license_submitted`)
2. **Car Details** (`car_submitted`)
3. **Car Photos** (`car_photos_submitted`)
4. **ID Document** (`id_document_submitted`)
5. **Insurance** (`insurance_submitted`)
6. **Registration** (`registration_submitted`)
7. **Car Inspection** (`car_inspection_submitted`)
8. **Bank Details** (`bank_submitted`)
9. **General Documents** (`doc_submitted`)

### Validation Rules
- Minimum 80% completion required for validation
- All critical documents must be submitted
- Documents must be valid and not expired
- Clear, readable document images required

---

## Rate Limiting

The API implements rate limiting to ensure fair usage:
- **Validation endpoints**: 50 requests per minute per user
- **Status endpoints**: 100 requests per minute per user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 45
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
