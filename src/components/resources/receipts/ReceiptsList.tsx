
import React from 'react';
import { Loader2 } from "lucide-react";
import ReceiptCard from './ReceiptCard';
import EmptyState from './EmptyState';
import { Receipt } from '@/hooks/useResourceReceipts';

interface ReceiptsListProps {
  receipts: Receipt[];
  isLoading: boolean;
  onViewReceipt: (receipt: Receipt) => void;
  onDeleteReceipt: (id: string) => void;
  isDeleting: boolean;
}

const ReceiptsList: React.FC<ReceiptsListProps> = ({ 
  receipts, 
  isLoading, 
  onViewReceipt, 
  onDeleteReceipt,
  isDeleting
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (receipts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {receipts.map((receipt) => (
        <ReceiptCard 
          key={receipt.id} 
          receipt={receipt} 
          onView={onViewReceipt} 
          onDelete={onDeleteReceipt}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default ReceiptsList;
