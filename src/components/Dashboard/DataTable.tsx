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
    <Card className={cn("shadow-medium", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            )}
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead 
                    key={column.key} 
                    className="font-medium text-muted-foreground"
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </TableHead>
                ))}
                {actions && <TableHead className="w-16">Actions</TableHead>}
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
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8">
                    <div className="text-muted-foreground">
                      {searchTerm ? "No results found for your search." : "No data available."}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                    {columns.map((column) => (
                      <TableCell key={column.key} className="py-3">
                        {renderCellValue(column, row)}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredData.length} of {data.length} results
          </div>
        )}
      </CardContent>
    </Card>
  );
};