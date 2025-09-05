import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  MapPin,
  Route,
  Timer,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Car,
  Users,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Zap,
  Target,
  Award,
  Coins,
  Smartphone,
  Globe,
  User,
  UserCheck,
  UserX,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  MessageSquare,
  Navigation,
  Map
} from "lucide-react";
import { usePanicManagementData } from "@/hooks/usePanicManagement";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const PanicManagement = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);

  // API call with filters
  const { 
    panicReports, 
    statistics, 
    pagination, 
    isLoading, 
    error, 
    refetch,
    resolvePanic,
    isResolving
  } = usePanicManagementData({
    page: currentPage,
    limit,
    status: statusFilter !== 'all' ? statusFilter as 'resolved' | 'unresolved' : undefined,
    user_type: userTypeFilter !== 'all' ? userTypeFilter as 'driver' | 'rider' : undefined,
  });

  const totalItems = pagination?.total_items || 0;

  // Helper functions
  const getStatusBadge = (isResolved: boolean) => {
    if (isResolved) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Unresolved
        </Badge>
      );
    }
  };

  const getUserTypeBadge = (role: 'driver' | 'rider') => {
    if (role === 'driver') {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <Car className="w-3 h-3 mr-1" />
          Driver
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          <User className="w-3 h-3 mr-1" />
          Rider
        </Badge>
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setUserTypeFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
  };

  const handleResolvePanic = (panicId: number) => {
    if (window.confirm('Are you sure you want to mark this panic report as resolved?')) {
      resolvePanic(panicId);
    }
  };

  return (
    <AdminLayout>
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Panic Management
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Emergency Response & Safety Monitoring
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => refetch()}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
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
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load Panic Data</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load panic reports data"}
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

        {/* Panic Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Reports Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200/20 to-rose-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-300">Total Reports</CardTitle>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-red-800 dark:text-red-200 mb-1">
                  {statistics.total_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-red-600 dark:text-red-400">All time</span>
                </div>
              </CardContent>
            </Card>

            {/* Unresolved Reports Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">Unresolved</CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <XCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-1">
                  {statistics.unresolved_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                    <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-xs font-semibold text-red-700 dark:text-red-300">Urgent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolved Reports Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Resolved</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">
                  {statistics.resolved_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">Safe</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Recent Reports</CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1">
                  {statistics.recent_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-600 dark:text-blue-400">Last 24h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-8">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600 font-semibold transition-all duration-200"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Panic Reports
              </TabsTrigger>
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600 font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600 font-semibold transition-all duration-200"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Panic Reports Tab */}
          <TabsContent value="reports" className="space-y-8">
            {/* Enhanced Filters */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Advanced Filters</h3>
                    <p className="text-sm text-muted-foreground">Filter and search through panic reports</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search reports..." 
                        className="pl-10 border-2 focus:border-red-500 transition-colors" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="border-2 focus:border-red-500 transition-colors">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="unresolved">Unresolved</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">User Type</label>
                    <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                      <SelectTrigger className="border-2 focus:border-red-500 transition-colors">
                        <SelectValue placeholder="All Users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="driver">Drivers</SelectItem>
                        <SelectItem value="rider">Riders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date Range</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="border-2 focus:border-red-500 transition-colors">
                        <SelectValue placeholder="All Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Results</label>
                    <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-red-600">{totalItems}</div>
                          <div className="text-sm text-muted-foreground">reports</div>
                        </div>
                        {(searchTerm || statusFilter !== "all" || userTypeFilter !== "all" || dateFilter !== "all") && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleResetFilters}
                            className="text-xs h-8 px-3 bg-white hover:bg-gray-50 shadow-sm"
                          >
                            Clear All
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Panic Reports Table */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  Panic Reports
                </CardTitle>
                <p className="text-sm text-muted-foreground">Emergency reports requiring immediate attention ({totalItems} total)</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Report ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">User</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Location</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Booking</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Reported</TableHead>
                        <TableHead className="w-[50px] font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {panicReports.map((report, index) => (
                        <TableRow 
                          key={report.id}
                          className={cn(
                            "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                            index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                          )}
                        >
                          <TableCell className="font-semibold text-gray-800 dark:text-gray-200">
                            #{report.id}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-800 dark:text-gray-200">{report.user.name}</div>
                              <div className="flex items-center space-x-2">
                                {getUserTypeBadge(report.user.role)}
                                <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                  {report.user.phone}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {report.location}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {report.booking ? (
                              <div className="space-y-1">
                                <div className="font-medium text-gray-800 dark:text-gray-200">
                                  #{report.booking.id}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {report.booking.source_name} → {report.booking.destination_name}
                                </div>
                                <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                  {report.booking.status}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full text-xs">No booking</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(report.is_resolved)}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200">
                                {format(new Date(report.created_at), "MMM dd, yyyy")}
                              </div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                {format(new Date(report.created_at), "HH:mm")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {!report.is_resolved && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleResolvePanic(report.id)}
                                  disabled={isResolving}
                                  className="hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                  title="Mark as resolved"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Pagination */}
            {pagination && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          Showing {panicReports.length} of {pagination.total_items} reports
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Page {pagination.current_page} of {pagination.total_pages}
                        </div>
                      </div>
                    </div>
                    
                    {pagination.total_pages > 1 && (
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
                          {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                            const pageNum = Math.max(1, pagination.current_page - 2) + i;
                            if (pageNum > pagination.total_pages) return null;
                            return (
                              <Button
                                key={pageNum}
                                variant={pageNum === pagination.current_page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className={pageNum === pagination.current_page 
                                  ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg" 
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
                          disabled={pagination.current_page >= pagination.total_pages}
                          className="border-2 hover:bg-gray-50"
                        >
                          Next
                          <ArrowDown className="w-4 h-4 ml-1" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(pagination.total_pages)}
                          disabled={pagination.current_page >= pagination.total_pages}
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
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Type Breakdown */}
              {statistics && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      User Type Breakdown
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Panic reports by user type</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Car className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Driver Reports</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {statistics.driver_reports}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Rider Reports</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">
                          {statistics.rider_reports}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resolution Status */}
              {statistics && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      Resolution Status
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Current resolution status overview</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Resolved</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {statistics.resolved_reports}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Unresolved</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          {statistics.unresolved_reports}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Emergency Response Metrics */}
              {statistics && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      Emergency Response Metrics
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Key performance indicators</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Recent Reports</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {statistics.recent_reports}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Target className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Resolution Rate</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">
                          {statistics.total_reports > 0 ? Math.round((statistics.resolved_reports / statistics.total_reports) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Coming Soon Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                      <LineChart className="w-6 h-6 text-white" />
                    </div>
                    Advanced Analytics
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Coming soon - Advanced panic analytics</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl text-center">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl w-fit mx-auto mb-4">
                      <Award className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced panic analytics with geographic distribution, response time tracking, and predictive insights will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PanicManagement;
