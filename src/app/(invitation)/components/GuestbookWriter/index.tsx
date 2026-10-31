'use client';

import { useState } from 'react';
import Dialog from '../Dialog';
import GuestbookForm from '../GuestbookForm';
import { PenIcon } from '../Icons';
import { useToast } from '../ToastProvider';
import styles from './GuestbookWriter.module.scss';

// 안내 카드 + "작성하기" → 쓰기 대화상자
export default function GuestbookWriter() {
  const [isWriting, setIsWriting] = useState(false);
  const showToast = useToast();

  const handleSubmitted = (message: string) => {
    setIsWriting(false);
    showToast(message);
  };

  return (
    <div className={styles['guestbook-writer']} data-reveal="">
      <div className={styles['guestbook-writer__card']}>
        <span className={styles['guestbook-writer__icon']} aria-hidden="true">
          <PenIcon size={22} />
        </span>
        <p className={styles['guestbook-writer__text']}>따뜻한 축하의 마음을 남겨 주세요.</p>
        <p className={styles['guestbook-writer__note']}>남겨 주신 글은 신랑·신부에게만 전달됩니다.</p>
      </div>
      <button type="button" className={styles['guestbook-writer__button']} onClick={() => setIsWriting(true)}>
        작성하기
      </button>
      <Dialog
        open={isWriting}
        onClose={() => setIsWriting(false)}
        title="방명록 남기기"
        description="남겨 주신 글은 신랑·신부에게만 전달됩니다."
      >
        <GuestbookForm onSubmitted={handleSubmitted} />
      </Dialog>
    </div>
  );
}
