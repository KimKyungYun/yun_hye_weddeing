import { describe, expect, it } from 'vitest';
import { parseRsvp } from './rsvp';

const base = { side: 'GROOM', name: ' 홍길동 ', message: '' };

describe('parseRsvp', () => {
  it('참석이면 인원·식사 여부를 숫자·enum 으로 바꿔 돌려준다', () => {
    const result = parseRsvp({ ...base, attending: 'yes', headcount: '3', meal: 'YES' });
    expect(result).toEqual({
      success: true,
      data: { side: 'GROOM', name: '홍길동', message: null, attending: true, headcount: 3, meal: 'YES' },
    });
  });

  it('불참이면 인원 0·식사 null 로 맞춘다 (보낸 인원·식사 값은 무시)', () => {
    const result = parseRsvp({ ...base, attending: 'no', headcount: '5', meal: 'YES', message: ' 축하해 ' });
    expect(result).toEqual({
      success: true,
      data: { side: 'GROOM', name: '홍길동', message: '축하해', attending: false, headcount: 0, meal: null },
    });
  });

  it('참석인데 인원이 범위를 벗어나거나 식사 여부가 없으면 해당 칸 오류', () => {
    ['0', '11', '', '1.5'].forEach((headcount) => {
      const result = parseRsvp({ ...base, attending: 'yes', headcount, meal: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.fieldErrors.headcount?.length).toBeGreaterThan(0);
        expect(result.fieldErrors.meal).toEqual(['식사 여부를 골라 주세요.']);
      }
    });
  });

  it('빈 폼이면 측·이름·참석 여부 오류를 한 번에 알려 준다', () => {
    const result = parseRsvp({ side: '', name: '   ', attending: '', message: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(['attending', 'name', 'side']);
      expect(result.fieldErrors.attending).toEqual(['참석 여부를 골라 주세요.']);
    }
  });

  it('공통 칸 오류와 참석 상세 오류를 함께 모은다', () => {
    const result = parseRsvp({ side: 'FRIEND', name: '하객', attending: 'yes', headcount: '1', meal: 'MAYBE', message: '' });
    expect(result.success).toBe(false);
    if (!result.success) expect(Object.keys(result.fieldErrors).sort()).toEqual(['meal', 'side']);
  });
});
