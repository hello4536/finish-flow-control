import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, AlertTriangle, FileText } from "lucide-react";
import { InventoryItem } from "@/types/inventory";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { format, isValid, parseISO } from "date-fns";
interface InventoryTableProps {
  items: InventoryItem[];
  selectedItems: string[];
  handleSelectItem: (id: string) => void;
  handleSelectAll: () => void;
}
const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  selectedItems,
  handleSelectItem,
  handleSelectAll
}) => {
  const isExpiringSoon = (date: string | null): boolean => {
    if (!date) return false;
    try {
      const expDate = parseISO(date);
      if (!isValid(expDate)) return false;
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      return expDate <= thirtyDaysFromNow;
    } catch (e) {
      return false;
    }
  };
  const formatDate = (date: string | null): string => {
    if (!date) return "N/A";
    try {
      const parsedDate = parseISO(date);
      return isValid(parsedDate) ? format(parsedDate, "MMM d, yyyy") : "Invalid date";
    } catch (e) {
      return "Invalid date";
    }
  };
  const getStatusBadgeStyles = (item: InventoryItem) => {
    if (item.status === "Expiring") {
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
    if (item.available < 5) {
      return "bg-finish-red-100 text-finish-red-800 hover:bg-finish-red-200";
    } else if (item.available < 10) {
      return "bg-finish-amber-100 text-finish-amber-800 hover:bg-finish-amber-200";
    } else {
      return "bg-finish-green-100 text-finish-green-800 hover:bg-finish-green-200";
    }
  };
  return <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 bg-sky-100">
            <Checkbox id="select-all" checked={selectedItems.length === items.length && items.length > 0} onCheckedChange={handleSelectAll} className="text-white bg-white" />
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category / Type</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead className="text-right">In Stock</TableHead>
          <TableHead className="text-right">Available</TableHead>
          <TableHead>Storage</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? <TableRow>
            <TableCell colSpan={9} className="text-center py-8">
              No inventory items found. Add items or seed sample data.
            </TableCell>
          </TableRow> : items.map(item => <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/20" : ""}>
              <TableCell>
                <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={() => handleSelectItem(item.id)} />
              </TableCell>
              <TableCell>
                <div className="font-medium flex items-center gap-2">
                  {item.name}
                  {isExpiringSoon(item.expiration_date) && <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle size={16} className="text-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expires on {formatDate(item.expiration_date)}</p>
                      </TooltipContent>
                    </Tooltip>}
                  {item.sds_link && <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={item.sds_link} target="_blank" rel="noopener noreferrer">
                          <FileText size={16} className="text-blue-500" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Safety Data Sheet</p>
                      </TooltipContent>
                    </Tooltip>}
                </div>
                {item.hazard_class && item.hazard_class !== "None" && <Badge variant="outline" className="mt-1 bg-red-50 text-red-800 border-red-200">
                    {item.hazard_class}
                  </Badge>}
              </TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>
                <div>{item.category}</div>
                {item.product_type && <span className="text-xs text-muted-foreground">{item.product_type}</span>}
                {item.grit && <Badge variant="outline" className="mt-1">
                    {item.grit} Grit
                  </Badge>}
              </TableCell>
              <TableCell>{item.brand || "-"}</TableCell>
              <TableCell className="text-right">{item.in_stock}</TableCell>
              <TableCell className="text-right">
                <Badge className={getStatusBadgeStyles(item)}>
                  {item.available}
                </Badge>
              </TableCell>
              <TableCell>
                <div>{item.location}</div>
                {item.storage_zone && <span className="text-xs text-muted-foreground">{item.storage_zone}</span>}
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
            </TableRow>)}
      </TableBody>
    </Table>;
};
export default InventoryTable;