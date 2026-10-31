'use client';

import { useLayoutEffect } from 'react';

// 화면 아래쪽 6% 를 남기고 들어오면 나타난다
const REVEAL_LINE = 0.94;
const READY_CLASS = 'reveal-ready';

// data-reveal 요소 가운데 화면에 들어왔거나 이미 지나친 것에 data-revealed 를 단다.
//
// 숨김 준비(html.reveal-ready)는 head 의 인라인 스크립트가 아니라 여기서 붙인다.
// (React 는 클라이언트에서 다시 그릴 때 <script> 를 실행하지 않고 경고한다)
// useLayoutEffect 라 화면을 그리기 전에 붙이고, 그 자리에서 이미 보이는 요소는 바로 드러내므로
// 첫 화면이 깜빡이지 않는다. JS 가 없으면 아무것도 숨기지 않는다.
//
// "화면에 들어올 때"만 알려 주는 IntersectionObserver 는 휠을 크게 굴려 짧은 요소를 건너뛰면
// 놓치므로, 스크롤마다(프레임당 한 번) 남은 요소의 위치를 직접 확인한다. 모두 나타나면 스크롤 감시를 멈춘다.
// 방명록 "더보기"처럼 나중에 붙는 요소는 DOM 변화를 보고 다시 찾는다. 그리는 것은 없다.
export default function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    let pending: HTMLElement[] = [];
    let needsCollect = true;
    let isListening = false;
    let frame = 0;

    const sweep = () => {
      frame = 0;
      if (needsCollect) {
        needsCollect = false;
        pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
      }
      const line = window.innerHeight * REVEAL_LINE;
      pending = pending.filter((element) => {
        if (element.getBoundingClientRect().top > line) return true;
        element.setAttribute('data-revealed', '');
        return false;
      });
      if (pending.length > 0) listen();
      else unlisten();
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(sweep);
    };
    const listen = () => {
      if (isListening) return;
      isListening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    };
    const unlisten = () => {
      isListening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };

    // 숨김 준비와 첫 확인을 같은 프레임에서 한다 — 이미 보이는 요소는 숨겨진 적 없이 그대로 남는다
    root.classList.add(READY_CLASS);
    sweep();

    const observer = new MutationObserver(() => {
      needsCollect = true;
      schedule();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      unlisten();
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove(READY_CLASS);
    };
  }, []);

  return null;
}
