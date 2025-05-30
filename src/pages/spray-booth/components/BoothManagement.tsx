
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddBoothDialog } from "./AddBoothDialog";
import { SprayBooth } from "../types";
import { useDeleteBooth } from "../hooks/useSprayBooths";
import { toast } from "sonner";

interface BoothManagementProps {
  booths: SprayBooth[];
}

export const BoothManagement: React.FC<BoothManagementProps> = ({ booths }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingBooth, setEditingBooth] = useState<SprayBooth | null>(null);
  const deleteBooth = useDeleteBooth();

  const handleDelete = async (boothId: string) => {
    if (confirm("Are you sure you want to delete this booth? This will also delete all associated reservations.")) {
      try {
        await deleteBooth.mutateAsync(boothId);
        toast.success("Booth deleted successfully");
      } catch (error) {
        toast.error("Failed to delete booth");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "maintenance":
        return "secondary";
      case "offline":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booth Management</h2>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Booth
        </Button>
      </div>

      {booths.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Settings className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Spray Booths</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first spray booth to start scheduling
            </p>
            <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add First Booth
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {booths.map(booth => (
            <Card key={booth.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booth.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Booth #{booth.booth_number}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(booth.status)}>
                    {booth.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {booth.location && (
                  <div>
                    <span className="text-sm font-medium">Location:</span>
                    <p className="text-sm text-muted-foreground">{booth.location}</p>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium">Capacity:</span>
                  <p className="text-sm text-muted-foreground">{booth.capacity} vehicle(s)</p>
                </div>

                {booth.notes && (
                  <div>
                    <span className="text-sm font-medium">Notes:</span>
                    <p className="text-sm text-muted-foreground">{booth.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingBooth(booth)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(booth.id)}
                    className="flex items-center gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddBoothDialog
        open={showAddDialog || !!editingBooth}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) setEditingBooth(null);
        }}
        editingBooth={editingBooth}
      />
    </div>
  );
};
