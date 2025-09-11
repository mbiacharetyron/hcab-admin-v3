# Car Icon Setup Guide

## 🚗 **Driver Location Icons on Google Maps**

Your H-Cab admin dashboard now displays driver positions using car icons on the Google Maps component.

## 📁 **Assets Folder Structure Created**

```
src/assets/
├── images/          # Images used in components
├── icons/           # Icon files (PNG, SVG, ICO)
│   └── cars/        # Vehicle-related icons
│       ├── locator_car.png    # Your car icon (to be added)
│       └── car-icon.svg       # Fallback SVG car icon
└── README.md        # Assets documentation

public/
├── images/          # Public images (direct URL access)
└── icons/           # Public icons (direct URL access)
```

## 🎯 **How to Add Your Car Icon**

### **Option 1: Replace the Default Icon (Recommended)**

1. **Place your `locator_car.png` file in:**
   ```
   src/assets/icons/cars/locator_car.png
   ```

2. **Update the GoogleMap component:**
   ```typescript
   // In src/components/Dashboard/GoogleMap.tsx
   import carIcon from '@/assets/icons/cars/locator_car.png';
   
   // Replace the current carIcon constant with:
   const carIcon = carIcon; // Your imported icon
   ```

### **Option 2: Use Public Folder**

1. **Place your `locator_car.png` file in:**
   ```
   public/icons/locator_car.png
   ```

2. **Update the GoogleMap component:**
   ```typescript
   // In src/components/Dashboard/GoogleMap.tsx
   const carIcon = '/icons/locator_car.png';
   ```

## 🎨 **Icon Specifications**

### **Recommended Properties:**
- **Size**: 32x32 pixels or 64x64 pixels
- **Format**: PNG with transparency support
- **Style**: Car icon that clearly represents a vehicle
- **Color**: Should be visible on map backgrounds

### **Current Fallback:**
- A green car icon is currently used as a fallback
- Shows a simple car silhouette with wheels and windows
- Automatically resized to 32x32 pixels on the map

## 📊 **API Integration**

### **Driver Data Structure:**
```typescript
// API Response: /api/v1/admin/drivers/online-coordinates
{
  "data": [
    {
      "id": 15,
      "username": "colonel_pirate",
      "latitude": "4.0957482",
      "longitude": "9.6563434"
    },
    // ... more drivers
  ]
}
```

### **Map Display Logic:**
- ✅ **Valid Coordinates**: Only drivers with valid lat/lng are shown
- ✅ **Car Icons**: Each driver displays with your car icon
- ✅ **Bounce Animation**: Online drivers have bounce animation
- ✅ **Info Windows**: Click car icons to see driver details
- ✅ **Auto-refresh**: Updates every 30 seconds

## 🔧 **Customization Options**

### **Icon Size:**
```typescript
// In GoogleMap.tsx, modify the scaledSize:
icon: {
  url: carIcon,
  scaledSize: new google.maps.Size(40, 40), // Change size here
  anchor: new google.maps.Point(20, 20),    // Adjust anchor point
}
```

### **Icon Animation:**
```typescript
// Remove bounce animation:
animation: undefined,

// Or add different animation:
animation: google.maps.Animation.DROP,
```

### **Icon Colors:**
- The current fallback uses green (`#10B981`)
- You can modify the SVG in `car-icon.svg` to change colors
- Or use your own colored PNG icon

## 🚀 **Testing Your Setup**

1. **Add your car icon** to the specified folder
2. **Update the import** in `GoogleMap.tsx`
3. **Restart the development server**
4. **Check the dashboard map** - you should see your car icons

## 📱 **Features Working**

- ✅ **Real-time Driver Tracking**: Shows all online drivers
- ✅ **Custom Car Icons**: Uses your specified icon
- ✅ **Driver Information**: Click icons for driver details
- ✅ **Coordinate Filtering**: Only shows drivers with valid coordinates
- ✅ **Auto-refresh**: Updates every 30 seconds
- ✅ **Responsive Design**: Works on all screen sizes

## 🛠️ **Troubleshooting**

### **Icon Not Showing:**
1. Check file path is correct
2. Verify file format (PNG recommended)
3. Check browser console for errors
4. Ensure file is not corrupted

### **Icon Too Small/Large:**
1. Adjust `scaledSize` in the marker configuration
2. Adjust `anchor` point for proper centering
3. Use a higher resolution source image

### **Icon Not Loading:**
1. Check import path syntax
2. Verify file exists in the correct location
3. Try using the public folder approach
4. Check file permissions

## 📝 **Next Steps**

1. **Add your `locator_car.png`** to the cars folder
2. **Update the import** in the GoogleMap component
3. **Test the map** to ensure icons display correctly
4. **Customize size/behavior** as needed

Your driver tracking system is now ready to display custom car icons for all online drivers! 🎉
