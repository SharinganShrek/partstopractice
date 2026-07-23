'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getLanguageInfo } from '@/lib/i18n/config';
import type { VideoRequest, RequestStatus } from '@/lib/video-requests';

type StatusFilter = RequestStatus | 'all';

const STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'Bekleyen',
  approved: 'Onaylanan',
  rejected: 'Reddedilen',
};

const STATUS_COLORS: Record<RequestStatus, string> = {
  pending: 'bg-[#f5f5dc] text-[#800020]',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<VideoRequest[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});
  const [showRejectForm, setShowRejectForm] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== 'moderator') {
      router.replace('/admin/login');
      return false;
    }
    return true;
  }, [router]);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const query = filter === 'all' ? '' : `?status=${filter}`;
    const response = await fetch(`/api/admin/video-requests${query}`);
    if (response.status === 401) {
      router.replace('/admin/login');
      return;
    }
    const result = await response.json();
    setRequests(result.data ?? []);
    setLoading(false);
  }, [filter, router]);

  useEffect(() => {
    checkAuth().then((ok) => {
      if (ok) fetchRequests();
    });
  }, [checkAuth, fetchRequests]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected', notes?: string) {
    setActionLoading(id);
    const response = await fetch(`/api/admin/video-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, moderator_notes: notes ?? null }),
    });

    if (response.ok) {
      setShowRejectForm(null);
      await fetchRequests();
    }
    setActionLoading(null);
  }

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="bg-[#800020] text-white py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Moderatör Paneli</h1>
            <p className="text-[#f5f5dc]/80 text-sm mt-1">Video gönderim talepleri</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-white/30 text-sm hover:bg-white/10 transition-colors self-start"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {(['pending', 'approved', 'rejected', 'all'] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-[#800020] text-white shadow'
                  : 'bg-white text-[#495057] border border-[#e9ecef] hover:bg-[#f8f9fa]'
              }`}
            >
              {status === 'all' ? 'Tümü' : STATUS_LABELS[status]}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-[#495057]">Yükleniyor...</p>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e9ecef] p-8 text-center text-[#495057]">
            Bu filtrede talep bulunmuyor.
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md border border-[#e9ecef] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#212529]">{request.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#800020]/10 text-[#800020]">
                        {request.video_type.toUpperCase()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e9ecef] text-[#495057]">
                        {getLanguageInfo(request.language).flag}{' '}
                        {getLanguageInfo(request.language).name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[request.status]}`}
                      >
                        {STATUS_LABELS[request.status]}
                      </span>
                    </div>
                  </div>
                  <time className="text-xs text-[#495057]">
                    {new Date(request.created_at).toLocaleString('tr-TR')}
                  </time>
                </div>

                <div className="space-y-2 text-sm text-[#495057] mb-4">
                  <p>
                    <span className="font-medium">Google Drive:</span>{' '}
                    <a
                      href={request.drive_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:underline break-all"
                    >
                      {request.drive_link}
                    </a>
                  </p>
                  {(request.submitter_name || request.submitter_email) && (
                    <p>
                      <span className="font-medium">Gönderen:</span>{' '}
                      {[request.submitter_name, request.submitter_email].filter(Boolean).join(' — ')}
                    </p>
                  )}
                  {request.moderator_notes && (
                    <p>
                      <span className="font-medium">Moderatör notu:</span> {request.moderator_notes}
                    </p>
                  )}
                </div>

                {request.status === 'pending' && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(request.id, 'approved')}
                      disabled={actionLoading === request.id}
                      className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() =>
                        setShowRejectForm(showRejectForm === request.id ? null : request.id)
                      }
                      disabled={actionLoading === request.id}
                      className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
                    >
                      Reddet
                    </button>
                  </div>
                )}

                {showRejectForm === request.id && (
                  <div className="mt-4 pt-4 border-t border-[#e9ecef] space-y-3">
                    <textarea
                      value={rejectNotes[request.id] ?? ''}
                      onChange={(e) =>
                        setRejectNotes((prev) => ({ ...prev, [request.id]: e.target.value }))
                      }
                      placeholder="Reddetme nedeni (opsiyonel)"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e9ecef] text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/30"
                    />
                    <button
                      onClick={() =>
                        updateStatus(request.id, 'rejected', rejectNotes[request.id])
                      }
                      disabled={actionLoading === request.id}
                      className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
                    >
                      Reddetmeyi Onayla
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
