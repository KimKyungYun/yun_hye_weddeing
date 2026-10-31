import { BusGlyph } from '../Icons';
import styles from './VenueMap.module.scss';

const cx = (...names: string[]) => names.map((name) => styles[name]).join(' ');

// 좌표계: 카카오맵 실측 좌표(웨딩홀 기준, m)를 동서대로가 가로로 눕도록 26° 돌리고 1m = 3.6칸으로 옮겼다.
// 그래서 북쪽은 위에서 왼쪽으로 26° 기운다(오른쪽 위 나침반). 글자가 길·건물과 겹치지 않게 자리를 잡았으니
// 위치를 바꿀 때는 주변 도로 폭(동서대로 100.8 · 북쪽 길 64.8 · 골목 28.8칸)을 함께 본다.

// 도로 중심선과 폭. 테두리를 먼저 모두 그린 뒤 흰 길을 덮어 교차로가 매끄럽게 이어지게 한다.
// 터미널 사이 길과 동서대로는 삼거리로 만난다 (남쪽으로 이어지는 길이 없다).
const ROADS = [
  { name: '동서대로', d: 'M-20 746.8H1020', width: 100.8 },
  { name: '터미널 사이 길', d: 'M351.9 746.8L485.3 -20', width: 64.8 },
  { name: '계족로392번길', d: 'M-20 1001.2L1020 1110.4', width: 32.4 },
  { name: '웨딩홀 동쪽 길', d: 'M969.3 746.8L622 1460', width: 28.8 },
  { name: '주차장 서쪽 길', d: 'M666.2 1073.2L477.8 1460', width: 28.8 },
];

// 횡단보도 두 곳. 동관 쪽에서 동서대로를 바로 건너는 횡단보도는 없다.
//  - 다이소 ↔ 서관: 터미널 사이 길을 건넌다 (길이 10° 기울어 줄무늬도 같이 기운다)
//  - 서관 ↔ 씨엘드포레: 삼거리 서쪽에서 동서대로를 건넌다
const CROSSWALK_SIDE_X = [338, 350, 362, 374, 386];
const CROSSWALK_MAIN_Y = [702, 717, 732, 747, 762, 777];

// 버스 정류 표시 — 24칸 버스 그림을 원 안에 넣는다
function BusBadge({ x, y, start }: { x: number; y: number; start?: boolean }) {
  return (
    <g className={start ? cx('venue-map__bus', 'venue-map__bus--start') : styles['venue-map__bus']} transform={`translate(${x} ${y})`}>
      <circle r="28" />
      <g transform="translate(-19.2 -19.2) scale(1.6)">
        <BusGlyph />
      </g>
    </g>
  );
}

function ParkingBadge({ x, y }: { x: number; y: number }) {
  return (
    <g className={styles['venue-map__parking']} transform={`translate(${x} ${y})`}>
      <rect width="40" height="40" rx="9" />
      <text x="20" y="30" textAnchor="middle">P</text>
    </g>
  );
}

export default function VenueMap() {
  return (
    <svg
      className={styles['venue-map']}
      viewBox="0 0 1000 1440"
      role="img"
      aria-label="약도: 동서대로 북쪽에 대전복합터미널 서관(이마트)과 동관(하차장)이 있고, 길 건너 남쪽에 씨엘드포레 웨딩홀(호텔선샤인)이 있습니다. 동관 하차장에서 다이소 앞 횡단보도로 서관 쪽으로 건넌 뒤, 서관 앞 횡단보도로 동서대로를 건너면 도보 약 5분입니다. 주차는 웨딩홀 앞 본관 주차장, 건물 뒤편 주차타워, 남쪽 가양5구역 유료주차장을 이용할 수 있습니다."
    >
      <rect className={styles['venue-map__ground']} width="1000" height="1440" />

      {/* 대전복합터미널 — 서관(큰길 쪽, 이마트) · 동관(북동쪽, 하차장 · CGV) */}
      <path className={styles['venue-map__terminal']} d="M24 0H292L426 81L336 600H0V48Z" />
      <path className={styles['venue-map__terminal']} d="M488 200L688 315L841 0H523Z" />

      {/* 가양5구역 유료주차장 · 뒤편 주차타워 */}
      <path className={styles['venue-map__lot']} d="M676.6 1099.5L769.3 1109.3L608.3 1440H511Z" />
      <rect className={styles['venue-map__lot']} x="556" y="990" width="84" height="42" rx="6" />

      {/* 도로 */}
      {ROADS.map((road) => (
        <path key={`${road.name}-line`} className={styles['venue-map__road-line']} d={road.d} strokeWidth={road.width + 5} />
      ))}
      {ROADS.map((road) => (
        <path key={road.name} className={styles['venue-map__road']} d={road.d} strokeWidth={road.width} />
      ))}
      <g transform="rotate(9.9 366 665)">
        {CROSSWALK_SIDE_X.map((x) => (
          <rect key={x} className={styles['venue-map__crosswalk']} x={x} y="652" width="7" height="26" rx="2" />
        ))}
      </g>
      {CROSSWALK_MAIN_Y.map((y) => (
        <rect key={y} className={styles['venue-map__crosswalk']} x="282" y={y} width="36" height="8" rx="2" />
      ))}
      <text className={cx('venue-map__label', 'venue-map__label--road')} x="20" y="757">← 용전네거리</text>
      <text className={cx('venue-map__label', 'venue-map__label--road')} x="690" y="757" textAnchor="middle">동서대로</text>
      <text className={cx('venue-map__label', 'venue-map__label--road')} x="980" y="757" textAnchor="end">동부네거리 →</text>
      <text className={cx('venue-map__label', 'venue-map__label--street')} x="44" y="1028" transform="rotate(6 44 1028)">계족로392번길</text>

      {/* 웨딩홀 */}
      <rect className={styles['venue-map__venue']} x="454" y="858" width="166" height="122" rx="10" />
      <path
        className={styles['venue-map__venue-heart']}
        transform="translate(508.2 889.7) scale(2.4)"
        d="M12 20.3S3 14.9 3 9.1C3 6.3 5.1 4.2 7.7 4.2c1.9 0 3.4 1 4.3 2.6.9-1.6 2.4-2.6 4.3-2.6 2.6 0 4.7 2.1 4.7 4.9 0 5.8-9 11.2-9 11.2z"
      />
      <text className={cx('venue-map__label', 'venue-map__label--venue')} x="638" y="912">씨엘드포레</text>
      <text className={cx('venue-map__label', 'venue-map__label--sub')} x="638" y="952">호텔선샤인 7층</text>

      {/* 동관 하차장 → 다이소 앞에서 서관 쪽으로 → 서관 앞에서 동서대로 건너기 → 웨딩홀 입구 */}
      <path className={styles['venue-map__route']} d="M508 72L403.5 665H300V806H516V842" />
      <path className={styles['venue-map__route-arrow']} d="M502 836H530L516 856Z" />
      <g className={styles['venue-map__walk']} transform="translate(468 378)">
        <rect width="150" height="46" rx="23" />
        <text x="75" y="32" textAnchor="middle">도보 약 5분</text>
      </g>

      {/* 터미널 */}
      <BusBadge x={190} y={244} />
      <text className={styles['venue-map__label']} x="190" y="330" textAnchor="middle">대전복합터미널</text>
      <text className={cx('venue-map__label', 'venue-map__label--sub')} x="190" y="374" textAnchor="middle">서관 · 매표소</text>
      <g className={styles['venue-map__mart']} transform="translate(58 440) scale(2)">
        <path d="M3 4.5h2.2l2.2 10.2c.1.5.5.8 1 .8h8.4c.5 0 .9-.3 1-.8L19.5 8H6" />
        <circle cx="9.5" cy="19" r="1.4" />
        <circle cx="16" cy="19" r="1.4" />
      </g>
      <text className={cx('venue-map__label', 'venue-map__label--sub')} x="82" y="530" textAnchor="middle">이마트</text>

      <BusBadge x={550} y={46} start />
      <text className={styles['venue-map__label']} x="634" y="168" textAnchor="middle">터미널 동관</text>
      <text className={cx('venue-map__label', 'venue-map__label--sub')} x="626" y="208" textAnchor="middle">하차장 · CGV</text>
      <text className={cx('venue-map__label', 'venue-map__label--landmark')} x="448" y="604">다이소</text>

      {/* 주차장 */}
      <ParkingBadge x={590} y={814} />
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="642" y="846">본관 주차장</text>
      <ParkingBadge x={580} y={991} />
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="548" y="1022" textAnchor="end">뒤편 주차타워</text>
      <ParkingBadge x={636} y={1180} />
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="790" y="1198">가양5구역</text>
      <text className={cx('venue-map__label', 'venue-map__label--parking')} x="790" y="1242">유료주차장</text>

      {/* 나침반 — 지도를 돌렸으니 북쪽이 왼쪽으로 기운다. 오른쪽 위는 떠 있는 음악 버튼이 가려 왼쪽 아래에 둔다 */}
      <g className={styles['venue-map__compass']} transform="translate(24 1370)">
        <rect width="84" height="48" rx="24" />
        <path transform="translate(28 24) rotate(-26)" d="M0 -16L7 10L0 5L-7 10Z" />
        <text x="58" y="34" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
