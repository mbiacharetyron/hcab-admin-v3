import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Wallet,
  RefreshCw,
  Download,
  Filter,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  User,
  UserCheck,
  Clock,
  Phone,
  Mail,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  MoreHorizontal,
  Settings,
  FileText,
  Calendar,
  MapPin,
  CreditCard,
  Banknote,
  Coins,
  Gem,
  Crown,
  Sparkles,
  Award,
  Trophy
} from "lucide-react";
import { useWalletBalanceManagement } from "@/hooks/useWalletBalances";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { WalletBalanceUser } from "@/lib/api";

const WalletBalances = () => {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [balanceTypeFilter, setBalanceTypeFilter] = useState<string>('total');
  const [minBalance, setMinBalance] = useState<string>('');
  const [maxBalance, setMaxBalance] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('total_balance');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);

  // API call with filters
  const { 
    users, 
    pagination, 
    summary,
    isLoading, 
    error, 
    refetch
  } = useWalletBalanceManagement({
    search: searchTerm || undefined,
    role: roleFilter !== 'all' ? roleFilter as 'rider' | 'driver' | 'admin' : undefined,
    is_active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
    balance_type: balanceTypeFilter as 'available' | 'locked' | 'total',
    min_balance: minBalance ? parseFloat(minBalance) : undefined,
    max_balance: maxBalance ? parseFloat(maxBalance) : undefined,
    sort_by: sortBy as any,
    sort_order: sortOrder as 'asc' | 'desc',
    page: currentPage,
    per_page: limit,
  });

  const totalItems = pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // Helper functions
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      rider: { label: 'Rider', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
      driver: { label: 'Driver', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
      admin: { label: 'Admin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' }
    };
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.rider;
    
    return (
      <Badge variant="secondary" className={config.color}>
        <User className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean, isOnline: boolean) => {
    if (isActive && isOnline) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <UserCheck className="w-3 h-3 mr-1" />
          Active & Online
        </Badge>
      );
    } else if (isActive) {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <User className="w-3 h-3 mr-1" />
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <User className="w-3 h-3 mr-1" />
          Inactive
        </Badge>
      );
    }
  };

  const getPasscodeBadge = (hasPasscode: boolean) => {
    if (hasPasscode) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Protected
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          <Shield className="w-3 h-3 mr-1" />
          Unprotected
        </Badge>
      );
    }
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    setBalanceTypeFilter('total');
    setMinBalance('');
    setMaxBalance('');
    setSortBy('total_balance');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortOrder === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-blue-600" /> : 
      <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Wallet className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Error Loading Wallet Balances</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </p>
            </div>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent dark:from-blue-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/20 to-transparent dark:from-purple-800/20 rounded-full blur-3xl"></div>
          
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      Wallet Balances
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                      Comprehensive wallet management and monitoring dashboard
                    </p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Data</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Updates</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>Secure Access</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={() => refetch()} 
                  variant="outline" 
                  size="lg"
                  disabled={isLoading}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className={cn("w-5 h-5 mr-2", isLoading && "animate-spin")} />
                  Refresh Data
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Users</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {summary.total_users.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Available Balance</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {formatBalance(summary.total_available_balance)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Locked Balance</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      {formatBalance(summary.total_locked_balance)}
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Balance</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {formatBalance(summary.total_balance)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="rider">Riders</SelectItem>
                    <SelectItem value="driver">Drivers</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Balance Type</label>
                <Select value={balanceTypeFilter} onValueChange={setBalanceTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total">Total Balance</SelectItem>
                    <SelectItem value="available">Available Balance</SelectItem>
                    <SelectItem value="locked">Locked Balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Min Balance</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={minBalance}
                  onChange={(e) => setMinBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Max Balance</label>
                <Input
                  type="number"
                  placeholder="10000.00"
                  value={maxBalance}
                  onChange={(e) => setMaxBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total_balance">Total Balance</SelectItem>
                    <SelectItem value="available_balance">Available Balance</SelectItem>
                    <SelectItem value="locked_balance">Locked Balance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="created_at">Created Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Order</label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Balances Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Wallet Balances</span>
              <span className="text-sm font-normal text-gray-500">
                {totalItems} users • Page {currentPage} of {totalPages}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
                  <TableRow>
                    <TableHead 
                      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        User
                        {getSortIcon('name')}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Role & Status</TableHead>
                    <TableHead 
                      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleSort('available_balance')}
                    >
                      <div className="flex items-center">
                        Available Balance
                        {getSortIcon('available_balance')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleSort('locked_balance')}
                    >
                      <div className="flex items-center">
                        Locked Balance
                        {getSortIcon('locked_balance')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleSort('total_balance')}
                    >
                      <div className="flex items-center">
                        Total Balance
                        {getSortIcon('total_balance')}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Security</TableHead>
                    <TableHead 
                      className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center">
                        Created
                        {getSortIcon('created_at')}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Loading wallet balances...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : !users || users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-gray-500">
                          <Wallet className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No wallet balances found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user: WalletBalanceUser, index: number) => (
                      <TableRow 
                        key={user.id}
                        className={cn(
                          "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                          index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                        )}
                      >
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-800 dark:text-gray-200">
                              {user.name}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <Mail className="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <Phone className="w-3 h-3" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {getRoleBadge(user.role)}
                            {getStatusBadge(user.is_active, user.is_online)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600 dark:text-green-400">
                            {formatBalance(user.wallet.available_balance)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-orange-600 dark:text-orange-400">
                            {formatBalance(user.wallet.locked_balance)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-blue-600 dark:text-blue-400">
                            {formatBalance(user.wallet.total_balance)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPasscodeBadge(user.has_active_passcode)}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              {format(new Date(user.created_at), "MMM dd, yyyy")}
                            </div>
                            <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                              {format(new Date(user.created_at), "HH:mm")}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems} results
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
              <span className="text-sm text-gray-700 dark:text-gray-300">
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
      </div>
    </AdminLayout>
  );
};

export default WalletBalances;
