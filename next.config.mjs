/** @type {import('next').NextConfig} */
const nextConfig = {
    //redirects를 적용
    async redirects() {
        return [
          {
            source: '/',
            destination: '/main',
            permanent: true, //캐쉬여부로 true를 하면 캐쉬에서 저장해서 리다이랙트 진행
          },
        ]
      },
  }
  
export default nextConfig;
