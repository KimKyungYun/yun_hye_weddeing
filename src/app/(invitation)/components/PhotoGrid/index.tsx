'use client';

import Image from 'next/image';
import { useState } from 'react';
import PhotoModal from '../PhotoModal';
import styles from './PhotoGrid.module.scss';
import type { StaticImageData } from 'next/image';

// 처음에 보이는 사진 수 (3열 × 3줄). 더 있으면 "사진 더 보기"
const INITIAL_COUNT = 9;

interface PhotoGridProps {
  photos: StaticImageData[];
  label: string;
}

function PhotoThumb({ photo, alt, onOpen }: { photo: StaticImageData; alt: string; onOpen: () => void }) {
  return (
    <li className={styles['photo-grid__item']} data-reveal="zoom">
      <button type="button" className={styles['photo-grid__button']} onClick={onOpen} aria-label={`${alt} 크게 보기`}>
        <Image className={styles['photo-grid__image']} src={photo} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 140px, 33vw" />
      </button>
    </li>
  );
}

// 정사각 썸네일 3열. 사진을 누르면 크게 보기(스와이프·키보드 넘김)가 열린다.
export default function PhotoGrid({ photos, label }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const visiblePhotos = isExpanded ? photos : photos.slice(0, INITIAL_COUNT);

  return (
    <>
      <ul className={styles['photo-grid']}>
        {visiblePhotos.map((photo, index) => (
          <PhotoThumb key={photo.src} photo={photo} alt={`${label} ${index + 1}`} onOpen={() => setOpenIndex(index)} />
        ))}
      </ul>
      {!isExpanded && photos.length > INITIAL_COUNT && (
        <button type="button" className={styles['photo-grid__more']} onClick={() => setIsExpanded(true)}>
          사진 더 보기 ({photos.length - INITIAL_COUNT})
        </button>
      )}
      <PhotoModal photos={photos} label={label} index={openIndex} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </>
  );
}
