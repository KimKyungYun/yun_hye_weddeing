import 'server-only';

const RETRY_DELAY_MS = 150;

// 풀러를 거치는 연결이 순간적으로 끊기거나(ECONNRESET 등) 시간 초과가 나면 한 번만 다시 묻는다.
// 읽기 전용 조회에만 쓴다 — 쓰기를 다시 보내면 같은 일이 두 번 일어날 수 있다.
export async function withRetry<T>(query: () => Promise<T>, retries = 1): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (retries <= 0 || !isTransient(error)) throw error;
    await new Promise((resolve) => { setTimeout(resolve, RETRY_DELAY_MS); });
    return withRetry(query, retries - 1);
  }
}

function isTransient(error: unknown): boolean {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return /ECONNRESET|ETIMEDOUT|EPIPE|ECONNREFUSED|socket hang up|Connection terminated|timeout|P1001|P1017|P2024/i.test(text);
}
