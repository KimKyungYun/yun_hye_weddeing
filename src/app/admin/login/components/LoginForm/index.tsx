'use client';

import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import FormMessage from '@/components/FormMessage';
import SubmitButton from '@/components/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import { signIn } from '../../actions';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  // 실패해도 이메일은 남긴다 (React 19 는 제출 뒤 폼을 비운다). 비밀번호는 비워지는 게 맞다.
  const [email, setEmail] = useState('');
  const [state, formAction] = useActionState(signIn, INITIAL_FORM_STATE);

  return (
    <form action={formAction} className={styles['login-form']} noValidate>
      <Field id="email" label="이메일">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Field id="password" label="비밀번호">
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      <FormMessage state={state} />
      <SubmitButton pendingLabel="확인 중…">로그인</SubmitButton>
    </form>
  );
}
