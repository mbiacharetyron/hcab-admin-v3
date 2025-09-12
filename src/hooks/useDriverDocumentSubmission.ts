import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitDriverDocuments, DriverDocumentSubmission, DriverDocumentSubmissionResponse } from '@/lib/api';
import { toast } from 'sonner';

export const useDriverDocumentSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<DriverDocumentSubmissionResponse, Error, { driverId: number; documents: DriverDocumentSubmission }>({
    mutationFn: ({ driverId, documents }) => submitDriverDocuments(driverId, documents),
    onSuccess: (data) => {
      // Invalidate and refetch driver details
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      
      // Show success message
      toast.success('Documents submitted successfully!', {
        description: `${data.data.documents_submitted.length} documents uploaded for driver #${data.data.driver_id}`,
        duration: 5000,
      });

      console.log('Driver documents submitted successfully:', data);
    },
    onError: (error) => {
      // Show error message
      toast.error('Failed to submit documents', {
        description: error.message || 'An error occurred while submitting documents',
        duration: 5000,
      });

      console.error('Driver document submission error:', error);
    },
  });
};
