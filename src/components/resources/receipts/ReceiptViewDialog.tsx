
import React from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { Receipt } from '@/hooks/useResourceReceipts';

interface ReceiptViewDialogProps {
  receipt: Receipt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
}

const ReceiptViewDialog: React.FC<ReceiptViewDialogProps> = ({ 
  receipt, 
  open, 
  onOpenChange,
  onDelete 
}) => {
  if (!receipt) return null;

  // Format file size for display
  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{receipt.name}</DialogTitle>
          <DialogDescription>
            Uploaded on {format(new Date(receipt.created_at), 'MMMM d, yyyy')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <h4 className="text-sm font-medium">Company</h4>
              <p>{receipt.company}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Amount</h4>
              <p>${parseFloat(String(receipt.amount)).toFixed(2)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Date</h4>
              <p>{format(new Date(receipt.date), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Category</h4>
              <p>{receipt.category || "Uncategorized"}</p>
            </div>
            {receipt.notes && (
              <div className="col-span-2">
                <h4 className="text-sm font-medium">Notes</h4>
                <p className="text-sm whitespace-pre-wrap">{receipt.notes}</p>
              </div>
            )}
            <div className="col-span-2">
              <h4 className="text-sm font-medium">File</h4>
              <div className="flex items-center justify-between mt-1">
                <div className="text-sm text-muted-foreground">
                  {formatFileSize(receipt.size)} • {receipt.type.split('/')[1].toUpperCase()}
                </div>
                <a 
                  href={receipt.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  View Receipt <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(receipt.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Receipt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptViewDialog;
