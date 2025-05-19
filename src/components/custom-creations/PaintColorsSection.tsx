
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaintBucket, Trash2, Plus, Loader2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaintColors, PaintColor } from "@/hooks/usePaintColors";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const colorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color code"),
  rgbValues: z.string().optional(),
  cmykValues: z.string().optional(),
  labValues: z.string().optional(),
  substrateType: z.string().optional(),
  applicationMethod: z.string().optional(),
  environmentalNotes: z.string().optional(),
  deltaE: z.string().optional(),
  temperature: z.string().optional(),
  humidity: z.string().optional(),
  boothLighting: z.string().optional(),
  notes: z.string().optional(),
});

type ColorFormValues = z.infer<typeof colorSchema>;

const substrates = ["Oak", "Maple", "Pine", "Cherry", "Walnut", "MDF", "Plywood", "Aluminum", "Steel", "Glass", "Plastic", "Other"];
const applicationMethods = ["Spray", "Brush", "Wipe", "Dip", "Roll", "Other"];

interface PaintColorsSectionProps {
  onCountChange: (count: number) => void;
}

const PaintColorsSection: React.FC<PaintColorsSectionProps> = ({ onCountChange }) => {
  const { toast } = useToast();
  const { paintColors, isLoading, addPaintColor, deletePaintColor } = usePaintColors();
  const [swatchImage, setSwatchImage] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePath, setImagePath] = useState<string | null>(null);
  
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
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
      notes: "",
    },
  });

  // Debug log to check if paintColors are being retrieved
  useEffect(() => {
    console.log("Paint colors in component:", paintColors);
  }, [paintColors]);

  // Update parent component with count
  useEffect(() => {
    console.log("Updating count:", paintColors?.length || 0);
    onCountChange(paintColors?.length || 0);
  }, [paintColors, onCountChange]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setSwatchImage(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Only .jpg and .png files are allowed",
          variant: "destructive",
        });
      }
    }
  };

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
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Add a new paint color
  const onSubmit = async (values: ColorFormValues) => {
    console.log("Form submitted with values:", values);
    
    let imageUrl = null;
    if (swatchImage) {
      imageUrl = await uploadImage();
    }
    
    // Get current date and format as string
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    
    // Get current user (in a real app, this would come from auth)
    const currentUser = "Current User";  // Replace with actual user info when auth is implemented
    
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
        setImagePath(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ocean Blue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
              <FormField
                control={form.control}
                name="hexCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HEX Code</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="#0066CC" {...field} />
                      </FormControl>
                      <div 
                        className="h-10 w-10 rounded-md border border-input" 
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rgbValues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RGB Values</FormLabel>
                    <FormControl>
                      <Input placeholder="0, 102, 204" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="cmykValues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CMYK Values</FormLabel>
                  <FormControl>
                    <Input placeholder="100, 50, 0, 20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="labValues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>L*a*b* Values</FormLabel>
                  <FormControl>
                    <Input placeholder="32.3, 79.2, -107.9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deltaE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delta E (Spectrophotometer)</FormLabel>
                  <FormControl>
                    <Input placeholder="1.2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Color Swatch Image</FormLabel>
              <div className="flex items-center gap-2">
                <Input 
                  type="file" 
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
                {swatchImage && (
                  <div className="h-10 w-10 rounded border border-input overflow-hidden">
                    <img 
                      src={URL.createObjectURL(swatchImage)}
                      alt="Color swatch preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </FormItem>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="substrateType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Substrate Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select substrate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {substrates.map(substrate => (
                          <SelectItem key={substrate} value={substrate}>{substrate}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="applicationMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Method</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {applicationMethods.map(method => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature</FormLabel>
                    <FormControl>
                      <Input placeholder="72°F" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="humidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Humidity</FormLabel>
                    <FormControl>
                      <Input placeholder="45%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="boothLighting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booth Lighting</FormLabel>
                    <FormControl>
                      <Input placeholder="D65" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="environmentalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environmental Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Notes about environmental conditions during color creation"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any other notes about this color"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={addPaintColor.isPending || uploadingImage}
          >
            {(addPaintColor.isPending || uploadingImage) ? (
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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : paintColors && paintColors.length > 0 ? (
        <>
          <div className="text-sm text-muted-foreground mb-2">
            {paintColors.length} color{paintColors.length !== 1 ? 's' : ''} saved
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paintColors.map((color) => (
              <Card key={color.id} className="group overflow-hidden">
                <CardContent className="p-4 flex flex-col gap-2">
                  <div 
                    className="w-full h-24 rounded-md" 
                    style={{ backgroundColor: color.hex_code }}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{color.name}</h3>
                      <p className="text-xs text-muted-foreground">{color.hex_code}</p>
                      {color.rgb_values && (
                        <p className="text-xs text-muted-foreground">RGB: {color.rgb_values}</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => deletePaintColor.mutate(color.id)}
                      disabled={deletePaintColor.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  {(color.substrate_type || color.application_method) && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {color.substrate_type && <span>Substrate: {color.substrate_type}</span>}
                      {color.substrate_type && color.application_method && <span> • </span>}
                      {color.application_method && <span>Applied: {color.application_method}</span>}
                    </div>
                  )}
                  
                  {color.swatch_image && (
                    <div className="mt-2">
                      <img 
                        src={color.swatch_image} 
                        alt={`${color.name} swatch`}
                        className="w-full h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  {color.notes && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {color.notes}
                    </p>
                  )}
                  
                  {color.created_by && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Created by: {color.created_by}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <PaintBucket className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No paint colors saved yet</p>
          <p className="text-sm">Add your first color using the form above</p>
        </div>
      )}
    </div>
  );
};

export default PaintColorsSection;
