import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/lms/auth';
import {
  getAllContentItems,
  getCapstoneContentItem,
  getModulesWithContent,
  getUserLmsData,
} from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import KursDashboard from './KursDashboard';

export default async function KursPage() {
  const user = await getSessionUser();
  if (!user) redirect('/kurs/giris');

  const [modules, contentItems, userData] = await Promise.all([
    getModulesWithContent(),
    getAllContentItems(),
    getUserLmsData(user.id),
  ]);

  const stats = calculateCourseStats(
    contentItems,
    userData.progress,
    userData.attempts,
    userData.assignments,
    userData.certificate,
    userData.feedbackSubmissions
  );

  return (
    <KursDashboard
      modules={modules}
      initialProgress={userData.progress}
      initialAttempts={userData.attempts}
      initialAssignments={userData.assignments}
      initialStats={stats}
      initialCertificate={userData.certificate}
    />
  );
}
