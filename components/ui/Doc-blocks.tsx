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
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 text-sm font-bold text-white border border-white/10">
          {number}
        </div>
        <h3 className="text-lg font-inter font-semibold text-zinc-100">
          {title}
        </h3>
      </div>
      <div className=" text-zinc-400">{children}</div>
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
    <div className="w-full overflow-x-auto border border-white/10 rounded-xl bg-zinc-950/50">
      <table className="w-full text-left text-sm text-zinc-400">
        <thead className="bg-zinc-900 border-b border-white/10 text-zinc-200">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/2 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-indigo-300 bg-indigo-500/10 rounded-md m-2 inline-block">
                {row.prop}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-emerald-300">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-500">
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
      <div className="flex items-center bg-neutral-200 dark:bg-neutral-800 px-1 py-1 w-fit rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative  px-4 py-1 cursor-pointer text-[13.5px] font-geist font-medium  z-10"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="install-tab-pill"
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
                activeTab === tab.id
                  ? "text-neutral-900 dark:text-zinc-100"
                  : "text-neutral-500 dark:text-zinc-400"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div>{activeTab === "cli" ? cliContent : manualContent}</div>
    </div>
  );
}
