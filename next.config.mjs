/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '/storage/v1/object/public/avatars/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`,
        pathname: '/storage/v1/object/public/avatars/**',
      },
    ],
  },
};

export default nextConfig;
