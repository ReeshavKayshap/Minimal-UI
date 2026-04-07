"use client";

import { useState, useEffect, useRef } from "react";
import { IconEye, IconCopy, IconCheck } from "@tabler/icons-react";
import { motion } from "motion/react";

export default function RevealPassword() {
  const [status, setStatus] = useState<"hidden" | "revealed" | "copied">(
    "hidden",
  );

  // --- 2. Timers (for auto-hiding and animations) ---
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // --- 3. Actions ---
  const handleAction = () => {
    // Clear any existing timers so we start fresh
    if (timerRef.current) clearTimeout(timerRef.current);

    if (status === "hidden") {
      // Reveal the card
      setStatus("revealed");

      // Auto-hide after 4 seconds
      timerRef.current = setTimeout(() => setStatus("hidden"), 4000);

      // Start shimmer effect briefly after the flip animation
    } else if (status === "revealed") {
      // Copy to clipboard
      copyToClipboard("4485 1996 2057 7516");
      setStatus("copied");

      // Revert to hidden after 2 seconds
      timerRef.current = setTimeout(() => setStatus("hidden"), 2000);
    }
  };

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  // --- 4. Button Styles ---
  const buttonStyles = {
    hidden:
      "bg-[#eff2fe] cursor-pointer text-[#5568f9] hover:bg-[#e4e9fe] focus-visible:ring-[#5568f9]",
    revealed:
      "bg-[#e5f8ed] cursor-pointer text-[#22c55e] hover:bg-[#d1f4e0] focus-visible:ring-[#22c55e]",
    copied: "bg-[#22c55e] cursor-pointer text-white",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
      <div className="flex items-center gap-10 bg-white px-3.5 py-2 w-fit rounded-2xl border border-gray-200 shadow-xs">
        {/* === CARD NUMBER DISPLAY === */}
        <div className="relative font-geist text-[17px] font-medium flex items-center text-gray-800">
          <span>4485 </span>
          {/* 3D Flip Container (Middle numbers) */}
          <div className="relative w-[104px] flex items-center justify-center overflow-visible mx-1">
            {/* 1. Hidden Text (xxxx xxxx) */}
            <div className="absolute inset-0 flex items-center justify-center whitespace-pre pointer-events-none">
              {"xxxx xxxx".split("").map((char, i) => (
                <motion.span
                  key={`hidden-${i}`}
                  initial={false}
                  animate={{
                    rotateX: status === "hidden" ? 0 : 90,
                    y: status === "hidden" ? 0 : -12,
                    opacity: status === "hidden" ? 1 : 0,
                    filter: status === "hidden" ? "blur(0px)" : "blur(3px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: i * 0.035,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* 2. Revealed Text (1996 2057) */}
            <div className="absolute inset-0 flex items-center justify-center whitespace-pre pointer-events-none">
              {"1996 2057".split("").map((char, i) => (
                <motion.span
                  key={`revealed-${i}`}
                  initial={false}
                  animate={{
                    rotateX: status !== "hidden" ? 0 : -90,
                    y: status !== "hidden" ? 0 : 12,
                    opacity: status !== "hidden" ? 1 : 0,
                    transformPerspective: 400,
                    filter: status !== "hidden" ? "blur(0px)" : "blur(3px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: i * 0.035,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          <span> 7516</span>
        </div>

        {/* === ACTION BUTTON === */}
        <button
          onClick={handleAction}
          disabled={status === "copied"}
          className={`relative w-10 h-10 rounded-[14px] transition-colors duration-300 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyles[status]}`}
        >
          {/* Animated Green Border (Timer) */}
          {status === "revealed" && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 40 40"
            >
              <motion.rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="130"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 130 }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </svg>
          )}

          {/* Icons Crossfade */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{
                scale: status === "hidden" ? 1 : 0.5,
                opacity: status === "hidden" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <IconEye size={20} strokeWidth={2.5} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                scale: status === "revealed" ? 1 : 0.5,
                opacity: status === "revealed" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <IconCopy size={20} strokeWidth={2.5} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                scale: status === "copied" ? 1 : 0.5,
                opacity: status === "copied" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <IconCheck size={20} strokeWidth={3} />
            </motion.div>
          </div>
        </button>
      </div>
    </div>
  );
}
