
export interface ScheduleEvent {
  id: string;
  event_id: string;
  title: string;
  date: string;
  time: string;
  end_time?: string;
  type: 'job' | 'meeting' | 'delivery';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  description?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}
