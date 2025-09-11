# H-Cab Firebase Notifications Documentation

## Overview

The H-Cab Firebase Notifications system provides comprehensive push notification capabilities for the ride-sharing platform. It supports sending notifications to individual users, multiple users, and targeted user groups with advanced error handling, device management, and analytics.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Configuration](#configuration)
3. [FirebaseService Class](#firebaseservice-class)
4. [API Endpoints](#api-endpoints)
5. [Notification Types](#notification-types)
6. [Device Management](#device-management)
7. [Error Handling](#error-handling)
8. [Integration Examples](#integration-examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## System Architecture

### Components

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Mobile Apps   │    │   Web Dashboard  │    │  Admin Panel    │
│                 │    │                  │    │                 │
│ • iOS App       │    │ • User Interface │    │ • Notification  │
│ • Android App   │    │ • Real-time      │    │   Management    │
│ • FCM Tokens    │    │   Updates        │    │ • Analytics     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │   H-Cab Backend     │
                    │                     │
                    │ • FirebaseService   │
                    │ • Notification APIs │
                    │ • Device Management │
                    │ • Error Handling    │
                    └─────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │   Firebase Cloud    │
                    │   Messaging (FCM)   │
                    │                     │
                    │ • Push Delivery     │
                    │ • Token Validation  │
                    │ • Analytics         │
                    └─────────────────────┘
```

### Data Flow

1. **User Registration**: Device tokens are registered when users log in
2. **Notification Trigger**: System events or admin actions trigger notifications
3. **Token Validation**: FirebaseService validates and filters device tokens
4. **Batch Processing**: Notifications are sent in batches for efficiency
5. **Error Handling**: Invalid tokens are automatically cleaned up
6. **Analytics**: Delivery statistics are logged and tracked

---

## Configuration

### Environment Variables

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CREDENTIALS=/path/to/service-account.json
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Optional Firebase Settings
FIREBASE_HTTP_CLIENT_TIMEOUT=30
FIREBASE_HTTP_CLIENT_PROXY=
FIREBASE_CACHE_STORE=file
FIREBASE_HTTP_LOG_CHANNEL=firebase
```

### Service Account Setup

1. **Download Service Account Key**:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Download JSON file

2. **Place Service Account File**:
   ```bash
   # Place in storage/app/ directory
   storage/app/hcab-user.json
   ```

3. **Set Environment Variables**:
   ```bash
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CREDENTIALS=storage/app/hcab-user.json
   ```

### Firebase Configuration File

The system uses `config/firebase.php` for advanced configuration:

```php
<?php
return [
    'default' => env('FIREBASE_PROJECT', 'app'),
    
    'projects' => [
        'app' => [
            'credentials' => env('FIREBASE_CREDENTIALS'),
            'http_client_options' => [
                'timeout' => env('FIREBASE_HTTP_CLIENT_TIMEOUT', 30),
                'proxy' => env('FIREBASE_HTTP_CLIENT_PROXY'),
            ],
            'cache_store' => env('FIREBASE_CACHE_STORE', 'file'),
            'logging' => [
                'http_log_channel' => env('FIREBASE_HTTP_LOG_CHANNEL'),
            ],
        ],
    ],
];
```

---

## FirebaseService Class

### Core Methods

#### 1. sendNotification()
Send notification to a single device.

```php
public function sendNotification($deviceToken, $title, $body, $data = [])
```

**Parameters:**
- `$deviceToken` (string): FCM registration token
- `$title` (string): Notification title
- `$body` (string): Notification body
- `$data` (array): Additional data payload

**Returns:**
- Success: Array with FCM response
- Failure: Exception with error details

**Example:**
```php
$firebaseService = new FirebaseService();

try {
    $result = $firebaseService->sendNotification(
        'device_token_here',
        'Ride Request',
        'You have a new ride request',
        [
            'type' => 'ride_request',
            'booking_id' => 123,
            'rider_name' => 'John Doe'
        ]
    );
    
    Log::info('Notification sent successfully', $result);
} catch (\Exception $e) {
    Log::error('Failed to send notification', ['error' => $e->getMessage()]);
}
```

#### 2. sendNotificationToMultipleDevices()
Send notification to multiple devices with error handling.

```php
public function sendNotificationToMultipleDevices($deviceTokens, $title, $body, $data = [])
```

**Parameters:**
- `$deviceTokens` (array): Array of FCM registration tokens
- `$title` (string): Notification title
- `$body` (string): Notification body
- `$data` (array): Additional data payload

**Returns:**
```php
[
    'successful' => [
        ['token' => 'token1', 'result' => 'fcm_response'],
        ['token' => 'token2', 'result' => 'fcm_response']
    ],
    'failed' => [
        ['token' => 'invalid_token', 'error' => 'error_message']
    ]
]
```

**Example:**
```php
$deviceTokens = ['token1', 'token2', 'token3'];

$results = $firebaseService->sendNotificationToMultipleDevices(
    $deviceTokens,
    'System Update',
    'The app has been updated with new features',
    ['type' => 'app_update', 'version' => '2.1.0']
);

// Process results
foreach ($results['successful'] as $success) {
    Log::info('Notification sent', ['token' => $success['token']]);
}

foreach ($results['failed'] as $failure) {
    Log::warning('Notification failed', [
        'token' => $failure['token'],
        'error' => $failure['error']
    ]);
}
```

#### 3. sendNotificationGracefully()
Send notification without throwing exceptions.

```php
public function sendNotificationGracefully($deviceToken, $title, $body, $data = [])
```

**Returns:**
- Success: Array with FCM response
- Failure: Array with error information

#### 4. handleInvalidDeviceTokens()
Automatically deactivate devices with invalid tokens.

```php
private function handleInvalidDeviceTokens($invalidTokens)
```

**Features:**
- Marks devices as inactive in database
- Logs invalid token cleanup
- Prevents future notification attempts

---

## API Endpoints

### 1. Test Notifications

#### Send to Single Device
```http
POST /api/v1/test/notification/single
```

**Request Body:**
```json
{
  "title": "Test Notification",
  "body": "This is a test notification",
  "device_token": "FCM_TOKEN_HERE",
  "data": {
    "type": "test",
    "action": "open_app"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification sent successfully",
  "data": {
    "name": "projects/your-project/messages/0:1234567890"
  }
}
```

#### Send to Multiple Devices
```http
POST /api/v1/test/notification/multiple
```

**Request Body:**
```json
{
  "title": "Test Notification",
  "body": "This is a test notification",
  "device_tokens": [
    "FCM_TOKEN_1",
    "FCM_TOKEN_2",
    "FCM_TOKEN_3"
  ],
  "data": {
    "type": "test",
    "action": "open_app"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notifications processed",
  "data": {
    "successful": [
      {
        "device_token": "FCM_TOKEN_1",
        "status": "success",
        "result": "fcm_response"
      }
    ],
    "failed": [
      {
        "device_token": "FCM_TOKEN_2",
        "error": "Invalid registration token"
      }
    ]
  }
}
```

### 2. Admin Notifications

#### Send to All Users
```http
POST /api/v1/admin/notifications/send
```

**Request Body:**
```json
{
  "title": "System Maintenance",
  "body": "The app will be under maintenance from 2-4 AM",
  "target_type": "all",
  "data": {
    "type": "maintenance",
    "action": "show_maintenance_screen"
  }
}
```

#### Send to Specific User Type
```json
{
  "title": "Driver Training Available",
  "body": "Complete your mandatory driver training",
  "target_type": "drivers",
  "data": {
    "type": "training",
    "action": "open_training_module"
  }
}
```

#### Send to Specific Users
```json
{
  "title": "Account Verification",
  "body": "Please complete your account verification",
  "target_type": "all",
  "user_ids": [1, 2, 3],
  "data": {
    "type": "verification",
    "action": "open_verification_screen"
  }
}
```

### 3. General Notification Endpoint

#### Send Custom Notification
```http
POST /api/v1/notification/send
```

**Request Body:**
```json
{
  "title": "Custom Notification",
  "body": "Your custom message here",
  "token": "FCM_TOKEN_HERE",
  "data": {
    "custom_field": "custom_value"
  }
}
```

---

## Notification Types

### 1. Ride-Related Notifications

#### Ride Request
```php
$notificationData = [
    'type' => 'ride_request',
    'booking_id' => 123,
    'rider_name' => 'John Doe',
    'pickup_location' => '123 Main St',
    'estimated_fare' => 15.50
];
```

#### Ride Accepted
```php
$notificationData = [
    'type' => 'ride_accepted',
    'booking_id' => 123,
    'driver_name' => 'Jane Smith',
    'driver_phone' => '+237123456789',
    'estimated_arrival' => '5 minutes'
];
```

#### Ride Started
```php
$notificationData = [
    'type' => 'ride_started',
    'booking_id' => 123,
    'driver_name' => 'Jane Smith',
    'vehicle_info' => 'Toyota Camry - ABC123'
];
```

#### Ride Completed
```php
$notificationData = [
    'type' => 'ride_completed',
    'booking_id' => 123,
    'fare' => 15.50,
    'rating_url' => 'https://app.h-cab.com/rate/123'
];
```

### 2. Payment Notifications

#### Payment Received
```php
$notificationData = [
    'type' => 'payment_received',
    'amount' => 15.50,
    'currency' => 'XAF',
    'transaction_id' => 'TXN123456',
    'balance' => 150.00
];
```

#### Payment Failed
```php
$notificationData = [
    'type' => 'payment_failed',
    'amount' => 15.50,
    'reason' => 'Insufficient funds',
    'retry_url' => 'https://app.h-cab.com/payment/retry/123'
];
```

### 3. System Notifications

#### App Update
```php
$notificationData = [
    'type' => 'app_update',
    'version' => '2.1.0',
    'features' => ['New UI', 'Better Performance'],
    'update_url' => 'https://play.google.com/store/apps/details?id=com.hcab.app'
];
```

#### Maintenance Notice
```php
$notificationData = [
    'type' => 'maintenance',
    'start_time' => '2025-01-15T02:00:00Z',
    'end_time' => '2025-01-15T04:00:00Z',
    'message' => 'Scheduled maintenance in progress'
];
```

### 4. Security Notifications

#### New Device Login
```php
$notificationData = [
    'type' => 'new_device_login',
    'device_name' => 'iPhone 12',
    'location' => 'Douala, Cameroon',
    'timestamp' => '2025-01-15T10:30:00Z',
    'action_url' => 'https://app.h-cab.com/security/devices'
];
```

#### Password Changed
```php
$notificationData = [
    'type' => 'password_changed',
    'timestamp' => '2025-01-15T10:30:00Z',
    'action_url' => 'https://app.h-cab.com/security/password'
];
```

---

## Device Management

### Device Token Registration

When users log in, their device tokens are automatically registered:

```php
// In UserController or AuthController
public function login(Request $request)
{
    // ... authentication logic ...
    
    // Register device token
    if ($request->has('device_token')) {
        $user->devices()->updateOrCreate(
            ['device_token' => $request->device_token],
            [
                'device_type' => $request->device_type ?? 'unknown',
                'is_active' => true,
                'last_used_at' => now()
            ]
        );
    }
    
    return response()->json(['user' => $user]);
}
```

### Device Token Validation

The system automatically validates and cleans up invalid tokens:

```php
// Automatic cleanup in FirebaseService
private function handleInvalidDeviceTokens($invalidTokens)
{
    foreach ($invalidTokens as $token) {
        // Mark device as inactive
        Device::where('device_token', $token)
            ->update(['is_active' => false]);
        
        Log::info('Device deactivated due to invalid token', [
            'token' => $token
        ]);
    }
}
```

### Device Statistics

Track device usage and notification delivery:

```php
// Get device statistics
$deviceStats = [
    'total_devices' => Device::count(),
    'active_devices' => Device::where('is_active', true)->count(),
    'ios_devices' => Device::where('device_type', 'ios')->count(),
    'android_devices' => Device::where('device_type', 'android')->count(),
    'recent_devices' => Device::where('last_used_at', '>=', now()->subDays(7))->count()
];
```

---

## Error Handling

### FCM Error Codes

The system handles various FCM error scenarios:

#### 1. Invalid Registration Token (400)
```php
// Error: Invalid FCM registration token
// Action: Mark device as inactive
if (strpos($errorMessage, 'registration token') !== false) {
    $this->handleInvalidDeviceTokens([$deviceToken]);
}
```

#### 2. Unregistered Device (404)
```php
// Error: Requested entity was not found
// Action: Remove device from database
if ($errorCode === 404) {
    Device::where('device_token', $deviceToken)->delete();
}
```

#### 3. Mismatched Sender ID (403)
```php
// Error: Mismatched sender ID
// Action: Check Firebase configuration
if ($errorCode === 403) {
    Log::error('Firebase configuration error', [
        'error' => $errorMessage,
        'project_id' => $this->projectId
    ]);
}
```

#### 4. Message Too Big (413)
```php
// Error: Message payload too large
// Action: Reduce payload size
if ($errorCode === 413) {
    // Remove large data fields
    $data = array_slice($data, 0, 3); // Keep only essential data
}
```

### Retry Logic

Implement exponential backoff for failed notifications:

```php
public function sendNotificationWithRetry($deviceToken, $title, $body, $data = [], $maxRetries = 3)
{
    $attempt = 0;
    
    while ($attempt < $maxRetries) {
        try {
            return $this->sendNotification($deviceToken, $title, $body, $data);
        } catch (\Exception $e) {
            $attempt++;
            
            if ($attempt >= $maxRetries) {
                throw $e;
            }
            
            // Exponential backoff: 1s, 2s, 4s
            $delay = pow(2, $attempt - 1);
            sleep($delay);
        }
    }
}
```

---

## Integration Examples

### 1. Laravel Controller Integration

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Services\FirebaseService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $firebaseService;
    
    public function __construct(FirebaseService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }
    
    public function sendRideNotification($bookingId, $type, $userId)
    {
        $user = User::find($userId);
        $booking = Booking::find($bookingId);
        
        $deviceTokens = $user->devices()
            ->where('is_active', true)
            ->pluck('device_token')
            ->toArray();
        
        if (empty($deviceTokens)) {
            return;
        }
        
        $notificationData = $this->buildRideNotificationData($booking, $type);
        
        $results = $this->firebaseService->sendNotificationToMultipleDevices(
            $deviceTokens,
            $notificationData['title'],
            $notificationData['body'],
            $notificationData['data']
        );
        
        $this->logNotificationResults($results, $user->id, $type);
    }
    
    private function buildRideNotificationData($booking, $type)
    {
        switch ($type) {
            case 'request':
                return [
                    'title' => 'New Ride Request',
                    'body' => "Ride request from {$booking->rider->name}",
                    'data' => [
                        'type' => 'ride_request',
                        'booking_id' => $booking->id,
                        'rider_name' => $booking->rider->name,
                        'pickup_location' => $booking->source_name
                    ]
                ];
                
            case 'accepted':
                return [
                    'title' => 'Ride Accepted',
                    'body' => "Your ride has been accepted by {$booking->driver->name}",
                    'data' => [
                        'type' => 'ride_accepted',
                        'booking_id' => $booking->id,
                        'driver_name' => $booking->driver->name,
                        'driver_phone' => $booking->driver->phone
                    ]
                ];
                
            default:
                throw new \InvalidArgumentException("Unknown notification type: {$type}");
        }
    }
}
```

### 2. Event-Driven Notifications

```php
<?php

namespace App\Listeners;

use App\Events\RideRequested;
use App\Services\FirebaseService;

class SendRideRequestNotification
{
    protected $firebaseService;
    
    public function __construct(FirebaseService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }
    
    public function handle(RideRequested $event)
    {
        $booking = $event->booking;
        $driver = $booking->driver;
        
        $deviceTokens = $driver->devices()
            ->where('is_active', true)
            ->pluck('device_token')
            ->toArray();
        
        if (empty($deviceTokens)) {
            return;
        }
        
        $this->firebaseService->sendNotificationToMultipleDevices(
            $deviceTokens,
            'New Ride Request',
            "Ride request from {$booking->rider->name}",
            [
                'type' => 'ride_request',
                'booking_id' => $booking->id,
                'rider_name' => $booking->rider->name,
                'pickup_location' => $booking->source_name,
                'estimated_fare' => $booking->ride_fare
            ]
        );
    }
}
```

### 3. Scheduled Notifications

```php
<?php

namespace App\Console\Commands;

use App\Services\FirebaseService;
use App\Models\User;
use Illuminate\Console\Command;

class SendPromotionalNotifications extends Command
{
    protected $signature = 'notifications:promotional';
    protected $description = 'Send promotional notifications to users';
    
    protected $firebaseService;
    
    public function __construct(FirebaseService $firebaseService)
    {
        parent::__construct();
        $this->firebaseService = $firebaseService;
    }
    
    public function handle()
    {
        $users = User::where('is_active', true)
            ->where('notification_preferences->promotional', true)
            ->with('devices')
            ->get();
        
        $this->info("Sending promotional notifications to {$users->count()} users");
        
        foreach ($users as $user) {
            $deviceTokens = $user->devices()
                ->where('is_active', true)
                ->pluck('device_token')
                ->toArray();
            
            if (empty($deviceTokens)) {
                continue;
            }
            
            $this->firebaseService->sendNotificationToMultipleDevices(
                $deviceTokens,
                'Special Offer!',
                'Get 20% off your next ride with code SAVE20',
                [
                    'type' => 'promotional',
                    'promo_code' => 'SAVE20',
                    'discount' => 20
                ]
            );
            
            $this->line("Sent to user: {$user->name}");
        }
        
        $this->info('Promotional notifications sent successfully');
    }
}
```

---

## Best Practices

### 1. Notification Content

#### Title Guidelines
- Keep titles under 50 characters
- Use action-oriented language
- Be specific and relevant
- Avoid spam-like language

```php
// Good titles
"New Ride Request"
"Payment Received"
"Driver Arrived"

// Bad titles
"Click here now!!!"
"Urgent!!!"
"Important message"
```

#### Body Guidelines
- Keep body under 200 characters
- Provide clear value proposition
- Include relevant details
- Use conversational tone

```php
// Good bodies
"John Doe wants a ride to the airport"
"Your payment of $15.50 was successful"
"Your driver Jane Smith has arrived"

// Bad bodies
"Click here for more information"
"You have a new message"
"Important update available"
```

### 2. Data Payload

#### Essential Data Fields
```php
$data = [
    'type' => 'ride_request',           // Notification type
    'booking_id' => 123,                // Related entity ID
    'timestamp' => time(),              // Unix timestamp
    'action' => 'open_ride_details'     // App action to take
];
```

#### Optional Data Fields
```php
$data = [
    'user_id' => 456,                   // Related user ID
    'deep_link' => 'hcab://ride/123',   // Deep link URL
    'image_url' => 'https://...',       // Notification image
    'sound' => 'default',               // Notification sound
    'priority' => 'high'                // Notification priority
];
```

### 3. Timing and Frequency

#### Optimal Send Times
```php
// Business hours (9 AM - 6 PM)
$businessHours = now()->between(
    now()->setTime(9, 0),
    now()->setTime(18, 0)
);

// Avoid late night notifications
$lateNight = now()->hour >= 22 || now()->hour <= 6;

if ($lateNight && $notificationType !== 'urgent') {
    // Schedule for next business day
    $this->scheduleNotification($notification, now()->addDay()->setTime(9, 0));
}
```

#### Rate Limiting
```php
// Implement user-level rate limiting
$recentNotifications = NotificationLog::where('user_id', $userId)
    ->where('created_at', '>=', now()->subHour())
    ->count();

if ($recentNotifications >= 5) {
    // Skip notification to prevent spam
    return;
}
```

### 4. Error Handling

#### Graceful Degradation
```php
public function sendNotificationSafely($deviceTokens, $title, $body, $data = [])
{
    try {
        $results = $this->firebaseService->sendNotificationToMultipleDevices(
            $deviceTokens, $title, $body, $data
        );
        
        // Log successful deliveries
        $this->logSuccessfulDeliveries($results['successful']);
        
        // Handle failed deliveries
        $this->handleFailedDeliveries($results['failed']);
        
        return $results;
        
    } catch (\Exception $e) {
        // Log error but don't break the application
        Log::error('Notification service unavailable', [
            'error' => $e->getMessage(),
            'title' => $title
        ]);
        
        // Optionally queue for retry
        $this->queueNotificationForRetry($deviceTokens, $title, $body, $data);
        
        return ['successful' => [], 'failed' => $deviceTokens];
    }
}
```

### 5. Analytics and Monitoring

#### Delivery Tracking
```php
public function logNotificationDelivery($userId, $type, $success, $error = null)
{
    NotificationLog::create([
        'user_id' => $userId,
        'type' => $type,
        'success' => $success,
        'error_message' => $error,
        'sent_at' => now()
    ]);
}
```

#### Performance Metrics
```php
public function getNotificationMetrics($dateRange = 7)
{
    return [
        'total_sent' => NotificationLog::where('created_at', '>=', now()->subDays($dateRange))->count(),
        'success_rate' => NotificationLog::where('created_at', '>=', now()->subDays($dateRange))
            ->where('success', true)->count(),
        'failure_rate' => NotificationLog::where('created_at', '>=', now()->subDays($dateRange))
            ->where('success', false)->count(),
        'top_errors' => NotificationLog::where('created_at', '>=', now()->subDays($dateRange))
            ->where('success', false)
            ->groupBy('error_message')
            ->selectRaw('error_message, count(*) as count')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get()
    ];
}
```

---

## Troubleshooting

### Common Issues

#### 1. Invalid Registration Token
**Symptoms:**
- 400 Bad Request errors
- "Invalid FCM registration token" messages

**Solutions:**
```php
// Check token format
if (!preg_match('/^[a-zA-Z0-9_-]+$/', $deviceToken)) {
    throw new \InvalidArgumentException('Invalid token format');
}

// Validate token length
if (strlen($deviceToken) < 100) {
    throw new \InvalidArgumentException('Token too short');
}
```

#### 2. Firebase Configuration Issues
**Symptoms:**
- 401 Unauthorized errors
- 403 Forbidden errors

**Solutions:**
```bash
# Check service account file
ls -la storage/app/hcab-user.json

# Verify environment variables
php artisan tinker
>>> env('FIREBASE_PROJECT_ID')
>>> env('FIREBASE_CREDENTIALS')

# Test Firebase connection
php artisan tinker
>>> $firebase = app(\App\Services\FirebaseService::class);
>>> $firebase->sendNotification('test_token', 'Test', 'Test message');
```

#### 3. High Failure Rates
**Symptoms:**
- Many failed notifications
- Poor delivery rates

**Solutions:**
```php
// Implement token refresh mechanism
public function refreshDeviceTokens()
{
    $staleTokens = Device::where('last_used_at', '<', now()->subDays(30))
        ->where('is_active', true)
        ->get();
    
    foreach ($staleTokens as $device) {
        // Test token validity
        try {
            $this->firebaseService->sendNotification(
                $device->device_token,
                'Token Test',
                'Testing token validity'
            );
        } catch (\Exception $e) {
            // Mark as inactive if test fails
            $device->update(['is_active' => false]);
        }
    }
}
```

#### 4. Performance Issues
**Symptoms:**
- Slow notification delivery
- Timeout errors

**Solutions:**
```php
// Implement batch processing
public function sendNotificationsInBatches($deviceTokens, $title, $body, $data = [], $batchSize = 100)
{
    $batches = array_chunk($deviceTokens, $batchSize);
    $results = ['successful' => [], 'failed' => []];
    
    foreach ($batches as $batch) {
        $batchResults = $this->firebaseService->sendNotificationToMultipleDevices(
            $batch, $title, $body, $data
        );
        
        $results['successful'] = array_merge($results['successful'], $batchResults['successful']);
        $results['failed'] = array_merge($results['failed'], $batchResults['failed']);
        
        // Add delay between batches
        usleep(100000); // 100ms delay
    }
    
    return $results;
}
```

### Debug Commands

#### Test Firebase Connection
```bash
php artisan tinker
>>> $firebase = app(\App\Services\FirebaseService::class);
>>> $firebase->sendNotification('test_token', 'Test', 'Test message');
```

#### Check Device Tokens
```sql
-- Check active devices
SELECT COUNT(*) as active_devices FROM devices WHERE is_active = 1;

-- Check device types
SELECT device_type, COUNT(*) as count FROM devices WHERE is_active = 1 GROUP BY device_type;

-- Check recent devices
SELECT COUNT(*) as recent_devices FROM devices WHERE last_used_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
```

#### Monitor Notification Logs
```bash
# Check recent notification logs
tail -f storage/logs/laravel.log | grep "FCM"

# Check error logs
tail -f storage/logs/laravel.log | grep "Failed to send notification"
```

### Performance Optimization

#### 1. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_devices_active ON devices(is_active);
CREATE INDEX idx_devices_user_active ON devices(user_id, is_active);
CREATE INDEX idx_notification_logs_user_date ON notification_logs(user_id, created_at);
```

#### 2. Caching
```php
// Cache active device tokens
public function getActiveDeviceTokens($userId)
{
    return Cache::remember("user_devices_{$userId}", 300, function() use ($userId) {
        return Device::where('user_id', $userId)
            ->where('is_active', true)
            ->pluck('device_token')
            ->toArray();
    });
}
```

#### 3. Queue Processing
```php
// Use queues for large notification batches
dispatch(new SendBulkNotifications($deviceTokens, $title, $body, $data));

// In the job class
class SendBulkNotifications implements ShouldQueue
{
    public function handle()
    {
        $firebaseService = app(FirebaseService::class);
        
        $results = $firebaseService->sendNotificationToMultipleDevices(
            $this->deviceTokens,
            $this->title,
            $this->body,
            $this->data
        );
        
        // Log results
        $this->logResults($results);
    }
}
```

---

## Security Considerations

### 1. Token Security
- Never log full device tokens
- Validate token format before sending
- Implement token rotation mechanism
- Monitor for token abuse

### 2. Content Security
- Sanitize notification content
- Validate data payload
- Implement content filtering
- Monitor for spam patterns

### 3. Rate Limiting
- Implement user-level rate limits
- Add IP-based rate limiting
- Monitor for abuse patterns
- Implement automatic blocking

### 4. Privacy Compliance
- Respect user notification preferences
- Implement opt-out mechanisms
- Log minimal necessary data
- Comply with GDPR/CCPA requirements

---

*Firebase Notifications Documentation v1.0 - January 2025*
