import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Users, UserCheck, UserX, Plus, Search, Filter, AlertTriangle, RefreshCw } from "lucide-react";
import { useEnhancedDrivers } from "@/hooks/useDrivers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const driversColumns: DataTableColumn[] = [
  { key: "id", title: "ID", width: "60px" },
  { key: "name", title: "NAME", width: "200px" },
  { key: "email", title: "EMAIL", width: "220px" }, 
  { key: "phone", title: "PHONE", width: "140px" },
  { key: "username", title: "USERNAME", width: "120px" },
  { key: "is_online", title: "ONLINE", width: "100px" },
  { key: "is_validated", title: "VALIDATED", width: "120px" },
  { key: "created_at", title: "DATE CREATED", width: "120px" },
  { key: "actions", title: "ACTIONS", width: "120px" }
];

const Drivers = () => {
  const navigate = useNavigate();
  
  // State for filters
  const [search, setSearch] = useState('');
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline' | 'all'>('all');
  const [validated, setValidated] = useState<'validated' | 'invalidated' | 'all'>('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // API call with filters
  const { drivers, statistics, pagination, isLoading, error, refetch } = useEnhancedDrivers({
    search: search || undefined,
    online_status: onlineStatus,
    validated: validated,
    page,
    limit,
    lang: 'en'
  });

  // Transform drivers data for table display
  const transformedDrivers = drivers.map(driver => ({
    ...driver,
    is_online: driver.is_online ? 'Online' : 'Offline',
    is_validated: driver.is_validated ? 'Validated' : 'Not Validated',
    created_at: new Date(driver.created_at).toLocaleDateString(),
    actions: (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate(`/user/${driver.id}`)}
      >
        View Details
      </Button>
    )
  }));

  const handleResetFilters = () => {
    setSearch('');
    setOnlineStatus('all');
    setValidated('all');
    setPage(1);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Drivers</h1>
            <p className="text-muted-foreground">Manage and monitor all registered drivers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">Failed to Load Drivers</h3>
                  <p className="text-sm text-muted-foreground">
                    {error.message || "Unable to load drivers data"}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => refetch()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        {statistics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Drivers"
              value={statistics.total_drivers}
            icon={<Users className="w-5 h-5" />}
            variant="blue"
              isLoading={isLoading}
          />
          <StatsCard
            title="Online Drivers" 
              value={statistics.online_drivers}
            icon={<UserCheck className="w-5 h-5" />}
            variant="green"
              isLoading={isLoading}
          />
          <StatsCard
            title="Offline Drivers"
              value={statistics.offline_drivers} 
            icon={<UserX className="w-5 h-5" />}
            variant="orange"
              isLoading={isLoading}
          />
          <StatsCard
            title="Validated Drivers"
              value={statistics.validated_drivers}
            icon={<Car className="w-5 h-5" />}
            variant="purple"
              isLoading={isLoading}
          />
        </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter By</span>
          </div>
          
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search drivers..." 
                className="pl-9" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Select value={onlineStatus} onValueChange={(value: 'online' | 'offline' | 'all') => setOnlineStatus(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Online Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select value={validated} onValueChange={(value: 'validated' | 'invalidated' | 'all') => setValidated(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Validated" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="invalidated">Not Validated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filter
            </Button>
          </div>
        </div>

        {/* Drivers Table */}
        <DataTable
          title={`Drivers ${pagination ? `(${pagination.total_items})` : ''}`}
          columns={driversColumns}
          data={transformedDrivers}
          isLoading={isLoading}
          searchable={false} // We handle search via filters
        />

        {/* Pagination Info */}
        {pagination && (
          <div className="text-sm text-muted-foreground text-center">
            Showing {drivers.length} of {pagination.total_items} drivers
            <span> • Page {pagination.current_page} of {pagination.total_pages}</span>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Drivers;