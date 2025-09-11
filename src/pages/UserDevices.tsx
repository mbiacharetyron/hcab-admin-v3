import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { 
  Smartphone, 
  Users, 
  UserCheck, 
  UserX, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Monitor,
  Tablet,
  Laptop,
  Apple,
  Smartphone as Android,
  Globe,
  Battery,
  Wifi,
  WifiOff,
  AlertCircle,
  Info,
  User
} from "lucide-react";
import { useEnhancedUserDevices } from "@/hooks/useUserDevices";
import { UserDeviceDetails } from "@/components/UserDevices/UserDeviceDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, Device } from "@/hooks/useUserDevices";

// Device type icons mapping
const getDeviceTypeIcon = (deviceType: string) => {
  switch (deviceType) {
    case 'ios':
      return <Apple className="w-4 h-4 text-gray-600" />;
    case 'android':
      return <Android className="w-4 h-4 text-green-600" />;
    case 'web':
      return <Globe className="w-4 h-4 text-blue-600" />;
    default:
      return <Smartphone className="w-4 h-4 text-gray-600" />;
  }
};

// Device type badge colors
const getDeviceTypeBadge = (deviceType: string) => {
  switch (deviceType) {
    case 'ios':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    case 'android':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'web':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

// Role badge colors
const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'driver':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'rider':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

// Device status badge
const getDeviceStatusBadge = (isActive: boolean) => {
  return isActive 
    ? 'bg-green-100 text-green-800 hover:bg-green-200'
    : 'bg-red-100 text-red-800 hover:bg-red-200';
};

// User status badge
const getUserStatusBadge = (isActive: boolean, isOnline: boolean) => {
  if (!isActive) return 'bg-red-100 text-red-800 hover:bg-red-200';
  if (isOnline) return 'bg-green-100 text-green-800 hover:bg-green-200';
  return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
};

const userDevicesColumns: DataTableColumn[] = [
  { key: "id", title: "ID", width: "60px" },
  { key: "name", title: "USER", width: "200px" },
  { key: "email", title: "EMAIL", width: "220px" }, 
  { key: "phone", title: "PHONE", width: "140px" },
  { key: "role", title: "ROLE", width: "100px" },
  { key: "user_status", title: "STATUS", width: "120px" },
  { key: "devices", title: "DEVICES", width: "200px" },
  { key: "device_count", title: "COUNT", width: "100px" },
  { key: "last_active", title: "LAST ACTIVE", width: "140px" },
  { key: "actions", title: "ACTIONS", width: "120px" }
];

const UserDevices = () => {
  const navigate = useNavigate();
  
  // State for filters
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<'rider' | 'driver' | 'admin' | 'all'>('all');
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'web' | 'all'>('all');
  const [userStatus, setUserStatus] = useState<'active' | 'inactive' | 'all'>('all');
  const [deviceStatus, setDeviceStatus] = useState<'active' | 'inactive' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'created_at' | 'last_active_at' | 'device_count'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [limit] = useState(15);

  // API call with filters
  const { users, pagination, summary, isLoading, error, refetch } = useEnhancedUserDevices({
    search: search || undefined,
    role: role === 'all' ? undefined : role,
    device_type: deviceType === 'all' ? undefined : deviceType,
    is_active: userStatus === 'all' ? undefined : userStatus === 'active',
    device_active: deviceStatus === 'all' ? undefined : deviceStatus === 'active',
    sort_by: sortBy,
    sort_order: sortOrder,
    page,
    per_page: limit,
    lang: 'en'
  });

  // Transform users data for table display
  const transformedUsers = (users || []).map((user: User) => ({
    ...user,
    name: (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {(user.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">{user.name || 'Unknown User'}</div>
          <div className="text-xs text-muted-foreground">ID: {user.id}</div>
        </div>
      </div>
    ),
    email: (
      <div className="flex items-center space-x-2">
        <Mail className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{user.email || 'N/A'}</span>
      </div>
    ),
    phone: (
      <div className="flex items-center space-x-2">
        <Phone className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{user.phone || 'N/A'}</span>
      </div>
    ),
    role: (
      <Badge className={getRoleBadge(user.role || 'unknown')}>
        {(user.role || 'unknown').charAt(0).toUpperCase() + (user.role || 'unknown').slice(1)}
      </Badge>
    ),
    user_status: (
      <div className="flex items-center space-x-2">
        <Badge className={getUserStatusBadge(user.is_active, user.is_online)}>
          {!user.is_active ? 'Inactive' : user.is_online ? 'Online' : 'Offline'}
        </Badge>
      </div>
    ),
    devices: (
      <div className="space-y-1">
        {(user.devices || []).slice(0, 2).map((device: Device) => (
          <div key={device.id} className="flex items-center space-x-2 text-xs">
            {getDeviceTypeIcon(device.device_type)}
            <span className="truncate max-w-[120px]">{device.device_name || 'Unknown Device'}</span>
            <Badge className={`${getDeviceStatusBadge(device.is_active)} text-xs px-1 py-0`}>
              {device.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        ))}
        {(user.devices || []).length > 2 && (
          <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400">
            <Eye className="w-3 h-3" />
            <span>+{(user.devices || []).length - 2} more devices</span>
          </div>
        )}
        {(user.devices || []).length === 0 && (
          <div className="text-xs text-muted-foreground">No devices</div>
        )}
      </div>
    ),
    device_count: (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{user.device_count || 0}</div>
            <div className="text-xs text-muted-foreground">total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{user.active_device_count || 0}</div>
            <div className="text-xs text-muted-foreground">active</div>
          </div>
        </div>
        {(user.devices || []).length > 0 && (
          <div className="flex items-center space-x-1 text-xs">
            {['ios', 'android', 'web'].map((type) => {
              const count = (user.devices || []).filter(d => d.device_type === type).length;
              if (count === 0) return null;
              return (
                <div key={type} className="flex items-center space-x-1">
                  {getDeviceTypeIcon(type, "w-3 h-3")}
                  <span className="text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ),
    last_active: (
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">
          {(user.devices || []).length > 0 
            ? (() => {
                try {
                  const lastActiveTimes = user.devices
                    .filter(d => d.last_active_at)
                    .map(d => new Date(d.last_active_at).getTime());
                  if (lastActiveTimes.length > 0) {
                    return new Date(Math.max(...lastActiveTimes)).toLocaleDateString();
                  }
                  return 'Never';
                } catch (error) {
                  return 'Invalid Date';
                }
              })()
            : 'Never'
          }
        </span>
      </div>
    ),
    actions: (
      <div className="flex items-center space-x-2">
        <UserDeviceDetails user={user}>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 px-3"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </UserDeviceDetails>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/user/${user.id}`)}
          className="h-8 px-3"
        >
          <User className="w-4 h-4 mr-1" />
          User Profile
        </Button>
      </div>
    )
  }));

  const handleResetFilters = () => {
    setSearch('');
    setRole('all');
    setDeviceType('all');
    setUserStatus('all');
    setDeviceStatus('all');
    setSortBy('created_at');
    setSortOrder('desc');
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <AdminLayout>
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    User Devices
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Manage and monitor user devices across all platforms
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => refetch()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Data
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Device
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                <Download className="w-5 h-5 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-8">

        {/* Enhanced Error State */}
        {error && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load User Devices</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load user devices data"}
                  </p>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => refetch()}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Stats Cards */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Users"
              value={summary.total_users}
              icon={<Users className="w-5 h-5" />}
              variant="blue"
              isLoading={isLoading}
            />
            <StatsCard
              title="Users with Devices" 
              value={summary.users_with_devices}
              icon={<UserCheck className="w-5 h-5" />}
              variant="green"
              isLoading={isLoading}
            />
            <StatsCard
              title="Total Devices"
              value={summary.total_devices} 
              icon={<Smartphone className="w-5 h-5" />}
              variant="purple"
              isLoading={isLoading}
            />
            <StatsCard
              title="Active Devices"
              value={summary.active_devices}
              icon={<Activity className="w-5 h-5" />}
              variant="orange"
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Device Type Distribution */}
        {summary && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Device Type Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                  <div className="p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
                    <Apple className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {summary.device_types.ios}
                    </div>
                    <div className="text-sm text-muted-foreground">iOS Devices</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Android className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                      {summary.device_types.android}
                    </div>
                    <div className="text-sm text-muted-foreground">Android Devices</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                      {summary.device_types.web}
                    </div>
                    <div className="text-sm text-muted-foreground">Web Devices</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Filters */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">Filter and search through user devices data</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users or devices..." 
                    className="pl-10 border-2 focus:border-blue-500 transition-colors" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">User Role</label>
                <Select value={role} onValueChange={(value: 'rider' | 'driver' | 'admin' | 'all') => setRole(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="User Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="rider">Riders</SelectItem>
                    <SelectItem value="driver">Drivers</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Device Type</label>
                <Select value={deviceType} onValueChange={(value: 'ios' | 'android' | 'web' | 'all') => setDeviceType(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Device Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ios">iOS</SelectItem>
                    <SelectItem value="android">Android</SelectItem>
                    <SelectItem value="web">Web</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">User Status</label>
                <Select value={userStatus} onValueChange={(value: 'active' | 'inactive' | 'all') => setUserStatus(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="User Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Device Status</label>
                <Select value={deviceStatus} onValueChange={(value: 'active' | 'inactive' | 'all') => setDeviceStatus(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Device Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort By</label>
                <Select value={sortBy} onValueChange={(value: 'name' | 'email' | 'created_at' | 'last_active_at' | 'device_count') => setSortBy(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="created_at">Created Date</SelectItem>
                    <SelectItem value="last_active_at">Last Active</SelectItem>
                    <SelectItem value="device_count">Device Count</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort Order</label>
                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Sort Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Results</label>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                      <div className="text-sm text-muted-foreground">users</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleResetFilters}
                      className="text-xs h-8 px-3 bg-white hover:bg-gray-50 shadow-sm"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Users Table */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Users with Devices</h3>
                <p className="text-sm text-muted-foreground">Comprehensive user and device information ({pagination?.total || 0} total)</p>
              </div>
            </div>
            <DataTable
              title=""
              columns={userDevicesColumns}
              data={transformedUsers}
              isLoading={isLoading}
              searchable={false} // We handle search via filters
            />
          </CardContent>
        </Card>

        {/* Enhanced Pagination */}
        {pagination && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      Showing {users.length} of {pagination.total} users
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Page {pagination.current_page} of {pagination.last_page}
                    </div>
                  </div>
                </div>
                
                {pagination.last_page > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={pagination.current_page <= 1}
                      className="border-2 hover:bg-gray-50"
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={pagination.current_page <= 1}
                      className="border-2 hover:bg-gray-50"
                    >
                      <ArrowUp className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                        const pageNum = Math.max(1, pagination.current_page - 2) + i;
                        if (pageNum > pagination.last_page) return null;
                        return (
                          <Button
                            key={pageNum}
                            variant={pageNum === pagination.current_page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className={pageNum === pagination.current_page 
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg" 
                              : "border-2 hover:bg-gray-50"
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page >= pagination.last_page}
                      className="border-2 hover:bg-gray-50"
                    >
                      Next
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.last_page)}
                      disabled={pagination.current_page >= pagination.last_page}
                      className="border-2 hover:bg-gray-50"
                    >
                      Last
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserDevices;
