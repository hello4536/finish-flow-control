
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Box, PackageOpen } from "lucide-react";
import { Material, Supplier } from "@/types/materials";

interface MaterialsStatsProps {
  materials: Material[];
  suppliers: Supplier[];
}

const MaterialsStats: React.FC<MaterialsStatsProps> = ({ materials, suppliers }) => {
  // Get count of low stock items (Low Stock or Critical Low)
  const lowStockCount = materials.filter(
    m => m.status === "Low Stock" || m.status === "Critical Low"
  ).length;

  // Get unique material types
  const materialTypes = new Set(materials.map(m => m.type));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="card-hover rounded">
        <CardHeader className="pb-2 bg-sky-100">
          <CardTitle className="flex items-center">
            <Box className="mr-2 h-5 w-5 text-blue-900" />
            Total Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{materials.length}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Across {materialTypes.size} categories
          </p>
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
        <CardHeader className="pb-2 bg-blue-900">
          <CardTitle className="flex items-center text-slate-50">
            <Box className="mr-2 h-5 w-5 text-slate-50" />
            Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{suppliers.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Active material providers</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialsStats;
