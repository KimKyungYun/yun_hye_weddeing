import Image from 'next/image';
import kakaoMapIcon from '@/assets/images/icons/kakao-map.png';
import { DAEJEON_PICKS } from '@/constants/guide';
import Section from '../Section';
import styles from './DaejeonPicks.module.scss';

// 오시는 길 아래, 신랑·신부가 추천하는 대전 맛집·명소. 목록은 카카오맵 지도 하나로 모아 두고 버튼으로 연다.
export default function DaejeonPicks() {
  return (
    <Section id="daejeon" eyebrow="RECOMMEND" title={DAEJEON_PICKS.title} className={styles['daejeon-picks']}>
      <div className={styles['daejeon-picks__card']} data-reveal="">
        {/* 접힌 지도 */}
        <svg
          className={styles['daejeon-picks__icon']}
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 4.5 3.5 6.8v12.7L9 17.2l6 2.3 5.5-2.3V4.5L15 6.8z" />
          <path d="M9 4.5v12.7M15 6.8v12.7" />
        </svg>
        <p className={styles['daejeon-picks__message']}>{DAEJEON_PICKS.message}</p>
        <a className={styles['daejeon-picks__link']} href={DAEJEON_PICKS.href} target="_blank" rel="noopener noreferrer">
          <Image className={styles['daejeon-picks__link-icon']} src={kakaoMapIcon} alt="" height={20} />
          {DAEJEON_PICKS.linkLabel}
        </a>
      </div>
    </Section>
  );
}
