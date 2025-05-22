import React, { useEffect } from 'react';
import { usePaintColors } from "@/hooks/usePaintColors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaintColorForm from './PaintColorForm';
import PaintColorsList from './PaintColorsList';
interface PaintColorsSectionProps {
  onCountChange: (count: number) => void;
}
const PaintColorsSection: React.FC<PaintColorsSectionProps> = ({
  onCountChange
}) => {
  const {
    paintColors,
    isLoading,
    addPaintColor,
    deletePaintColor
  } = usePaintColors();

  // Update parent component with count
  useEffect(() => {
    if (paintColors) {
      onCountChange(paintColors.length || 0);
    }
  }, [paintColors, onCountChange]);
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">Create New Paint Color</CardTitle>
          <CardDescription>
            Add a new paint color to your collection with detailed color information and properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="color-values">Color Values</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
            </TabsList>
            <PaintColorForm addPaintColor={addPaintColor} />
          </Tabs>
        </CardContent>
      </Card>
      
      <PaintColorsList paintColors={paintColors} isLoading={isLoading} deletePaintColor={deletePaintColor} />
    </div>;
};
export default PaintColorsSection;