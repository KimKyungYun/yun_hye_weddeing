'use client';

import { USE_CURTAIN } from '@/constants/wedding';
import { useInvitation } from '../InvitationProvider';
import type { ReactNode } from 'react';

// 인트로 손글씨가 언제 써지기 시작할지만 정한다. 그리는 것은 Intro 가 서버에서 다 한다.
// 청첩장을 열면 data-playing 이 붙고, 커튼을 쓰면 커튼이 걷히는 동안 조금 늦게 시작한다(data-after-curtain).
export default function IntroStage({ className, children }: { className: string; children: ReactNode }) {
  const { isOpened } = useInvitation();

  return (
    <div className={className} data-playing={isOpened ? '' : undefined} data-after-curtain={USE_CURTAIN ? '' : undefined}>
      {children}
    </div>
  );
}
