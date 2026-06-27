import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { gaId } from '@/lib/seo';

export default function GoogleAnalytics() {
  if (!gaId) return null;

  return <NextGoogleAnalytics gaId={gaId} />;
}
