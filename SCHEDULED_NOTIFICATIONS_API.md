# Scheduled Notifications API Documentation

## Overview

The Scheduled Notifications API allows administrators to schedule notifications to be sent to users at specific times. This system supports multiple notification types (push, email, SMS) and various targeting options (all users, specific users, user types, custom queries).

## Features

- **Bilingual Support**: Send notifications in both English and French
- **Multiple Notification Types**: Push notifications, email, SMS, or all combined
- **Flexible Targeting**: Send to all users, specific users, user types, or custom queries
- **Scheduled Delivery**: Set exact date and time for notification delivery
- **Queue Processing**: Background job processing for reliable delivery
- **Status Tracking**: Monitor notification status (pending, sent, failed, cancelled)
- **Statistics**: Comprehensive analytics and reporting
- **Management**: Cancel, reschedule, and manage notifications
- **Language Preference**: Automatically sends in user's preferred language

## Database Schema

### scheduled_notifications Table

```sql
CREATE TABLE scheduled_notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255) NULL,
    message TEXT NOT NULL,
    message_fr TEXT NULL,
    target_users JSON NULL,
    target_type ENUM('all', 'specific_users', 'user_type', 'custom_query') DEFAULT 'all',
    user_type VARCHAR(255) NULL,
    custom_query JSON NULL,
    notification_data JSON NULL,
    notification_type ENUM('push', 'email', 'sms', 'all') DEFAULT 'push',
    scheduled_at DATETIME NOT NULL,
    sent_at DATETIME NULL,
    status ENUM('pending', 'sent', 'failed', 'cancelled') DEFAULT 'pending',
    failure_reason TEXT NULL,
    sent_count INT DEFAULT 0,
    failed_count INT DEFAULT 0,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status_scheduled (status, scheduled_at),
    INDEX idx_target_type_user_type (target_type, user_type)
);
```

## API Endpoints

### Base URL
All endpoints are prefixed with `/api/v1/admin/scheduled-notifications`

### Authentication
- **Required**: Bearer token
- **Role**: Admin only

---

## 1. List Scheduled Notifications

**GET** `/api/v1/admin/scheduled-notifications`

### Parameters
- `status` (optional): Filter by status (`pending`, `sent`, `failed`, `cancelled`)
- `target_type` (optional): Filter by target type (`all`, `specific_users`, `user_type`, `custom_query`)
- `user_type` (optional): Filter by user type (`rider`, `driver`, `admin`)
- `notification_type` (optional): Filter by notification type (`push`, `email`, `sms`, `all`)
- `date_from` (optional): Filter from date (YYYY-MM-DD)
- `date_to` (optional): Filter to date (YYYY-MM-DD)
- `search` (optional): Search in title and message
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 15)
- `lang` (optional): Language preference (`en` or `fr`)

### Response
```json
{
  "success": true,
  "message": "Scheduled notifications retrieved successfully",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "System Maintenance",
        "message": "The system will be under maintenance from 2 AM to 4 AM.",
        "target_type": "all",
        "user_type": null,
        "target_users": null,
        "custom_query": null,
        "notification_type": "push",
        "scheduled_at": "2025-01-15T14:30:00.000000Z",
        "sent_at": null,
        "status": "pending",
        "failure_reason": null,
        "sent_count": 0,
        "failed_count": 0,
        "created_by": 1,
        "created_at": "2025-01-15T10:00:00.000000Z",
        "updated_at": "2025-01-15T10:00:00.000000Z",
        "creator": {
          "id": 1,
          "name": "Admin User",
          "email": "admin@example.com"
        }
      }
    ],
    "first_page_url": "http://localhost/api/v1/admin/scheduled-notifications?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://localhost/api/v1/admin/scheduled-notifications?page=1",
    "links": [...],
    "next_page_url": null,
    "path": "http://localhost/api/v1/admin/scheduled-notifications",
    "per_page": 15,
    "prev_page_url": null,
    "to": 1,
    "total": 1
  }
}
```

---

## 2. Schedule New Notification

**POST** `/api/v1/admin/scheduled-notifications`

### Request Body
```json
{
  "title": "System Maintenance",
  "title_fr": "Maintenance du système",
  "message": "The system will be under maintenance from 2 AM to 4 AM.",
  "message_fr": "Le système sera en maintenance de 2h à 4h.",
  "target_type": "all",
  "user_type": null,
  "target_users": null,
  "custom_query": null,
  "notification_type": "push",
  "scheduled_at": "2025-01-15 14:30:00",
  "notification_data": {
    "priority": "high",
    "category": "system"
  }
}
```

### Field Descriptions

#### Required Fields
- `title`: Notification title in English (max 255 characters)
- `message`: Notification message in English (max 1000 characters)
- `target_type`: Target audience type
- `notification_type`: Type of notification to send
- `scheduled_at`: When to send the notification (must be in the future)

#### Optional Fields
- `title_fr`: Notification title in French (max 255 characters)
- `message_fr`: Notification message in French (max 1000 characters)
- `user_type`: Required if `target_type` is `user_type` (`rider`, `driver`, `admin`)
- `target_users`: Array of user IDs (required if `target_type` is `specific_users`)
- `custom_query`: Array of query conditions (required if `target_type` is `custom_query`)
- `notification_data`: Additional data to include with the notification

#### Target Types

**1. All Users (`all`)**
```json
{
  "target_type": "all"
}
```

**2. Specific Users (`specific_users`)**
```json
{
  "target_type": "specific_users",
  "target_users": [1, 2, 3, 4, 5]
}
```

**3. User Type (`user_type`)**
```json
{
  "target_type": "user_type",
  "user_type": "rider"
}
```

**4. Custom Query (`custom_query`)**
```json
{
  "target_type": "custom_query",
  "custom_query": [
    {
      "field": "is_active",
      "operator": "=",
      "value": "true"
    },
    {
      "field": "created_at",
      "operator": ">=",
      "value": "2025-01-01"
    }
  ]
}
```

#### Notification Types
- `push`: Push notification only
- `email`: Email notification only
- `sms`: SMS notification only
- `all`: All notification types

#### Custom Query Operators
- `=`, `!=`, `<`, `>`, `<=`, `>=`: Comparison operators
- `like`: Pattern matching
- `in`, `not_in`: Array membership

### Response
```json
{
  "success": true,
  "message": "Notification scheduled successfully",
  "data": {
    "notification": {
      "id": 1,
      "title": "System Maintenance",
      "message": "The system will be under maintenance from 2 AM to 4 AM.",
      "target_type": "all",
      "notification_type": "push",
      "scheduled_at": "2025-01-15T14:30:00.000000Z",
      "status": "pending",
      "created_by": 1,
      "created_at": "2025-01-15T10:00:00.000000Z",
      "updated_at": "2025-01-15T10:00:00.000000Z"
    },
    "target_user_count": 1250
  }
}
```

---

## 3. Get Notification Details

**GET** `/api/v1/admin/scheduled-notifications/{id}`

### Response
```json
{
  "success": true,
  "message": "Notification retrieved successfully",
  "data": {
    "id": 1,
    "title": "System Maintenance",
    "message": "The system will be under maintenance from 2 AM to 4 AM.",
    "target_type": "all",
    "notification_type": "push",
    "scheduled_at": "2025-01-15T14:30:00.000000Z",
    "sent_at": "2025-01-15T14:30:05.000000Z",
    "status": "sent",
    "sent_count": 1200,
    "failed_count": 50,
    "created_by": 1,
    "created_at": "2025-01-15T10:00:00.000000Z",
    "updated_at": "2025-01-15T14:30:05.000000Z",
    "creator": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com"
    }
  }
}
```

---

## 4. Cancel Notification

**PUT** `/api/v1/admin/scheduled-notifications/{id}/cancel`

### Response
```json
{
  "success": true,
  "message": "Notification cancelled successfully",
  "data": []
}
```

---

## 5. Reschedule Notification

**PUT** `/api/v1/admin/scheduled-notifications/{id}/reschedule`

### Request Body
```json
{
  "scheduled_at": "2025-01-15 16:30:00"
}
```

### Response
```json
{
  "success": true,
  "message": "Notification rescheduled successfully",
  "data": []
}
```

---

## 6. Get Statistics

**GET** `/api/v1/admin/scheduled-notifications/stats`

### Response
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "total_notifications": 150,
    "pending_notifications": 25,
    "sent_notifications": 110,
    "failed_notifications": 10,
    "cancelled_notifications": 5,
    "scheduled_today": 8,
    "scheduled_this_week": 35,
    "scheduled_this_month": 120,
    "success_rate": 73.33,
    "failure_rate": 6.67
  }
}
```

---

## Bilingual Support

The system supports sending notifications in both English and French. Here's how it works:

### Language Detection
- The system automatically detects the user's language preference from their profile (`user.language` field)
- If no language preference is set, it defaults to English
- Users receive notifications in their preferred language

### Content Fallback
- If a French translation is not provided, the English version is used
- If an English version is not provided, the French version is used
- Both versions can be provided for complete bilingual support

### Email Notifications
- Primary language content is sent first
- Secondary language content is included below with a separator
- Example: French user receives French content first, then English content below

### Push Notifications
- Only the user's preferred language is sent
- Bilingual content is included in the notification data for client-side handling

### SMS Notifications
- Only the user's preferred language is sent (due to SMS length limitations)

---

## Usage Examples

### Schedule Bilingual Notification to All Users
```bash
curl -X POST "https://api.example.com/api/v1/admin/scheduled-notifications" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome Message",
    "title_fr": "Message de bienvenue",
    "message": "Welcome to our ride-sharing platform!",
    "message_fr": "Bienvenue sur notre plateforme de covoiturage !",
    "target_type": "all",
    "notification_type": "push",
    "scheduled_at": "2025-01-15 09:00:00"
  }'
```

### Schedule Bilingual Notification to Drivers Only
```bash
curl -X POST "https://api.example.com/api/v1/admin/scheduled-notifications" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Driver Update",
    "title_fr": "Mise à jour conducteur",
    "message": "New driver guidelines have been published.",
    "message_fr": "De nouvelles directives pour les conducteurs ont été publiées.",
    "target_type": "user_type",
    "user_type": "driver",
    "notification_type": "all",
    "scheduled_at": "2025-01-15 10:00:00"
  }'
```

### Schedule Bilingual Notification with Custom Query
```bash
curl -X POST "https://api.example.com/api/v1/admin/scheduled-notifications" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Premium Users",
    "title_fr": "Utilisateurs premium",
    "message": "Exclusive offer for premium users!",
    "message_fr": "Offre exclusive pour les utilisateurs premium !",
    "target_type": "custom_query",
    "custom_query": [
      {
        "field": "role",
        "operator": "=",
        "value": "rider"
      },
      {
        "field": "created_at",
        "operator": ">=",
        "value": "2025-01-01"
      }
    ],
    "notification_type": "push",
    "scheduled_at": "2025-01-15 11:00:00"
  }'
```

---

## Background Processing

### Queue Configuration
The system uses Laravel's queue system for processing scheduled notifications. Make sure your queue worker is running:

```bash
php artisan queue:work
```

### Cron Job Setup
Add this to your crontab to process due notifications every minute:

```bash
* * * * * cd /path/to/your/project && php artisan notifications:process-scheduled >> /dev/null 2>&1
```

### Manual Processing
You can manually process due notifications:

```bash
php artisan notifications:process-scheduled
```

---

## Error Handling

### Common Error Responses

#### 422 Validation Error
```json
{
  "success": false,
  "message": "Invalid validation data.",
  "code": 422,
  "errors": {
    "scheduled_at": ["The scheduled at must be a date after now."],
    "title": ["The title field is required."]
  }
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required.",
  "code": 403
}
```

#### 500 Server Error
```json
{
  "success": false,
  "message": "An error occurred while scheduling the notification.",
  "code": 500
}
```

---

## Security Considerations

- **Admin Authentication**: All endpoints require admin authentication
- **Input Validation**: Comprehensive validation on all inputs
- **Rate Limiting**: Consider implementing rate limiting for API endpoints
- **Audit Logging**: All actions are logged for audit purposes
- **Data Privacy**: Sensitive user data is handled securely

---

## Performance Considerations

- **Queue Processing**: Notifications are processed in background jobs
- **Database Indexing**: Proper indexes on status and scheduled_at columns
- **Batch Processing**: Large user lists are processed in batches
- **Caching**: Consider caching user counts for frequently accessed queries

---

## Integration Notes

- **Firebase**: Push notifications use existing Firebase service
- **Email**: Uses Laravel's built-in mail system
- **SMS**: Placeholder for SMS service integration
- **Queue System**: Requires Redis or database queue driver
- **Cron Jobs**: Requires cron job setup for automatic processing

---

## Future Enhancements

- **Recurring Notifications**: Support for recurring scheduled notifications
- **Template System**: Pre-defined notification templates
- **A/B Testing**: Support for notification A/B testing
- **Analytics**: Detailed delivery and engagement analytics
- **Webhook Integration**: Real-time status updates via webhooks
- **Bulk Operations**: Support for bulk notification operations
