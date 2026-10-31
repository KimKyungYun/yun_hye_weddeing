import 'server-only';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { createServerSupabase } from '@/lib/supabase/server';

export const ADMIN_LOGIN_PATH = '/admin/login';

// 관리자 계정의 Supabase 이메일 목록(신랑·신부). 비밀번호는 코드·환경변수 어디에도 두지 않는다(Supabase 가 보관).
export function getAdminEmails(): string[] {
  const emails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (emails.length === 0) throw new Error('ADMIN_EMAILS 가 설정되지 않았습니다.');

  return emails;
}

export function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.trim().toLowerCase());
}

// 세션이 있고 그 이메일이 ADMIN_EMAILS 에 있을 때만 통과한다. 아니면 null.
// 레이아웃·페이지가 각각 불러도 한 요청 안에서는 한 번만 확인한다(cache).
export const getAdminSession = cache(async () => {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === 'string' ? data.claims.email.toLowerCase() : null;

  if (!email || !isAdminEmail(email)) return null;

  return { supabase, email };
});

// 관리자 화면 레이아웃과 **모든 관리자 서버 액션**의 첫 줄. 서버 액션은 화면을 거치지 않고도 호출될 수 있다.
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect(ADMIN_LOGIN_PATH);

  return session;
}
