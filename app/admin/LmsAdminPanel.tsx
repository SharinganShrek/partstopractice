'use client';

import { useCallback, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface ProjectRow {
  id: string;
  user_id: string;
  primary_link: string | null;
  secondary_link: string | null;
  arduino_link: string | null;
  status: string;
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  profiles?: { full_name: string; email: string };
}

interface FeedbackRow {
  id: string;
  user_id: string;
  full_name: string;
  team_message: string;
  improvement_feedback: string;
  submitted_at: string;
  profiles?: { full_name: string; email: string };
}

interface StudentRow {
  userId: string;
  email: string;
  fullName: string;
  stats: {
    completionPercent: number;
    averageScore: number;
    mediaCompletionPercent: number;
    certificateEligible: boolean;
  };
  capstoneStatus: string | null;
  hasCertificate: boolean;
}

interface EnrollmentRow {
  id: string;
  email: string;
  user_id: string | null;
  enrolled_at: string;
}

export default function LmsAdminPanel() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [courseFeedbacks, setCourseFeedbacks] = useState<FeedbackRow[]>([]);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [projRes, feedbackRes, studRes, enrollRes] = await Promise.all([
      fetch('/api/admin/lms/projects'),
      fetch('/api/admin/lms/feedback'),
      fetch('/api/admin/lms/students'),
      fetch('/api/admin/lms/enrollments'),
    ]);

    if (projRes.ok) {
      const data = await projRes.json();
      setProjects(data.data ?? []);
    }
    if (feedbackRes.ok) {
      const data = await feedbackRes.json();
      setCourseFeedbacks(data.data ?? []);
    }
    if (studRes.ok) {
      const data = await studRes.json();
      setStudents(data.students ?? []);
    }
    if (enrollRes.ok) {
      const data = await enrollRes.json();
      setEnrollments(data.data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function reviewProject(id: string, status: string) {
    const grade = grades[id] ? parseInt(grades[id], 10) : undefined;
    await fetch('/api/admin/lms/projects', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        status,
        grade,
        feedback: feedbacks[id] ?? null,
      }),
    });
    await fetchAll();
  }

  async function addEnrollment(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/admin/lms/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail }),
    });
    setNewEmail('');
    await fetchAll();
  }

  async function removeEnrollment(id: string) {
    await fetch('/api/admin/lms/enrollments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchAll();
  }

  if (loading) return <p className="text-[#495057]">Yükleniyor...</p>;

  return (
    <Tabs defaultValue="projects">
      <TabsList className="mb-4">
        <TabsTrigger value="projects">Capstone</TabsTrigger>
        <TabsTrigger value="feedback">
          Geri Bildirimler{courseFeedbacks.length > 0 && ` (${courseFeedbacks.length})`}
        </TabsTrigger>
        <TabsTrigger value="students">Öğrenciler</TabsTrigger>
        <TabsTrigger value="enrollments">
          Kayıt Listesi{enrollments.length > 0 && ` (${enrollments.length})`}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-[#495057]">Henüz capstone teslimi yok.</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="bg-white rounded-lg border border-[#e9ecef] p-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <p className="font-bold">{p.profiles?.full_name ?? p.user_id}</p>
                  <p className="text-sm text-[#495057]">{p.profiles?.email}</p>
                </div>
                <Badge variant="muted">{p.status}</Badge>
              </div>
              <div className="space-y-2 text-sm mb-4">
                {p.primary_link && (
                  <p>
                    <span className="font-medium">Tinkercad:</span>{' '}
                    <a
                      href={p.primary_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:underline break-all"
                    >
                      {p.primary_link}
                    </a>
                  </p>
                )}
                {p.secondary_link && (
                  <p>
                    <span className="font-medium">Teknik Rapor:</span>{' '}
                    <a
                      href={p.secondary_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:underline break-all"
                    >
                      {p.secondary_link}
                    </a>
                  </p>
                )}
                {p.arduino_link && (
                  <p>
                    <span className="font-medium">Donanım + Kod:</span>{' '}
                    <a
                      href={p.arduino_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:underline break-all"
                    >
                      {p.arduino_link}
                    </a>
                  </p>
                )}
              </div>
              {p.status === 'submitted' || p.status === 'under_review' ? (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Not (0-100)"
                    value={grades[p.id] ?? ''}
                    onChange={(e) => setGrades((prev) => ({ ...prev, [p.id]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                  <textarea
                    placeholder="Geri bildirim"
                    value={feedbacks[p.id] ?? ''}
                    onChange={(e) => setFeedbacks((prev) => ({ ...prev, [p.id]: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => reviewProject(p.id, 'approved')}
                      className="px-4 py-2 rounded-full bg-green-600 text-white text-sm"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => reviewProject(p.id, 'revision')}
                      className="px-4 py-2 rounded-full bg-amber-600 text-white text-sm"
                    >
                      Revizyon
                    </button>
                  </div>
                </div>
              ) : (
                p.grade != null && (
                  <p className="mt-2 text-sm">
                    Not: %{p.grade}{p.feedback && `: ${p.feedback}`}
                  </p>
                )
              )}
            </div>
          ))
        )}
      </TabsContent>

      <TabsContent value="feedback" className="space-y-4">
        {courseFeedbacks.length === 0 ? (
          <p className="text-[#495057]">Henüz geri bildirim yok.</p>
        ) : (
          courseFeedbacks.map((f) => (
            <div key={f.id} className="bg-white rounded-lg border border-[#e9ecef] p-5 space-y-3">
              <div>
                <p className="font-bold">{f.full_name}</p>
                <p className="text-sm text-[#495057]">{f.profiles?.email}</p>
                <p className="text-xs text-[#495057] mt-1">
                  {new Date(f.submitted_at).toLocaleString('tr-TR')}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#495057] uppercase tracking-wide">
                  IMC ekibine mesaj
                </p>
                <p className="text-sm mt-1 whitespace-pre-wrap">{f.team_message}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#495057] uppercase tracking-wide">
                  İyileştirme önerisi
                </p>
                <p className="text-sm mt-1 whitespace-pre-wrap">{f.improvement_feedback}</p>
              </div>
            </div>
          ))
        )}
      </TabsContent>

      <TabsContent value="students">
        {/* Mobile card layout */}
        <div className="md:hidden space-y-3">
          {students.length === 0 ? (
            <p className="p-6 text-center text-[#495057] bg-white rounded-lg border">
              Henüz giriş yapmış öğrenci yok.
            </p>
          ) : (
            students.map((s) => (
              <div key={s.userId} className="bg-white rounded-lg border p-4 space-y-3">
                <div>
                  <p className="font-medium">{s.fullName}</p>
                  <p className="text-xs text-[#495057] break-all">{s.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-[#495057]">Medya %</p>
                    <p className="font-medium">%{s.stats.mediaCompletionPercent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#495057]">İlerleme</p>
                    <p className="font-medium">%{s.stats.completionPercent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#495057]">Quiz Ort.</p>
                    <p className="font-medium">%{s.stats.averageScore}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#495057]">Capstone</p>
                    <p className="font-medium">{s.capstoneStatus ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#495057]">Sertifika</p>
                    <p className="font-medium">{s.hasCertificate ? '✓' : '-'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-[#f8f9fa]">
                <tr>
                  <th className="text-left p-3">Öğrenci</th>
                  <th className="text-left p-3">Medya %</th>
                  <th className="text-left p-3">İlerleme</th>
                  <th className="text-left p-3">Quiz Ort.</th>
                  <th className="text-left p-3">Capstone</th>
                  <th className="text-left p-3">Sertifika</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.userId} className="border-t">
                    <td className="p-3">
                      <p className="font-medium">{s.fullName}</p>
                      <p className="text-xs text-[#495057]">{s.email}</p>
                    </td>
                    <td className="p-3">%{s.stats.mediaCompletionPercent}</td>
                    <td className="p-3">%{s.stats.completionPercent}</td>
                    <td className="p-3">%{s.stats.averageScore}</td>
                    <td className="p-3">{s.capstoneStatus ?? '-'}</td>
                    <td className="p-3">{s.hasCertificate ? '✓' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {students.length === 0 && (
            <p className="p-6 text-center text-[#495057]">Henüz giriş yapmış öğrenci yok.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="enrollments" className="space-y-4">
        <p className="text-sm text-[#495057]">
          Toplam <span className="font-semibold text-[#212529]">{enrollments.length}</span> kayıtlı
          öğrenci
        </p>
        <form onSubmit={addEnrollment} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="ornek@okul.edu.tr"
            className="flex-1 px-4 py-2 rounded-lg border text-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#800020] text-white text-sm font-medium"
          >
            Ekle
          </button>
        </form>
        <div className="space-y-2">
          {enrollments.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between bg-white rounded-lg border p-3 text-sm"
            >
              <div>
                <p className="font-medium">{e.email}</p>
                <p className="text-xs text-[#495057]">
                  {e.user_id ? 'Giriş yaptı' : 'Bekliyor'} ·{' '}
                  {new Date(e.enrolled_at).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <button
                onClick={() => removeEnrollment(e.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
