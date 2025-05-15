
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Warehouse } from "@/types/inventory";

interface WarehouseTableProps {
  warehouses: Warehouse[];
}

const WarehouseTable: React.FC<WarehouseTableProps> = ({ warehouses }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Capacity</TableHead>
          <TableHead className="text-right">Utilized</TableHead>
          <TableHead className="text-right">Utilization</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {warehouses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              No warehouses found. Add a warehouse or seed sample data.
            </TableCell>
          </TableRow>
        ) : (
          warehouses.map((warehouse) => {
            const utilization = Math.round((warehouse.utilized / warehouse.capacity) * 100);
            return (
              <TableRow key={warehouse.id}>
                <TableCell className="font-medium">{warehouse.name}</TableCell>
                <TableCell>{warehouse.location}</TableCell>
                <TableCell className="text-right">{warehouse.capacity.toLocaleString()}</TableCell>
                <TableCell className="text-right">{warehouse.utilized.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          utilization > 90 ? "bg-red-500" : 
                          utilization > 75 ? "bg-amber-500" : 
                          "bg-green-500"
                        }`}
                        style={{ width: `${utilization}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{utilization}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default WarehouseTable;
