import { SIDE_LABEL } from '@/constants/rsvp';
import { listRsvps } from '@/lib/repository/rsvp';
import { summarizeRsvps } from '@/utils/rsvpSummary';
import type { RsvpTally } from '@/types/domain';
import styles from './RsvpSummary.module.scss';

function SummaryCard({ title, tally, isTotal }: { title: string; tally: RsvpTally; isTotal?: boolean }) {
  return (
    <li className={`${styles.summary__card} ${isTotal ? styles['summary__card--total'] : ''}`}>
      <p className={styles.summary__label}>{title}</p>
      <p className={styles.summary__guests}>
        <strong className={styles.summary__number}>{tally.guests}</strong>명 참석 예정
      </p>
      <dl className={styles.summary__facts}>
        <div className={styles.summary__fact}>
          <dt>응답</dt>
          <dd>
            {tally.responses}건 (참석 {tally.attending} · 불참 {tally.declined})
          </dd>
        </div>
        <div className={styles.summary__fact}>
          <dt>식사</dt>
          <dd>
            {tally.mealGuests}명 · 미정 {tally.mealUndecidedGuests}명
          </dd>
        </div>
      </dl>
    </li>
  );
}

// 참석 의사 집계 컨테이너. 대시보드와 참석 의사 화면이 같은 숫자를 보이도록 summarizeRsvps 한 곳에서 센다.
export default async function RsvpSummary() {
  const summary = summarizeRsvps(await listRsvps());

  return (
    <ul className={styles.summary} aria-label="참석 의사 집계">
      <SummaryCard title="합계" tally={summary.TOTAL} isTotal />
      <SummaryCard title={SIDE_LABEL.GROOM} tally={summary.GROOM} />
      <SummaryCard title={SIDE_LABEL.BRIDE} tally={summary.BRIDE} />
    </ul>
  );
}
