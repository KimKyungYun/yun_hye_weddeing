'use client';

import { useFormStatus } from 'react-dom';
import styles from './SubmitButton.module.scss';
import type { ReactNode } from 'react';

interface SubmitButtonProps {
  children: ReactNode;
  pendingLabel?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'medium' | 'small';
  name?: string;
  value?: string;
  ariaLabel?: string;
}

// 감싼 form 이 제출 중이면 비활성화된다 (중복 제출 방지)
export default function SubmitButton({
  children,
  pendingLabel,
  variant = 'primary',
  size = 'medium',
  name,
  value,
  ariaLabel,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name={name}
      value={value}
      aria-label={ariaLabel}
      disabled={pending}
      className={`${styles.button} ${styles[`button--${variant}`]} ${size === 'small' ? styles['button--small'] : ''}`}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
