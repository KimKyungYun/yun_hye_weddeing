import { describe, expect, it, vi } from 'vitest';
import { withRetry } from './retry';

vi.mock('server-only', () => ({}));

describe('withRetry', () => {
  it('일시적인 연결 오류는 한 번 다시 시도한다', async () => {
    const query = vi.fn().mockRejectedValueOnce(new Error('read ECONNRESET')).mockResolvedValueOnce('ok');
    await expect(withRetry(query)).resolves.toBe('ok');
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('일시적이지 않은 오류는 바로 던진다', async () => {
    const query = vi.fn().mockRejectedValue(new Error('column "x" does not exist'));
    await expect(withRetry(query)).rejects.toThrow('column');
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('두 번 다 실패하면 마지막 오류를 던진다', async () => {
    const query = vi.fn().mockRejectedValue(new Error('Connection terminated unexpectedly'));
    await expect(withRetry(query)).rejects.toThrow('Connection terminated');
    expect(query).toHaveBeenCalledTimes(2);
  });
});
