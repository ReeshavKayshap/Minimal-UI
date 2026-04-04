"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/Code-block";

interface ComponentTabsProps {
  preview: React.ReactNode;
  code: string;
}

export function ComponentTabs({ preview, code }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center gap-2">
        <TabButton
          active={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </TabButton>
        <TabButton
          active={activeTab === "code"}
          onClick={() => setActiveTab("code")}
        >
          Code
        </TabButton>
      </div>

      <div className=" rounded-xl overflow-hidden border border-white/10 ">
        {activeTab === "preview" ? (
          <div className="w-full min-h-[450px] flex items-center justify-center bg-black">
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

// Helper component to keep the code DRY and readable
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        active
          ? "text-zinc-100 bg-white/10 shadow-sm"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}
