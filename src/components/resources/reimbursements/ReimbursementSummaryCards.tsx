
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Receipt, DollarSign } from 'lucide-react';
import { useResourceReimbursements } from '@/hooks/useResourceReimbursements';

const ReimbursementSummaryCards = () => {
  const { getTotalByStatus } = useResourceReimbursements();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600">
                {formatCurrency(getTotalByStatus('pending'))}
              </h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <CalendarIcon className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Approved</p>
              <h3 className="text-2xl font-bold text-blue-600">
                {formatCurrency(getTotalByStatus('approved'))}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Receipt className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paid</p>
              <h3 className="text-2xl font-bold text-green-600">
                {formatCurrency(getTotalByStatus('paid'))}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReimbursementSummaryCards;
