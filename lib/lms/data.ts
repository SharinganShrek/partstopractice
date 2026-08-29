import { createClient } from '@/lib/supabase/server';
import type {
  AssignmentSubmission,
  Certificate,
  ContentItem,
  CourseFeedbackSubmission,
  Module,
  ModuleWithContent,
  QuizAttempt,
  StudentProgress,
} from './types';

export async function getModules(): Promise<Module[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .order('order_index');

  if (error) throw error;
  return data ?? [];
}

export async function getModulesWithContent(): Promise<ModuleWithContent[]> {
  const supabase = await createClient();

  const { data: modules, error: modError } = await supabase
    .from('modules')
    .select('*')
    .order('order_index');

  if (modError) throw modError;

  const { data: items, error: itemError } = await supabase
    .from('content_items')
    .select('*')
    .order('order_index');

  if (itemError) throw itemError;

  return (modules ?? []).map((mod) => ({
    ...mod,
    content_items: (items ?? []).filter((i) => i.module_id === mod.id) as ContentItem[],
  }));
}

export async function getContentItemWithQuiz(contentItemId: string) {
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', contentItemId)
    .maybeSingle();

  if (error || !item) return null;

  if (!item.quiz_id) return { item, quiz: null, questions: [] };

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', item.quiz_id)
    .maybeSingle();

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', item.quiz_id)
    .order('order_index');

  return { item, quiz, questions: questions ?? [] };
}

export async function getUserLmsData(userId: string) {
  const supabase = await createClient();

  const [progressRes, attemptsRes, assignmentsRes, certRes, profileRes, feedbackRes] =
    await Promise.all([
    supabase.from('student_progress').select('*').eq('user_id', userId),
    supabase.from('quiz_attempts').select('*').eq('user_id', userId),
    supabase.from('assignment_submissions').select('*').eq('user_id', userId),
    supabase.from('certificates').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('course_feedback_submissions').select('*').eq('user_id', userId),
  ]);

  return {
    progress: (progressRes.data ?? []) as StudentProgress[],
    attempts: (attemptsRes.data ?? []) as QuizAttempt[],
    assignments: (assignmentsRes.data ?? []) as AssignmentSubmission[],
    certificate: (certRes.data ?? null) as Certificate | null,
    profile: profileRes.data,
    feedbackSubmissions: (feedbackRes.data ?? []) as CourseFeedbackSubmission[],
  };
}

export async function getAllContentItems(): Promise<ContentItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('content_items').select('*').order('order_index');
  return (data ?? []) as ContentItem[];
}

export async function getCapstoneContentItem(): Promise<ContentItem | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('content_items')
    .select('*')
    .eq('type', 'capstone')
    .maybeSingle();
  return (data ?? null) as ContentItem | null;
}
