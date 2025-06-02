
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, Grid3X3, AlertCircle, Warehouse, Clock } from "lucide-react";

interface StatCardsProps {
  totalProducts: number;
  categoryCount: number;
  lowStockCount: number;
  warehouseCount: number;
  expiringSoonCount?: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalProducts,
  categoryCount,
  lowStockCount,
  warehouseCount,
  expiringSoonCount = 0
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      {/* Total Products Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Products</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Package2 className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-blue-800 mb-1">{totalProducts}</div>
            <div className="text-sm text-blue-600 font-medium">Items in inventory</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Categories Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-cyan-50 to-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-cyan-700 uppercase tracking-wide">Categories</div>
            <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 p-3 shadow-lg">
              <Grid3X3 className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-cyan-800 mb-1">{categoryCount}</div>
            <div className="text-sm text-cyan-600 font-medium">Unique categories</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Low Stock Items Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-red-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Low Stock Items</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-orange-800 mb-1">{lowStockCount}</div>
            <div className="text-sm text-orange-600 font-medium">Below threshold</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Expiring Soon Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Expiring Soon</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-3 shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-amber-800 mb-1">{expiringSoonCount}</div>
            <div className="text-sm text-amber-600 font-medium">Within 30 days</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Warehouses Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Warehouses</div>
            <div className="rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 p-3 shadow-lg">
              <Warehouse className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-slate-800 mb-1">{warehouseCount}</div>
            <div className="text-sm text-slate-600 font-medium">Storage locations</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
