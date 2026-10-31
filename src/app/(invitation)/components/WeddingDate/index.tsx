import { WEDDING_DATE } from '@/constants/wedding';
import { formatShortDate, formatWeekdayTime, getMonthGrid } from '@/utils/weddingDate';
import DdayCounter from '../DdayCounter';
import styles from './WeddingDate.module.scss';

function CalendarDay({ day, isWeddingDay }: { day: number; isWeddingDay: boolean }) {
  return (
    <li
      className={`${styles['wedding-date__day']} ${isWeddingDay ? styles['wedding-date__day--wedding'] : ''}`}
      aria-current={isWeddingDay ? 'date' : undefined}
    >
      {day}
    </li>
  );
}

// 날짜 띠: 큰 날짜 · 요일과 시각 · 그 달 달력 · D-day 카운트다운
export default function WeddingDate() {
  const grid = getMonthGrid(WEDDING_DATE);
  const days = Array.from({ length: grid.daysInMonth }, (_, index) => index + 1);
  const blanks = Array.from({ length: grid.leadingBlanks }, (_, index) => `blank-${index}`);

  return (
    <section id="date" className={styles['wedding-date']} aria-labelledby="date-title">
      <div className={styles['wedding-date__inner']}>
        <div data-reveal="">
          <h2 id="date-title" className={styles['wedding-date__date']}>
            {formatShortDate(WEDDING_DATE)}
          </h2>
          <p className={styles['wedding-date__time']}>{formatWeekdayTime(WEDDING_DATE)}</p>
        </div>

        <div className={styles['wedding-date__calendar']} data-reveal="">
          <div className={styles['wedding-date__weekdays']} aria-hidden="true">
            {grid.weekdays.map((weekday) => (
              <span key={weekday} className={styles['wedding-date__weekday']}>
                {weekday}
              </span>
            ))}
          </div>
          <ol className={styles['wedding-date__days']}>
            {blanks.map((key) => (
              <li key={key} className={`${styles['wedding-date__day']} ${styles['wedding-date__day--blank']}`} aria-hidden="true" />
            ))}
            {days.map((day) => (
              <CalendarDay key={day} day={day} isWeddingDay={day === grid.highlightDay} />
            ))}
          </ol>
        </div>

        <DdayCounter />
      </div>
    </section>
  );
}
