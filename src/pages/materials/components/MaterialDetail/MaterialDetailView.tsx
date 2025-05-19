
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Material } from "@/types/materials";
import MaterialBasicInfo from "./MaterialBasicInfo";
import SafetyInfo from "./SafetyInfo";
import ComplianceInfo from "./ComplianceInfo";
import UsageHistory from "./UsageHistory";
import { useMaterialCompliance } from "@/hooks/useMaterialCompliance";
import { useHazardousWaste } from "@/hooks/useHazardousWaste";
import { useMaterialUsage } from "@/hooks/useMaterialUsage";

interface MaterialDetailViewProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
}

const MaterialDetailView: React.FC<MaterialDetailViewProps> = ({
  material,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState("info");
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Load related data
  const { getComplianceByMaterialId, getSdsByMaterialId } = useMaterialCompliance();
  const { getWasteByMaterialId } = useHazardousWaste();
  const { getUsageLogsByMaterialId } = useMaterialUsage();

  // Prepare data to display
  const complianceRecords = material ? getComplianceByMaterialId(material.id) : [];
  const safetyDataSheets = material ? getSdsByMaterialId(material.id) : [];
  const wasteRecords = material ? getWasteByMaterialId(material.id) : [];
  const usageLogs = material ? getUsageLogsByMaterialId(material.id) : [];

  if (!material) {
    return null;
  }

  const DetailContent = (
    <div className="p-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="info">Basic Info</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <MaterialBasicInfo material={material} />
        </TabsContent>
        
        <TabsContent value="safety">
          <SafetyInfo material={material} safetyDataSheets={safetyDataSheets} />
        </TabsContent>
        
        <TabsContent value="compliance">
          <ComplianceInfo 
            material={material} 
            complianceRecords={complianceRecords} 
            wasteRecords={wasteRecords}
          />
        </TabsContent>
        
        <TabsContent value="usage">
          <UsageHistory material={material} usageLogs={usageLogs} />
        </TabsContent>
      </Tabs>
    </div>
  );

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>{material.name}</SheetTitle>
        </SheetHeader>
        {DetailContent}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{material.name}</DialogTitle>
        </DialogHeader>
        {DetailContent}
      </DialogContent>
    </Dialog>
  );
};

export default MaterialDetailView;
