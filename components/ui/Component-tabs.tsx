"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
interface ComponentTabsProps {
  preview: React.ReactNode;
  code: React.ReactNode;
}

export function ComponentTabs({ preview, code }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const changes = [
    { id: "preview" as const, label: "Preview" },
    { id: "code" as const, label: "Code" },
  ];
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center bg-neutral-300/30 dark:bg-neutral-800 px-1 py-1 w-fit rounded-lg">
        {changes.map((changes) => (
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.07 }}
            key={changes.id}
            onClick={() => setActiveTab(changes.id)}
            className="relative  px-4 py-1 cursor-pointer text-[13px] font-geist font-medium  z-10"
          >
            {activeTab === changes.id && (
              <motion.div
                layoutId="switch"
                className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-700 rounded-sm shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 text-neutral-900 dark:text-zinc-100">
              {changes.label}
            </span>
          </motion.button>
        ))}
      </div>

      <div className=" rounded-xl overflow-hidden shadow-xs border border-neutral-200 dark:border-neutral-800 ">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="w-full min-h-[480px] flex bg-neutral-200/20 dark:bg-neutral-900 overflow-auto"
            >
              {preview}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="w-full max-h-[480px] overflow-auto "
            >
              {code}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
