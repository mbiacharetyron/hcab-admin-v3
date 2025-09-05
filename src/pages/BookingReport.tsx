import { useState, useMemo, useEffect } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Car,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Activity,
  Zap,
  Shield,
  Star,
  Users,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Award,
  Coins,
  Smartphone,
  CreditCard as CreditCardIcon,
  Globe,
  MapPin,
  Route,
  Timer,
  DollarSign,
  ClipboardList,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  Edit,
  Trash2
} from "lucide-react";
import { useBookingReportData } from "@/hooks/useBookingReport";
import { BookingStatsCard } from "@/components/BookingReport/StatsCard";
import { PercentageCard } from "@/components/BookingReport/PercentageCard";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { BookingReportRide } from "@/lib/api";

export const BookingReport = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // API params
  const apiParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    // Add date filtering logic here if needed
  };
  
  const { weeklyStats, rides, pagination, isLoading, error, refetch } = useBookingReportData(apiParams);

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchTerm, statusFilter, dateFilter]);

  // Use server-side pagination data
  const totalPages = pagination?.total_pages || 1;
  const totalItems = pagination?.total_items || 0;
  const currentPageFromAPI = pagination?.current_page || 1;
  const itemsPerPageFromAPI = pagination?.limit || 10;

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "in_progress":
        return <Car className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load booking report data</p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Booking Report
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Weekly Ride Statistics & Comprehensive Booking Analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => refetch()} 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
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

        {/* Enhanced Weekly Statistics Cards */}
        {weeklyStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BookingStatsCard
              title="Total Booked"
              currentValue={weeklyStats.current_week.total_booked}
              previousValue={weeklyStats.previous_week.total_booked}
              percentageChange={weeklyStats.percentage_change.total_booked}
              icon={<FileText className="w-5 h-5" />}
              color="blue"
            />
            <BookingStatsCard
              title="Completed"
              currentValue={weeklyStats.current_week.completed}
              previousValue={weeklyStats.previous_week.completed}
              percentageChange={weeklyStats.percentage_change.completed}
              icon={<CheckCircle className="w-5 h-5" />}
              color="green"
            />
            <BookingStatsCard
              title="Scheduled"
              currentValue={weeklyStats.current_week.scheduled}
              previousValue={weeklyStats.previous_week.scheduled}
              percentageChange={weeklyStats.percentage_change.scheduled}
              icon={<Clock className="w-5 h-5" />}
              color="orange"
            />
            <BookingStatsCard
              title="Cancelled"
              currentValue={weeklyStats.current_week.cancelled}
              previousValue={weeklyStats.previous_week.cancelled}
              percentageChange={weeklyStats.percentage_change.cancelled}
              icon={<XCircle className="w-5 h-5" />}
              color="red"
            />
          </div>
        )}

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="rides" className="space-y-8">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
              <TabsTrigger 
                value="rides" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-600 font-semibold transition-all duration-200"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Ride Details
              </TabsTrigger>
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-600 font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-600 font-semibold transition-all duration-200"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Week Breakdown */}
              {weeklyStats && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                        <PieChart className="w-6 h-6 text-white" />
                      </div>
                      Current Week Breakdown
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Ride status distribution for this week</p>
                  </CardHeader>
                  <CardContent>
                    <PercentageCard
                      title="Current Week Breakdown"
                      data={weeklyStats.percentage_ride}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Summary Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    Weekly Summary
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Key performance indicators and insights</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {weeklyStats && (
                    <>
                      {/* Total Rides */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Total Rides This Week</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {weeklyStats.current_week.total_booked}
                        </span>
                      </div>

                      {/* Completion Rate */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Completion Rate</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {weeklyStats.percentage_ride.completed.toFixed(1)}%
                        </span>
                      </div>

                      {/* Cancellation Rate */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Cancellation Rate</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          {weeklyStats.percentage_ride.cancelled.toFixed(1)}%
                        </span>
                      </div>

                      {/* Week-over-Week Change */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            {weeklyStats.percentage_change.total_booked >= 0 ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Week-over-Week Change</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {weeklyStats.percentage_change.total_booked >= 0 ? (
                            <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                +{Math.abs(weeklyStats.percentage_change.total_booked).toFixed(1)}%
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                              <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                              <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                                -{Math.abs(weeklyStats.percentage_change.total_booked).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ride Details Tab */}
          <TabsContent value="rides" className="space-y-6">
            {/* Enhanced Filters */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  Advanced Filters
                </CardTitle>
                <p className="text-sm text-muted-foreground">Filter and search through ride data</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search rides..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-2 focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="border-2 focus:border-emerald-500 transition-colors">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date Range</label>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="border-2 focus:border-emerald-500 transition-colors">
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
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-emerald-600">{totalItems}</div>
                            <div className="text-sm text-muted-foreground">rides</div>
                          </div>
                          {(searchTerm || statusFilter !== "all" || dateFilter !== "all") && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("all");
                                setDateFilter("all");
                                setCurrentPage(1);
                              }}
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

            {/* Enhanced Rides Table */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  Ride Details
                </CardTitle>
                <p className="text-sm text-muted-foreground">Comprehensive ride booking information ({totalItems} total)</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Booking ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Rider</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Driver</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Ride Option</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Source</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Destination</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Fare</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Created</TableHead>
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
                            #{ride.booking_id}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-800 dark:text-gray-200">{ride.rider?.name || 'Unknown'}</div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                @{ride.rider?.username || 'N/A'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {ride.driver ? (
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{ride.driver.name}</div>
                                <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                  @{ride.driver.username}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full text-xs">No driver assigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-800 dark:text-gray-200">{ride.ride_option?.name || 'Unknown'}</div>
                              <div className="text-xs text-muted-foreground bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full inline-block">
                                XAF {ride.ride_option?.base_price || '0'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="truncate font-medium text-gray-700 dark:text-gray-300">{ride.source_name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="truncate font-medium text-gray-700 dark:text-gray-300">{ride.destination_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-bold text-lg text-emerald-600">XAF {ride.ride_fare}</div>
                              {ride.distance && (
                                <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                  {ride.distance} km
                                </div>
                              )}
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
                                {format(new Date(ride.created_at), "MMM dd, yyyy")}
                              </div>
                              <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                {format(new Date(ride.created_at), "HH:mm")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Enhanced Pagination */}
                {rides.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
                    {/* Results Summary */}
                    <div className="text-sm text-muted-foreground">
                      Showing {((currentPageFromAPI - 1) * itemsPerPageFromAPI) + 1} to {Math.min(currentPageFromAPI * itemsPerPageFromAPI, totalItems)} of {totalItems} rides
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center space-x-2">
                        {/* First Page */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPageFromAPI === 1}
                          className="hidden sm:flex"
                        >
                          First
                        </Button>

                        {/* Previous Page */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPageFromAPI === 1}
                        >
                          Previous
                        </Button>

                        {/* Page Numbers */}
                        <div className="flex items-center space-x-1">
                          {(() => {
                            const pages = [];
                            const maxVisiblePages = 5;
                            let startPage = Math.max(1, currentPageFromAPI - Math.floor(maxVisiblePages / 2));
                            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                            // Adjust start page if we're near the end
                            if (endPage - startPage + 1 < maxVisiblePages) {
                              startPage = Math.max(1, endPage - maxVisiblePages + 1);
                            }

                            // Add first page and ellipsis if needed
                            if (startPage > 1) {
                              pages.push(
                                                                    <Button
                                      key={1}
                                      variant={currentPageFromAPI === 1 ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setCurrentPage(1)}
                                      className="w-8 h-8 p-0"
                                    >
                                      1
                                    </Button>
                              );
                              if (startPage > 2) {
                                pages.push(
                                  <span key="ellipsis1" className="px-2 text-muted-foreground">
                                    ...
                                  </span>
                                );
                              }
                            }

                            // Add visible page numbers
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                                                    <Button
                                      key={i}
                                      variant={currentPageFromAPI === i ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setCurrentPage(i)}
                                      className="w-8 h-8 p-0"
                                    >
                                      {i}
                                    </Button>
                              );
                            }

                            // Add last page and ellipsis if needed
                            if (endPage < totalPages) {
                              if (endPage < totalPages - 1) {
                                pages.push(
                                  <span key="ellipsis2" className="px-2 text-muted-foreground">
                                    ...
                                  </span>
                                );
                              }
                              pages.push(
                                                                    <Button
                                      key={totalPages}
                                      variant={currentPageFromAPI === totalPages ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setCurrentPage(totalPages)}
                                      className="w-8 h-8 p-0"
                                    >
                                      {totalPages}
                                    </Button>
                              );
                            }

                            return pages;
                          })()}
                        </div>

                        {/* Next Page */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPageFromAPI === totalPages}
                        >
                          Next
                        </Button>

                        {/* Last Page */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPageFromAPI === totalPages}
                          className="hidden sm:flex"
                        >
                          Last
                        </Button>
                      </div>
                    )}

                    {/* Items Per Page Selector */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Show:</span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(parseInt(value));
                          setCurrentPage(1); // Reset to first page when changing page size
                        }}
                      >
                        <SelectTrigger className="w-16 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                                    {/* No Results Message */}
                    {rides.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-muted-foreground mb-2">No rides found</div>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search criteria or filters
                        </p>
                      </div>
                    )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Metrics */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    Performance Metrics
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Key performance indicators and insights</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {weeklyStats && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Booking Growth</span>
                        <div className="flex items-center space-x-1">
                          {weeklyStats.percentage_change.total_booked >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${
                            weeklyStats.percentage_change.total_booked >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {Math.abs(weeklyStats.percentage_change.total_booked).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Completion Growth</span>
                        <div className="flex items-center space-x-1">
                          {weeklyStats.percentage_change.completed >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${
                            weeklyStats.percentage_change.completed >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {Math.abs(weeklyStats.percentage_change.completed).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Rides</span>
                    <span className="text-lg font-bold">{rides.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completed Rides</span>
                    <span className="text-lg font-bold text-green-600">
                      {rides.filter(ride => ride.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cancelled Rides</span>
                    <span className="text-lg font-bold text-red-600">
                      {rides.filter(ride => ride.status === 'cancelled').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Revenue</span>
                    <span className="text-lg font-bold text-blue-600">
                      XAF {rides.reduce((sum, ride) => sum + parseFloat(ride.ride_fare || '0'), 0).toLocaleString()}
                    </span>
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
