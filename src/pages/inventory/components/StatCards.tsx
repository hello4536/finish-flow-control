import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, PackageOpen, Warehouse } from "lucide-react";
interface StatCardsProps {
  totalProducts: number;
  categoryCount: number;
  lowStockCount: number;
  warehouseCount: number;
}
const StatCards: React.FC<StatCardsProps> = ({
  totalProducts,
  categoryCount,
  lowStockCount,
  warehouseCount
}) => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="card-hover">
        <CardHeader className="pb-2 bg-sky-100">
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5 text-blue-600" />
            Total Products
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{totalProducts}</p>
          <p className="text-sm text-muted-foreground mt-1">Across {categoryCount} categories</p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2 bg-orange-500">
          <CardTitle className="flex items-center text-blue-900">
            <PackageOpen className="mr-2 h-5 w-5 text-blue-900" />
            Low Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{lowStockCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Items requiring restock soon</p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2 bg-blue-900">
          <CardTitle className="flex items-center text-orange-500">
            <Warehouse className="mr-2 h-5 w-5 text-slate-50 rounded-none" />
            Warehouses
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-3xl font-bold">{warehouseCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Storage locations</p>
        </CardContent>
      </Card>
    </div>;
};
export default StatCards;