import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Calendar, Wrench } from 'lucide-react';
import { useEquipmentMaintenance } from '@/hooks/useEquipmentMaintenance';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import AddMaintenanceDialog from './AddMaintenanceDialog';
const MaintenanceList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    maintenanceRecords,
    isLoading
  } = useEquipmentMaintenance();
  const {
    userRole
  } = useAuth();
  const isAdmin = userRole?.role === 'admin';
  const filteredRecords = maintenanceRecords?.filter(item => item.equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.maintenanceType.toLowerCase().includes(searchQuery.toLowerCase()));
  return <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search maintenance records..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-blue-600">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            {isAdmin && <Button size="sm" onClick={() => setIsDialogOpen(true)} className="bg-blue-600 hover:bg-blue-500">
                <Plus className="mr-2 h-4 w-4" />
                Add Maintenance
              </Button>}
          </div>
        </div>
        
        {isLoading ? <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div> : <Table>
            <TableCaption>Equipment maintenance records.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-100">Equipment</TableHead>
                <TableHead className="bg-sky-100">Maintenance Type</TableHead>
                <TableHead className="bg-sky-100">Performed By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords && filteredRecords.length > 0 ? filteredRecords.map(item => <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.equipment.name}</TableCell>
                    <TableCell>{item.maintenanceType}</TableCell>
                    <TableCell>{item.performedBy}</TableCell>
                    <TableCell>{format(new Date(item.maintenanceDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      {item.nextMaintenanceDate ? format(new Date(item.nextMaintenanceDate), 'MMM dd, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>${item.cost?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Wrench className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    {searchQuery ? 'No maintenance records match your search' : 'No maintenance records found'}
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>}
        
        <AddMaintenanceDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </CardContent>
    </Card>;
};
export default MaintenanceList;