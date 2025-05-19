
import React, { useEffect } from 'react';
import { useStains } from "@/hooks/useStains";
import StainForm from './stains/StainForm';
import StainsList from './stains/StainsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StainsSectionProps {
  onCountChange: (count: number) => void;
}

const StainsSection: React.FC<StainsSectionProps> = ({ onCountChange }) => {
  const { stains, isLoading, addStain, deleteStain, updateStain } = useStains();
  
  // Update parent component with count
  useEffect(() => {
    onCountChange(stains.length);
  }, [stains.length, onCountChange]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create New Stain</CardTitle>
          <CardDescription>
            Add a new stain formula to your collection with detailed mixing instructions and application methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>
            <StainForm addStain={addStain} />
          </Tabs>
        </CardContent>
      </Card>
      
      <StainsList stains={stains} isLoading={isLoading} deleteStain={deleteStain} updateStain={updateStain} />
    </div>
  );
};

export default StainsSection;
