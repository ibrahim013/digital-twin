import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownMessageProps {
  content: string;
}

const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-on-surface">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-on-surface">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-container hover:underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-2 pl-4 list-disc space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 pl-4 list-decimal space-y-1">{children}</ol>
  ),
  li: ({ children }) => <li className="text-on-surface">{children}</li>,
  h1: ({ children }) => (
    <h1 className="font-headline text-lg font-bold text-on-surface mb-2 mt-3 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-headline text-base font-bold text-on-surface mb-2 mt-3 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-headline text-sm font-semibold text-on-surface mb-1 mt-2 first:mt-0">
      {children}
    </h3>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-brand-teal pl-3 my-2 text-text-muted italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-border-subtle" />,
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto">
      <table className="w-full text-xs border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border-subtle">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-border-subtle/50">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-2 py-1 text-left font-semibold text-on-surface">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1 text-text-muted">{children}</td>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className={`${className ?? ''} font-mono text-xs`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-surface-container px-1.5 py-0.5 rounded text-primary-container font-mono text-xs"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surface-deep border border-border-subtle rounded-lg p-3 overflow-x-auto my-2 font-mono text-xs">
      {children}
    </pre>
  ),
};

export default function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <div className="chat-markdown text-on-surface text-sm leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
