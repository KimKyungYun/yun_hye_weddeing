import Image from 'next/image';
import kakaoMapIcon from '@/assets/images/icons/kakao-map.png';
import naverMapIcon from '@/assets/images/icons/naver-map.png';
import { MAP_LINKS } from '@/constants/guide';
import type { MapLinkKey } from '@/constants/guide';
import styles from './MapLinks.module.scss';
import type { StaticImageData } from 'next/image';

const ICONS: Record<MapLinkKey, StaticImageData> = {
  naver: naverMapIcon,
  kakao: kakaoMapIcon,
};

// 네이버 지도 · 카카오맵 바로가기 (각 서비스 아이콘)
export default function MapLinks() {
  return (
    <ul className={styles['map-links']} data-reveal="">
      {MAP_LINKS.map((link) => (
        <li key={link.key}>
          <a className={styles['map-links__link']} href={link.href} target="_blank" rel="noopener noreferrer">
            <Image className={styles['map-links__icon']} src={ICONS[link.key]} alt="" height={20} />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
