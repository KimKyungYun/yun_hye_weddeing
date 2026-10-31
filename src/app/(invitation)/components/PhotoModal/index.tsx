'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CloseIcon } from '../Icons';
import styles from './PhotoModal.module.scss';
import type { StaticImageData } from 'next/image';
import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react';

// 이 거리(px) 이상 옆으로 밀면 다음·이전 사진
const SWIPE_MIN = 50;

interface PhotoModalProps {
  photos: StaticImageData[];
  label: string;
  // null 이면 닫힘
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

// 사진 크게 보기. 네이티브 dialog 라 Esc·포커스 가두기는 브라우저가 맡는다.
export default function PhotoModal({ photos, label, index, onIndexChange, onClose }: PhotoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const move = (step: number) => {
    if (index === null) return;
    const next = index + step;
    if (next >= 0 && next < photos.length) onIndexChange(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  };

  // 사진 바깥(검은 바탕)을 누르면 닫는다
  const handleStageClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.screenX, y: touch.screenY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    if (!start) return;
    const touch = event.changedTouches[0];
    const diffX = start.x - touch.screenX;
    const diffY = start.y - touch.screenY;
    if (Math.abs(diffX) < SWIPE_MIN || Math.abs(diffX) < Math.abs(diffY)) return;
    // 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전
    move(diffX > 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles['photo-modal']}
      aria-label={`${label} 크게 보기`}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      data-scroll-lock={isOpen ? '' : undefined}
    >
      {index !== null && (
        <>
          <button type="button" className={styles['photo-modal__close']} onClick={onClose} aria-label="닫기">
            <CloseIcon size={28} />
          </button>
          {index > 0 && (
            <button type="button" className={`${styles['photo-modal__nav']} ${styles['photo-modal__nav--prev']}`} onClick={() => move(-1)} aria-label="이전 사진">
              &#8249;
            </button>
          )}
          {index < photos.length - 1 && (
            <button type="button" className={`${styles['photo-modal__nav']} ${styles['photo-modal__nav--next']}`} onClick={() => move(1)} aria-label="다음 사진">
              &#8250;
            </button>
          )}
          <div className={styles['photo-modal__stage']} onClick={handleStageClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <Image
              key={photos[index].src}
              className={styles['photo-modal__image']}
              src={photos[index]}
              alt={`${label} ${index + 1}`}
              placeholder="blur"
              sizes="100vw"
              draggable={false}
            />
          </div>
          <p className={styles['photo-modal__counter']} aria-live="polite">
            {index + 1} / {photos.length}
          </p>
        </>
      )}
    </dialog>
  );
}
