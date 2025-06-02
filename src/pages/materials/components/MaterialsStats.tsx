
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Materials Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Materials</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Box className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">{totalMaterials}</div>
            <div className="text-sm text-slate-600 font-medium">Across {materialTypes} categories</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Low Stock Items Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Low Stock Items</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg">
              <PackageOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">{lowStockCount}</div>
            <div className="text-sm text-slate-600 font-medium">Requiring reorder soon</div>
          </div>
        </CardContent>
      </Card>

      {/* Hazardous Materials Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-amber-50/30 to-yellow-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Hazardous Materials</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-3 shadow-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-1">{hazardousCount}</div>
            <div className="text-sm text-slate-600 font-medium">
              {missingSdsCount > 0 && `${missingSdsCount} missing SDS`}
              {missingSdsCount === 0 && 'All documentation complete'}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Suppliers Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Suppliers</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">{suppliers.length}</div>
            <div className="text-sm text-slate-600 font-medium">Active material providers</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialsStats;
