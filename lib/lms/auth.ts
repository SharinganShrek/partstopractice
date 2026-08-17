import { createClient } from '@/lib/supabase/server';

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAuthenticatedUser() {
  const user = await getSessionUser();
  if (!user) {
    return { user: null, error: 'Unauthorized' as const };
  }
  return { user, error: null };
}

export async function requireLmsAccess() {
  const { user, error } = await requireAuthenticatedUser();
  if (error || !user) {
    return { user: null, error: 'Unauthorized' as const };
  }

  const isModerator = user.app_metadata?.role === 'moderator';
  if (isModerator) {
    return { user, error: null, isModerator: true };
  }

  const supabase = await createClient();
  const { data: enrollment } = await supabase
    .from('course_enrollments')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!enrollment) {
    return { user: null, error: 'Not enrolled' as const };
  }

  return { user, error: null, isModerator: false };
}

export async function requireModerator() {
  const user = await getSessionUser();
  if (!user || user.app_metadata?.role !== 'moderator') {
    return { user: null, error: 'Forbidden' as const };
  }
  return { user, error: null };
}
