import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AddStainParams } from "@/hooks/stains/types";
import { stainSchema, StainFormValues } from "./validation/stainSchema";
import BasicInfoTab from "./form-sections/BasicInfoTab";
import ComponentsTab from "./form-sections/ComponentsTab";
import ApplicationTab from "./form-sections/ApplicationTab";
import { validateAndProcessFormData } from "./utils/formHelpers";
interface StainFormProps {
  addStain: UseMutationResult<any, Error, AddStainParams, unknown>;
}
const StainForm: React.FC<StainFormProps> = ({
  addStain
}) => {
  const [selectedSubstrates, setSelectedSubstrates] = useState<string[]>([]);
  const form = useForm<StainFormValues>({
    resolver: zodResolver(stainSchema),
    defaultValues: {
      name: "",
      brand: "",
      color: "",
      notes: "",
      baseComponents: [{
        name: "",
        quantity: "",
        unit: ""
      }],
      mixingInstructions: "",
      applicationMethod: "",
      dryingTime: "",
      coatsRecommended: "1"
    }
  });

  // Update form when selectedSubstrates changes
  useEffect(() => {
    form.setValue("substrateCompatibility", selectedSubstrates);
  }, [selectedSubstrates, form]);

  // Add a new stain
  const onSubmit = (values: StainFormValues) => {
    const processedData = validateAndProcessFormData(values, selectedSubstrates);
    addStain.mutate(processedData as AddStainParams);
    form.reset();
    setSelectedSubstrates([]);
  };
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TabsContent value="basic" className="space-y-4">
          <BasicInfoTab form={form} />
        </TabsContent>
        
        <TabsContent value="components" className="space-y-4">
          <ComponentsTab form={form} />
        </TabsContent>
        
        <TabsContent value="application" className="space-y-4">
          <ApplicationTab form={form} selectedSubstrates={selectedSubstrates} setSelectedSubstrates={setSelectedSubstrates} />
        </TabsContent>
        
        <Separator className="my-4" />
        
        <Button type="submit" disabled={addStain.isPending} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500">
          {addStain.isPending ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </> : <>
              <Plus className="mr-2 h-4 w-4" />
              Save Stain
            </>}
        </Button>
      </form>
    </Form>;
};
export default StainForm;