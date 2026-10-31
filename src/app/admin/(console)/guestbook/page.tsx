import GuestbookList from '../components/GuestbookList';
import PageHeading from '../components/PageHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '방명록' };

export default function GuestbookPage() {
  return (
    <>
      <PageHeading title="방명록" description="하객이 남긴 축하 메시지는 이 화면에서만 볼 수 있습니다." />
      <GuestbookList />
    </>
  );
}
