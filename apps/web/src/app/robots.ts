import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login', // src/app/(auth)/login
        '/register', // src/app/(auth)/register
        '/forgot-password', // src/app/(auth)/forgot-password
        '/reset-password', // src/app/(auth)/reset-password
        '/dashboard', // src/app/(private)/dashboard
        '/group', // src/app/(private)/group
        '/history', // src/app/(private)/history
        '/information', // src/app/(private)/information
        '/join', // src/app/(private)/join
        '/settings', // src/app/(private)/settings
        '/todos', // src/app/(private)/todos
      ],
    },
  };
}
