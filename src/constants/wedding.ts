// 청첩장 본문. 내용을 바꿀 때는 이 파일(과 오시는 길·안내사항은 constants/guide.ts)만 고친다.
// 사진은 constants/photos.ts, 갤러리는 src/assets/gallery 폴더에서 고른다.

import type { Person } from '@/types/domain';

// 첫 화면의 "초대장 열기" 커튼 사용 여부. 커튼을 누를 때 BGM 과 인트로 애니메이션이 시작된다.
// false 면 바로 본문이 보이고, BGM 은 오른쪽 위 버튼으로만 켤 수 있다(브라우저가 자동 재생을 막는다).
export const USE_CURTAIN = true;

// 배경음악 파일 (public 기준 경로). 파일이 없으면 BGM 버튼을 그리지 않는다.
export const BGM_SRC = '/audio/bgm.mp3';

export const GROOM: Person = {
  name: '김경윤',
  firstName: '경윤',
  nameEn: 'Kyung Yun',
  father: '',
  mother: '임미옥',
  fatherDeceased: true,
  motherDeceased: false,
};

export const BRIDE: Person = {
  name: '박혜아',
  firstName: '혜아',
  nameEn: 'Hye Ah',
  father: '박주현',
  mother: '신수진',
  fatherDeceased: false,
  motherDeceased: false,
};

export const WEDDING = {
  // 시간대(+09:00)를 박아 둔다. 서버(UTC)에서 계산해도, 하객 기기가 어느 시간대여도 같은 순간이다.
  dateTime: '2027-03-20T11:00:00+09:00',
  venue: '대전 씨엘드포레 웨딩홀',
  address: '대전광역시 동구 동서대로 1700 호텔선샤인 7층',
} as const;

export const GREETING = {
  title: '소중한 분들을 초대합니다',
  content: '봄이 시작되는 그 날,\n앞으로의 새로운 시간들을\n서로가 함께하기로 약속하고자 합니다.\n의미 있는 그 날,\n따뜻한 마음으로 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.',
};

// 카카오 지도 중심·핀 위치 (대전 동구 동서대로 1700, 카카오맵 장소 387191162 의 좌표)
export const VENUE_GEO = { lat: 36.349163, lng: 127.438531 };

export const WEDDING_DATE = new Date(WEDDING.dateTime);
export const COUPLE_TITLE = `${GROOM.name} ♥ ${BRIDE.name}`;
