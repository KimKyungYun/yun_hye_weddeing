import type { Side } from '@/constants/rsvp';
import PageHeading from '../components/PageHeading';
import RsvpSummary from '../components/RsvpSummary';
import RsvpFilter from './components/RsvpFilter';
import RsvpList from './components/RsvpList';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '참석 의사' };

const SIDE_PARAM: Record<string, Side> = { groom: 'GROOM', bride: 'BRIDE' };

export default async function RsvpPage({ searchParams }: { searchParams: Promise<{ side?: string | string[] }> }) {
  const { side } = await searchParams;
  const selectedSide = typeof side === 'string' ? (SIDE_PARAM[side] ?? null) : null;

  return (
    <>
      <PageHeading title="참석 의사" description="같은 분이 여러 번 보냈다면 중복 응답을 삭제해 주세요." />
      <RsvpSummary />
      <RsvpFilter side={selectedSide} />
      <RsvpList side={selectedSide} />
    </>
  );
}
