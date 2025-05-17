
import React, { useState, useEffect } from 'react';
import { useResourceReceipts } from '@/hooks/useResourceReceipts';
import ReceiptForm from './receipts/ReceiptForm';
import ReceiptsList from './receipts/ReceiptsList';
import ReceiptViewDialog from './receipts/ReceiptViewDialog';

interface ReceiptsSectionProps {
  onCountChange: (count: number) => void;
}

const ReceiptsSection: React.FC<ReceiptsSectionProps> = ({ onCountChange }) => {
  const { 
    receipts, 
    isLoading, 
    addReceipt, 
    deleteReceipt,
    selectedReceipt,
    setSelectedReceipt,
    getCategories
  } = useResourceReceipts();
  
  const [viewOpen, setViewOpen] = useState(false);

  // Update parent component with count
  useEffect(() => {
    onCountChange(receipts.length);
  }, [receipts.length, onCountChange]);

  // View receipt details
  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setViewOpen(true);
  };

  // Delete a receipt
  const handleDeleteReceipt = async (id: string) => {
    try {
      await deleteReceipt.mutateAsync(id);
      
      // Close the dialog if we're deleting the currently viewed receipt
      if (selectedReceipt?.id === id) {
        setViewOpen(false);
      }
    } catch (error) {
      // Error handled in the mutation
    }
  };
  
  // Get unique categories
  const categories = getCategories();

  return (
    <div className="space-y-6">
      <ReceiptForm 
        addReceipt={addReceipt} 
        categories={categories} 
      />

      <ReceiptsList
        receipts={receipts}
        isLoading={isLoading}
        onViewReceipt={handleViewReceipt}
        onDeleteReceipt={handleDeleteReceipt}
        isDeleting={deleteReceipt.isPending}
      />
      
      <ReceiptViewDialog
        receipt={selectedReceipt}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onDelete={handleDeleteReceipt}
      />
    </div>
  );
};

export default ReceiptsSection;
