
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  in_stock: number;
  allocated: number;
  available: number;
  location: string;
  created_at: string;
  updated_at: string;
  // New fields for auto body shop
  product_type: string | null;
  brand: string | null;
  grit: number | null;
  voc_content: number | null;
  hazard_class: string | null;
  expiration_date: string | null;
  sds_link: string | null;
  is_consumable: boolean | null;
  min_quantity: number | null;
  storage_zone: string | null;
  barcode: string | null;
  status: string | null;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  utilized: number;
  created_at: string;
  updated_at: string;
}
