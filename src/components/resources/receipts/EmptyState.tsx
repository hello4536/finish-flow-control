
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-10 text-muted-foreground">
      <FileText className="h-10 w-10 mx-auto mb-4 opacity-50" />
      <p>No receipts uploaded yet</p>
      <p className="text-sm">Upload your first receipt using the form above</p>
    </div>
  );
};

export default EmptyState;
