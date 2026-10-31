// Supabase 는 관리자 로그인에만 쓴다. 키가 없으면 조용히 넘어가지 말고 바로 알린다.
export function getSupabaseEnv() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 가 설정되지 않았습니다. .env.local(또는 .env) 을 확인하세요.');
  }

  // 대시보드의 REST 주소(https://<ref>.supabase.co/rest/v1/)를 그대로 붙여 넣어도 동작하게 도메인만 쓴다.
  return { url: new URL(rawUrl).origin, key };
}
