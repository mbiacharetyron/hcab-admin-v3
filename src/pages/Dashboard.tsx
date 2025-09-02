import { AdminLayout } from "@/components/Layout/AdminLayout";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  Users, 
  Clock, 
  AlertTriangle, 
  MapPin,
  Calendar
} from "lucide-react";

// Sample data
const statsData = [
  {
    title: "Active Trips",
    value: "0",
    icon: <Car className="w-6 h-6" />,
    change: "0.0% from last week",
    changeType: "neutral" as const,
    variant: "green" as const
  },
  {
    title: "Drivers Online", 
    value: "11",
    icon: <Users className="w-6 h-6" />,
    change: "+5.2% from last week",
    changeType: "positive" as const,
    variant: "orange" as const
  },
  {
    title: "Pending Trips",
    value: "0", 
    icon: <Clock className="w-6 h-6" />,
    change: "0.0% from last week",
    changeType: "neutral" as const,
    variant: "purple" as const
  },
  {
    title: "Alerts",
    value: "82",
    icon: <AlertTriangle className="w-6 h-6" />,
    change: "+12.3% from last week", 
    changeType: "negative" as const,
    variant: "red" as const
  }
];

const recentRides = [
  {
    id: "845",
    name: "Tyron Mbiachare Tabe",
    source: "3MJW+Q2 Douala, Cameroon",
    destination: "NFC Bank Douala, Douala, Cameroon",
    date: "2025-08-30",
    rideOption: "H-Cab Classic",
    status: "Failed"
  },
  {
    id: "844", 
    name: "Tyron Mbiachare Tabe",
    source: "572W+V34, N8, Buea, Cameroon",
    destination: "Faculty of Health Sciences, University of Buea",
    date: "2025-08-30",
    rideOption: "H-Cab Classic", 
    status: "Cancelled"
  },
  {
    id: "843",
    name: "Tyron Mbiachare Tabe", 
    source: "572W+V34, N8, Buea, Cameroon",
    destination: "Miss Bright Hotel, Miss bright, Buea, Cameroon",
    date: "2025-08-30",
    rideOption: "H-Cab Classic",
    status: "Cancelled"
  }
];

const rideColumns: DataTableColumn[] = [
  { key: "id", title: "ID", width: "60px" },
  { key: "name", title: "NAME", width: "180px" },
  { key: "source", title: "SOURCE", width: "250px" },
  { key: "destination", title: "DESTINATION", width: "250px" },
  { key: "date", title: "DATE", width: "120px" },
  { key: "rideOption", title: "RIDE OPTION", width: "140px" },
  { key: "status", title: "STATUS", width: "100px" }
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to H-Cab Admin Dashboard</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>10-10-2021</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Map and Recent Rides */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="xl:col-span-2 shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-primary rounded-lg flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-80" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm opacity-80">Real-time driver and ride tracking</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Rides Table */}
          <div className="xl:col-span-1">
            <DataTable 
              title="Recent Rides"
              columns={rideColumns.slice(0, 3)} // Show fewer columns for sidebar
              data={recentRides}
              className="h-fit"
            />
          </div>
        </div>

        {/* Full Rides Table */}
        <DataTable 
          title="All Rides"
          columns={rideColumns}
          data={recentRides}
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;