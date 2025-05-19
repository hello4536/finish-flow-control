
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, AlertTriangle, Eye, FileText } from "lucide-react";
import { Material } from "@/types/materials";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MaterialsTableProps {
  materials: Material[];
  onEdit?: (material: Material) => void;
  onDelete?: (material: Material) => void;
  onView?: (material: Material) => void;
}

const MaterialsTable: React.FC<MaterialsTableProps> = ({ 
  materials, 
  onEdit, 
  onDelete,
  onView
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
          <TableHead>Safety</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map(material => (
          <TableRow key={material.id}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                {material.name}
                {material.is_hazardous && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertTriangle className="h-4 w-4 text-amber-500 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hazardous material</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TableCell>
            <TableCell>{material.type}</TableCell>
            <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                {material.status}
              </span>
            </TableCell>
            <TableCell>
              {material.is_hazardous && !material.safety_data_sheet_url ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Missing SDS
                </Badge>
              ) : material.safety_data_sheet_url ? (
                <Badge variant="outline" className="bg-green-50 text-green-700">SDS Available</Badge>
              ) : (
                <span>—</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={() => onView?.(material)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
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
