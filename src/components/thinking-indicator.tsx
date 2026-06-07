"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MorphSpinner } from "@/components/morph-spinner";

const THINKING_STEPS: Record<string, string[]> = {
  design: [
    "Digging into the design portfolio…",
    "Connecting projects to the bigger picture…",
  ],
  leadership: [
    "Reflecting on how the teams were built…",
    "Tracing decisions back to outcomes…",
  ],
  philosophy: [
    "Grounding this in first principles…",
    "Connecting beliefs to real work…",
  ],
  career: [
    "Mapping out the career arc…",
    "Pinpointing the relevant experience…",
  ],
  contact: [
    "Locating the best way to connect…",
  ],
  resume: [
    "Assembling the full picture…",
    "Structuring the career narrative…",
  ],
  default: [
    "Reviewing Justin's background…",
    "Connecting the dots…",
  ],
};

function getSteps(message: string): string[] {
  const lower = message.toLowerCase();
  if (lower.includes("design") && (lower.includes("journey") || lower.includes("career") || lower.includes("background")))
    return THINKING_STEPS.design;
  if (lower.includes("leadership") || lower.includes("management") || lower.includes("team"))
    return THINKING_STEPS.leadership;
  if (lower.includes("philosophy") || lower.includes("principles") || lower.includes("approach"))
    return THINKING_STEPS.philosophy;
  if (lower.includes("career") || lower.includes("experience") || lower.includes("work"))
    return THINKING_STEPS.career;
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("linkedin"))
    return THINKING_STEPS.contact;
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("background"))
    return THINKING_STEPS.resume;
  return THINKING_STEPS.default;
}

export function ThinkingIndicator({ lastMessage }: { lastMessage?: string }) {
  const steps = getSteps(lastMessage ?? "");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <MorphSpinner />
      <AnimatePresence mode="wait">
        <motion.span
          key={stepIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-sm thinking-shimmer-text"
        >
          {steps[stepIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
