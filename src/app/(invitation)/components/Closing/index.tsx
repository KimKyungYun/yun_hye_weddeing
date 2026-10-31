import Image from 'next/image';
import { CLOSING_PHOTO } from '@/constants/photos';
import { BRIDE, GROOM, WEDDING_DATE } from '@/constants/wedding';
import { formatEnglishDate } from '@/utils/weddingDate';
import ShareActions from '../ShareActions';
import styles from './Closing.module.scss';

// 마무리: 사진 위 날짜·인사 한 줄, 그 아래 공유 버튼
export default function Closing() {
  return (
    <footer className={styles.closing}>
      <div className={styles.closing__photo}>
        <Image
          className={styles.closing__image}
          src={CLOSING_PHOTO}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 480px, 100vw"
        />
        <div className={styles.closing__caption} data-reveal="fade">
          <p className={styles.closing__date}>{formatEnglishDate(WEDDING_DATE)}</p>
          <p className={styles.closing__message}>보내주신 따뜻한 진심에 마음 깊이 감사드립니다.</p>
        </div>
      </div>
      <div className={styles.closing__share}>
        <ShareActions />
        <p className={styles.closing__signature}>
          {GROOM.nameEn} &amp; {BRIDE.nameEn}
        </p>
      </div>
    </footer>
  );
}
