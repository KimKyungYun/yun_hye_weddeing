import { existsSync } from 'node:fs';
import path from 'node:path';
import { BGM_SRC } from '@/constants/wedding';
import BgmToggle from './components/BgmToggle';
import Curtain from './components/Curtain';
import InvitationProvider from './components/InvitationProvider';
import LeafCanvas from './components/LeafCanvas';
import ScrollReset from './components/ScrollReset';
import ScrollReveal from './components/ScrollReveal';
import ToastProvider from './components/ToastProvider';
import styles from './Invitation.module.scss';
import type { ReactNode } from 'react';

// 청첩장은 빌드 때 한 번 만들어지는 정적 페이지라, 음원 파일이 있는지도 그때 한 번 본다.
// public/audio/bgm.mp3 를 넣고 다시 빌드하면 BGM 버튼이 생긴다.
const hasBgm = existsSync(path.join(process.cwd(), 'public', BGM_SRC));

export default function InvitationLayout({ children }: { children: ReactNode }) {
  return (
    <InvitationProvider hasBgm={hasBgm}>
      <ToastProvider>
        <Curtain />
        <LeafCanvas />
        <BgmToggle />
        <main className={styles.invitation}>{children}</main>
        <ScrollReset />
        <ScrollReveal />
      </ToastProvider>
    </InvitationProvider>
  );
}
