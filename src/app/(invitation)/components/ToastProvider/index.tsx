'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import styles from './ToastProvider.module.scss';
import type { ReactNode } from 'react';

const VISIBLE_MS = 2500;

const ToastContext = createContext<(message: string) => void>(() => {});

// 복사·제출 결과를 화면 아래에 잠깐 띄운다
export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const timerRef = useRef<number>(undefined);

  const show = useCallback((message: string) => {
    setToast({ message, isVisible: true });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), VISIBLE_MS);
  }, []);

  return (
    <ToastContext value={show}>
      {children}
      <div className={`${styles.toast} ${toast.isVisible ? styles['toast--visible'] : ''}`} role="status" aria-live="polite">
        {toast.message}
      </div>
    </ToastContext>
  );
}
