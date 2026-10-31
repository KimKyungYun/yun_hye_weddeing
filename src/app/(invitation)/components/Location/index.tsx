import { TRANSPORT } from '@/constants/guide';
import { WEDDING } from '@/constants/wedding';
import type { TransportGuide, TransportKind } from '@/constants/guide';
import AddressCopy from '../AddressCopy';
import KakaoMap from '../KakaoMap';
import MapLinks from '../MapLinks';
import Section from '../Section';
import VenueMap from '../VenueMap';
import styles from './Location.module.scss';
import type { ReactNode } from 'react';

const TRANSPORT_ICON: Record<TransportKind, ReactNode> = {
  bus: (
    <>
      <rect x="5" y="3" width="14" height="15" rx="3" />
      <path d="M5 11h14M8 18v2M16 18v2M8 6h8" />
      <circle cx="8.5" cy="14.5" r="0.8" />
      <circle cx="15.5" cy="14.5" r="0.8" />
    </>
  ),
  train: (
    <>
      <rect x="6" y="3" width="12" height="14" rx="3" />
      <path d="M6 10h12M9 20l-2 2M15 20l2 2M9 17l-1 3M15 17l1 3" />
      <circle cx="9.5" cy="13.5" r="0.8" />
      <circle cx="14.5" cy="13.5" r="0.8" />
    </>
  ),
  car: (
    <>
      <path d="M4 15v-3l2-5h12l2 5v3a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
      <path d="M4 12h16M7 16v2M17 16v2" />
      <circle cx="7.5" cy="13.5" r="0.8" />
      <circle cx="16.5" cy="13.5" r="0.8" />
    </>
  ),
};

function TransportItem({ guide }: { guide: TransportGuide }) {
  return (
    <li className={styles.location__transport} data-reveal="">
      <span className={styles.location__icon} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {TRANSPORT_ICON[guide.kind]}
        </svg>
      </span>
      <div className={styles.location__guide}>
        <h3 className={styles['location__guide-title']}>{guide.title}</h3>
        {guide.items.map((item) => (
          <p key={item.label} className={styles['location__guide-text']}>
            <strong>[{item.label}]</strong> {item.text}
          </p>
        ))}
      </div>
    </li>
  );
}

export default function Location() {
  return (
    <Section id="location" eyebrow="LOCATION" title="오시는 길" className={styles.location}>
      <div className={styles.location__info} data-reveal="">
        <p className={styles.location__venue}>{WEDDING.venue}</p>
        <p className={styles.location__address}>{WEDDING.address}</p>
      </div>
      <AddressCopy address={WEDDING.address} />
      <KakaoMap />
      <MapLinks />
      <div className={styles.location__map} data-reveal="zoom">
        <VenueMap />
      </div>
      <ul className={styles.location__transports}>
        {TRANSPORT.map((guide) => (
          <TransportItem key={guide.kind} guide={guide} />
        ))}
      </ul>
    </Section>
  );
}
