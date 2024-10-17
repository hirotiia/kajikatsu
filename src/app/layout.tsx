import { zen_maru_gothic } from '@/font/font';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zen_maru_gothic.className}`}>
      <body>{children}</body>
    </html>
  );
}
