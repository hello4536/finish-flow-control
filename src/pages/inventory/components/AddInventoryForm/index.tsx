
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formSchema } from "./schema";
import { useInventoryForm } from "./useInventoryForm";
import { ItemInformationTab } from "./tabs/ItemInformationTab";

type FormValues = z.infer<typeof formSchema>;

interface AddInventoryFormProps {
  onSubmit: (data: FormValues) => void;
  initialValues?: Partial<FormValues>;
  submitLabel?: string;
}

const AddInventoryForm: React.FC<AddInventoryFormProps> = ({
  onSubmit,
  initialValues = {},
  submitLabel = "Add Item"
}) => {
  const form = useInventoryForm(initialValues);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="all_fields">
        <TabsList className="grid grid-cols-1">
          <TabsTrigger value="all_fields">Item Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all_fields" className="space-y-4 mt-4">
          <ItemInformationTab form={form} />
        </TabsContent>
      </Tabs>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};

export default AddInventoryForm;
