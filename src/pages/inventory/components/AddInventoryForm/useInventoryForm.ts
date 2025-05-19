
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "./schema";

type FormValues = z.infer<typeof formSchema>;

export const useInventoryForm = (initialValues: Partial<FormValues> = {}) => {
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

  return form;
};
