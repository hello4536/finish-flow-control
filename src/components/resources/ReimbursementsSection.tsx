
import React, { useEffect } from 'react';
import { useResourceReimbursements } from '@/hooks/useResourceReimbursements';
import { ReimbursementForm, ReimbursementSummaryCards, ReimbursementTable } from './reimbursements';

interface ReimbursementsSectionProps {
  onCountChange: (count: number) => void;
}

const ReimbursementsSection: React.FC<ReimbursementsSectionProps> = ({ onCountChange }) => {
  const { reimbursements } = useResourceReimbursements();
  
  // Update parent component with count
  useEffect(() => {
    onCountChange(reimbursements.length);
  }, [reimbursements.length, onCountChange]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ReimbursementSummaryCards />

      {/* Add Reimbursement Form */}
      <ReimbursementForm />
      
      {/* Reimbursements Table */}
      <ReimbursementTable />
    </div>
  );
};

export default ReimbursementsSection;
