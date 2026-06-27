'use client';

import { useState } from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import ContactThankYou from '@/components/contact-thank-you';
import { site } from '@/lib/portfolio-content';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const detail = data?.detail;
        const detailMessage =
          typeof detail === 'string'
            ? detail
            : Array.isArray(detail)
              ? detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(', ')
              : null;
        throw new Error(
          detailMessage || 'Failed to send message. Please try again or email directly.'
        );
      }

      setSubmittedName(String(formData.get('name') ?? ''));
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please try again or email directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative pt-28 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <section>
          <p className="font-mono text-sm text-brand-teal uppercase tracking-widest mb-4">
            Initialize Contact
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-on-surface leading-tight mb-8">
            Let&apos;s build something{' '}
            <span className="text-gradient">extraordinary.</span>
          </h1>

          {submitted ? (
            <ContactThankYou
              name={submittedName}
              onSendAnother={() => {
                setSubmitted(false);
                setSubmittedName('');
                setError(null);
              }}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="glass-card rounded-xl p-4 border border-red-500/30 bg-red-500/10">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-surface-container border border-border-subtle focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface py-3 px-4 rounded-lg font-body text-sm outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-surface-container border border-border-subtle focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface py-3 px-4 rounded-lg font-body text-sm outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-surface-container border border-border-subtle focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface py-3 px-4 rounded-lg font-body text-sm outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-surface-container border border-border-subtle focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface py-3 px-4 rounded-lg font-body text-sm outline-none transition-colors resize-y disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-primary-container/10 text-primary-container hover:bg-primary-container/20 border border-primary-container/30 px-8 py-3 rounded font-mono text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </section>

        <section className="space-y-8">
          <div className="glass-card rounded-xl p-8">
            <h2 className="font-headline text-xl font-semibold text-on-surface mb-6">
              Direct Contact
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-on-surface hover:text-primary-container transition-colors"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-on-surface">{site.location}</p>
                  <p className="text-text-muted text-sm">Remote Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8">
            <h2 className="font-headline text-xl font-semibold text-on-surface mb-6">
              Social Profiles
            </h2>
            <div className="space-y-3">
              {[
                { label: 'LinkedIn', href: site.linkedin },
                { label: 'GitHub', href: site.github },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0 text-on-surface hover:text-primary-container transition-colors group"
                >
                  <span className="font-mono text-sm uppercase tracking-wider">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-container group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
