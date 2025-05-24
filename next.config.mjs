/** @type {import('next').NextConfig} */

const isLocalOrTest =
  process.env.NODE_ENV !== 'production' ||
  process.env.NEXT_PUBLIC_ENV === 'test';
const supabaseProject = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: http://127.0.0.1:54321 https://${supabaseProject}.supabase.co`,
  `connect-src 'self' https://${supabaseProject}.supabase.co wss://${supabaseProject}.supabase.co`,
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
];

if (isLocalOrTest) {
  cspDirectives[4] += ' http://127.0.0.1:54321 ws://127.0.0.1:54321';
}

const cspHeader = cspDirectives.join('; ');

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
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
        hostname: `${supabaseProject}.supabase.co`,
        pathname: '/storage/v1/object/public/avatars/**',
      },
    ],
  },
};

export default nextConfig;
