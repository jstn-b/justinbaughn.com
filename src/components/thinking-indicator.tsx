"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const THINKING_STEPS: Record<string, string[]> = {
  design: [
    "Reviewing Justin's design background…",
    "Compiling information on his design journey…",
    "Pulling together key projects and milestones…",
  ],
  leadership: [
    "Reflecting on Justin's leadership approach…",
    "Gathering insights on team building…",
    "Compiling his management philosophy…",
  ],
  philosophy: [
    "Considering Justin's design principles…",
    "Reviewing his core beliefs on craft…",
    "Pulling together his design philosophy…",
  ],
  career: [
    "Reviewing Justin's career history…",
    "Compiling roles and companies…",
    "Gathering key career highlights…",
  ],
  contact: [
    "Looking up contact information…",
    "Pulling together the best ways to reach Justin…",
  ],
  default: [
    "Thinking about this…",
    "Reviewing what I know…",
    "Putting together a response…",
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
    <div className="px-4 py-3">
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
