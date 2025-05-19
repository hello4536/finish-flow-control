
import { useState, useEffect } from 'react';
import { useCertifications } from './useCertifications';
import { useComplianceIssues } from './useComplianceIssues';
import { useRegulatoryCompliance } from './useRegulatoryCompliance';
import { useSampleComplianceData } from './useSampleComplianceData';

export const useComplianceData = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Import all functionality from separate hooks
  const { 
    certifications, 
    isCertificationsLoading,
    addCertification,
    updateCertification,
    deleteCertification
  } = useCertifications();
  
  const {
    complianceIssues,
    isComplianceIssuesLoading,
    addComplianceIssue,
    updateComplianceIssue,
    deleteComplianceIssue
  } = useComplianceIssues();
  
  const {
    regulatoryCompliance,
    isRegulatoryLoading,
    selectedRegion,
    setSelectedRegion
  } = useRegulatoryCompliance();
  
  const { seedSampleData } = useSampleComplianceData();

  // Update loading state when data is available
  useEffect(() => {
    if (!isCertificationsLoading && !isComplianceIssuesLoading && !isRegulatoryLoading) {
      setIsLoading(false);
    }
  }, [isCertificationsLoading, isComplianceIssuesLoading, isRegulatoryLoading]);

  return {
    certifications,
    complianceIssues,
    regulatoryCompliance,
    selectedRegion,
    setSelectedRegion,
    isLoading,
    addCertification,
    updateCertification,
    deleteCertification,
    addComplianceIssue,
    updateComplianceIssue,
    deleteComplianceIssue,
    seedSampleData
  };
};
