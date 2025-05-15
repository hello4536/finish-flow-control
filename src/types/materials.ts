
export interface Material {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Critical Low' | 'Out of Stock';
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  created_at: string;
  updated_at: string;
  materials?: Material[];
}

export interface MaterialSupplier {
  id: string;
  material_id: string;
  supplier_id: string;
  created_at: string;
}
