import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Car, 
  Camera, 
  FileText, 
  CreditCard, 
  Shield, 
  FileCheck, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle,
  X,
  Image as ImageIcon,
  Calendar,
  Hash,
  User,
  Building,
  FileImage,
  Loader2
} from 'lucide-react';
import { useDriverDocumentSubmission } from '@/hooks/useDriverDocumentSubmission';
import { DriverDocumentSubmission } from '@/lib/api';
import { cn } from '@/lib/utils';

interface DriverDocumentUploadProps {
  driverId: number;
  driverName: string;
  onClose: () => void;
}

const DriverDocumentUpload: React.FC<DriverDocumentUploadProps> = ({ driverId, driverName, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DriverDocumentSubmission>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});

  const submitDocumentsMutation = useDriverDocumentSubmission();

  const steps = [
    { id: 1, title: 'Car Details', icon: Car, description: 'Basic vehicle information' },
    { id: 2, title: 'Car Photos', icon: Camera, description: 'Vehicle photos (5 total)' },
    { id: 3, title: 'ID Document', icon: User, description: 'Driver identification' },
    { id: 4, title: 'License', icon: CreditCard, description: 'Driver\'s license' },
    { id: 5, title: 'Insurance', icon: Shield, description: 'Vehicle insurance' },
    { id: 6, title: 'Registration', icon: FileText, description: 'Vehicle registration' },
    { id: 7, title: 'Inspection', icon: FileCheck, description: 'Vehicle inspection' },
  ];

  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      alert('Only JPG and PNG files are allowed');
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [field]: file }));
    setFormData(prev => ({ ...prev, [field]: file }));

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrls(prev => ({ ...prev, [field]: url }));
  };

  const removeFile = (field: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[field];
      return newFiles;
    });
    setFormData(prev => ({ ...prev, [field]: undefined }));
    
    // Clean up preview URL
    if (previewUrls[field]) {
      URL.revokeObjectURL(previewUrls[field]);
      setPreviewUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[field];
        return newUrls;
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    submitDocumentsMutation.mutate(
      { driverId, documents: formData },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Car Details
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="car_brand">Car Brand</Label>
                <Input
                  id="car_brand"
                  placeholder="e.g., Toyota, Honda, Ford"
                  value={formData.car_brand || ''}
                  onChange={(e) => handleInputChange('car_brand', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car_brand_model">Car Model</Label>
                <Input
                  id="car_brand_model"
                  placeholder="e.g., Camry, Accord, Focus"
                  value={formData.car_brand_model || ''}
                  onChange={(e) => handleInputChange('car_brand_model', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model_year">Model Year</Label>
                <Input
                  id="model_year"
                  type="number"
                  placeholder="e.g., 2020"
                  value={formData.model_year || ''}
                  onChange={(e) => handleInputChange('model_year', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car_color">Car Color</Label>
                <Input
                  id="car_color"
                  placeholder="e.g., Silver, Black, White"
                  value={formData.car_color || ''}
                  onChange={(e) => handleInputChange('car_color', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license_plate">License Plate</Label>
                <Input
                  id="license_plate"
                  placeholder="e.g., ABC-123"
                  value={formData.license_plate || ''}
                  onChange={(e) => handleInputChange('license_plate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin_number">VIN Number</Label>
                <Input
                  id="vin_number"
                  placeholder="e.g., 1HGBH41JXMN109186"
                  value={formData.vin_number || ''}
                  onChange={(e) => handleInputChange('vin_number', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seat_number">Seat Number</Label>
                <Input
                  id="seat_number"
                  type="number"
                  placeholder="e.g., 4, 5, 7"
                  value={formData.seat_number || ''}
                  onChange={(e) => handleInputChange('seat_number', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        );

      case 2: // Car Photos
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: 'exterior_photo1', label: 'Exterior Photo 1 (Front)', description: 'Front view of vehicle' },
                { field: 'exterior_photo2', label: 'Exterior Photo 2 (Back)', description: 'Back view of vehicle' },
                { field: 'exterior_photo3', label: 'Exterior Photo 3 (Side)', description: 'Side view of vehicle' },
                { field: 'interior_photo1', label: 'Interior Photo 1', description: 'Interior view' },
                { field: 'interior_photo2', label: 'Interior Photo 2', description: 'Dashboard view' },
              ].map(({ field, label, description }) => (
                <div key={field} className="space-y-3">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  
                  {previewUrls[field] ? (
                    <div className="relative">
                      <img
                        src={previewUrls[field]}
                        alt={label}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile(field)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <Label htmlFor={field} className="cursor-pointer">
                        <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                        <Input
                          id={field}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(field, e.target.files[0])}
                        />
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // ID Document
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id_document_type">ID Document Type</Label>
                <Select value={formData.id_document_type || ''} onValueChange={(value) => handleInputChange('id_document_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="National ID">National ID</SelectItem>
                    <SelectItem value="Driver's License">Driver's License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id_document_number">ID Document Number</Label>
                <Input
                  id="id_document_number"
                  placeholder="e.g., A1234567"
                  value={formData.id_document_number || ''}
                  onChange={(e) => handleInputChange('id_document_number', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: 'id_document_front', label: 'ID Document Front', description: 'Front side of ID document' },
                { field: 'id_document_back', label: 'ID Document Back', description: 'Back side of ID document' },
              ].map(({ field, label, description }) => (
                <div key={field} className="space-y-3">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  
                  {previewUrls[field] ? (
                    <div className="relative">
                      <img
                        src={previewUrls[field]}
                        alt={label}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile(field)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <Label htmlFor={field} className="cursor-pointer">
                        <span className="text-sm text-gray-600">Click to upload</span>
                        <Input
                          id={field}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(field, e.target.files[0])}
                        />
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // License
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="license_number">License Number</Label>
                <Input
                  id="license_number"
                  placeholder="e.g., DL123456789"
                  value={formData.license_number || ''}
                  onChange={(e) => handleInputChange('license_number', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={formData.expiry_date || ''}
                  onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: 'license_front_side', label: 'License Front Side', description: 'Front side of license' },
                { field: 'license_back_side', label: 'License Back Side', description: 'Back side of license' },
              ].map(({ field, label, description }) => (
                <div key={field} className="space-y-3">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  
                  {previewUrls[field] ? (
                    <div className="relative">
                      <img
                        src={previewUrls[field]}
                        alt={label}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile(field)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <Label htmlFor={field} className="cursor-pointer">
                        <span className="text-sm text-gray-600">Click to upload</span>
                        <Input
                          id={field}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(field, e.target.files[0])}
                        />
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 5: // Insurance
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="insurance_number">Insurance Number</Label>
                <Input
                  id="insurance_number"
                  placeholder="e.g., INS456789012"
                  value={formData.insurance_number || ''}
                  onChange={(e) => handleInputChange('insurance_number', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance_expiry_date">Insurance Expiry Date</Label>
                <Input
                  id="insurance_expiry_date"
                  type="date"
                  value={formData.insurance_expiry_date || ''}
                  onChange={(e) => handleInputChange('insurance_expiry_date', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Insurance Document</Label>
              <p className="text-sm text-muted-foreground">Upload insurance document image</p>
              
              {previewUrls.insurance_image ? (
                <div className="relative">
                  <img
                    src={previewUrls.insurance_image}
                    alt="Insurance Document"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile('insurance_image')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <Label htmlFor="insurance_image" className="cursor-pointer">
                    <span className="text-sm text-gray-600">Click to upload</span>
                    <Input
                      id="insurance_image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('insurance_image', e.target.files[0])}
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        );

      case 6: // Registration
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="car_registration">Car Registration</Label>
                <Input
                  id="car_registration"
                  placeholder="e.g., REG789012345"
                  value={formData.car_registration || ''}
                  onChange={(e) => handleInputChange('car_registration', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car_registration_expiry_date">Registration Expiry Date</Label>
                <Input
                  id="car_registration_expiry_date"
                  type="date"
                  value={formData.car_registration_expiry_date || ''}
                  onChange={(e) => handleInputChange('car_registration_expiry_date', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Registration Document</Label>
              <p className="text-sm text-muted-foreground">Upload registration document image</p>
              
              {previewUrls.car_registration_photo ? (
                <div className="relative">
                  <img
                    src={previewUrls.car_registration_photo}
                    alt="Registration Document"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile('car_registration_photo')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <Label htmlFor="car_registration_photo" className="cursor-pointer">
                    <span className="text-sm text-gray-600">Click to upload</span>
                    <Input
                      id="car_registration_photo"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('car_registration_photo', e.target.files[0])}
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        );

      case 7: // Inspection
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="car_inspection_date">Inspection Date</Label>
              <Input
                id="car_inspection_date"
                type="date"
                value={formData.car_inspection_date || ''}
                onChange={(e) => handleInputChange('car_inspection_date', e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Inspection Certificate</Label>
              <p className="text-sm text-muted-foreground">Upload inspection certificate image</p>
              
              {previewUrls.car_inspection_photo ? (
                <div className="relative">
                  <img
                    src={previewUrls.car_inspection_photo}
                    alt="Inspection Certificate"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile('car_inspection_photo')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <Label htmlFor="car_inspection_photo" className="cursor-pointer">
                    <span className="text-sm text-gray-600">Click to upload</span>
                    <Input
                      id="car_inspection_photo"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('car_inspection_photo', e.target.files[0])}
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin_notes">Admin Notes (Optional)</Label>
              <Textarea
                id="admin_notes"
                placeholder="Add any additional notes about the document submission..."
                value={formData.admin_notes || ''}
                onChange={(e) => handleInputChange('admin_notes', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Submit Driver Documents
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Uploading documents for {driverName}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    isActive && "bg-blue-600 text-white",
                    isCompleted && "bg-green-600 text-white",
                    !isActive && !isCompleted && "bg-gray-200 text-gray-600"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={cn(
                      "text-xs font-medium",
                      isActive && "text-blue-600",
                      isCompleted && "text-green-600",
                      !isActive && !isCompleted && "text-gray-500"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden md:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </CardContent>

        <div className="border-t p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  disabled={submitDocumentsMutation.isPending}
                  className="flex items-center gap-2"
                >
                  {submitDocumentsMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  Submit Documents
                </Button>
              ) : (
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DriverDocumentUpload;
