
export interface Equipment {
  id: string;
  name: string;
  type: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  purchase_date?: string;
  purchase_cost?: number;
  condition: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface EquipmentAssignment {
  id: string;
  equipment: {
    id: string;
    name: string;
    type: string;
  };
  assignee: {
    id: string;
    name: string;
  };
  assigner: {
    id: string;
    name: string;
  };
  assignedDate: string;
  returnDate?: string;
  status: string;
  notes?: string;
}

export interface MaintenanceRecord {
  id: string;
  equipment: {
    id: string;
    name: string;
    type: string;
  };
  maintenanceType: string;
  performedBy: string;
  maintenanceDate: string;
  nextMaintenanceDate?: string;
  cost?: number;
  notes?: string;
}
