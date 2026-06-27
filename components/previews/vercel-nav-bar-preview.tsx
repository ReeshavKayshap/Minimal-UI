"use client";

import VercelNavBar from "@/components/core/Vercel-Nav-Bar";
import {
  IconActivity,
  IconCpu,
  IconStack2,
  IconLock,
  IconBook,
  IconTerminal2,
  IconUsers,
  IconWorld,
  IconSparkles,
  IconCode,
  IconBolt,
  IconGitBranch,
  IconShield,
  IconArrowRight,
  IconChevronDown,
  IconGrid4x4,
  IconShieldExclamation,
  IconFileText,
  IconSchool,
  IconMessages,
  IconRepeat,
  IconUsersGroup,
  IconHelp,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  {
    id: "products",
    label: "Products",
    hasDropdown: true,
    columns: [
      {
        title: "AI Cloud",
        items: [
          {
            name: "AI Gateway",
            desc: "One endpoint, all your models",
            icon: IconCpu,
            href: "#",
          },
          {
            name: "Sandbox",
            desc: "Isolated, safe code execution",
            icon: IconTerminal2,
            href: "#",
          },
          {
            name: "Vercel Agent",
            desc: "An agent that knows your stack",
            icon: IconSparkles,
            href: "#",
          },
        ],
      },
      {
        title: "Core Platform",
        items: [
          {
            name: "CI/CD",
            desc: "Helping teams ship 6x faster",
            icon: IconRepeat,
            href: "#",
          },
          {
            name: "Content Delivery",
            desc: "Fast, scalable, and reliable",
            icon: IconWorld,
            href: "#",
          },
          {
            name: "Fluid Compute",
            desc: "Servers, in serverless form",
            icon: IconBolt,
            href: "#",
          },
        ],
      },
      {
        title: "Security",
        items: [
          {
            name: "Bot Management",
            desc: "Scalable bot protection",
            icon: IconShield,
            href: "#",
          },
          {
            name: "BotID",
            desc: "Invisible CAPTCHA",
            icon: IconShieldExclamation,
            href: "#",
          },
          {
            name: "Platform Security",
            desc: "DDoS Protection, Firewall",
            icon: IconLock,
            href: "#",
          },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    hasDropdown: true,
    columns: [
      {
        title: "Company",
        items: [
          {
            name: "Customers",
            desc: "Trusted by the best teams",
            icon: IconUsersGroup,
            href: "#",
          },
          {
            name: "Blog",
            desc: "The latest posts and changes",
            icon: IconFileText,
            href: "#",
          },
          {
            name: "Changelog",
            desc: "See what shipped",
            icon: IconActivity,
            href: "#",
          },
          {
            name: "Press",
            desc: "Read the latest news",
            icon: IconWorld,
            href: "#",
          },
        ],
      },
      {
        title: "Learn",
        items: [
          {
            name: "Docs",
            desc: "Vercel documentation",
            icon: IconBook,
            href: "#",
          },
          {
            name: "Academy",
            desc: "Linear courses to level up",
            icon: IconSchool,
            href: "#",
          },
          {
            name: "Knowledge Base",
            desc: "Find help quickly",
            icon: IconHelp,
            href: "#",
          },
          {
            name: "Community",
            desc: "Join the conversation",
            icon: IconMessages,
            href: "#",
          },
        ],
      },
      {
        title: "Open Source",
        items: [
          {
            name: "Next.js",
            desc: "The native Next.js platform",
            icon: IconCode,
            href: "#",
          },
          {
            name: "Nuxt",
            desc: "The progressive web framework",
            icon: IconGrid4x4,
            href: "#",
          },
          {
            name: "Svelte",
            desc: "The web's efficient UI framework",
            icon: IconSparkles,
            href: "#",
          },
          {
            name: "Turborepo",
            desc: "Speed with Enterprise scale",
            icon: IconCpu,
            href: "#",
          },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    hasDropdown: true,
    columns: [
      {
        title: "Use Cases",
        items: [
          {
            name: "AI Apps",
            desc: "Deploy at the speed of AI",
            icon: IconCpu,
            href: "#",
          },
          {
            name: "Composable Commerce",
            desc: "Power storefronts that convert",
            icon: IconGrid4x4,
            href: "#",
          },
          {
            name: "Marketing Sites",
            desc: "Launch campaigns fast",
            icon: IconSparkles,
            href: "#",
          },
          {
            name: "Multi-tenant Platforms",
            desc: "Scale apps with one codebase",
            icon: IconStack2,
            href: "#",
          },
        ],
      },
      {
        title: "Tools",
        items: [
          {
            name: "Marketplace",
            desc: "Extend and automate workflows",
            icon: IconGrid4x4,
            href: "#",
          },
          {
            name: "Templates",
            desc: "Jumpstart app development",
            icon: IconCode,
            href: "#",
          },
          {
            name: "Partner Finder",
            desc: "Get help from solution partners",
            icon: IconUsers,
            href: "#",
          },
          {
            name: "Turborepo",
            desc: "Speed with Enterprise scale",
            icon: IconCpu,
            href: "#",
          },
        ],
      },
      {
        title: "Users",
        items: [
          {
            name: "Platform Engineers",
            desc: "Automate away repetition",
            icon: IconGitBranch,
            href: "#",
          },
          {
            name: "Design Engineers",
            desc: "Deploy for every idea",
            icon: IconSparkles,
            href: "#",
          },
        ],
      },
    ],
  },
  { id: "enterprise", label: "Enterprise", hasDropdown: false, href: "#" },
  { id: "pricing", label: "Pricing", hasDropdown: false, href: "#" },
];

export default function VercelNavBarPreview() {
  return (
    <div className="w-full ">
      <VercelNavBar navItems={NAV_ITEMS} />
    </div>
  );
}
