"use client";

import { motion } from "framer-motion";
import { ChatInput } from "@/components/chat-input";

const HINT_ICONS: Record<string, React.ReactNode> = {
  "Design journey": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  "Leadership style": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Design philosophy": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  "Resume": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

const HINTS = [
  { label: "Design journey", prompt: "Tell me about Justin's design journey" },
  { label: "Leadership style", prompt: "Tell me about Justin's leadership style" },
  { label: "Design philosophy", prompt: "Tell me about Justin's design philosophy" },
  { label: "Resume", prompt: "Show me Justin's resume" },
];

export function ChatBar({
  onActivate,
}: {
  onActivate: (message?: string) => void;
}) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-0 inset-x-0 z-50 pointer-events-none overflow-hidden"
    >
      <div className="w-full max-w-[736px] mx-auto px-4 pb-6 flex flex-col items-center gap-3 pointer-events-auto box-border">
        <ChatInput onSubmit={(msg) => onActivate(msg)} />

        <div className="w-full overflow-x-auto sm:overflow-x-visible scrollbar-hide">
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 w-max sm:w-auto mx-auto">
            {HINTS.map((hint) => (
              <button
                key={hint.label}
                onClick={() => onActivate(hint.prompt)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm rounded-full border border-foreground/15 bg-black text-foreground hover:bg-[#111] transition-colors cursor-pointer"
              >
                {HINT_ICONS[hint.label]}
                {hint.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
