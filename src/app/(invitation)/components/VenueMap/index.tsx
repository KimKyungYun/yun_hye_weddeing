import styles from './VenueMap.module.scss';

interface VenueMapProps {
  // parking: 주차장 세 곳을 강조한다 (안내사항 › 주차안내)
  highlight?: 'parking';
}

const cx = (...names: string[]) => names.map((name) => styles[name]).join(' ');

function ParkingBadge({ x, y }: { x: number; y: number }) {
  return (
    <g className={styles['venue-map__parking']} transform={`translate(${x} ${y})`}>
      <rect width="50" height="50" rx="10" />
      <text x="25" y="38" textAnchor="middle">P</text>
    </g>
  );
}

function BusIcon({ x, y }: { x: number; y: number }) {
  return (
    <g className={styles['venue-map__icon']} transform={`translate(${x} ${y})`}>
      <rect x="2" y="2" width="52" height="56" rx="11" />
      <path d="M2 32 H54 M15 58 V66 M41 58 V66 M13 17 H43" />
      <circle cx="16" cy="45" r="3.5" />
      <circle cx="40" cy="45" r="3.5" />
    </g>
  );
}

// 웨딩홀 주변 약도. 신랑·신부가 그린 도면(1218×1660)을 같은 좌표로 옮겨 템플릿 색으로 다듬었다.
// 색은 모두 VenueMap.module.scss 가 CSS 변수로 칠한다.
export default function VenueMap({ highlight }: VenueMapProps) {
  return (
    <svg
      className={`${styles['venue-map']} ${highlight === 'parking' ? styles['venue-map--parking'] : ''}`}
      viewBox="0 0 1218 1660"
      role="img"
      aria-label="약도: 큰길 북쪽에 대전복합터미널 동관(이마트)과 서관(하차지)이 있고, 큰길 남쪽에 씨엘드포레 웨딩홀이 있습니다. 본관 주차장, 건물 뒤편 주차 타워, 남쪽 가양5구역 유료주차장을 이용할 수 있습니다."
    >
      <rect className={styles['venue-map__land']} width="1218" height="1660" />

      {/* 블록 */}
      <rect className={styles['venue-map__block']} x="96" y="120" width="497" height="669" rx="16" />
      <rect className={styles['venue-map__block']} x="668" y="24" width="235" height="580" rx="16" />
      <polygon className={styles['venue-map__lot']} points="845,1246 1032,1246 878,1638 690,1638" />
      <path className={styles['venue-map__venue']} d="M558 863 H827 V1035 H1028 V1189 H694 V1025 H558 Z" />

      {/* 도로 */}
      <rect className={styles['venue-map__road']} x="612" y="0" width="40" height="826" />
      <rect className={styles['venue-map__road']} x="0" y="805" width="1218" height="42" />
      <polygon className={styles['venue-map__road']} points="518,847 532,847 502,1222 488,1222" />
      <rect className={styles['venue-map__road']} x="0" y="1219" width="1218" height="12" />
      <polygon className={styles['venue-map__road']} points="818,1231 832,1231 652,1660 638,1660" />
      <text className={styles['venue-map__road-label']} x="16" y="838">용전네거리 방면</text>
      <text className={styles['venue-map__road-label']} x="1202" y="838" textAnchor="end">동부네거리 방면</text>

      {/* 대전복합터미널 동관 (이마트) */}
      <BusIcon x={316} y={286} />
      <text className={styles['venue-map__label']} x="343" y="420" textAnchor="middle">대전복합터미널</text>
      <text className={styles['venue-map__label']} x="343" y="478" textAnchor="middle">동관</text>
      <g className={styles['venue-map__icon']} transform="translate(166 662) scale(1.2)">
        <path d="M0 4 H8 L16 34 H40 L46 14 H11" />
        <circle cx="19" cy="42" r="3" />
        <circle cx="37" cy="42" r="3" />
      </g>
      <text className={styles['venue-map__label']} x="192" y="770" textAnchor="middle">이마트</text>

      {/* 대전복합터미널 서관 (하차지) — 이름이 블록보다 길어 도면처럼 오른쪽으로 넘친다 */}
      <BusIcon x={758} y={234} />
      <text className={styles['venue-map__label']} x="860" y="370" textAnchor="middle">대전복합터미널</text>
      <text className={styles['venue-map__label']} x="860" y="428" textAnchor="middle">서관 (하차지)</text>

      {/* 씨엘드포레 웨딩홀 */}
      <g className={styles['venue-map__rings']} transform="translate(708 970) scale(1.3)">
        <circle cx="26" cy="34" r="22" />
        <circle cx="50" cy="34" r="22" />
        <path d="M18 8 L26 0 L34 8 L26 14 Z" />
      </g>
      <text className={cx('venue-map__label', 'venue-map__label--venue')} x="822" y="1036">씨엘드포레</text>

      {/* 주차장 */}
      <ParkingBadge x={763} y={880} />
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="822" y="920">본관 주차장</text>
      <ParkingBadge x={790} y={1132} />
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="850" y="1172">뒤편 주차타워</text>
      <ParkingBadge x={838} y={1410} />
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="862" y="1508" textAnchor="middle">가양5구역</text>
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="862" y="1562" textAnchor="middle">유료주차장</text>
    </svg>
  );
}
