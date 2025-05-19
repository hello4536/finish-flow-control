
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  FileText, 
  Clipboard, 
  ShieldAlert, 
  Activity,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Material } from "@/types/materials";
import { useHazardousWaste } from "@/hooks/useHazardousWaste";
import { useMaterialCompliance } from "@/hooks/useMaterialCompliance";
import { useMaterialUsage } from "@/hooks/useMaterialUsage";
import MaterialBasicInfo from "./MaterialBasicInfo";
import ComplianceInfo from "./ComplianceInfo";
import UsageHistory from "./UsageHistory";
import SafetyInfo from "./SafetyInfo";

interface MaterialDetailViewProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
}

const MaterialDetailView: React.FC<MaterialDetailViewProps> = ({ material, isOpen, onClose }) => {
  const { getWasteByMaterialId } = useHazardousWaste();
  const { getComplianceByMaterialId, getSdsByMaterialId } = useMaterialCompliance();
  const { getUsageByMaterialId, calculateTotalUsage } = useMaterialUsage();

  if (!material) return null;

  const wasteRecords = material.id ? getWasteByMaterialId(material.id) : [];
  const complianceRecords = material.id ? getComplianceByMaterialId(material.id) : [];
  const safetyDataSheets = material.id ? getSdsByMaterialId(material.id) : [];
  const usageLogs = material.id ? getUsageByMaterialId(material.id) : [];
  const totalUsage = material.id ? calculateTotalUsage(material.id) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{material.name}</DialogTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusBadgeColor(material.status)}`}>
                {material.status}
              </Badge>
              {material.is_hazardous && (
                <Badge variant="destructive" className="flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Hazardous
                </Badge>
              )}
            </div>
          </div>
          <DialogDescription>
            Type: {material.type} | Quantity: {material.quantity} {material.unit}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="safety">Safety Data</TabsTrigger>
            <TabsTrigger value="usage">Usage History</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <MaterialBasicInfo material={material} />
          </TabsContent>
          
          <TabsContent value="compliance">
            <ComplianceInfo 
              material={material} 
              complianceRecords={complianceRecords} 
              wasteRecords={wasteRecords} 
            />
          </TabsContent>
          
          <TabsContent value="safety">
            <SafetyInfo 
              material={material} 
              safetyDataSheets={safetyDataSheets} 
            />
          </TabsContent>
          
          <TabsContent value="usage">
            <UsageHistory 
              material={material} 
              usageLogs={usageLogs} 
              totalUsage={totalUsage} 
            />
          </TabsContent>
          
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Material Suppliers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Suppliers content will be implemented in the sub-component */}
                <p>Supplier information for this material</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get status badge color
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Low Stock':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'Critical Low':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'Out of Stock':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

export default MaterialDetailView;
