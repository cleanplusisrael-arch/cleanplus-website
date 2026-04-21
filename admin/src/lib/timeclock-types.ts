export interface TimeclockEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  shiftId?: string;
  date: string;         // YYYY-MM-DD
  clockIn?: string;     // ISO timestamp
  clockOut?: string;    // ISO timestamp
  lat?: number;
  lng?: number;
  notes?: string;
  createdAt: string;
}

export function calcHours(entry: TimeclockEntry): number | null {
  if (!entry.clockIn || !entry.clockOut) return null;
  return (new Date(entry.clockOut).getTime() - new Date(entry.clockIn).getTime()) / 3600000;
}
