'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/lib/portfolio-content';

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-border-subtle">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link
          href="/"
          className="font-headline text-xl font-bold text-on-surface hover:text-primary-container transition-colors uppercase tracking-wide"
        >
          Ibrahim Abdulazeez
        </Link>

        <nav className="hidden md:flex gap-6 font-mono text-sm uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? 'text-primary-container border-b-2 border-primary-container pb-1 px-3 py-2'
                  : 'text-on-surface-variant hover:text-primary-container transition-colors hover:bg-surface-container-high/50 px-3 py-2 rounded'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:block bg-primary-container/10 text-primary-container hover:bg-primary-container/20 border border-primary-container/30 px-6 py-2 rounded transition-all duration-300 text-sm font-mono uppercase tracking-wider"
        >
          Let&apos;s Talk
        </Link>

        <button
          type="button"
          className="md:hidden text-on-surface p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border-subtle bg-surface/95 backdrop-blur-xl px-margin-mobile py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={
                isActive(item.href)
                  ? 'text-primary-container font-mono text-sm uppercase tracking-wider py-2'
                  : 'text-on-surface-variant font-mono text-sm uppercase tracking-wider py-2'
              }
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center bg-primary-container/10 text-primary-container border border-primary-container/30 px-6 py-2 rounded font-mono text-sm uppercase"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      )}
    </header>
  );
}
