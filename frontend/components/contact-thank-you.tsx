import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';
import { site } from '@/lib/portfolio-content';

interface ContactThankYouProps {
  name?: string;
  onSendAnother?: () => void;
}

export default function ContactThankYou({ name, onSendAnother }: ContactThankYouProps) {
  const greeting = name?.trim() ? `Thank you, ${name.trim()}.` : 'Thank you.';

  return (
    <div className="glass-card rounded-xl p-8 sm:p-10 border border-primary-container/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-secondary" />
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary-container/10 border border-primary-container/30 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary-container" />
          </div>
          <div>
            <p className="font-mono text-primary-container uppercase tracking-wider text-sm">
              Message Sent
            </p>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">
              Transmission Complete
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">
            {greeting}
          </h2>
          <p className="text-text-muted leading-relaxed">
            Your message has been received. I&apos;ll get back to you as soon as possible.
            For urgent inquiries, you can also reach me directly at{' '}
            <a
              href={`mailto:${site.email}`}
              className="text-primary-container hover:underline inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-container/10 text-primary-container hover:bg-primary-container/20 border border-primary-container/30 px-6 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-all"
          >
            Back to Home
          </Link>
          {onSendAnother && (
            <button
              type="button"
              onClick={onSendAnother}
              className="inline-flex items-center gap-2 text-text-muted hover:text-on-surface border border-border-subtle hover:border-primary-container/30 px-6 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-all"
            >
              Send Another Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
