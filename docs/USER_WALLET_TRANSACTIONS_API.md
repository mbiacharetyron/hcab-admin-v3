# User Wallet Transactions API Documentation

## Overview

The User Wallet Transactions API allows administrators to retrieve all wallet transactions for a specific user with comprehensive filtering, sorting, and pagination capabilities. This API provides detailed transaction information including amounts, fees, payment methods, status, and related metadata.

## Features

- **User-Specific Transactions**: Retrieve all transactions for a specific user
- **Comprehensive Filtering**: Filter by transaction type, payment method, status, date range, and amount range
- **Advanced Search**: Search by transaction ID, phone number, receipt number, or payment intent ID
- **Flexible Sorting**: Sort by various fields including date, amount, type, and status
- **Pagination**: Efficient pagination for large transaction datasets
- **Summary Statistics**: Detailed transaction statistics and totals
- **User Information**: Includes user details in the response
- **Bilingual Support**: Response messages in English and French

## API Endpoint

**GET** `/api/v1/admin/users/{userId}/wallet-transactions`

### Authentication
- **Required**: Bearer token
- **Role**: Admin only

---

## Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `userId` | integer | User ID whose transactions to retrieve | `1` |

---

## Query Parameters

### Filtering Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `transaction_type` | string | Filter by transaction type | `deposit`, `withdrawal`, `payment`, `refund`, `transfer` |
| `payment_method` | string | Filter by payment method | `MTN_MOMO`, `ORANGE_MONEY`, `STRIPE`, `WALLET` |
| `status` | string | Filter by transaction status | `pending`, `completed`, `failed` |
| `start_date` | string | Filter transactions from this date (YYYY-MM-DD) | `2025-01-01` |
| `end_date` | string | Filter transactions until this date (YYYY-MM-DD) | `2025-01-31` |
| `min_amount` | number | Filter by minimum transaction amount | `100.50` |
| `max_amount` | number | Filter by maximum transaction amount | `1000.00` |
| `search` | string | Search by transaction ID, phone number, or receipt number | `TXN123456` |

### Sorting Parameters

| Parameter | Type | Description | Options | Default |
|-----------|------|-------------|---------|---------|
| `sort_by` | string | Sort by field | `created_at`, `amount`, `transaction_type`, `status` | `created_at` |
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
  "message": "User wallet transactions retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "rider"
    },
    "transactions": [
      {
        "id": 1,
        "transaction_id": "TXN123456789",
        "transaction_type": "deposit",
        "payment_method": "MTN_MOMO",
        "amount": 100.50,
        "fee": 5.00,
        "final_amount": 95.50,
        "status": "completed",
        "phone_number": "+237123456789",
        "s3p_receiptNumber": "RCP123456",
        "stripe_payment_intent_id": "pi_1234567890",
        "message": "Transaction completed successfully",
        "error_code": null,
        "booking_id": 123,
        "created_at": "2025-01-15T10:30:00.000000Z",
        "updated_at": "2025-01-15T10:30:00.000000Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 15,
      "total": 75
    },
    "summary": {
      "total_transactions": 75,
      "total_deposits": 5000.00,
      "total_withdrawals": 2000.00,
      "total_payments": 1500.00,
      "total_fees": 150.00,
      "completed_transactions": 70,
      "pending_transactions": 3,
      "failed_transactions": 2
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

#### 404 Not Found
```json
{
  "success": false,
  "message": "User not found",
  "code": 404
}
```

#### 500 Server Error
```json
{
  "success": false,
  "message": "An error occurred while retrieving user wallet transactions",
  "code": 500
}
```

---

## Usage Examples

### 1. Get All Transactions for a User

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 2. Filter by Transaction Type

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?transaction_type=deposit" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 3. Filter by Payment Method

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?payment_method=MTN_MOMO" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 4. Filter by Status

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?status=completed" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 5. Filter by Date Range

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?start_date=2025-01-01&end_date=2025-01-31" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 6. Filter by Amount Range

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?min_amount=100&max_amount=1000" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 7. Search Transactions

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?search=TXN123" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 8. Sort by Amount (Descending)

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?sort_by=amount&sort_order=desc" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 9. Pagination

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?page=2&per_page=20" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 10. Complex Filtering

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?transaction_type=deposit&status=completed&min_amount=50&sort_by=created_at&sort_order=desc&per_page=25" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 11. French Language Response

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/1/wallet-transactions?lang=fr" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

---

## Data Structure

### User Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | User ID |
| `name` | string | User's full name |
| `email` | string | User's email address |
| `phone` | string | User's phone number |
| `role` | string | User's role (rider, driver, admin) |

### Transaction Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Transaction ID |
| `transaction_id` | string | Unique transaction identifier |
| `transaction_type` | string | Type of transaction (deposit, withdrawal, payment, refund, transfer) |
| `payment_method` | string | Payment method used (MTN_MOMO, ORANGE_MONEY, STRIPE, WALLET) |
| `amount` | number | Transaction amount |
| `fee` | number | Transaction fee |
| `final_amount` | number | Final amount after fees |
| `status` | string | Transaction status (pending, completed, failed) |
| `phone_number` | string | Phone number associated with transaction |
| `s3p_receiptNumber` | string | Receipt number from payment provider |
| `stripe_payment_intent_id` | string | Stripe payment intent ID |
| `message` | string | Transaction message or description |
| `error_code` | string | Error code if transaction failed |
| `booking_id` | integer | Associated booking ID (if applicable) |
| `created_at` | string | Transaction creation timestamp |
| `updated_at` | string | Transaction last update timestamp |

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
| `total_transactions` | integer | Total number of transactions |
| `total_deposits` | number | Sum of all deposit amounts |
| `total_withdrawals` | number | Sum of all withdrawal amounts |
| `total_payments` | number | Sum of all payment amounts |
| `total_fees` | number | Sum of all transaction fees |
| `completed_transactions` | integer | Number of completed transactions |
| `pending_transactions` | integer | Number of pending transactions |
| `failed_transactions` | integer | Number of failed transactions |

---

## Transaction Types

| Type | Description |
|------|-------------|
| `deposit` | Money added to wallet |
| `withdrawal` | Money removed from wallet |
| `payment` | Payment for services (e.g., ride payment) |
| `refund` | Refunded amount |
| `transfer` | Transfer between wallets |

## Payment Methods

| Method | Description |
|--------|-------------|
| `MTN_MOMO` | MTN Mobile Money |
| `ORANGE_MONEY` | Orange Money |
| `STRIPE` | Stripe payment gateway |
| `WALLET` | Internal wallet transfer |

## Transaction Status

| Status | Description |
|--------|-------------|
| `pending` | Transaction is being processed |
| `completed` | Transaction completed successfully |
| `failed` | Transaction failed |

---

## Performance Considerations

- **Pagination**: Always use pagination for large datasets to avoid timeout issues
- **Filtering**: Use specific filters to reduce the dataset size
- **Indexing**: The API uses database indexes on commonly filtered fields
- **Caching**: Consider implementing caching for frequently accessed user transaction data

## Security Considerations

- **Admin Only**: This endpoint is restricted to admin users only
- **User Validation**: The API validates that the requested user exists
- **Input Validation**: All query parameters are validated and sanitized
- **Rate Limiting**: Consider implementing rate limiting for this endpoint

## Error Handling

The API provides comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request**: Invalid query parameters
- **403 Forbidden**: Non-admin access attempt
- **404 Not Found**: User not found
- **500 Internal Server Error**: Server-side errors

All errors include descriptive messages in both English and French based on the `lang` parameter.

---

## Integration Examples

### JavaScript/Fetch

```javascript
async function getUserTransactions(userId, filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/v1/admin/users/${userId}/wallet-transactions?${params}`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const transactions = await getUserTransactions(1, {
  transaction_type: 'deposit',
  status: 'completed',
  per_page: 20
});
```

### PHP/cURL

```php
function getUserTransactions($userId, $filters = []) {
    $url = "https://api.example.com/api/v1/admin/users/{$userId}/wallet-transactions";
    
    if (!empty($filters)) {
        $url .= '?' . http_build_query($filters);
    }
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $adminToken,
        'Accept: application/json'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("API request failed with status: {$httpCode}");
    }
    
    return json_decode($response, true);
}

// Usage
$transactions = getUserTransactions(1, [
    'transaction_type' => 'deposit',
    'status' => 'completed',
    'per_page' => 20
]);
```

---

## Changelog

### Version 1.0.0
- Initial release of User Wallet Transactions API
- Support for comprehensive filtering and sorting
- Pagination and summary statistics
- Bilingual support (English/French)
- Admin-only access control
