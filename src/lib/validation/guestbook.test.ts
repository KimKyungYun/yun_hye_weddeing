import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { guestbookEntrySchema } from './guestbook';

describe('guestbookEntrySchema', () => {
  it('이름·메시지 앞뒤 공백을 지운다', () => {
    expect(guestbookEntrySchema.parse({ name: ' 하객 ', message: ' 축하합니다 ' })).toEqual({ name: '하객', message: '축하합니다' });
  });

  it('경계값: 이름 20자·메시지 500자는 통과, 넘으면 실패', () => {
    expect(guestbookEntrySchema.safeParse({ name: '가'.repeat(20), message: '나'.repeat(500) }).success).toBe(true);

    const result = guestbookEntrySchema.safeParse({ name: '가'.repeat(21), message: '나'.repeat(501) });
    expect(result.success).toBe(false);
    if (!result.success) expect(Object.keys(z.flattenError(result.error).fieldErrors).sort()).toEqual(['message', 'name']);
  });

  it('공백뿐인 이름·메시지는 거른다', () => {
    expect(guestbookEntrySchema.safeParse({ name: '  ', message: '   ' }).success).toBe(false);
  });
});
