import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseEnv } from './env';

// 로그인 세션을 쓰는 클라이언트. 요청마다 새로 만든다.
// 데이터 조회·저장은 Prisma 가 맡고, 이 클라이언트는 Auth 에만 쓴다.
export async function createServerSupabase() {
  const { url, key } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Component 렌더 중에는 쿠키를 쓸 수 없다. 세션 갱신은 proxy 가 맡는다.
        }
      },
    },
  });
}
