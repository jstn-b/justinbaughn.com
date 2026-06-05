"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatBar } from "@/components/chat-bar";
import { ChatView } from "@/components/chat-view";

export default function Home() {
  const [chatActive, setChatActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  const handleActivate = useCallback((message?: string) => {
    setInitialMessage(message);
    setChatActive(true);
  }, []);

  const handleBack = useCallback(() => {
    setChatActive(false);
    setInitialMessage(undefined);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!chatActive ? (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col min-h-full"
        >
          <main className="flex-1 flex flex-col justify-center items-center px-6 sm:px-10 pt-12 sm:pt-16 pb-64 text-center">
            <div className="max-w-[736px]">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                Justin Baughn
              </h1>
              <p className="mt-4 text-xl sm:text-2xl font-medium text-foreground">
                Head of Product Design
              </p>
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-foreground/60 mx-auto max-w-2xl">
                Leading at the intersection of design, product, business, and AI
                to drive impact at scale. Currently combating the global climate
                crisis at{" "}
                <a
                  href="https://1k5.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  1K5
                </a>
                .
              </p>

              <div className="mt-10 w-full rounded-xl overflow-hidden">
                <img
                  src="/hero-phones.png"
                  alt="1K5 energy app shown on three iPhones"
                  className="w-full h-auto"
                />
              </div>

              <p className="mt-10 text-base sm:text-lg leading-relaxed text-foreground/60 mx-auto max-w-2xl">
                Hands-on design leader building high-performing teams, elegant
                systems, and products that scale.
              </p>
            </div>
          </main>

          <ChatBar onActivate={handleActivate} />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-full"
        >
          <ChatView initialMessage={initialMessage} onBack={handleBack} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
