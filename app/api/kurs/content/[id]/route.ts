import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getContentItemWithQuiz } from '@/lib/lms/data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const data = await getContentItemWithQuiz(id);

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    item: data.item,
    quiz: data.quiz,
    questions: data.questions,
  });
}
