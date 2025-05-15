
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Material } from "@/types/materials";

interface MaterialsTableProps {
  materials: Material[];
  onEdit?: (material: Material) => void;
  onDelete?: (material: Material) => void;
}

const MaterialsTable: React.FC<MaterialsTableProps> = ({ 
  materials, 
  onEdit, 
  onDelete 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-finish-green-100 text-finish-green-800";
      case "Low Stock":
        return "bg-finish-amber-100 text-finish-amber-800";
      case "Critical Low":
        return "bg-finish-red-100 text-finish-red-800";
      default:
        return "bg-finish-gray-100 text-finish-gray-800";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map(material => (
          <TableRow key={material.id}>
            <TableCell className="font-medium">{material.name}</TableCell>
            <TableCell>{material.type}</TableCell>
            <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                {material.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={() => onEdit?.(material)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={() => onDelete?.(material)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaterialsTable;
