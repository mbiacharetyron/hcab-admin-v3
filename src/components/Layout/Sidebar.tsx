import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Users,
  DollarSign,
  MessageSquare,
  FileText,
  CreditCard,
  BarChart3,
  AlertTriangle,
  DollarSign as PayOut,
  HeadphonesIcon,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  Settings2,
  Receipt,
  Percent,
  Wallet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

// Import the H-Cab logo
import logoImage from '@/assets/images/logos/logo.png';

const menuItems = [
  {
    category: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard", badge: null, premium: false },
    ]
  },
  {
    category: "User Management",
    items: [
      { title: "Drivers", icon: Car, path: "/drivers", badge: null, premium: false },
      { title: "Riders", icon: Users, path: "/riders", badge: null, premium: false },
      { title: "User Devices", icon: Smartphone, path: "/user-devices", badge: "New", premium: false },
    ]
  },
  {
    category: "Operations",
    items: [
      { title: "Ride Options", icon: Settings2, path: "/ride-options", badge: null, premium: false },
      { title: "Panic Management", icon: AlertTriangle, path: "/panic-management", badge: "Critical", premium: true },
      { title: "Notifications", icon: Bell, path: "/notifications", badge: null, premium: false },
    ]
  },
  {
    category: "Financial",
    items: [
      { title: "Wallets", icon: Wallet, path: "/wallet-balances", badge: null, premium: false },
      { title: "Transaction Report", icon: Receipt, path: "/transaction-report", badge: null, premium: false },
      { title: "Revenue Report", icon: BarChart3, path: "/revenue-report", badge: null, premium: false },
      { title: "Discount Management", icon: Percent, path: "/discounts", badge: null, premium: false },
    ]
  },
  {
    category: "Analytics",
    items: [
      { title: "Booking Report", icon: FileText, path: "/booking-report", badge: null, premium: false },
    ]
  },
  {
    category: "System",
    items: [
      { title: "Settings", icon: Settings, path: "/settings", badge: null, premium: false },
    ]
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even if logout API fails
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen transition-all duration-500 ease-in-out",
        "bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
        "border-r border-slate-200/60 dark:border-slate-700/60",
        "shadow-2xl shadow-slate-200/20 dark:shadow-slate-900/40",
        "backdrop-blur-xl",
        collapsed ? "w-0 lg:w-20" : "w-72"
      )}>
        <div className="flex flex-col h-full relative">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          {/* Header */}
          <div className="relative p-6 border-b border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <img 
                        src={logoImage} 
                        alt="H-Cab Logo" 
                        className="w-8 h-8 object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      H-Cab Admin
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Management Portal
                    </p>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
            <div className="space-y-6">
              {menuItems.map((category, categoryIndex) => (
                <div key={category.category} className="space-y-2">
                  {!collapsed && (
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {category.category}
                      </h3>
                    </div>
                  )}
                  <ul className="space-y-1">
                    {category.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.path}>
                          <NavLink
                            to={item.path}
                            className={cn(
                              "group relative flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                              "hover:scale-[1.02] active:scale-[0.98]",
                              isActive 
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100",
                              collapsed && "justify-center px-3"
                            )}
                          >
                            {/* Active indicator */}
                            {isActive && !collapsed && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-sm" />
                            )}
                            
                            {/* Icon with premium indicator */}
                            <div className="relative">
                              <item.icon className={cn(
                                "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                                isActive && "text-white",
                                item.premium && "text-amber-500"
                              )} />
                              {item.premium && (
                                <Crown className="absolute -top-1 -right-1 w-3 h-3 text-amber-500" />
                              )}
                            </div>
                            
                            {!collapsed && (
                              <>
                                <span className="truncate flex-1">{item.title}</span>
                                {item.badge && (
                                  <Badge 
                                    variant={item.badge === "Critical" ? "destructive" : "secondary"}
                                    className={cn(
                                      "text-xs px-2 py-0.5",
                                      item.badge === "Critical" && "bg-red-500 text-white",
                                      item.badge === "New" && "bg-green-500 text-white"
                                    )}
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </>
                            )}
                            
                            {/* Hover effect */}
                            {!isActive && (
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/5 group-hover:to-purple-600/5 transition-all duration-300" />
                            )}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer with User Profile and Logout */}
          <div className="relative p-4 border-t border-slate-200/60 dark:border-slate-700/60 space-y-3">
            {!collapsed && (
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Theme Toggle */}
            <div className={cn("flex justify-center", !collapsed && "w-full")}>
              <ThemeToggle />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cn(
                "w-full border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300",
                collapsed && "w-12 h-12 p-0"
              )}
            >
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : (
                <>
                  <LogOut className={cn("w-4 h-4", !collapsed && "mr-2")} />
                  {!collapsed && "Sign Out"}
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Toggle button for desktop */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-6 left-6 z-40 hidden lg:flex shadow-lg border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>
    </>
  );
};