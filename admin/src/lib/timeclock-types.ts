export interface TimeclockEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  shiftId?: string;
  date: string;            // YYYY-MM-DD
  clockIn?: string;        // ISO timestamp
  clockOut?: string;       // ISO timestamp
  clockInLat?: number;
  clockInLng?: number;
  clockOutLat?: number;
  clockOutLng?: number;
  lat?: number;            // legacy — single location
  lng?: number;
  notes?: string;
  createdAt: string;
}

export function calcHours(entry: TimeclockEntry): number | null {
  if (!entry.clockIn || !entry.clockOut) return null;
  const ms = new Date(entry.clockOut).getTime() - new Date(entry.clockIn).getTime();
  if (isNaN(ms) || ms < 0) return null;
  return ms / 3600000;
}
