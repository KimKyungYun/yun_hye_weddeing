import ConfirmDelete from '@/components/ConfirmDelete';
import { listGuestbookEntries } from '@/lib/repository/guestbook';
import { formatDateTime } from '@/utils/weddingDate';
import type { GuestbookEntry } from '@/types/domain';
import { deleteGuestbookEntryAsAdmin } from '../../actions';
import styles from './GuestbookList.module.scss';

function GuestbookCard({ entry }: { entry: GuestbookEntry }) {
  return (
    <li className={styles['guestbook-list__card']}>
      <div className={styles['guestbook-list__header']}>
        <p className={styles['guestbook-list__name']}>{entry.name}</p>
        <time className={styles['guestbook-list__date']} dateTime={entry.createdAt}>
          {formatDateTime(new Date(entry.createdAt))}
        </time>
        <ConfirmDelete
          id={entry.id}
          itemName={`${entry.name}님의 방명록`}
          description="삭제하면 되돌릴 수 없습니다."
          action={deleteGuestbookEntryAsAdmin}
        />
      </div>
      <p className={styles['guestbook-list__message']}>{entry.message}</p>
    </li>
  );
}

// 방명록 컨테이너. limit 를 주면 최신 글만 그만큼 보인다(대시보드).
export default async function GuestbookList({ limit }: { limit?: number }) {
  const entries = await listGuestbookEntries();
  const visible = limit ? entries.slice(0, limit) : entries;

  if (visible.length === 0) return <p className={styles['guestbook-list__empty']}>아직 남겨진 방명록이 없습니다.</p>;

  return (
    <ul className={styles['guestbook-list']}>
      {visible.map((entry) => (
        <GuestbookCard key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}
