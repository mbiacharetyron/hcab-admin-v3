import { ReactNode, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Eye, Edit, Trash2, Search, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface DataTableColumn {
  key: string;
  title: string;
  width?: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  title: string;
  columns: DataTableColumn[];
  data: any[];
  actions?: boolean;
  className?: string;
  isLoading?: boolean;
  searchable?: boolean;
  onRefresh?: () => void;
  searchPlaceholder?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
      case "validated":
      case "in_progress":
        return "bg-success-light text-success border-success/20";
      case "pending":
      case "scheduled":
      case "waiting":
        return "bg-warning-light text-warning border-warning/20";
      case "cancelled":
      case "failed":
      case "offline":
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Badge variant="outline" className={cn("font-medium", getVariant(status))}>
      {status}
    </Badge>
  );
};

const LoadingRow = ({ columns, actions }: { columns: DataTableColumn[], actions: boolean }) => (
  <TableRow>
    {columns.map((column) => (
      <TableCell key={column.key} className="py-3">
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
    {actions && (
      <TableCell>
        <Skeleton className="h-8 w-8 rounded" />
      </TableCell>
    )}
  </TableRow>
);

export const DataTable = ({ 
  title, 
  columns, 
  data, 
  actions = true, 
  className,
  isLoading = false,
  searchable = false,
  onRefresh,
  searchPlaceholder = "Search..."
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;
    
    return data.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchable]);

  const renderCellValue = (column: DataTableColumn, row: any) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }

    const value = row[column.key];
    
    // Handle status columns
    if (column.key.toLowerCase().includes("status")) {
      return <StatusBadge status={value} />;
    }

    // Handle date columns
    if (column.key.toLowerCase().includes("date") || column.key.toLowerCase().includes("created_at")) {
      return new Date(value).toLocaleDateString();
    }

    // Handle location columns (truncate long addresses)
    if (column.key.toLowerCase().includes("location") || column.key.toLowerCase().includes("source") || column.key.toLowerCase().includes("destination")) {
      if (typeof value === "string" && value.length > 30) {
        return (
          <div className="max-w-[200px]">
            <span title={value}>{value.substring(0, 30)}...</span>
          </div>
        );
      }
    }

    // Handle user name (from nested user object)
    if (column.key === "name" && row.user) {
      return row.user.name || "N/A";
    }

    // Handle ride option (from nested rideOption object)
    if (column.key === "rideOption" && row.rideOption) {
      return row.rideOption.name || "N/A";
    }

    return value;
  };

  return (
    <Card className={cn("shadow-large bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-medium">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
              <p className="text-sm text-muted-foreground font-normal">
                {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-white/50 border-white/20 focus:border-primary/40 focus:ring-primary/20"
                />
              </div>
            )}
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                className="hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50/50 via-transparent to-slate-50/50 border-b border-white/20">
                {columns.map((column) => (
                  <TableHead 
                    key={column.key} 
                    className="font-semibold text-foreground py-4 px-6"
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </TableHead>
                ))}
                {actions && <TableHead className="w-16 py-4 px-6">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Show loading skeletons
                Array.from({ length: 5 }).map((_, index) => (
                  <LoadingRow key={index} columns={columns} actions={actions} />
                ))
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-muted/20 rounded-2xl flex items-center justify-center">
                        <div className="w-6 h-6 bg-muted/40 rounded"></div>
                      </div>
                      <div className="text-muted-foreground">
                        {searchTerm ? "No results found for your search." : "No data available."}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((row, index) => (
                  <TableRow 
                    key={index} 
                    className="hover:bg-gradient-to-r hover:from-primary/5 hover:via-transparent hover:to-primary/5 transition-all duration-300 border-b border-white/10"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key} className="py-4 px-6">
                        {renderCellValue(column, row)}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="py-4 px-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border border-white/20">
                            <DropdownMenuItem className="hover:bg-primary/10">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-primary/10">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {searchable && searchTerm && (
          <div className="p-4 bg-gradient-to-r from-slate-50/50 via-transparent to-slate-50/50 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Showing {filteredData.length} of {data.length} results</span>
              </div>
              <div className="text-muted-foreground">
                Search: "{searchTerm}"
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};