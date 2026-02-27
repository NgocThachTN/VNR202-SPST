import { NextResponse } from 'next/server';
import { questionBank } from '@/app/quiz/lib/questionBank';
import { QuizQuestion } from '@/lib/quizTypes';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const { numQuestions = 6, randomize = true } = (body || {}) as { numQuestions?: number; randomize?: boolean };

    if (questionBank.length === 0) {
      return NextResponse.json({ error: 'Ngân hàng câu hỏi trống, hãy thêm câu hỏi trước.' }, { status: 500 });
    }

    const count = clamp(Math.floor(numQuestions) || 1, 1, questionBank.length);
    const pool = randomize ? shuffle(questionBank) : [...questionBank];
    const questions = pool.slice(0, count);

    return NextResponse.json({ questions, totalAvailable: questionBank.length, used: questions.length });
  } catch (error: any) {
    console.error('Quiz generate error:', error);
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 });
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
