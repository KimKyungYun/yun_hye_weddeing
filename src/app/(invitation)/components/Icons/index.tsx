// 청첩장 버튼에 붙는 선 아이콘. 색은 글자색(currentColor)을 따른다.
// 그림처럼 한 곳에만 쓰는 장식(화환 꽃·교통 아이콘·약도)은 그 컴포넌트 안에 둔다.

interface IconProps {
  size?: number;
}

const strokeProps = { fill: 'none', stroke: 'currentColor', 'aria-hidden': true } as const;

// 잎사귀 모양 하트 — 커튼의 "초대장 열기"
export function LeafHeartIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" {...strokeProps}>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3 2.5 6.5 10 10 7.5-3.5 10-7 10-10 0-5.5-4.5-10-10-10z" />
      <path d="M12 2v20" />
    </svg>
  );
}

export function CopyIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" {...strokeProps}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export function CheckIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...strokeProps}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CloseIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" {...strokeProps}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PenIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" {...strokeProps}>
      <path d="M4 20h4L19 9l-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

export function LinkIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...strokeProps}>
      <path d="M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1.2 1.2" />
      <path d="M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1.2-1.2" />
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
