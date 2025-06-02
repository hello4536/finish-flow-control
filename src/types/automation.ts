
export interface ComplianceReport {
  id: string;
  report_type: 'osha' | 'epa' | 'inspection';
  title: string;
  status: 'pending' | 'generated' | 'submitted' | 'failed';
  generated_at?: string;
  due_date: string;
  content: Record<string, any>;
  file_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceSchedule {
  id: string;
  equipment_id: string;
  equipment?: {
    id: string;
    name: string;
    type: string;
  };
  maintenance_type: 'predictive' | 'preventive' | 'calibration';
  frequency_days: number;
  last_performed?: string;
  next_due: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  automated_alert: boolean;
  alert_days_before: number;
  status: 'active' | 'paused' | 'completed';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceAlert {
  id: string;
  equipment_id: string;
  schedule_id?: string;
  equipment?: {
    id: string;
    name: string;
    type: string;
  };
  alert_type: 'due' | 'overdue' | 'predictive';
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AutomationSettings {
  id: string;
  setting_key: string;
  setting_value: Record<string, any>;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}
