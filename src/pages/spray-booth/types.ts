
export interface SprayBooth {
  id: string;
  name: string;
  booth_number: string;
  location?: string;
  capacity: number;
  status: "active" | "maintenance" | "offline";
  specifications?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BoothReservation {
  id: string;
  booth_id: string;
  reserved_by: string;
  start_time: string;
  end_time: string;
  date: string;
  job_reference?: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBoothData {
  name: string;
  booth_number: string;
  location?: string;
  capacity: number;
  status: "active" | "maintenance" | "offline";
  notes?: string;
}

export interface UpdateBoothData extends CreateBoothData {
  id: string;
}

export interface CreateReservationData {
  booth_id: string;
  reserved_by: string;
  start_time: string;
  end_time: string;
  date: string;
  job_reference?: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes?: string;
}
