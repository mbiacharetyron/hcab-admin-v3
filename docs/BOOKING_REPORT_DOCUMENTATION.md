# Booking Report Documentation

## 🎯 **Overview**

The Booking Report page is an advanced analytics dashboard that provides comprehensive insights into ride booking patterns, weekly statistics, and detailed ride management capabilities.

## 📊 **Features**

### **1. Weekly Statistics Dashboard**
- **Total Booked Rides**: Current week vs previous week comparison
- **Completed Rides**: Successfully completed rides with growth metrics
- **Scheduled Rides**: Future scheduled rides tracking
- **Cancelled Rides**: Cancellation analysis and trends

### **2. Advanced Filtering System**
- **Search**: By ride ID, rider ID, source, or destination
- **Status Filter**: Completed, Cancelled, Scheduled, In Progress
- **Date Range**: Today, This Week, This Month, All Time
- **Real-time Results**: Instant filtering with result counts

### **3. Comprehensive Ride Management**
- **Detailed Ride Table**: ID, Rider, Source, Destination, Status, Created Date
- **Status Indicators**: Color-coded badges with icons
- **Pagination**: Efficient handling of large datasets
- **Action Menu**: View, Edit, Delete options for each ride

### **4. Analytics & Insights**
- **Performance Metrics**: Growth tracking with trend indicators
- **Completion Rates**: Success rate analysis
- **Cancellation Analysis**: Understanding cancellation patterns
- **Week-over-Week Comparison**: Detailed percentage changes

## 🔧 **Technical Implementation**

### **API Integration**
```typescript
// Weekly Ride Stats API
GET /api/v1/admin/weekly-ride-stats

// Response Structure
{
  "message": "Weekly ride statistics retrieved successfully.",
  "data": {
    "current_week": {
      "total_booked": 23,
      "completed": 5,
      "scheduled": 0,
      "cancelled": 14
    },
    "previous_week": {
      "total_booked": 43,
      "completed": 4,
      "scheduled": 0,
      "cancelled": 32
    },
    "percentage_change": {
      "total_booked": -46.51,
      "completed": 25,
      "scheduled": 0,
      "cancelled": -56.25
    },
    "percentage_ride": {
      "completed": 21.74,
      "scheduled": 0,
      "cancelled": 60.87
    }
  },
  "code": 200
}
```

### **Component Architecture**

#### **1. Main Page Component**
- `src/pages/BookingReport.tsx` - Main booking report page
- Handles state management, filtering, and data orchestration
- Implements tabbed interface for different views

#### **2. Reusable Components**
- `src/components/BookingReport/StatsCard.tsx` - Statistics display cards
- `src/components/BookingReport/PercentageCard.tsx` - Percentage breakdown visualization

#### **3. Data Hooks**
- `src/hooks/useBookingReport.ts` - React Query hooks for data fetching
- Combines weekly stats and rides data
- Handles loading states and error management

### **State Management**
```typescript
// Filter States
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState<string>("all");
const [dateFilter, setDateFilter] = useState<string>("all");
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);
```

## 🎨 **UI/UX Features**

### **1. Statistics Cards**
- **Color-coded Metrics**: Blue, Green, Orange, Red themes
- **Trend Indicators**: Up/down arrows with percentage changes
- **Comparison Data**: Current vs previous week values
- **Hover Effects**: Smooth transitions and visual feedback

### **2. Interactive Tables**
- **Sortable Columns**: Click to sort by different criteria
- **Status Badges**: Color-coded status indicators
- **Action Menus**: Dropdown menus for ride actions
- **Responsive Design**: Mobile-friendly table layout

### **3. Filtering Interface**
- **Real-time Search**: Instant filtering as you type
- **Multi-criteria Filters**: Combine search, status, and date filters
- **Result Counters**: Live updates of filtered results
- **Clear Filters**: Easy reset functionality

### **4. Pagination System**
- **Page Navigation**: Previous/Next buttons
- **Page Indicators**: Current page and total pages
- **Result Summary**: "Showing X to Y of Z rides"
- **Configurable Page Size**: Adjustable items per page

## 📱 **Responsive Design**

### **Mobile Optimization**
- **Collapsible Filters**: Stack filters vertically on mobile
- **Touch-friendly Buttons**: Larger tap targets
- **Horizontal Scrolling**: Table scrolls horizontally on small screens
- **Simplified Navigation**: Streamlined mobile interface

### **Tablet & Desktop**
- **Multi-column Layout**: Optimal use of screen space
- **Side-by-side Filters**: Horizontal filter layout
- **Hover States**: Rich interactive feedback
- **Keyboard Navigation**: Full keyboard accessibility

## 🔄 **Data Flow**

### **1. Initial Load**
```
User visits /booking-report
↓
useBookingReport hook triggers
↓
API calls: getWeeklyRideStats() + getAllRides()
↓
Data processed and displayed
```

### **2. Filtering Process**
```
User applies filters
↓
filteredRides useMemo recalculates
↓
Table re-renders with filtered data
↓
Pagination updates automatically
```

### **3. Real-time Updates**
```
Auto-refresh every 5 minutes
↓
React Query refetches data
↓
UI updates with new statistics
↓
Maintains current filter state
```

## 🎯 **Key Metrics Displayed**

### **Weekly Statistics**
- **Total Booked**: Overall booking volume
- **Completed**: Successful ride completions
- **Scheduled**: Future scheduled rides
- **Cancelled**: Cancelled ride count

### **Performance Indicators**
- **Growth Rates**: Week-over-week percentage changes
- **Completion Rate**: Percentage of successful rides
- **Cancellation Rate**: Percentage of cancelled rides
- **Trend Analysis**: Visual trend indicators

### **Operational Insights**
- **Booking Patterns**: Peak booking times and days
- **Success Metrics**: Completion vs cancellation ratios
- **Driver Performance**: Ride completion rates
- **Customer Satisfaction**: Cancellation analysis

## 🚀 **Future Enhancements**

### **Planned Features**
- **Export Functionality**: CSV/PDF export of reports
- **Advanced Charts**: Interactive charts and graphs
- **Date Range Picker**: Custom date range selection
- **Real-time Notifications**: Live updates for new bookings
- **Driver Analytics**: Individual driver performance metrics
- **Revenue Tracking**: Financial metrics integration

### **Technical Improvements**
- **Caching Strategy**: Enhanced data caching
- **Performance Optimization**: Virtual scrolling for large datasets
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support

## 📋 **Usage Guide**

### **Accessing the Report**
1. Navigate to the sidebar menu
2. Click on "Booking Report"
3. View the comprehensive dashboard

### **Using Filters**
1. **Search**: Type in the search box to find specific rides
2. **Status**: Select from dropdown to filter by ride status
3. **Date**: Choose time range for historical data
4. **Results**: View filtered results with live counters

### **Analyzing Data**
1. **Overview Tab**: Check weekly statistics and trends
2. **Ride Details Tab**: Browse individual ride information
3. **Analytics Tab**: View performance metrics and insights

### **Managing Rides**
1. **View Details**: Click the action menu (⋮) on any ride
2. **Edit**: Modify ride information if needed
3. **Delete**: Remove rides from the system
4. **Export**: Download data for external analysis

## 🔧 **Configuration**

### **Environment Variables**
```env
VITE_API_BASE_URL=https://api.hcab.tech/api/v1
VITE_DEMO_MODE=false
```

### **API Configuration**
```typescript
// Request intervals
REFETCH_INTERVALS: {
  DASHBOARD_STATS: 5 * 60 * 1000, // 5 minutes
  RIDES: 30 * 1000, // 30 seconds
}
```

## 🎉 **Success Metrics**

The Booking Report page provides:
- ✅ **Real-time Data**: Live updates every 5 minutes
- ✅ **Advanced Filtering**: Multi-criteria search and filter
- ✅ **Comprehensive Analytics**: Weekly trends and insights
- ✅ **Professional Design**: Modern, responsive interface
- ✅ **Performance Optimized**: Efficient data handling
- ✅ **User-friendly**: Intuitive navigation and controls

Your booking report system is now fully operational and ready for production use! 🚀
