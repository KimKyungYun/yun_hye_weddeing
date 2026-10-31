// 청첩장 사진. 파일을 static import 해야 next/image 가 크기·흐린 미리보기를 알고 최적화한다.
// 갤러리 사진은 여기가 아니라 src/assets/gallery 폴더에 넣는다(scripts/generate-gallery.mjs).
// 카카오톡 등 링크 미리보기 사진은 src/app/opengraph-image.jpg 로 따로 둔다.

import closing from '@/assets/images/closing.jpg';
import hero from '@/assets/images/hero.jpg';
import type { StaticImageData } from 'next/image';

// 첫 화면 배너 (손글씨 인트로가 이 위에 그려진다). 이름표·화살표 위치가 이 사진 기준이라
// 사진을 바꾸면 Intro 의 좌표도 함께 맞춘다.
export const HERO_PHOTO: StaticImageData = hero;

// 맨 아래 마무리 사진
export const CLOSING_PHOTO: StaticImageData = closing;
