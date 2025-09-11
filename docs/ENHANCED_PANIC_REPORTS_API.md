# Enhanced Panic Reports API Documentation

## Overview

The enhanced panic reports API now provides comprehensive statistics and insights along with the list of panic reports, giving administrators a complete overview of emergency situations and system performance.

## Endpoint

**GET** `/api/v1/admin/panic-reports`

### Authentication
- **Required**: Bearer token
- **Role**: Admin only

### Parameters
- `status` (optional): Filter by status (`resolved`, `unresolved`)
- `user_type` (optional): Filter by user type (`driver`, `rider`)
- `start_date` (optional): Start date filter (YYYY-MM-DD)
- `end_date` (optional): End date filter (YYYY-MM-DD)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `lang` (optional): Language preference (`en` or `fr`)

## Enhanced Response Structure

```json
{
  "success": true,
  "message": "Panic reports retrieved successfully",
  "data": [
    {
      "id": 1,
      "is_resolved": false,
      "latitude": 4.0483,
      "longitude": 9.7043,
      "description": "Emergency situation during ride",
      "location": "4.0483, 9.7043",
      "created_at": "2025-01-15T10:00:00.000000Z",
      "updated_at": "2025-01-15T10:00:00.000000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+237123456789",
        "username": "johndoe",
        "role": "driver",
        "is_active": true,
        "is_validated": true,
        "is_online": true
      },
      "booking": {
        "id": 1,
        "status": "in_progress",
        "source_name": "123 Main Street, Douala",
        "destination_name": "456 Airport Road, Douala",
        "ride_fare": 25.50,
        "booking_time": "2025-01-15T09:30:00.000000Z",
        "rider": {
          "id": 2,
          "name": "Jane Smith",
          "phone": "+237987654321"
        },
        "driver": {
          "id": 1,
          "name": "John Doe",
          "phone": "+237123456789"
        }
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_items": 150,
    "total_pages": 15,
    "limit": 10
  },
  "statistics": {
    // Comprehensive statistics object
  }
}
```

## Comprehensive Statistics

The `statistics` object now includes detailed analytics across multiple dimensions:

### 1. Basic Statistics
```json
{
  "total_reports": 150,
  "resolved_reports": 120,
  "unresolved_reports": 30,
  "driver_reports": 85,
  "rider_reports": 65,
  "recent_reports": 25
}
```

### 2. Time-Based Statistics
```json
{
  "reports_today": 5,
  "reports_yesterday": 8,
  "reports_this_week": 35,
  "reports_last_week": 28,
  "reports_this_month": 120,
  "reports_last_month": 95
}
```

### 3. Resolution Statistics
```json
{
  "resolved_today": 3,
  "resolved_this_week": 28,
  "resolved_this_month": 110,
  "average_resolution_time_hours": 18.5,
  "resolution_rate_percentage": 80.0
}
```

### 4. Trend Analysis
```json
{
  "weekly_trend": 7,
  "monthly_trend": 25,
  "resolution_trend": 5,
  "trend_direction": {
    "weekly": "increasing",
    "monthly": "increasing", 
    "resolution": "improving"
  }
}
```

**Trend Direction Values:**
- `increasing` / `decreasing` / `stable` for report trends
- `improving` / `declining` / `stable` for resolution trends

### 5. Geographic Distribution
```json
{
  "top_locations": [
    {
      "location": "Douala Central",
      "count": 45
    },
    {
      "location": "Yaounde Airport",
      "count": 32
    },
    {
      "location": "Bamenda Market",
      "count": 28
    }
  ]
}
```

### 6. Peak Hours Analysis
```json
{
  "peak_hours": [
    {
      "hour": 18,
      "count": 25,
      "time_period": "18:00 - 19:00"
    },
    {
      "hour": 19,
      "count": 22,
      "time_period": "19:00 - 20:00"
    },
    {
      "hour": 20,
      "count": 18,
      "time_period": "20:00 - 21:00"
    }
  ]
}
```

### 7. Context Analysis
```json
{
  "reports_with_booking": 120,
  "reports_without_booking": 30,
  "booking_context_percentage": 80.0
}
```

### 8. Summary Insights
```json
{
  "insights": {
    "most_active_period": "This week",
    "resolution_efficiency": "Good",
    "primary_source": "Drivers",
    "urgency_level": "Medium"
  }
}
```

**Insight Values:**
- **Most Active Period**: `"This week"` or `"Last week"`
- **Resolution Efficiency**: `"Good"` (< 24h), `"Average"` (24-72h), `"Needs improvement"` (> 72h)
- **Primary Source**: `"Drivers"` or `"Riders"`
- **Urgency Level**: `"High"` (> 10 unresolved), `"Medium"` (5-10), `"Low"` (< 5)

## Usage Examples

### Basic Request
```bash
curl -X GET "https://api.example.com/api/v1/admin/panic-reports" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### Filtered Requests
```bash
# Get unresolved reports only
curl -X GET "https://api.example.com/api/v1/admin/panic-reports?status=unresolved" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Get driver reports from last week
curl -X GET "https://api.example.com/api/v1/admin/panic-reports?user_type=driver&start_date=2025-01-08&end_date=2025-01-15" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Get page 2 with 20 items
curl -X GET "https://api.example.com/api/v1/admin/panic-reports?page=2&limit=20" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Key Benefits

### For Administrators:
1. **Real-time Monitoring**: Track panic reports as they happen
2. **Performance Analytics**: Monitor resolution times and efficiency
3. **Trend Analysis**: Identify patterns and seasonal variations
4. **Geographic Insights**: Understand problem areas and hotspots
5. **Resource Planning**: Optimize response teams based on peak hours
6. **Quality Metrics**: Track resolution rates and response times

### For System Optimization:
1. **Peak Hour Analysis**: Deploy additional resources during high-risk periods
2. **Geographic Distribution**: Focus security measures on high-incident areas
3. **User Type Analysis**: Tailor safety measures for drivers vs riders
4. **Context Analysis**: Understand panic situations with/without ride context
5. **Trend Monitoring**: Proactive identification of emerging issues

## Performance Considerations

- Statistics are calculated in real-time for accuracy
- Geographic and peak hour analysis may take 1-2 seconds for large datasets
- Consider caching for frequently accessed statistics
- Database indexes on `created_at`, `is_resolved`, and `user_id` recommended

## Security

- Admin authentication required
- All requests logged for audit purposes
- Sensitive location data protected
- Rate limiting applies to prevent abuse

## Integration Notes

- Use statistics for dashboard widgets and charts
- Implement real-time updates for critical metrics
- Consider webhook notifications for high-urgency situations
- Export functionality recommended for detailed analysis

## Future Enhancements

- Real-time WebSocket updates for live monitoring
- Machine learning for predictive analytics
- Integration with external emergency services
- Advanced filtering and search capabilities
- Automated alert thresholds and notifications
