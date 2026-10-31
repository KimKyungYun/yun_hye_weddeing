import { BRIDE, GROOM } from '@/constants/wedding';
import { GALLERY_PHOTOS } from '@/generated/gallery';
import PhotoGrid from '../PhotoGrid';
import Section from '../Section';
import styles from './Gallery.module.scss';

// 사진은 src/assets/gallery 폴더에서 자동으로 모은다(scripts/generate-gallery.mjs). 한 장도 없으면 섹션째 숨긴다.
export default function Gallery() {
  if (GALLERY_PHOTOS.length === 0) return null;

  return (
    <Section id="gallery" eyebrow="GALLERY" title={`${GROOM.nameEn} & ${BRIDE.nameEn}`} className={styles.gallery}>
      <PhotoGrid photos={GALLERY_PHOTOS} label="갤러리 사진" />
    </Section>
  );
}
