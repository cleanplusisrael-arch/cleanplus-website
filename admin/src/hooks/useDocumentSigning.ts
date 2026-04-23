'use client';
import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface SignatureRecord {
  docId: string;       // e.g. "contract-EMP-00001"
  docType: string;     // "contract" | "quote" | "tofes101"
  signedBy: string;    // employee or client name
  signedById: string;  // employee id or lead id
  signedAt: string;    // ISO timestamp
  hash: string;        // SHA-256 hex of document content
  verificationCode: string; // first 12 chars of hash, uppercase
}

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function useDocumentSigning() {
  const [signing, setSigning] = useState(false);
  const [signature, setSignature] = useState<SignatureRecord | null>(null);

  async function signDocument(params: {
    docType: string;
    signedBy: string;
    signedById: string;
    contentElementId?: string;
  }): Promise<SignatureRecord | null> {
    setSigning(true);
    try {
      const el = document.getElementById(params.contentElementId ?? 'doc-print');
      const content = el?.innerText ?? '';
      const signedAt = new Date().toISOString();
      const rawContent = `${params.docType}|${params.signedById}|${signedAt}|${content}`;
      const hash = await sha256(rawContent);
      const verificationCode = hash.slice(0, 12).toUpperCase();
      const docId = `${params.docType}-${params.signedById}`;

      const record: Omit<SignatureRecord, 'docId'> & { docId: string } = {
        docId,
        docType: params.docType,
        signedBy: params.signedBy,
        signedById: params.signedById,
        signedAt,
        hash,
        verificationCode,
      };

      await addDoc(collection(db, 'signatures'), record);
      setSignature(record);
      return record;
    } finally {
      setSigning(false);
    }
  }

  async function verifyDocument(verificationCode: string): Promise<SignatureRecord | null> {
    const q = query(collection(db, 'signatures'), where('verificationCode', '==', verificationCode.toUpperCase()));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data() as SignatureRecord;
  }

  return { signDocument, verifyDocument, signing, signature, setSignature };
}
