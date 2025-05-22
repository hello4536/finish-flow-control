import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Supplier } from "@/types/materials";
interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit?: (supplier: Supplier) => void;
  onDelete?: (supplier: Supplier) => void;
}
const SuppliersTable: React.FC<SuppliersTableProps> = ({
  suppliers,
  onEdit,
  onDelete
}) => {
  return <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-sky-100">Supplier</TableHead>
          <TableHead className="bg-sky-100">Contact Person</TableHead>
          <TableHead className="bg-sky-100">Phone</TableHead>
          <TableHead className="bg-sky-100">Materials Supplied</TableHead>
          <TableHead className="text-right bg-sky-100">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map(supplier => <TableRow key={supplier.id}>
            <TableCell className="font-medium">{supplier.name}</TableCell>
            <TableCell>{supplier.contact}</TableCell>
            <TableCell>{supplier.phone}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {supplier.materials && supplier.materials.slice(0, 2).map((material, i) => <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {material.name}
                  </span>)}
                {supplier.materials && supplier.materials.length > 2 && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    +{supplier.materials.length - 2} more
                  </span>}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="icon" variant="ghost" onClick={() => onEdit?.(supplier)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete?.(supplier)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>;
};
export default SuppliersTable;