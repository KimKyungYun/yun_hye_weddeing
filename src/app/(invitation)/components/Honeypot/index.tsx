import { HONEYPOT_FIELD } from '@/constants/guestbook';
import styles from './Honeypot.module.scss';

// 봇만 채우는 칸. 사람에게는 보이지도, 탭으로 닿지도 않는다.
export default function Honeypot() {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={HONEYPOT_FIELD}>웹사이트</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
