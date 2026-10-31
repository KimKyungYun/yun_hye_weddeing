'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ADMIN_LOGIN_PATH, requireAdmin } from '@/lib/auth/requireAdmin';
import { prisma } from '@/lib/prisma';
import { createServerSupabase } from '@/lib/supabase/server';
import type { FormState } from '@/types/formState';

const idSchema = z.uuid();

export async function signOut() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect(ADMIN_LOGIN_PATH);
}

export async function deleteRsvp(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idSchema.safeParse(formData.get('id'));

  try {
    if (!id.success) throw new Error('잘못된 id');
    // 이미 지워졌어도 오류로 보지 않는다
    await prisma.rsvp.deleteMany({ where: { id: id.data } });
  } catch {
    return { status: 'error', message: '삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }

  revalidatePath('/admin', 'layout');
  return { status: 'success', message: '삭제했습니다.' };
}

// 방명록은 관리자만 보고 지운다 (부적절한 글 정리)
export async function deleteGuestbookEntryAsAdmin(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idSchema.safeParse(formData.get('id'));

  try {
    if (!id.success) throw new Error('잘못된 id');
    await prisma.guestbookEntry.deleteMany({ where: { id: id.data } });
  } catch {
    return { status: 'error', message: '삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }

  revalidatePath('/admin', 'layout');
  return { status: 'success', message: '삭제했습니다.' };
}
