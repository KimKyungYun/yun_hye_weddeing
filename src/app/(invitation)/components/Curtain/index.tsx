'use client';

import { useState } from 'react';
import { BRIDE, GROOM, USE_CURTAIN } from '@/constants/wedding';
import { LeafHeartIcon } from '../Icons';
import { useInvitation } from '../InvitationProvider';
import styles from './Curtain.module.scss';

// 커튼이 양옆으로 걷히는 시간(Curtain.module.scss 의 transition 과 맞춘다)
const OPEN_DURATION_MS = 1400;

type Phase = 'closed' | 'opening' | 'hidden';

// "초대장 열기" 첫 화면. 열기 전에는 뒤쪽 본문이 스크롤되지 않는다.
// 여는 클릭이 곧 사용자 동작이라, 이때 BGM 과 인트로 애니메이션을 함께 시작한다.
export default function Curtain() {
  const [phase, setPhase] = useState<Phase>('closed');
  const { open: openInvitation } = useInvitation();

  if (!USE_CURTAIN || phase === 'hidden') return null;

  const open = () => {
    setPhase('opening');
    openInvitation();
    window.setTimeout(() => setPhase('hidden'), OPEN_DURATION_MS);
  };

  return (
    <div
      className={`${styles.curtain} ${phase === 'opening' ? styles['curtain--open'] : ''}`}
      data-scroll-lock={phase === 'closed' ? '' : undefined}
    >
      <div className={styles.curtain__left} />
      <div className={styles.curtain__right} />
      <div className={styles.curtain__content}>
        <svg className={styles.curtain__leaf} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3 2-6.5 2-10S13.5 5 12 2z" />
          <path d="M12 2c3 1.5 5 5 5 10s-2 8.5-5 10" />
          <path d="M2 12h20" />
        </svg>
        <p className={styles.curtain__subtitle}>Wedding Invitation</p>
        <p className={styles.curtain__names}>
          {GROOM.name} &amp; {BRIDE.name}
        </p>
        <button type="button" className={styles.curtain__button} onClick={open} disabled={phase !== 'closed'}>
          <LeafHeartIcon />
          초대장 열기
        </button>
      </div>
    </div>
  );
}
