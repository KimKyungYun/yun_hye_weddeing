'use client';

import { useState } from 'react';
import Dialog from '../Dialog';
import { CalendarCheckIcon } from '../Icons';
import RsvpForm from '../RsvpForm';
import { useToast } from '../ToastProvider';
import styles from './RsvpDialog.module.scss';

export default function RsvpDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const showToast = useToast();

  const handleSubmitted = (message: string) => {
    setIsOpen(false);
    showToast(message);
  };

  return (
    <div className={styles['rsvp-dialog']}>
      <button type="button" className={styles['rsvp-dialog__trigger']} onClick={() => setIsOpen(true)}>
        <CalendarCheckIcon />
        참석 의사 전달하기
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="참석 의사 전달"
        description="신랑·신부에게만 전달되며, 다른 하객에게는 보이지 않습니다."
      >
        <RsvpForm onSubmitted={handleSubmitted} />
      </Dialog>
    </div>
  );
}
