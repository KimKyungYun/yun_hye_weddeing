import { Courgette, Nanum_Pen_Script } from 'next/font/google';

// 인트로 "We're getting married" — 굵고 기울어진, 글자가 하나하나 또렷한 영문 필기체
export const scriptFont = Courgette({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

// 인트로의 "경윤 · 혜아" 이름표 (한글 손글씨)
export const penFont = Nanum_Pen_Script({
  weight: '400',
  variable: '--font-pen',
  display: 'swap',
  preload: false,
});
