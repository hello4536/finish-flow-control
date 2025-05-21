
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Edit } from 'lucide-react';
import { useEquipmentAssignments } from '@/hooks/useEquipmentAssignments';
import { format } from 'date-fns';

const AssignmentsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { assignments, isLoading } = useEquipmentAssignments();
  
  const filteredAssignments = assignments?.filter(item => 
    item.equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <Table>
            <TableCaption>A list of all equipment assignments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Date Assigned</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments && filteredAssignments.length > 0 ? (
                filteredAssignments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.equipment.name}</TableCell>
                    <TableCell>{item.assignee.name}</TableCell>
                    <TableCell>{format(new Date(item.assignedDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      {item.returnDate 
                        ? format(new Date(item.returnDate), 'MMM dd, yyyy') 
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {searchQuery ? 'No assignments match your search' : 'No assignments found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentsList;
