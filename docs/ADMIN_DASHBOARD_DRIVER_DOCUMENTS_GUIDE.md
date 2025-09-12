# Admin Dashboard - Driver Documents Submission Guide

## Overview

This guide explains how to use the driver document submission feature in the admin dashboard. Administrators can submit and manage driver documents on behalf of drivers, following the correct submission order: **Car Details → Car Photos → ID Document → License → Insurance → Registration → Inspection**.

## Table of Contents

1. [Accessing the Feature](#accessing-the-feature)
2. [Driver Document Submission Process](#driver-document-submission-process)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [Field Descriptions](#field-descriptions)
5. [File Upload Guidelines](#file-upload-guidelines)
6. [Common Use Cases](#common-use-cases)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

## Accessing the Feature

### Prerequisites
- Admin account with proper permissions
- Valid admin authentication token
- Access to the admin dashboard

### Navigation
1. Log into the admin dashboard
2. Navigate to **Driver Management** section
3. Select **Driver Documents** from the menu
4. Choose the driver you want to submit documents for
5. Click **Submit Documents** button

## Driver Document Submission Process

The driver document submission follows a specific order that matches the driver's own submission flow:

```
1. Car Details → 2. Car Photos → 3. ID Document → 4. License → 5. Insurance → 6. Registration → 7. Inspection
```

### Why This Order Matters
- **Consistency**: Matches the driver's submission experience
- **Validation**: Ensures proper document flow and dependencies
- **User Experience**: Maintains familiar workflow for drivers
- **Compliance**: Follows regulatory document submission requirements

## Step-by-Step Guide

### Step 1: Car Details
Submit basic vehicle information:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Car Brand | Text | Optional | Vehicle manufacturer | Toyota, Honda, Ford |
| Car Model | Text | Optional | Vehicle model | Camry, Accord, Focus |
| Model Year | Number | Optional | Manufacturing year | 2020, 2021, 2022 |
| Car Color | Text | Optional | Vehicle color | Silver, Black, White |
| License Plate | Text | Optional | Vehicle license plate | ABC-123, XYZ-789 |
| VIN Number | Text | Optional | Vehicle Identification Number | 1HGBH41JXMN109186 |
| Seat Number | Number | Optional | Number of seats | 4, 5, 7 |

**Admin Notes:**
- VIN numbers must be unique across all vehicles
- License plates must be unique across all drivers
- Model year should be realistic (1900 to current year + 1)

### Step 2: Car Photos
Upload vehicle photos (5 photos total):

| Photo Type | Required | Description | File Format |
|------------|----------|-------------|-------------|
| Exterior Photo 1 | Optional | Front view of vehicle | JPG, PNG |
| Exterior Photo 2 | Optional | Back view of vehicle | JPG, PNG |
| Exterior Photo 3 | Optional | Side view of vehicle | JPG, PNG |
| Interior Photo 1 | Optional | Interior view | JPG, PNG |
| Interior Photo 2 | Optional | Dashboard view | JPG, PNG |

**Admin Notes:**
- All photos should be clear and well-lit
- Maximum file size: 5MB per photo
- Photos help verify vehicle condition and authenticity

### Step 3: ID Document
Submit driver identification:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| ID Document Type | Text | Optional | Type of ID document | Passport, National ID, Driver's License |
| ID Document Number | Text | Optional | ID document number | A1234567, ID789012 |
| ID Document Front | File | Optional | Front side image | JPG, PNG |
| ID Document Back | File | Optional | Back side image | JPG, PNG |

**Admin Notes:**
- Both front and back images are recommended for complete verification
- Document numbers should match the uploaded images
- Ensure images are clear and all text is readable

### Step 4: License
Submit driver's license information:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| License Number | Text | Optional | Driver's license number | DL123456789 |
| Expiry Date | Date | Optional | License expiration date | 2025-12-31 |
| License Front Side | File | Optional | Front side of license | JPG, PNG |
| License Back Side | File | Optional | Back side of license | JPG, PNG |

**Admin Notes:**
- Expiry date must be in the future
- License must be valid for the driver to operate
- Both sides of the license should be uploaded

### Step 5: Insurance
Submit vehicle insurance information:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Insurance Number | Text | Optional | Insurance policy number | INS456789012 |
| Insurance Expiry Date | Date | Optional | Insurance expiration date | 2025-11-30 |
| Insurance Image | File | Optional | Insurance document image | JPG, PNG |

**Admin Notes:**
- Insurance must be valid and current
- Expiry date must be in the future
- Document should show policy details clearly

### Step 6: Registration
Submit vehicle registration:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Car Registration | Text | Optional | Registration number | REG789012345 |
| Registration Expiry Date | Date | Optional | Registration expiration | 2025-10-31 |
| Registration Photo | File | Optional | Registration document | JPG, PNG |

**Admin Notes:**
- Registration must be current and valid
- Vehicle must be properly registered
- Document should be clear and legible

### Step 7: Inspection
Submit vehicle inspection details:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| Inspection Date | Date | Optional | Date of inspection | 2025-08-15 |
| Inspection Photo | File | Optional | Inspection certificate | JPG, PNG |

**Admin Notes:**
- Inspection date should be in the past (already completed)
- Certificate should show inspection passed
- Regular inspections ensure vehicle safety

## Field Descriptions

### Required vs Optional Fields
- **All fields are optional** - Admins can submit partial information
- **Flexible submission** - Submit any combination of documents
- **Incremental updates** - Add more documents later as needed

### Validation Rules
- **File sizes**: Maximum 5MB per file
- **File types**: JPG, PNG for images; PDF for documents
- **Date formats**: YYYY-MM-DD
- **Text fields**: Maximum 255 characters
- **Numbers**: Realistic ranges (years, seat counts)

## File Upload Guidelines

### Supported File Types
- **Images**: JPG, JPEG, PNG
- **Documents**: PDF (for some document types)
- **Maximum size**: 5MB per file
- **Total upload**: 100MB per request

### File Naming
- Files are automatically renamed with timestamps
- Format: `{timestamp}_{driverId}_{fieldName}.{extension}`
- Example: `1704067200_123_license_front_side.jpg`

### Storage Organization
Files are organized in S3 with the following structure:
```
s3://bucket-name/
├── car_photos/{driverId}/
├── id_documents/{driverId}/
├── license_documents/{driverId}/
├── insurance_documents/{driverId}/
├── driver_documents/{driverId}/
└── car_inspection/{driverId}/
```

## Common Use Cases

### Case 1: Complete Driver Onboarding
**Scenario**: New driver needs all documents submitted
**Process**:
1. Submit car details first
2. Upload all 5 car photos
3. Submit ID document with both images
4. Upload license with front and back
5. Submit insurance document
6. Upload registration document
7. Submit inspection certificate

**Result**: 100% completion, driver can be validated

### Case 2: Partial Document Update
**Scenario**: Driver needs to update only insurance
**Process**:
1. Submit only insurance number and expiry date
2. Upload new insurance document image
3. Leave all other fields empty

**Result**: Only insurance is updated, other documents remain unchanged

### Case 3: Missing Document Addition
**Scenario**: Driver submitted some documents, admin adds missing ones
**Process**:
1. Identify which documents are missing
2. Submit only the missing document information
3. Upload corresponding files

**Result**: Completion percentage increases, missing documents are added

### Case 4: Document Correction
**Scenario**: Driver submitted incorrect information, admin corrects it
**Process**:
1. Submit corrected information for specific fields
2. Upload new/corrected document images
3. System updates existing records

**Result**: Incorrect information is replaced with correct data

## Troubleshooting

### Common Issues and Solutions

#### Issue: File Upload Fails
**Symptoms**: Error message when uploading files
**Solutions**:
- Check file size (must be under 5MB)
- Verify file format (JPG, PNG only)
- Ensure stable internet connection
- Try uploading one file at a time

#### Issue: Validation Errors
**Symptoms**: Form shows validation error messages
**Solutions**:
- Check date formats (use YYYY-MM-DD)
- Ensure expiry dates are in the future
- Verify text field lengths (max 255 characters)
- Check number ranges (realistic years, seat counts)

#### Issue: Driver Not Found
**Symptoms**: "Driver not found" error
**Solutions**:
- Verify driver ID is correct
- Ensure driver exists in the system
- Check if driver has 'driver' role
- Confirm driver is active

#### Issue: Permission Denied
**Symptoms**: "Admin access required" error
**Solutions**:
- Verify admin authentication token
- Check admin role permissions
- Ensure token hasn't expired
- Re-login if necessary

### Error Codes and Meanings

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 403 | Admin access required | Check authentication |
| 404 | Driver not found | Verify driver ID |
| 422 | Validation error | Check form data |
| 500 | Server error | Contact technical support |

## Best Practices

### For Administrators

#### Document Quality
- **High Resolution**: Upload clear, high-quality images
- **Good Lighting**: Ensure documents are well-lit and readable
- **Complete Information**: Include all relevant document details
- **Current Documents**: Use up-to-date, valid documents

#### Security
- **Verify Identity**: Confirm driver identity before submission
- **Document Authenticity**: Verify documents are genuine
- **Data Privacy**: Handle sensitive information securely
- **Access Control**: Only authorized admins should submit documents

#### Workflow Efficiency
- **Batch Processing**: Submit multiple documents at once when possible
- **Organized Approach**: Follow the correct order for consistency
- **Documentation**: Add admin notes for context
- **Follow-up**: Monitor completion status and follow up as needed

### For System Maintenance

#### Regular Tasks
- **Monitor Storage**: Check S3 storage usage regularly
- **Clean Up**: Remove old or invalid documents
- **Backup**: Ensure document backups are working
- **Updates**: Keep system updated with latest features

#### Performance Optimization
- **File Compression**: Optimize image sizes before upload
- **Batch Operations**: Process multiple documents efficiently
- **Caching**: Use appropriate caching for frequently accessed data
- **Monitoring**: Track system performance and usage

## API Integration

### Frontend Implementation
```javascript
// Example form submission
const formData = new FormData();

// Car Details
formData.append('car_brand', 'Toyota');
formData.append('car_brand_model', 'Camry');
formData.append('model_year', '2020');
formData.append('car_color', 'Silver');
formData.append('license_plate', 'ABC-123');
formData.append('vin_number', '1HGBH41JXMN109186');
formData.append('seat_number', '4');

// Car Photos
formData.append('exterior_photo1', file1);
formData.append('exterior_photo2', file2);
formData.append('exterior_photo3', file3);
formData.append('interior_photo1', file4);
formData.append('interior_photo2', file5);

// ID Document
formData.append('id_document_type', 'Passport');
formData.append('id_document_number', 'A1234567');
formData.append('id_document_front', idFrontFile);
formData.append('id_document_back', idBackFile);

// License
formData.append('license_number', 'DL123456');
formData.append('expiry_date', '2025-12-31');
formData.append('license_front_side', licenseFrontFile);
formData.append('license_back_side', licenseBackFile);

// Insurance
formData.append('insurance_number', 'INS456789');
formData.append('insurance_expiry_date', '2025-11-30');
formData.append('insurance_image', insuranceFile);

// Registration
formData.append('car_registration', 'REG789012');
formData.append('car_registration_expiry_date', '2025-10-31');
formData.append('car_registration_photo', registrationFile);

// Inspection
formData.append('car_inspection_date', '2025-08-15');
formData.append('car_inspection_photo', inspectionFile);

// Admin Notes
formData.append('admin_notes', 'Documents verified and submitted by admin');

// Submit
fetch(`/api/v1/admin/drivers/${driverId}/documents`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${adminToken}`
    },
    body: formData
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    // Handle success response
})
.catch(error => {
    console.error('Error:', error);
    // Handle error
});
```

### Response Handling
```javascript
// Example response handling
function handleSubmissionResponse(response) {
    if (response.success) {
        const data = response.data;
        
        // Display success message
        showSuccessMessage(response.message);
        
        // Update UI with submission details
        updateDriverStatus(data.driver_id, data.completion_percentage);
        
        // Show submitted documents
        displaySubmittedDocuments(data.documents_submitted);
        
        // Update completion progress
        updateProgressBar(data.completion_percentage);
        
        // Show admin information
        displayAdminInfo(data.submitted_by);
        
    } else {
        // Handle errors
        showErrorMessage(response.message);
        
        if (response.errors) {
            displayValidationErrors(response.errors);
        }
    }
}
```

## Monitoring and Analytics

### Completion Tracking
- **Real-time Updates**: Monitor completion percentage in real-time
- **Progress Indicators**: Visual progress bars for document completion
- **Status Alerts**: Notifications when documents are submitted
- **Completion Reports**: Generate reports on driver document status

### Audit Trail
- **Submission History**: Track all document submissions
- **Admin Actions**: Log all admin activities
- **Change Tracking**: Monitor document updates and changes
- **Compliance Reports**: Generate compliance and audit reports

## Support and Resources

### Getting Help
- **Documentation**: Refer to this guide and API documentation
- **Technical Support**: Contact development team for technical issues
- **Training**: Request training sessions for new administrators
- **Updates**: Stay informed about system updates and new features

### Additional Resources
- **API Documentation**: Complete API reference documentation
- **Video Tutorials**: Step-by-step video guides
- **FAQ Section**: Frequently asked questions and answers
- **Community Forum**: Connect with other administrators

---

## Quick Reference

### Submission Order
1. **Car Details** → 2. **Car Photos** → 3. **ID Document** → 4. **License** → 5. **Insurance** → 6. **Registration** → 7. **Inspection**

### File Requirements
- **Max Size**: 5MB per file
- **Formats**: JPG, PNG for images
- **Total Limit**: 100MB per request

### Key Endpoints
- **Submit Documents**: `POST /api/v1/admin/drivers/{driverId}/documents`
- **Authentication**: `Authorization: Bearer {admin_token}`

### Common Field Names
- **Car**: `car_brand`, `car_brand_model`, `model_year`, `car_color`, `license_plate`, `vin_number`, `seat_number`
- **Photos**: `exterior_photo1`, `exterior_photo2`, `exterior_photo3`, `interior_photo1`, `interior_photo2`
- **ID**: `id_document_type`, `id_document_number`, `id_document_front`, `id_document_back`
- **License**: `license_number`, `expiry_date`, `license_front_side`, `license_back_side`
- **Insurance**: `insurance_number`, `insurance_expiry_date`, `insurance_image`
- **Registration**: `car_registration`, `car_registration_expiry_date`, `car_registration_photo`
- **Inspection**: `car_inspection_date`, `car_inspection_photo`

This guide provides comprehensive instructions for using the driver document submission feature in the admin dashboard. Follow the step-by-step process and best practices to ensure efficient and accurate document management.
