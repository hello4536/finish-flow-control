import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HazardousWaste, PPERequirement } from '@/types/quality';
import { Skeleton } from '@/components/ui/skeleton';
import { DateRange } from '@/hooks/useReportsData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckSquare, ShieldAlert } from 'lucide-react';
interface ComplianceReportProps {
  dateRange: DateRange;
  hazardousWaste: HazardousWaste[];
  ppeRequirements: PPERequirement[];
  isLoading: boolean;
  detailed?: boolean;
}

// Define an interface for the department compliance data
interface DepartmentComplianceData {
  department: string;
  total: number;
  compliant: number;
  complianceRate: number; // Add this property to fix the TypeScript errors
}
export const ComplianceReport: React.FC<ComplianceReportProps> = ({
  dateRange,
  hazardousWaste,
  ppeRequirements,
  isLoading,
  detailed = false
}) => {
  if (isLoading) {
    return <div className="space-y-3">
        <Skeleton className="h-[20px] w-[250px]" />
        <Skeleton className="h-[300px] w-full" />
      </div>;
  }

  // Calculate compliance statistics
  const totalPPE = ppeRequirements.length;
  const compliantPPE = ppeRequirements.filter(ppe => ppe.status === 'Compliant').length;
  const nonCompliantPPE = ppeRequirements.filter(ppe => ppe.status === 'Non-Compliant').length;
  const pendingPPE = totalPPE - compliantPPE - nonCompliantPPE;
  const pendingWaste = hazardousWaste.filter(waste => waste.status === 'Pending').length;
  const inProgressWaste = hazardousWaste.filter(waste => waste.status === 'In Progress').length;
  const disposedWaste = hazardousWaste.filter(waste => waste.status === 'Disposed').length;

  // Prepare data for charts
  const ppeStatusData = [{
    name: 'Compliant',
    value: compliantPPE
  }, {
    name: 'Non-Compliant',
    value: nonCompliantPPE
  }, {
    name: 'Pending Review',
    value: pendingPPE
  }];
  const wasteStatusData = [{
    name: 'Pending',
    value: pendingWaste
  }, {
    name: 'In Progress',
    value: inProgressWaste
  }, {
    name: 'Disposed',
    value: disposedWaste
  }];

  // Create department data with the proper type
  const departmentData: DepartmentComplianceData[] = ppeRequirements.reduce<DepartmentComplianceData[]>((acc, curr) => {
    const existing = acc.find(item => item.department === curr.department);
    if (existing) {
      existing.total += 1;
      if (curr.status === 'Compliant') existing.compliant += 1;
      existing.complianceRate = Math.round(existing.compliant / existing.total * 100);
    } else {
      const compliant = curr.status === 'Compliant' ? 1 : 0;
      acc.push({
        department: curr.department,
        total: 1,
        compliant: compliant,
        complianceRate: compliant === 1 ? 100 : 0
      });
    }
    return acc;
  }, []);

  // Calculate upcoming inspections
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  const upcomingInspections = ppeRequirements.filter(ppe => {
    const nextInspection = new Date(ppe.next_inspection);
    return nextInspection <= thirtyDaysFromNow && nextInspection >= today;
  }).length;
  const upcomingDisposals = hazardousWaste.filter(waste => {
    const disposalDate = new Date(waste.disposal_date);
    return disposalDate <= thirtyDaysFromNow && disposalDate >= today && waste.status !== 'Disposed';
  }).length;

  // Colors for charts
  const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6'];
  const COMPLIANCE_COLORS = ['#dcfce7', '#fee2e2', '#fef3c7', '#dbeafe'];
  return <div className="space-y-6">
      {detailed && <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-600">PPE Compliance</CardTitle>
              <CardDescription>Required equipment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(compliantPPE / totalPPE * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {compliantPPE} of {totalPPE} requirements met
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-600">Waste Management</CardTitle>
              <CardDescription>Disposal status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">
                  {pendingWaste}
                </div>
                <div className="text-sm text-amber-600">
                  <Badge variant="outline" className="bg-orange-500 text-white hover:bg-orange-500">
                    Pending
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {disposedWaste} disposed, {inProgressWaste} in progress
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-600">Upcoming Inspections</CardTitle>
              <CardDescription>Next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">
                  {upcomingInspections}
                </div>
                <div className="text-sm">
                  <CheckSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Scheduled equipment inspections
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-600">Upcoming Disposals</CardTitle>
              <CardDescription>Next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">
                  {upcomingDisposals}
                </div>
                <div className="text-sm">
                  <ShieldAlert className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Scheduled waste disposals
              </div>
            </CardContent>
          </Card>
        </div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2 text-blue-600 text-center">PPE Compliance by Department</h3>
          <div className="h-[300px] border rounded-md p-4 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{
                value: 'Count',
                angle: -90,
                position: 'insideLeft'
              }} />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{
                value: 'Rate (%)',
                angle: 90,
                position: 'insideRight'
              }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="total" name="Total Requirements" fill="#8884d8" />
                <Bar yAxisId="left" dataKey="compliant" name="Compliant" fill="#82ca9d" />
                <Bar yAxisId="right" dataKey="complianceRate" name="Compliance Rate (%)" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2 text-blue-600 text-center">PPE Status</h3>
            <div className="h-[300px] border rounded-md p-4 bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ppeStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                  name,
                  percent
                }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {ppeStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 text-center text-blue-600">Waste Status</h3>
            <div className="h-[300px] border rounded-md p-4 bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={wasteStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                  name,
                  percent
                }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {wasteStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {detailed && <>
          <h3 className="font-medium mt-6 mb-2 text-blue-600">Department Compliance Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentData.map((dept, index) => <div key={dept.department} className="border rounded-md p-4 bg-white">
                <h4 className="font-medium">{dept.department}</h4>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-bold">{dept.complianceRate}%</span>
                  <span className="ml-2 text-sm text-gray-500">Compliance</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${dept.complianceRate > 80 ? "bg-green-500" : dept.complianceRate > 50 ? "bg-yellow-500" : "bg-red-500"}`} style={{
                width: `${dept.complianceRate}%`
              }}></div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {dept.compliant} of {dept.total} requirements met
                </div>
              </div>)}
          </div>
        </>}
    </div>;
};