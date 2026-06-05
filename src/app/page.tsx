"use client";

import { useState } from "react";

const tabs = ["Design Approach", "Management Style", "Additional Thoughts"];

export default function Home() {
  return (
    <>
      <header className="w-full px-6 py-6 sm:px-10 sm:py-8">
        <nav className="flex items-center justify-center gap-8 text-sm tracking-wide">
          <a href="/" className="text-foreground font-medium">
            Home
          </a>
          <a
            href="/writing"
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            Writing
          </a>
          <a
            href="/about"
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            About
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-6 sm:px-10 pt-16 sm:pt-24 pb-24 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Justin Baughn
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-medium text-foreground">
            Head of Product Design
          </p>
          <p className="mt-8 text-base sm:text-lg leading-relaxed text-foreground/60 mx-auto max-w-xl">
            Leading at the intersection of design, product, business, and AI to
            drive impact at scale. Currently combating the global climate crisis
            at{" "}
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

          <p className="mt-10 text-base sm:text-lg leading-relaxed text-foreground/60 mx-auto max-w-xl">
            Hands-on design leader building high-performing teams, elegant
            systems, and products that scale.
          </p>

          <Tabs />
        </div>
      </main>

      <footer className="px-6 py-6 sm:px-10 sm:py-8 text-center">
        <p className="text-xs tracking-widest text-foreground/30 uppercase">
          &copy; Copyright 2026
        </p>
      </footer>
    </>
  );
}

function Tabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-14">
      <div className="flex items-center justify-center">
        {tabs.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`w-48 pb-2 text-sm font-medium transition-colors border-b-2 ${
              active === i
                ? "text-foreground border-foreground"
                : "text-foreground/50 border-transparent hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[120px] text-base leading-relaxed text-foreground/60">
        {active === 0 && <p>Design Approach content goes here.</p>}
        {active === 1 && (
          <div className="flex justify-center gap-10 max-w-2xl mx-auto">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-full bg-foreground/10 mx-auto" />
              <p className="mt-4 text-xs font-medium text-foreground">Hands on</p>
              <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                Leadership must collaborate with teams.
              </p>
            </div>
            <div className="flex-1">
              <div className="w-12 h-12 rounded-full bg-foreground/10 mx-auto" />
              <p className="mt-4 text-xs font-medium text-foreground">Create excellence</p>
              <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                Facilitate the conditions and environment for quality.
              </p>
            </div>
            <div className="flex-1">
              <div className="w-12 h-12 rounded-full bg-foreground/10 mx-auto" />
              <p className="mt-4 text-xs font-medium text-foreground">Hold the bar</p>
              <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                Own the decision space and serve as the quality gate.
              </p>
            </div>
          </div>
        )}
        {active === 2 && <p>Additional Thoughts content goes here.</p>}
      </div>
    </div>
  );
}
