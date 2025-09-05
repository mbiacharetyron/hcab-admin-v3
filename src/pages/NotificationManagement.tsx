import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";
import { 
  Bell,
  Send,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Car,
  Users,
  Phone,
  Mail,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Award,
  Coins,
  Globe,
  User,
  UserCheck,
  UserX,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MessageSquare,
  Navigation,
  Map,
  Settings,
  Play,
  Pause,
  Square
} from "lucide-react";
import { useNotificationManagement } from "@/hooks/useNotifications";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const NotificationManagement = () => {
  // State for filters and forms
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);

  // Notification form state
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    body: '',
    target_type: 'all' as 'all' | 'drivers' | 'riders',
    device_tokens: [] as string[],
  });

  // API calls
  const { 
    devices, 
    deviceStats, 
    devicesPagination,
    logs,
    metrics,
    logsPagination,
    isLoading, 
    error, 
    refetchDevices,
    refetchLogs,
    sendNotification,
    sendTestNotification,
    isSending,
    isSendingTest
  } = useNotificationManagement({
    devicesPage: currentPage,
    devicesLimit: limit,
    device_type: deviceTypeFilter !== 'all' ? deviceTypeFilter as any : undefined,
    is_active: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
  });

  // Helper functions
  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'ios': return <Smartphone className="w-4 h-4" />;
      case 'android': return <Smartphone className="w-4 h-4" />;
      case 'web': return <Monitor className="w-4 h-4" />;
      default: return <Tablet className="w-4 h-4" />;
    }
  };

  const getDeviceTypeBadge = (type: string) => {
    const colors = {
      ios: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      android: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      web: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    
    return (
      <Badge variant="secondary" className={colors[type as keyof typeof colors] || colors.unknown}>
        {getDeviceTypeIcon(type)}
        <span className="ml-1 capitalize">{type}</span>
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </Badge>
      );
    }
  };

  const handleSendNotification = () => {
    if (!notificationForm.title || !notificationForm.body) {
      alert('Please fill in title and body');
      return;
    }

    sendNotification({
      title: notificationForm.title,
      body: notificationForm.body,
      target_type: notificationForm.target_type,
      data: {
        type: 'admin_notification',
        timestamp: Date.now()
      }
    });
  };

  const handleSendTest = () => {
    if (!notificationForm.title || !notificationForm.body) {
      alert('Please fill in title and body');
      return;
    }

    sendTestNotification({
      title: notificationForm.title,
      body: notificationForm.body,
      device_tokens: notificationForm.device_tokens,
      data: {
        type: 'test_notification',
        timestamp: Date.now()
      }
    });
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
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Notification Management
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Firebase Push Notifications & Device Management
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => { refetchDevices(); refetchLogs(); }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Data
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
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load Notification Data</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load notification data"}
                  </p>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => { refetchDevices(); refetchLogs(); }}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Device Statistics Cards */}
        {deviceStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Devices Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Devices</CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1">
                  {deviceStats.total_devices}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-600 dark:text-blue-400">All devices</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Devices Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Active Devices</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">
                  {deviceStats.active_devices}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* iOS Devices Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-slate-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">iOS Devices</CardTitle>
                <div className="p-2 bg-gray-100 dark:bg-gray-900/30 rounded-lg">
                  <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {deviceStats.ios_devices}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Apple devices</span>
                </div>
              </CardContent>
            </Card>

            {/* Android Devices Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Android Devices</CardTitle>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Smartphone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-1">
                  {deviceStats.android_devices}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Google devices</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="send" className="space-y-8">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
              <TabsTrigger 
                value="send" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold transition-all duration-200"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="devices"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold transition-all duration-200"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Devices
              </TabsTrigger>
              <TabsTrigger 
                value="logs"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold transition-all duration-200"
              >
                <Activity className="w-4 h-4 mr-2" />
                Notification Logs
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Send Notifications Tab */}
          <TabsContent value="send" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Send Notification Form */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    Send Notification
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Send push notifications to users</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
                    <Input
                      id="title"
                      placeholder="Notification title"
                      value={notificationForm.title}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body" className="text-sm font-semibold">Message</Label>
                    <Textarea
                      id="body"
                      placeholder="Notification message"
                      value={notificationForm.body}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, body: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target" className="text-sm font-semibold">Target Audience</Label>
                    <Select 
                      value={notificationForm.target_type} 
                      onValueChange={(value: 'all' | 'drivers' | 'riders') => 
                        setNotificationForm(prev => ({ ...prev, target_type: value }))
                      }
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="drivers">Drivers Only</SelectItem>
                        <SelectItem value="riders">Riders Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleSendNotification}
                      disabled={isSending || !notificationForm.title || !notificationForm.body}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Notification
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Test Notification */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    Test Notification
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Test notifications on specific devices</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="test-tokens" className="text-sm font-semibold">Device Tokens (Optional)</Label>
                    <Textarea
                      id="test-tokens"
                      placeholder="Enter device tokens separated by commas"
                      value={notificationForm.device_tokens.join(', ')}
                      onChange={(e) => setNotificationForm(prev => ({ 
                        ...prev, 
                        device_tokens: e.target.value.split(',').map(token => token.trim()).filter(Boolean)
                      }))}
                      className="border-2 focus:border-green-500 transition-colors min-h-[80px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to send to all active devices
                    </p>
                  </div>

                  <Button
                    onClick={handleSendTest}
                    disabled={isSendingTest || !notificationForm.title || !notificationForm.body}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isSendingTest ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Send Test
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-8">
            {/* Enhanced Filters */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Device Filters</h3>
                    <p className="text-sm text-muted-foreground">Filter and search through registered devices</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search devices..." 
                        className="pl-10 border-2 focus:border-blue-500 transition-colors" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Device Type</label>
                    <Select value={deviceTypeFilter} onValueChange={setDeviceTypeFilter}>
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="ios">iOS</SelectItem>
                        <SelectItem value="android">Android</SelectItem>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Results</label>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{devices.length}</div>
                          <div className="text-sm text-muted-foreground">devices</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Devices Table */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  Registered Devices
                </CardTitle>
                <p className="text-sm text-muted-foreground">All registered devices and their status ({devices.length} total)</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Device ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">User</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Type</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Last Used</TableHead>
                        <TableHead className="w-[50px] font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {devices.map((device, index) => (
                        <TableRow 
                          key={device.id}
                          className={cn(
                            "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                            index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                          )}
                        >
                          <TableCell className="font-semibold text-gray-800 dark:text-gray-200">
                            #{device.id}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-800 dark:text-gray-200">
                                {device.user?.name || 'Unknown User'}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {device.user?.email || 'No email'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getDeviceTypeBadge(device.device_type)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(device.is_active)}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200">
                                {format(new Date(device.last_used_at), "MMM dd, yyyy")}
                              </div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                {format(new Date(device.last_used_at), "HH:mm")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Logs Tab */}
          <TabsContent value="logs" className="space-y-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  Notification Logs
                </CardTitle>
                <p className="text-sm text-muted-foreground">History of all sent notifications ({logs.length} total)</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Log ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">User</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Title</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Type</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Sent At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log, index) => (
                        <TableRow 
                          key={log.id}
                          className={cn(
                            "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                            index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                          )}
                        >
                          <TableCell className="font-semibold text-gray-800 dark:text-gray-200">
                            #{log.id}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-800 dark:text-gray-200">
                                {log.user?.name || 'Unknown User'}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {log.user?.email || 'No email'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              {log.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {log.body}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {log.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {log.success ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Success
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                <XCircle className="w-3 h-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200">
                                {format(new Date(log.sent_at), "MMM dd, yyyy")}
                              </div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                {format(new Date(log.sent_at), "HH:mm")}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            {metrics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Delivery Statistics */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      Delivery Statistics
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Notification delivery performance</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Success Rate</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {metrics.success_rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Send className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Total Sent</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {metrics.total_sent}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Coming Soon Card */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                        <PieChart className="w-6 h-6 text-white" />
                      </div>
                      Advanced Analytics
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Coming soon - Advanced notification analytics</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl text-center">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit mx-auto mb-4">
                        <Award className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced analytics with delivery trends, user engagement metrics, and performance insights will be available soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default NotificationManagement;
