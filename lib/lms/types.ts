export type ContentItemType =
  | 'video'
  | 'reading'
  | 'topic_quiz'
  | 'module_assessment'
  | 'performance_task'
  | 'capstone';

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type AssignmentStatus = 'submitted' | 'under_review' | 'approved' | 'revision';
export type ProjectStatus = 'pending' | 'under_review' | 'approved' | 'revision';
export type ProfileRole = 'student' | 'moderator' | 'instructor';

export interface QuizOption {
  key: string;
  text: string;
}

export interface QuizQuestion {
  id?: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface Module {
  id: number;
  order_index: number;
  title: string;
  description: string | null;
  slug: string;
}

export interface Quiz {
  id: string;
  title: string;
  passing_score: number;
  questions?: QuizQuestionRow[];
}

export interface QuizQuestionRow {
  id: string;
  quiz_id: string;
  order_index: number;
  question_text: string;
  options: QuizOption[];
  correct_answer: string;
}

export interface ContentItem {
  id: string;
  module_id: number;
  order_index: number;
  type: ContentItemType;
  title: string;
  drive_url: string | null;
  quiz_id: string | null;
  estimated_duration_minutes: number | null;
  duration_seconds: number | null;
  unit_label: string | null;
  unit_order: number | null;
  quiz?: Quiz | null;
}

export interface ModuleWithContent extends Module {
  content_items: ContentItem[];
}

export interface StudentProgress {
  id: string;
  user_id: string;
  content_item_id: string;
  status: ProgressStatus;
  watch_seconds: number;
  completed_at: string | null;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  answers: Record<string, string>;
  passed: boolean;
  completed_at: string;
}

export interface AssignmentSubmission {
  id: string;
  user_id: string;
  content_item_id: string;
  primary_link: string;
  secondary_link: string | null;
  status: AssignmentStatus;
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

export interface ProjectSubmission {
  id: string;
  user_id: string;
  drive_link: string | null;
  file_path: string | null;
  status: ProjectStatus;
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

export interface Certificate {
  id: string;
  user_id: string;
  average_score: number;
  pdf_path: string | null;
  issued_at: string;
  email_sent_at: string | null;
  verification_code: string | null;
}

export interface CourseStats {
  completionPercent: number;
  averageScore: number;
  mediaCompletionPercent: number;
  totalItems: number;
  completedItems: number;
  certificateEligible: boolean;
  certificateIssued: boolean;
  capstoneApproved: boolean;
  hasCapstone: boolean;
  allQuizzesPassed: boolean;
  mediaCompletionMet: boolean;
}

export interface SeedQuizFile {
  title: string;
  passingScore?: number;
  questions: QuizQuestion[];
}

export interface SeedContentItem {
  order: number;
  type: ContentItemType;
  title: string;
  driveUrl?: string;
  estimatedDurationMinutes?: number;
  durationSeconds?: number;
  quizFile?: string;
  unitLabel?: string;
  unitOrder?: number;
}

export interface SeedModuleContent {
  moduleSlug: string;
  items: SeedContentItem[];
}

export interface CertificateVerification {
  studentName: string;
  courseName: string;
  averageScore: number;
  issuedAt: string;
  verificationCode: string;
}
