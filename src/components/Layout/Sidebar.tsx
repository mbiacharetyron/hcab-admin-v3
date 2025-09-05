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
  Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

// Import the H-Cab logo
import logoImage from '@/assets/images/logos/logo.png';

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Drivers", icon: Car, path: "/drivers" },
  { title: "Ride Options", icon: Settings2, path: "/ride-options" },
  { title: "Riders", icon: Users, path: "/riders" },
  { title: "Ride Fare", icon: DollarSign, path: "/ride-fare" },
  { title: "Support Messages", icon: MessageSquare, path: "/support" },
  { title: "Booking Report", icon: FileText, path: "/booking-report" },
  { title: "Transaction Report", icon: CreditCard, path: "/transaction-report" },
  { title: "Revenue Report", icon: BarChart3, path: "/revenue-report" },
  { title: "Panic Management", icon: AlertTriangle, path: "/panic" },
  { title: "Pay-outs", icon: PayOut, path: "/payouts" },
  { title: "Supports", icon: HeadphonesIcon, path: "/supports" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Settings", icon: Settings, path: "/settings" },
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-white border-r border-border transition-all duration-300 shadow-medium",
        collapsed ? "w-0 lg:w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <div className="flex items-center space-x-2">
                  <img 
                      src={logoImage} 
                      alt="H-Cab Logo" 
                      className="w-full h-full object-contain"
                    />
                  
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="lg:hidden"
              >
                {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-soft" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5 shrink-0")} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-border space-y-2">
            {!collapsed && (
              <div className="flex items-center space-x-3 p-2 bg-primary-light rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-primary/70 truncate">{user?.role || 'administrator'}</p>
                </div>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cn(
                "w-full",
                collapsed && "w-10 h-10 p-0"
              )}
            >
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : (
                <>
                  <LogOut className={cn("w-4 h-4", !collapsed && "mr-2")} />
                  {!collapsed && "Logout"}
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
        className="fixed top-4 left-4 z-40 hidden lg:flex lg:left-2"
      >
        <Menu className="w-4 h-4" />
      </Button>
    </>
  );
};