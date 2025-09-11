import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Globe,
  Database,
  Mail,
  Smartphone,
  CreditCard,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Monitor,
  Moon,
  Sun,
  Palette,
  Languages,
  Clock,
  MapPin,
  DollarSign,
  Percent,
  Users,
  Car,
  MessageSquare,
  FileText,
  BarChart3,
  Zap,
  Target,
  Activity,
  TrendingUp,
  Star,
  Award,
  Crown,
  Gem,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Settings = () => {
  // State for different settings sections
  const [generalSettings, setGeneralSettings] = useState({
    appName: "H-Cab Admin",
    appVersion: "3.0.0",
    timezone: "UTC",
    language: "en",
    theme: "system",
    autoRefresh: true,
    refreshInterval: 30,
    notifications: true,
    soundEnabled: true,
    emailNotifications: true,
    pushNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: "",
    auditLogging: true,
    dataEncryption: true,
    backupEnabled: true,
    backupFrequency: "daily"
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    maxLogSize: 100,
    cacheEnabled: true,
    cacheTimeout: 300,
    rateLimitEnabled: true,
    maxRequests: 1000,
    databaseBackup: true,
    autoUpdate: false
  });

  const [businessSettings, setBusinessSettings] = useState({
    companyName: "H-Cab",
    companyEmail: "admin@hcab.com",
    companyPhone: "+1234567890",
    companyAddress: "123 Main St, City, Country",
    currency: "XAF",
    taxRate: 18.5,
    commissionRate: 15.0,
    minRideFare: 500,
    maxRideFare: 50000,
    driverCommission: 80.0,
    platformFee: 5.0
  });

  const [apiSettings, setApiSettings] = useState({
    googleMapsKey: "",
    firebaseKey: "",
    paymentGateway: "stripe",
    smsProvider: "twilio",
    emailProvider: "smtp",
    webhookUrl: "",
    apiVersion: "v1",
    rateLimit: 1000,
    timeout: 30,
    retryAttempts: 3
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  const handleReset = (section: string) => {
    // Reset to default values
  };

  const SettingCard = ({ title, description, children, icon: Icon }: any) => (
    <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm opacity-30"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );

  const SettingItem = ({ label, description, children }: any) => (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent dark:from-blue-800/20 rounded-full blur-3xl"></div>
          
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                      <SettingsIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      System Settings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                      Configure and manage your application settings
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>Secure Configuration</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Updates</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Config
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Import Config
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <SettingCard title="Application Settings" description="Configure basic application preferences" icon={SettingsIcon}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingItem label="Application Name" description="The name displayed in the application">
                  <Input 
                    value={generalSettings.appName}
                    onChange={(e) => setGeneralSettings({...generalSettings, appName: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Application Version" description="Current version of the application">
                  <Input 
                    value={generalSettings.appVersion}
                    disabled
                    className="border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  />
                </SettingItem>
                
                <SettingItem label="Timezone" description="Default timezone for the application">
                  <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Language" description="Default language for the application">
                  <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Theme" description="Default theme for the application">
                  <Select value={generalSettings.theme} onValueChange={(value) => setGeneralSettings({...generalSettings, theme: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Auto Refresh" description="Automatically refresh data">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={generalSettings.autoRefresh}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, autoRefresh: checked})}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {generalSettings.autoRefresh ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </SettingItem>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => handleReset('general')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={() => handleSave('general')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </SettingCard>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <SettingCard title="Security Configuration" description="Manage security settings and access controls" icon={Shield}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingItem label="Two-Factor Authentication" description="Enable 2FA for enhanced security">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                    <Badge variant={securitySettings.twoFactorAuth ? "default" : "secondary"}>
                      {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Session Timeout" description="Session timeout in minutes">
                  <Input 
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Password Expiry" description="Password expiry in days">
                  <Input 
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Max Login Attempts" description="Maximum failed login attempts">
                  <Input 
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="IP Whitelist" description="Allowed IP addresses (one per line)">
                  <Textarea 
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                    rows={4}
                  />
                </SettingItem>
                
                <SettingItem label="Audit Logging" description="Enable audit logging for security events">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={securitySettings.auditLogging}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, auditLogging: checked})}
                    />
                    <Badge variant={securitySettings.auditLogging ? "default" : "secondary"}>
                      {securitySettings.auditLogging ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => handleReset('security')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={() => handleSave('security')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </SettingCard>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <SettingCard title="System Configuration" description="Configure system-level settings and performance" icon={Server}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingItem label="Maintenance Mode" description="Enable maintenance mode">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                    />
                    <Badge variant={systemSettings.maintenanceMode ? "destructive" : "secondary"}>
                      {systemSettings.maintenanceMode ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Debug Mode" description="Enable debug mode for development">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, debugMode: checked})}
                    />
                    <Badge variant={systemSettings.debugMode ? "default" : "secondary"}>
                      {systemSettings.debugMode ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Log Level" description="Set the logging level">
                  <Select value={systemSettings.logLevel} onValueChange={(value) => setSystemSettings({...systemSettings, logLevel: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Max Log Size (MB)" description="Maximum log file size">
                  <Input 
                    type="number"
                    value={systemSettings.maxLogSize}
                    onChange={(e) => setSystemSettings({...systemSettings, maxLogSize: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Cache Enabled" description="Enable system caching">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={systemSettings.cacheEnabled}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, cacheEnabled: checked})}
                    />
                    <Badge variant={systemSettings.cacheEnabled ? "default" : "secondary"}>
                      {systemSettings.cacheEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Cache Timeout (seconds)" description="Cache timeout duration">
                  <Input 
                    type="number"
                    value={systemSettings.cacheTimeout}
                    onChange={(e) => setSystemSettings({...systemSettings, cacheTimeout: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => handleReset('system')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={() => handleSave('system')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </SettingCard>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business" className="space-y-6">
            <SettingCard title="Business Configuration" description="Configure business settings and financial parameters" icon={DollarSign}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingItem label="Company Name" description="Your company name">
                  <Input 
                    value={businessSettings.companyName}
                    onChange={(e) => setBusinessSettings({...businessSettings, companyName: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Company Email" description="Primary company email">
                  <Input 
                    type="email"
                    value={businessSettings.companyEmail}
                    onChange={(e) => setBusinessSettings({...businessSettings, companyEmail: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Company Phone" description="Primary company phone">
                  <Input 
                    value={businessSettings.companyPhone}
                    onChange={(e) => setBusinessSettings({...businessSettings, companyPhone: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Company Address" description="Company physical address">
                  <Textarea 
                    value={businessSettings.companyAddress}
                    onChange={(e) => setBusinessSettings({...businessSettings, companyAddress: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                    rows={3}
                  />
                </SettingItem>
                
                <SettingItem label="Currency" description="Default currency">
                  <Select value={businessSettings.currency} onValueChange={(value) => setBusinessSettings({...businessSettings, currency: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XAF">XAF (Central African CFA Franc)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Tax Rate (%)" description="Default tax rate">
                  <Input 
                    type="number"
                    step="0.1"
                    value={businessSettings.taxRate}
                    onChange={(e) => setBusinessSettings({...businessSettings, taxRate: parseFloat(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Commission Rate (%)" description="Default commission rate">
                  <Input 
                    type="number"
                    step="0.1"
                    value={businessSettings.commissionRate}
                    onChange={(e) => setBusinessSettings({...businessSettings, commissionRate: parseFloat(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Min Ride Fare" description="Minimum ride fare">
                  <Input 
                    type="number"
                    value={businessSettings.minRideFare}
                    onChange={(e) => setBusinessSettings({...businessSettings, minRideFare: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Max Ride Fare" description="Maximum ride fare">
                  <Input 
                    type="number"
                    value={businessSettings.maxRideFare}
                    onChange={(e) => setBusinessSettings({...businessSettings, maxRideFare: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Driver Commission (%)" description="Driver commission percentage">
                  <Input 
                    type="number"
                    step="0.1"
                    value={businessSettings.driverCommission}
                    onChange={(e) => setBusinessSettings({...businessSettings, driverCommission: parseFloat(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
                
                <SettingItem label="Platform Fee (%)" description="Platform fee percentage">
                  <Input 
                    type="number"
                    step="0.1"
                    value={businessSettings.platformFee}
                    onChange={(e) => setBusinessSettings({...businessSettings, platformFee: parseFloat(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => handleReset('business')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={() => handleSave('business')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </SettingCard>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <SettingCard title="API Configuration" description="Configure API settings and integrations" icon={Globe}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingItem label="Google Maps API Key" description="API key for Google Maps integration">
                  <div className="relative">
                    <Input 
                      type="password"
                      value={apiSettings.googleMapsKey}
                      onChange={(e) => setApiSettings({...apiSettings, googleMapsKey: e.target.value})}
                      className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 pr-10"
                    />
                    <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </SettingItem>
                
                <SettingItem label="Firebase API Key" description="API key for Firebase services">
                  <div className="relative">
                    <Input 
                      type="password"
                      value={apiSettings.firebaseKey}
                      onChange={(e) => setApiSettings({...apiSettings, firebaseKey: e.target.value})}
                      className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 pr-10"
                    />
                    <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </SettingItem>
                
                <SettingItem label="Payment Gateway" description="Primary payment gateway">
                  <Select value={apiSettings.paymentGateway} onValueChange={(value) => setApiSettings({...apiSettings, paymentGateway: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="SMS Provider" description="SMS service provider">
                  <Select value={apiSettings.smsProvider} onValueChange={(value) => setApiSettings({...apiSettings, smsProvider: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="aws-sns">AWS SNS</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Email Provider" description="Email service provider">
                  <Select value={apiSettings.emailProvider} onValueChange={(value) => setApiSettings({...apiSettings, emailProvider: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">AWS SES</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Webhook URL" description="Webhook endpoint URL">
                  <Input 
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({...apiSettings, webhookUrl: e.target.value})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                    placeholder="https://example.com/webhook"
                  />
                </SettingItem>
                
                <SettingItem label="API Version" description="API version">
                  <Select value={apiSettings.apiVersion} onValueChange={(value) => setApiSettings({...apiSettings, apiVersion: value})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">v1</SelectItem>
                      <SelectItem value="v2">v2</SelectItem>
                      <SelectItem value="v3">v3</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                
                <SettingItem label="Rate Limit" description="API rate limit per minute">
                  <Input 
                    type="number"
                    value={apiSettings.rateLimit}
                    onChange={(e) => setApiSettings({...apiSettings, rateLimit: parseInt(e.target.value)})}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </SettingItem>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => handleReset('api')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={() => handleSave('api')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </SettingCard>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <SettingCard title="Notification Settings" description="Configure notification preferences and channels" icon={Bell}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingItem label="Email Notifications" description="Enable email notifications">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={generalSettings.emailNotifications}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, emailNotifications: checked})}
                    />
                    <Badge variant={generalSettings.emailNotifications ? "default" : "secondary"}>
                      {generalSettings.emailNotifications ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Push Notifications" description="Enable push notifications">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={generalSettings.pushNotifications}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, pushNotifications: checked})}
                    />
                    <Badge variant={generalSettings.pushNotifications ? "default" : "secondary"}>
                      {generalSettings.pushNotifications ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Sound Notifications" description="Enable sound for notifications">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={generalSettings.soundEnabled}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, soundEnabled: checked})}
                    />
                    <Badge variant={generalSettings.soundEnabled ? "default" : "secondary"}>
                      {generalSettings.soundEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </SettingItem>
                
                <SettingItem label="Notification Frequency" description="How often to send notifications">
                  <Select value={generalSettings.refreshInterval.toString()} onValueChange={(value) => setGeneralSettings({...generalSettings, refreshInterval: parseInt(value)})}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => handleReset('notifications')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={() => handleSave('notifications')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </SettingCard>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
