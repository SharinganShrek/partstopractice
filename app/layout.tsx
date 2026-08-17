import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'FIRST Parts to Practice',
  description:
    'IMC#4191 and Khan Academy Türkiye: introductory FRC and FIRST lessons, videos and interactive quizzes.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
