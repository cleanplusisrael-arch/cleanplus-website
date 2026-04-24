'use client';
import { useState } from 'react';

export function useQuotePDF() {
  const [generating, setGenerating] = useState(false);

  async function generateAndDownload(): Promise<{ blob: Blob; filename: string } | null> {
    const el = document.getElementById('doc-print');
    if (!el) return null;
    setGenerating(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const imgH = pageW * ratio;

      if (imgH <= pageH) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgH);
      } else {
        let y = 0;
        while (y < imgH) {
          if (y > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, -y, pageW, imgH);
          y += pageH;
        }
      }

      const blob = pdf.output('blob');
      const filename = `הצעת-מחיר.pdf`;
      return { blob, filename };
    } finally {
      setGenerating(false);
    }
  }

  async function downloadPDF(filename?: string): Promise<Blob | null> {
    const result = await generateAndDownload();
    if (!result) return null;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename ?? result.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return result.blob;
  }

  async function downloadAndEmail(subject: string, body: string): Promise<void> {
    const result = await generateAndDownload();
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setTimeout(() => {
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 500);
  }

  return { downloadPDF, downloadAndEmail, generating };
}
