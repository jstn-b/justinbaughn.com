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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const animationRef = useRef<Animation | null>(null);

  const carouselRef = useCallback((el: HTMLDivElement | null) => {
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }
    if (!el) return;
    const anim = el.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-1536px)" },
      ],
      { duration: 14000, iterations: Infinity, easing: "linear" }
    );
    animationRef.current = anim;
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
          <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-10 pt-12 sm:pt-16 pb-64 text-center">
            <div className="w-full max-w-[960px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-8 bg-[#79D4D3]">
                  <video
                    ref={headshotRef}
                    src="/Justin Video 2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`w-[240%] h-[240%] object-cover object-[center_20%] -translate-x-[3px] -translate-y-[calc(16%+7px)] transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight leading-[1.1]">
                  Justin Baughn
                </h1>
                <p className="mt-[24px] text-2xl sm:text-3xl md:text-[40px] font-medium text-foreground">
                  Head of Product Design
                </p>
                <p className="mt-[32px] text-[17px] sm:text-[22px] leading-relaxed text-secondary mx-auto">
                  Leading at the intersection of design, product, business, and AI
                  to drive impact at scale. Currently combating the global climate
                  crisis at 1K5.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeIn" }}
                className="mt-16 w-full rounded-xl overflow-hidden"
              >
                <video
                  src="/HeartbeatApp2026Trimmedv2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[calc(56vw+64px)] sm:h-auto object-cover"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: "easeIn" }}
                className="mt-[160px] px-0 sm:px-[40px] text-[24px] sm:text-[32px] leading-[1.4em] text-secondary mx-auto"
              >
                Hands-on design leader building high-performing teams, elegant
                systems, and products that scale.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.2, ease: "easeIn" }}
              className="relative mt-[120px] max-w-[960px] w-full mx-auto overflow-hidden"
            >
              <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              <div
                className="overflow-hidden"
                onMouseEnter={() => { if (animationRef.current) animationRef.current.playbackRate = 0.5; }}
                onMouseLeave={() => { if (animationRef.current) animationRef.current.playbackRate = 1; }}
              >
                <div ref={carouselRef} className="flex carousel-track">
                  {Array.from({ length: 2 }).flatMap((_, dupeIdx) =>
                    [
                      "/Source Page - Dark Mode.png",
                      "/Audience Tab - Dark.png",
                      "/No Vote Design.png",
                      "/Opinary Thumbnail.png",
                    ].map((src, i) => (
                      <div
                        key={`${dupeIdx}-${i}`}
                        className="shrink-0 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-2xl bg-foreground/[0.06] overflow-hidden mr-6"
                      >
                        {src && <img src={src} alt="" className="w-full h-full object-cover" />}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
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
