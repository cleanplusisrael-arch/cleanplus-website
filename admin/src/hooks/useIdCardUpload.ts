'use client';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export function useIdCardUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function uploadIdCard(employeeId: string, file: File): Promise<string> {
    setUploading(true);
    setProgress(0);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const storageRef = ref(storage, `employees/${employeeId}/id-card.${ext}`);
    return new Promise((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        'state_changed',
        (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        (err) => { setUploading(false); reject(err); },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          setUploading(false);
          setProgress(0);
          resolve(url);
        }
      );
    });
  }

  async function deleteIdCard(employeeId: string) {
    try {
      // Try common extensions
      for (const ext of ['jpg', 'jpeg', 'png', 'pdf', 'webp']) {
        try {
          await deleteObject(ref(storage, `employees/${employeeId}/id-card.${ext}`));
          return;
        } catch { /* try next */ }
      }
    } catch { /* ignore if not found */ }
  }

  return { uploadIdCard, deleteIdCard, uploading, progress };
}
