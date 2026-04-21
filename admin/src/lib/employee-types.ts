export type EmployeeStatus   = 'active' | 'inactive';
export type ContractType     = 'full_time' | 'part_time' | 'hourly' | 'freelance';

export interface Employee {
  id: string;
  name: string;
  phone: string;
  email?: string;
  zone?: string;
  hireDate?: string;
  status: EmployeeStatus;
  contractType?: ContractType;
  nekudotZikui?: number;
  grossSalary?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export const CONTRACT_LABELS: Record<ContractType, string> = {
  full_time: 'משרה מלאה',
  part_time: 'משרה חלקית',
  hourly:    'שעתי',
  freelance: 'עצמאי/פרילנס',
};

export const ZONES = ['תל אביב', 'הרצליה', 'נתניה', 'קיסריה', 'כפר סבא', 'רעננה', 'הוד השרון', 'חדרה', 'ראשון לציון'];
