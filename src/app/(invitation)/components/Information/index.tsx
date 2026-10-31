import { INFORMATION } from '@/constants/guide';
import InfoTabs from '../InfoTabs';
import Section from '../Section';
import VenueMap from '../VenueMap';
import styles from './Information.module.scss';

// 예식정보 및 안내 사항 — 식사 · 주차(주차장 강조 약도) · 예식장 탭
export default function Information() {
  return (
    <Section id="information" eyebrow="INFORMATION" title="예식정보 및 안내 사항" className={styles.information}>
      <InfoTabs tabs={INFORMATION} figures={{ parking: <VenueMap highlight="parking" /> }} />
    </Section>
  );
}
