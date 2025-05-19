
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { formSchema } from "../schema";
import { ProductIdentificationFields } from "../fields/ProductIdentificationFields";
import { CategoryLocationFields } from "../fields/CategoryLocationFields";
import { StockQuantityFields } from "../fields/StockQuantityFields";
import { ProductTypeFields } from "../fields/ProductTypeFields";
import { TechnicalSpecFields } from "../fields/TechnicalSpecFields";
import { HazardExpiryFields } from "../fields/HazardExpiryFields";
import { StorageTrackingFields } from "../fields/StorageTrackingFields";
import { InventoryManagementFields } from "../fields/InventoryManagementFields";
import { SdsLinkField } from "../fields/SdsLinkField";

type FormValues = z.infer<typeof formSchema>;

interface ItemInformationTabProps {
  form: UseFormReturn<FormValues>;
}

export const ItemInformationTab: React.FC<ItemInformationTabProps> = ({ form }) => {
  return (
    <Form {...form}>
      <div className="space-y-4">
        {/* Product identification section */}
        <ProductIdentificationFields form={form} />
        
        {/* Category and location */}
        <CategoryLocationFields form={form} />
        
        {/* Stock quantities */}
        <StockQuantityFields form={form} />
        
        {/* Product details */}
        <ProductTypeFields form={form} />
        
        {/* Technical specifications */}
        <TechnicalSpecFields form={form} />

        {/* Hazard and expiry */}
        <HazardExpiryFields form={form} />
        
        {/* Storage location and tracking */}
        <StorageTrackingFields form={form} />
        
        {/* Inventory management fields */}
        <InventoryManagementFields form={form} />
        
        {/* SDS link */}
        <SdsLinkField form={form} />
      </div>
    </Form>
  );
};
