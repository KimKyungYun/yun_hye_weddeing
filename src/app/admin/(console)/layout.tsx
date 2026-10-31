import { requireAdmin } from '@/lib/auth/requireAdmin';
import ConsoleHeader from './components/ConsoleHeader';
import styles from './Console.module.scss';
import type { ReactNode } from 'react';

// 관리자 콘솔 전체의 문. proxy 는 로그인 여부만 보고, 관리자인지는 여기서 확인한다.
export default async function ConsoleLayout({ children }: { children: ReactNode }) {
  const { email } = await requireAdmin();

  return (
    <div className={styles.console}>
      <ConsoleHeader email={email} />
      <main className={styles.console__main}>{children}</main>
    </div>
  );
}
