'use server';

import { z } from 'zod';
import { HONEYPOT_FIELD } from '@/constants/guestbook';
import { prisma } from '@/lib/prisma';
import { guestbookEntrySchema } from '@/lib/validation/guestbook';
import { parseRsvp } from '@/lib/validation/rsvp';
import type { FormState } from '@/types/formState';

// 사람에게 보이지 않는 칸이 채워졌으면 봇이다. 성공한 척 돌려보내 다시 시도하지 않게 한다.
function isBot(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === 'string' && value.length > 0;
}

const text = (formData: FormData, name: string) => formData.get(name) ?? '';

const GUESTBOOK_CREATED = '축하 메시지를 전달했습니다. 감사합니다!';
const RSVP_SUBMITTED = '참석 의사를 전달했습니다. 감사합니다!';

// 방명록은 쓰기 전용이다. 청첩장에는 목록을 싣지 않으므로 페이지를 다시 만들 필요가 없다.
export async function createGuestbookEntry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: 'success', message: GUESTBOOK_CREATED };

  const parsed = guestbookEntrySchema.safeParse({ name: text(formData, 'name'), message: text(formData, 'message') });
  if (!parsed.success) {
    return { status: 'error', message: '입력값을 확인해 주세요.', fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await prisma.guestbookEntry.create({ data: parsed.data });
  } catch {
    return { status: 'error', message: '전달하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }

  return { status: 'success', message: GUESTBOOK_CREATED };
}

export async function submitRsvp(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: 'success', message: RSVP_SUBMITTED };

  const parsed = parseRsvp({
    side: text(formData, 'side'),
    name: text(formData, 'name'),
    attending: text(formData, 'attending'),
    headcount: text(formData, 'headcount'),
    meal: text(formData, 'meal'),
    message: text(formData, 'message'),
  });
  if (!parsed.success) return { status: 'error', message: '입력값을 확인해 주세요.', fieldErrors: parsed.fieldErrors };

  try {
    await prisma.rsvp.create({ data: parsed.data });
  } catch {
    return { status: 'error', message: '전달하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }

  return { status: 'success', message: RSVP_SUBMITTED };
}
