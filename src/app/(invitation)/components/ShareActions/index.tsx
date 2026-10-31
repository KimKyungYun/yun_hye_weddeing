'use client';

import Script from 'next/script';
import { useState } from 'react';
import { KAKAO_JS_KEY, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/constants/site';
import { copyText } from '../../utils/clipboard';
import { KakaoTalkIcon, LinkIcon } from '../Icons';
import { useToast } from '../ToastProvider';
import styles from './ShareActions.module.scss';

// 카카오 JavaScript SDK (버전 고정 + 무결성 해시)
const KAKAO_SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
const KAKAO_SDK_INTEGRITY = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';

interface KakaoSdk {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share: { sendDefault: (options: Record<string, unknown>) => void };
}

const getKakao = () => (window as Window & { Kakao?: KakaoSdk }).Kakao;

// 공유 주소는 지금 보고 있는 주소(해시 제외)
const currentUrl = () => window.location.href.split('#')[0];

export default function ShareActions() {
  const showToast = useToast();
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  const initKakao = () => {
    const kakao = getKakao();
    if (!kakao) return;
    if (!kakao.isInitialized()) kakao.init(KAKAO_JS_KEY);
    setIsKakaoReady(true);
  };

  const copyLink = async () => {
    showToast((await copyText(currentUrl())) ? '링크 주소가 복사되었습니다' : '복사에 실패했습니다');
  };

  const shareToKakao = async () => {
    const kakao = getKakao();
    const url = currentUrl();
    if (isKakaoReady && kakao) {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: SITE_TITLE,
          description: SITE_DESCRIPTION,
          imageUrl: `${SITE_URL}/opengraph-image.jpg`,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [{ title: '청첩장 보기', link: { mobileWebUrl: url, webUrl: url } }],
      });
      return;
    }
    // 카카오 키가 없으면 기기 공유창(휴대폰)으로, 그것도 없으면 링크 복사로 대신한다
    if (navigator.share) {
      try {
        await navigator.share({ title: SITE_TITLE, text: SITE_DESCRIPTION, url });
      } catch {
        // 사용자가 공유창을 닫은 경우 — 할 일 없음
      }
      return;
    }
    await copyLink();
  };

  return (
    <div className={styles.share}>
      {KAKAO_JS_KEY && (
        <Script src={KAKAO_SDK_SRC} integrity={KAKAO_SDK_INTEGRITY} crossOrigin="anonymous" strategy="lazyOnload" onLoad={initKakao} />
      )}
      <button type="button" className={styles.share__button} onClick={shareToKakao}>
        <span className={`${styles.share__badge} ${styles['share__badge--kakao']}`}>
          <KakaoTalkIcon size={16} />
        </span>
        카카오톡 공유하기
      </button>
      <button type="button" className={styles.share__button} onClick={copyLink}>
        <span className={styles.share__badge}>
          <LinkIcon size={14} />
        </span>
        링크주소 복사하기
      </button>
    </div>
  );
}
