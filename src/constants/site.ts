import { COUPLE_TITLE, WEDDING, WEDDING_DATE } from '@/constants/wedding';
import { resolveSiteUrl } from '@/utils/siteUrl';
import { formatWeddingDate } from '@/utils/weddingDate';

// OG 이미지·카카오톡 공유의 절대 주소 기준. 비었거나 localhost 면 Vercel 운영 도메인으로 바꿔 쓴다(utils/siteUrl).
// 두 값 모두 NEXT_PUBLIC_ 이라 빌드 때 박혀 브라우저(카카오톡 공유)에서도 같은 주소를 쓴다.
export const SITE_URL = resolveSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
);

// 링크 미리보기(메타 태그)와 카카오톡 공유 카드에 같은 문구를 쓴다.
// 설명은 "일시," 다음 줄에 "장소" — 줄바꿈을 지원하는 앱(카카오톡 등)에서 두 줄로 보이고, 아니면 한 줄로 이어진다.
export const SITE_TITLE = `${COUPLE_TITLE} 결혼합니다`;
export const SITE_DESCRIPTION = `${formatWeddingDate(WEDDING_DATE)},\n${WEDDING.venue}`;

// 카카오 디벨로퍼스 JavaScript 키 — 오시는 길 지도와 카카오톡 공유가 함께 쓴다.
// 없으면 지도는 그리지 않고(지도 앱 버튼만 남는다), 공유 버튼은 기기 공유창·링크 복사로 대신한다.
export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ?? '';
