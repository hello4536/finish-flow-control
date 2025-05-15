
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const JobsTable: React.FC = () => {
  const { toast } = useToast();
  
  const handleViewJob = (jobId: string, jobName: string) => {
    toast({
      title: `Viewing Job: ${jobId}`,
      description: `Details for ${jobName} will be displayed soon.`,
    });
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Job ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Current Step</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">J-1001</TableCell>
            <TableCell>Custom Dining Table</TableCell>
            <TableCell>Sanding</TableCell>
            <TableCell>Wood Finishing</TableCell>
            <TableCell>Alex Johnson</TableCell>
            <TableCell>May 18, 2025</TableCell>
            <TableCell>
              <Badge className="bg-finish-amber-500 whitespace-nowrap px-3">In Progress</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1001", "Custom Dining Table")}>View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">J-1002</TableCell>
            <TableCell>Kitchen Cabinet Doors</TableCell>
            <TableCell>Final QC</TableCell>
            <TableCell>Wood Finishing</TableCell>
            <TableCell>Maria Rodriguez</TableCell>
            <TableCell>May 17, 2025</TableCell>
            <TableCell>
              <Badge className="bg-finish-amber-500 whitespace-nowrap px-3">In Progress</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1002", "Kitchen Cabinet Doors")}>View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">J-1003</TableCell>
            <TableCell>Bookshelf</TableCell>
            <TableCell>Staining</TableCell>
            <TableCell>Wood Finishing</TableCell>
            <TableCell>John Smith</TableCell>
            <TableCell>May 19, 2025</TableCell>
            <TableCell>
              <Badge className="bg-finish-amber-500 whitespace-nowrap px-3">In Progress</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1003", "Bookshelf")}>View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">J-1004</TableCell>
            <TableCell>Conference Table</TableCell>
            <TableCell>Sealing</TableCell>
            <TableCell>Wood Finishing</TableCell>
            <TableCell>Sarah Lee</TableCell>
            <TableCell>May 15, 2025</TableCell>
            <TableCell>
              <Badge className="bg-finish-amber-500 whitespace-nowrap px-3">In Progress</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1004", "Conference Table")}>View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">J-1005</TableCell>
            <TableCell>Office Desk</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Wood Finishing</TableCell>
            <TableCell>-</TableCell>
            <TableCell>May 25, 2025</TableCell>
            <TableCell>
              <Badge variant="outline">Upcoming</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1005", "Office Desk")}>View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">J-1006</TableCell>
            <TableCell>Vintage Dresser Refinish</TableCell>
            <TableCell>Complete</TableCell>
            <TableCell>Wood Refinishing</TableCell>
            <TableCell>Alex Johnson</TableCell>
            <TableCell>May 12, 2025</TableCell>
            <TableCell>
              <Badge className="bg-finish-green-500">Complete</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1006", "Vintage Dresser Refinish")}>View</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">J-1007</TableCell>
            <TableCell>Front Door Restoration</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Exterior Paint</TableCell>
            <TableCell>-</TableCell>
            <TableCell>May 24, 2025</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-finish-red-500 text-white">On Hold</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewJob("J-1007", "Front Door Restoration")}>View</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
