
import React, { useEffect } from 'react';
import { useStains } from "@/hooks/useStains";
import StainForm from './stains/StainForm';
import StainsList from './stains/StainsList';

interface StainsSectionProps {
  onCountChange: (count: number) => void;
}

const StainsSection: React.FC<StainsSectionProps> = ({ onCountChange }) => {
  const { stains, isLoading, addStain, deleteStain } = useStains();
  
  // Update parent component with count
  useEffect(() => {
    onCountChange(stains.length);
  }, [stains.length, onCountChange]);

  return (
    <div className="space-y-6">
      <StainForm addStain={addStain} />
      <StainsList stains={stains} isLoading={isLoading} deleteStain={deleteStain} />
    </div>
  );
};

export default StainsSection;
