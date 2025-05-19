
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
  expiringSoonCount = 0,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Products
          </CardTitle>
          <Package2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Items in inventory
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Categories
          </CardTitle>
          <Grid3X3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categoryCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Unique product categories
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Low Stock Items
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-500">{lowStockCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Below minimum threshold
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Expiring Soon
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-500">{expiringSoonCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Expiring within 30 days
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Warehouses
          </CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{warehouseCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Storage locations
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
