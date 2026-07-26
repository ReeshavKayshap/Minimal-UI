"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBrandX } from "@tabler/icons-react";

const COMPONENT_LINKS = [
  { name: "Text Hover", slug: "text-hover" },
  { name: "Option Toggle", slug: "option-toggle" },
  { name: "Reveal Password", slug: "reveal-password" },
  { name: "Faq", slug: "faq" },
  { name: "Sidebar Menu", slug: "sidebar-menu" },
  { name: "Stamp Book Reveal", slug: "stamp-book-reveal" },
  { name: "Vercel Nav Bar", slug: "vercel-nav-bar" },
  { name: "Price Roller", slug: "price-roller" },
];

function Sidebar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({
    top: 0,
    height: 0,
    opacity: 0,
  });

  const handleMouseEnter = (
    idx: number,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    setHoveredIndex(idx);
    setHoverStyle({
      top: e.currentTarget.offsetTop,
      height: e.currentTarget.offsetHeight,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="w-56 shrink-0 hidden md:block h-full sticky top-[120px] pt-2">
      <span className="text-neutral-900 dark:text-white font-inter font-medium ">
        <Link
          href="https://x.com/rshvksyp"
          target="_blank"
          rel="noopener noreferrer"
          className="px-[10px] flex items-center gap-2 cursor-pointer"
        >
          <span className="text-neutral-900 dark:text-white ">
            <IconBrandX size={17} />
          </span>
          <span className="text-sm">Follow for updates</span>
        </Link>
      </span>

      <div className="flex flex-col w-fit relative pt-5">
        <motion.div initial="hidden" whileHover="visible" className="w-fit">
          <Link
            href="/components"
            className="px-2 py-1.5 flex items-center gap-1 overflow-hidden"
          >
            <SidebarContain />
            <span className="text-sm text-neutral-800 font-inter font-medium  dark:text-zinc-200">
              All Components
            </span>
          </Link>
        </motion.div>
        <motion.div
          className="absolute left-0 right-0 rounded-lg bg-black/5 dark:bg-white/8 pointer-events-none"
          initial={false}
          animate={{
            top: hoverStyle.top,
            height: hoverStyle.height,
            opacity: hoverStyle.opacity,
            scale: hoverStyle.opacity === 1 ? 1 : 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        />
        {COMPONENT_LINKS.map((link, idx) => {
          const isActive = pathname === `/components/${link.slug}`;
          const isHovered = hoveredIndex === idx;
          return (
            <Link
              key={link.slug}
              href={`/components/${link.slug}`}
              onMouseEnter={(e) => handleMouseEnter(idx, e)}
              onMouseLeave={handleMouseLeave}
              className={`relative px-3 py-1 text-sm rounded-lg transition-colors font-inter font-medium z-10 ${
                isActive || isHovered
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;

const SidebarContain = () => {
  return (
    <motion.div
      variants={{
        hidden: { x: -2, opacity: 0, width: 0 },
        visible: { x: 0, opacity: 1, width: 24 },
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center justify-center text-neutral-900 dark:text-white pt-0.5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 -rotate-45"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M13 3h-5v5" />
        <path d="M8 3l7.536 7.536a5 5 0 0 1 1.464 3.534v6.93" />
      </svg>
    </motion.div>
  );
};
