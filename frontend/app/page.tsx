import Link from 'next/link';
import { Activity, ArrowRight, GitBranch, Rocket } from 'lucide-react';
import Twin from '@/components/twin';
import {
  coreStack,
  recentDeployments,
  site,
} from '@/lib/portfolio-content';

export default function Home() {
  return (
    <main className="relative pt-28 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left: Dashboard modules */}
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <div className="glass-panel p-6 rounded-xl border border-border-subtle relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-secondary" />
            <h1 className="font-headline text-2xl sm:text-3xl text-on-surface leading-tight mb-2">
              Senior Software Engineer &amp; <br />
              <span className="text-gradient">AI Engineer</span>
            </h1>
            <p className="font-mono text-sm text-text-muted uppercase tracking-wide">
              {site.tagline}
            </p>
          </div>

          <div className="glass-panel p-5 rounded-xl border-l-4 border-l-green-500 hover:bg-surface-container-low/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-sm text-on-surface uppercase tracking-wide flex items-center gap-2">
                <Activity className="text-green-500 w-4 h-4" />
                Live Metrics
              </h3>
              <span className="text-[10px] font-mono uppercase text-text-muted bg-surface-container px-2 py-1 rounded">
                Real-time
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-text-muted uppercase text-[10px] mb-1">
                  Uptime
                </div>
                <div className="font-mono text-green-400">99.99%</div>
              </div>
              <div>
                <div className="font-mono text-text-muted uppercase text-[10px] mb-1">
                  Sync Status
                </div>
                <div className="font-mono text-primary-container">OPTIMAL</div>
              </div>
              <div>
                <div className="font-mono text-text-muted uppercase text-[10px] mb-1">
                  Data Index
                </div>
                <div className="font-mono text-on-surface text-sm">
                  Vector DB connected
                </div>
              </div>
              <div>
                <div className="font-mono text-text-muted uppercase text-[10px] mb-1">
                  Context
                </div>
                <div className="font-mono text-on-surface text-sm">
                  Resume loaded
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl">
            <div className="flex items-center gap-3 mb-4 border-b border-border-subtle pb-3">
              <GitBranch className="text-primary-container w-5 h-5" />
              <h3 className="font-mono text-sm text-on-surface uppercase tracking-wide">
                Core Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {coreStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-surface-container rounded font-mono text-[11px] text-primary-container border border-border-subtle uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl" id="deployments">
            <div className="flex items-center gap-3 mb-4 border-b border-border-subtle pb-3">
              <Rocket className="text-primary-container w-5 h-5" />
              <h3 className="font-mono text-sm text-on-surface uppercase tracking-wide">
                Recent Deployments
              </h3>
            </div>
            <div className="space-y-4">
              {recentDeployments.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-mono text-on-surface group-hover:text-primary-container transition-colors text-[13px]">
                      {item.title}
                    </h4>
                    <ArrowRight className="text-text-muted w-4 h-4 group-hover:text-primary-container group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  <p className="font-mono text-text-muted text-[11px] leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Digital Twin command center */}
        <div className="lg:col-span-8 order-1 lg:order-2 h-full" id="logs">
          <Twin />
        </div>
      </div>
    </main>
  );
}
