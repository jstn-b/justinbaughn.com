"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThinkingIndicator } from "@/components/thinking-indicator";

function StreamingWords({ text }: { text: string }) {
  const prevLengthRef = useRef(0);
  const [revealedAt] = useState(() => new Map<number, number>());

  const segments = useMemo(() => {
    const parts: { text: string; bold: boolean }[] = [];
    text.split(/(\*\*[^*]+\*\*)/).forEach((seg) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        parts.push({ text: seg.slice(2, -2), bold: true });
      } else if (seg) {
        parts.push({ text: seg, bold: false });
      }
    });
    return parts;
  }, [text]);

  const words = useMemo(() => {
    const result: { word: string; bold: boolean }[] = [];
    segments.forEach((seg) => {
      seg.text.split(/(\s+)/).forEach((word) => {
        result.push({ word, bold: seg.bold });
      });
    });
    return result;
  }, [segments]);

  const now = Date.now();
  words.forEach((_, i) => {
    if (!revealedAt.has(i)) {
      revealedAt.set(i, now);
    }
  });

  useEffect(() => {
    prevLengthRef.current = words.length;
  }, [words.length]);

  return (
    <>
      {words.map(({ word, bold }, i) => {
        const revealTime = revealedAt.get(i) ?? now;
        const age = now - revealTime;
        const isNew = age < 600;

        const content = bold ? <strong className="font-bold">{word}</strong> : word;

        return (
          <span
            key={i}
            className={isNew ? "streaming-word" : undefined}
            style={isNew ? { animationDelay: `${Math.min(i - prevLengthRef.current, 8) * 30}ms` } : undefined}
          >
            {content}
          </span>
        );
      })}
    </>
  );
}

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function ChatView({
  initialMessage,
  onBack,
}: {
  initialMessage?: string;
  onBack: () => void;
}) {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);
  const [showResponse, setShowResponse] = useState(true);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status === "submitted") {
      setShowResponse(false);
      thinkingTimerRef.current = setTimeout(() => {
        setShowResponse(true);
      }, 2000);
    }
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (initialMessage && !sentInitial.current) {
      sentInitial.current = true;
      sendMessage({ text: initialMessage });
    }
  }, [initialMessage, sendMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function handleBack() {
    setMessages([]);
    onBack();
  }

  const isLoading = status === "submitted" || status === "streaming";
  const isThinking = isLoading && !showResponse;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-4 sm:px-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 p-2 -ml-2 rounded-lg text-foreground/60 hover:text-foreground transition-colors cursor-pointer text-sm"
          aria-label="Back to portfolio"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to portfolio
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 pb-48">
        <div className="max-w-[736px] mx-auto space-y-6 py-4">
          <AnimatePresence initial={false}>
            {messages.map((message, idx) => {
              const isLastAssistant =
                message.role === "assistant" && idx === messages.length - 1;
              const isStreaming =
                isLastAssistant && status === "streaming";

              if (isLastAssistant && isThinking) return null;

              const prevMessage = idx > 0 ? messages[idx - 1] : null;
              const isResumeResponse =
                message.role === "assistant" &&
                !isStreaming &&
                prevMessage?.role === "user" &&
                prevMessage.parts.some(
                  (p) =>
                    p.type === "text" &&
                    /resume/i.test(p.text),
                );

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-foreground/[0.06] text-foreground"
                        : "text-foreground"
                    }`}
                  >
                    <span className="whitespace-pre-wrap">
                      {message.parts.map((part, i) =>
                        part.type === "text" ? (
                          <span key={i}>
                            {isStreaming ? (
                              <StreamingWords text={part.text} />
                            ) : (
                              part.text.split(/(^\s*---\s*$|\*\*[^*]+\*\*)/m).map((seg, j, arr) => {
                                if (/^\s*---\s*$/.test(seg)) {
                                  return <hr key={j} className="my-5 border-0 h-px bg-foreground/10" />;
                                }
                                if (seg.startsWith("**") && seg.endsWith("**")) {
                                  return <strong key={j} className="font-bold">{seg.slice(2, -2)}</strong>;
                                }
                                const prev = j > 0 ? arr[j - 1] : "";
                                const next = j < arr.length - 1 ? arr[j + 1] : "";
                                let cleaned = seg;
                                if (/^\s*---\s*$/.test(prev)) cleaned = cleaned.replace(/^\n+/, "");
                                if (/^\s*---\s*$/.test(next)) cleaned = cleaned.replace(/\n+$/, "");
                                return cleaned;
                              })
                            )}
                          </span>
                        ) : null,
                      )}
                    </span>
                    {isResumeResponse && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                        className="mt-4"
                      >
                        <a
                          href="/Justin Baughn Resume.pdf"
                          download
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-foreground/15 text-foreground text-sm font-medium hover:border-foreground/30 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Download Resume
                        </a>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <AnimatePresence>
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex justify-start"
              >
                <ThinkingIndicator
                  lastMessage={
                    [...messages].reverse().find((m) => m.role === "user")
                      ?.parts.find((p) => p.type === "text")
                      ?.text
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Input */}
      <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-[736px] mx-auto px-4 pb-6 pointer-events-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim() && !isLoading) {
                sendMessage({ text: input.trim() });
                setInput("");
              }
            }}
            className="w-full"
          >
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !isLoading) {
                      sendMessage({ text: input.trim() });
                      setInput("");
                    }
                  }
                }}
                rows={3}
                placeholder="Ask me anything…"
                autoFocus
                className="w-full rounded-2xl border border-foreground/15 bg-background px-5 py-4 pr-12 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground/30 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`absolute right-3 bottom-4 p-1.5 rounded-lg transition-colors cursor-pointer disabled:cursor-default ${input.trim() && !isLoading ? "bg-foreground text-background" : "bg-foreground/20 text-background/40"}`}
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
