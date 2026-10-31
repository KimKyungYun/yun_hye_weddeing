import { TRANSPORT } from '@/constants/guide';
import { WEDDING } from '@/constants/wedding';
import type { TransportGuide, TransportKind } from '@/constants/guide';
import AddressCopy from '../AddressCopy';
import { BusGlyph, CarGlyph, TrainGlyph } from '../Icons';
import KakaoMap from '../KakaoMap';
import MapLinks from '../MapLinks';
import Section from '../Section';
import VenueMap from '../VenueMap';
import styles from './Location.module.scss';
import type { ReactNode } from 'react';

const TRANSPORT_ICON: Record<TransportKind, ReactNode> = {
  bus: <BusGlyph />,
  train: <TrainGlyph />,
  car: <CarGlyph />,
};

function TransportItem({ guide }: { guide: TransportGuide }) {
  return (
    <li className={styles.location__transport} data-reveal="">
      <span className={styles.location__icon} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
