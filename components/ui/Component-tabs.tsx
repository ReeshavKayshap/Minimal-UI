"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/Code-block";
import { motion } from "motion/react";
interface ComponentTabsProps {
  preview: React.ReactNode;
  code: string;
}

export function ComponentTabs({ preview, code }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const changes = [
    { id: "preview" as const, label: "Preview" },
    { id: "code" as const, label: "Code" },
  ];
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center bg-neutral-200 dark:bg-neutral-800 px-1 py-1 w-fit rounded-lg">
        {changes.map((changes) => (
          <button
            key={changes.id}
            onClick={() => setActiveTab(changes.id)}
            className="relative  px-4 py-1 cursor-pointer text-[13.5px] font-geist font-medium  z-10"
          >
            {activeTab === changes.id && (
              <motion.div
                layoutId="switch"
                className="absolute inset-0  bg-white dark:bg-neutral-600 rounded-sm shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`relative  z-10 ${
                activeTab === changes.id
                  ? "text-neutral-900 dark:text-zinc-100"
                  : "text-neutral-500 dark:text-zinc-400"
              }`}
            >
              {changes.label}
            </span>
          </button>
        ))}
      </div>

      <div className=" rounded-xl overflow-hidden border border-neutral-200/10 dark:border-white/10 ">
        {activeTab === "preview" ? (
          <div className="w-full min-h-[450px] flex items-center justify-center bg-neutral-100 dark:bg-black">
            {preview}
          </div>
        ) : (
          <div className="w-full max-h-[600px] overflow-auto">
            <CodeBlock code={code} language="tsx" />
          </div>
        )}
      </div>
    </div>
  );
}
