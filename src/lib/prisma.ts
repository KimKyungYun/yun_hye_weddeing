import 'server-only';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

/**
 * PrismaClient 싱글턴.
 *
 * - Prisma 7 은 SQL 연결에 드라이버 어댑터가 필요하다(네이티브 엔진 없음).
 * - DATABASE_URL 은 Supabase 트랜잭션 풀러(6543). 서버리스 함수가 많이 떠도 연결이 모자라지 않다.
 * - 개발 중 HMR 이 모듈을 다시 평가하면 연결이 쌓이므로 globalThis 에 캐시한다.
 */
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL 이 설정되지 않았습니다. .env.local(또는 .env) 을 확인하세요.');

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString, max: 5 }),
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
