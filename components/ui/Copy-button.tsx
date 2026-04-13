"use client";

import { useState, useRef, useEffect } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

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
      {isCopied ? (
        <IconCheck className="w-4 h-4 text-emerald-400" />
      ) : (
        <IconCopy className="w-4 h-4" />
      )}
    </button>
  );
}
