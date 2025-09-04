# Admin API Quick Reference Guide

## Base URL
```
https://your-domain.com/api/v1/admin
```

## Authentication
```
Authorization: Bearer {access_token}
```

## Common Query Parameters
- `lang`: Language preference (`en` or `fr`)
- `page`: Page number for pagination
- `limit`: Items per page (default: 10)

---

## 🏠 Dashboard & Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | Get dashboard statistics |
| GET | `/daily-ride-stats` | Get daily ride statistics |
| GET | `/weekly-ride-stats` | Get weekly ride statistics |

---

## 👥 User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/drivers` | List drivers with statistics |
| GET | `/riders` | List riders |
| GET | `/user/{id}` | Get user details |
| GET | `/drivers/online-coordinates` | Get online drivers coordinates |
| DELETE | `/user/{id}/delete-account` | Delete user account |

### Driver List Parameters
- `search`: Search by name/email/phone/username
- `online_status`: `online` | `offline` | `all`
- `validated`: `validated` | `invalidated` | `all`

---

## 🚗 Ride Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rides` | List all rides |

### Ride List Parameters
- `ride_type`: Filter by ride type
- `status`: `pending` | `in_progress` | `completed` | `cancelled`
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)

---

## 🏷️ Ride Class Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ride-class` | List ride classes |
| POST | `/ride-class` | Create ride class |
| GET | `/ride-class/{id}` | Get ride class |
| PUT | `/ride-class/{id}` | Update ride class |
| DELETE | `/ride-class/{id}` | Delete ride class |

---

## 🚙 Ride Option Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ride-option` | List ride options |
| POST | `/ride-option` | Create ride option |
| GET | `/ride-option/{id}` | Get ride option |
| PUT | `/ride-option/{id}` | Update ride option |
| DELETE | `/ride-option/{id}` | Delete ride option |
| POST | `/ride-option/assign-driver` | Assign driver to option |
| POST | `/ride-option/unassign-driver` | Unassign driver |
| GET | `/ride-options/driver/{driver_id}` | Get driver's ride options |
| GET | `/driver/{driver_id}/rides` | Get driver's rides |

---

## 💰 Wallet & Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wallet-stats` | Get wallet statistics |
| GET | `/wallet-transactions` | List wallet transactions |
| GET | `/s3p/balance` | Get S3P account balance |

---

## 📊 Revenue Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/revenue/rides` | List ride revenues |
| GET | `/revenue/total` | Get total revenue |
| GET | `/revenue/rides/{rideId}` | Get ride revenue |
| GET | `/revenue/stats` | Get revenue statistics |

---

## 🎫 Discount Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/discounts` | List discounts |
| POST | `/discounts` | Create discount |
| GET | `/discounts/{id}` | Get discount |
| PUT | `/discounts/{id}` | Update discount |
| DELETE | `/discounts/{id}` | Delete discount |
| PUT | `/discounts/{id}/toggle-status` | Toggle discount status |
| GET | `/discounts/stats/overview` | Get discount statistics |
| GET | `/discounts/usage/history` | Get usage history |

---

## ❓ FAQ Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/faq` | List FAQs |
| POST | `/faq` | Create FAQ |
| GET | `/faq/{id}` | Get FAQ |
| PUT | `/faq/{id}` | Update FAQ |
| DELETE | `/faq/{id}` | Delete FAQ |
| PUT | `/faq/{id}/toggle-status` | Toggle FAQ status |

---

## 📱 Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/notifications/send` | Send notification |

### Notification Request Body
```json
{
  "title": "Notification Title",
  "body": "Notification message",
  "target_type": "all|riders|drivers",
  "data": {},
  "user_ids": [1,2,3],
  "lang": "en"
}
```

---

## 🚨 Panic Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/panic-reports/{id}/resolve` | Resolve panic report |

---

## 📝 Common Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
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

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [],
  "pagination": {
    "current_page": 1,
    "total_items": 100,
    "total_pages": 10,
    "limit": 10
  }
}
```

---

## 🔧 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden (Admin required) |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

## 🚀 Quick Examples

### Get Dashboard Stats
```bash
curl -H "Authorization: Bearer {token}" \
     "https://api.h-cab.com/api/v1/admin/dashboard/stats"
```

### List Drivers with Search
```bash
curl -H "Authorization: Bearer {token}" \
     "https://api.h-cab.com/api/v1/admin/drivers?search=Tony&online_status=offline"
```

### Send Notification
```bash
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json" \
     -d '{"title":"Update","body":"New feature available","target_type":"all"}' \
     "https://api.h-cab.com/api/v1/admin/notifications/send"
```

---

## 📋 Rate Limits

- **Standard**: 100 requests/minute
- **Heavy**: 20 requests/minute  
- **Bulk**: 10 requests/minute

---

*For detailed documentation, see ADMIN_API_DOCUMENTATION.md*
