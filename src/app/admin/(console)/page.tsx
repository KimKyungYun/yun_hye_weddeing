import Link from 'next/link';
import GuestbookList from './components/GuestbookList';
import PageHeading from './components/PageHeading';
import RsvpSummary from './components/RsvpSummary';
import styles from './Dashboard.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '대시보드' };

const RECENT_GUESTBOOK_COUNT = 5;

export default function DashboardPage() {
  return (
    <>
      <PageHeading title="대시보드" description="참석 의사와 방명록을 한눈에 확인합니다." />
      <section className={styles.dashboard__section}>
        <div className={styles.dashboard__head}>
          <PageHeading as="h2" title="참석 의사" />
          <Link href="/admin/rsvp" className={styles.dashboard__more}>
            전체 보기
          </Link>
        </div>
        <RsvpSummary />
      </section>
      <section className={styles.dashboard__section}>
        <div className={styles.dashboard__head}>
          <PageHeading as="h2" title="최근 방명록" />
          <Link href="/admin/guestbook" className={styles.dashboard__more}>
            전체 보기
          </Link>
        </div>
        <GuestbookList limit={RECENT_GUESTBOOK_COUNT} />
      </section>
    </>
  );
}
