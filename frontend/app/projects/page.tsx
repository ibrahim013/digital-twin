import { ArrowRight } from 'lucide-react';
import { projects as projectList } from '@/lib/portfolio-content';

export default function ProjectsPage() {
  return (
    <main className="relative pt-28 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <section className="mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
          Selected Work
        </h1>
        <p className="font-body text-text-muted max-w-2xl">
          Production systems across AI automation, property tech, talent platforms,
          and agentic workflows.
        </p>
      </section>

      <div className="flex flex-wrap gap-3 mb-10">
        {['All Projects', 'Design', 'Development'].map((filter, i) => (
          <span
            key={filter}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border ${
              i === 0
                ? 'bg-primary-container/10 text-primary-container border-primary-container/30'
                : 'bg-surface-container text-text-muted border-border-subtle'
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectList.map((project) => (
          <article
            key={project.title}
            className="glass-card rounded-xl p-6 sm:p-8 flex flex-col group"
          >
            <span className="font-mono text-[10px] text-brand-teal uppercase tracking-widest mb-3">
              {project.category}
            </span>
            <h2 className="font-headline text-xl font-semibold text-on-surface mb-3 group-hover:text-primary-container transition-colors">
              {project.title}
            </h2>
            <p className="text-text-muted text-sm leading-relaxed flex-grow mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-surface-container rounded font-mono text-[10px] text-text-muted border border-border-subtle uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              type="button"
              className="flex items-center gap-2 font-mono text-sm text-primary-container uppercase tracking-wider group-hover:gap-3 transition-all"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
