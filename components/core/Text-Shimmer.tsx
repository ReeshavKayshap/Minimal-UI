"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function TextShimmer() {
  const [mode, setMode] = useState<"normal" | "wave">("normal");

  return (
    <div className="min-h-screen flex items-center justify-center font-sans overflow-hidden selection:bg-white/20 relative">
      <div className="absolute top-12 flex gap-2 p-1 bg-zinc-900/50 rounded-lg border border-zinc-800/50 z-10">
        <button
          onClick={() => setMode("normal")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            mode === "normal"
              ? "bg-zinc-700 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => setMode("wave")}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            mode === "wave"
              ? "bg-zinc-700 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
          }`}
        >
          Wave
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute text-center"
        >
          {mode === "normal" ? (
            <NormalShimmerText text="Thinking through your request..." />
          ) : (
            <WaveText text="Thinking through your request..." />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WaveText({ text }: { text: string }) {
  const duration = 0.8;
  const zDistance = 10;
  const xDistance = 3;
  const yDistance = -3;
  const spread = 0.9;
  const scaleDistance = 0.98;
  const rotateYDistance = 8;

  return (
    <motion.span className="relative inline-block text-lg md:text-xl font-medium tracking-wide cursor-default perspective-normal">
      {text.split("").map((char, index) => {
        const delay = (index * duration * (1.3 / spread)) / text.length;

        return (
          <motion.span
            key={index}
            className="inline-block whitespace-pre transform-style-preserve-3d font-inter"
            initial={{
              translateZ: 0,
              translateX: 0,
              translateY: 0,
              scale: 0.95,
              rotateY: 0,
              color: "#52525b",
            }}
            animate={{
              translateZ: [0, zDistance, 0],
              translateX: [0, xDistance, 0],
              translateY: [0, yDistance, 0],
              scale: [0.95, scaleDistance, 0.95],
              rotateY: [0, rotateYDistance, 0],
              color: ["#52525b", "#ffffff", "#52525b"],
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

function NormalShimmerText({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-block text-lg md:text-xl font-medium tracking-wide cursor-default"
      style={{
        backgroundImage:
          "linear-gradient(40deg, #52525b 0%, #52525b 40%, #ffffff 50%, #52525b 60%, #52525b 80%, #52525b 100%)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        duration: 2,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      {text}
    </motion.span>
  );
}
