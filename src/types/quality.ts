
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
