"use client";

import { useState, useRef, useEffect } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="p-1.5 cursor-pointer rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
      aria-label="Copy text"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {" "}
            <IconCheck className="w-4 h-4 text-emerald-400" />
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <IconCopy className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
