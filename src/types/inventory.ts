
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
