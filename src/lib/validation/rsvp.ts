import { z } from 'zod';
import { MEAL_PLANS, RSVP_HEADCOUNT_MAX, RSVP_MESSAGE_MAX, RSVP_NAME_MAX, SIDES } from '@/constants/rsvp';
import type { MealPlan, Side } from '@/constants/rsvp';

// 모든 응답에 공통인 칸
const baseSchema = z.object({
  side: z.enum(SIDES, { message: '신랑측·신부측 중 하나를 골라 주세요.' }),
  name: z
    .string()
    .trim()
    .min(1, '이름을 입력해 주세요.')
    .max(RSVP_NAME_MAX, `이름은 ${RSVP_NAME_MAX}자 이내로 입력해 주세요.`),
  attending: z.enum(['yes', 'no'], { message: '참석 여부를 골라 주세요.' }),
  message: z
    .string()
    .trim()
    .max(RSVP_MESSAGE_MAX, `한마디는 ${RSVP_MESSAGE_MAX}자 이내로 입력해 주세요.`)
    .transform((value) => (value === '' ? null : value)),
});

// 참석일 때만 받는 칸
const attendSchema = z.object({
  headcount: z.coerce
    .number<string>({ message: '인원을 골라 주세요.' })
    .int('인원을 골라 주세요.')
    .min(1, '인원은 1명 이상이어야 합니다.')
    .max(RSVP_HEADCOUNT_MAX, `인원은 ${RSVP_HEADCOUNT_MAX}명까지 입력할 수 있습니다.`),
  meal: z.enum(MEAL_PLANS, { message: '식사 여부를 골라 주세요.' }),
});

export interface RsvpInput {
  side: Side;
  name: string;
  message: string | null;
  attending: boolean;
  // 불참이면 0 · null (DB CHECK 제약과 같은 규칙)
  headcount: number;
  meal: MealPlan | null;
}

type FieldErrors = Record<string, string[] | undefined>;

export type RsvpParseResult = { success: true; data: RsvpInput } | { success: false; fieldErrors: FieldErrors };

// 공통 칸과 참석 상세를 따로 검사해 오류를 한 번에 모은다.
// (참석 여부로 갈라지는 discriminatedUnion 은 참석 여부가 비면 다른 칸 오류를 알려 주지 않는다)
export function parseRsvp(input: Record<string, unknown>): RsvpParseResult {
  const base = baseSchema.safeParse(input);
  const details = input.attending === 'yes' ? attendSchema.safeParse(input) : null;

  const fieldErrors: FieldErrors = {
    ...(base.success ? {} : z.flattenError(base.error).fieldErrors),
    ...(details && !details.success ? z.flattenError(details.error).fieldErrors : {}),
  };
  if (!base.success || (details && !details.success)) return { success: false, fieldErrors };

  const { side, name, message, attending } = base.data;
  if (attending === 'no' || !details) return { success: true, data: { side, name, message, attending: false, headcount: 0, meal: null } };

  return { success: true, data: { side, name, message, attending: true, headcount: details.data.headcount, meal: details.data.meal } };
}
