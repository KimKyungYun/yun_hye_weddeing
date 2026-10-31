'use client';

import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import FormMessage from '@/components/FormMessage';
import SubmitButton from '@/components/SubmitButton';
import { GUESTBOOK_MESSAGE_MAX, GUESTBOOK_NAME_MAX } from '@/constants/guestbook';
import { INITIAL_FORM_STATE } from '@/types/formState';
import type { FormState } from '@/types/formState';
import { createGuestbookEntry } from '../../actions';
import Honeypot from '../Honeypot';
import styles from './GuestbookForm.module.scss';

// 이름·메시지는 상태로 쥔다 — React 19 는 제출 뒤 폼을 비우는데, 검증에 걸렸을 때 메시지를 다시 쓰게 하면 안 된다.
export default function GuestbookForm({ onSubmitted }: { onSubmitted: (message: string) => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [state, formAction] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await createGuestbookEntry(prev, formData);
    if (result.status === 'success') onSubmitted(result.message ?? '');
    return result;
  }, INITIAL_FORM_STATE);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className={styles['guestbook-form']} noValidate>
      <Honeypot />
      <Field id="guestbook-name" label="이름" errors={errors.name}>
        <input
          id="guestbook-name"
          name="name"
          autoComplete="name"
          maxLength={GUESTBOOK_NAME_MAX}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>
      <Field
        id="guestbook-message"
        label="축하 메시지"
        hint={`${message.length} / ${GUESTBOOK_MESSAGE_MAX}`}
        errors={errors.message}
      >
        <textarea
          id="guestbook-message"
          name="message"
          rows={5}
          maxLength={GUESTBOOK_MESSAGE_MAX}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Field>
      {state.status === 'error' && <FormMessage state={state} />}
      <SubmitButton pendingLabel="전달하는 중…">전달하기</SubmitButton>
    </form>
  );
}
