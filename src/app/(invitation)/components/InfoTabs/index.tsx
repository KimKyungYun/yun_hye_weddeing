'use client';

import { useId, useRef, useState } from 'react';
import type { InformationKey, InformationTab } from '@/constants/guide';
import styles from './InfoTabs.module.scss';
import type { KeyboardEvent, ReactNode } from 'react';

interface InfoTabsProps {
  tabs: InformationTab[];
  // 탭 문구 아래에 붙일 그림 (주차안내의 약도). 서버에서 그려 넘긴다.
  figures?: Partial<Record<InformationKey, ReactNode>>;
}

function TabPanel({ tab, figure, panelId, tabId, isActive }: {
  tab: InformationTab;
  figure?: ReactNode;
  panelId: string;
  tabId: string;
  isActive: boolean;
}) {
  return (
    <div id={panelId} className={styles['info-tabs__panel']} role="tabpanel" aria-labelledby={tabId} hidden={!isActive}>
      {tab.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles['info-tabs__text']}>
          {paragraph}
        </p>
      ))}
      {figure && <div className={styles['info-tabs__figure']}>{figure}</div>}
    </div>
  );
}

// 레퍼런스처럼 카드 위쪽에 탭이 붙은 안내판. 좌우 화살표 키로도 탭을 옮긴다.
export default function InfoTabs({ tabs, figures = {} }: InfoTabsProps) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const index = tabs.findIndex((tab) => tab.key === activeKey);
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActiveKey(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={styles['info-tabs']} data-reveal="">
      <div className={styles['info-tabs__list']} role="tablist" aria-label="안내 사항" onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${baseId}-tab-${tab.key}`}
            type="button"
            role="tab"
            className={`${styles['info-tabs__tab']} ${tab.key === activeKey ? styles['info-tabs__tab--active'] : ''}`}
            aria-selected={tab.key === activeKey}
            aria-controls={`${baseId}-panel-${tab.key}`}
            tabIndex={tab.key === activeKey ? 0 : -1}
            onClick={() => setActiveKey(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <TabPanel
          key={tab.key}
          tab={tab}
          figure={figures[tab.key]}
          panelId={`${baseId}-panel-${tab.key}`}
          tabId={`${baseId}-tab-${tab.key}`}
          isActive={tab.key === activeKey}
        />
      ))}
    </div>
  );
}
