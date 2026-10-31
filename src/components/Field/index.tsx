import styles from './Field.module.scss';
import type { ReactNode } from 'react';

interface FieldProps {
  id: string;
  label: string;
  hint?: ReactNode;
  errors?: string[];
  children: ReactNode;
}

// 폼 칸: 라벨 · 입력 · 도움말 · 오류 (청첩장 폼과 관리자 로그인이 같이 쓴다)
export default function Field({ id, label, hint, errors, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${errors?.length ? styles['field--invalid'] : ''}`}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && !errors?.length && <p className={styles.field__hint}>{hint}</p>}
      {errors?.map((error) => (
        <p key={error} className={styles.field__error} role="alert">
          {error}
        </p>
      ))}
    </div>
  );
}
