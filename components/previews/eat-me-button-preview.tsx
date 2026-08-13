"use client";

import EatMeButton from "@/components/core/Eat-me-button";

const CONFIG = {
  label: "Iron Man Will...",
  returnLabel: "Return In Doomsday 🤫",
};

export default function EatMeButtonPreview() {
  return (
    <div className="relative w-full flex items-center justify-center py-16">
      <EatMeButton label={CONFIG.label} returnLabel={CONFIG.returnLabel} />

      {/* Annotation */}
      <div className="pointer-events-none select-none absolute right-[25%] top-[22%] flex flex-col items-start">
        <span className="font-handwriting text-3xl text-neutral-500 -rotate-3">
          click to reveal
        </span>

        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="text-neutral-400 scale-y-[-1] "
        >
          <path
            d="M40 52C40 34 32 20 16 15"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M23 10L15 15L21 22"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
