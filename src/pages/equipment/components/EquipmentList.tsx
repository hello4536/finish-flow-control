import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Edit, Trash, Archive, ChevronDown } from 'lucide-react';
import { useEquipment } from '@/hooks/useEquipment';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Equipment } from '@/types/equipment';
const EquipmentList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    equipment,
    isLoading,
    deleteEquipment
  } = useEquipment();
  const {
    userRole
  } = useAuth();
  const isAdmin = userRole?.role === 'admin';
  const filteredEquipment = equipment?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()) || item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase()));
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800';
      case 'damaged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100';
    }
  };
  const handleAssign = (equipment: Equipment) => {
    console.log('Assign equipment', equipment);
  };
  const handleMaintenance = (equipment: Equipment) => {
    console.log('Schedule maintenance', equipment);
  };
  return <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search equipment..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        {isLoading ? <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div> : <Table>
            <TableCaption>A list of all equipment.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-50">Name</TableHead>
                <TableHead className="bg-sky-50">Type</TableHead>
                <TableHead className="bg-sky-50">Brand/Model</TableHead>
                <TableHead className="bg-sky-50">Status</TableHead>
                <TableHead className="bg-sky-50">Condition</TableHead>
                <TableHead className="text-right bg-sky-50">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment && filteredEquipment.length > 0 ? filteredEquipment.map(item => <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{`${item.brand || '-'} / ${item.model || '-'}`}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.condition}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAssign(item)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Assign
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMaintenance(item)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Schedule Maintenance
                          </DropdownMenuItem>
                          {isAdmin && <>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteEquipment(item.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {searchQuery ? 'No equipment matches your search' : 'No equipment found'}
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>}
      </CardContent>
    </Card>;
};
export default EquipmentList;