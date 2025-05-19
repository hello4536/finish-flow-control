
import { useState, useEffect } from 'react';
import { useQualityInspections } from './useQualityInspections';
import { useSampleQualityData } from './useSampleQualityData';

export const useQualityData = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Import all functionality from separate hooks
  const { 
    inspections, 
    isInspectionsLoading,
    addInspection,
    updateInspection,
    deleteInspection
  } = useQualityInspections();
  
  const { seedSampleData } = useSampleQualityData();

  // Update loading state when data is available
  useEffect(() => {
    if (!isInspectionsLoading) {
      setIsLoading(false);
    }
  }, [isInspectionsLoading]);

  return {
    inspections,
    isLoading,
    addInspection,
    updateInspection,
    deleteInspection,
    seedSampleData
  };
};
