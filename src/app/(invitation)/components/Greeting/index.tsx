import { BRIDE, GREETING, GROOM } from '@/constants/wedding';
import type { Person } from '@/types/domain';
import Section from '../Section';
import styles from './Greeting.module.scss';

// "임미옥 의 아들 경윤" — 레퍼런스처럼 "의 아들"만 작고 옅게. 고인이 된 부모는 이름을 싣지 않는다.
function ParentRow({ person, relation }: { person: Person; relation: '아들' | '딸' }) {
  const parents = [
    person.fatherDeceased ? null : person.father,
    person.motherDeceased ? null : person.mother,
  ].filter(Boolean).join(' · ');

  return (
    <p className={styles.greeting__row}>
      <span className={styles.greeting__parents}>{parents}</span>
      <span className={styles.greeting__relation}>의 {relation}</span>
      <span className={styles.greeting__child}>{person.firstName}</span>
    </p>
  );
}

export default function Greeting() {
  return (
    <Section id="greeting" eyebrow="INVITATION" title={GREETING.title} className={styles.greeting}>
      <p className={styles.greeting__text} data-reveal="">
        {GREETING.content}
      </p>
      <div className={styles.greeting__family} data-reveal="">
        <ParentRow person={GROOM} relation="아들" />
        <ParentRow person={BRIDE} relation="딸" />
      </div>
    </Section>
  );
}
