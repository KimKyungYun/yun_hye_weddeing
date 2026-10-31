'use client';

import { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, useKakaoLoader, ZoomControl } from 'react-kakao-maps-sdk';
import { MAP_LINKS } from '@/constants/guide';
import { KAKAO_JS_KEY } from '@/constants/site';
import { VENUE_GEO, WEDDING } from '@/constants/wedding';
import styles from './KakaoMap.module.scss';

// 라이브러리 기본값은 프로토콜 상대 주소(//dapi.kakao.com)라 로컬(http)에서는 http 로 받는다. 항상 https 로 받는다.
const KAKAO_MAP_SDK_URL = 'https://dapi.kakao.com/v2/maps/sdk.js';

const KAKAO_PLACE_URL = MAP_LINKS.find((link) => link.key === 'kakao')?.href;

function MapFallback() {
  return (
    <div className={styles['kakao-map__fallback']}>
      <p>지도를 불러오지 못했습니다.</p>
      {KAKAO_PLACE_URL && (
        <a href={KAKAO_PLACE_URL} target="_blank" rel="noopener noreferrer">
          카카오맵에서 보기
        </a>
      )}
    </div>
  );
}

function MapCanvas() {
  const [isLoading, error] = useKakaoLoader({ appkey: KAKAO_JS_KEY, url: KAKAO_MAP_SDK_URL });

  if (error) return <MapFallback />;
  if (isLoading) return <div className={styles['kakao-map__loading']} aria-hidden="true" />;

  // 휴대폰에서 지도를 밀다가 페이지 스크롤이 막히지 않게 끌기·휠 확대를 끄고, 확대 버튼만 둔다
  return (
    <Map center={VENUE_GEO} level={3} draggable={false} zoomable={false} className={styles['kakao-map__canvas']}>
      <ZoomControl position="RIGHT" />
      <MapMarker position={VENUE_GEO} title={WEDDING.venue} />
      <CustomOverlayMap position={VENUE_GEO} yAnchor={2.6}>
        <span className={styles['kakao-map__label']}>씨엘드포레</span>
      </CustomOverlayMap>
    </Map>
  );
}

// 오시는 길의 카카오 지도. SDK 가 무거워 지도가 화면 근처에 왔을 때만 불러온다.
// 키가 없으면 아무것도 그리지 않는다 (아래 약도가 대신한다).
export default function KakaoMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !KAKAO_JS_KEY) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin: '300px' },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!KAKAO_JS_KEY) return null;

  return (
    <div ref={ref} className={styles['kakao-map']} role="region" aria-label={`${WEDDING.venue} 위치 지도`} data-reveal="zoom">
      {isNear && <MapCanvas />}
    </div>
  );
}
