
import { useState, useEffect } from 'react';
import { useCertifications } from './useCertifications';
import { useComplianceIssues } from './useComplianceIssues';
import { useRegulatoryCompliance } from './useRegulatoryCompliance';
import { useHazardousWaste } from './useHazardousWaste';
import { usePPERequirements } from './usePPERequirements';

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
  
  const {
    hazardousWaste,
    isHazardousWasteLoading,
    addHazardousWaste,
    updateHazardousWaste,
    deleteHazardousWaste
  } = useHazardousWaste();
  
  const {
    ppeRequirements,
    isPPERequirementsLoading,
    addPPERequirement,
    updatePPERequirement,
    deletePPERequirement
  } = usePPERequirements();

  // Update loading state when data is available
  useEffect(() => {
    if (!isCertificationsLoading && 
        !isComplianceIssuesLoading && 
        !isRegulatoryLoading &&
        !isHazardousWasteLoading &&
        !isPPERequirementsLoading) {
      setIsLoading(false);
    }
  }, [
    isCertificationsLoading, 
    isComplianceIssuesLoading, 
    isRegulatoryLoading,
    isHazardousWasteLoading,
    isPPERequirementsLoading
  ]);

  return {
    certifications,
    complianceIssues,
    regulatoryCompliance,
    hazardousWaste,
    ppeRequirements,
    selectedRegion,
    setSelectedRegion,
    isLoading,
    addCertification,
    updateCertification,
    deleteCertification,
    addComplianceIssue,
    updateComplianceIssue,
    deleteComplianceIssue,
    addHazardousWaste,
    updateHazardousWaste,
    deleteHazardousWaste,
    addPPERequirement,
    updatePPERequirement,
    deletePPERequirement,
  };
};
