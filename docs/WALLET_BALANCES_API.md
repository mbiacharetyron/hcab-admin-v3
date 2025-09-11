# Wallet Balances API Documentation

## Overview

The Wallet Balances API allows administrators to view all users' wallet balances with comprehensive filtering and sorting capabilities. This API provides detailed information about user wallets including available balance, locked balance, and total balance, along with user profile information.

## Features

- **Comprehensive Filtering**: Filter by user role, balance range, activity status, and more
- **Advanced Search**: Search by name, email, or phone number
- **Flexible Sorting**: Sort by various fields including balance amounts
- **Pagination**: Efficient pagination for large datasets
- **Summary Statistics**: Overall wallet statistics and totals
- **Bilingual Support**: Response messages in English and French

## API Endpoint

**GET** `/api/v1/admin/users/wallet-balances`

### Authentication
- **Required**: Bearer token
- **Role**: Admin only

---

## Query Parameters

### Filtering Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `role` | string | Filter by user role | `rider`, `driver`, `admin` |
| `min_balance` | number | Minimum wallet balance | `100.50` |
| `max_balance` | number | Maximum wallet balance | `1000.00` |
| `balance_type` | string | Filter by balance type | `available`, `locked`, `total` |
| `is_active` | boolean | Filter by user active status | `true`, `false` |
| `is_online` | boolean | Filter by user online status | `true`, `false` |
| `has_passcode` | boolean | Filter by wallet passcode status | `true`, `false` |
| `wallet_locked` | boolean | Filter by wallet lock status | `true`, `false` |
| `search` | string | Search by name, email, or phone | `john@example.com` |

### Sorting Parameters

| Parameter | Type | Description | Options | Default |
|-----------|------|-------------|---------|---------|
| `sort_by` | string | Sort by field | `name`, `email`, `available_balance`, `locked_balance`, `total_balance`, `created_at` | `total_balance` |
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
  "message": "Wallet balances retrieved successfully",
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
        "has_active_passcode": true,
        "wallet": {
          "available_balance": 150.50,
          "locked_balance": 25.00,
          "total_balance": 175.50,
          "is_locked": false,
          "lock_reason": null,
          "locked_at": null,
          "locked_by": null
        },
        "created_at": "2025-01-15T10:30:00.000000Z"
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
      "total_available_balance": 15000.50,
      "total_locked_balance": 2500.00,
      "total_balance": 17500.50,
      "average_balance": 233.34,
      "locked_wallets_count": 5,
      "unlocked_wallets_count": 70
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
  "message": "An error occurred while retrieving wallet balances",
  "code": 500
}
```

---

## Usage Examples

### 1. Get All Users' Wallet Balances

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 2. Filter by User Role

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?role=driver" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 3. Filter by Balance Range

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?min_balance=100&max_balance=1000&balance_type=total" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 4. Search by User Information

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?search=john" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 5. Filter by User Status

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?is_active=true&is_online=false" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 6. Sort by Balance (Highest First)

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?sort_by=total_balance&sort_order=desc" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 7. Pagination

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?page=2&per_page=20" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 8. Filter by Wallet Lock Status

```bash
# Get only locked wallets
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?wallet_locked=true" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

```bash
# Get only unlocked wallets
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?wallet_locked=false" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 9. Complex Filtering

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?role=rider&min_balance=50&is_active=true&wallet_locked=false&sort_by=total_balance&sort_order=desc&per_page=25" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 10. French Language Response

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/wallet-balances?lang=fr" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

---

## Filtering Logic

### Balance Type Filtering

When using `balance_type` parameter:

- **`available`**: Filters based on `available_balance` only
- **`locked`**: Filters based on `locked_balance` only  
- **`total`**: Filters based on `available_balance + locked_balance` (default)

### Search Functionality

The `search` parameter searches across:
- User name (partial match)
- Email address (partial match)
- Phone number (partial match)

### Status Filtering

- **`is_active`**: User account status (active/inactive)
- **`is_online`**: Current online status
- **`has_passcode`**: Whether user has set up wallet passcode

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
| `has_active_passcode` | boolean | Wallet passcode status |
| `wallet` | object | Wallet balance information |
| `created_at` | string | Account creation timestamp |

### Wallet Object

| Field | Type | Description |
|-------|------|-------------|
| `available_balance` | number | Available wallet balance |
| `locked_balance` | number | Locked wallet balance |
| `total_balance` | number | Total wallet balance (available + locked) |
| `is_locked` | boolean | Whether the wallet is locked |
| `lock_reason` | string | Reason for wallet lock (null if not locked) |
| `locked_at` | string | Timestamp when wallet was locked (null if not locked) |
| `locked_by` | integer | Admin user ID who locked the wallet (null if not locked) |

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
| `total_users` | integer | Total number of users in result |
| `total_available_balance` | number | Sum of all available balances |
| `total_locked_balance` | number | Sum of all locked balances |
| `total_balance` | number | Sum of all total balances |
| `average_balance` | number | Average balance per user |
| `locked_wallets_count` | integer | Number of locked wallets |
| `unlocked_wallets_count` | integer | Number of unlocked wallets |

---

## Performance Considerations

### Database Optimization

- Uses efficient joins for wallet data
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

- Sensitive information is properly handled
- Wallet passcode information is not exposed
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

async function getWalletBalances(filters = {}) {
  try {
    const response = await axios.get('/api/v1/admin/users/wallet-balances', {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Accept': 'application/json'
      },
      params: filters
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet balances:', error.response.data);
    throw error;
  }
}

// Usage examples
const allBalances = await getWalletBalances();
const driverBalances = await getWalletBalances({ role: 'driver' });
const highBalanceUsers = await getWalletBalances({ 
  min_balance: 1000, 
  sort_by: 'total_balance', 
  sort_order: 'desc' 
});
```

### PHP

```php
<?php

function getWalletBalances($filters = []) {
    $url = 'https://api.example.com/api/v1/admin/users/wallet-balances';
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
$allBalances = getWalletBalances();
$driverBalances = getWalletBalances(['role' => 'driver']);
$highBalanceUsers = getWalletBalances([
    'min_balance' => 1000,
    'sort_by' => 'total_balance',
    'sort_order' => 'desc'
]);
?>
```

---

## Future Enhancements

### Planned Features

1. **Export Functionality**: CSV/Excel export of wallet balance data
2. **Advanced Analytics**: Trend analysis and reporting
3. **Real-time Updates**: WebSocket support for live balance updates
4. **Bulk Operations**: Mass wallet operations for admin users
5. **Custom Filters**: User-defined filter combinations
6. **Data Visualization**: Charts and graphs for balance distribution

### API Versioning

- Current version: v1
- Backward compatibility maintained
- New features added in future versions
- Deprecation notices provided in advance

---

## Support and Documentation

### Additional Resources

- [Admin Dashboard API Documentation](./ENHANCED_DASHBOARD_API.md)
- [Wallet Transactions API Documentation](./WALLET_TRANSACTIONS_API.md)
- [User Management API Documentation](./USER_MANAGEMENT_API.md)

### Contact Information

For technical support or API questions:
- Email: support@example.com
- Documentation: https://docs.example.com
- API Status: https://status.example.com
