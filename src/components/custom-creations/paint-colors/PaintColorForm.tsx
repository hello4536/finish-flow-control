import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { paintColorSchema, PaintColorFormValues } from "./validation/paintColorSchema";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { PaintColor } from "@/hooks/usePaintColors";
import BasicInfoTab from "./form-sections/BasicInfoTab";
import ColorValuesTab from "./form-sections/ColorValuesTab";
import ApplicationTab from "./form-sections/ApplicationTab";
import EnvironmentTab from "./form-sections/EnvironmentTab";

interface PaintColorFormProps {
  addPaintColor: UseMutationResult<any, Error, Omit<PaintColor, 'id' | 'created_at' | 'updated_at'>, unknown>;
}

const PaintColorForm: React.FC<PaintColorFormProps> = ({
  addPaintColor
}) => {
  const [swatchImage, setSwatchImage] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<PaintColorFormValues>({
    resolver: zodResolver(paintColorSchema),
    defaultValues: {
      name: "",
      hexCode: "#ffffff",
      rgbValues: "",
      cmykValues: "",
      labValues: "",
      substrateType: "",
      applicationMethod: "",
      environmentalNotes: "",
      deltaE: "",
      temperature: "",
      humidity: "",
      boothLighting: "",
      notes: ""
    }
  });

  const uploadImage = async () => {
    if (!swatchImage) return null;

    setUploadingImage(true);
    try {
      const fileExt = swatchImage.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `color-swatches/${fileName}`;

      const { error } = await supabase.storage
        .from('paint_colors')
        .upload(filePath, swatchImage);

      if (error) throw error;

      const { data } = supabase.storage
        .from('paint_colors')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (values: PaintColorFormValues) => {
    let imageUrl = null;

    if (swatchImage) {
      imageUrl = await uploadImage();
    }

    // Get current date and format as string
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    // Get current user (in a real app, this would come from auth)
    const currentUser = "Current User"; // Replace with actual user info when auth is implemented

    addPaintColor.mutate({
      name: values.name,
      hex_code: values.hexCode,
      rgb_values: values.rgbValues,
      cmyk_values: values.cmykValues,
      lab_values: values.labValues,
      swatch_image: imageUrl || "",
      substrate_type: values.substrateType,
      application_method: values.applicationMethod,
      environmental_notes: values.environmentalNotes,
      delta_e: values.deltaE,
      created_by: currentUser,
      temperature: values.temperature,
      humidity: values.humidity,
      booth_lighting: values.boothLighting,
      notes: values.notes
    }, {
      onSuccess: () => {
        form.reset();
        setSwatchImage(null);
      }
    });
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setSwatchImage(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Only .jpg and .png files are allowed",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Basic Information Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Basic Information</h3>
          <BasicInfoTab form={form} />
        </div>
        
        <Separator className="my-3" />
        
        {/* Color Values Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Color Values</h3>
          <ColorValuesTab form={form} />
        </div>
        
        <Separator className="my-3" />
        
        {/* Application Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Application Details</h3>
          <ApplicationTab form={form} swatchImage={swatchImage} onImageChange={handleImageChange} />
        </div>
        
        <Separator className="my-3" />
        
        {/* Environment Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Environment Conditions</h3>
          <EnvironmentTab form={form} />
        </div>
        
        <Separator className="my-4" />
        
        <Button 
          type="submit" 
          disabled={addPaintColor.isPending || uploadingImage} 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500"
        >
          {addPaintColor.isPending || uploadingImage ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Save Paint Color
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PaintColorForm;
