import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  ExternalLink
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
      <Badge variant={status ? "default" : "secondary"}>
        {status ? (
          <>
            <CheckCircle className="w-3 h-3 mr-1" />
            {trueText}
          </>
        ) : (
          <>
            <XCircle className="w-3 h-3 mr-1" />
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">User Details</h1>
            <p className="text-muted-foreground">Complete information for {user.name}</p>
          </div>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <User className="w-5 h-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-lg font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username</label>
                    <p className="text-lg">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-lg flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {user.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Language</label>
                    <Badge variant="outline">{user.language.toUpperCase()}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(user.is_active, "Active", "Inactive")}
                  {getStatusBadge(user.is_online, "Online", "Offline")}
                  {getStatusBadge(user.is_validated, "Validated", "Not Validated")}
                  {getStatusBadge(user.otp_verified, "OTP Verified", "OTP Not Verified")}
                  {getStatusBadge(user.in_drive, "In Drive", "Not Driving")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(user.last_login_at)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {user.latitude}, {user.longitude}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Referral Code</label>
                    <p className="font-mono">{user.referral_code}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Details */}
        {user.car_details && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Car className="w-5 h-5" />
                <span>Vehicle Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand</label>
                  <p className="text-lg">{user.car_details.car_brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Model</label>
                  <p className="text-lg">{user.car_details.car_brand_model}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Year</label>
                  <p className="text-lg">{user.car_details.model_year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Color</label>
                  <p className="text-lg capitalize">{user.car_details.car_color}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">License Plate</label>
                  <p className="text-lg font-mono">{user.car_details.license_plate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Seats</label>
                  <p className="text-lg">{user.car_details.seat_number}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bank Details */}
        {user.bank_details && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5" />
                <span>Banking Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
                  <p className="text-lg">{user.bank_details.bank_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                  <p className="text-lg font-mono">{user.bank_details.account_number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">IFSC Code</label>
                  <p className="text-lg font-mono">{user.bank_details.ifsc_code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Beneficiary Name</label>
                  <p className="text-lg">{user.bank_details.beneficiary_name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Document Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Shield className="w-5 h-5" />
              <span>Document Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getStatusBadge(user.bank_submitted, "Bank Details", "Bank Missing")}
              {getStatusBadge(user.car_submitted, "Car Details", "Car Missing")}
              {getStatusBadge(user.doc_submitted, "Documents", "Docs Missing")}
              {getStatusBadge(user.car_photos_submitted, "Car Photos", "Photos Missing")}
              {getStatusBadge(user.id_document_submitted, "ID Document", "ID Missing")}
              {getStatusBadge(user.license_submitted, "License", "License Missing")}
              {getStatusBadge(user.insurance_submitted, "Insurance", "Insurance Missing")}
              {getStatusBadge(user.registration_submitted, "Registration", "Registration Missing")}
              {getStatusBadge(user.car_inspection_submitted, "Inspection", "Inspection Missing")}
            </div>
          </CardContent>
        </Card>

        {/* Driver Documents */}
        {user.driver_documents && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <FileText className="w-5 h-5" />
                <span>Driver Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* License Information */}
                <div>
                  <h4 className="font-semibold mb-3">Driver's License</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">License Number</label>
                      <p className="font-mono">{user.driver_documents.license_number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                      <p>{formatDate(user.driver_documents.expiry_date)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">License Images</label>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={user.driver_documents.license_front_side} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Front
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={user.driver_documents.license_back_side} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Back
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance Information */}
                <div>
                  <h4 className="font-semibold mb-3">Insurance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Insurance Number</label>
                      <p className="font-mono">{user.driver_documents.insurance_number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                      <p>{formatDate(user.driver_documents.insurance_expiry_date)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={user.driver_documents.insurance_image} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Insurance Document
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* ID Document Information */}
                <div>
                  <h4 className="font-semibold mb-3">ID Document</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Document Type</label>
                      <p className="capitalize">{user.driver_documents.id_document_type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Document Number</label>
                      <p className="font-mono">{user.driver_documents.id_document_number}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">ID Document Images</label>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={user.driver_documents.id_document_front} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Front
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={user.driver_documents.id_document_back} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Back
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Car Registration */}
                <div>
                  <h4 className="font-semibold mb-3">Car Registration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                      <p className="font-mono">{user.driver_documents.car_registration || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                      <p>{formatDate(user.driver_documents.car_registration_expiry_date)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={user.driver_documents.car_registration_photo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Registration Document
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Car Inspection */}
                <div>
                  <h4 className="font-semibold mb-3">Car Inspection</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Inspection Date</label>
                      <p>{formatDate(user.driver_documents.car_inspection_date)}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={user.driver_documents.car_inspection_photo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Inspection Document
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Shield className="w-5 h-5" />
              <span>Security & Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Passcode Status</label>
                <p>{getStatusBadge(user.has_active_passcode, "Active Passcode", "No Passcode")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Passcode Attempts</label>
                <p className="text-lg">{user.passcode_attempts}</p>
              </div>
              {user.passcode_activated_at && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Passcode Activated</label>
                  <p>{formatDate(user.passcode_activated_at)}</p>
                </div>
              )}
              {user.passcode_last_used_at && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Passcode Use</label>
                  <p>{formatDate(user.passcode_last_used_at)}</p>
                </div>
              )}
              {user.passcode_locked_until && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Locked Until</label>
                  <p className="text-destructive">{formatDate(user.passcode_locked_until)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;
