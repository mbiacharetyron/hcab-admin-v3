import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable, DataTableColumn } from "@/components/Dashboard/DataTable";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
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
  Users, 
  UserCheck, 
  UserX, 
  UserPlus, 
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
  MoreHorizontal
} from "lucide-react";
import { useEnhancedRiders } from "@/hooks/useRiders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ridersColumns: DataTableColumn[] = [
  { key: "id", title: "ID", width: "60px" },
  { key: "name", title: "NAME", width: "200px" },
  { key: "email", title: "EMAIL", width: "220px" },
  { key: "phone", title: "PHONE", width: "140px" }, 
  { key: "username", title: "USERNAME", width: "120px" },
  { key: "is_online", title: "ONLINE", width: "100px" },
  { key: "is_validated", title: "VALIDATED", width: "120px" },
  { key: "is_active", title: "ACTIVE", width: "100px" },
  { key: "created_at", title: "DATE CREATED", width: "120px" },
  { key: "actions", title: "ACTIONS", width: "120px" }
];

const Riders = () => {
  const navigate = useNavigate();
  
  // State for filters
  const [search, setSearch] = useState('');
  const [validated, setValidated] = useState<'validated' | 'invalidated' | 'all'>('all');
  const [active, setActive] = useState<'active' | 'inactive' | 'all'>('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // API call with filters
  const { riders, statistics, pagination, isLoading, error, refetch } = useEnhancedRiders({
    search: search || undefined,
    is_validated: validated,
    is_active: active,
    page,
    limit,
    lang: 'en'
  });

  // Debug logging
  console.log('Riders Debug:', {
    riders,
    statistics,
    pagination,
    isLoading,
    error,
    ridersLength: riders?.length
  });

  // Transform riders data for table display
  const transformedRiders = riders?.map(rider => ({
    ...rider,
    is_online: rider.is_online ? 'Online' : 'Offline',
    is_validated: rider.is_validated ? 'Validated' : 'Not Validated',
    is_active: rider.is_active ? 'Active' : 'Inactive',
    created_at: new Date(rider.created_at).toLocaleDateString(),
    actions: (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate(`/user/${rider.id}`)}
      >
        View Details
      </Button>
    )
  })) || [];

  const handleResetFilters = () => {
    setSearch('');
    setValidated('all');
    setActive('all');
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPaginationItems = () => {
    if (!pagination) return null;

    const { current_page, total_pages } = pagination;
    const items = [];

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (current_page > 1) handlePageChange(current_page - 1);
          }}
          className={current_page <= 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );

    // Page numbers
    const startPage = Math.max(1, current_page - 2);
    const endPage = Math.min(total_pages, current_page + 2);

    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={i === current_page}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < total_pages) {
      if (endPage < total_pages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(total_pages);
            }}
          >
            {total_pages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (current_page < total_pages) handlePageChange(current_page + 1);
          }}
          className={current_page >= total_pages ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );

    return items;
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
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    All Riders
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Manage and monitor all registered riders
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
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Rider
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
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load Riders</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load riders data"}
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
        {statistics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Riders"
            value={statistics.total_riders}
            icon={<Users className="w-5 h-5" />}
            variant="blue"
            isLoading={isLoading}
          />
          <StatsCard
            title="Online Riders" 
            value={statistics.online_riders}
            icon={<UserCheck className="w-5 h-5" />}
            variant="green"
            isLoading={isLoading}
          />
          <StatsCard
            title="Offline Riders"
            value={statistics.offline_riders} 
            icon={<UserX className="w-5 h-5" />}
            variant="orange"
            isLoading={isLoading}
          />
          <StatsCard
            title="Validated Riders" 
            value={statistics.validated_riders}
            icon={<UserPlus className="w-5 h-5" />}
            variant="purple"
            isLoading={isLoading}
          />
        </div>
        )}

        {/* Enhanced Filters */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">Filter and search through rider data</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search riders..." 
                    className="pl-10 border-2 focus:border-blue-500 transition-colors" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Validation Status</label>
                <Select value={validated} onValueChange={(value: 'validated' | 'invalidated' | 'all') => setValidated(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Validated" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="validated">Validated</SelectItem>
                    <SelectItem value="invalidated">Not Validated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Status</label>
                <Select value={active} onValueChange={(value: 'active' | 'inactive' | 'all') => setActive(value)}>
                  <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Active" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Results</label>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{riders?.length || 0}</div>
                      <div className="text-sm text-muted-foreground">riders</div>
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

        {/* Enhanced Riders Table */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Riders List</h3>
                <p className="text-sm text-muted-foreground">Comprehensive rider information ({pagination?.total_items || 0} total)</p>
              </div>
            </div>
            <DataTable
              title=""
              columns={ridersColumns}
              data={transformedRiders}
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
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      Showing {riders?.length || 0} of {pagination.total_items} riders
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
      </div>
    </AdminLayout>
  );
};

export default Riders;