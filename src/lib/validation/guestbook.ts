import { z } from 'zod';
import { GUESTBOOK_MESSAGE_MAX, GUESTBOOK_NAME_MAX } from '@/constants/guestbook';

// 방명록은 쓰기 전용(목록은 관리자만 본다)이라 비밀번호를 받지 않는다.
export const guestbookEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '이름을 입력해 주세요.')
    .max(GUESTBOOK_NAME_MAX, `이름은 ${GUESTBOOK_NAME_MAX}자 이내로 입력해 주세요.`),
  message: z
    .string()
    .trim()
    .min(1, '축하 메시지를 입력해 주세요.')
    .max(GUESTBOOK_MESSAGE_MAX, `메시지는 ${GUESTBOOK_MESSAGE_MAX}자 이내로 입력해 주세요.`),
});

export type GuestbookEntryInput = z.infer<typeof guestbookEntrySchema>;
