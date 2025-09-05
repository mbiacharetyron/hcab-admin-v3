import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText
} from "lucide-react";
import { useBookingReportData } from "@/hooks/useBookingReport";
import { BookingStatsCard } from "@/components/BookingReport/StatsCard";
import { PercentageCard } from "@/components/BookingReport/PercentageCard";
import { format } from "date-fns";

export const BookingReport = () => {
  const { weeklyStats, rides, ridesMeta, isLoading, error, refetch } = useBookingReportData();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter rides based on search and filters
  const filteredRides = useMemo(() => {
    let filtered = rides;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ride => 
        ride.id.toString().includes(searchTerm) ||
        ride.rider_id.toString().includes(searchTerm) ||
        ride.source_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.destination_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(ride => ride.status === statusFilter);
    }

    // Date filter (simplified - you can enhance this)
    if (dateFilter !== "all") {
      const now = new Date();
      const rideDate = new Date(ride.created_at);
      
      switch (dateFilter) {
        case "today":
          filtered = filtered.filter(ride => 
            rideDate.toDateString() === now.toDateString()
          );
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(ride => rideDate >= weekAgo);
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(ride => rideDate >= monthAgo);
          break;
      }
    }

    return filtered;
  }, [rides, searchTerm, statusFilter, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRides = filteredRides.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Booking Report</h1>
            <p className="text-muted-foreground">
              Weekly ride statistics and comprehensive booking analysis
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Weekly Statistics Cards */}
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rides">Ride Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Week Breakdown */}
              {weeklyStats && (
                <PercentageCard
                  title="Current Week Breakdown"
                  data={weeklyStats.percentage_ride}
                />
              )}

              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Weekly Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyStats && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total Rides This Week</span>
                        <span className="text-lg font-bold text-blue-600">
                          {weeklyStats.current_week.total_booked}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Completion Rate</span>
                        <span className="text-lg font-bold text-green-600">
                          {weeklyStats.percentage_ride.completed.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cancellation Rate</span>
                        <span className="text-lg font-bold text-red-600">
                          {weeklyStats.percentage_ride.cancelled.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Week-over-Week Change</span>
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
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ride Details Tab */}
          <TabsContent value="rides" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search rides..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Results</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {filteredRides.length} rides
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rides Table */}
            <Card>
              <CardHeader>
                <CardTitle>Ride Details ({filteredRides.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Rider</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedRides.map((ride) => (
                        <TableRow key={ride.id}>
                          <TableCell className="font-medium">#{ride.id}</TableCell>
                          <TableCell>Rider {ride.rider_id}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {ride.source_name}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {ride.destination_name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(ride.status)}
                              {getStatusBadge(ride.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {format(new Date(ride.created_at), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRides.length)} of {filteredRides.length} rides
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <span className="text-sm font-medium">Active Rides</span>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
