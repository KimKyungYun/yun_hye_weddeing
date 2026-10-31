import { COUPLE_TITLE, WEDDING, WEDDING_DATE } from '@/constants/wedding';
import { formatWeddingDate } from '@/utils/weddingDate';

// OG 이미지·카카오톡 공유의 절대 주소 기준. 배포 도메인을 NEXT_PUBLIC_SITE_URL 에 넣는다.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// 링크 미리보기(메타 태그)와 카카오톡 공유 카드에 같은 문구를 쓴다
export const SITE_TITLE = `${COUPLE_TITLE} 결혼합니다`;
export const SITE_DESCRIPTION = `${formatWeddingDate(WEDDING_DATE)}, ${WEDDING.venue}에서 소중한 분들을 초대합니다.`;

// 카카오 디벨로퍼스 JavaScript 키 — 오시는 길 지도와 카카오톡 공유가 함께 쓴다.
// 없으면 지도는 그리지 않고(약도만 보인다), 공유 버튼은 기기 공유창·링크 복사로 대신한다.
export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ?? '';
