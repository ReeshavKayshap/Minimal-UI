"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

import { ComponentTabs } from "@/components/ui/Component-tabs";
import RepulsioText from "@/components/core/RepulsioText";
import { ReactNode } from "react";
import Sidebar from "@/components/core/Sidebar";
import OptionToggle from "@/components/core/OptionToggle";
import RevealPassword from "@/components/core/RevealPassword";
import FAQAccordion from "@/components/core/Faq";

import { RepulsioDocs } from "@/components/docs/repulsio-docs";

interface ComponentDefinition {
  title: string;
  description: string;
  badge?: string;
  component: () => ReactNode;
  rawCode: string;
  docs?: ReactNode; // ⭐️ ADDED: Optional docs property
}

const auroraCodeString = `import React from "react";\n\nexport function AuroraHero() {\n  return (\n    <div className="w-full h-[450px] rounded-xl bg-linear-to-br from-indigo-500 flex items-center justify-center hover:scale-[1.02] transition-transform">\n      <h2>Interactive Shader</h2>\n    </div>\n  );\n}`;
const repulsioCodeString = `"use client";\nimport { useRef, useEffect } from "react";\n\nexport default function RepulsioText() {\n  return <div>Repulsio Code</div>\n}`;

const COMPONENT_REGISTRY: Record<string, ComponentDefinition> = {
  "repulsio-text": {
    title: "Repulsion Text",
    description:
      "An interactive particle text effect that scatters away from the mouse cursor.",
    component: () => (
      <RepulsioText
        text="Hover Me"
        fontFamily="geist, sans-serif"
        dotRadius={2.5}
        repulseRadius={90}
        repulseForce={6}
        springForce={0.08}
        friction={0.82}
      />
    ),
    rawCode: repulsioCodeString,
    docs: <RepulsioDocs />,
  },
  "option-toggle": {
    title: "OptionToggle",
    description: "A beautiful glowing option toggle.",
    component: () => <OptionToggle />,
    rawCode: auroraCodeString,
  },
  "reveal-password": {
    title: "RevealPassword",
    description: "Reveal password with 3D flip animation.",
    component: () => <RevealPassword />,
    rawCode: auroraCodeString,
  },
  faq: {
    title: "Faq",
    description: "Accordion FAQ with smooth animations.",
    component: () => <FAQAccordion />,
    rawCode: auroraCodeString,
  },
  "sidebar-menu": {
    title: "Sidebar",
    description: "A beautiful glowing sidebar menu.",
    badge: "Hero Section",
    component: () => <Sidebar />,
    rawCode: auroraCodeString,
  },
};

export default function ComponentPage() {
  const params = useParams();
  const slug = params.slug as string;
  const componentData = COMPONENT_REGISTRY[slug];

  if (!componentData) notFound();

  return (
    <div key={slug}>
      <div className="flex flex-col gap-2 pb-6 pt-1">
        <h1 className="text-4xl md:text-3xl font-inter font-semibold text-neutral-900 dark:text-zinc-100 tracking-tight">
          {componentData.title}
        </h1>

        <p className="text-[17.3px] text-neutral-500 font-inter dark:text-zinc-400 max-w-2xl leading-relaxed">
          {componentData.description}
        </p>
      </div>

      <ComponentTabs
        preview={componentData.component()}
        code={componentData.rawCode}
      />

      {/* ⭐️ ADDED: The Docs Section renders here if it exists in the registry ⭐️ */}
      {componentData.docs && <div className="mt-12">{componentData.docs}</div>}
    </div>
  );
}
