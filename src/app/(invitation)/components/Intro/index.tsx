import Image from 'next/image';
import { HERO_PHOTO } from '@/constants/photos';
import { BRIDE, GROOM, WEDDING_DATE } from '@/constants/wedding';
import { formatDateTime } from '@/utils/weddingDate';
import { penFont, scriptFont } from '../../fonts';
import IntroStage from '../IntroStage';
import styles from './Intro.module.scss';

// 첫 화면 배너(높이 100dvh). 레퍼런스 영상처럼 사진 위에 "We're getting married" 가 한 줄씩 써지고,
// 화살표가 그려지며 두 사람 이름이 붙는다. 날짜는 처음부터 왼쪽 아래에 있다.
//
// 화면 비율에 따라 사진이 잘리는 범위가 달라지므로 두 겹으로 나눠 둔다.
//  - 제목·날짜: 화면 기준 (어느 폭에서도 화면 안에 들어온다)
//  - 화살표·이름표: 사진 기준 프레임(intro__frame) 안, 사진 픽셀 좌표(viewBox 1324×2000) — 두 사람을 따라간다
//    휴대폰에서는 사진 좌우 약 15% 가 잘리므로 이름표는 그 안쪽에 둔다.
export default function Intro() {
  return (
    <section className={`${styles.intro} ${scriptFont.variable} ${penFont.variable}`} aria-label="초대">
      <div className={styles.intro__frame}>
        <Image
          className={styles.intro__photo}
          src={HERO_PHOTO}
          alt={`${GROOM.firstName}와 ${BRIDE.firstName}의 웨딩 사진`}
          fill
          preload
          quality={90}
          placeholder="blur"
          sizes="(min-width: 1024px) 540px, 140vw"
        />
      </div>
      <div className={styles.intro__shade} />
      <IntroStage className={styles.intro__stage}>
        <h1 className={styles.intro__title}>
          <span className="sr-only">We&apos;re getting married</span>
          <span className={`${styles.intro__line} ${styles['intro__line--first']}`} aria-hidden="true">
            We&apos;re
          </span>
          <span className={`${styles.intro__line} ${styles['intro__line--second']}`} aria-hidden="true">
            getting married
          </span>
        </h1>

        <div className={styles.intro__frame}>
          <svg className={styles.intro__arrows} viewBox="0 0 1324 2000" aria-hidden="true">
            {/* 경윤 → 신랑 */}
            <path pathLength={1} d="M398 676 C 440 650, 488 668, 476 702 C 466 730, 434 718, 446 692 C 460 662, 508 712, 516 790" />
            <path pathLength={1} d="M494 772 L 517 794 L 526 764" />
            {/* 혜아 → 신부 */}
            <path pathLength={1} d="M992 790 C 958 770, 914 786, 928 818 C 940 846, 972 832, 960 808 C 946 780, 896 816, 906 880" />
            <path pathLength={1} d="M890 860 L 905 882 L 922 862" />
          </svg>
          <p className={`${styles.intro__name} ${styles['intro__name--groom']}`}>{GROOM.firstName}</p>
          <p className={`${styles.intro__name} ${styles['intro__name--bride']}`}>{BRIDE.firstName}</p>
        </div>

        <p className={styles.intro__date}>{formatDateTime(WEDDING_DATE)}</p>
      </IntroStage>
    </section>
  );
}
