'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { BGM_SRC, USE_CURTAIN } from '@/constants/wedding';
import type { ReactNode } from 'react';

interface InvitationState {
  // 커튼을 열었는지 (커튼을 안 쓰면 처음부터 true). 인트로 애니메이션이 이걸 보고 시작한다.
  isOpened: boolean;
  open: () => void;
  hasBgm: boolean;
  isBgmPlaying: boolean;
  toggleBgm: () => void;
}

const InvitationContext = createContext<InvitationState>({
  isOpened: true,
  open: () => {},
  hasBgm: false,
  isBgmPlaying: false,
  toggleBgm: () => {},
});

export function useInvitation() {
  return useContext(InvitationContext);
}

// 청첩장을 여는 순간과 BGM 을 함께 다룬다.
// 브라우저는 사용자가 누르기 전에는 소리를 틀지 못하게 막으므로, 커튼의 "초대장 열기" 클릭에서 재생을 시작한다.
export default function InvitationProvider({ hasBgm, children }: { hasBgm: boolean; children: ReactNode }) {
  const [isOpened, setIsOpened] = useState(!USE_CURTAIN);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playBgm = useCallback(() => {
    // 재생이 막히면(저전력 모드 등) 버튼으로 다시 켤 수 있게 조용히 넘어간다
    audioRef.current?.play().catch(() => setIsBgmPlaying(false));
  }, []);

  const open = useCallback(() => {
    setIsOpened(true);
    if (hasBgm) playBgm();
  }, [hasBgm, playBgm]);

  const toggleBgm = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) playBgm();
    else audio.pause();
  }, [playBgm]);

  const value = useMemo(
    () => ({ isOpened, open, hasBgm, isBgmPlaying, toggleBgm }),
    [isOpened, open, hasBgm, isBgmPlaying, toggleBgm],
  );

  return (
    <InvitationContext value={value}>
      {children}
      {hasBgm && (
        <audio
          ref={audioRef}
          src={BGM_SRC}
          loop
          preload="none"
          onPlay={() => setIsBgmPlaying(true)}
          onPause={() => setIsBgmPlaying(false)}
        />
      )}
    </InvitationContext>
  );
}
