import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const inventoryCategories = ["Furniture", "Kitchen", "Office", "Basecoats", "Clearcoats", "Primers", "Masking Supplies", "Tools", "Abrasives", "PPE"];
const hazardClasses = ["None", "Flammable", "Toxic", "Corrosive", "Oxidizing", "Compressed Gas", "Harmful", "Irritant"];
const productTypes = ["Paint", "Primer", "Abrasive", "Clear Coat", "Filler", "Tape", "Sandpaper", "Respirator", "Tool", "Other"];

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  sku: z.string().min(2, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  in_stock: z.coerce.number().min(0, "Stock must be a positive number"),
  allocated: z.coerce.number().min(0, "Allocated must be a positive number"),
  location: z.string().min(1, "Location is required"),
  // New fields
  product_type: z.string().nullish(),
  brand: z.string().nullish(),
  grit: z.coerce.number().min(0).nullish(),
  voc_content: z.coerce.number().min(0).nullish(),
  hazard_class: z.string().nullish(),
  expiration_date: z.date().nullish(),
  sds_link: z.string().url("Must be a valid URL").nullish().or(z.literal("")),
  is_consumable: z.boolean().default(true),
  min_quantity: z.coerce.number().min(0).default(5),
  storage_zone: z.string().nullish(),
  barcode: z.string().nullish()
});
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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      in_stock: 0,
      allocated: 0,
      location: "",
      product_type: null,
      brand: null,
      grit: null,
      voc_content: null,
      hazard_class: null,
      expiration_date: null,
      sds_link: "",
      is_consumable: true,
      min_quantity: 5,
      storage_zone: null,
      barcode: null,
      ...initialValues
    }
  });
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="advanced">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="sku" render={({
              field
            }) => <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({
              field
            }) => <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inventoryCategories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="location" render={({
              field
            }) => <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="in_stock" render={({
              field
            }) => <FormItem>
                    <FormLabel>In Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="allocated" render={({
              field
            }) => <FormItem>
                    <FormLabel>Allocated</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <FormField control={form.control} name="min_quantity" render={({
            field
          }) => <FormItem>
                  <FormLabel>Minimum Quantity Threshold</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    System will alert when stock falls below this threshold
                  </FormDescription>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="is_consumable" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Consumable Item
                    </FormLabel>
                    <FormDescription>
                      Checkbox for consumables like paint or sandpaper. Unchecked for durable items like tools.
                    </FormDescription>
                  </div>
                </FormItem>} />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="product_type" render={({
              field
            }) => <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="brand" render={({
              field
            }) => <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3M, PPG, SATA" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="grit" render={({
              field
            }) => <FormItem>
                    <FormLabel>Grit (for abrasives)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 220, 400, 1000" {...field} value={field.value === null ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="voc_content" render={({
              field
            }) => <FormItem>
                    <FormLabel>VOC Content (g/L)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 250" {...field} value={field.value === null ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? null : parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="hazard_class" render={({
              field
            }) => <FormItem>
                    <FormLabel>Hazard Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hazard class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hazardClasses.map(hazard => <SelectItem key={hazard} value={hazard}>{hazard}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="expiration_date" render={({
              field
            }) => <FormItem className="flex flex-col">
                    <FormLabel>Expiration Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value || undefined} onSelect={field.onChange} disabled={date => date < new Date()} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="storage_zone" render={({
              field
            }) => <FormItem>
                    <FormLabel>Storage Zone</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Flammable Cabinet A" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="barcode" render={({
              field
            }) => <FormItem>
                    <FormLabel>Barcode / QR Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Barcode or QR code value" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <FormField control={form.control} name="sds_link" render={({
            field
          }) => <FormItem>
                  <FormLabel>SDS Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>
                    Link to Safety Data Sheet PDF or document
                  </FormDescription>
                  <FormMessage />
                </FormItem>} />
          </TabsContent>
        </Tabs>

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>;
};
export default AddInventoryForm;