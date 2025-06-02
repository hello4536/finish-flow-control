
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useEquipmentStats } from '@/hooks/useEquipmentStats';
import { Box, Archive, AlertTriangle, CheckCircle } from 'lucide-react';

const EquipmentStats: React.FC = () => {
  const { stats, isLoading } = useEquipmentStats();
  
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-slate-100 shadow-lg">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Equipment Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Equipment</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Box className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-blue-800 mb-1">{stats?.total || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Items in inventory</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Currently Assigned Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Currently Assigned</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-lg">
              <Archive className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-orange-800 mb-1">{stats?.assigned || 0}</div>
            <div className="text-sm text-orange-600 font-medium">Assigned to employees</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Maintenance Due Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Maintenance Due</div>
            <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-3 shadow-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-red-800 mb-1">{stats?.maintenanceDue || 0}</div>
            <div className="text-sm text-red-600 font-medium">Need servicing</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Available Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Available</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-green-800 mb-1">{stats?.available || 0}</div>
            <div className="text-sm text-green-600 font-medium">Ready for use</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentStats;
