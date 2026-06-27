import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/google-analytics';
import JsonLd from '@/components/json-ld';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { createPageMetadata, defaultDescription, defaultTitle } from '@/lib/seo';

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = createPageMetadata({
  title: defaultTitle,
  description: defaultDescription,
  path: '/',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <JsonLd />
        <GoogleAnalytics />
        <div className="grid-bg" />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
