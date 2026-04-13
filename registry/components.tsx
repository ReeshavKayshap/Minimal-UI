import dynamic from "next/dynamic";

export type ComponentDefinition = {
  title: string;
  description: string;
  preview: React.ComponentType;
  docs: React.ComponentType;
  previewFileName: string;
};

export const COMPONENT_REGISTRY: Record<string, ComponentDefinition> = {
  "repulsio-text": {
    title: "Repulsio Text",
    description:
      "A magical text effect that repels particles on mouse movement.",
    preview: dynamic(() => import("@/components/previews/repulsio-preview")),
    docs: dynamic(() =>
      import("@/components/docs/repulsio-docs").then((mod) => mod.RepulsioDocs),
    ),
    previewFileName: "repulsio-preview.tsx",
  },
  "option-toggle": {
    title: "Option Toggle",
    description: "A smooth, animated toggle switch using Framer Motion.",
    preview: dynamic(
      () => import("@/components/previews/optiontoggle-preview"),
    ),
    docs: dynamic(() =>
      import("@/components/docs/optiontoggle-docs").then(
        (mod) => mod.OptionToggleDocs,
      ),
    ),
    previewFileName: "optiontoggle-preview.tsx",
  },
  "reveal-password": {
    title: "Reveal Password",
    description: "A smooth, animated toggle switch using Framer Motion.",
    preview: dynamic(
      () => import("@/components/previews/revealpassword-preview"),
    ),
    docs: dynamic(() =>
      import("@/components/docs/revealpassword-docs").then(
        (mod) => mod.RevealPasswordDocs,
      ),
    ),
    previewFileName: "revealpassword-preview.tsx",
  },
  faq: {
    title: "FAQ Accordion",
    description:
      "A sleek, motion-driven accordion for frequently asked questions.",
    preview: dynamic(() => import("@/components/previews/faq.preview")),
    docs: dynamic(() =>
      import("@/components/docs/faq-doc").then((mod) => mod.FaqDocs),
    ),
    previewFileName: "faq.preview.tsx",
  },
};
