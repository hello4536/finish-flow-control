import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AddEquipmentDialog from './AddEquipmentDialog';
const EquipmentHeader = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const {
    userRole
  } = useAuth();
  const isAdmin = userRole?.role === 'admin';
  return <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-purple-600">Equipment Management</h1>
        <p className="text-muted-foreground">
          Manage equipment, assignments, and maintenance schedules
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-purple-600">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
        <Button variant="outline" size="sm" className="text-purple-600">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        {isAdmin && <Button onClick={() => setIsAddDialogOpen(true)} size="sm" className="bg-purple-600 hover:bg-purple-500">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>}
      </div>
      
      <AddEquipmentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>;
};
export default EquipmentHeader;