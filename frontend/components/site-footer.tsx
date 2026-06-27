import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { site } from '@/lib/portfolio-content';

export default function SiteFooter() {
  return (
    <footer className="w-full bg-surface border-t border-border-subtle mt-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto gap-6">
        <div className="flex items-center gap-6">
          <div className="font-headline text-xl text-on-surface flex items-center gap-2">
            <Terminal className="text-primary-container w-5 h-5" />
            {site.name}
          </div>
          <div className="h-4 w-px bg-border-subtle hidden md:block" />
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            System Build © 2024
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 font-mono text-[11px] uppercase tracking-wider">
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary-container transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary-container transition-colors"
          >
            GitHub
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-text-muted hover:text-primary-container transition-colors"
          >
            Email
          </a>
        </nav>
      </div>
      <p className="text-center font-mono text-[10px] text-text-muted uppercase tracking-widest pb-6">
        © 2024 Ibrahim Abdulazeez. All rights reserved.
      </p>
    </footer>
  );
}
