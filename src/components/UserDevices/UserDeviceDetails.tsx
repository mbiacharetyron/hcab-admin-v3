import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  Smartphone, 
  Apple, 
  Smartphone as Android, 
  Globe, 
  Clock, 
  Calendar,
  Battery,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  User,
  Mail,
  Phone,
  Shield,
  Activity,
  MapPin,
  Settings,
  Monitor,
  Tablet,
  Laptop
} from "lucide-react";
import { format } from "date-fns";
import type { User as UserType, Device } from "@/hooks/useUserDevices";

interface UserDeviceDetailsProps {
  user: UserType;
  children?: React.ReactNode;
}

// Device type icons mapping
const getDeviceTypeIcon = (deviceType: string, size: string = "w-6 h-6") => {
  switch (deviceType) {
    case 'ios':
      return <Apple className={`${size} text-gray-600`} />;
    case 'android':
      return <Android className={`${size} text-green-600`} />;
    case 'web':
      return <Globe className={`${size} text-blue-600`} />;
    default:
      return <Smartphone className={`${size} text-gray-600`} />;
  }
};

// Device type badge colors
const getDeviceTypeBadge = (deviceType: string) => {
  switch (deviceType) {
    case 'ios':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200';
    case 'android':
      return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-200';
    case 'web':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200';
  }
};

// Device status badge
const getDeviceStatusBadge = (isActive: boolean) => {
  return isActive 
    ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-200'
    : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200';
};

// User status badge
const getUserStatusBadge = (isActive: boolean, isOnline: boolean) => {
  if (!isActive) return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200';
  if (isOnline) return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-200';
  return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-200';
};

// Role badge colors
const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200';
    case 'driver':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200';
    case 'rider':
      return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200';
  }
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy 'at' HH:mm");
  } catch (error) {
    return "Invalid Date";
  }
};

const getLastActiveTime = (devices: Device[]) => {
  if (devices.length === 0) return "Never";
  
  try {
    const lastActiveTimes = devices
      .filter(d => d.last_active_at)
      .map(d => new Date(d.last_active_at).getTime());
    
    if (lastActiveTimes.length > 0) {
      const mostRecent = Math.max(...lastActiveTimes);
      return format(new Date(mostRecent), "MMM dd, yyyy 'at' HH:mm");
    }
    return "Never";
  } catch (error) {
    return "Invalid Date";
  }
};

export const UserDeviceDetails = ({ user, children }: UserDeviceDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="h-8 px-3">
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xl font-bold">{user.name}</div>
              <div className="text-sm text-muted-foreground">User ID: {user.id}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete device information and user details for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>User Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">{user.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Member Since</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.created_at)}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge className={getRoleBadge(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getUserStatusBadge(user.is_active, user.is_online)}>
                      {!user.is_active ? 'Inactive' : user.is_online ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Last Active</div>
                      <div className="text-sm text-muted-foreground">{getLastActiveTime(user.devices)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Device Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {user.device_count}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Total Devices</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {user.active_device_count}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">Active Devices</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <XCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                        {user.device_count - user.active_device_count}
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">Inactive Devices</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Device Type Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['ios', 'android', 'web'].map((type) => {
                  const count = user.devices.filter(d => d.device_type === type).length;
                  const percentage = user.device_count > 0 ? (count / user.device_count) * 100 : 0;
                  
                  return (
                    <div key={type} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                      <div className="p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
                        {getDeviceTypeIcon(type, "w-6 h-6")}
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                          {count}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {type.charAt(0).toUpperCase() + type.slice(1)} Devices
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}% of total
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* All Devices List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>All Devices ({user.devices.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.devices.length === 0 ? (
                <div className="text-center py-8">
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No devices registered</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.devices.map((device, index) => (
                    <div key={device.id}>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
                            {getDeviceTypeIcon(device.device_type, "w-8 h-8")}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                {device.device_name}
                              </h4>
                              <Badge className={getDeviceTypeBadge(device.device_type)}>
                                {device.device_type.toUpperCase()}
                              </Badge>
                              <Badge className={getDeviceStatusBadge(device.is_active)}>
                                {device.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {device.device_model} • {device.os_version}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              App Version: {device.app_version}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Registered: {formatDate(device.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Last Active: {formatDate(device.last_active_at)}</span>
                          </div>
                        </div>
                      </div>
                      {index < user.devices.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
