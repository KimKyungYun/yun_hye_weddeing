import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/constants/site';
import '@/styles/index.scss';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

// 한글 글리프는 유니코드 범위별로 쪼개 받는다. 미리 받기(preload)는 끄고 쓰는 글자만 내려받게 둔다.
const serif = Noto_Serif_KR({
  weight: ['200', '300', '400', '500', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
  preload: false,
});

const sans = Noto_Sans_KR({
  weight: ['300', '400', '500'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: false,
});

// OG 이미지는 app/opengraph-image.jpg 파일 규칙으로 붙는다.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: { type: 'website', locale: 'ko_KR', url: '/', title: SITE_TITLE, description: SITE_DESCRIPTION },
  // 이름·예식 정보가 실린 개인 초대장이라 검색엔진에는 싣지 않는다. 링크로만 나눈다.
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fafaf5',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
