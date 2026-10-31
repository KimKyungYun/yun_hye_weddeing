// 오시는 길 · 안내사항 문구

// 웨딩홀 장소 페이지로 바로 열린다 (아이콘은 MapLinks 가 key 로 고른다)
export const MAP_LINKS = [
  { key: 'naver', label: '네이버 지도', href: 'https://naver.me/x67ywAmF' },
  { key: 'kakao', label: '카카오맵', href: 'https://place.map.kakao.com/387191162' },
] as const;

export type MapLinkKey = (typeof MAP_LINKS)[number]['key'];

export type TransportKind = 'bus' | 'train' | 'car';

export interface TransportGuide {
  kind: TransportKind;
  title: string;
  // [굵은 이름] 설명
  items: { label: string; text: string }[];
}

export const TRANSPORT: TransportGuide[] = [
  {
    kind: 'bus',
    title: '버스 이용 시',
    items: [{ label: '대전복합터미널', text: '서(西)관에서 동(東)관으로 이동 후 앞쪽 횡단보도 횡단 (도보 5분)' }],
  },
  {
    kind: 'train',
    title: '기차 이용 시',
    items: [
      { label: '대전역', text: '급행4, 201, 501, 611, 622, 802 (약 15분)' },
      { label: '서대전역', text: '201, 601 (약 30분)' },
    ],
  },
  {
    kind: 'car',
    title: '자차 이용 시',
    items: [
      { label: '무료주차', text: '씨엘드포레 본관 주차장 (대전 동구 동서대로 1700) 또는 건물 뒤편 주차 타워 (주차타워 5층과 웨딩홀 3층 연결)' },
      { label: '유료주차', text: '가양5구역 유료주차장 (대전 동구 가양동 449-27)' },
    ],
  },
];

export type InformationKey = 'meal' | 'parking' | 'venue';

export interface InformationTab {
  key: InformationKey;
  label: string;
  // 문단마다 한 덩이. 줄바꿈은 그대로 보인다.
  paragraphs: string[];
}

export const INFORMATION: InformationTab[] = [
  {
    key: 'meal',
    label: '식사안내',
    paragraphs: [
      '식사는 결혼식 및 사진 촬영이 끝난 후\n웨딩홀 2·3·5층에서 뷔페식으로 진행됩니다.\n(식권에 기재된 층수를 확인해주세요.)',
      '한식을 비롯해 중식, 양식, 일식까지\n다양하게 준비되어 있으니\n맛있게 드시길 바랍니다.',
    ],
  },
  {
    key: 'parking',
    label: '주차안내',
    paragraphs: [
      '웨딩홀 주차장 또는 건물 뒤편 주차타워 이용 시,\n2시간 무료 주차가 가능합니다.',
      '만차 시, 안내에 따라 이마트 주차장(무료) 또는\n웨딩홀 뒤편의 가양5구역 유료주차장(유료)을\n이용해 주시면 감사하겠습니다.',
      // 내비게이션에 바로 넣을 수 있게 주소를 함께 적는다
      '본관 주차장: 대전 동구 동서대로 1700\n가양5구역 주차장: 대전 동구 가양동 449-27',
    ],
  },
  {
    key: 'venue',
    label: '예식장안내',
    paragraphs: [
      '예식장 특성상 하객석은 양가 구분 없이\n함께 앉으실 수 있습니다.',
      '편하신 자리에 착석해 주시어\n따뜻한 격려를 보내주세요.',
    ],
  },
];
