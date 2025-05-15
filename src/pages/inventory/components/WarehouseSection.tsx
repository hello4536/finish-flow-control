
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import WarehouseTable from "./WarehouseTable";

interface Warehouse {
  id: number;
  name: string;
  location: string;
  capacity: number;
  utilized: number;
}

interface WarehouseSectionProps {
  warehouses: Warehouse[];
}

const WarehouseSection: React.FC<WarehouseSectionProps> = ({ warehouses }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Locations</CardTitle>
        <CardDescription>Current storage facilities and capacity utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <WarehouseTable warehouses={warehouses} />
      </CardContent>
    </Card>
  );
};

export default WarehouseSection;
