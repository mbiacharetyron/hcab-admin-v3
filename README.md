# H-Cab Admin Dashboard v3

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS for the H-Cab ride-sharing platform.

## Features

### 🚀 Dashboard Overview
- **Real-time Stats Cards**: Active trips, online drivers, pending trips, and alerts/panics
- **Interactive Map Section**: Placeholder for real-time driver and ride tracking
- **Recent Rides Table**: Last 3 rides with essential information
- **All Rides Table**: Complete rides list with search and filtering capabilities

### 🔐 Authentication
- Bearer token-based authentication
- Secure token storage in localStorage
- Protected routes and API calls
- Login/logout functionality

### 📊 Data Management
- React Query integration for efficient data fetching
- Automatic data refresh intervals
- Loading states and error handling
- Search and filter functionality

### 🎨 UI/UX
- Modern, clean design using shadcn/ui components
- Responsive layout for all screen sizes
- Loading skeletons and error states
- Status indicators with appropriate colors
- Hover effects and smooth transitions

## API Integration

### Base URL
```
https://api.hcab.tech/api/v1/admin
```

### Endpoints
- `GET /dashboard/stats` - Dashboard statistics
- `GET /rides` - All rides data
- `GET /user/{rider_id}` - User details
- `GET /ride-option/{ride_option_id}` - Ride option details

### Authentication
All API requests include the Bearer token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd hcab-admin-v3
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Authentication Setup
1. Navigate to the root path `/`
2. Enter your admin bearer token
3. Click "Sign In" to access the dashboard
4. You'll be redirected to `/dashboard` upon successful authentication

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── LoginForm.tsx          # Authentication form
│   ├── Dashboard/
│   │   ├── DataTable.tsx          # Enhanced data table with search
│   │   ├── MapSection.tsx         # Interactive map placeholder
│   │   └── StatsCard.tsx          # Statistics cards with loading states
│   ├── Layout/
│   │   ├── AdminLayout.tsx        # Main layout wrapper
│   │   └── Sidebar.tsx            # Navigation sidebar with logout
│   └── ui/                        # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx            # Authentication state management
├── hooks/
│   └── useDashboard.ts            # React Query hooks for data fetching
├── lib/
│   └── api.ts                     # API service layer
└── pages/
    ├── Dashboard.tsx              # Main dashboard page
    └── Index.tsx                  # Landing page with authentication
```

## Key Components

### StatsCard
- Displays individual statistics with icons
- Loading states with skeleton placeholders
- Dynamic color variants based on data type
- Change indicators and trend information

### DataTable
- Searchable and filterable data tables
- Loading states with skeleton rows
- Status badges with appropriate colors
- Action menus for each row
- Responsive column handling

### MapSection
- Interactive map placeholder
- Real-time statistics display
- Animated background elements
- Map control buttons

## State Management

### React Query
- Efficient data fetching and caching
- Automatic background updates
- Error handling and retry logic
- Optimistic updates

### Authentication Context
- Centralized auth state management
- Token persistence and cleanup
- Protected route handling
- Logout functionality

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color schemes and gradients
- Responsive design utilities
- Dark mode support (configurable)

### shadcn/ui
- Pre-built, accessible components
- Consistent design system
- Customizable component variants
- TypeScript support

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks (if configured)

## Deployment

### Build
```bash
npm run build
```

### Production
The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
