"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

  const headshotRef = useRef<HTMLVideoElement>(null);

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
            <div className="max-w-[960px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-8">
                  <video
                    ref={headshotRef}
                    src="/Justin Headshot Trimmed.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight leading-[1.1]">
                  Justin Baughn
                </h1>
                <p className="mt-4 text-2xl sm:text-3xl md:text-[40px] font-medium text-foreground">
                  Head of Product Design
                </p>
                <p className="mt-8 text-lg sm:text-xl leading-relaxed text-foreground/60 mx-auto max-w-3xl">
                  Leading at the intersection of design, product, business, and AI
                  to drive impact at scale. Currently combating the global climate
                  crisis at 1K5.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeIn" }}
                className="mt-10 w-full rounded-xl overflow-hidden"
              >
                <video
                  src="/HeartbeatApp2026Trimmedv2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: "easeIn" }}
                className="mt-10 text-lg sm:text-xl leading-relaxed text-foreground/60 mx-auto max-w-3xl"
              >
                Hands-on design leader building high-performing teams, elegant
                systems, and products that scale.
              </motion.p>
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
