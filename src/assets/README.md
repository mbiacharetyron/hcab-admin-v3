# Assets Folder Structure

This folder contains all static assets used in the H-Cab admin dashboard.

## 📁 Folder Structure

```
src/assets/
├── images/          # Images used in components
│   ├── logos/       # Company logos and branding
│   ├── backgrounds/ # Background images
│   ├── avatars/     # User profile images
│   └── misc/        # Other images
├── icons/           # Icon files (PNG, SVG, ICO)
│   ├── cars/        # Vehicle-related icons
│   ├── ui/          # UI element icons
│   └── status/      # Status indicator icons
└── README.md        # This file
```

## 🚗 Car Icons

Place your `locator_car.png` and other car-related icons in:
- `src/assets/icons/cars/` - For car icons used in the map
- `public/icons/` - For icons that need direct URL access

## 📱 Usage Examples

### In React Components (src/assets/)
```typescript
import carIcon from '@/assets/icons/cars/locator_car.png';

// Use in img tag
<img src={carIcon} alt="Car" />

// Use in Google Maps
const marker = new google.maps.Marker({
  position: { lat, lng },
  icon: carIcon,
  map: map
});
```

### Direct URL Access (public/)
```typescript
// Use direct URL for public assets
const iconUrl = '/icons/locator_car.png';
```

## 🎨 Best Practices

1. **Optimize Images**: Compress images for web use
2. **Use Appropriate Formats**: 
   - PNG for icons with transparency
   - JPG for photos
   - SVG for scalable icons
3. **Naming Convention**: Use descriptive, lowercase names with underscores
4. **Size Guidelines**:
   - Icons: 16x16, 24x24, 32x32, 48x48 pixels
   - Logos: 200x200 pixels or larger
   - Backgrounds: 1920x1080 or larger

## 🔧 Adding New Assets

1. Place files in the appropriate subfolder
2. Import in your component using the `@/assets/` alias
3. Update this README if adding new categories
