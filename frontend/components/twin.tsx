'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Cpu, User, Settings, Terminal } from 'lucide-react';
import MarkdownMessage from '@/components/markdown-message';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Twin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetch('/avatar.png', { method: 'HEAD' })
      .then((res) => setHasAvatar(res.ok))
      .catch(() => setHasAvatar(false));
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage.content,
            session_id: sessionId || undefined,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      if (!sessionId) {
        setSessionId(data.session_id);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    return date.toLocaleTimeString();
  };

  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-primary-container/5 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative glass-panel rounded-2xl overflow-hidden border border-border-subtle group-hover:border-primary-container/40 transition-all duration-500 shadow-2xl flex flex-col h-[min(800px,75vh)]">
        <div className="scanline" />

        {/* Chat Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-border-subtle bg-surface-container-low/90 backdrop-blur-md flex justify-between items-center z-30">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-primary-container overflow-hidden bg-surface">
                {hasAvatar ? (
                  <img
                    src="/avatar.png"
                    alt="Ibrahim"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container">
                    <Cpu className="w-5 h-5 text-primary-container" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-surface glow-indicator" />
            </div>
            <div>
              <h3 className="font-mono text-sm text-on-surface font-bold leading-none mb-1">
                IBRAHIM_AGENT
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                  Model: RAG-NOVA-2-LITE
                </span>
                <span className="w-1 h-1 rounded-full bg-text-muted hidden sm:block" />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              className="p-2 text-text-muted hover:text-primary-container transition-colors bg-surface-container rounded-lg border border-border-subtle"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 text-text-muted hover:text-primary-container transition-colors bg-surface-container rounded-lg border border-border-subtle"
              aria-label="Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 sm:p-8 flex flex-col gap-6 overflow-y-auto bg-surface-container-lowest/40 font-mono">
          {messages.length === 0 && (
            <div className="flex gap-4 max-w-[90%]">
              <div className="w-8 h-8 shrink-0 rounded bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container mt-1">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-text-muted px-1 uppercase tracking-wider">
                  System Agent • Initializing
                </div>
                <div className="bg-surface-container-low border border-border-subtle p-4 rounded-lg rounded-tl-none message-shadow">
                  <p className="text-on-surface text-sm leading-relaxed font-body">
                    System initialized. I am the Digital Twin configured with
                    Ibrahim&apos;s professional dataset. Ask me anything about his
                    experience, projects, skills, and background.
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 max-w-[90%] ${
                message.role === 'user'
                  ? 'self-end flex-row-reverse'
                  : 'justify-start'
              }`}
            >
              <div
                className={`w-8 h-8 shrink-0 rounded flex items-center justify-center mt-1 ${
                  message.role === 'user'
                    ? 'bg-secondary/10 border border-secondary/30 text-secondary'
                    : 'bg-primary-container/10 border border-primary-container/30 text-primary-container'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : hasAvatar ? (
                  <img
                    src="/avatar.png"
                    alt="Ibrahim Digital Twin avatar"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <Cpu className="w-4 h-4" />
                )}
              </div>
              <div
                className={`space-y-1 ${message.role === 'user' ? 'text-right' : ''}`}
              >
                <div className="font-mono text-[10px] text-text-muted px-1 uppercase tracking-wider">
                  {message.role === 'user' ? 'Guest_User' : 'System Agent'} •{' '}
                  {formatTime(message.timestamp)}
                </div>
                <div
                  className={`p-4 rounded-lg message-shadow text-sm leading-relaxed font-body ${
                    message.role === 'user'
                      ? 'bg-primary-container/10 border border-primary-container/20 rounded-tr-none'
                      : 'bg-surface-container-low border border-border-subtle rounded-tl-none'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <MarkdownMessage content={message.content} />
                  ) : (
                    <p className="text-on-surface whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 max-w-[90%]">
              <div className="w-8 h-8 shrink-0 rounded bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container mt-1">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-text-muted px-1 uppercase tracking-wider">
                  System Agent • Processing
                </div>
                <div className="bg-surface-container-low border border-border-subtle p-4 rounded-lg rounded-tl-none message-shadow">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot" />
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot delay-100" />
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 sm:p-6 bg-surface-container-low/90 backdrop-blur-md border-t border-border-subtle">
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-container font-mono">
              &gt;
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about Ibrahim's professional background, skills, and experience..."
              className="w-full bg-surface-container border border-border-subtle group-hover/input:border-primary-container/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface py-3 sm:py-4 pl-10 pr-14 transition-all rounded-lg font-mono text-sm placeholder:text-text-muted/50 outline-none"
              disabled={isLoading}
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="text-primary-container hover:text-white transition-colors p-2 rounded hover:bg-primary-container/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Network Active
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                Vector DB Synced
              </span>
            </div>
            <div className="flex items-center gap-2">
              Secure Protocol V4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
