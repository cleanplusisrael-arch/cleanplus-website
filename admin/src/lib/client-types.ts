export type ClientStatus = 'active' | 'inactive' | 'vip';
export type ClientType   = 'private' | 'business';

export interface Client {
  id: string;
  clientNumber: string;        // C-00001
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  clientType: ClientType;
  teudatZehut?: string;        // private person
  misparOsek?: string;         // business (ח.פ / ע.מ)
  status: ClientStatus;
  notes?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  private:  'פרטי',
  business: 'עסקי',
};

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  active:   'פעיל',
  inactive: 'לא פעיל',
  vip:      'VIP',
};

export const CLIENT_STATUS_COLORS: Record<ClientStatus, string> = {
  active:   'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200',
  vip:      'bg-gold/10 text-yellow-700 border-yellow-300',
};

export const ZONES = [
  'תל אביב', 'הרצליה', 'נתניה', 'קיסריה', 'כפר סבא',
  'רעננה', 'הוד השרון', 'חדרה', 'ראשון לציון', 'פתח תקווה',
];
