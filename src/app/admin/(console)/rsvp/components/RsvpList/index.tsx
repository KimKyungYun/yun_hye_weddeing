import ConfirmDelete from '@/components/ConfirmDelete';
import { MEAL_PLAN_LABEL, SIDE_LABEL } from '@/constants/rsvp';
import { listRsvps } from '@/lib/repository/rsvp';
import { formatDateTime } from '@/utils/weddingDate';
import { deleteRsvp } from '@/app/admin/(console)/actions';
import type { Side } from '@/constants/rsvp';
import type { RsvpResponse } from '@/types/domain';
import styles from './RsvpList.module.scss';

function RsvpCard({ response }: { response: RsvpResponse }) {
  return (
    <li className={`${styles['rsvp-list__card']} ${response.attending ? '' : styles['rsvp-list__card--declined']}`}>
      <div className={styles['rsvp-list__header']}>
        <span className={styles['rsvp-list__side']}>{SIDE_LABEL[response.side]}</span>
        <p className={styles['rsvp-list__name']}>{response.name}</p>
        <span className={styles['rsvp-list__status']}>{response.attending ? `참석 ${response.headcount}명` : '불참'}</span>
        <ConfirmDelete id={response.id} itemName={`${response.name}님의 응답`} action={deleteRsvp} />
      </div>
      <p className={styles['rsvp-list__meta']}>
        {response.meal && <span>식사 {MEAL_PLAN_LABEL[response.meal]}</span>}
        <time dateTime={response.createdAt}>{formatDateTime(new Date(response.createdAt))}</time>
      </p>
      {response.message && <p className={styles['rsvp-list__message']}>{response.message}</p>}
    </li>
  );
}

// 참석 의사 목록 컨테이너. side 가 있으면 그쪽 응답만 보인다.
export default async function RsvpList({ side }: { side: Side | null }) {
  const responses = await listRsvps();
  const visible = side ? responses.filter((response) => response.side === side) : responses;

  if (visible.length === 0) return <p className={styles['rsvp-list__empty']}>아직 받은 응답이 없습니다.</p>;

  return (
    <ul className={styles['rsvp-list']}>
      {visible.map((response) => (
        <RsvpCard key={response.id} response={response} />
      ))}
    </ul>
  );
}
