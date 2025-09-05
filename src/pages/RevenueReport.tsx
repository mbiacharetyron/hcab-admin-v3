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
  DollarSign,
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
  Wallet,
  CreditCard,
  Receipt,
  Target,
  Award,
  Coins,
  Smartphone,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useRevenueReportData } from "@/hooks/useRevenueReport";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const RevenueReport = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);

  // API call with filters
  const { 
    revenueStats, 
    rides, 
    pagination, 
    isLoading, 
    error, 
    refetch 
  } = useRevenueReportData({
    page: currentPage,
    limit,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  const totalItems = pagination?.total_items || 0;

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'secondary' as const, className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      pending: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
      cancelled: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-rose-950/20 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Revenue Report
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Financial Performance & Revenue Analytics
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => refetch()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
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
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load Revenue Data</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load revenue data"}
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

        {/* Revenue Statistics Cards */}
        {revenueStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Revenue Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Total Revenue</CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-1">
                  {formatCurrency(revenueStats.total_revenue)}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                      All Time
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ride Revenue Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Ride Revenue</CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1">
                  {formatCurrency(revenueStats.revenue_breakdown.ride_revenue)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-600 dark:text-blue-400">From rides</span>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Revenue Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Wallet Revenue</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">
                  {formatCurrency(revenueStats.revenue_breakdown.wallet_revenue)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600 dark:text-green-400">From wallet</span>
                </div>
              </CardContent>
            </Card>

            {/* Yearly Growth Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">Yearly Growth</CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  {revenueStats.percentage_change.year >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-1">
                  {Math.abs(revenueStats.percentage_change.year).toFixed(1)}%
                </div>
                <div className="flex items-center space-x-2">
                  {revenueStats.percentage_change.year >= 0 ? (
                    <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                        +{Math.abs(revenueStats.percentage_change.year).toFixed(1)}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                      <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                      <span className="text-xs font-semibold text-red-700 dark:text-red-300">
                        -{Math.abs(revenueStats.percentage_change.year).toFixed(1)}%
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-orange-600 dark:text-orange-400">vs last year</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="rides" className="space-y-8">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
              <TabsTrigger 
                value="rides" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-600 font-semibold transition-all duration-200"
              >
                <Receipt className="w-4 h-4 mr-2" />
                Revenue Rides
              </TabsTrigger>
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-600 font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-600 font-semibold transition-all duration-200"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Revenue Rides Tab */}
          <TabsContent value="rides" className="space-y-8">
            {/* Enhanced Filters */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Advanced Filters</h3>
                    <p className="text-sm text-muted-foreground">Filter and search through revenue data</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search rides..." 
                        className="pl-10 border-2 focus:border-purple-500 transition-colors" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="border-2 focus:border-purple-500 transition-colors">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date Range</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="border-2 focus:border-purple-500 transition-colors">
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
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{totalItems}</div>
                          <div className="text-sm text-muted-foreground">rides</div>
                        </div>
                        {(searchTerm || statusFilter !== "all" || dateFilter !== "all") && (
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

            {/* Enhanced Revenue Rides Table */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  Revenue Rides
                </CardTitle>
                <p className="text-sm text-muted-foreground">Detailed revenue breakdown from completed rides ({totalItems} total)</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Ride ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Route</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Total Fare</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Platform Revenue</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Driver Revenue</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Completed</TableHead>
                        <TableHead className="w-[50px] font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rides.map((ride, index) => (
                        <TableRow 
                          key={ride.id}
                          className={cn(
                            "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                            index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                          )}
                        >
                          <TableCell className="font-semibold text-gray-800 dark:text-gray-200">
                            #{ride.ride_id}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="truncate font-medium text-gray-700 dark:text-gray-300 text-sm">
                                  {ride.ride.source_name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="truncate font-medium text-gray-700 dark:text-gray-300 text-sm">
                                  {ride.ride.destination_name}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-lg text-purple-600">
                              {formatCurrency(ride.total_fare)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-lg text-green-600">
                              {formatCurrency(ride.platform_revenue)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-lg text-blue-600">
                              {formatCurrency(ride.driver_revenue)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(ride.status)}
                              {getStatusBadge(ride.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200">
                                {format(new Date(ride.completed_at), "MMM dd, yyyy")}
                              </div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                {format(new Date(ride.completed_at), "HH:mm")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
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
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          Showing {rides.length} of {pagination.total_items} rides
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
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg" 
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
              {/* Current Period Breakdown */}
              {revenueStats && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      Current Period Breakdown
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Revenue distribution for current periods</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Weekly */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">This Week</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatCurrency(revenueStats.current_period.week.total)}
                        </span>
                      </div>
                    </div>

                    {/* Monthly */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">This Month</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(revenueStats.current_period.month.total)}
                        </span>
                      </div>
                    </div>

                    {/* Yearly */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Calendar className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">This Year</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">
                          {formatCurrency(revenueStats.current_period.year.total)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Growth Metrics */}
              {revenueStats && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      Growth Metrics
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Period-over-period growth analysis</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Weekly Growth */}
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            {revenueStats.percentage_change.week >= 0 ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Weekly Growth</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {revenueStats.percentage_change.week >= 0 ? (
                            <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                +{Math.abs(revenueStats.percentage_change.week).toFixed(1)}%
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                              <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                              <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                                -{Math.abs(revenueStats.percentage_change.week).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Monthly Growth */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            {revenueStats.percentage_change.month >= 0 ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Monthly Growth</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {revenueStats.percentage_change.month >= 0 ? (
                            <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                +{Math.abs(revenueStats.percentage_change.month).toFixed(1)}%
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                              <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                              <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                                -{Math.abs(revenueStats.percentage_change.month).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Yearly Growth */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            {revenueStats.percentage_change.year >= 0 ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Yearly Growth</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {revenueStats.percentage_change.year >= 0 ? (
                            <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                +{Math.abs(revenueStats.percentage_change.year).toFixed(1)}%
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                              <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                              <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                                -{Math.abs(revenueStats.percentage_change.year).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
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
              {/* Revenue Breakdown */}
              {revenueStats && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                        <PieChart className="w-6 h-6 text-white" />
                      </div>
                      Revenue Breakdown
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Revenue distribution by source</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Car className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Ride Revenue</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatCurrency(revenueStats.revenue_breakdown.ride_revenue)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Wallet className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Wallet Revenue</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(revenueStats.revenue_breakdown.wallet_revenue)}
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
                  <p className="text-sm text-muted-foreground">Coming soon - Advanced revenue analytics</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl text-center">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl w-fit mx-auto mb-4">
                      <Target className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced revenue analytics with charts, trends, and predictive insights will be available soon.
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

export default RevenueReport;
