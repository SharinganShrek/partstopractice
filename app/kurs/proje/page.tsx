import Link from 'next/link';
import { getCapstoneContentItem } from '@/lib/lms/data';
import CapstoneSubmissionForm from '../components/CapstoneSubmissionForm';

export default async function ProjePage() {
  const capstoneItem = await getCapstoneContentItem();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/kurs"
          className="text-primary hover:text-primary-dark font-semibold inline-flex items-center gap-2 mb-4 text-sm"
        >
          ← Kurs Paneline Dön
        </Link>
        <h1 className="font-display text-2xl font-bold text-text-body">Capstone Projesi</h1>
      </div>

      {capstoneItem ? (
        <CapstoneSubmissionForm contentItemId={capstoneItem.id} />
      ) : (
        <p className="text-text-muted">
          Capstone içeriği henüz yüklenmedi. Lütfen seed scriptini çalıştırın.
        </p>
      )}
    </div>
  );
}
