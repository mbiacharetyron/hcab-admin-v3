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
  Info
} from "lucide-react";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userResponse, isLoading, error, refetch } = useUserDetails(Number(userId));

  const user = userResponse?.data;

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
          <TabsList className="grid w-full grid-cols-5">
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
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;