
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'job' | 'meeting' | 'delivery';
  status: 'scheduled' | 'completed' | 'cancelled';
  assignedTo?: string;
}

const mockEvents: ScheduleEvent[] = [
  {
    id: 'E-001',
    title: 'Cabinet Finishing Job #J-1008',
    date: 'May 15, 2025',
    time: '9:00 AM - 12:00 PM',
    type: 'job',
    status: 'scheduled',
    assignedTo: 'Alex Johnson'
  },
  {
    id: 'E-002',
    title: 'Team Status Meeting',
    date: 'May 15, 2025',
    time: '1:00 PM - 2:00 PM',
    type: 'meeting',
    status: 'scheduled'
  },
  {
    id: 'E-003',
    title: 'Material Delivery',
    date: 'May 16, 2025',
    time: '10:30 AM',
    type: 'delivery',
    status: 'scheduled'
  },
  {
    id: 'E-004',
    title: 'Desk Refinishing Job #J-1010',
    date: 'May 17, 2025',
    time: '8:00 AM - 4:00 PM',
    type: 'job',
    status: 'scheduled',
    assignedTo: 'Maria Rodriguez'
  },
  {
    id: 'E-005',
    title: 'Client Consultation',
    date: 'May 18, 2025',
    time: '2:00 PM - 3:00 PM',
    type: 'meeting',
    status: 'scheduled'
  },
  {
    id: 'E-006',
    title: 'Door Refinishing Job #J-1012',
    date: 'May 19, 2025',
    time: '9:00 AM - 5:00 PM',
    type: 'job',
    status: 'scheduled',
    assignedTo: 'John Smith'
  },
  {
    id: 'E-007',
    title: 'Supply Inventory Review',
    date: 'May 20, 2025',
    time: '11:00 AM - 12:00 PM',
    type: 'meeting',
    status: 'scheduled'
  },
  {
    id: 'E-008',
    title: 'Bookshelf Finishing Job #J-1015',
    date: 'May 21, 2025',
    time: '8:00 AM - 3:00 PM',
    type: 'job',
    status: 'scheduled',
    assignedTo: 'Sarah Lee'
  }
];

const ScheduleList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || event.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Schedule</CardTitle>
        <CardDescription>View and manage all upcoming events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-[220px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="job">Jobs</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="delivery">Deliveries</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button size="sm">Refresh</Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.id}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>
                      <Badge className={
                        event.type === 'job' ? 'bg-accent' : 
                        event.type === 'meeting' ? 'bg-primary' : 
                        'bg-green-500'
                      }>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.assignedTo || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEvents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No events found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleList;
