import RsvpDialog from '../RsvpDialog';
import styles from './Rsvp.module.scss';

// 레퍼런스처럼 카드 위 테두리에 알약 라벨이 걸린 참석 의사 안내
export default function Rsvp() {
  return (
    <section id="rsvp" className={styles.rsvp} aria-labelledby="rsvp-title">
      <div className={styles.rsvp__card} data-reveal="">
        <h2 id="rsvp-title" className={styles.rsvp__label}>
          참석 의사
        </h2>
        <p className={styles.rsvp__text}>
          축하의 마음으로 참석해주시는
          <br />
          모든 분들을 귀하게 모실 수 있도록
          <br />
          참석 의사를 전달 부탁드립니다.
        </p>
        <span className={styles.rsvp__dash} aria-hidden="true">
          —
        </span>
        <p className={styles.rsvp__text}>
          식사를 하지 않는 분들에게는
          <br />
          소정의 답례품을 제공해드립니다.
        </p>
        <RsvpDialog />
      </div>
    </section>
  );
}
