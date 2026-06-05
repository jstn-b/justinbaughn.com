"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
              const isStreaming =
                message.role === "assistant" &&
                status === "streaming" &&
                idx === messages.length - 1;

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
                    <span className={`whitespace-pre-wrap ${isStreaming ? "streaming-text" : ""}`}>
                      {message.parts.map((part, i) =>
                        part.type === "text" ? (
                          <span key={i}>
                            {part.text.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
                              seg.startsWith("**") && seg.endsWith("**") ? (
                                <strong key={j} className="font-bold">
                                  {seg.slice(2, -2)}
                                </strong>
                              ) : (
                                seg
                              ),
                            )}
                          </span>
                        ) : null,
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <AnimatePresence>
            {status === "submitted" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex justify-start"
              >
                <div className="rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
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
                disabled={isLoading}
                autoFocus
                className="w-full rounded-2xl border border-foreground/15 bg-background px-5 py-4 pr-12 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground/30 transition-colors resize-none disabled:opacity-50"
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
          <p className="mt-2 text-center text-xs text-foreground/40">
            This is an experimental application. The model may return incorrect or incomplete information.
          </p>
        </div>
      </div>
    </div>
  );
}
