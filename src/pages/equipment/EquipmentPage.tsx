
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import EquipmentList from './components/EquipmentList';
import AssignmentsList from './components/AssignmentsList';
import MaintenanceList from './components/MaintenanceList';
import EquipmentStats from './components/EquipmentStats';
import EquipmentHeader from './components/EquipmentHeader';

const EquipmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('equipment');
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <EquipmentHeader />
      <EquipmentStats />
      
      <Tabs
        defaultValue="equipment"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-white">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equipment" className="space-y-4">
          <EquipmentList />
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          <AssignmentsList />
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4">
          <MaintenanceList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentPage;
