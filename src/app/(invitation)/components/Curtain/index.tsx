'use client';

import { useState } from 'react';
import { BRIDE, GROOM, USE_CURTAIN } from '@/constants/wedding';
import { OpenLetterIcon } from '../Icons';
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
        {/* 표지 문양: 하트로 봉한 초대장 봉투 */}
        <svg
          className={styles.curtain__emblem}
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2.5" y="5.5" width="19" height="13" rx="1.5" />
          <path d="M2.8 6.2 12 13l9.2-6.8M2.8 17.8l6.6-5.4M21.2 17.8l-6.6-5.4" />
          <path fill="currentColor" stroke="none" d="M12 15.6c-1.9-1.1-2.7-2.1-2.7-3 0-.8.6-1.4 1.3-1.4.6 0 1.1.3 1.4.8.3-.5.8-.8 1.4-.8.7 0 1.3.6 1.3 1.4 0 .9-.8 1.9-2.7 3z" />
        </svg>
        <p className={styles.curtain__subtitle}>Wedding Invitation</p>
        <p className={styles.curtain__names}>
          {GROOM.name} &amp; {BRIDE.name}
        </p>
        <button type="button" className={styles.curtain__button} onClick={open} disabled={phase !== 'closed'}>
          <OpenLetterIcon />
          초대장 열기
        </button>
      </div>
    </div>
  );
}
