'use client';

import { useSyncExternalStore } from 'react';
import { BRIDE, GROOM, WEDDING_DATE } from '@/constants/wedding';
import { getCountdown } from '@/utils/weddingDate';
import styles from './DdayCounter.module.scss';

// 1초마다 바뀌는 "지금(초 단위)". 서버에서는 null 이라 처음 그림이 서버·브라우저에서 같다(하이드레이션 불일치 없음).
const subscribe = (onTick: () => void) => {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
};
const getNowSecond = () => Math.floor(Date.now() / 1000);
const getServerNowSecond = () => null;

const pad = (value: number) => String(value).padStart(2, '0');

function CounterBox({ value, unit }: { value: string; unit: string }) {
  return (
    <div className={styles['dday-counter__box']}>
      <span className={styles['dday-counter__number']}>{value}</span>
      <span className={styles['dday-counter__unit']}>{unit}</span>
    </div>
  );
}

function Separator() {
  return (
    <span className={styles['dday-counter__separator']} aria-hidden="true">
      :
    </span>
  );
}

const COUPLE = (
  <>
    {GROOM.firstName} <span className={styles['dday-counter__heart']}>♥</span> {BRIDE.firstName}
  </>
);

export default function DdayCounter() {
  const nowSecond = useSyncExternalStore(subscribe, getNowSecond, getServerNowSecond);
  const countdown = nowSecond === null ? null : getCountdown(WEDDING_DATE, new Date(nowSecond * 1000));

  return (
    <div className={styles['dday-counter']} data-reveal="">
      <div className={styles['dday-counter__boxes']} role="timer">
        <CounterBox value={String(countdown?.days ?? 0)} unit="DAYS" />
        <Separator />
        <CounterBox value={pad(countdown?.hours ?? 0)} unit="HOUR" />
        <Separator />
        <CounterBox value={pad(countdown?.minutes ?? 0)} unit="MIN" />
        <Separator />
        <CounterBox value={pad(countdown?.seconds ?? 0)} unit="SEC" />
      </div>
      <p className={styles['dday-counter__message']}>
        {countdown?.isPast ? (
          <>{COUPLE}의 결혼식에 함께해 주셔서 감사합니다.</>
        ) : (
          <>
            {COUPLE}의 결혼식이 <em className={styles['dday-counter__dday']}>{countdown?.dDay ?? ' '}일</em> 남았습니다.
          </>
        )}
      </p>
    </div>
  );
}
