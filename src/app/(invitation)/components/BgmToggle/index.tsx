'use client';

import { useInvitation } from '../InvitationProvider';
import styles from './BgmToggle.module.scss';

// 오른쪽 위에 떠 있는 배경음악 켜기/끄기. 음원 파일이 없으면 그리지 않는다.
export default function BgmToggle() {
  const { hasBgm, isBgmPlaying, toggleBgm } = useInvitation();
  if (!hasBgm) return null;

  return (
    <button
      type="button"
      className={`${styles['bgm-toggle']} ${isBgmPlaying ? styles['bgm-toggle--playing'] : ''}`}
      onClick={toggleBgm}
      aria-pressed={isBgmPlaying}
      aria-label={isBgmPlaying ? '배경음악 끄기' : '배경음악 켜기'}
    >
      {/* 음표 — 꺼져 있으면 사선을 긋는다 */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 17.5V6.2l10-2.2v11.5M9 9.2l10-2.2" />
        <circle cx="6.6" cy="17.5" r="2.4" />
        <circle cx="16.6" cy="15.5" r="2.4" />
        {!isBgmPlaying && <path d="M3.5 3.5l17 17" />}
      </svg>
    </button>
  );
}
