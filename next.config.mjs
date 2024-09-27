/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net', // 수정된 부분
        port: '', // 기본 포트이므로 비워둡니다.
        pathname: '/**', // 모든 경로를 허용
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net', // 추가된 부분
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ];
  },
};

export default nextConfig;
