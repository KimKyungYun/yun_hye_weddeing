import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SCSS 에서 "styles/..." 로 토큰을 가져오기 위한 로드 경로. sass 는 tsconfig paths 를 모른다.
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src')],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    // 웨딩 사진은 이미 압축된 JPEG 라 75 로 한 번 더 누르면 피부결이 뭉개진다. 첫 화면 사진에 90 을 허용한다.
    qualities: [75, 90],
  },

  async headers() {
    // 관리자 화면은 어떤 경로로 들어와도 색인되지 않게 한다. robots.txt 에는 적지 않는다(경로가 드러난다).
    return [
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },

  poweredByHeader: false,
  devIndicators: { position: 'bottom-right' },
};

export default nextConfig;
