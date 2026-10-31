import { NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import type { NextRequest } from 'next/server';

const LOGIN_PATH = '/admin/login';

export async function proxy(request: NextRequest) {
  const { response, isAuthenticated } = await updateSession(request);

  if (!isAuthenticated && request.nextUrl.pathname !== LOGIN_PATH) {
    const redirect = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    // 갱신 중 지워진 쿠키가 있으면 리다이렉트 응답에도 실어 보낸다.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

// 청첩장은 건드리지 않는다 — 정적으로 남아야 한다.
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
