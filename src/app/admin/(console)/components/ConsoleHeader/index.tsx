'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '../../actions';
import styles from './ConsoleHeader.module.scss';

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/rsvp', label: '참석 의사' },
  { href: '/admin/guestbook', label: '방명록' },
];

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

// 휴대폰으로 확인하는 일이 많아 옆 메뉴 대신 위쪽 탭으로 둔다
export default function ConsoleHeader({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <Link href="/admin" className={styles.header__title}>
          청첩장 관리
        </Link>
        <div className={styles.header__account}>
          <span className={styles.header__email}>{email}</span>
          <form action={signOut}>
            <button type="submit" className={styles.header__logout}>
              로그아웃
            </button>
          </form>
        </div>
      </div>
      <nav className={styles.header__nav} aria-label="관리 메뉴">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
        ))}
        <a className={styles.header__link} href="/" target="_blank" rel="noopener noreferrer">
          청첩장 보기 ↗
        </a>
      </nav>
    </header>
  );
}
