
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useEquipmentStats } from '@/hooks/useEquipmentStats';
import { Box, Archive, AlertTriangle, CheckCircle } from 'lucide-react';

const EquipmentStats: React.FC = () => {
  const { stats, isLoading } = useEquipmentStats();
  
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-24 animate-pulse bg-gray-100">
            <CardContent className="p-6" />
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium leading-none text-muted-foreground">Total Equipment</p>
            <Box className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-2xl font-bold">{stats?.total || 0}</p>
              <p className="text-xs text-muted-foreground">items in inventory</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium leading-none text-muted-foreground">Currently Assigned</p>
            <Archive className="h-4 w-4 text-orange-500" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-2xl font-bold">{stats?.assigned || 0}</p>
              <p className="text-xs text-muted-foreground">assigned to employees</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium leading-none text-muted-foreground">Maintenance Due</p>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-2xl font-bold">{stats?.maintenanceDue || 0}</p>
              <p className="text-xs text-muted-foreground">need servicing</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium leading-none text-muted-foreground">Available</p>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-2xl font-bold">{stats?.available || 0}</p>
              <p className="text-xs text-muted-foreground">ready for use</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentStats;
