"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative w-full flex justify-between rounded-lg bg-neutral-900 border border-white/10 overflow-hidden">
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>

      <div className="px-4 py-2 ">
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
    </div>
  );
}
