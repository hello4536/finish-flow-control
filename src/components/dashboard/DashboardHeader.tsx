
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resetAllData } from "@/utils/resetData";

const DashboardHeader: React.FC = () => {
  const { toast } = useToast();
  
  const handleReset = async () => {
    const success = await resetAllData();
    if (success) {
      // Force reload the page to reflect changes
      window.location.reload();
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-bold tracking-tight text-[#0b2065]">Dashboard</h2>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <Button variant="outline" size="sm">
          Last 7 days
        </Button>
        <Button size="sm" className="rounded-sm bg-orange-500 hover:bg-orange-400 text-slate-50">View All</Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Application Data</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all mock and user data from the application. You'll start with a fresh database.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground">
                Reset All Data
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DashboardHeader;
