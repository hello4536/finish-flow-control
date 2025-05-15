
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Plus, Search } from "lucide-react";

const Jobs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
        <div className="mt-2 flex items-center space-x-2 sm:mt-0">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add New Job
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active Jobs</CardTitle>
            <ClipboardList className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Completed This Month</CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">On Hold</CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>
            View and manage all jobs in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs..."
                    className="w-[220px] pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="onhold">On Hold</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Export</Button>
                <Button variant="outline" size="sm">Filter</Button>
                <Button size="sm">Refresh</Button>
              </div>
            </div>

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
                      <Badge className="bg-finish-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Badge className="bg-finish-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Badge className="bg-finish-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Badge className="bg-finish-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Button variant="ghost" size="sm">View</Button>
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
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Jobs;
