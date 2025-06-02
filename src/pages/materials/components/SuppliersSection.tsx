
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
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-emerald-50/30 to-green-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          Material Suppliers
        </CardTitle>
        <CardDescription className="text-slate-600 font-medium text-base">
          Current active suppliers providing materials to your facility
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <SuppliersTable suppliers={suppliers} />
      </CardContent>
    </Card>
  );
};

export default SuppliersSection;
