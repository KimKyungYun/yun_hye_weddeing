import styles from './LeafDivider.module.scss';

interface LeafDividerProps {
  // wave: 물결 위 잎 하나 · line: 가는 선 사이 잎 하나
  variant: 'wave' | 'line';
}

// 섹션 사이 잎사귀 구분선
export default function LeafDivider({ variant }: LeafDividerProps) {
  return (
    <div className={`${styles['leaf-divider']} ${styles[`leaf-divider--${variant}`]}`} aria-hidden="true">
      {variant === 'wave' ? (
        <svg className={styles['leaf-divider__art']} viewBox="0 0 200 30" preserveAspectRatio="none">
          <path d="M80 15 Q90 5 100 15 Q110 25 120 15" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M92 12 C96 6 104 6 108 12 C104 9 96 9 92 12z" fill="var(--accent)" opacity="0.3" />
        </svg>
      ) : (
        <svg className={styles['leaf-divider__art']} viewBox="0 0 200 20" preserveAspectRatio="none">
          <line x1="40" y1="10" x2="85" y2="10" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" />
          <path d="M90 10 C95 4 105 4 110 10 C105 7 95 7 90 10z" fill="var(--accent)" opacity="0.4" />
          <line x1="115" y1="10" x2="160" y2="10" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" />
        </svg>
      )}
    </div>
  );
}
