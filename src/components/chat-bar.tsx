"use client";

import { motion } from "framer-motion";
import { ChatInput } from "@/components/chat-input";

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
      className="fixed bottom-0 inset-x-0 z-50 pointer-events-none"
    >
      <div className="max-w-[736px] mx-auto px-4 pb-6 flex flex-col items-center gap-3 pointer-events-auto">
        <ChatInput onSubmit={(msg) => onActivate(msg)} />

        <div className="w-full overflow-x-auto sm:overflow-x-visible scrollbar-hide">
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 w-max sm:w-auto mx-auto">
            {HINTS.map((hint) => (
              <button
                key={hint.label}
                onClick={() => onActivate(hint.prompt)}
                className="shrink-0 px-4 py-2 text-sm rounded-full border border-foreground/15 bg-black text-foreground hover:bg-[#111] transition-colors cursor-pointer"
              >
                {hint.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
