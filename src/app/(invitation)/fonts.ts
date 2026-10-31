import { Nanum_Pen_Script } from 'next/font/google';
import localFont from 'next/font/local';

// 인트로 "We're getting married" — 붓으로 쓴 서명체 Breathing (Din Studio, 개인용 무료 라이선스).
// 원본 TTF(650KB)에서 라틴 기본 글자·따옴표만 남기고 woff2 로 줄였다(133KB). 상업적으로 쓰려면 라이선스를 사야 한다.
export const scriptFont = localFont({
  src: '../../assets/fonts/breathing-personal-use.woff2',
  weight: '400',
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
