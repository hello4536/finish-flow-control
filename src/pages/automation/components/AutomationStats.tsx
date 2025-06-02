
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, AlertTriangle, Wrench, CheckCircle } from 'lucide-react';
import { useComplianceAutomation } from '@/hooks/useComplianceAutomation';
import { useMaintenanceAutomation } from '@/hooks/useMaintenanceAutomation';

const AutomationStats: React.FC = () => {
  const { complianceReports } = useComplianceAutomation();
  const { maintenanceAlerts, maintenanceSchedules } = useMaintenanceAutomation();

  const pendingReports = complianceReports.filter(r => r.status === 'pending').length;
  const activeAlerts = maintenanceAlerts.filter(a => a.status === 'active').length;
  const upcomingMaintenance = maintenanceSchedules.filter(s => {
    const dueDate = new Date(s.next_due);
    const today = new Date();
    const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  }).length;
  const automatedTasks = complianceReports.filter(r => r.status === 'generated').length + 
                        maintenanceSchedules.filter(s => s.automated_alert).length;

  const statCards = [
    {
      title: 'Pending Reports',
      value: pendingReports,
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Alerts',
      value: activeAlerts,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Due This Week',
      value: upcomingMaintenance,
      icon: Wrench,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Automated Tasks',
      value: automatedTasks,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AutomationStats;
