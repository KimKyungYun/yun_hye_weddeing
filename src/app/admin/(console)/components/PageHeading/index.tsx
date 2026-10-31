import styles from './PageHeading.module.scss';
import type { ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  description?: ReactNode;
  as?: 'h1' | 'h2';
}

export default function PageHeading({ title, description, as: Heading = 'h1' }: PageHeadingProps) {
  return (
    <div className={`${styles.heading} ${Heading === 'h2' ? styles['heading--section'] : ''}`}>
      <Heading className={styles.heading__title}>{title}</Heading>
      {description && <p className={styles.heading__description}>{description}</p>}
    </div>
  );
}
