import { describe, expect, it } from 'vitest';
import { resolveSiteUrl } from './siteUrl';

describe('resolveSiteUrl', () => {
  it('직접 넣은 실제 도메인을 그대로 쓴다 (끝의 / 는 뗀다)', () => {
    expect(resolveSiteUrl('https://wedding.example.com/', 'yunhyeweddeing.vercel.app')).toBe('https://wedding.example.com');
  });

  it('localhost 가 들어간 채 배포되면 Vercel 운영 도메인을 쓴다', () => {
    expect(resolveSiteUrl('http://localhost:3000', 'yunhyeweddeing.vercel.app')).toBe('https://yunhyeweddeing.vercel.app');
    expect(resolveSiteUrl('http://127.0.0.1:3000', 'yunhyeweddeing.vercel.app')).toBe('https://yunhyeweddeing.vercel.app');
  });

  it('비어 있으면 Vercel 운영 도메인을 쓴다', () => {
    expect(resolveSiteUrl(undefined, 'yunhyeweddeing.vercel.app')).toBe('https://yunhyeweddeing.vercel.app');
    expect(resolveSiteUrl('', 'yunhyeweddeing.vercel.app')).toBe('https://yunhyeweddeing.vercel.app');
  });

  it('로컬 개발(Vercel 값 없음)에서는 localhost 를 쓴다', () => {
    expect(resolveSiteUrl('http://localhost:3000')).toBe('http://localhost:3000');
    expect(resolveSiteUrl()).toBe('http://localhost:3000');
  });

  it('localhost 로 시작하는 실제 도메인을 localhost 로 착각하지 않는다', () => {
    expect(resolveSiteUrl('https://localhost-wedding.com', 'yunhyeweddeing.vercel.app')).toBe('https://localhost-wedding.com');
  });
});
