import styles from './Admin.module.scss';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// 관리자 화면은 검색엔진에 절대 노출하지 않는다 (next.config 의 X-Robots-Tag 와 이중으로).
export const metadata: Metadata = {
  title: { default: '청첩장 관리', template: '%s | 청첩장 관리' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className={styles.admin}>{children}</div>;
}
