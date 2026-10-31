// src/assets/gallery 의 사진을 static import 목록(src/generated/gallery.ts)으로 만든다.
//
// 사진을 바꿀 때는 그 폴더에 파일만 넣거나 빼면 된다. 화면 순서는 파일명 순(숫자는 크기순: 2 < 10)이다.
// dev · build · 설치(postinstall) 때 자동으로 돈다. 개발 중에 사진을 넣었으면 개발 서버를 다시 켠다.
// static import 라 next/image 가 사진 크기와 흐린 미리보기를 알고 최적화한다.

import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'src/assets/gallery');
const OUTPUT_FILE = path.join(ROOT, 'src/generated/gallery.ts');
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

const collator = new Intl.Collator('ko', { numeric: true, sensitivity: 'base' });
const files = readdirSync(SOURCE_DIR).filter((file) => IMAGE_FILE.test(file)).sort(collator.compare);

const names = files.map((_, index) => `photo${index + 1}`);
const source = [
  '// 자동 생성 파일 — 직접 고치지 않는다. scripts/generate-gallery.mjs 가 src/assets/gallery 를 읽어 만든다.',
  '',
  ...files.map((file, index) => `import ${names[index]} from ${JSON.stringify(`@/assets/gallery/${file}`)};`),
  "import type { StaticImageData } from 'next/image';",
  '',
  `export const GALLERY_PHOTOS: StaticImageData[] = [${names.join(', ')}];`,
  '',
].join('\n');

mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
writeFileSync(OUTPUT_FILE, source);
console.log(`갤러리 사진 ${files.length}장을 src/generated/gallery.ts 에 담았습니다.`);
