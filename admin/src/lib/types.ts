export type LeadStatus = 'new' | 'contacted' | 'quote_sent' | 'won' | 'lost';
export type LeadService = 'residential' | 'office' | 'renovation' | 'other';
export type LeadSource = 'site' | 'ads' | 'whatsapp' | 'referral';

export interface StatusHistoryEntry {
  status: LeadStatus;
  timestamp: string;
  note?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  service?: LeadService;
  city?: string;
  notes?: string;
  internalNotes?: string;
  source?: LeadSource;
  status: LeadStatus;
  statusHistory?: StatusHistoryEntry[];
  locale?: string;
  createdAt: string;
  updatedAt?: string;
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'חדש',
  contacted: 'נוצר קשר',
  quote_sent: 'הצעת מחיר נשלחה',
  won: 'סגור — זכייה',
  lost: 'סגור — הפסד',
};

export const LEAD_STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  new:        { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  contacted:  { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
  quote_sent: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  won:        { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  lost:       { bg: 'bg-gray-100',  text: 'text-gray-500',   border: 'border-gray-200' },
};

export const LEAD_STATUS_DOT: Record<LeadStatus, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-amber-500',
  quote_sent: 'bg-purple-500',
  won: 'bg-green-500',
  lost: 'bg-gray-400',
};

export const LEAD_SERVICE_LABELS: Record<LeadService, string> = {
  residential: 'ניקיון דירה/בית',
  office:      'ניקיון משרד/עסק',
  renovation:  'ניקיון אחרי שיפוץ',
  other:       'אחר',
};

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  site:     'אתר',
  ads:      'פרסום',
  whatsapp: 'וואטסאפ',
  referral: 'המלצה',
};

export const ALL_STATUSES: LeadStatus[] = ['new', 'contacted', 'quote_sent', 'won', 'lost'];
