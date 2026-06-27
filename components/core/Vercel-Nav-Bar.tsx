"use client";

import { useState, useRef } from "react";
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
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [coords, setCoords] = useState({ left: 0, width: 0 });
  //   const [dropdownLeft, setDropdownLeft] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const navContainerRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const springConfig = {
    type: "spring" as const,
    stiffness: 480,
    damping: 30,
  };

  const contentVariants = {
    enter: (direction: "left" | "right" | null) => ({
      opacity: 0,
      x: direction === "right" ? 140 : direction === "left" ? -140 : 0,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: "left" | "right" | null) => ({
      opacity: 0,

      x: direction === "right" ? -140 : direction === "left" ? 140 : 0,
    }),
  };

  const handleTabHover = (tabId: string) => {
    const tabEl = tabRefs.current[tabId];
    const containerEl = navContainerRef.current;

    if (tabEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();

      const tabLeftRelative = tabRect.left - containerRect.left;

      setCoords({
        left: tabLeftRelative,
        width: tabRect.width,
      });

      const dropdownWidth = 760;
      const containerWidth = containerRect.width;
      const tabCenter = tabLeftRelative + tabRect.width / 2;

      let targetLeft = tabCenter - dropdownWidth / 2;
      targetLeft = Math.max(
        -100,
        Math.min(targetLeft, containerWidth - dropdownWidth + 100),
      );
    }

    const currentIndex = navItems.findIndex((item) => item.id === tabId);
    const prevIndex = navItems.findIndex((item) => item.id === activeTab);

    if (activeTab && currentIndex !== -1 && prevIndex !== -1) {
      setDirection(currentIndex > prevIndex ? "right" : "left");
    } else {
      setDirection(null);
    }

    setHoveredTab(tabId);
    if (navItems.find((item) => item.id === tabId)?.hasDropdown) {
      setActiveTab(tabId);
    } else {
      setActiveTab(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
    setActiveTab(null);
  };

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
              ref={navContainerRef}
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
                    transition={springConfig}
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center gap-1 relative z-10 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[item.id] = el;
                    }}
                    onMouseEnter={() => handleTabHover(item.id)}
                    className={`relative px-4 py-1.5 cursor-pointer text-[15px] font-geist font-medium transition-colors duration-200 flex items-center gap-1 rounded-full outline-none
                      ${hoveredTab === item.id || activeTab === item.id ? "dark:text-white text-neutral-800" : "text-neutral-400"}
                    `}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <IconChevronDown
                        className={`size-4 opacity-60 mt-0.5 transition-transform duration-300 ${activeTab === item.id ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {activeTab && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    transition={{
                      ...springConfig,
                      opacity: { duration: 0.15 },
                      scale: { duration: 0.15 },
                      filter: { duration: 0.12 },
                    }}
                    className="absolute top-full -left-20 pt-4 z-50 origin-top pointer-events-auto"
                    style={{ width: "780px" }}
                  >
                    <motion.div
                      className="w-full dark:bg-zinc-950/90 bg-neutral-200/70 border dark:border-zinc-800/80 border-neutral-300/80 rounded-2xl 
                     shadow-2xl shadow-black/20 dark:shadow-black/30 backdrop-blur-3xl overflow-hidden relative"
                    >
                      <div
                        className="absolute inset-0 
                       bg-[radial-gradient(#27272a_1px,transparent_1px)]
                       bg-size-[16px_16px] opacity-5 pointer-events-none"
                      />

                      <div className="relative overflow-hidden w-full p-4">
                        <AnimatePresence
                          mode="popLayout"
                          initial={false}
                          custom={direction}
                        >
                          <motion.div
                            key={activeTab}
                            custom={direction}
                            variants={contentVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              x: springConfig,
                              opacity: { duration: 0.08 },
                            }}
                            className="grid grid-cols-3 gap-6 w-full"
                          >
                            {navItems
                              .find((item) => item.id === activeTab)
                              ?.columns?.map((col) => (
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
                                          <div
                                            className="mt-0.5 p-1.5 bg-neutral-300 dark:bg-zinc-900 rounded-lg group-hover:bg-neutral-300
                                         dark:group-hover:bg-zinc-800 transition-colors"
                                          >
                                            <Icon className="w-3.5 h-3.5 text-zinc-600 dark:group-hover:text-white transition-colors" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div
                                              className="text-sm font-medium font-inter dark:text-zinc-300 text-neutral-800
                                           group-hover:text-neutral-800 dark:group-hover:text-white flex items-center gap-1 transition-colors"
                                            >
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
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </div>

          {actions || (
            <div className="flex items-center gap-3 font-geist">
              <button
                className="text-sm cursor-pointer font-medium text-neutral-400
               dark:hover:text-white hover:text-neutral-800 px-3.5 py-1.5 transition-colors"
              >
                Contact
              </button>
              <button
                className="text-sm cursor-pointer font-medium text-neutral-900 dark:text-neutral-100 dark:hover:text-white hover:text-neutral-800
                px-3.5 py-1.5 border border-neutral-300  dark:border-zinc-800 dark:hover:border-zinc-700 hover:border-neutral-400/70
                 bg-white dark:bg-zinc-900/40 rounded-full transition-all"
              >
                Log In
              </button>
              <button
                className="text-sm cursor-pointer font-medium bg-neutral-900 dark:bg-white text-neutral-100 dark:text-black
               hover:bg-neutral-800 dark:hover:bg-zinc-100 px-4 py-1.5 rounded-full  transition-all"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
