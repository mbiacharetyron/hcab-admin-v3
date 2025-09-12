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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Square,
  RotateCcw,
  Save
} from "lucide-react";
import { useNotificationManagement } from "@/hooks/useNotifications";
import { useScheduledNotificationManagement } from "@/hooks/useScheduledNotifications";
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

  // Scheduled notifications state
  const [scheduledSearchTerm, setScheduledSearchTerm] = useState('');
  const [scheduledStatusFilter, setScheduledStatusFilter] = useState<string>('all');
  const [scheduledTargetTypeFilter, setScheduledTargetTypeFilter] = useState<string>('all');
  const [scheduledNotificationTypeFilter, setScheduledNotificationTypeFilter] = useState<string>('all');
  const [scheduledCurrentPage, setScheduledCurrentPage] = useState(1);

  // Notification form state
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    body: '',
    target_type: 'all' as 'all' | 'drivers' | 'riders',
    device_tokens: [] as string[],
  });

  // Scheduled notification form state
  const [scheduledNotificationForm, setScheduledNotificationForm] = useState({
    title: '',
    title_fr: '',
    message: '',
    message_fr: '',
    target_type: 'all' as 'all' | 'specific_users' | 'user_type' | 'custom_query',
    user_type: 'rider' as 'rider' | 'driver' | 'admin',
    notification_type: 'push' as 'push' | 'email' | 'sms' | 'all',
    scheduled_at: '',
    target_users: [] as number[],
    custom_query: [] as Array<{
      field: string;
      operator: '=' | '!=' | '<' | '>' | '<=' | '>=' | 'like' | 'in' | 'not_in';
      value: string | number | boolean;
    }>,
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
    device_type: deviceTypeFilter !== 'all' ? deviceTypeFilter as 'ios' | 'android' | 'web' | 'unknown' : undefined,
    is_active: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
  });

  // Scheduled notifications API calls
  const {
    scheduledNotifications,
    pagination: scheduledPagination,
    stats: scheduledStats,
    isLoading: scheduledLoading,
    error: scheduledError,
    refetch: refetchScheduled,
    createScheduledNotification,
    cancelScheduledNotification,
    rescheduleNotification,
    isCreating,
    isCancelling,
    isRescheduling,
  } = useScheduledNotificationManagement({
    status: scheduledStatusFilter !== 'all' ? scheduledStatusFilter as 'pending' | 'sent' | 'failed' | 'cancelled' : undefined,
    target_type: scheduledTargetTypeFilter !== 'all' ? scheduledTargetTypeFilter as 'all' | 'specific_users' | 'user_type' | 'custom_query' : undefined,
    notification_type: scheduledNotificationTypeFilter !== 'all' ? scheduledNotificationTypeFilter as 'push' | 'email' | 'sms' | 'all' : undefined,
    search: scheduledSearchTerm || undefined,
    page: scheduledCurrentPage,
    per_page: 15,
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

  // Scheduled notifications helper functions
  const getScheduledStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      sent: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    
    const icons = {
      pending: <Clock className="w-3 h-3 mr-1" />,
      sent: <CheckCircle className="w-3 h-3 mr-1" />,
      failed: <XCircle className="w-3 h-3 mr-1" />,
      cancelled: <Square className="w-3 h-3 mr-1" />
    };
    
    return (
      <Badge variant="secondary" className={colors[status as keyof typeof colors] || colors.pending}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTargetTypeBadge = (targetType: string) => {
    const colors = {
      all: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      specific_users: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      user_type: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      custom_query: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    };
    
    return (
      <Badge variant="secondary" className={colors[targetType as keyof typeof colors] || colors.all}>
        {targetType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getNotificationTypeBadge = (type: string) => {
    const colors = {
      push: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      email: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      sms: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      all: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    };
    
    const icons = {
      push: <Bell className="w-3 h-3 mr-1" />,
      email: <Mail className="w-3 h-3 mr-1" />,
      sms: <Phone className="w-3 h-3 mr-1" />,
      all: <Zap className="w-3 h-3 mr-1" />
    };
    
    return (
      <Badge variant="secondary" className={colors[type as keyof typeof colors] || colors.push}>
        {icons[type as keyof typeof icons]}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleCreateScheduledNotification = () => {
    if (!scheduledNotificationForm.title || !scheduledNotificationForm.message || !scheduledNotificationForm.scheduled_at) {
      alert('Please fill in all required fields');
      return;
    }

    const data = {
      title: scheduledNotificationForm.title,
      message: scheduledNotificationForm.message,
      target_type: scheduledNotificationForm.target_type,
      notification_type: scheduledNotificationForm.notification_type,
      scheduled_at: scheduledNotificationForm.scheduled_at,
      ...(scheduledNotificationForm.title_fr && { title_fr: scheduledNotificationForm.title_fr }),
      ...(scheduledNotificationForm.message_fr && { message_fr: scheduledNotificationForm.message_fr }),
      ...(scheduledNotificationForm.target_type === 'user_type' && { user_type: scheduledNotificationForm.user_type }),
      ...(scheduledNotificationForm.target_type === 'specific_users' && { target_users: scheduledNotificationForm.target_users }),
      ...(scheduledNotificationForm.target_type === 'custom_query' && { custom_query: scheduledNotificationForm.custom_query }),
    };

    createScheduledNotification(data);
  };

  const handleCancelScheduledNotification = (id: number) => {
    if (confirm('Are you sure you want to cancel this scheduled notification?')) {
      cancelScheduledNotification(id);
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
            <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
              <TabsTrigger 
                value="send" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold transition-all duration-200"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="scheduled"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold transition-all duration-200"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Scheduled
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

          {/* Scheduled Notifications Tab */}
          <TabsContent value="scheduled" className="space-y-8">
            {/* Scheduled Notifications Statistics */}
            {scheduledStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Scheduled */}
                <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Scheduled</CardTitle>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1">
                      {scheduledStats.total_notifications}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400">All scheduled</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Notifications */}
                <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Pending</CardTitle>
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
                      {scheduledStats.pending_notifications}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">Awaiting delivery</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Sent Notifications */}
                <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Sent</CardTitle>
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">
                      {scheduledStats.sent_notifications}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 dark:text-green-400">Successfully delivered</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Success Rate */}
                <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Success Rate</CardTitle>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-1">
                      {scheduledStats.success_rate.toFixed(1)}%
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-purple-600 dark:text-purple-400">Delivery success</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Scheduled Notification Form */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    Schedule Notification
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Schedule notifications to be sent at specific times</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <div className="text-blue-600 dark:text-blue-400 mt-0.5">🌐</div>
                      <div className="text-sm">
                        <p className="font-medium text-blue-800 dark:text-blue-200">Bilingual Support</p>
                        <p className="text-blue-600 dark:text-blue-400">Users will receive notifications in their preferred language. French translations are optional but recommended for better user experience.</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-title" className="text-sm font-semibold">Title (English) *</Label>
                    <Input
                      id="scheduled-title"
                      placeholder="Notification title in English"
                      value={scheduledNotificationForm.title}
                      onChange={(e) => setScheduledNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduled-title-fr" className="text-sm font-semibold">Title (French)</Label>
                    <Input
                      id="scheduled-title-fr"
                      placeholder="Titre de la notification en français"
                      value={scheduledNotificationForm.title_fr}
                      onChange={(e) => setScheduledNotificationForm(prev => ({ ...prev, title_fr: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduled-message" className="text-sm font-semibold">Message (English) *</Label>
                    <Textarea
                      id="scheduled-message"
                      placeholder="Notification message in English"
                      value={scheduledNotificationForm.message}
                      onChange={(e) => setScheduledNotificationForm(prev => ({ ...prev, message: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduled-message-fr" className="text-sm font-semibold">Message (French)</Label>
                    <Textarea
                      id="scheduled-message-fr"
                      placeholder="Message de notification en français"
                      value={scheduledNotificationForm.message_fr}
                      onChange={(e) => setScheduledNotificationForm(prev => ({ ...prev, message_fr: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduled-datetime" className="text-sm font-semibold">Schedule Date & Time *</Label>
                    <Input
                      id="scheduled-datetime"
                      type="datetime-local"
                      value={scheduledNotificationForm.scheduled_at}
                      onChange={(e) => setScheduledNotificationForm(prev => ({ ...prev, scheduled_at: e.target.value }))}
                      className="border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduled-target" className="text-sm font-semibold">Target Audience</Label>
                    <Select 
                      value={scheduledNotificationForm.target_type} 
                      onValueChange={(value: 'all' | 'specific_users' | 'user_type' | 'custom_query') => 
                        setScheduledNotificationForm(prev => ({ ...prev, target_type: value }))
                      }
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="user_type">User Type</SelectItem>
                        <SelectItem value="specific_users">Specific Users</SelectItem>
                        <SelectItem value="custom_query">Custom Query</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {scheduledNotificationForm.target_type === 'user_type' && (
                    <div className="space-y-2">
                      <Label htmlFor="scheduled-user-type" className="text-sm font-semibold">User Type</Label>
                      <Select 
                        value={scheduledNotificationForm.user_type} 
                        onValueChange={(value: 'rider' | 'driver' | 'admin') => 
                          setScheduledNotificationForm(prev => ({ ...prev, user_type: value }))
                        }
                      >
                        <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rider">Riders</SelectItem>
                          <SelectItem value="driver">Drivers</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="scheduled-notification-type" className="text-sm font-semibold">Notification Type</Label>
                    <Select 
                      value={scheduledNotificationForm.notification_type} 
                      onValueChange={(value: 'push' | 'email' | 'sms' | 'all') => 
                        setScheduledNotificationForm(prev => ({ ...prev, notification_type: value }))
                      }
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="all">All Types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleCreateScheduledNotification}
                    disabled={isCreating || !scheduledNotificationForm.title || !scheduledNotificationForm.message || !scheduledNotificationForm.scheduled_at}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isCreating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Notification
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Scheduled Notifications List */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    Scheduled Notifications
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Manage your scheduled notifications</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[1200px] overflow-y-auto px-6 pb-6">
                    <div className="space-y-4">
                      {scheduledNotifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{notification.title}</h4>
                                {notification.title_fr && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">🇫🇷 {notification.title_fr}</p>
                                )}
                              </div>
                              {getScheduledStatusBadge(notification.status)}
                            </div>
                            <div className="mb-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{notification.message}</p>
                              {notification.message_fr && (
                                <p className="text-sm text-gray-500 dark:text-gray-500 italic mt-1 line-clamp-2">🇫🇷 {notification.message_fr}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>Scheduled: {format(new Date(notification.scheduled_at), "MMM dd, yyyy HH:mm")}</span>
                              {getTargetTypeBadge(notification.target_type)}
                              {getNotificationTypeBadge(notification.notification_type)}
                              {(notification.title_fr || notification.message_fr) && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                  🌐 Bilingual
                                </Badge>
                              )}
                            </div>
                            {notification.sent_at && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Sent: {format(new Date(notification.sent_at), "MMM dd, yyyy HH:mm")}
                              </div>
                            )}
                            {notification.failure_reason && (
                              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                Error: {notification.failure_reason}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {notification.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelScheduledNotification(notification.id)}
                                disabled={isCancelling}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      ))}
                      {scheduledNotifications.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No scheduled notifications found</p>
                        </div>
                      )}
                    </div>
                  </div>
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
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
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
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
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
