import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "@/components/ui/Install-command";
import { InstallDependencies } from "@/components/ui/Install-dependencies";

export const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

export const VercelNavBarCode = `"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";

export type SubItem = {
  name: string;
  desc: string;
  icon: React.ElementType;
  href: string;
};

export type Column = {
  title: string;
  items: SubItem[];
};

export type NavItem = {
  id: string;
  label: string;
  hasDropdown: boolean;
  href?: string;
  columns?: Column[];
};

export interface VercelNavBarProps {
  navItems?: NavItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function VercelNavBar({
  navItems = [],
  logo,
  actions,
}: VercelNavBarProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const visibleRef = useRef(false);
  const [translateX, setTranslateX] = useState(0);
  const [isAppearing, setIsAppearing] = useState(true);

  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [coords, setCoords] = useState({ left: 0, width: 0 });

  const dropdownItems = navItems.filter(
    (item) => item.hasDropdown && item.columns && item.columns.length > 0,
  );

  const reveal = useCallback((index: number, itemId: string) => {
    const targetX = -index * 780;

    if (!visibleRef.current) {
      setIsAppearing(true);
      visibleRef.current = true;
    } else {
      setIsAppearing(false);
    }

    setTranslateX(targetX);
    setActiveTab(itemId);
    setVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    visibleRef.current = false;
    setVisible(false);
    setActiveTab(null);
  }, []);

  const handleTabHover = useCallback(
    (itemId: string) => {
      const tabEl = btnRefs.current[itemId];
      const containerEl = wrapperRef.current;

      if (tabEl && containerEl) {
        const containerRect = containerEl.getBoundingClientRect();
        const tabRect = tabEl.getBoundingClientRect();
        setCoords({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
      }

      setHoveredTab(itemId);

      const dropdownIndex = dropdownItems.findIndex(
        (item) => item.id === itemId,
      );
      if (dropdownIndex !== -1) {
        reveal(dropdownIndex, itemId);
      } else {
        hideTooltip();
      }
    },
    [dropdownItems, reveal, hideTooltip],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredTab(null);
    hideTooltip();
  }, [hideTooltip]);

  return (
    <div className="h-full w-full">
      <header
        className="relative z-50 border-b border-zinc-200/80 dark:border-zinc-800/80
       bg-[#F0F0F0] dark:bg-neutral-950 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {logo || (
              <a href="#" className="flex items-center gap-2.5 group">
                <span className="font-medium font-inter text-2xl tracking-tight hidden sm:inline-block">
                  Minimal UI
                </span>
              </a>
            )}

            <nav
              ref={wrapperRef}
              onMouseLeave={handleMouseLeave}
              className="relative hidden md:flex items-center"
            >
              <AnimatePresence>
                {hoveredTab && (
                  <motion.div
                    layoutId="hoverBackdrop"
                    className="absolute bg-neutral-200/70 dark:bg-zinc-800/40 rounded-full z-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      left: coords.left,
                      width: coords.width,
                      height: "34px",
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center gap-1 relative z-10 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      btnRefs.current[item.id] = el;
                    }}
                    onMouseEnter={() => handleTabHover(item.id)}
                    onFocus={() => handleTabHover(item.id)}
                    className={\`relative px-4 py-1.5 cursor-pointer text-[15px] font-geist font-medium transition-colors duration-200 flex items-center gap-1 rounded-full outline-none
                      \${hoveredTab === item.id || activeTab === item.id ? "dark:text-white text-neutral-800" : "text-neutral-400"}\
                    \`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <IconChevronDown
                        className={\`size-4 opacity-60 mt-0.5 transition-transform duration-300 \${activeTab === item.id ? "rotate-180" : ""}\`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* ── Fixed Dropdown Container Shell (STAYS IN PLACE) ── */}
              <div
                className={\`absolute top-full -left-20 pt-4 z-50 \${
                  visible ? "pointer-events-auto" : "pointer-events-none"
                }\`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.98,
                    filter: visible ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{
                    opacity: { duration: 0.15 },
                    scale: { duration: 0.15 },
                    filter: { duration: 0.12 },
                  }}
                  className="w-195 dark:bg-zinc-950/90 bg-neutral-200/70 border dark:border-zinc-800/80 border-neutral-300/80 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/30 backdrop-blur-3xl overflow-hidden relative pointer-events-auto"
                >
                  {/* ── Sliding Content Rail (EASE ANIMATION) ── */}
                  <motion.div
                    animate={{ x: translateX }}
                    transition={{
                      x: { duration: isAppearing ? 0 : 0.3, ease: "easeOut" },
                    }}
                    className="flex w-max relative z-1"
                  >
                    {dropdownItems.map((item) => (
                      <div key={item.id} className="w-195 shrink-0 p-6">
                        <div className="grid grid-cols-3 gap-6 w-full">
                          {item.columns?.map((col) => (
                            <div key={col.title} className="space-y-4">
                              <h3 className="text-[11px] font-bold tracking-widest font-inter dark:text-zinc-400 text-neutral-500 uppercase px-2">
                                {col.title}
                              </h3>

                              <div className="space-y-1">
                                {col.items.map((subItem) => {
                                  const Icon = subItem.icon;
                                  return (
                                    <a
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="flex items-start gap-3 p-2 rounded-xl dark:hover:bg-zinc-900/60 hover:bg-neutral-200 transition-colors group"
                                    >
                                      <div className="mt-0.5 p-1.5 bg-neutral-300 dark:bg-zinc-900 rounded-lg group-hover:bg-neutral-300 dark:group-hover:bg-zinc-800 transition-colors">
                                        <Icon className="w-3.5 h-3.5 text-zinc-600 dark:group-hover:text-white transition-colors" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium font-inter dark:text-zinc-300 text-neutral-800 group-hover:text-neutral-800 dark:group-hover:text-white flex items-center gap-1 transition-colors">
                                          {subItem.name}
                                          <IconArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 text-zinc-400" />
                                        </div>
                                        <p className="text-xs font-geist text-zinc-500 mt-0.5 line-clamp-1 group-hover:text-zinc-400 transition-colors">
                                          {subItem.desc}
                                        </p>
                                      </div>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </nav>
          </div>

          {actions || (
            <div className="flex items-center gap-3 font-geist">
              <button className="text-sm cursor-pointer font-medium text-neutral-400 dark:hover:text-white hover:text-neutral-800 px-3.5 py-1.5 transition-colors">
                Contact
              </button>
              <button className="text-sm cursor-pointer font-medium text-neutral-900 dark:text-neutral-100 dark:hover:text-white hover:text-neutral-800 px-3.5 py-1.5 border border-neutral-300 dark:border-zinc-800 dark:hover:border-zinc-700 hover:border-neutral-400/70 bg-white dark:bg-zinc-900/40 rounded-full transition-all">
                Log In
              </button>
              <button className="text-sm cursor-pointer font-medium bg-neutral-900 dark:bg-white text-neutral-100 dark:text-black hover:bg-neutral-800 dark:hover:bg-zinc-100 px-4 py-1.5 rounded-full transition-all">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}`;

export function VercelNavBarDocs() {
  const vercelNavBarProps = [
    {
      prop: "navItems",
      type: "NavItem[]",
      defaultValue: "[]",
      description: "Array of navigation items, each with optional columns and subItems for dropdown menus.",
    },
    {
      prop: "logo",
      type: "ReactNode",
      defaultValue: "null",
      description: "Custom logo element displayed on the left side of the navbar.",
    },
    {
      prop: "actions",
      type: "ReactNode",
      defaultValue: "null",
      description: "Custom action elements (e.g., Log In / Sign Up buttons) displayed on the right.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 pt-5 animate-in fade-in duration-700">
      <section>
        <h2
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-6
         border-b border-neutral-200 dark:border-white/10 pb-2"
        >
          Installation
        </h2>

        <CliManualTabs
          cliContent={
            <div className="flex flex-col gap-4">
              <Step number={1} title="Run the following Command">
                <InstallCommand componentName="vercel-nav-bar" />
              </Step>
            </div>
          }
          manualContent={
            <div className="flex flex-col gap-2">
              <Step number={1} title="Install Package">
                <InstallDependencies
                  dependencies={[
                    "motion",
                    "@tabler/icons-react",
                    "clsx",
                    "tailwind-merge",
                  ]}
                />
              </Step>

              <Step number={2} title="Add util file">
                <div className="mb-4 text-[14px]  leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    lib/utils.ts
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6 rounded-xl overflow-hidden shadow-xs ring-1 ring-neutral-200 dark:ring-white/10">
                  <div className="overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={utilsCode} withBottomBlur={false} />
                  </div>
                </div>
              </Step>

              <Step number={3} title="Copy the source code">
                <div className="mb-4 text-[14px] leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    components/ui/vercel-nav-bar.tsx
                  </code>
                  and paste this code.
                </div>

                <div className="mb-6 rounded-xl overflow-hidden shadow-xs ring-1 ring-neutral-200 dark:ring-white/10">
                  <div className="max-h-112.5 overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={VercelNavBarCode} />
                  </div>
                </div>
              </Step>
            </div>
          }
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 border-b border-neutral-200 dark:border-white/10 pb-2">
          Props
        </h2>
        <PropsTable data={vercelNavBarProps} />
      </section>
    </div>
  );
}
