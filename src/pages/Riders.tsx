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
import { Users, UserCheck, UserX, UserPlus, Plus, Search, Filter, AlertTriangle, RefreshCw } from "lucide-react";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Riders</h1>
            <p className="text-muted-foreground">Manage and monitor all registered riders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add Rider
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
                  <h3 className="font-semibold text-destructive">Failed to Load Riders</h3>
                  <p className="text-sm text-muted-foreground">
                    {error.message || "Unable to load riders data"}
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
                placeholder="Search riders..." 
                className="pl-9" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
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

            <Select value={active} onValueChange={(value: 'active' | 'inactive' | 'all') => setActive(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filter
            </Button>
          </div>
        </div>

        {/* Riders Table */}
        <DataTable
          title={`Riders ${pagination ? `(${pagination.total_items})` : ''}`}
          columns={ridersColumns}
          data={transformedRiders}
          isLoading={isLoading}
          searchable={false} // We handle search via filters
        />

        {/* Pagination Info */}
        {pagination && (
          <div className="text-sm text-muted-foreground text-center">
            Showing {riders?.length || 0} of {pagination.total_items} riders
            <span> • Page {pagination.current_page} of {pagination.total_pages}</span>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.total_pages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                {renderPaginationItems()}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Riders;