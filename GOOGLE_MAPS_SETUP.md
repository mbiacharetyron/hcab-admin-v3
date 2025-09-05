# Google Maps Integration Setup Guide

## 🗺️ **Google Maps Integration Complete!**

Your H-Cab admin dashboard now has full Google Maps integration with real-time driver tracking and ride visualization.

## 🚀 **Setup Instructions**

### 1. **Get Google Maps API Key**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Geocoding API** (optional, for address lookup)
   - **Places API** (optional, for place search)
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. **Configure Environment Variables**

Create a `.env` file in your project root and add:

```env
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Existing API Configuration
VITE_API_BASE_URL=https://api.hcab.tech/api/v1
VITE_DEMO_MODE=false
```

### 3. **Restart Development Server**

```bash
npm run dev
```

## 🎯 **Features Implemented**

### **Real-time Driver Tracking**
- ✅ **Live Driver Locations**: Shows all online drivers on the map
- ✅ **Driver Markers**: Green circles for online drivers with bounce animation
- ✅ **Driver Info**: Click markers to see driver details
- ✅ **Auto-refresh**: Updates every 30 seconds

### **Ride Visualization**
- ✅ **Ride Routes**: Shows pickup and destination points
- ✅ **Route Lines**: Blue lines connecting pickup to destination
- ✅ **Status Indicators**: Different colors for different ride statuses
- ✅ **Ride Info**: Click markers to see ride details

### **Interactive Map Controls**
- ✅ **Zoom Controls**: Standard Google Maps zoom controls
- ✅ **Fullscreen Mode**: Toggle fullscreen view
- ✅ **Refresh Button**: Manual refresh for driver locations
- ✅ **Legend**: Shows driver and ride counts

### **Professional UI**
- ✅ **Loading States**: Smooth loading animations
- ✅ **Error Handling**: Graceful fallbacks for API failures
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Custom Styling**: Matches your dashboard theme

## 📊 **Data Integration**

### **Driver Locations**
- **API Endpoint**: `/api/v1/admin/drivers/online-coordinates`
- **Update Frequency**: Every 30 seconds
- **Data Format**: Driver ID, username, latitude, longitude

### **Ride Locations**
- **API Endpoint**: `/api/v1/admin/rides` (recent rides)
- **Data Format**: Pickup/destination coordinates, ride status
- **Visualization**: Route lines and status markers

## 🎨 **Map Styling**

The map uses a custom style that:
- Hides unnecessary POI labels for cleaner look
- Maintains professional appearance
- Focuses on driver and ride data
- Matches your dashboard color scheme

## 🔧 **Customization Options**

### **Map Center & Zoom**
```typescript
// In GoogleMap.tsx
center = { lat: 4.0483, lng: 9.7043 }, // Douala, Cameroon
zoom = 12
```

### **Marker Colors**
```typescript
// Driver markers
fillColor: driver.isOnline ? '#10B981' : '#6B7280' // Green for online, gray for offline

// Ride markers
fillColor: '#3B82F6' // Blue for pickup
fillColor: '#EF4444' // Red for destination
```

### **Update Intervals**
```typescript
// In useDriverLocations.ts
refetchInterval: 30000, // 30 seconds
staleTime: 15000, // 15 seconds
```

## 🛠️ **Troubleshooting**

### **Map Not Loading**
1. Check if `VITE_GOOGLE_MAPS_API_KEY` is set correctly
2. Verify API key has Maps JavaScript API enabled
3. Check browser console for error messages
4. Ensure API key restrictions allow your domain

### **No Driver Markers**
1. Check if `/api/v1/admin/drivers/online-coordinates` returns data
2. Verify driver location data format
3. Check network tab for API call status

### **Performance Issues**
1. Reduce `refetchInterval` if too frequent
2. Limit number of markers displayed
3. Use marker clustering for large datasets

## 📱 **Mobile Support**

The Google Maps integration is fully responsive and works on:
- ✅ Desktop browsers
- ✅ Tablet devices
- ✅ Mobile phones
- ✅ Touch interactions

## 🔒 **Security Considerations**

1. **API Key Restrictions**: Restrict your API key to specific domains
2. **Rate Limiting**: Google Maps has usage limits
3. **Billing**: Monitor your Google Cloud billing for API usage
4. **HTTPS**: Ensure your app runs on HTTPS in production

## 🚀 **Next Steps**

You can extend the map functionality by:
- Adding marker clustering for better performance
- Implementing real-time WebSocket updates
- Adding custom map styles
- Integrating with ride booking flow
- Adding heat maps for driver density

## 📞 **Support**

If you encounter any issues:
1. Check the browser console for errors
2. Verify API key configuration
3. Test API endpoints directly
4. Check Google Cloud Console for API usage

Your Google Maps integration is now ready to provide real-time driver tracking and ride visualization for your H-Cab admin dashboard! 🎉
