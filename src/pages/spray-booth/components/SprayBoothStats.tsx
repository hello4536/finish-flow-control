
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gauge, Calendar, CheckCircle, TrendingUp } from 'lucide-react';
import { SprayBooth, BoothReservation } from '../types';
import { format } from 'date-fns';

interface SprayBoothStatsProps {
  booths: SprayBooth[];
  reservations: BoothReservation[];
  isLoading?: boolean;
}

const SprayBoothStats: React.FC<SprayBoothStatsProps> = ({ 
  booths, 
  reservations, 
  isLoading = false 
}) => {
  // Calculate metrics
  const totalBooths = booths.length;
  const activeBooths = booths.filter(booth => booth.status === 'active').length;
  const todaysReservations = reservations.filter(
    reservation => reservation.date === format(new Date(), 'yyyy-MM-dd')
  ).length;
  
  // Calculate utilization rate (simplified for demo)
  const utilizationRate = totalBooths > 0 
    ? Math.round((todaysReservations / (totalBooths * 8)) * 100) // Assuming 8 hour slots per day
    : 0;

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Total Booths Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Booths</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Gauge className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-blue-800 mb-1">{totalBooths}</div>
            <div className="text-sm text-blue-600 font-medium">Available spray booths</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Active Booths Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Active Booths</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-green-800 mb-1">{activeBooths}</div>
            <div className="text-sm text-green-600 font-medium">Operational booths</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Today's Reservations Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Today's Reservations</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-orange-800 mb-1">{todaysReservations}</div>
            <div className="text-sm text-orange-600 font-medium">Scheduled for today</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Utilization Rate Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Utilization Rate</div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-purple-800 mb-1">{utilizationRate}%</div>
            <div className="text-sm text-purple-600 font-medium">Current efficiency</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SprayBoothStats;
