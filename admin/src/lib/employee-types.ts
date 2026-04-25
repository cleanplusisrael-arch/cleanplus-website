export type EmployeeStatus  = 'active' | 'inactive';
export type ContractType    = 'full_time' | 'part_time' | 'hourly' | 'freelance';
export type Gender          = 'male' | 'female';
export type MaritalStatus   = 'single' | 'married' | 'divorced' | 'widowed';

export interface Child {
  name: string;
  birthDate: string; // YYYY-MM-DD
}

export interface Employee {
  id: string;
  employeeNumber: string;       // E-00001
  name: string;
  teudatZehut?: string;         // Israeli ID
  phone: string;
  email?: string;
  zone?: string;
  hireDate?: string;
  status: EmployeeStatus;
  contractType?: ContractType;
  nekudotZikui?: number;
  grossSalary?: number;         // monthly (for full_time / part_time)
  hourlyRate?: number;          // per hour (for hourly)
  notes?: string;
  birthDate?: string;           // YYYY-MM-DD
  idCardUrl?: string;           // Firebase Storage URL

  // Form 101 fields
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  address?: string;
  city?: string;
  children?: Child[];
  bankName?: string;
  bankBranch?: string;
  bankAccount?: string;
  isOnlyEmployer?: boolean;     // מעסיק יחיד
  spouseHasIncome?: boolean;
  disabilityPercent?: number;   // 0-100
  isNewImmigrant?: boolean;
  immigrationDate?: string;     // YYYY-MM-DD
  postalCode?: string;          // מיקוד
  settlementZaka?: boolean;     // תושב ישוב מזכה (סעיף 11)

  createdAt: string;
  updatedAt?: string;
}

export const CONTRACT_LABELS: Record<ContractType, string> = {
  full_time: 'משרה מלאה',
  part_time: 'משרה חלקית',
  hourly:    'שעתי',
  freelance: 'עצמאי/פרילנס',
};

export const GENDER_LABELS: Record<Gender, string> = {
  male:   'זכר',
  female: 'נקבה',
};

export const MARITAL_LABELS: Record<MaritalStatus, string> = {
  single:   'רווק/ה',
  married:  'נשוי/אה',
  divorced: 'גרוש/ה',
  widowed:  'אלמן/ה',
};

export const ISRAELI_BANKS = [
  'בנק לאומי', 'בנק הפועלים', 'בנק דיסקונט', 'בנק מזרחי-טפחות',
  'בנק הבינלאומי', 'בנק ירושלים', 'בנק אוצר החייל', 'בנק מרכנתיל',
  'בנק יהב', 'First International Bank', 'בנק פאגי',
];

export const ZONES = [
  'תל אביב', 'הרצליה', 'נתניה', 'קיסריה', 'כפר סבא',
  'רעננה', 'הוד השרון', 'חדרה', 'ראשון לציון', 'פתח תקווה',
];

// Auto-calculate nekudot zikui from employee data (2025 rates)
export function calcNekudotZikui(emp: Partial<Employee>): { total: number; breakdown: { label: string; points: number }[] } {
  const breakdown: { label: string; points: number }[] = [];
  const today = new Date();

  // Base credit
  const base = emp.gender === 'female' ? 2.75 : 2.25;
  breakdown.push({ label: emp.gender === 'female' ? 'תושב/ת — נקבה' : 'תושב — זכר', points: base });

  // Children credits
  const children = emp.children ?? [];
  for (const child of children) {
    const birthDate = new Date(child.birthDate);
    const ageMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
    const ageYears = ageMonths / 12;

    if (ageYears < 18) {
      if (ageYears < 5 && emp.gender === 'female') {
        // Mothers of children under 5 get 1.5 per child
        breakdown.push({ label: `ילד/ה עד גיל 5 (${child.name || 'ילד'})`, points: 1.5 });
      } else {
        breakdown.push({ label: `ילד/ה עד גיל 18 (${child.name || 'ילד'})`, points: 1.0 });
      }
    }
  }

  // Single parent
  if ((emp.maritalStatus === 'divorced' || emp.maritalStatus === 'widowed') && children.length > 0) {
    breakdown.push({ label: 'הורה יחיד', points: 1.0 });
  }

  // Spouse with no income
  if (emp.maritalStatus === 'married' && emp.spouseHasIncome === false) {
    breakdown.push({ label: 'בן/בת זוג ללא הכנסה', points: 1.0 });
  }

  // Disability
  if ((emp.disabilityPercent ?? 0) >= 90) {
    breakdown.push({ label: 'נכות 90%+', points: 2.0 });
  } else if ((emp.disabilityPercent ?? 0) >= 50) {
    breakdown.push({ label: 'נכות 50%–89%', points: 1.0 });
  }

  // New immigrant (simplified: first 18 months)
  if (emp.isNewImmigrant && emp.immigrationDate) {
    const immigDate = new Date(emp.immigrationDate);
    const monthsSince = (today.getFullYear() - immigDate.getFullYear()) * 12 + (today.getMonth() - immigDate.getMonth());
    if (monthsSince <= 18) breakdown.push({ label: 'עולה חדש (1–18 חודשים)', points: 3.0 });
    else if (monthsSince <= 24) breakdown.push({ label: 'עולה חדש (19–24 חודשים)', points: 2.0 });
    else if (monthsSince <= 42) breakdown.push({ label: 'עולה חדש (25–42 חודשים)', points: 1.0 });
  }

  const total = Math.round(breakdown.reduce((s, b) => s + b.points, 0) * 100) / 100;
  return { total, breakdown };
}
