
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {/* Total Products Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Products</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Package2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">{totalProducts}</div>
            <div className="text-sm text-slate-600 font-medium">Items in inventory</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Categories Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-cyan-50/30 to-teal-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-cyan-700 uppercase tracking-wide">Categories</div>
            <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 p-3 shadow-lg">
              <Grid3X3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-1">{categoryCount}</div>
            <div className="text-sm text-slate-600 font-medium">Unique categories</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Low Stock Items Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Low Stock Items</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">{lowStockCount}</div>
            <div className="text-sm text-slate-600 font-medium">Below threshold</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Expiring Soon Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-amber-50/30 to-yellow-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Expiring Soon</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-3 shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-1">{expiringSoonCount}</div>
            <div className="text-sm text-slate-600 font-medium">Within 30 days</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Warehouses Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-slate-50/30 to-gray-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Warehouses</div>
            <div className="rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 p-3 shadow-lg">
              <Warehouse className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-1">{warehouseCount}</div>
            <div className="text-sm text-slate-600 font-medium">Storage locations</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
