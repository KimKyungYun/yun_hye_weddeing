'use client';

import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import FormMessage from '@/components/FormMessage';
import SubmitButton from '@/components/SubmitButton';
import { MEAL_PLAN_LABEL, MEAL_PLANS, RSVP_HEADCOUNT_MAX, RSVP_MESSAGE_MAX, RSVP_NAME_MAX, SIDE_LABEL, SIDES } from '@/constants/rsvp';
import { INITIAL_FORM_STATE } from '@/types/formState';
import type { MealPlan, Side } from '@/constants/rsvp';
import type { FormState } from '@/types/formState';
import { submitRsvp } from '../../actions';
import ChoiceGroup from '../ChoiceGroup';
import Honeypot from '../Honeypot';
import styles from './RsvpForm.module.scss';

type Attending = 'yes' | 'no';

const SIDE_OPTIONS = SIDES.map((side) => ({ value: side, label: SIDE_LABEL[side] }));
const ATTENDING_OPTIONS = [
  { value: 'yes', label: '참석할게요' },
  { value: 'no', label: '참석이 어려워요' },
] as const;
const MEAL_OPTIONS = MEAL_PLANS.map((meal) => ({ value: meal, label: MEAL_PLAN_LABEL[meal] }));
const HEADCOUNT_OPTIONS = Array.from({ length: RSVP_HEADCOUNT_MAX }, (_, index) => String(index + 1));

// 참석이면 인원·식사 여부를 더 묻는다.
// 입력값은 상태로 쥔다 — React 19 는 제출 뒤 폼을 비우는데, 검증에 걸렸을 때 다시 쓰게 하면 안 된다.
export default function RsvpForm({ onSubmitted }: { onSubmitted: (message: string) => void }) {
  const [side, setSide] = useState<Side | ''>('');
  const [attending, setAttending] = useState<Attending | ''>('');
  const [name, setName] = useState('');
  const [headcount, setHeadcount] = useState('1');
  const [meal, setMeal] = useState<MealPlan | ''>('');
  const [message, setMessage] = useState('');

  const [state, formAction] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await submitRsvp(prev, formData);
    if (result.status === 'success') onSubmitted(result.message ?? '');
    return result;
  }, INITIAL_FORM_STATE);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className={styles['rsvp-form']} noValidate>
      <Honeypot />
      <ChoiceGroup name="side" legend="어느 쪽 하객이신가요?" options={SIDE_OPTIONS} value={side} onChange={setSide} errors={errors.side} />
      <ChoiceGroup name="attending" legend="참석 여부" options={ATTENDING_OPTIONS} value={attending} onChange={setAttending} errors={errors.attending} />
      <Field id="rsvp-name" label="성함" errors={errors.name}>
        <input
          id="rsvp-name"
          name="name"
          autoComplete="name"
          maxLength={RSVP_NAME_MAX}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>
      {attending === 'yes' && (
        <>
          <Field id="rsvp-headcount" label="참석 인원 (본인 포함)" errors={errors.headcount}>
            <select id="rsvp-headcount" name="headcount" value={headcount} onChange={(event) => setHeadcount(event.target.value)}>
              {HEADCOUNT_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count}명
                </option>
              ))}
            </select>
          </Field>
          <ChoiceGroup name="meal" legend="식사 여부" options={MEAL_OPTIONS} value={meal} onChange={setMeal} errors={errors.meal} />
        </>
      )}
      <Field id="rsvp-message" label="전하실 말씀 (선택)" errors={errors.message}>
        <textarea
          id="rsvp-message"
          name="message"
          rows={3}
          maxLength={RSVP_MESSAGE_MAX}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Field>
      {state.status === 'error' && <FormMessage state={state} />}
      <SubmitButton pendingLabel="전달하는 중…">전달하기</SubmitButton>
    </form>
  );
}
