"use client";

import React, { useState } from "react";

import { CopyButton } from "@/components/ui/Copy-button";
import { motion } from "motion/react"; // ⭐️ Added motion import

interface InstallDependenciesProps {
  dependencies: string[];
}

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function InstallDependencies({
  dependencies,
}: InstallDependenciesProps) {
  const [activeManager, setActiveManager] = useState<PackageManager>("npm");

  const commandText = React.useMemo(() => {
    const depsString = dependencies.join(" ");

    if (!depsString) return "";

    switch (activeManager) {
      case "pnpm":
        return `pnpm add ${depsString}`;
      case "bun":
        return `bun add ${depsString}`;
      case "yarn":
        return `yarn add ${depsString}`;
      case "npm":
      default:
        return `npm install ${depsString}`;
    }
  }, [activeManager, dependencies]);

  const managers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

  if (!dependencies || dependencies.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#18181b]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-2">
          {managers.map((manager) => (
            <button
              key={manager}
              onClick={() => setActiveManager(manager)}
              className="relative  px-4 py-1 cursor-pointer text-[13.5px] font-geist font-medium  z-10"
            >
              {activeManager === manager && (
                <motion.div
                  layoutId="deps-tab-pill"
                  className="absolute inset-0 bg-white/10 rounded-md"
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
            </button>
          ))}
        </div>

        <CopyButton textToCopy={commandText} />
      </div>

      <div className="p-4 overflow-x-auto bg-[#09090b]">
        <code className="text-sm font-mono text-zinc-300 whitespace-nowrap">
          <span className="text-emerald-400 mr-2">{">_"}</span>
          {commandText}
        </code>
      </div>
    </div>
  );
}
