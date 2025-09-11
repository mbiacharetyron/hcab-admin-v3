# Discount System API Documentation

This document describes the comprehensive discount system implemented for the H-Cab ride-sharing application. The system supports various types of discounts including percentage-based, fixed amount, and free ride discounts.

## Overview

The discount system provides:
- **Automatic discounts**: Applied automatically based on user criteria (first ride, shared rides, etc.)
- **Promo code discounts**: Applied when users enter specific promo codes
- **Flexible discount types**: Percentage, fixed amount, and free ride discounts
- **Usage tracking**: Comprehensive tracking of discount usage and statistics
- **Admin management**: Full CRUD operations for discount management

## Database Schema

### Discounts Table
```sql
CREATE TABLE discounts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NULL, -- Promo code (optional for automatic discounts)
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    type ENUM('percentage', 'fixed_amount', 'free_ride') DEFAULT 'percentage',
    value DECIMAL(10,2) NOT NULL, -- Percentage or fixed amount
    minimum_amount DECIMAL(10,2) NULL, -- Minimum ride fare to apply discount
    maximum_discount DECIMAL(10,2) NULL, -- Maximum discount amount for percentage discounts
    usage_limit INT NULL, -- Total usage limit
    usage_count INT DEFAULT 0, -- Current usage count
    per_user_limit INT DEFAULT 1, -- Usage limit per user
    applicable_ride_options JSON NULL, -- Specific ride options this discount applies to
    applicable_ride_classes JSON NULL, -- Specific ride classes this discount applies to
    is_active BOOLEAN DEFAULT TRUE,
    starts_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    user_restrictions JSON NULL, -- New users only, specific user groups, etc.
    is_first_ride_only BOOLEAN DEFAULT FALSE, -- Only for first ride
    is_shared_ride_only BOOLEAN DEFAULT FALSE, -- Only for shared rides
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);
```

### Discount Usages Table
```sql
CREATE TABLE discount_usages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    discount_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    booking_id BIGINT NULL,
    original_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    final_amount DECIMAL(10,2) NOT NULL,
    promo_code VARCHAR(50) NULL,
    discount_details JSON NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);
```

### Bookings Table Updates
```sql
ALTER TABLE bookings ADD COLUMN discount_id BIGINT NULL;
ALTER TABLE bookings ADD COLUMN promo_code VARCHAR(50) NULL;
ALTER TABLE bookings ADD COLUMN original_fare DECIMAL(10,2) NULL;
ALTER TABLE bookings ADD COLUMN discount_amount DECIMAL(10,2) NULL;
ALTER TABLE bookings ADD COLUMN final_fare DECIMAL(10,2) NULL;
ALTER TABLE bookings ADD COLUMN discount_details JSON NULL;
```

## Discount Types

### 1. Percentage Discount
- **Type**: `percentage`
- **Value**: Percentage amount (e.g., 20.00 for 20%)
- **Example**: 20% off ride fare

### 2. Fixed Amount Discount
- **Type**: `fixed_amount`
- **Value**: Fixed amount in currency
- **Example**: 500 XAF off ride fare

### 3. Free Ride Discount
- **Type**: `free_ride`
- **Value**: Maximum amount for free ride
- **Example**: Free ride up to 1000 XAF

## User API Endpoints

### 1. Get Available Discounts
**Endpoint**: `GET /api/v1/discounts/available`

**Description**: Get all available discounts for the authenticated user.

**Query Parameters**:
- `ride_amount` (optional): Ride amount to calculate potential savings
- `ride_option_id` (optional): Specific ride option ID
- `ride_class_id` (optional): Specific ride class ID
- `is_shared_ride` (optional): Boolean for shared ride filtering
- `lang` (optional): Language preference (en/fr)

**Response**:
```json
{
    "message": "Available discounts retrieved successfully.",
    "data": {
        "discounts": [
            {
                "id": 1,
                "name": "First Ride Discount",
                "description": "Get 20% off your first ride with us!",
                "type": "percentage",
                "value": 20.00,
                "code": null,
                "is_automatic": true,
                "minimum_amount": 500.00,
                "maximum_discount": 1000.00,
                "expires_at": "2025-12-31T23:59:59.000000Z",
                "is_first_ride_only": true,
                "is_shared_ride_only": false,
                "potential_savings": 200.00,
                "potential_final_amount": 800.00,
                "potential_discount_percentage": 20.00
            }
        ],
        "total_count": 1
    },
    "code": 200
}
```

### 2. Validate Promo Code
**Endpoint**: `POST /api/v1/discounts/validate`

**Description**: Validate a promo code for the authenticated user.

**Request Body**:
```json
{
    "promo_code": "WELCOME2024",
    "ride_amount": 1000.00,
    "ride_option_id": 1,
    "ride_class_id": 1,
    "is_shared_ride": false,
    "lang": "en"
}
```

**Response**:
```json
{
    "message": "Promo code validated successfully.",
    "data": {
        "valid": true,
        "message": "Promo code is valid",
        "discount_id": 2,
        "name": "Welcome Discount",
        "description": "Use code WELCOME2024 for 15% off your ride",
        "type": "percentage",
        "value": 15.00,
        "potential_savings": 150.00,
        "potential_final_amount": 850.00,
        "potential_discount_percentage": 15.00
    },
    "code": 200
}
```

### 3. Get Discount History
**Endpoint**: `GET /api/v1/discounts/history`

**Description**: Get user's discount usage history.

**Query Parameters**:
- `limit` (optional): Number of records to return (max 50, default 10)
- `lang` (optional): Language preference (en/fr)

**Response**:
```json
{
    "message": "Discount history retrieved successfully.",
    "data": {
        "discount_history": [
            {
                "id": 1,
                "discount_name": "Welcome Discount",
                "promo_code": "WELCOME2024",
                "original_amount": 1000.00,
                "discount_amount": 150.00,
                "final_amount": 850.00,
                "discount_percentage": 15.00,
                "booking_id": 123,
                "used_at": "2024-01-15T10:30:00.000000Z"
            }
        ],
        "total_count": 1
    },
    "code": 200
}
```

### 4. Preview Discount
**Endpoint**: `POST /api/v1/discounts/preview`

**Description**: Preview discount application without creating a booking.

**Request Body**:
```json
{
    "ride_amount": 1000.00,
    "promo_code": "WELCOME2024",
    "ride_option_id": 1,
    "ride_class_id": 1,
    "is_shared_ride": false,
    "lang": "en"
}
```

**Response**:
```json
{
    "message": "Discount preview generated successfully.",
    "data": {
        "success": true,
        "message": "Discount applied successfully",
        "original_fare": 1000.00,
        "final_fare": 850.00,
        "discount_amount": 150.00,
        "discount_percentage": 15.00,
        "discount_id": 2,
        "promo_code": "WELCOME2024",
        "discount_name": "Welcome Discount",
        "discount_type": "percentage",
        "discount_value": 15.00
    },
    "code": 200
}
```

## Admin API Endpoints

### 1. List Discounts
**Endpoint**: `GET /api/v1/admin/discounts`

**Description**: Get all discounts with pagination and filtering.

**Query Parameters**:
- `per_page` (optional): Items per page (default 15)
- `search` (optional): Search in name, code, or description
- `status` (optional): Filter by active status (true/false)
- `lang` (optional): Language preference (en/fr)

**Response**:
```json
{
    "message": "Discounts retrieved successfully.",
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "name": "First Ride Discount",
                "code": null,
                "type": "percentage",
                "value": 20.00,
                "usage_count": 45,
                "usage_limit": null,
                "is_active": true,
                "starts_at": "2024-01-01T00:00:00.000000Z",
                "expires_at": "2025-12-31T23:59:59.000000Z",
                "created_at": "2024-01-01T00:00:00.000000Z"
            }
        ],
        "total": 8,
        "per_page": 15
    },
    "code": 200
}
```

### 2. Create Discount
**Endpoint**: `POST /api/v1/admin/discounts`

**Description**: Create a new discount.

**Request Body**:
```json
{
    "name": "New Year Special",
    "description": "Get 25% off for the new year",
    "code": "NEWYEAR2025",
    "type": "percentage",
    "value": 25.00,
    "minimum_amount": 500.00,
    "maximum_discount": 1000.00,
    "usage_limit": 200,
    "per_user_limit": 1,
    "is_active": true,
    "starts_at": "2025-01-01T00:00:00.000000Z",
    "expires_at": "2025-01-31T23:59:59.000000Z",
    "is_first_ride_only": false,
    "is_shared_ride_only": false,
    "lang": "en"
}
```

**Response**:
```json
{
    "message": "Discount created successfully.",
    "data": {
        "id": 9,
        "name": "New Year Special",
        "code": "NEWYEAR2025",
        "type": "percentage",
        "value": 25.00,
        "created_at": "2024-12-15T10:30:00.000000Z"
    },
    "code": 201
}
```

### 3. Update Discount
**Endpoint**: `PUT /api/v1/admin/discounts/{id}`

**Description**: Update an existing discount.

**Request Body**: Same as create, but all fields are optional.

**Response**:
```json
{
    "message": "Discount updated successfully.",
    "data": {
        "id": 9,
        "name": "New Year Special Updated",
        "value": 30.00,
        "updated_at": "2024-12-15T11:00:00.000000Z"
    },
    "code": 200
}
```

### 4. Delete Discount
**Endpoint**: `DELETE /api/v1/admin/discounts/{id}`

**Description**: Delete a discount (soft delete).

**Response**:
```json
{
    "message": "Discount deleted successfully.",
    "data": [],
    "code": 200
}
```

### 5. Toggle Discount Status
**Endpoint**: `PUT /api/v1/admin/discounts/{id}/toggle-status`

**Description**: Toggle the active status of a discount.

**Response**:
```json
{
    "message": "Discount status updated successfully.",
    "data": {
        "id": 9,
        "is_active": false
    },
    "code": 200
}
```

### 6. Get Discount Statistics
**Endpoint**: `GET /api/v1/admin/discounts/stats/overview`

**Description**: Get comprehensive discount statistics.

**Response**:
```json
{
    "message": "Discount statistics retrieved successfully.",
    "data": {
        "total_discounts": 8,
        "active_discounts": 6,
        "total_usage": 1250,
        "total_savings": 45000.00,
        "top_discounts": [
            {
                "id": 1,
                "name": "First Ride Discount",
                "usages_count": 450
            }
        ],
        "recent_usage": [
            {
                "id": 1250,
                "discount": {
                    "name": "Welcome Discount"
                },
                "user": {
                    "name": "John Doe"
                },
                "original_amount": 1000.00,
                "discount_amount": 150.00,
                "created_at": "2024-12-15T10:30:00.000000Z"
            }
        ]
    },
    "code": 200
}
```

### 7. Get Usage History
**Endpoint**: `GET /api/v1/admin/discounts/usage/history`

**Description**: Get detailed discount usage history with filtering.

**Query Parameters**:
- `per_page` (optional): Items per page (default 15)
- `discount_id` (optional): Filter by specific discount
- `user_id` (optional): Filter by specific user
- `lang` (optional): Language preference (en/fr)

**Response**:
```json
{
    "message": "Usage history retrieved successfully.",
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1250,
                "discount": {
                    "name": "Welcome Discount",
                    "code": "WELCOME2024"
                },
                "user": {
                    "name": "John Doe",
                    "email": "john@example.com"
                },
                "booking": {
                    "id": 123,
                    "source_name": "Home",
                    "destination_name": "Office"
                },
                "original_amount": 1000.00,
                "discount_amount": 150.00,
                "final_amount": 850.00,
                "promo_code": "WELCOME2024",
                "created_at": "2024-12-15T10:30:00.000000Z"
            }
        ],
        "total": 1250,
        "per_page": 15
    },
    "code": 200
}
```

## Integration with Ride Booking

### Updated Ride Fare Calculation
The `GET /api/v1/ride-fare` endpoint now includes discount calculation:

**Request Parameters**:
- `promo_code` (optional): Promo code to apply
- `is_shared_ride` (optional): Boolean for shared ride filtering

**Response**:
```json
{
    "message": "Ride fares calculated successfully.",
    "data": [
        {
            "ride_option": {
                "id": 1,
                "name": "Standard",
                "price_per_km": 100.00
            },
            "distance_km": 10.5,
            "original_fare": 1200.00,
            "ride_fare": 1020.00,
            "driver_fare": 1140.00,
            "discount_applied": true,
            "discount_amount": 180.00,
            "discount_percentage": 15.00,
            "discount_name": "Welcome Discount",
            "promo_code": "WELCOME2024"
        }
    ],
    "code": 200
}
```

### Updated Booking Creation
The `POST /api/v1/rider/request-ride` endpoint now supports discount application:

**Request Body**:
```json
{
    "source_name": "Home",
    "source_lat": 12.9716,
    "source_lng": 77.5946,
    "destination_name": "Office",
    "destination_lat": 12.2958,
    "destination_lng": 76.6394,
    "ride_option_id": 1,
    "ride_fare": 1200.00,
    "promo_code": "WELCOME2024",
    "is_shared_ride": false
}
```

**Response**:
```json
{
    "message": "Ride booked successfully.",
    "data": {
        "booking_id": 123,
        "original_fare": 1200.00,
        "final_fare": 1020.00,
        "discount_amount": 180.00,
        "discount_name": "Welcome Discount",
        "promo_code": "WELCOME2024"
    },
    "code": 201
}
```

## Discount Validation Rules

### Automatic Discounts
- Applied automatically based on user criteria
- No promo code required
- System selects the best available discount

### Promo Code Discounts
- Must be entered by user
- Validated against user eligibility
- Can be combined with automatic discounts

### Validation Criteria
1. **Active Status**: Discount must be active
2. **Date Range**: Current time must be within start/end dates
3. **Usage Limits**: Total and per-user limits not exceeded
4. **Minimum Amount**: Ride fare must meet minimum requirement
5. **Ride Type Restrictions**: Shared ride, first ride, etc.
6. **User Restrictions**: New users only, etc.
7. **Ride Option/Class Restrictions**: Specific ride types only

## Error Handling

### Common Error Responses

**Invalid Promo Code**:
```json
{
    "message": "Invalid promo code",
    "code": 400
}
```

**Discount Expired**:
```json
{
    "message": "Discount is not valid or has expired",
    "code": 400
}
```

**Usage Limit Exceeded**:
```json
{
    "message": "You have already used this discount maximum times",
    "code": 400
}
```

**Minimum Amount Not Met**:
```json
{
    "message": "Minimum ride amount required: 500.00",
    "code": 400
}
```

## Sample Discounts

The system includes sample discounts for testing:

1. **First Ride Discount**: 20% off first ride (automatic)
2. **Welcome Discount**: 15% off with code "WELCOME2024"
3. **Shared Ride Savings**: 25% off shared rides (automatic)
4. **Fixed Savings**: 500 XAF off with code "SAVE500"
5. **New User Special**: 30% off for new users (automatic)
6. **Weekend Special**: 10% off with code "WEEKEND"
7. **Free Ride**: Free ride up to 1000 XAF with code "FREERIDE"
8. **Premium Discount**: 15% off premium rides with code "PREMIUM"

## Usage Examples

### 1. Get Available Discounts
```bash
curl -X GET "https://api.h-cab.com/api/v1/discounts/available?ride_amount=1000&lang=en" \
  -H "Authorization: Bearer {token}"
```

### 2. Validate Promo Code
```bash
curl -X POST "https://api.h-cab.com/api/v1/discounts/validate" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "promo_code": "WELCOME2024",
    "ride_amount": 1000.00
  }'
```

### 3. Calculate Ride Fare with Discount
```bash
curl -X GET "https://api.h-cab.com/api/v1/ride-fare?source_lat=12.9716&source_lng=77.5946&destination_lat=12.2958&destination_lng=76.6394&ride_class_id=1&promo_code=WELCOME2024" \
  -H "Authorization: Bearer {token}"
```

### 4. Book Ride with Discount
```bash
curl -X POST "https://api.h-cab.com/api/v1/rider/request-ride" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "source_name": "Home",
    "source_lat": 12.9716,
    "source_lng": 77.5946,
    "destination_name": "Office",
    "destination_lat": 12.2958,
    "destination_lng": 76.6394,
    "ride_option_id": 1,
    "ride_fare": 1200.00,
    "promo_code": "WELCOME2024"
  }'
```

## Database Seeding

To populate the database with sample discounts:

```bash
php artisan db:seed --class=DiscountSeeder
```

This will create 8 sample discounts with various configurations for testing purposes.

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on promo code validation
2. **Input Validation**: All inputs are validated and sanitized
3. **Authorization**: Admin endpoints require admin privileges
4. **Audit Trail**: All discount usage is logged for audit purposes
5. **Soft Deletes**: Discounts are soft deleted to preserve usage history

## Performance Considerations

1. **Indexing**: Database indexes on frequently queried fields
2. **Caching**: Consider caching active discounts for better performance
3. **Pagination**: All list endpoints support pagination
4. **Eager Loading**: Related data is loaded efficiently

## Future Enhancements

1. **Bulk Discount Operations**: Admin bulk create/update discounts
2. **Discount Analytics**: Advanced analytics and reporting
3. **A/B Testing**: Test different discount strategies
4. **Personalized Discounts**: AI-driven personalized discount recommendations
5. **Loyalty Program**: Integration with loyalty points system
6. **Referral Discounts**: Discounts for referring new users
7. **Seasonal Campaigns**: Automated seasonal discount campaigns
