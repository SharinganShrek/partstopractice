import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { pathname } = request.nextUrl;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.json(
        { error: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local' },
        { status: 503 }
      );
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!user || user.app_metadata?.role !== 'moderator') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/admin/login') && user?.app_metadata?.role === 'moderator') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  const isKursPublic =
    pathname === '/kurs/giris' ||
    pathname.startsWith('/auth/callback') ||
    pathname.startsWith('/auth/confirm') ||
    pathname.startsWith('/kurs/sertifika/dogrula');

  if (pathname.startsWith('/kurs') && !isKursPublic) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/kurs/giris';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    const isModerator = user.app_metadata?.role === 'moderator';
    if (!isModerator) {
      const { data: enrollment } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!enrollment) {
        const url = request.nextUrl.clone();
        url.pathname = '/kurs/giris';
        url.searchParams.set('error', 'not_enrolled');
        return NextResponse.redirect(url);
      }
    }
  }

  if (pathname === '/kurs/giris' && user) {
    const isModerator = user.app_metadata?.role === 'moderator';
    if (isModerator) {
      const url = request.nextUrl.clone();
      url.pathname = '/kurs';
      return NextResponse.redirect(url);
    }

    const { data: enrollment } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (enrollment) {
      const url = request.nextUrl.clone();
      url.pathname = '/kurs';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
