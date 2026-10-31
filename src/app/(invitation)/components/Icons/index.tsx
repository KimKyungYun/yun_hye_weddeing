// 청첩장 버튼에 붙는 선 아이콘. 24칸 격자 · 선 굵기 1.5 · 둥근 끝으로 한 벌을 맞추고, 색은 글자색(currentColor)을 따른다.
// 한 곳에만 쓰는 그림(커튼 문양·음표·약도의 카트·핀)은 그 컴포넌트 안에 둔다.

interface IconProps {
  size?: number;
}

const strokeProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

// 하트 편지가 봉투에서 나오는 모양 — 커튼의 "초대장 열기"
export function OpenLetterIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...strokeProps}>
      <path d="M6.5 11V5.2c0-.4.3-.7.7-.7h9.6c.4 0 .7.3.7.7V11" />
      <path d="M3.5 9.8V19c0 .6.4 1 1 1h15c.6 0 1-.4 1-1V9.8" />
      <path d="M3.5 9.8 12 15.5l8.5-5.7M3.5 9.8l3-2.2M20.5 9.8l-3-2.2" />
      <path fill="currentColor" stroke="none" d="M12 10.4c-1.7-1-2.4-1.8-2.4-2.6 0-.7.5-1.2 1.1-1.2.5 0 1 .3 1.3.8.3-.5.8-.8 1.3-.8.6 0 1.1.5 1.1 1.2 0 .8-.7 1.6-2.4 2.6z" />
    </svg>
  );
}

export function CopyIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...strokeProps}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5" />
    </svg>
  );
}

// 일정에 체크하는 달력 — "참석 의사 전달하기"
export function CalendarCheckIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...strokeProps}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M9 14.8l2 2 4-4" />
    </svg>
  );
}

export function CloseIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} {...strokeProps}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

// 연필 끝과 쓰는 줄 — 방명록
export function PencilIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...strokeProps}>
      <path d="M15.2 4.8a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8L9 19l-4.5 1 1-4.5z" />
      <path d="M13.5 6.5l4 4M13 20h6.5" />
    </svg>
  );
}

export function LinkIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} {...strokeProps}>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
    </svg>
  );
}

// 카카오톡 말풍선 (채움)
export function KakaoTalkIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6l-.9 3.4c-.1.3.3.6.6.4l4-2.6c.5.1 1 .1 1.6.1 5.5 0 10-3.5 10-7.9S17.5 3 12 3z" />
    </svg>
  );
}

// ── 교통수단 (오시는 길 · 약도가 같은 그림을 쓴다) ────────────────
// 24칸 격자 안의 선만 담는다. 선 색·굵기는 감싸는 <svg>/<g> 가 정한다.

// 앞모습 버스 — 사이드미러로 기차와 갈린다
export function BusGlyph() {
  return (
    <>
      <rect x="5" y="3" width="14" height="15" rx="2.5" />
      <rect x="7" y="6" width="10" height="5.5" rx="1" />
      <path d="M5 8.5H3.8V11M19 8.5h1.2V11M7.5 18v2.2M16.5 18v2.2" />
      <circle cx="8.5" cy="14.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  );
}

// 앞모습 기차 — 둥근 앞코와 선로
export function TrainGlyph() {
  return (
    <>
      <path d="M6 15.5V9a6 6 0 0 1 12 0v6.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 15.5z" />
      <path d="M8.3 10.5a3.7 3.7 0 0 1 7.4 0z" />
      <path d="M8.5 18 6.8 21M15.5 18l1.7 3M7.6 19.6h8.8" />
      <circle cx="9" cy="14.3" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14.3" r="0.9" fill="currentColor" stroke="none" />
    </>
  );
}

// 앞모습 자가용 — 낮고 넓게
export function CarGlyph() {
  return (
    <>
      <path d="M5.2 11 6.8 6.8A2 2 0 0 1 8.7 5.5h6.6a2 2 0 0 1 1.9 1.3l1.6 4.2" />
      <rect x="3.5" y="11" width="17" height="6.5" rx="2" />
      <path d="M6 17.5v2M18 17.5v2M10.5 14.5h3" />
      <circle cx="7" cy="14.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17" cy="14.2" r="0.9" fill="currentColor" stroke="none" />
    </>
  );
}
