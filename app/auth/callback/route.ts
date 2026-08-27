import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { normalizeEmailOtpType } from '@/lib/lms/magic-link';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/kurs';
  const safeNext = next.startsWith('/') ? next : '/kurs';

  // Legacy links without token_hash → client confirm page handles hash fragments
  if (!code && !token_hash) {
    const confirmUrl = new URL('/auth/confirm', origin);
    confirmUrl.searchParams.set('next', safeNext);
    return NextResponse.redirect(confirmUrl);
  }

  let response = NextResponse.redirect(new URL(safeNext, origin));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.redirect(new URL(safeNext, origin));
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }
    console.error('exchangeCodeForSession failed:', error.message);
  }

  const otpType = normalizeEmailOtpType(type);
  if (token_hash && otpType) {
    const { error } = await supabase.auth.verifyOtp({
      type: otpType,
      token_hash,
    });
    if (!error) {
      return response;
    }
    console.error('verifyOtp failed:', error.message);
  }

  return NextResponse.redirect(new URL('/kurs/giris?error=auth', origin));
}
