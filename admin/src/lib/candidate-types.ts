export type CandidateStatus = 'new' | 'called' | 'interview' | 'hired' | 'rejected';

export interface StatusHistoryEntry {
  status: CandidateStatus;
  timestamp: string;
  note?: string;
}

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  availability?: string;
  zone?: string;
  experience?: string;
  notes?: string;
  internalNotes?: string;
  status: CandidateStatus;
  statusHistory?: StatusHistoryEntry[];
  createdAt: string;
  updatedAt?: string;
}

export const CANDIDATE_STATUS_LABELS: Record<CandidateStatus, string> = {
  new:       'חדש',
  called:    'בוצעה שיחה',
  interview: 'ראיון מתוכנן',
  hired:     'התקבל לעבודה',
  rejected:  'לא מתאים',
};

export const CANDIDATE_STATUS_COLORS: Record<CandidateStatus, { bg: string; text: string; border: string }> = {
  new:       { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  called:    { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
  interview: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  hired:     { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  rejected:  { bg: 'bg-gray-100',  text: 'text-gray-500',   border: 'border-gray-200' },
};

export const CANDIDATE_STATUS_DOT: Record<CandidateStatus, string> = {
  new:       'bg-blue-500',
  called:    'bg-amber-500',
  interview: 'bg-purple-500',
  hired:     'bg-green-500',
  rejected:  'bg-gray-400',
};

export const ALL_CANDIDATE_STATUSES: CandidateStatus[] = ['new', 'called', 'interview', 'hired', 'rejected'];
