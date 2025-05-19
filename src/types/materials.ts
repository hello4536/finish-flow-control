
export interface Material {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Critical Low' | 'Out of Stock';
  created_at: string;
  updated_at: string;
  is_hazardous?: boolean;
  hazard_class?: string;
  disposal_method?: string;
  safety_data_sheet_url?: string;
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

export interface SafetyDataSheet {
  id: string;
  material_id: string;
  file_name: string;
  file_url: string;
  version?: string;
  issue_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

export interface MaterialUsageLog {
  id: string;
  material_id: string;
  quantity: number;
  unit: string;
  used_at: string;
  used_by?: string;
  job_reference?: string;
  notes?: string;
  created_at: string;
}

export interface MaterialCompliance {
  id: string;
  material_id: string;
  ppe_requirement_id?: string;
  compliance_note?: string;
  created_at: string;
  updated_at: string;
}
