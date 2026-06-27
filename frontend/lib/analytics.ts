import { sendGAEvent } from '@next/third-parties/google';
import { gaId } from '@/lib/seo';

type ChatEventParams = {
  session_id?: string;
  message_length?: number;
  response_length?: number;
  is_new_session?: boolean;
};

export function trackChatEvent(
  action: 'session_started' | 'message_sent' | 'response_received' | 'error',
  params?: ChatEventParams
) {
  if (!gaId) return;

  sendGAEvent('event', `chat_${action}`, {
    event_category: 'digital_twin',
    ...params,
  });
}
