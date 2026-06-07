"use client";

import { useState } from "react";

export function ChatInput({
  onSubmit,
  disabled,
  autoFocus,
}: {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const [input, setInput] = useState("");

  const canSend = input.trim() && !disabled;

  function handleSubmit() {
    if (!canSend) return;
    onSubmit(input.trim());
    setInput("");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full min-w-0"
    >
      <div className="relative min-w-0 overflow-hidden rounded-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Justin…"
          autoFocus={autoFocus}
          className="w-full min-w-0 rounded-full border border-foreground/15 bg-black px-5 py-3 pr-12 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!canSend}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors cursor-pointer disabled:cursor-default ${canSend ? "bg-foreground text-background" : "bg-foreground/20 text-background/40"}`}
          aria-label="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </form>
  );
}
