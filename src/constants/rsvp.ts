// Prisma enum 과 같은 값을 쓴다 (DB 에는 소문자로 매핑돼 저장된다).
export const SIDES = ['GROOM', 'BRIDE'] as const;
export type Side = (typeof SIDES)[number];

export const SIDE_LABEL: Record<Side, string> = {
  GROOM: '신랑측',
  BRIDE: '신부측',
};

export const MEAL_PLANS = ['YES', 'NO', 'UNDECIDED'] as const;
export type MealPlan = (typeof MEAL_PLANS)[number];

export const MEAL_PLAN_LABEL: Record<MealPlan, string> = {
  YES: '식사 예정',
  NO: '식사 안 함',
  UNDECIDED: '미정',
};

export const RSVP_NAME_MAX = 20;
export const RSVP_HEADCOUNT_MAX = 10;
export const RSVP_MESSAGE_MAX = 200;
