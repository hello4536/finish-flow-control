
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Settings, FileCheck, Wrench } from 'lucide-react';
import ComplianceAutomationTab from './components/ComplianceAutomationTab';
import MaintenanceAutomationTab from './components/MaintenanceAutomationTab';
import AutomationSettingsTab from './components/AutomationSettingsTab';
import AutomationStats from './components/AutomationStats';

const AutomationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Automation Center
            </h1>
            <p className="text-slate-600 mt-2 font-medium">
              Regulatory compliance automation and intelligent equipment maintenance
            </p>
          </div>
        </div>

        <AutomationStats />

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-2">
                <TabsTrigger 
                  value="compliance" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl"
                >
                  <FileCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Compliance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="maintenance" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl"
                >
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Maintenance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compliance" className="space-y-4">
                <ComplianceAutomationTab />
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <MaintenanceAutomationTab />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <AutomationSettingsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomationPage;
