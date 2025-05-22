import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SuppliersTable from "./SuppliersTable";
import { Supplier } from "@/types/materials";
interface SuppliersSectionProps {
  suppliers: Supplier[];
}
const SuppliersSection: React.FC<SuppliersSectionProps> = ({
  suppliers
}) => {
  return <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">Material Suppliers</CardTitle>
        <CardDescription>Current active suppliers providing materials to your facility</CardDescription>
      </CardHeader>
      <CardContent>
        <SuppliersTable suppliers={suppliers} />
      </CardContent>
    </Card>;
};
export default SuppliersSection;