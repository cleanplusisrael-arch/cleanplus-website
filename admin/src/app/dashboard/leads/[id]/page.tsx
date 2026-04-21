'use client';
import { use } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { Header } from '@/components/layout/Header';
import { LeadDetail } from '@/components/leads/LeadDetail';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { leads, loading, updateLeadStatus, addInternalNote } = useLeads();

  const lead = leads.find((l) => l.id === id);

  return (
    <>
      <Header title="פרטי ליד" />
      <div className="p-6" dir="rtl">
        {loading ? (
          <div className="py-20 text-center text-gray-400 font-hebrew text-sm">טוען...</div>
        ) : !lead ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-hebrew mb-4">הליד לא נמצא</p>
            <Link href="/dashboard/leads" className="text-gold hover:underline font-hebrew text-sm">
              חזרה לרשימה
            </Link>
          </div>
        ) : (
          <LeadDetail
            lead={lead}
            onStatusChange={updateLeadStatus}
            onSaveNotes={addInternalNote}
          />
        )}
      </div>
    </>
  );
}
