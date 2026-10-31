import Link from 'next/link';
import type { Side } from '@/constants/rsvp';
import styles from './RsvpFilter.module.scss';

const FILTERS: { value: Side | null; label: string; href: string }[] = [
  { value: null, label: '전체', href: '/admin/rsvp' },
  { value: 'GROOM', label: '신랑측', href: '/admin/rsvp?side=groom' },
  { value: 'BRIDE', label: '신부측', href: '/admin/rsvp?side=bride' },
];

function FilterLink({ label, href, isActive }: { label: string; href: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`${styles.filter__link} ${isActive ? styles['filter__link--active'] : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

export default function RsvpFilter({ side }: { side: Side | null }) {
  return (
    <nav className={styles.filter} aria-label="측 선택">
      {FILTERS.map((filter) => (
        <FilterLink key={filter.label} label={filter.label} href={filter.href} isActive={filter.value === side} />
      ))}
    </nav>
  );
}
