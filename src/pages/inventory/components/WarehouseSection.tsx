
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import WarehouseTable from "./WarehouseTable";
import { Warehouse } from "@/types/inventory";

interface WarehouseSectionProps {
  warehouses: Warehouse[];
  isLoading: boolean;
}

const WarehouseSection: React.FC<WarehouseSectionProps> = ({ warehouses, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Locations</CardTitle>
        <CardDescription>Current storage facilities and capacity utilization</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <p>Loading warehouse data...</p>
          </div>
        ) : (
          <WarehouseTable warehouses={warehouses} />
        )}
      </CardContent>
    </Card>
  );
};

export default WarehouseSection;
