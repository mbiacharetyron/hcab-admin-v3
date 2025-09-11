# Wallet Management API Documentation

## Overview

The Wallet Management API provides administrators with comprehensive tools to manage user wallets, including locking/unlocking wallets to prevent withdrawals and transferring locked balances to available balances. This system ensures financial security and provides flexible balance management capabilities.

## Features

- **Wallet Locking**: Prevent users from making withdrawals
- **Wallet Unlocking**: Restore withdrawal capabilities
- **Balance Transfer**: Move locked balance to available balance
- **Audit Trail**: Track all wallet management actions
- **Admin Controls**: Secure admin-only access
- **Bilingual Support**: English and French responses
- **Comprehensive Validation**: Input validation and error handling

## Database Schema

### New Wallet Fields

The wallet table has been extended with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `is_locked` | boolean | Whether the wallet is locked (default: false) |
| `lock_reason` | text | Reason for locking the wallet (nullable) |
| `locked_at` | timestamp | When the wallet was locked (nullable) |
| `locked_by` | foreign key | Admin user who locked the wallet (nullable) |

### Migration

Run the migration to add the new fields:
```bash
php artisan migrate
```

---

## API Endpoints

### 1. Lock Wallet

**POST** `/api/v1/admin/wallets/{userId}/lock`

Locks a user's wallet to prevent withdrawals.

#### Authentication
- **Required**: Bearer token
- **Role**: Admin only

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `userId` | integer | path | Yes | User ID whose wallet to lock |

#### Request Body

```json
{
  "reason": "Suspicious activity detected",
  "lang": "en"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `reason` | string | Yes | Reason for locking the wallet (max 500 chars) |
| `lang` | string | No | Language for response (`en` or `fr`) |

#### Success Response (200)

```json
{
  "success": true,
  "message": "Wallet locked successfully",
  "data": {
    "user_id": 1,
    "is_locked": true,
    "lock_reason": "Suspicious activity detected",
    "locked_at": "2025-01-15T10:30:00.000000Z",
    "locked_by": 98
  }
}
```

#### Error Responses

**403 Forbidden** - Admin access required
```json
{
  "success": false,
  "message": "Admin access required",
  "code": 403
}
```

**404 Not Found** - User or wallet not found
```json
{
  "success": false,
  "message": "User not found",
  "code": 404
}
```

**409 Conflict** - Wallet already locked
```json
{
  "success": false,
  "message": "Wallet is already locked",
  "code": 409
}
```

---

### 2. Unlock Wallet

**POST** `/api/v1/admin/wallets/{userId}/unlock`

Unlocks a user's wallet to allow withdrawals.

#### Authentication
- **Required**: Bearer token
- **Role**: Admin only

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `userId` | integer | path | Yes | User ID whose wallet to unlock |

#### Request Body

```json
{
  "lang": "en"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `lang` | string | No | Language for response (`en` or `fr`) |

#### Success Response (200)

```json
{
  "success": true,
  "message": "Wallet unlocked successfully",
  "data": {
    "user_id": 1,
    "is_locked": false,
    "lock_reason": null,
    "locked_at": null,
    "locked_by": null
  }
}
```

#### Error Responses

**403 Forbidden** - Admin access required
**404 Not Found** - User or wallet not found
**409 Conflict** - Wallet already unlocked

---

### 3. Transfer Locked Balance

**POST** `/api/v1/admin/wallets/{userId}/transfer-locked-balance`

Transfers a specified amount or all locked balance to available balance.

#### Authentication
- **Required**: Bearer token
- **Role**: Admin only

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `userId` | integer | path | Yes | User ID whose balance to transfer |

#### Request Body

```json
{
  "amount": 100.50,
  "lang": "en"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | number | No | Amount to transfer (if not provided, transfers all locked balance) |
| `lang` | string | No | Language for response (`en` or `fr`) |

#### Success Response (200)

```json
{
  "success": true,
  "message": "Balance transferred successfully",
  "data": {
    "user_id": 1,
    "amount_transferred": 100.50,
    "new_available_balance": 250.75,
    "new_locked_balance": 0.00,
    "total_balance": 250.75
  }
}
```

#### Error Responses

**400 Bad Request** - Invalid amount or insufficient locked balance
```json
{
  "success": false,
  "message": "Insufficient locked balance",
  "code": 400
}
```

**403 Forbidden** - Admin access required
**404 Not Found** - User or wallet not found

---

## Usage Examples

### 1. Lock a User's Wallet

```bash
curl -X POST "https://api.example.com/api/v1/admin/wallets/123/lock" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Suspicious transaction patterns detected",
    "lang": "en"
  }'
```

### 2. Unlock a User's Wallet

```bash
curl -X POST "https://api.example.com/api/v1/admin/wallets/123/unlock" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lang": "en"
  }'
```

### 3. Transfer All Locked Balance

```bash
curl -X POST "https://api.example.com/api/v1/admin/wallets/123/transfer-locked-balance" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lang": "en"
  }'
```

### 4. Transfer Specific Amount

```bash
curl -X POST "https://api.example.com/api/v1/admin/wallets/123/transfer-locked-balance" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "lang": "en"
  }'
```

### 5. French Language Response

```bash
curl -X POST "https://api.example.com/api/v1/admin/wallets/123/lock" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Activité suspecte détectée",
    "lang": "fr"
  }'
```

---

## Wallet Model Methods

### Lock Methods

```php
// Lock wallet with reason and admin ID
$wallet->lock('Suspicious activity', $adminId);

// Check if wallet is locked
$isLocked = $wallet->isLocked();

// Unlock wallet
$wallet->unlock();
```

### Balance Transfer Methods

```php
// Transfer all locked balance to available
$success = $wallet->transferLockedToAvailable();

// Transfer specific amount
$success = $wallet->transferLockedToAvailable(100.50);

// Get total balance (available + locked)
$totalBalance = $wallet->total_balance;
```

### Query Scopes

```php
// Get locked wallets
$lockedWallets = Wallet::locked()->get();

// Get unlocked wallets
$unlockedWallets = Wallet::unlocked()->get();
```

---

## Withdrawal Protection

When a wallet is locked, the withdrawal process is automatically blocked:

```php
// In WalletController::walletWithdrawal()
if ($user->wallet->is_locked) {
    return $this->result_fail('Wallet is locked. Withdrawals are not allowed.', 403);
}
```

### Error Response for Locked Wallet

```json
{
  "success": false,
  "message": "Wallet is locked. Withdrawals are not allowed.",
  "code": 403
}
```

---

## Security Features

### Access Control

- **Admin Only**: All wallet management endpoints require admin role
- **Authentication**: Bearer token authentication required
- **Audit Logging**: All actions are logged with admin and user details

### Data Validation

- **Input Validation**: All request parameters are validated
- **Amount Validation**: Transfer amounts must be positive and within available locked balance
- **Reason Validation**: Lock reasons are limited to 500 characters

### Audit Trail

All wallet management actions are logged with:
- Admin user ID who performed the action
- Target user ID
- Action type (lock/unlock/transfer)
- Timestamp
- Additional details (reason, amount, etc.)

---

## Integration Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class WalletManager {
  constructor(adminToken) {
    this.token = adminToken;
    this.baseURL = 'https://api.example.com/api/v1/admin';
  }

  async lockWallet(userId, reason, lang = 'en') {
    try {
      const response = await axios.post(`${this.baseURL}/wallets/${userId}/lock`, {
        reason,
        lang
      }, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to lock wallet: ${error.response.data.message}`);
    }
  }

  async unlockWallet(userId, lang = 'en') {
    try {
      const response = await axios.post(`${this.baseURL}/wallets/${userId}/unlock`, {
        lang
      }, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to unlock wallet: ${error.response.data.message}`);
    }
  }

  async transferBalance(userId, amount = null, lang = 'en') {
    try {
      const body = { lang };
      if (amount !== null) {
        body.amount = amount;
      }

      const response = await axios.post(`${this.baseURL}/wallets/${userId}/transfer-locked-balance`, body, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to transfer balance: ${error.response.data.message}`);
    }
  }
}

// Usage
const walletManager = new WalletManager('your-admin-token');

// Lock a wallet
await walletManager.lockWallet(123, 'Suspicious activity detected');

// Unlock a wallet
await walletManager.unlockWallet(123);

// Transfer all locked balance
await walletManager.transferBalance(123);

// Transfer specific amount
await walletManager.transferBalance(123, 50.00);
```

### PHP

```php
<?php

class WalletManager {
    private $adminToken;
    private $baseURL;

    public function __construct($adminToken, $baseURL = 'https://api.example.com/api/v1/admin') {
        $this->adminToken = $adminToken;
        $this->baseURL = $baseURL;
    }

    public function lockWallet($userId, $reason, $lang = 'en') {
        $url = $this->baseURL . "/wallets/{$userId}/lock";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'reason' => $reason,
            'lang' => $lang
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->adminToken,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        } else {
            throw new Exception('Failed to lock wallet: ' . $response);
        }
    }

    public function unlockWallet($userId, $lang = 'en') {
        $url = $this->baseURL . "/wallets/{$userId}/unlock";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['lang' => $lang]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->adminToken,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        } else {
            throw new Exception('Failed to unlock wallet: ' . $response);
        }
    }

    public function transferBalance($userId, $amount = null, $lang = 'en') {
        $url = $this->baseURL . "/wallets/{$userId}/transfer-locked-balance";
        
        $body = ['lang' => $lang];
        if ($amount !== null) {
            $body['amount'] = $amount;
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->adminToken,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        } else {
            throw new Exception('Failed to transfer balance: ' . $response);
        }
    }
}

// Usage
$walletManager = new WalletManager('your-admin-token');

// Lock a wallet
$result = $walletManager->lockWallet(123, 'Suspicious activity detected');

// Unlock a wallet
$result = $walletManager->unlockWallet(123);

// Transfer all locked balance
$result = $walletManager->transferBalance(123);

// Transfer specific amount
$result = $walletManager->transferBalance(123, 50.00);
?>
```

---

## Use Cases

### 1. Fraud Prevention

**Scenario**: Suspicious transaction patterns detected
```bash
# Lock the wallet immediately
POST /api/v1/admin/wallets/123/lock
{
  "reason": "Multiple failed withdrawal attempts from different locations",
  "lang": "en"
}
```

### 2. Account Investigation

**Scenario**: User account under investigation
```bash
# Lock wallet during investigation
POST /api/v1/admin/wallets/123/lock
{
  "reason": "Account under investigation for policy violations",
  "lang": "en"
}

# After investigation, unlock if cleared
POST /api/v1/admin/wallets/123/unlock
{
  "lang": "en"
}
```

### 3. Balance Recovery

**Scenario**: Releasing locked funds to user
```bash
# Transfer all locked balance to available
POST /api/v1/admin/wallets/123/transfer-locked-balance
{
  "lang": "en"
}
```

### 4. Partial Balance Release

**Scenario**: Releasing only part of locked funds
```bash
# Transfer specific amount
POST /api/v1/admin/wallets/123/transfer-locked-balance
{
  "amount": 100.00,
  "lang": "en"
}
```

---

## Error Handling

### Common Error Scenarios

1. **Unauthorized Access**: Non-admin users attempting to manage wallets
2. **User Not Found**: Invalid user ID provided
3. **Wallet Not Found**: User doesn't have a wallet
4. **Already Locked/Unlocked**: Attempting to lock already locked wallet
5. **Insufficient Balance**: Trying to transfer more than available locked balance
6. **Invalid Amount**: Negative or zero transfer amounts

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

## Monitoring and Logging

### Log Entries

All wallet management actions generate log entries:

```php
Log::info('Wallet locked by admin', [
    'admin_id' => $admin->id,
    'user_id' => $userId,
    'reason' => $request->input('reason')
]);
```

### Monitoring Recommendations

1. **Alert on Lock Actions**: Set up alerts for wallet locks
2. **Track Transfer Volumes**: Monitor balance transfer amounts
3. **Admin Activity**: Track admin wallet management actions
4. **Failed Attempts**: Monitor failed lock/unlock attempts

---

## Performance Considerations

### Database Optimization

- **Indexes**: Ensure proper indexing on `is_locked`, `locked_by`, and `locked_at` fields
- **Query Optimization**: Use efficient queries for wallet status checks
- **Transaction Safety**: All balance transfers use database transactions

### Caching

- Consider caching wallet lock status for frequently accessed wallets
- Implement Redis caching for wallet balance queries
- Cache admin permissions to reduce database queries

---

## Future Enhancements

### Planned Features

1. **Bulk Operations**: Lock/unlock multiple wallets at once
2. **Scheduled Locks**: Automatic wallet locking based on conditions
3. **Lock Expiration**: Automatic unlock after specified time
4. **Advanced Analytics**: Wallet management analytics and reporting
5. **Notification System**: Notify users when wallets are locked/unlocked
6. **Audit Dashboard**: Web interface for wallet management

### API Versioning

- Current version: v1
- Backward compatibility maintained
- New features added in future versions
- Deprecation notices provided in advance

---

## Support and Documentation

### Additional Resources

- [Wallet Balances API Documentation](./WALLET_BALANCES_API.md)
- [Users with Devices API Documentation](./USERS_DEVICES_API.md)
- [Admin Dashboard API Documentation](./ENHANCED_DASHBOARD_API.md)

### Contact Information

For technical support or API questions:
- Email: support@example.com
- Documentation: https://docs.example.com
- API Status: https://status.example.com
