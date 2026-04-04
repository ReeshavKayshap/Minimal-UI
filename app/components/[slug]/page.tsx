import { notFound } from "next/navigation";

import { ComponentTabs } from "@/components/ui/Component-tabs";
import RepulsioText from "@/components/core/RepulsioText";
import { ReactNode } from "react";
import Sidebar from "@/components/core/Sidebar";
import OptionToggle from "@/components/core/OptionToggle";

interface ComponentDefinition {
  title: string;
  description: string;
  badge?: string;
  component: ReactNode;
  rawCode: string;
}

const auroraCodeString = `import React from "react";\n\nexport function AuroraHero() {\n  return (\n    <div className="w-full h-[450px] rounded-xl bg-linear-to-br from-indigo-500 flex items-center justify-center hover:scale-[1.02] transition-transform">\n      <h2>Interactive Shader</h2>\n    </div>\n  );\n}`;
const repulsioCodeString = `"use client";\nimport { useRef, useEffect } from "react";\n\nexport default function RepulsioText() {\n  return <div>Repulsio Code</div>\n}`;

const COMPONENT_REGISTRY: Record<string, ComponentDefinition> = {
  "repulsio-text": {
    title: "Repulsion Text",
    description:
      "An interactive particle text effect that scatters away from the mouse cursor.",

    component: (
      <RepulsioText
        text="Hover Me"
        fontFamily="geist, sans-serif"
        dotRadius={2.5}
        repulseRadius={100}
        repulseForce={6}
        springForce={0.08}
        friction={0.82}
      />
    ),
    rawCode: repulsioCodeString,
  },
  "option-toggle": {
    title: "OptionToggle",
    description: "A beautiful glowing option toggle.",

    component: <OptionToggle />,
    rawCode: auroraCodeString,
  },
  "sidebar-menu": {
    title: "Sidebar",
    description: "A beautiful glowing sidebar menu.",
    badge: "Hero Section",
    component: <Sidebar />,
    rawCode: auroraCodeString,
  },
};

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const componentData = COMPONENT_REGISTRY[slug];

  if (!componentData) notFound();

  return (
    <div>
      {/* <Link
        href="/components"
        className="group inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors mb-10"
      >
        <IconChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Components
      </Link> */}

      <div className="flex flex-col gap-4 py-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tight">
          {componentData.title}
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          {componentData.description}
        </p>
      </div>

      <ComponentTabs
        preview={componentData.component}
        code={componentData.rawCode}
      />
    </div>
  );
}
