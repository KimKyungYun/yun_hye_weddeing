'use client';

import { useLayoutEffect } from 'react';

// 새로고침·재접속 때 브라우저가 지난 스크롤 위치를 되살리지 않고 언제나 첫 화면(커튼·인트로)부터 보이게 한다.
// ScrollReveal 보다 먼저 두어야, 맨 위로 올린 뒤에 화면 안의 요소를 골라 드러낸다.
export default function ScrollReset() {
  useLayoutEffect(() => {
    // html 에 scroll-behavior: smooth 가 걸려 있어, 미끄러지듯 올라가는 모습이 보이지 않게 즉시 옮긴다
    const toTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

    window.history.scrollRestoration = 'manual';
    toTop();

    // 뒤로 가기로 되돌아와 캐시된 페이지가 그대로 살아날 때(bfcache)도 맨 위로
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) toTop();
    };
    window.addEventListener('pageshow', handlePageShow);

    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return null;
}
