"use client";

import React, { useState } from "react";

import { CopyButton } from "@/components/ui/Copy-button";
import { motion } from "motion/react"; // ⭐️ Fixed the import!

interface InstallCommandProps {
  componentName: string;
}

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function InstallCommand({ componentName }: InstallCommandProps) {
  const [activeManager, setActiveManager] = useState<PackageManager>("npm");

  const BASE_URL = "http://localhost:3000/r";

  const commandText = React.useMemo(() => {
    const url = `${BASE_URL}/${componentName}.json`;

    switch (activeManager) {
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${url}`;
      case "bun":
        return `bunx --bun shadcn@latest add ${url}`;
      case "yarn":
        return `yarn dlx shadcn@latest add ${url}`;
      case "npm":
      default:
        return `npx shadcn@latest add ${url}`;
    }
  }, [activeManager, componentName]);

  const managers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

  return (
    <div
      className="mt-4 rounded-xl overflow-hidden shadow-xs border border-neutral-200 dark:border-white/10
     bg-neutral-200/20 dark:bg-neutral-900"
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800
       "
      >
        <div className="flex items-center gap-2">
          {managers.map((manager) => (
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.07 }}
              key={manager}
              onClick={() => setActiveManager(manager)}
              className="relative  px-4 py-1 cursor-pointer text-[13.5px] font-geist font-medium  z-10"
            >
              {activeManager === manager && (
                <motion.div
                  layoutId="manager-tab-pill"
                  className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-800 rounded-md"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10 text-neutral-900 dark:text-neutral-100">
                {manager}
              </span>
            </motion.button>
          ))}
        </div>
        <CopyButton textToCopy={commandText} />
      </div>

      <div className="p-4 overflow-x-auto bg-neutral-200/20 dark:bg-neutral-900">
        <code className="text-sm font-geist-mono text-neutral-900 dark:text-zinc-300 whitespace-nowrap">
          <span className="text-emerald-500 mr-2">{">_"}</span>
          {commandText}
        </code>
      </div>
    </div>
  );
}
