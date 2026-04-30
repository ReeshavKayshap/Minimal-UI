"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 mb-8 ">
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center size-7 rounded-full bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-white border border-white/10 
        text-[15px] font-bold font-inter "
        >
          {number}
        </div>
        <h3 className="text-lg font-inter font-semibold text-neutral-900 dark:text-zinc-100">
          {title}
        </h3>
      </div>
      <div className=" text-neutral-600 dark:text-zinc-400">{children}</div>
    </div>
  );
}

interface PropDef {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

export function PropsTable({ data }: { data: PropDef[] }) {
  return (
    <div
      className="w-full overflow-x-auto shadow-xs border border-neutral-200 dark:border-neutral-800
     rounded-xl bg-neutral-200/50 dark:bg-neutral-900"
    >
      <table className="w-full text-left text-sm text-neutral-900 dark:text-zinc-400">
        <thead
          className="bg-neutral-300/50 dark:bg-neutral-800 border-b dark:border-white/10 border-neutral-200/50
         text-neutral-900 dark:text-zinc-200 font-inter font-semibold"
        >
          <tr className="divide-x divide-neutral-400/30 dark:divide-neutral-700/50">
            <th className="px-4 py-3">Prop</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Default</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-300/80 dark:divide-neutral-800">
          {data.map((row, i) => (
            <tr
              key={i}
              className="divide-x divide-neutral-300/80 dark:divide-neutral-800 hover:bg-white/2 transition-colors"
            >
              <td className="px-4 py-3">
                <span
                  className="font-inter font-medium text-xs text-neutral-900 bg-neutral-200 dark:text-neutral-200  dark:bg-neutral-800 
                rounded-md px-2 py-1"
                >
                  {row.prop}
                </span>
              </td>
              <td className="font-inter font-medium text-xs text-neutral-900  dark:text-neutral-200 px-5 py-1">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-neutral-900  dark:text-neutral-200">
                {row.defaultValue}
              </td>
              <td className="px-4 py-3">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CliManualTabs({
  cliContent,
  manualContent,
}: {
  cliContent: React.ReactNode;
  manualContent: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"cli" | "manual">("cli");

  const tabs = [
    { id: "cli" as const, label: "CLI" },
    { id: "manual" as const, label: "Manual" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center bg-neutral-300/30 dark:bg-neutral-800 px-1 py-1 w-fit rounded-lg">
        {tabs.map((tab) => (
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.07 }}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative  px-4 py-1 cursor-pointer text-[13px] font-geist font-medium  z-10"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="install-tab-pill"
                className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-700 rounded-sm shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 text-neutral-900 dark:text-zinc-100">
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
      <div>{activeTab === "cli" ? cliContent : manualContent}</div>
    </div>
  );
}
