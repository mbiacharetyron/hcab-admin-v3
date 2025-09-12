import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle,
  RefreshCw,
  Download,
  Filter,
  Search,
  MapPin,
  Eye,
  Car,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Calendar,
  Map,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Target,
  Globe,
  Timer,
  AlertCircle,
  Star,
  Sparkles,
  Heart,
  Flame,
  Wind,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning
} from "lucide-react";
import { usePanicManagementData } from "@/hooks/usePanicManagement";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PanicMap from "@/components/PanicMap";
import PanicMapModal from "@/components/PanicMapModal";
import MapPreview from "@/components/MapPreview";
import { PanicReport } from "@/lib/api";

const PanicManagementEnhanced = () => {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [selectedReport, setSelectedReport] = useState<PanicReport | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [modalReport, setModalReport] = useState<PanicReport | null>(null);
  const [hoveredReport, setHoveredReport] = useState<PanicReport | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  // API call with filters
  const { 
    panicReports, 
    statistics, 
    pagination, 
    isLoading, 
    error, 
    refetch,
    resolvePanic,
    isResolving
  } = usePanicManagementData({
    page: currentPage,
    limit,
    status: statusFilter !== 'all' ? statusFilter as 'resolved' | 'unresolved' : undefined,
    user_type: userTypeFilter !== 'all' ? userTypeFilter as 'driver' | 'rider' : undefined,
  });

  const totalItems = pagination?.total_items || 0;
  const totalPages = pagination?.total_pages || 1;

  // Animation effects
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsAnimating(true);
    refetch();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Helper functions
  const getStatusBadge = (isResolved: boolean) => {
    if (isResolved) {
      return (
        <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 border-green-200 dark:border-green-700 shadow-sm">
          <CheckCircle className="w-3 h-3 mr-1 animate-pulse" />
          Resolved
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className={cn(
          "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 border-red-200 dark:border-red-700 shadow-sm",
          pulseAnimation && "animate-pulse shadow-red-200 dark:shadow-red-800"
        )}>
          <AlertTriangle className="w-3 h-3 mr-1" />
          Unresolved
        </Badge>
      );
    }
  };

  const getUserTypeBadge = (role: 'driver' | 'rider') => {
    if (role === 'driver') {
      return (
        <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700 shadow-sm">
          <Car className="w-3 h-3 mr-1" />
          Driver
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-700 shadow-sm">
          <User className="w-3 h-3 mr-1" />
          Rider
        </Badge>
      );
    }
  };

  const handleResolvePanic = (panicId: number) => {
    if (window.confirm('Are you sure you want to mark this panic report as resolved?')) {
      resolvePanic(panicId);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setUserTypeFilter('all');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewOnMap = (report: PanicReport) => {
    setModalReport(report);
    setShowMapModal(true);
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
    setModalReport(null);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "hover:bg-gray-100"
          )}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center space-x-3 mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 border-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </Button>
        
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              className="w-10 h-10"
            >
              1
            </Button>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              className="w-10 h-10"
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 border-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    );
  };

  return (
    <AdminLayout>
      {/* Ultra-Enhanced Header Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 via-yellow-50 to-amber-50 dark:from-red-950/20 dark:via-orange-950/20 dark:via-yellow-950/20 dark:to-amber-950/20 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 animate-pulse"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-red-200/30 to-orange-200/30 dark:from-red-800/20 dark:to-orange-800/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 dark:from-yellow-800/20 dark:to-amber-800/20 rounded-full blur-lg animate-pulse"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "relative p-4 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/25",
                  pulseAnimation && "animate-pulse shadow-red-500/50"
                )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  <AlertTriangle className="relative w-10 h-10 text-white drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-red-600 to-orange-600 dark:from-white dark:via-red-400 dark:to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
                    Panic Management
                  </h1>
                  <p className="text-xl text-muted-foreground font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    Emergency Response & Safety Monitoring
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefresh}
                disabled={isAnimating}
                className={cn(
                  "bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105",
                  isAnimating && "animate-pulse"
                )}
                size="lg"
              >
                <RefreshCw className={cn("w-5 h-5 mr-2", isAnimating && "animate-spin")} />
                {isAnimating ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
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
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Failed to Load Panic Data</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message || "Unable to load panic reports data"}
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

        {/* Ultra-Enhanced Panic Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Reports Card */}
            <Card className="group relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-red-950/20 dark:via-rose-950/20 dark:to-pink-950/20 hover:shadow-red-500/25 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 dark:from-red-400/5 dark:to-rose-400/5"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-200/30 to-rose-200/30 dark:from-red-800/20 dark:to-rose-800/20 rounded-full -translate-y-20 translate-x-20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 dark:from-pink-800/15 dark:to-rose-800/15 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Total Reports
                </CardTitle>
                <div className="p-3 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 rounded-xl shadow-lg group-hover:shadow-red-200 dark:group-hover:shadow-red-800 transition-shadow duration-300">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 group-hover:animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-black text-red-800 dark:text-red-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {statistics.total_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-red-600 mr-1" />
                    <span className="text-xs font-semibold text-red-700 dark:text-red-300">All time</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={75} className="h-2 bg-red-100 dark:bg-red-900/30" />
                </div>
              </CardContent>
            </Card>

            {/* Unresolved Reports Card */}
            <Card className="group relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 hover:shadow-orange-500/25 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 dark:from-orange-400/5 dark:to-amber-400/5"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-amber-200/30 dark:from-orange-800/20 dark:to-amber-800/20 rounded-full -translate-y-20 translate-x-20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-200/20 to-amber-200/20 dark:from-yellow-800/15 dark:to-amber-800/15 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-orange-700 dark:text-orange-300 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Unresolved
                </CardTitle>
                <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl shadow-lg group-hover:shadow-orange-200 dark:group-hover:shadow-orange-800 transition-shadow duration-300">
                  <XCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 group-hover:animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-black text-orange-800 dark:text-orange-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {statistics.unresolved_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                    <AlertTriangle className="h-3 w-3 text-red-600 mr-1 animate-pulse" />
                    <span className="text-xs font-semibold text-red-700 dark:text-red-300">Urgent</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={90} className="h-2 bg-orange-100 dark:bg-orange-900/30" />
                </div>
              </CardContent>
            </Card>

            {/* Resolved Reports Card */}
            <Card className="group relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 hover:shadow-green-500/25 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-400/5 dark:to-emerald-400/5"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200/30 to-emerald-200/30 dark:from-green-800/20 dark:to-emerald-800/20 rounded-full -translate-y-20 translate-x-20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200/20 to-emerald-200/20 dark:from-teal-800/15 dark:to-emerald-800/15 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Resolved
                </CardTitle>
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl shadow-lg group-hover:shadow-green-200 dark:group-hover:shadow-green-800 transition-shadow duration-300">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-black text-green-800 dark:text-green-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {statistics.resolved_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">Safe</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={60} className="h-2 bg-green-100 dark:bg-green-900/30" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports Card */}
            <Card className="group relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-400/5 dark:to-indigo-400/5"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-800/20 dark:to-indigo-800/20 rounded-full -translate-y-20 translate-x-20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-indigo-200/20 dark:from-purple-800/15 dark:to-indigo-800/15 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Recent Reports
                </CardTitle>
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl shadow-lg group-hover:shadow-blue-200 dark:group-hover:shadow-blue-800 transition-shadow duration-300">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-black text-blue-800 dark:text-blue-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {statistics.recent_reports}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    <Timer className="w-3 h-3 text-blue-600 mr-1" />
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Last 24h</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={45} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ultra-Enhanced Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 dark:from-red-500/5 dark:via-orange-500/5 dark:to-yellow-500/5 rounded-2xl blur-xl"></div>
            <TabsList className="relative grid w-full grid-cols-3 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-2 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/25 font-bold transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Panic Reports
              </TabsTrigger>
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/25 font-bold transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="map"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/25 font-bold transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Map className="w-5 h-5 mr-2" />
                Map View
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Panic Reports Tab */}
          <TabsContent value="reports" className="space-y-8">
            {/* Ultra-Enhanced Filters */}
            <Card className="group border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 hover:shadow-red-500/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5 dark:from-red-500/3 dark:via-orange-500/3 dark:to-yellow-500/3 rounded-2xl"></div>
              <CardContent className="relative p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl shadow-lg group-hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-105">
                    <Filter className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Advanced Filters
                    </h3>
                    <p className="text-base text-muted-foreground font-medium flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Filter and search through panic reports
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </label>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-red-500 transition-colors" />
                      <Input 
                        placeholder="Search reports..." 
                        className="pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Status
                    </label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md py-3">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-2xl border-0">
                        <SelectItem value="all" className="rounded-lg">All Statuses</SelectItem>
                        <SelectItem value="unresolved" className="rounded-lg">Unresolved</SelectItem>
                        <SelectItem value="resolved" className="rounded-lg">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      User Type
                    </label>
                    <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md py-3">
                        <SelectValue placeholder="All Users" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-2xl border-0">
                        <SelectItem value="all" className="rounded-lg">All Users</SelectItem>
                        <SelectItem value="driver" className="rounded-lg">Drivers</SelectItem>
                        <SelectItem value="rider" className="rounded-lg">Riders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Results
                    </label>
                    <div className="p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-black text-red-600 dark:text-red-400">{totalItems}</div>
                          <div className="text-sm text-muted-foreground font-medium">reports found</div>
                        </div>
                        {(searchTerm || statusFilter !== "all" || userTypeFilter !== "all") && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleResetFilters}
                            className="text-xs h-8 px-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm rounded-lg transition-all duration-200 hover:scale-105"
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

            {/* Ultra-Enhanced Panic Reports List */}
            <Card className="group border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 hover:shadow-red-500/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/3 via-orange-500/3 to-yellow-500/3 dark:from-red-500/2 dark:via-orange-500/2 dark:to-yellow-500/2 rounded-2xl"></div>
              <CardHeader className="relative pb-6">
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl shadow-lg group-hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-105">
                    <AlertTriangle className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h2 className="font-black bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Panic Reports
                    </h2>
                    <p className="text-base text-muted-foreground font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Emergency reports requiring immediate attention ({totalItems} total)
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <RefreshCw className="w-8 h-8 text-white animate-spin" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Loading Panic Reports</h3>
                    <p className="text-sm text-muted-foreground">Fetching emergency data...</p>
                  </div>
                ) : !panicReports || panicReports.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                      <AlertTriangle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Panic Reports Found</h3>
                    <p className="text-sm text-muted-foreground">All clear! No emergency reports at this time.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {panicReports.map((report, index) => (
                      <div 
                        key={report.id} 
                        className={cn(
                          "group relative border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden",
                          index % 2 === 0 
                            ? "bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 border-gray-200 dark:border-gray-700" 
                            : "bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80 dark:from-gray-800/80 dark:via-gray-900 dark:to-gray-800/80 border-gray-200 dark:border-gray-700"
                        )}
                      >
                        {/* Animated Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100/20 to-orange-100/20 dark:from-red-900/10 dark:to-orange-900/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100/20 to-amber-100/20 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="relative flex items-start justify-between">
                          <div className="flex-1 space-y-6">
                            {/* Enhanced Header Row */}
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
                                  <span className="text-2xl font-black text-white">#{report.id}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-muted-foreground">Report ID</span>
                                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">#{report.id}</span>
                                </div>
                              </div>
                              {getUserTypeBadge(report.user.role)}
                              {getStatusBadge(report.is_resolved)}
                            </div>

                            {/* Enhanced User Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  User Information
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl">
                                    <p className="font-semibold text-gray-700 dark:text-gray-300">Name</p>
                                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{report.user.name}</p>
                                  </div>
                                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                                    <p className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                                      <Phone className="w-4 h-4" />
                                      Phone
                                    </p>
                                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{report.user.phone}</p>
                                  </div>
                                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                                    <p className="font-semibold text-gray-700 dark:text-gray-300">Email</p>
                                    <p className="text-sm text-muted-foreground">{report.user.email}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg">
                                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                                  </div>
                                  Location Details
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl">
                                    <p className="font-semibold text-gray-700 dark:text-gray-300">Address</p>
                                    <p className="text-base font-bold text-gray-800 dark:text-gray-200">{report.location}</p>
                                  </div>
                                  <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-xl">
                                    <p className="font-semibold text-gray-700 dark:text-gray-300">Coordinates</p>
                                    <p className="text-sm font-mono text-muted-foreground">
                                      {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
                                    </p>
                                  </div>
                                  {report.description && (
                                    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                                      <p className="font-semibold text-gray-700 dark:text-gray-300">Description</p>
                                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                        "{report.description}"
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Booking Information */}
                            {report.booking && (
                              <div className="space-y-2">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                  <Car className="w-4 h-4" />
                                  Associated Booking
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p><span className="font-medium">Booking ID:</span> #{report.booking.id}</p>
                                    <p><span className="font-medium">Status:</span> {report.booking.status}</p>
                                  </div>
                                  <div>
                                    <p><span className="font-medium">From:</span> {report.booking.source_name}</p>
                                    <p><span className="font-medium">To:</span> {report.booking.destination_name}</p>
                                  </div>
                                  <div>
                                    <p><span className="font-medium">Fare:</span> {report.booking.ride_fare} XAF</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Timestamp */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Reported on {format(new Date(report.created_at), "EEEE, MMMM dd, yyyy 'at' HH:mm")}</span>
                            </div>
                          </div>

                          {/* Enhanced Action Buttons */}
                          <div className="ml-8 flex flex-col gap-3">
                            {!report.is_resolved && (
                              <Button
                                size="lg"
                                onClick={() => handleResolvePanic(report.id)}
                                disabled={isResolving}
                                className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 rounded-xl font-bold"
                              >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Resolve
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => handleViewOnMap(report)}
                              onMouseEnter={(e) => {
                                setHoveredReport(report);
                                setPreviewPosition({ x: e.clientX, y: e.clientY });
                              }}
                              onMouseLeave={() => setHoveredReport(null)}
                              className="border-2 border-blue-200 dark:border-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
                            >
                              <Map className="w-5 h-5 mr-2" />
                              View on Map
                            </Button>
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
                            >
                              <Eye className="w-5 h-5 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination */}
            {renderPagination()}
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Type Breakdown */}
              {statistics && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      User Type Breakdown
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Panic reports by user type</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Car className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Driver Reports</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {statistics.driver_reports}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Rider Reports</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">
                          {statistics.rider_reports}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resolution Status */}
              {statistics && (
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      Resolution Status
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Current resolution status overview</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Resolved</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {statistics.resolved_reports}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Unresolved</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          {statistics.unresolved_reports}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Map View Tab */}
          <TabsContent value="map" className="space-y-8">
            {panicReports && panicReports.length > 0 ? (
              <PanicMap
                reports={panicReports as PanicReport[]}
                selectedReport={selectedReport}
                onReportSelect={setSelectedReport}
              />
            ) : (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardContent className="p-8 text-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit mx-auto mb-4">
                    <Map className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">No Panic Reports to Display</h3>
                  <p className="text-sm text-muted-foreground">
                    There are currently no panic reports to display on the map.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Map Modal */}
      <PanicMapModal
        isOpen={showMapModal}
        onClose={handleCloseMapModal}
        report={modalReport}
      />

      {/* Map Preview on Hover */}
      {hoveredReport && (
        <MapPreview
          report={hoveredReport}
          isVisible={true}
          position={previewPosition}
        />
      )}
    </AdminLayout>
  );
};

export default PanicManagementEnhanced;
