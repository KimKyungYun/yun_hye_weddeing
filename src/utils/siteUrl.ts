const LOCAL_FALLBACK = 'http://localhost:3000';

const isLocalUrl = (url: string) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(url);

// 링크 미리보기·카카오톡 공유에 쓰는 사이트 절대 주소를 고른다.
//  1) 직접 넣은 주소(NEXT_PUBLIC_SITE_URL)가 실제 도메인이면 그대로 쓴다.
//  2) 비었거나 localhost 면, Vercel 배포가 넣어 주는 운영 도메인(호스트만 온다)을 https 로 쓴다.
//     .env 를 그대로 올려 localhost 가 배포에 들어가면 카카오톡이 미리보기 사진을 가져오지 못한다.
//  3) 둘 다 없으면(로컬 개발) localhost.
export function resolveSiteUrl(configuredUrl?: string, vercelProductionHost?: string): string {
  const configured = configuredUrl?.trim().replace(/\/+$/, '');
  if (configured && !isLocalUrl(configured)) return configured;

  const host = vercelProductionHost?.trim();
  if (host) return `https://${host}`;

  return configured || LOCAL_FALLBACK;
}
