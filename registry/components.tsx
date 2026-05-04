import dynamic from "next/dynamic";

export type ComponentDefinition = {
  title: string;
  description: string;
  preview: React.ComponentType;
  docs: React.ComponentType;
  previewFileName: string;
};

export const COMPONENT_REGISTRY: Record<string, ComponentDefinition> = {
  "text-hover": {
    title: "Text Hover",
    description:
      "A magical text effect that repels particles on mouse movement.",
    preview: dynamic(() => import("@/components/previews/texthover-preview")),
    docs: dynamic(() =>
      import("@/components/docs/texthover-docs").then(
        (mod) => mod.TextHoverDocs,
      ),
    ),
    previewFileName: "texthover-preview.tsx",
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
  "sidebar-menu": {
    title: "Sidebar Menu",
    description: "A collapsible sidebar menu with fluid spring animations.",
    preview: dynamic(() => import("@/components/previews/sidebar-preview")),
    docs: dynamic(() =>
      import("@/components/docs/sidebar-docs").then((mod) => mod.SidebarDocs),
    ),
    previewFileName: "sidebar-preview.tsx",
  },
  "stamp-book-reveal": {
    title: "Stamp Book Reveal",
    description:
      "A charming stamp book animation with interactive page-flipping and stamp collection.",
    preview: dynamic(
      () => import("@/components/previews/stamp-book-reveal-preview"),
    ),
    docs: dynamic(() =>
      import("@/components/docs/stamp-book-reveal-docs").then(
        (mod) => mod.StampBookRevealDocs,
      ),
    ),
    previewFileName: "stamp-book-reveal-preview.tsx",
  },
};
