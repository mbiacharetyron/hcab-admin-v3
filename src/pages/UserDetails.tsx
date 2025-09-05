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
  ClipboardList
} from "lucide-react";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useDriverValidationStatus, useValidateDriver } from "@/hooks/useDriverValidation";
import { useDriverRideOptions, useUnassignDriver, useAssignDriver, useRideOptions } from "@/hooks/useRideOptions";
import { useParams, useNavigate } from "react-router-dom";
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

  // State for validation dialog
  const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false);
  const [validationAction, setValidationAction] = useState<'approve' | 'reject'>('approve');
  const [validationReason, setValidationReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // State for assignment dialog
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [selectedRideOptionId, setSelectedRideOptionId] = useState<number | null>(null);

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

  // Get available ride options (not already assigned)
  const availableRideOptions = allRideOptionsResponse?.data?.filter(option => 
    !rideOptions.some(assigned => assigned.id === option.id && assigned.is_assigned)
  ) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
              <p className="text-muted-foreground">Complete profile and account information</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* User Profile Header */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24 border-4 border-white/20">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-white/20 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className="text-white/80 text-lg">@{user.username}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <User className="w-3 h-3 mr-1" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Globe className="w-3 h-3 mr-1" />
                      {user.language.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center space-x-2">
                  {getStatusBadge(user.is_active, "Active", "Inactive")}
                  {getStatusBadge(user.is_online, "Online", "Offline")}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(user.is_validated, "Validated", "Not Validated")}
                  {getStatusBadge(user.otp_verified, "Verified", "Unverified")}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              Vehicle
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="ride-options" className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Ride Options
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <LocationIcon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{user.latitude}, {user.longitude}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{user.passcode_attempts}</p>
                      <p className="text-xs text-muted-foreground">Passcode Attempts</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {user.has_active_passcode ? "1" : "0"}
                      </p>
                      <p className="text-xs text-muted-foreground">Active Passcode</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">In Drive</span>
                      {getStatusBadge(user.in_drive, "Yes", "No")}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cab Mode</span>
                      <Badge variant="outline">{user.cab_mode || "Not Set"}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Account Created</p>
                        <p className="text-xs text-muted-foreground">{formatDate(user.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Last Login</p>
                        <p className="text-xs text-muted-foreground">{formatDate(user.last_login_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-muted-foreground">{formatDate(user.updated_at)}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Referral Code</p>
                    <p className="font-mono text-lg font-bold">{user.referral_code}</p>
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
      </div>
    </AdminLayout>
  );
};

export default UserDetails;