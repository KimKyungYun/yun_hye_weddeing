'use client';

import { useActionState, useRef } from 'react';
import SubmitButton from '@/components/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import type { FormState } from '@/types/formState';
import styles from './ConfirmDelete.module.scss';

interface ConfirmDeleteProps {
  id: string;
  itemName: string;
  description?: string;
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
}

// 삭제 버튼 → 확인 대화상자 → 서버 액션. 되돌릴 수 없으므로 한 번 더 묻는다.
export default function ConfirmDelete({ id, itemName, description, action }: ConfirmDeleteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, formAction] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await action(prev, formData);
    if (result.status !== 'error') dialogRef.current?.close();
    return result;
  }, INITIAL_FORM_STATE);

  return (
    <>
      <button type="button" className={styles['confirm-delete__trigger']} onClick={() => dialogRef.current?.showModal()}>
        삭제
      </button>
      <dialog ref={dialogRef} className={styles['confirm-delete__dialog']} aria-labelledby={`delete-${id}-title`}>
        <form action={formAction} className={styles['confirm-delete__body']}>
          <input type="hidden" name="id" value={id} />
          <h2 className={styles['confirm-delete__title']} id={`delete-${id}-title`}>
            ‘{itemName}’을(를) 삭제할까요?
          </h2>
          <p className={styles['confirm-delete__description']}>{description ?? '삭제하면 되돌릴 수 없습니다.'}</p>
          {state.status === 'error' && (
            <p className={styles['confirm-delete__error']} role="alert">
              {state.message}
            </p>
          )}
          <div className={styles['confirm-delete__actions']}>
            <button type="button" className={styles['confirm-delete__cancel']} onClick={() => dialogRef.current?.close()}>
              취소
            </button>
            <SubmitButton variant="danger" pendingLabel="삭제 중…">
              삭제
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </>
  );
}
