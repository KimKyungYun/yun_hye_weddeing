import type { FormState } from '@/types/formState';
import styles from './FormMessage.module.scss';

// 서버 액션 결과 한 줄. 스크린리더가 바로 읽도록 live region 으로 둔다.
export default function FormMessage({ state }: { state: FormState }) {
  return (
    <p
      className={`${styles.message} ${state.status === 'error' ? styles['message--error'] : ''} ${state.status === 'success' ? styles['message--success'] : ''}`}
      role="status"
      aria-live="polite"
    >
      {state.status !== 'idle' ? state.message : ''}
    </p>
  );
}
