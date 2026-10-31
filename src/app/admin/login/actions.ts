'use server';

import { redirect } from 'next/navigation';
import { isAdminEmail } from '@/lib/auth/requireAdmin';
import { createServerSupabase } from '@/lib/supabase/server';
import { loginSchema } from '@/lib/validation/login';
import type { FormState } from '@/types/formState';

// 이메일이 틀렸는지 비밀번호가 틀렸는지 구분하지 않고 같은 문구를 쓴다.
const LOGIN_FAILED = '이메일 또는 비밀번호가 올바르지 않습니다.';

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({ email: formData.get('email'), password: formData.get('password') });
  if (!parsed.success) return { status: 'error', message: '이메일과 비밀번호를 입력해 주세요.' };

  // 관리자 목록에 있든 없든 항상 Supabase 에 물어 같은 경로·비슷한 시간을 거친다.
  // (목록에 없을 때만 일찍 돌려보내면 응답 시간 차이로 관리자 이메일을 추측할 수 있다)
  // 비밀번호 대입 시도는 Supabase Auth 의 로그인 횟수 제한이 막는다.
  const supabase = await createServerSupabase();
  const { email, password } = parsed.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { status: 'error', message: LOGIN_FAILED };
  if (!isAdminEmail(email)) {
    await supabase.auth.signOut();
    return { status: 'error', message: LOGIN_FAILED };
  }

  redirect('/admin');
}
