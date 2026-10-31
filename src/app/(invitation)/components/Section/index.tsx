import styles from './Section.module.scss';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  // 제목 위 작은 영문 머리말 (INVITATION · LOCATION ...)
  eyebrow?: string;
  // 섹션마다 다른 바탕(그라데이션)을 붙인다
  className?: string;
  children: ReactNode;
}

// 청첩장 섹션 골격: 가운데 정렬 안쪽 폭 + 머리말·제목
export default function Section({ id, title, eyebrow, className, children }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className ?? ''}`} aria-labelledby={`${id}-title`}>
      <div className={styles.section__inner}>
        <div className={styles.section__heading} data-reveal="">
          {eyebrow && <p className={styles.section__eyebrow}>{eyebrow}</p>}
          <h2 id={`${id}-title`} className={styles.section__title}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
