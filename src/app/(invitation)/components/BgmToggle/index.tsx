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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" />
        {isBgmPlaying ? (
          <path d="M16 9.5a3.5 3.5 0 010 5M18.5 7a7 7 0 010 10" />
        ) : (
          <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" />
        )}
      </svg>
    </button>
  );
}
