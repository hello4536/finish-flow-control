
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar } from "lucide-react";
import { Material } from "@/types/materials";

interface MaterialBasicInfoProps {
  material: Material;
}

const MaterialBasicInfo: React.FC<MaterialBasicInfoProps> = ({ material }) => {
  const createdDate = new Date(material.created_at).toLocaleDateString();
  const updatedDate = new Date(material.updated_at).toLocaleDateString();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Material Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Name</h4>
              <p className="text-base">{material.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
              <p className="text-base">{material.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
              <p className="text-base">{material.quantity} {material.unit}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <p className="text-base">{material.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Tracking Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
              <p className="text-base">{createdDate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
              <p className="text-base">{updatedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialBasicInfo;
