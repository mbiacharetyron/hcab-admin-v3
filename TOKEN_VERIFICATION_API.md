# Token Verification API Documentation

## Overview
This API endpoint allows you to verify if a user's authentication token is valid. It checks the token's validity, expiration, and the user's account status.

## Endpoint
```
POST /api/v1/auth/verify-token
```

## Authentication
This endpoint requires a valid Bearer token in the Authorization header.

## Request Headers
```
Authorization: Bearer {your_access_token}
Content-Type: application/json
```

## Request Body (Optional)
```json
{
    "lang": "en"
}
```

### Parameters
- `lang` (optional): Language preference for response messages. Supported values: `en` (English), `fr` (French). Default: `en`

## Response Examples

### Success Response (200 OK)
When the token is valid:
```json
{
    "success": true,
    "message": "Token is valid.",
    "data": {
        "valid": true,
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "username": "johndoe",
            "phone": "+1234567890",
            "role": "rider",
            "is_active": true,
            "is_online": true,
            "is_validated": true,
            "otp_verified": true,
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        },
        "token_expires_at": "2024-08-23T15:30:00.000000Z"
    }
}
```

### Error Response (401 Unauthorized)
When the token is invalid, expired, or user account is inactive:
```json
{
    "success": true,
    "message": "Token is invalid or expired.",
    "data": {
        "valid": false
    }
}
```

### French Response Example
When `lang=fr` is provided:
```json
{
    "success": true,
    "message": "Token valide.",
    "data": {
        "valid": true,
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "username": "johndoe",
            "phone": "+1234567890",
            "role": "rider",
            "is_active": true,
            "is_online": true,
            "is_validated": true,
            "otp_verified": true,
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        },
        "token_expires_at": "2024-08-23T15:30:00.000000Z"
    }
}
```

## Validation Checks
The API performs the following validation checks:

1. **Token Existence**: Verifies that a token is provided and the user is authenticated
2. **Token Revocation**: Checks if the token has been revoked
3. **Token Expiration**: Verifies that the token has not expired
4. **User Account Status**: Ensures the user account is active (`is_active = true`)

## Use Cases
- **Session Validation**: Check if a user's session is still valid before performing sensitive operations
- **Token Refresh Logic**: Determine if a token needs to be refreshed
- **Security Checks**: Validate token integrity before accessing protected resources
- **User Status Verification**: Ensure the user account is still active

## Error Handling
The API handles various error scenarios gracefully:
- Invalid or missing token
- Expired token
- Revoked token
- Inactive user account
- Server errors

## Rate Limiting
This endpoint is subject to the same rate limiting as other authenticated endpoints.

## Security Considerations
- Always use HTTPS in production
- Store tokens securely on the client side
- Implement proper token refresh mechanisms
- Log token verification attempts for security monitoring

## Example Usage

### cURL
```bash
curl -X POST "https://your-api-domain.com/api/v1/auth/verify-token" \
  -H "Authorization: Bearer your_access_token_here" \
  -H "Content-Type: application/json" \
  -d '{"lang": "en"}'
```

### JavaScript (Fetch API)
```javascript
const verifyToken = async (token, lang = 'en') => {
  try {
    const response = await fetch('/api/v1/auth/verify-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lang })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Token verification failed:', error);
    return { success: false, message: 'Network error' };
  }
};

// Usage
const result = await verifyToken('your_token_here');
if (result.data.valid) {
  console.log('Token is valid, user:', result.data.user);
} else {
  console.log('Token is invalid:', result.message);
}
```

### PHP
```php
<?php
function verifyToken($token, $lang = 'en') {
    $url = 'https://your-api-domain.com/api/v1/auth/verify-token';
    
    $data = json_encode(['lang' => $lang]);
    
    $options = [
        'http' => [
            'header' => [
                "Authorization: Bearer $token",
                "Content-Type: application/json"
            ],
            'method' => 'POST',
            'content' => $data
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    return json_decode($result, true);
}

// Usage
$result = verifyToken('your_token_here');
if ($result['data']['valid']) {
    echo "Token is valid for user: " . $result['data']['user']['name'];
} else {
    echo "Token is invalid: " . $result['message'];
}
?>
```
