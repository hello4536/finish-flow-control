
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <EquipmentHeader />
        <EquipmentStats />
        
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardContent className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Equipment Management
              </h2>
              <p className="text-slate-600 mt-1 font-medium">
                Manage equipment, track assignments, and schedule maintenance
              </p>
            </div>
            
            <Tabs defaultValue="equipment" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg rounded-xl p-1">
                <TabsTrigger 
                  value="equipment" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Equipment
                </TabsTrigger>
                <TabsTrigger 
                  value="assignments"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Assignments
                </TabsTrigger>
                <TabsTrigger 
                  value="maintenance"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Maintenance
                </TabsTrigger>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EquipmentPage;
