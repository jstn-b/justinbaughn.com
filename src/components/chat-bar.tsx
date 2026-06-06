"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const HINTS = [
  { label: "Design Journey", prompt: "Tell me about Justin's design journey" },
  { label: "Leadership Style", prompt: "Tell me about Justin's leadership style" },
  { label: "Design Philosophy", prompt: "Tell me about Justin's design philosophy" },
  { label: "Resume", prompt: "Show me Justin's resume" },
];

export function ChatBar({
  onActivate,
}: {
  onActivate: (message?: string) => void;
}) {
  const [input, setInput] = useState("");

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-0 inset-x-0 z-50 pointer-events-none"
    >
      <div className="max-w-[736px] mx-auto px-4 pb-6 flex flex-col items-center gap-3 pointer-events-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              onActivate(input.trim());
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
                  if (input.trim()) {
                    onActivate(input.trim());
                    setInput("");
                  }
                }
              }}
              rows={3}
              placeholder="Ask me anything…"
              className="w-full rounded-2xl border border-foreground/15 bg-background px-5 py-4 pr-12 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground/30 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`absolute right-3 bottom-4 p-1.5 rounded-lg transition-colors cursor-pointer ${input.trim() ? "bg-foreground text-background" : "bg-foreground/20 text-background/40"}`}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          {HINTS.map((hint) => (
            <button
              key={hint.label}
              onClick={() => onActivate(hint.prompt)}
              className="px-4 py-2 text-sm rounded-2xl border border-foreground/15 bg-background text-secondary hover:border-foreground/30 transition-colors cursor-pointer"
            >
              {hint.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
