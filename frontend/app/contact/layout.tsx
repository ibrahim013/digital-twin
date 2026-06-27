import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact — Ibrahim Abdulazeez',
  description:
    'Get in touch with Ibrahim Abdulazeez for collaborations, consulting, or opportunities. Senior Software Engineer & AI Engineer based in Lagos, Nigeria.',
  path: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
