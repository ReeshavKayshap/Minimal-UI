"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      // Reset the checkmark back to a copy icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative w-full rounded-lg bg-zinc-950 border border-white/10 overflow-hidden">
      {/* Top Bar / Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/10">
        <span className="text-xs font-mono text-zinc-400 lowercase">
          {language}
        </span>

        {/* The Copy Button */}
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
          aria-label="Copy code"
        >
          {isCopied ? (
            <IconCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <IconCopy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* The Actual Code Area */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
