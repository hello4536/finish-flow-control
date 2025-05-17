
import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Trash2, Calendar } from "lucide-react";
import { Receipt } from '@/hooks/useResourceReceipts';

interface ReceiptCardProps {
  receipt: Receipt;
  onView: (receipt: Receipt) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt, onView, onDelete, isDeleting }) => {
  return (
    <Card className="relative overflow-hidden group">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
          {/* Icon and basic info */}
          <div className="flex flex-1 items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium truncate">{receipt.name}</h3>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>{receipt.company}</span>
                <span className="hidden sm:inline">•</span>
                <span>${parseFloat(String(receipt.amount)).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Middle section: Date & Category */}
          <div className="flex flex-row justify-between md:justify-start md:flex-col md:min-w-[120px] text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{format(new Date(receipt.date), 'MMM d, yyyy')}</span>
            </div>
            {receipt.category && (
              <div>
                <span className="inline-block bg-secondary px-2 py-0.5 text-xs rounded-full">
                  {receipt.category}
                </span>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onView(receipt)}
            >
              View
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(receipt.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptCard;
