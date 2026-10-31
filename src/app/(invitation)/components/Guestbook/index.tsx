import GuestbookWriter from '../GuestbookWriter';
import Section from '../Section';
import styles from './Guestbook.module.scss';

// 방명록은 쓰기 전용이다. 남긴 글은 청첩장에 싣지 않고 관리자 화면에서만 본다.
export default function Guestbook() {
  return (
    <Section id="guestbook" eyebrow="GUESTBOOK" title="방명록" className={styles.guestbook}>
      <GuestbookWriter />
    </Section>
  );
}
