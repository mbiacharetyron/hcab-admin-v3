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

        {/* Enhanced Summary Statistics */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent dark:from-blue-800/30 rounded-full blur-2xl"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Users</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      {summary.total_users.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Active accounts</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
                    <div className="relative bg-blue-500 p-3 rounded-full shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Balance Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100 dark:from-green-950/30 dark:via-emerald-900/20 dark:to-teal-950/30 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/30 to-transparent dark:from-green-800/30 rounded-full blur-2xl"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-semibold text-green-700 dark:text-green-300">Available Balance</p>
                    </div>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                      {formatBalance(summary.total_available_balance)}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Ready to use</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg"></div>
                    <div className="relative bg-green-500 p-3 rounded-full shadow-lg">
                      <Coins className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Locked Balance Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-100 dark:from-orange-950/30 dark:via-amber-900/20 dark:to-yellow-950/30 border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/30 to-transparent dark:from-orange-800/30 rounded-full blur-2xl"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">Locked Balance</p>
                    </div>
                    <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                      {formatBalance(summary.total_locked_balance)}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-orange-600 dark:text-orange-400">
                      <Shield className="w-3 h-3" />
                      <span>Secured funds</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-lg"></div>
                    <div className="relative bg-orange-500 p-3 rounded-full shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Balance Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-100 to-fuchsia-100 dark:from-purple-950/30 dark:via-violet-900/20 dark:to-fuchsia-950/30 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/30 to-transparent dark:from-purple-800/30 rounded-full blur-2xl"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Gem className="w-5 h-5 text-purple-600" />
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Total Balance</p>
                    </div>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      {formatBalance(summary.total_balance)}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-purple-600 dark:text-purple-400">
                      <Crown className="w-3 h-3" />
                      <span>Platform total</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg"></div>
                    <div className="relative bg-purple-500 p-3 rounded-full shadow-lg">
                      <Gem className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Filters */}
        <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="flex items-center text-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm"></div>
                <div className="relative bg-blue-500 p-2 rounded-lg">
                  <Filter className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="ml-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Advanced Filters & Search
              </span>
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Refine your search with powerful filtering options
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <Search className="w-4 h-4 mr-2 text-blue-600" />
                  Search Users
                </label>
                <div className="relative group">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    placeholder="Name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2 text-green-600" />
                  User Role
                </label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200">
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

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-orange-600" />
                  Account Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-purple-600" />
                  Balance Type
                </label>
                <Select value={balanceTypeFilter} onValueChange={setBalanceTypeFilter}>
                  <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total">Total Balance</SelectItem>
                    <SelectItem value="available">Available Balance</SelectItem>
                    <SelectItem value="locked">Locked Balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
                  Min Balance
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={minBalance}
                  onChange={(e) => setMinBalance(e.target.value)}
                  className="border-2 border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-2 text-red-600" />
                  Max Balance
                </label>
                <Input
                  type="number"
                  placeholder="10000.00"
                  value={maxBalance}
                  onChange={(e) => setMaxBalance(e.target.value)}
                  className="border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400 transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2 text-indigo-600" />
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200">
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

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-cyan-600" />
                  Sort Order
                </label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-cyan-500 dark:focus:border-cyan-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset All Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Wallet Balances Table */}
        <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    Wallet Balances
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Comprehensive user wallet overview
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {totalItems.toLocaleString()} users
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 z-10 border-b-2 border-gray-200 dark:border-gray-700">
                  <TableRow className="hover:bg-transparent">
                    <TableHead 
                      className="font-bold text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 py-4"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span>User Information</span>
                        {getSortIcon('name')}
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-gray-800 dark:text-gray-200 py-4">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span>Role & Status</span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-bold text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 py-4"
                      onClick={() => handleSort('available_balance')}
                    >
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-green-600" />
                        <span>Available Balance</span>
                        {getSortIcon('available_balance')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-bold text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 py-4"
                      onClick={() => handleSort('locked_balance')}
                    >
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-orange-600" />
                        <span>Locked Balance</span>
                        {getSortIcon('locked_balance')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-bold text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 py-4"
                      onClick={() => handleSort('total_balance')}
                    >
                      <div className="flex items-center space-x-2">
                        <Gem className="w-4 h-4 text-purple-600" />
                        <span>Total Balance</span>
                        {getSortIcon('total_balance')}
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-gray-800 dark:text-gray-200 py-4">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-600" />
                        <span>Security</span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-bold text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 py-4"
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>Created Date</span>
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
                          "group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 transition-all duration-300 hover:shadow-md border-b border-gray-100 dark:border-gray-800",
                          index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/30 dark:bg-gray-800/20"
                        )}
                      >
                        <TableCell className="py-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                  <span className="text-white font-bold text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                  </span>
                                </div>
                                {user.is_online && (
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                                )}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                                  {user.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  ID: {user.id}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <span className="truncate">{user.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2">
                                <Phone className="w-4 h-4 text-green-500" />
                                <span>{user.phone}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {getRoleBadge(user.role)}
                            {getStatusBadge(user.is_active, user.is_online)}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-2">
                              <Coins className="w-4 h-4 text-green-600" />
                              <div>
                                <div className="font-bold text-green-700 dark:text-green-300 text-lg">
                                  {formatBalance(user.wallet.available_balance)}
                                </div>
                                <div className="text-xs text-green-600 dark:text-green-400">
                                  Available
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-orange-600" />
                              <div>
                                <div className="font-bold text-orange-700 dark:text-orange-300 text-lg">
                                  {formatBalance(user.wallet.locked_balance)}
                                </div>
                                <div className="text-xs text-orange-600 dark:text-orange-400">
                                  Locked
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center space-x-2">
                              <Gem className="w-4 h-4 text-purple-600" />
                              <div>
                                <div className="font-bold text-purple-700 dark:text-purple-300 text-lg">
                                  {formatBalance(user.wallet.total_balance)}
                                </div>
                                <div className="text-xs text-purple-600 dark:text-purple-400">
                                  Total
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex justify-center">
                            {getPasscodeBadge(user.has_active_passcode)}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-lg p-3 border border-indigo-200 dark:border-indigo-800">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-indigo-600" />
                              <div>
                                <div className="font-semibold text-indigo-700 dark:text-indigo-300">
                                  {format(new Date(user.created_at), "MMM dd, yyyy")}
                                </div>
                                <div className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded-full inline-block">
                                  {format(new Date(user.created_at), "HH:mm")}
                                </div>
                              </div>
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

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg px-4 py-2 border border-blue-200 dark:border-blue-800">
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems.toLocaleString()} results
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <ArrowUp className="w-4 h-4 mr-2 rotate-[-90deg]" />
                    Previous
                  </Button>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                    {currentPage}
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Next
                    <ArrowUp className="w-4 h-4 ml-2 rotate-90" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default WalletBalances;
