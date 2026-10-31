'use client';

import { useEffect, useId, useRef } from 'react';
import { CloseIcon } from '../Icons';
import styles from './Dialog.module.scss';
import type { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

// 방명록 쓰기·삭제, 참석 의사 폼을 띄우는 대화상자.
// 닫혀 있을 때는 내용을 그리지 않아, 다시 열면 폼이 처음 상태로 돌아간다.
export default function Dialog({ open, onClose, title, description, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      data-scroll-lock={open ? '' : undefined}
    >
      <div className={styles.dialog__header}>
        <h2 id={titleId} className={styles.dialog__title}>
          {title}
        </h2>
        <button type="button" className={styles.dialog__close} onClick={onClose} aria-label="닫기">
          <CloseIcon />
        </button>
      </div>
      {description && <p className={styles.dialog__description}>{description}</p>}
      {open && <div className={styles.dialog__body}>{children}</div>}
    </dialog>
  );
}
