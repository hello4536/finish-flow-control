
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AddEquipmentDialog from './AddEquipmentDialog';

const EquipmentHeader = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { userRole } = useAuth();
  const isAdmin = userRole?.role === 'admin';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Equipment Management
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Manage equipment, assignments, and maintenance schedules
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-0 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-0 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        {isAdmin && (
          <Button 
            onClick={() => setIsAddDialogOpen(true)} 
            size="sm" 
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-6 py-3"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        )}
      </div>
      
      <AddEquipmentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
};

export default EquipmentHeader;
