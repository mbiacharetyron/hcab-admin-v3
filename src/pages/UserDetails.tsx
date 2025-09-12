import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Car, 
  CreditCard, 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Calendar,
  Globe,
  Key,
  Lock,
  Unlock,
  Eye,
  Download,
  Star,
  TrendingUp,
  Activity,
  MapPin as LocationIcon,
  Building2,
  CreditCard as CardIcon,
  FileCheck,
  AlertCircle,
  Info,
  Settings2,
  UserMinus,
  UserPlus,
  ThumbsUp,
  ThumbsDown,
  Percent,
  ClipboardList,
  Crown,
  Gem,
  Award,
  Target,
  Zap,
  Sparkles,
  Heart,
  Trophy,
  Medal,
  Badge as BadgeIcon,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  LineChart,
  Monitor,
  Smartphone,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Map,
  Navigation,
  Route,
  Timer,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Layers,
  Grid3X3,
  Layout,
  PanelLeft,
  PanelRight,
  Sidebar,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Move,
  Copy,
  Scissors,
  Edit,
  Trash2,
  Save,
  Upload,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  List,
  Grid,
  Table,
  Database,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Wrench,
  Settings,
  Cog,
  Palette,
  Brush,
  Eraser,
  Paintbrush,
  Pen,
  Pencil,
  Highlighter,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Command,
  Keyboard,
  Mouse,
  Touchpad,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Camera,
  Video,
  Image,
  Film,
  Music,
  HeadphonesIcon,
  Speaker,
  Bluetooth,
  Wifi as WifiIcon,
  Signal as SignalIcon,
  Battery as BatteryIcon,
  Power,
  Plug,
  Zap as Lightning,
  Flashlight,
  FlashlightOff,
  Lightbulb,
  LightbulbOff,
  Lamp,
  LampDesk,
  LampFloor,
  LampWallUp,
  LampCeiling,
  Flame as Fire,
  Snowflake as Snow,
  Sun as SunIcon,
  Moon as MoonIcon,
  Cloud as CloudIcon,
  CloudRain as Rain,
  CloudSnow as SnowIcon,
  Wind as WindIcon,
  Droplets as Drops,
  Thermometer as Temp,
  Gauge as Speed,
  Layers as Stack,
  Grid3X3 as GridIcon,
  Layout as LayoutIcon,
  PanelLeft as PanelL,
  PanelRight as PanelR,
  Sidebar as SidebarIcon,
  Menu as MenuIcon,
  MoreHorizontal as MoreH,
  MoreVertical as MoreV,
  Plus as PlusIcon,
  Minus as MinusIcon,
  X as XIcon,
  Check as CheckIcon,
  ChevronDown as ChevronD,
  ChevronUp as ChevronU,
  ChevronLeft as ChevronL,
  ChevronRight as ChevronR,
  ArrowUp as ArrowU,
  ArrowDown as ArrowD,
  ArrowRight as ArrowR,
  RotateCcw as RotateL,
  RotateCw as RotateR,
  Maximize as MaxIcon,
  Minimize as MinIcon,
  Move as MoveIcon,
  Copy as CopyIcon,
  Scissors as CutIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  SortAsc as SortUp,
  SortDesc as SortDown,
  List as ListIcon,
  Grid as GridIcon2,
  Table as TableIcon,
  Database as DbIcon,
  Server as ServerIcon,
  HardDrive as HdIcon,
  Cpu as CpuIcon,
  MemoryStick as RamIcon,
  Wrench as WrenchIcon,
  Settings as SettingsIcon,
  Cog as CogIcon,
  Palette as PaletteIcon,
  Brush as BrushIcon,
  Eraser as EraserIcon,
  Paintbrush as PaintIcon,
  Pen as PenIcon,
  Pencil as PencilIcon,
  Highlighter as HighlighterIcon,
  Type as TypeIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikeIcon,
  AlignLeft as AlignL,
  AlignCenter as AlignC,
  AlignRight as AlignR,
  AlignJustify as AlignJ,
  Indent as IndentIcon,
  Outdent as OutdentIcon,
  ListOrdered as ListO,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Command as CommandIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Touchpad as TouchIcon,
  Headphones as HeadphonesIcon2,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Volume2 as VolumeIcon,
  VolumeX as VolumeOffIcon,
  PlayCircle as PlayC,
  PauseCircle as PauseC,
  StopCircle as StopC,
  SkipBack as SkipB,
  SkipForward as SkipF,
  Repeat as RepeatIcon,
  Shuffle as ShuffleIcon,
  Radio as RadioIcon,
  Tv as TvIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Image as ImageIcon,
  Film as FilmIcon,
  Music as MusicIcon,
  Speaker as SpeakerIcon,
  Bluetooth as BluetoothIcon,
  Power as PowerIcon,
  Plug as PlugIcon,
  Flashlight as FlashIcon,
  FlashlightOff as FlashOffIcon,
  Lightbulb as LightIcon,
  LightbulbOff as LightOffIcon,
  Lamp as LampIcon,
  LampDesk as DeskIcon,
  LampFloor as FloorIcon,
  LampWallUp as WallIcon,
  LampCeiling as CeilingIcon,
  Wallet
} from "lucide-react";
import { useUserDetails, useDeleteUserAccount } from "@/hooks/useUserDetails";
import { useDriverValidationStatus, useValidateDriver } from "@/hooks/useDriverValidation";
import { useDriverRideOptions, useUnassignDriver, useAssignDriver, useRideOptions } from "@/hooks/useRideOptions";
import { useParams, useNavigate } from "react-router-dom";
import UserWalletTransactions from "@/components/UserWalletTransactions";
import DriverDocumentUpload from "@/components/DriverDocumentUpload";
import { format } from "date-fns";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userResponse, isLoading, error, refetch } = useUserDetails(Number(userId));

  // Driver validation hooks
  const { data: validationResponse, isLoading: validationLoading, refetch: refetchValidation } = useDriverValidationStatus(Number(userId), 'en');
  const validateDriver = useValidateDriver();

  // Driver ride options hooks
  const { data: rideOptionsResponse, isLoading: rideOptionsLoading, refetch: refetchRideOptions } = useDriverRideOptions(Number(userId));
  const { data: allRideOptionsResponse, isLoading: allRideOptionsLoading } = useRideOptions('en');
  const unassignDriver = useUnassignDriver();
  const assignDriver = useAssignDriver();

  // Delete user account hook
  const deleteUserAccount = useDeleteUserAccount();

  // State for validation dialog
  const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false);
  const [validationAction, setValidationAction] = useState<'approve' | 'reject'>('approve');
  const [validationReason, setValidationReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);

  // State for assignment dialog
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [selectedRideOptionId, setSelectedRideOptionId] = useState<number | null>(null);

  // State for delete user dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  const user = userResponse?.data;
  const validationData = validationResponse?.data;
  const rideOptions = rideOptionsResponse?.data || [];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Loading user details...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !user) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">User Details</h1>
          </div>
          
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">Failed to Load User Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {error?.message || "Unable to load user details"}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => refetch()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const getStatusBadge = (status: boolean, trueText: string, falseText: string) => {
    return (
      <Badge variant={status ? "default" : "secondary"} className="flex items-center gap-1">
        {status ? (
          <>
            <CheckCircle className="w-3 h-3" />
            {trueText}
          </>
        ) : (
          <>
            <XCircle className="w-3 h-3" />
            {falseText}
          </>
        )}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  const getDocumentStatus = () => {
    const documents = [
      { name: "Bank Details", status: user.bank_submitted, icon: <Building2 className="w-4 h-4" /> },
      { name: "Car Details", status: user.car_submitted, icon: <Car className="w-4 h-4" /> },
      { name: "Documents", status: user.doc_submitted, icon: <FileText className="w-4 h-4" /> },
      { name: "Car Photos", status: user.car_photos_submitted, icon: <Eye className="w-4 h-4" /> },
      { name: "ID Document", status: user.id_document_submitted, icon: <FileCheck className="w-4 h-4" /> },
      { name: "License", status: user.license_submitted, icon: <Key className="w-4 h-4" /> },
      { name: "Insurance", status: user.insurance_submitted, icon: <Shield className="w-4 h-4" /> },
      { name: "Registration", status: user.registration_submitted, icon: <FileText className="w-4 h-4" /> },
      { name: "Inspection", status: user.car_inspection_submitted, icon: <CheckCircle className="w-4 h-4" /> }
    ];

    return documents;
  };

  const handleValidation = async () => {
    if (!validationReason.trim()) return;

    try {
      // For invalidation, we use 'reject' action
      const action = user.is_validated ? 'reject' : validationAction;
      
      await validateDriver.mutateAsync({
        driverId: Number(userId),
        data: {
          action: action,
          reason: validationReason,
          admin_notes: adminNotes,
          lang: 'en'
        }
      });
      
      setIsValidationDialogOpen(false);
      setValidationReason('');
      setAdminNotes('');
      refetchValidation();
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleUnassignRideOption = async (rideOptionId: number) => {
    if (confirm('Are you sure you want to unassign this driver from the ride option?')) {
      try {
        await unassignDriver.mutateAsync({
          ride_option_id: rideOptionId,
          driver_id: Number(userId)
        });
        refetchRideOptions();
      } catch (error) {
        console.error('Unassignment error:', error);
      }
    }
  };

  const handleAssignRideOption = async () => {
    if (!selectedRideOptionId) return;

    try {
      await assignDriver.mutateAsync({
        ride_option_id: selectedRideOptionId,
        driver_id: Number(userId)
      });
      
      setIsAssignmentDialogOpen(false);
      setSelectedRideOptionId(null);
      refetchRideOptions();
    } catch (error) {
      console.error('Assignment error:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteReason.trim()) return;

    try {
      await deleteUserAccount.mutateAsync(Number(userId));
      setIsDeleteDialogOpen(false);
      setDeleteReason('');
      // Navigate back to users list after successful deletion
      navigate('/users', { replace: true });
    } catch (error) {
      console.error('Delete user error:', error);
    }
  };

  // Get available ride options (not already assigned)
  const availableRideOptions = allRideOptionsResponse?.data?.filter(option => 
    !rideOptions.some(assigned => assigned.id === option.id && assigned.is_assigned)
  ) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-2xl">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-indigo-600/90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-6 right-6 text-white/20 animate-bounce delay-300">
            <Crown className="w-8 h-8" />
          </div>
          <div className="absolute bottom-6 left-6 text-white/20 animate-bounce delay-700">
            <Gem className="w-6 h-6" />
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                    <div className="relative bg-white/20 p-2 rounded-full">
                      <User className="w-6 h-6" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    User Details
                  </h1>
                </div>
                <p className="text-white/80 text-lg font-medium">Complete profile and account information</p>
                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure Access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Data</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Analytics Ready</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="bg-red-500/20 backdrop-blur-md border-red-300/30 text-white hover:bg-red-500/30 transition-all duration-300 shadow-lg"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced User Profile Header */}
        <Card className="overflow-hidden shadow-2xl border-0">
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-indigo-600/90"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-24 -translate-y-24"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 text-white/20 animate-pulse">
              <Star className="w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 text-white/20 animate-pulse delay-500">
              <Sparkles className="w-5 h-5" />
            </div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center space-x-8">
                {/* Enhanced Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg scale-110"></div>
                  <Avatar className="relative w-28 h-28 border-4 border-white/30 shadow-2xl">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="text-3xl bg-white/20 text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online Status Indicator */}
                  <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                    user.is_online ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <div className={`w-full h-full rounded-full ${
                      user.is_online ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
                    }`}></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {user.name}
                    </h2>
                    <p className="text-white/80 text-xl font-medium">@{user.username}</p>
                  </div>
                  
                  {/* Enhanced Badges */}
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                          <div className="relative bg-white/20 p-1 rounded-full">
                            <User className="w-3 h-3" />
                          </div>
                        </div>
                        <span className="font-semibold">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </div>
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                          <div className="relative bg-white/20 p-1 rounded-full">
                            <Globe className="w-3 h-3" />
                          </div>
                        </div>
                        <span className="font-semibold">{user.language.toUpperCase()}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex items-center space-x-6 text-sm text-white/70">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(user.created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Last seen {formatDate(user.last_login_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Status Section */}
              <div className="text-right space-y-3">
                <div className="flex items-center space-x-3">
                  {getStatusBadge(user.is_active, "Active", "Inactive")}
                  {getStatusBadge(user.is_online, "Online", "Offline")}
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(user.is_validated, "Validated", "Not Validated")}
                  {getStatusBadge(user.otp_verified, "Verified", "Unverified")}
                </div>
                
                {/* Additional Status Indicators */}
                <div className="flex items-center space-x-3 pt-2">
                  <div className="flex items-center space-x-1 text-white/70">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Security</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/70">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Activity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-8 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-2">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-blue-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <User className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="vehicle" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-green-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <Car className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Vehicle</span>
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-orange-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Documents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="financial" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-yellow-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Financial</span>
              </TabsTrigger>
              <TabsTrigger 
                value="wallet" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-emerald-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Wallet</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ride-options" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-purple-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <Settings2 className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Ride Options</span>
              </TabsTrigger>
              <TabsTrigger 
                value="validation" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-indigo-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Validation</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm opacity-0 data-[state=active]:opacity-100 transition-opacity"></div>
                  <div className="relative bg-red-500/10 p-1 rounded-full data-[state=active]:bg-white/20">
                    <Shield className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-medium">Security</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Contact Information */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
                      <div className="relative bg-blue-500 p-2 rounded-full">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Contact Information
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-blue-100">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"></div>
                      <div className="relative bg-blue-500/10 p-2 rounded-full">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email Address</p>
                      <p className="font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-green-100">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm"></div>
                      <div className="relative bg-green-500/10 p-2 rounded-full">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                      <p className="font-semibold text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-purple-100">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm"></div>
                      <div className="relative bg-purple-500/10 p-2 rounded-full">
                        <LocationIcon className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Location</p>
                      <p className="font-semibold text-gray-800">{user.latitude}, {user.longitude}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Account Status */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-30"></div>
                      <div className="relative bg-green-500 p-2 rounded-full">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Account Status
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm"></div>
                        <div className="relative bg-green-500/10 p-2 rounded-full w-12 h-12 mx-auto mb-2">
                          <Key className="w-6 h-6 text-green-600 mx-auto" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{user.passcode_attempts}</p>
                      <p className="text-xs text-gray-600 font-medium">Passcode Attempts</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"></div>
                        <div className="relative bg-blue-500/10 p-2 rounded-full w-12 h-12 mx-auto mb-2">
                          <Lock className="w-6 h-6 text-blue-600 mx-auto" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {user.has_active_passcode ? "1" : "0"}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">Active Passcode</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-sm"></div>
                          <div className="relative bg-orange-500/10 p-1 rounded-full">
                            <Car className="w-4 h-4 text-orange-600" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">In Drive</span>
                      </div>
                      {getStatusBadge(user.in_drive, "Yes", "No")}
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm"></div>
                          <div className="relative bg-purple-500/10 p-1 rounded-full">
                            <Settings2 className="w-4 h-4 text-purple-600" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Cab Mode</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        {user.cab_mode || "Not Set"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Timeline */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-30"></div>
                      <div className="relative bg-purple-500 p-2 rounded-full">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Timeline
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-3 bg-white/50 rounded-xl border border-blue-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"></div>
                        <div className="relative bg-blue-500/10 p-2 rounded-full">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Account Created</p>
                        <p className="text-xs text-gray-600">{formatDate(user.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white/50 rounded-xl border border-green-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm"></div>
                        <div className="relative bg-green-500/10 p-2 rounded-full">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Last Login</p>
                        <p className="text-xs text-gray-600">{formatDate(user.last_login_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white/50 rounded-xl border border-purple-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm"></div>
                        <div className="relative bg-purple-500/10 p-2 rounded-full">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Last Updated</p>
                        <p className="text-xs text-gray-600">{formatDate(user.updated_at)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm"></div>
                      <div className="relative bg-purple-500/10 p-2 rounded-full w-12 h-12 mx-auto mb-3">
                        <Star className="w-6 h-6 text-purple-600 mx-auto" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium mb-2">Referral Code</p>
                    <p className="font-mono text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {user.referral_code}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vehicle Tab */}
          <TabsContent value="vehicle" className="space-y-6">
            {user.car_details ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      Vehicle Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Brand</p>
                        <p className="font-semibold">{user.car_details.car_brand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Model</p>
                        <p className="font-semibold">{user.car_details.car_brand_model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-semibold">{user.car_details.model_year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-semibold capitalize">{user.car_details.car_color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">License Plate</p>
                        <p className="font-mono font-semibold">{user.car_details.license_plate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Seats</p>
                        <p className="font-semibold">{user.car_details.seat_number}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5" />
                      Vehicle Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getDocumentStatus().slice(1, 5).map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {doc.icon}
                            <span className="font-medium">{doc.name}</span>
                          </div>
                          {getStatusBadge(doc.status, "Complete", "Pending")}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Car className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Vehicle Information</h3>
                  <p className="text-muted-foreground">This user hasn't submitted vehicle details yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Admin Document Upload Section */}
            {user.role === 'driver' && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Admin Document Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Submit or update driver documents on behalf of {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Follow the correct order: Car Details → Car Photos → ID Document → License → Insurance → Registration → Inspection
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsDocumentUploadOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {user.driver_documents ? (
              <div className="space-y-6">
                {/* Document Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5" />
                      Document Status Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {getDocumentStatus().map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {doc.icon}
                            <span className="text-sm font-medium">{doc.name}</span>
                          </div>
                          {getStatusBadge(doc.status, "✓", "✗")}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Document Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* License Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        Driver's License
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">License Number</p>
                          <p className="font-mono font-semibold">{user.driver_documents.license_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="font-semibold">{formatDate(user.driver_documents.expiry_date)}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={user.driver_documents.license_front_side} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Front
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={user.driver_documents.license_back_side} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Back
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insurance Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Insurance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Insurance Number</p>
                          <p className="font-mono font-semibold">{user.driver_documents.insurance_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="font-semibold">{formatDate(user.driver_documents.insurance_expiry_date)}</p>
                        </div>
                      </div>
                      <Separator />
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <a href={user.driver_documents.insurance_image} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Insurance Document
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* ID Document */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="w-5 h-5" />
                        ID Document
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Document Type</p>
                          <p className="font-semibold capitalize">{user.driver_documents.id_document_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Document Number</p>
                          <p className="font-mono font-semibold">{user.driver_documents.id_document_number}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={user.driver_documents.id_document_front} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Front
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={user.driver_documents.id_document_back} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Back
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Car Registration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Car Registration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Registration Number</p>
                          <p className="font-mono font-semibold">{user.driver_documents.car_registration || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="font-semibold">{formatDate(user.driver_documents.car_registration_expiry_date)}</p>
                        </div>
                      </div>
                      <Separator />
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <a href={user.driver_documents.car_registration_photo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Registration Document
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Documents Available</h3>
                  <p className="text-muted-foreground">This user hasn't submitted any documents yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            {user.bank_details ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Banking Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Bank Name</p>
                        <p className="text-xl font-semibold">{user.bank_details.bank_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <p className="text-xl font-mono font-semibold">{user.bank_details.account_number}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <p className="text-xl font-mono font-semibold">{user.bank_details.ifsc_code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Beneficiary Name</p>
                        <p className="text-xl font-semibold">{user.bank_details.beneficiary_name}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Banking Information</h3>
                  <p className="text-muted-foreground">This user hasn't submitted banking details yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Wallet Transactions Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <UserWalletTransactions userId={parseInt(userId)} />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Passcode Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Passcode Status</span>
                      {getStatusBadge(user.has_active_passcode, "Active", "Inactive")}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Failed Attempts</span>
                      <Badge variant={user.passcode_attempts > 3 ? "destructive" : "secondary"}>
                        {user.passcode_attempts}
                      </Badge>
                    </div>
                    {user.passcode_activated_at && (
                      <div>
                        <p className="text-sm text-muted-foreground">Activated</p>
                        <p className="font-semibold">{formatDate(user.passcode_activated_at)}</p>
                      </div>
                    )}
                    {user.passcode_last_used_at && (
                      <div>
                        <p className="text-sm text-muted-foreground">Last Used</p>
                        <p className="font-semibold">{formatDate(user.passcode_last_used_at)}</p>
                      </div>
                    )}
                    {user.passcode_locked_until && (
                      <div>
                        <p className="text-sm text-muted-foreground">Locked Until</p>
                        <p className="font-semibold text-destructive">{formatDate(user.passcode_locked_until)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Account Status</span>
                      {getStatusBadge(user.is_active, "Active", "Inactive")}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phone Verified</span>
                      {getStatusBadge(user.otp_verified, "Verified", "Unverified")}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Account Validated</span>
                      {getStatusBadge(user.is_validated, "Validated", "Not Validated")}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Currently Online</span>
                      {getStatusBadge(user.is_online, "Online", "Offline")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ride Options Tab */}
          <TabsContent value="ride-options" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Assigned Ride Options</h3>
                  <p className="text-sm text-muted-foreground">Manage driver's ride option assignments</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => refetchRideOptions()}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  {availableRideOptions.length > 0 && (
                    <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Assign Ride Option
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Assign Ride Option</DialogTitle>
                          <DialogDescription>
                            Select a ride option to assign to this driver.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="ride-option">Available Ride Options</Label>
                            <Select value={selectedRideOptionId?.toString() || ''} onValueChange={(value) => setSelectedRideOptionId(Number(value))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a ride option..." />
                              </SelectTrigger>
                              <SelectContent>
                                {availableRideOptions.map((option) => (
                                  <SelectItem key={option.id} value={option.id.toString()}>
                                    <div className="flex flex-col">
                                      <span className="font-medium">{option.name}</span>
                                      <span className="text-sm text-muted-foreground">
                                        ${option.base_price} base + ${option.price_per_km}/km • {option.seat_capacity} seats
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleAssignRideOption} 
                            disabled={!selectedRideOptionId || assignDriver.isPending}
                          >
                            {assignDriver.isPending ? 'Assigning...' : 'Assign Driver'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {rideOptionsLoading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <RefreshCw className="w-8 h-8 mx-auto animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Loading ride options...</p>
                  </CardContent>
                </Card>
              ) : rideOptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rideOptions.map((option) => (
                    <Card key={option.id} className={option.is_assigned ? "border-green-200 bg-green-50" : "border-gray-200"}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{option.name}</CardTitle>
                          <Badge variant={option.is_assigned ? "default" : "secondary"}>
                            {option.is_assigned ? "Assigned" : "Not Assigned"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Base Price:</span>
                            <span className="font-medium">${option.base_price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Price/KM:</span>
                            <span className="font-medium">${option.price_per_km}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Seats:</span>
                            <span className="font-medium">{option.seat_capacity}</span>
                          </div>
                          {option.ride_class && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Class:</span>
                              <Badge variant="outline">{option.ride_class.name}</Badge>
                            </div>
                          )}
                        </div>
                        {option.description && (
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        )}
                        {option.is_assigned && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUnassignRideOption(option.id)}
                            className="w-full"
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            Unassign
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Settings2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Ride Options Available</h3>
                    <p className="text-muted-foreground">
                      {availableRideOptions.length === 0 
                        ? "All ride options have been assigned to this driver."
                        : "This driver hasn't been assigned to any ride options yet."
                      }
                    </p>
                    {availableRideOptions.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Use the "Assign Ride Option" button above to assign available options.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Validation Tab */}
          <TabsContent value="validation" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Driver Validation</h3>
                  <p className="text-sm text-muted-foreground">Review and validate driver application</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => refetchValidation()}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  {validationData?.can_be_validated && (
                    <Dialog open={isValidationDialogOpen} onOpenChange={setIsValidationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant={user.is_validated ? "destructive" : "default"}>
                          {user.is_validated ? (
                            <>
                              <ThumbsDown className="w-4 h-4 mr-2" />
                              Invalidate Driver
                            </>
                          ) : (
                            <>
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Validate Driver
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>
                            {user.is_validated ? 'Invalidate Driver' : 'Validate Driver'}
                          </DialogTitle>
                          <DialogDescription>
                            {user.is_validated 
                              ? 'Invalidate this driver and remove their validation status.'
                              : 'Approve or reject this driver\'s application.'
                            }
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {!user.is_validated && (
                            <div className="space-y-2">
                              <Label htmlFor="action">Action</Label>
                              <Select value={validationAction} onValueChange={(value: 'approve' | 'reject') => setValidationAction(value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="approve">Approve</SelectItem>
                                  <SelectItem value="reject">Reject</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="reason">Reason *</Label>
                            <Textarea
                              id="reason"
                              placeholder="Enter the reason for this action..."
                              value={validationReason}
                              onChange={(e) => setValidationReason(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="admin_notes">Admin Notes (Optional)</Label>
                            <Textarea
                              id="admin_notes"
                              placeholder="Additional notes for internal use..."
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              rows={2}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsValidationDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleValidation} 
                            disabled={!validationReason.trim() || validateDriver.isPending}
                            className={user.is_validated ? 'bg-red-600 hover:bg-red-700' : (validationAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700')}
                          >
                            {validateDriver.isPending 
                              ? 'Processing...' 
                              : user.is_validated 
                                ? 'Invalidate Driver'
                                : `${validationAction === 'approve' ? 'Approve' : 'Reject'} Driver`
                            }
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {validationLoading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <RefreshCw className="w-8 h-8 mx-auto animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Loading validation status...</p>
                  </CardContent>
                </Card>
              ) : validationData ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Validation Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" />
                        Validation Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Status</span>
                        {getStatusBadge(user.is_validated, "Validated", "Not Validated")}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Can Be Validated</span>
                        {getStatusBadge(validationData.can_be_validated, "Yes", "No")}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Completion</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${validationData.completion_percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{validationData.completion_percentage}%</span>
                        </div>
                      </div>
                      {validationData.missing_requirements.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Missing Requirements:</p>
                          <div className="space-y-1">
                            {validationData.missing_requirements.map((req, index) => (
                              <Badge key={index} variant="destructive" className="mr-1">
                                {req.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Document Submission Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="w-5 h-5" />
                        Document Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(validationData.submission_status).map(([key, status]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{key.replace('_', ' ')}</span>
                          {getStatusBadge(status, "Submitted", "Not Submitted")}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Validation Data Unavailable</h3>
                    <p className="text-muted-foreground">Unable to load driver validation information.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Delete User Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-30"></div>
                  <div className="relative bg-red-500 p-2 rounded-full">
                    <Trash2 className="h-5 w-5 text-white" />
                  </div>
                </div>
                Delete User Account
              </DialogTitle>
              <DialogDescription>
                This action will permanently delete the user account and all associated data. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Deleting this user will permanently remove:
                    </p>
                    <ul className="text-sm text-red-700 mt-2 space-y-1">
                      <li>• User profile and account information</li>
                      <li>• All ride history and bookings</li>
                      <li>• Vehicle and document information</li>
                      <li>• Financial records and transactions</li>
                      <li>• All associated data and relationships</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delete-reason" className="text-sm font-semibold">
                  Reason for deletion *
                </Label>
                <Textarea
                  id="delete-reason"
                  placeholder="Please provide a reason for deleting this user account..."
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  rows={3}
                  className="border-red-200 focus:border-red-500 focus:ring-red-500/20"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={deleteUserAccount.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteUser}
                disabled={!deleteReason.trim() || deleteUserAccount.isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleteUserAccount.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User Account
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Driver Document Upload Modal */}
        {isDocumentUploadOpen && (
          <DriverDocumentUpload
            driverId={parseInt(userId)}
            driverName={user.name}
            onClose={() => setIsDocumentUploadOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default UserDetails;