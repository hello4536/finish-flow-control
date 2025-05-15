
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  inStock: number;
  allocated: number;
  available: number;
  location: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
  selectedItems: number[];
  handleSelectItem: (id: number) => void;
  handleSelectAll: () => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  selectedItems,
  handleSelectItem,
  handleSelectAll,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox 
              id="select-all" 
              checked={selectedItems.length === items.length && items.length > 0}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">In Stock</TableHead>
          <TableHead className="text-right">Allocated</TableHead>
          <TableHead className="text-right">Available</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/20" : ""}>
            <TableCell>
              <Checkbox 
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => handleSelectItem(item.id)}
              />
            </TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.sku}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell className="text-right">{item.inStock}</TableCell>
            <TableCell className="text-right">{item.allocated}</TableCell>
            <TableCell className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.available < 5 ? "bg-finish-red-100 text-finish-red-800" :
                item.available < 10 ? "bg-finish-amber-100 text-finish-amber-800" :
                "bg-finish-green-100 text-finish-green-800"
              }`}>
                {item.available}
              </span>
            </TableCell>
            <TableCell>{item.location}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
