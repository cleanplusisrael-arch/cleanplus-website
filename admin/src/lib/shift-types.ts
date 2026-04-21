export type ShiftStatus = 'planned' | 'in_progress' | 'done' | 'cancelled';

export interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  clientName: string;
  address: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  service?: string;
  notes?: string;
  status: ShiftStatus;
  createdAt: string;
  updatedAt?: string;
}

export const SHIFT_STATUS_LABELS: Record<ShiftStatus, string> = {
  planned:     'מתוכנן',
  in_progress: 'בביצוע',
  done:        'הושלם',
  cancelled:   'בוטל',
};

export const SHIFT_STATUS_COLORS: Record<ShiftStatus, string> = {
  planned:     'bg-blue-50 text-blue-700 border-blue-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  done:        'bg-green-50 text-green-700 border-green-200',
  cancelled:   'bg-gray-100 text-gray-500 border-gray-200',
};

// Israeli week: Sunday=0 ... Friday=5 (Saturday excluded)
export const DAYS_HE = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
