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
      className="p-2 cursor-pointer rounded-md text-neutral-400 hover:text-black dark:hover:text-white
       dark:bg-neutral-800 bg-neutral-200  transition-all  duration-300 ease-in "
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
            <IconCheck className="w-4 h-4 text-green-500" />
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
