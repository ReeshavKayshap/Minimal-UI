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
      "Text that breaks apart into individual particles which respond and shift as the mouse moves over them.",
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
    description: "An option toggle with smooth animation.",
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
    description:
      "A password field that reveals the hidden characters using a 3D flip transition.",
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
      "An accordion-style FAQ section with smooth expand/collapse animations.",
    preview: dynamic(() => import("@/components/previews/faq.preview")),
    docs: dynamic(() =>
      import("@/components/docs/faq-doc").then((mod) => mod.FaqDocs),
    ),
    previewFileName: "faq.preview.tsx",
  },
  "sidebar-menu": {
    title: "Sidebar Menu",
    description:
      "A collapsible sidebar navigation menu with interactive hover states on its items.",
    preview: dynamic(() => import("@/components/previews/sidebar-preview")),
    docs: dynamic(() =>
      import("@/components/docs/sidebar-docs").then((mod) => mod.SidebarDocs),
    ),
    previewFileName: "sidebar-preview.tsx",
  },
  "stamp-book-reveal": {
    title: "Stamp Book Reveal",
    description:
      "A page/content reveal animation styled like flipping through a stamp book.",
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
  "vercel-nav-bar": {
    title: "Vercel Nav Bar",
    description:
      "A navigation bar modeled after Vercel's design, featuring dropdown submenus.",
    preview: dynamic(
      () => import("@/components/previews/vercel-nav-bar-preview"),
    ),
    docs: dynamic(() =>
      import("@/components/docs/vercel-nav-bar-docs").then(
        (mod) => mod.VercelNavBarDocs,
      ),
    ),
    previewFileName: "vercel-nav-bar-preview.tsx",
  },
  "price-roller": {
    title: "Price Roller",
    description: "A pricing display that animates numbers rolling into place.",
    preview: dynamic(
      () => import("@/components/previews/price-roller-preview"),
    ),
    docs: dynamic(() =>
      import("@/components/docs/price-roller-docs").then(
        (mod) => mod.PriceRollerDocs,
      ),
    ),
    previewFileName: "price-roller-preview.tsx",
  },
};
