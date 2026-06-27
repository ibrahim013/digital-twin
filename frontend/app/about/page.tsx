import type { Metadata } from 'next';
import Link from 'next/link';
import {
  certifications,
  education,
  experience,
  site,
  skills,
} from '@/lib/portfolio-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About — Ibrahim Abdulazeez',
  description:
    'Learn about Ibrahim Abdulazeez — 8+ years building AI-driven products, scalable frontend architecture, LLM workflows, and cloud infrastructure. Experience at TalentUp Africa, Modus Create, and Andela.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="relative pt-28 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <section className="mb-16">
        <p className="font-mono text-sm text-brand-teal uppercase tracking-widest mb-4">
          {site.specialties.join(' • ')}
        </p>
        <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight tracking-tight mb-6">
          {site.aboutHero}
        </h1>
        <p className="font-body text-lg text-text-muted max-w-3xl leading-relaxed">
          {site.aboutIntro}
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-brand-teal" />
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="glass-card rounded-xl p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="font-headline text-xl font-semibold text-on-surface">
                    {job.role}
                  </h3>
                  <p className="font-mono text-sm text-brand-teal uppercase tracking-wide">
                    {job.company}
                  </p>
                </div>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-2">
                {job.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-text-muted text-sm leading-relaxed flex gap-2"
                  >
                    <span className="text-brand-teal shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-brand-teal" />
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass-card rounded-xl p-6">
              <h3 className="font-headline text-lg font-semibold text-on-surface mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-xs text-text-muted uppercase tracking-wide flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-brand-teal" />
          Education
        </h2>
        <div className="glass-card rounded-xl p-6 sm:p-8">
          {education.map((edu) => (
            <div key={edu.institution}>
              <h3 className="font-headline text-lg font-semibold text-on-surface">
                {edu.degree}
              </h3>
              <p className="font-mono text-sm text-text-muted mt-1">
                {edu.institution} • {edu.year}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-brand-teal" />
          Certifications
        </h2>
        <div className="flex flex-wrap gap-3">
          {certifications.map((cert) => (
            <span
              key={cert}
              className="px-4 py-2 bg-surface-container rounded font-mono text-xs text-primary-container border border-border-subtle uppercase tracking-wide"
            >
              {cert}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="inline-block bg-primary-container/10 text-primary-container hover:bg-primary-container/20 border border-primary-container/30 px-8 py-3 rounded font-mono text-sm uppercase tracking-wider transition-all"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </main>
  );
}
