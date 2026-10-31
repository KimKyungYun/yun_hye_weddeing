import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { getSupabaseEnv } from './env';
import type { NextRequest } from 'next/server';

// proxy 에서 세션 쿠키를 갱신하고 로그인 여부를 돌려준다.
// (proxy 는 react-server 그래프 밖이라 'server-only' 를 import 하지 않는다)
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, key } = getSupabaseEnv();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([header, value]) => response.headers.set(header, value));
      },
    },
  });

  // getClaims 는 JWT 서명을 검증한다. 이 호출과 응답 사이에 다른 로직을 넣지 않는다.
  const { data } = await supabase.auth.getClaims();

  return { response, isAuthenticated: Boolean(data?.claims) };
}
