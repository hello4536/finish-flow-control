import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Box, PackageOpen, Users, AlertTriangle } from "lucide-react";
import { Material, Supplier } from "@/types/materials";
interface MaterialsStatsProps {
  materials: Material[];
  suppliers: Supplier[];
}
const MaterialsStats: React.FC<MaterialsStatsProps> = ({
  materials,
  suppliers
}) => {
  // Calculate metrics
  const totalMaterials = materials.length;
  const materialTypes = new Set(materials.map(m => m.type)).size;
  const lowStockCount = materials.filter(m => m.status === "Low Stock" || m.status === "Critical Low").length;
  const hazardousCount = materials.filter(m => m.is_hazardous).length;
  const missingSdsCount = materials.filter(m => m.is_hazardous && !m.safety_data_sheet_url).length;
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card className="card-hover rounded">
        <CardHeader className="pb-2 bg-sky-100">
          <CardTitle className="flex items-center text-blue-600">
            <Box className="mr-2 h-5 w-5 text-blue-600" />
            Total Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{totalMaterials}</p>
          <p className="text-sm text-muted-foreground mt-1">Across {materialTypes} categories</p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2 bg-orange-500">
          <CardTitle className="flex items-center text-slate-50">
            <PackageOpen className="mr-2 h-5 w-5 text-slate-50" />
            Low Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{lowStockCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Requiring reorder soon</p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="pb-2 bg-amber-500">
          <CardTitle className="flex items-center text-slate-50 text-base">
            <AlertTriangle className="mr-2 h-5 w-5 text-slate-50" />
            Hazardous Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{hazardousCount}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {missingSdsCount > 0 && `${missingSdsCount} missing SDS`}
            {missingSdsCount === 0 && 'All documentation complete'}
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2 bg-green-200">
          <CardTitle className="flex items-center text-green-700">
            <Users className="mr-2 h-5 w-5 text-green-700" />
            Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{suppliers.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Active material providers</p>
        </CardContent>
      </Card>
    </div>;
};
export default MaterialsStats;