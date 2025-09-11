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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Percent,
  RefreshCw,
  Download,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Users,
  DollarSign,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Copy
} from "lucide-react";
import { useDiscountManagement } from "@/hooks/useDiscountManagement";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import type { DiscountCreateRequest } from "@/lib/api";

// Discount Form Component
interface DiscountFormProps {
  onSubmit: (data: DiscountCreateRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<DiscountCreateRequest>;
}

const DiscountForm = ({ onSubmit, onCancel, isLoading = false, initialData }: DiscountFormProps) => {
  const [formData, setFormData] = useState<DiscountCreateRequest>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    code: initialData?.code || '',
    type: initialData?.type || 'percentage',
    value: initialData?.value || 0,
    minimum_amount: initialData?.minimum_amount || undefined,
    maximum_discount: initialData?.maximum_discount || undefined,
    usage_limit: initialData?.usage_limit || undefined,
    per_user_limit: initialData?.per_user_limit || 1,
    is_active: initialData?.is_active ?? true,
    starts_at: initialData?.starts_at || '',
    expires_at: initialData?.expires_at || '',
    is_first_ride_only: initialData?.is_first_ride_only ?? false,
    is_shared_ride_only: initialData?.is_shared_ride_only ?? false,
    applicable_ride_options: initialData?.applicable_ride_options || [],
    applicable_ride_classes: initialData?.applicable_ride_classes || [],
    user_restrictions: initialData?.user_restrictions || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof DiscountCreateRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Basic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">Discount Name *</Label>
            <Input
              id="name"
              placeholder="Enter discount name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border-2 focus:border-green-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter discount description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="border-2 focus:border-green-500 transition-colors min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm font-semibold">Promo Code</Label>
            <Input
              id="code"
              placeholder="Enter promo code (optional)"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              className="border-2 focus:border-green-500 transition-colors"
            />
            <p className="text-xs text-muted-foreground">Leave empty for automatic discounts</p>
          </div>
        </div>

        {/* Discount Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Discount Configuration</h3>
          
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-semibold">Discount Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger className="border-2 focus:border-green-500 transition-colors">
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                <SelectItem value="free_ride">Free Ride</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value" className="text-sm font-semibold">
              {formData.type === 'percentage' ? 'Percentage (%)' : 
               formData.type === 'fixed_amount' ? 'Fixed Amount (XAF)' : 
               'Maximum Amount (XAF)'} *
            </Label>
            <Input
              id="value"
              type="number"
              placeholder={formData.type === 'percentage' ? '20' : '500'}
              value={formData.value}
              onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
              className="border-2 focus:border-green-500 transition-colors"
              required
            />
          </div>

          {formData.type === 'percentage' && (
            <div className="space-y-2">
              <Label htmlFor="maximum_discount" className="text-sm font-semibold">Maximum Discount (XAF)</Label>
              <Input
                id="maximum_discount"
                type="number"
                placeholder="1000"
                value={formData.maximum_discount || ''}
                onChange={(e) => handleInputChange('maximum_discount', parseFloat(e.target.value) || undefined)}
                className="border-2 focus:border-green-500 transition-colors"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="minimum_amount" className="text-sm font-semibold">Minimum Ride Amount (XAF)</Label>
            <Input
              id="minimum_amount"
              type="number"
              placeholder="500"
              value={formData.minimum_amount || ''}
              onChange={(e) => handleInputChange('minimum_amount', parseFloat(e.target.value) || undefined)}
              className="border-2 focus:border-green-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usage Limits */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Usage Limits</h3>
          
          <div className="space-y-2">
            <Label htmlFor="usage_limit" className="text-sm font-semibold">Total Usage Limit</Label>
            <Input
              id="usage_limit"
              type="number"
              placeholder="1000 (leave empty for unlimited)"
              value={formData.usage_limit || ''}
              onChange={(e) => handleInputChange('usage_limit', parseFloat(e.target.value) || undefined)}
              className="border-2 focus:border-green-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="per_user_limit" className="text-sm font-semibold">Per User Limit *</Label>
            <Input
              id="per_user_limit"
              type="number"
              placeholder="1"
              value={formData.per_user_limit}
              onChange={(e) => handleInputChange('per_user_limit', parseInt(e.target.value) || 1)}
              className="border-2 focus:border-green-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Validity Period */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Validity Period</h3>
          
          <div className="space-y-2">
            <Label htmlFor="starts_at" className="text-sm font-semibold">Start Date</Label>
            <Input
              id="starts_at"
              type="datetime-local"
              value={formData.starts_at}
              onChange={(e) => handleInputChange('starts_at', e.target.value)}
              className="border-2 focus:border-green-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expires_at" className="text-sm font-semibold">Expiry Date</Label>
            <Input
              id="expires_at"
              type="datetime-local"
              value={formData.expires_at}
              onChange={(e) => handleInputChange('expires_at', e.target.value)}
              className="border-2 focus:border-green-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Restrictions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Restrictions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_first_ride_only"
                checked={formData.is_first_ride_only}
                onCheckedChange={(checked) => handleInputChange('is_first_ride_only', checked)}
              />
              <Label htmlFor="is_first_ride_only" className="text-sm font-semibold">
                First Ride Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_shared_ride_only"
                checked={formData.is_shared_ride_only}
                onCheckedChange={(checked) => handleInputChange('is_shared_ride_only', checked)}
              />
              <Label htmlFor="is_shared_ride_only" className="text-sm font-semibold">
                Shared Rides Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
              <Label htmlFor="is_active" className="text-sm font-semibold">
                Active
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Applicable Ride Options</Label>
              <div className="space-y-2">
                {[1, 2, 3].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ride_option_${option}`}
                      checked={formData.applicable_ride_options?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        const current = formData.applicable_ride_options || [];
                        if (checked) {
                          handleInputChange('applicable_ride_options', [...current, option]);
                        } else {
                          handleInputChange('applicable_ride_options', current.filter(id => id !== option));
                        }
                      }}
                    />
                    <Label htmlFor={`ride_option_${option}`} className="text-sm">
                      Option {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="border-2 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Create Discount
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

const DiscountManagement = () => {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<any>(null);

  // API call with filters
  const { 
    discounts, 
    statistics, 
    pagination, 
    isLoading, 
    error, 
    refetch,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    toggleStatus,
    isCreating,
    isUpdating,
    isDeleting,
    isToggling
  } = useDiscountManagement({
    per_page: limit,
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
  });

  // Debug logging
  console.log('DiscountManagement Debug:', {
    discounts,
    discountsType: typeof discounts,
    isArray: Array.isArray(discounts),
    statistics,
    pagination,
    isLoading,
    error
  });

  const totalItems = pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // Helper functions
  const getTypeBadge = (type: string) => {
    const typeConfig = {
      percentage: { label: 'Percentage', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      fixed_amount: { label: 'Fixed Amount', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      free_ride: { label: 'Free Ride', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' }
    };
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.percentage;
    
    return (
      <Badge variant="secondary" className={config.color}>
        <Tag className="w-3 h-3 mr-1" />
        {config.label}
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

  const handleToggleStatus = (id: number) => {
    toggleStatus(id);
  };

  const handleDeleteDiscount = (id: number) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      deleteDiscount(id);
    }
  };

  const handleEditDiscount = (discount: any) => {
    setEditingDiscount(discount);
    setShowEditDialog(true);
  };

  const handleUpdateDiscount = (data: DiscountCreateRequest) => {
    if (!editingDiscount) return;
    
    updateDiscount({ id: editingDiscount.id, data }, {
      onSuccess: () => {
        setShowEditDialog(false);
        setEditingDiscount(null);
        refetch();
      },
      onError: (error) => {
        console.error('Error updating discount:', error);
      }
    });
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditingDiscount(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={cn(
            "w-10 h-10",
            i === currentPage 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "hover:bg-gray-100"
          )}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pages}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <AdminLayout>
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <Percent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Discount Management
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Promotional Campaigns & Savings Management
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => refetch()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Data
              </Button>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Discount
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Create New Discount
                    </DialogTitle>
                  </DialogHeader>
                  <DiscountForm 
                    onSubmit={(data) => {
                      createDiscount(data);
                      setShowCreateDialog(false);
                    }}
                    onCancel={() => setShowCreateDialog(false)}
                    isLoading={isCreating}
                  />
                </DialogContent>
              </Dialog>

              {/* Edit Discount Dialog */}
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                      <Edit className="w-6 h-6 mr-2 text-blue-600" />
                      Edit Discount
                    </DialogTitle>
                  </DialogHeader>
                  <DiscountForm 
                    onSubmit={handleUpdateDiscount}
                    onCancel={handleCancelEdit}
                    isLoading={isUpdating}
                    initialData={editingDiscount}
                  />
                </DialogContent>
              </Dialog>
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
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load Discount Data</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load discount data"}
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

        {/* Discount Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Discounts Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Total Discounts</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Percent className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-1">
                  {statistics.total_discounts}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600 dark:text-green-400">All campaigns</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Discounts Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Active Discounts</CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-1">
                  {statistics.active_discounts}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">Live</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Usage Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Total Usage</CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-1">
                  {statistics.total_usage.toLocaleString()}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-purple-600 dark:text-purple-400">Times used</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Savings Card */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">Total Savings</CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-1">
                  {statistics.total_savings.toLocaleString()} XAF
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-orange-600 dark:text-orange-400">Saved by users</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="discounts" className="space-y-8">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner">
              <TabsTrigger 
                value="discounts" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-600 font-semibold transition-all duration-200"
              >
                <Percent className="w-4 h-4 mr-2" />
                Discounts
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-600 font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="usage"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-600 font-semibold transition-all duration-200"
              >
                <Activity className="w-4 h-4 mr-2" />
                Usage History
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Discounts Tab */}
          <TabsContent value="discounts" className="space-y-8">
            {/* Enhanced Filters */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Advanced Filters</h3>
                    <p className="text-sm text-muted-foreground">Filter and search through discounts</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search discounts..." 
                        className="pl-10 border-2 focus:border-green-500 transition-colors" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="border-2 focus:border-green-500 transition-colors">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Results</label>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{totalItems}</div>
                          <div className="text-sm text-muted-foreground">discounts</div>
                        </div>
                        {(searchTerm || statusFilter !== "all") && (
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

            {/* Enhanced Discounts Table */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  Discount Campaigns
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage promotional discounts and campaigns ({totalItems} total)</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                    <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Discount</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Type & Value</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Usage</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Validity</TableHead>
                        <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Loading discounts...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : !discounts || discounts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="text-gray-500">
                              <Percent className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p>No discounts found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        (Array.isArray(discounts) ? discounts : []).map((discount, index) => (
                          <TableRow 
                            key={discount.id}
                            className={cn(
                              "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                              index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                            )}
                          >
                            <TableCell>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="font-semibold text-gray-800 dark:text-gray-200">{discount.name}</div>
                                  {!discount.code && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                                      Auto
                                    </Badge>
                                  )}
                                  {discount.is_first_ride_only && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs">
                                      First Ride
                                    </Badge>
                                  )}
                                  {discount.is_shared_ride_only && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                                      Shared Only
                                    </Badge>
                                  )}
                                </div>
                                {discount.code && (
                                  <div className="flex items-center space-x-2">
                                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                                      {discount.code}
                                    </code>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                                {discount.description && (
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {discount.description}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                {getTypeBadge(discount.type)}
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {discount.type === 'percentage' 
                                    ? `${discount.value}% off`
                                    : discount.type === 'fixed_amount'
                                    ? `${discount.value} XAF off`
                                    : `Free ride up to ${discount.value} XAF`
                                  }
                                </div>
                                {discount.minimum_amount && (
                                  <div className="text-xs text-muted-foreground">
                                    Min: {discount.minimum_amount} XAF
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {discount.usage_count} / {discount.usage_limit || '∞'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {discount.per_user_limit} per user
                                </div>
                                {discount.usage_limit && (
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-600 h-2 rounded-full" 
                                      style={{ width: `${Math.min((discount.usage_count / discount.usage_limit) * 100, 100)}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(discount.is_active)}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {discount.starts_at && (
                                  <div className="text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    {format(new Date(discount.starts_at), "MMM dd, yyyy")}
                                  </div>
                                )}
                                {discount.expires_at && (
                                  <div className="text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3 inline mr-1" />
                                    {format(new Date(discount.expires_at), "MMM dd, yyyy")}
                                  </div>
                                )}
                                {!discount.starts_at && !discount.expires_at && (
                                  <div className="text-xs text-muted-foreground">No expiry</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleToggleStatus(discount.id)}
                                  disabled={isToggling}
                                  className="hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                  title={discount.is_active ? "Deactivate" : "Activate"}
                                >
                                  {discount.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditDiscount(discount)}
                                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  title="Edit discount"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteDiscount(discount.id)}
                                  disabled={isDeleting}
                                  className="hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                  title="Delete discount"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            {renderPagination()}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            {/* Top Performing Discounts */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  Top Performing Discounts
                </CardTitle>
                <p className="text-sm text-muted-foreground">Most popular discounts by usage</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statistics?.top_discounts?.map((discount, index) => (
                    <div key={discount.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">{discount.name}</div>
                          <div className="text-sm text-muted-foreground">{discount.usages_count} uses</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {discount.usages_count}
                        </div>
                        <div className="text-xs text-muted-foreground">total uses</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                      <PieChart className="w-5 h-5 text-white" />
                    </div>
                    Usage Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Discounts</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {statistics?.active_discounts || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Discounts</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">
                        {statistics?.inactive_discounts || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Usage</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {statistics?.total_usage?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    Savings Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Savings</span>
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                        {statistics?.total_savings?.toLocaleString() || 0} XAF
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {statistics?.this_month_savings?.toLocaleString() || 0} XAF
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month Usage</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {statistics?.this_month_usage || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  Performance Metrics
                </CardTitle>
                <p className="text-sm text-muted-foreground">Key performance indicators and insights</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">Active Rate</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {statistics ? Math.round((statistics.active_discounts / statistics.total_discounts) * 100) : 0}%
                        </div>
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Avg Usage/Discount</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {statistics ? Math.round(statistics.total_usage / statistics.total_discounts) : 0}
                        </div>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg Savings/Use</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {statistics ? Math.round(statistics.total_savings / statistics.total_usage) : 0} XAF
                        </div>
                      </div>
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage History Tab */}
          <TabsContent value="usage" className="space-y-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  Usage History
                </CardTitle>
                <p className="text-sm text-muted-foreground">Detailed discount usage tracking and analytics</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                          <TableHead className="font-semibold text-gray-700 dark:text-gray-300">User</TableHead>
                          <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Discount</TableHead>
                          <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Booking</TableHead>
                          <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Amounts</TableHead>
                          <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Used At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(statistics?.recent_usage || []).map((usage, index) => (
                          <TableRow 
                            key={usage.id}
                            className={cn(
                              "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                              index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                            )}
                          >
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                  {usage.user?.name || 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {usage.user?.email || 'N/A'}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                  {usage.discount?.name || 'N/A'}
                                </div>
                                {usage.discount?.code && (
                                  <div className="flex items-center space-x-2">
                                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                                      {usage.discount.code}
                                    </code>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {usage.booking?.source_name || 'Location'} → {usage.booking?.destination_name || 'Destination'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Booking #{usage.booking_id || usage.booking?.id || 'N/A'}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Original: </span>
                                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    {(usage.original_amount || 0).toLocaleString()} XAF
                                  </span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-green-600 dark:text-green-400">Saved: </span>
                                  <span className="font-semibold text-green-600 dark:text-green-400">
                                    -{(usage.discount_amount || 0).toLocaleString()} XAF
                                  </span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Final: </span>
                                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    {((usage.original_amount || 0) - (usage.discount_amount || 0)).toLocaleString()} XAF
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-gray-800 dark:text-gray-200">
                                  {usage.created_at ? format(new Date(usage.created_at), "MMM dd, yyyy") : 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                                  {usage.created_at ? format(new Date(usage.created_at), "HH:mm") : 'N/A'}
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
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default DiscountManagement;


