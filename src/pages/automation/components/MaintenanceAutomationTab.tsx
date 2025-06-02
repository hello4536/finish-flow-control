
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Wrench, Clock, CheckCircle } from 'lucide-react';
import { useMaintenanceAutomation } from '@/hooks/useMaintenanceAutomation';

const MaintenanceAutomationTab: React.FC = () => {
  const { maintenanceAlerts, maintenanceSchedules, acknowledgeAlert, isLoading } = useMaintenanceAutomation();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading maintenance data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Maintenance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {maintenanceAlerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>No active maintenance alerts. All equipment is up to date!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {maintenanceAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.equipment?.name} - {alert.equipment?.type}</p>
                      {alert.description && (
                        <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => acknowledgeAlert.mutate(alert.id)}
                      disabled={acknowledgeAlert.isPending}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Upcoming Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {maintenanceSchedules.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No maintenance schedules configured yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {maintenanceSchedules.slice(0, 10).map((schedule) => {
                const dueDate = new Date(schedule.next_due);
                const today = new Date();
                const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                const isOverdue = daysDiff < 0;
                const isDueSoon = daysDiff <= 7 && daysDiff >= 0;

                return (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${isOverdue ? 'bg-red-100' : isDueSoon ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                        <Wrench className={`h-4 w-4 ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{schedule.equipment?.name}</h4>
                        <p className="text-sm text-gray-600">
                          {schedule.maintenance_type} - {schedule.equipment?.type}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          Due: {dueDate.toLocaleDateString()}
                          {isOverdue && <span className="text-red-600 font-medium">(Overdue)</span>}
                          {isDueSoon && <span className="text-yellow-600 font-medium">(Due Soon)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(schedule.priority)}>
                        {schedule.priority}
                      </Badge>
                      <Badge variant="outline">
                        Every {schedule.frequency_days} days
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceAutomationTab;
