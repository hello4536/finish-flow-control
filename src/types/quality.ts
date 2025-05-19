
export interface QualityInspection {
  id: string;
  inspection_id: string;
  date: string;
  product: string;
  inspector: string;
  status: 'Passed' | 'Failed' | 'Pending';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  certification_id: string;
  name: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  expiry: string;
  authority: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceIssue {
  id: string;
  issue_id: string;
  date: string;
  type: string;
  description: string;
  status: 'Resolved' | 'In Progress' | 'Pending Review';
  assignee: string;
  created_at: string;
  updated_at: string;
}

export interface RegulatoryCompliance {
  id: string;
  jurisdiction: string;
  requirement: string;
  feature_key: string;
  region: string;
  notes: string | null;
  applies: boolean;
  created_at: string;
  updated_at: string;
}

export type Region = 'US' | 'Canada' | 'All';

export interface HazardousWaste {
  id: string;
  waste_id: string;
  material: string;
  quantity: number;
  unit: string;
  disposal_date: string;
  disposal_method: string;
  handler: string;
  status: 'Pending' | 'In Progress' | 'Disposed';
  manifest_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  material_id?: string; // Added this to match the database schema we updated
}

export interface PPERequirement {
  id: string;
  requirement_id: string;
  department: string;
  equipment: string;
  standard: string;
  required_by: string;
  last_inspection: string;
  next_inspection: string;
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowStatistics {
  totalWorkflows: number;
  activeJobs: number;
  completedJobs: number;
  efficiency: number;
}
