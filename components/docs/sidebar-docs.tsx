import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { IconCopy } from "@tabler/icons-react";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "../ui/Install-command";
import { InstallDependencies } from "../ui/Install-dependencies";

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const sidebarcode = `"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  IconLayoutSidebarRightFilled,
  IconLayoutSidebarFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  id: string | number;
  name: string;
  onClick?: () => void;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  className?: string;
}

const SOUND_URLS = [
  "https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242/tap_01.wav",
  "https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242/tap_02.wav",
  "https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242/tap_03.wav",
  "https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242/tap_04.wav",
  "https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242/tap_05.wav",
];

let audioObjects: HTMLAudioElement[] = [];

if (typeof window !== "undefined") {
  audioObjects = SOUND_URLS.map((url) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    return audio;
  });
}

const playHoverSound = () => {
  if (typeof window === "undefined" || audioObjects.length === 0) return;
  const audio = audioObjects[Math.floor(Math.random() * audioObjects.length)];
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

export default function Sidebar({
  items,
  title = "All Components",
  className,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants: Variants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-10 left-10 z-40 cursor-pointer w-[34px] h-[34px] flex items-center justify-center bg-[#080808] rounded-md backdrop-blur-md transition-colors"
        aria-label="Toggle Menu"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <IconLayoutSidebarFilled size={18} className="text-zinc-200" />
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <IconLayoutSidebarRightFilled
                size={18}
                className="text-zinc-200"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              className={cn(
                "absolute top-0 left-5 my-5 rounded-2xl w-[340px] max-w-[85vw] bg-[#0f0f0f]/95 backdrop-blur-xl border border-zinc-800/60 p-8 pt-24 shadow-2xl flex flex-col z-40",
                className,
              )}
            >
              <div className="flex-1 overflow-y-auto pr-4 pb-12 custom-scrollbar">
                <div className="relative">
                  <motion.ul className="flex flex-col relative z-10">
                    <motion.li className="relative flex items-center h-[40px]">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-px bg-zinc-200" />
                      <div className="pl-11 flex items-center">
                        <span className="text-[15px] font-inter text-zinc-100 tracking-wide">
                          {title}
                        </span>
                      </div>
                    </motion.li>

                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        onClick={item.onClick}
                        initial="initial"
                        whileHover="hover"
                        onHoverStart={playHoverSound}
                        className="relative cursor-pointer flex items-center h-[30px]"
                      >
                        <div className="absolute left-0 -top-px w-8 h-px bg-zinc-800" />
                        <motion.div
                          variants={{
                            initial: {
                              width: "2rem",
                              backgroundColor: "#27272a",
                            },
                            hover: {
                              width: "3.5rem",
                              backgroundColor: "#0ea5e9",
                            },
                          }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
                        />
                        <motion.div
                          variants={{
                            initial: { x: 0 },
                            hover: { x: 24 },
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="pl-11 flex items-center"
                        >
                          <motion.span
                            variants={{
                              initial: { color: "#a1a1aa" },
                              hover: { color: "#0ea5e9" },
                            }}
                            transition={{ duration: 0.3 }}
                            className="text-[15px] font-geist font-medium"
                          >
                            {item.name}
                          </motion.span>
                        </motion.div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
`;

export function SidebarDocs() {
  const sidebarProps = [
    {
      prop: "items",
      type: "SidebarItem[]",
      defaultValue: "[]",
      description: "Array of items to display in the sidebar. Each item requires an id, name, and optional onClick handler.",
    },
    {
      prop: "title",
      type: "string",
      defaultValue: '"All Components"',
      description: "The title displayed at the top of the sidebar menu.",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "undefined",
      description: "Optional custom CSS classes to apply to the sidebar container.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 pt-5 animate-in fade-in duration-700">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Installation
        </h2>

        <CliManualTabs
          cliContent={
            <div className="flex flex-col gap-4">
              <Step number={1} title="Run the following Command">
                <InstallCommand componentName="sidebar-menu" />
              </Step>
            </div>
          }
          manualContent={
            <div className="flex flex-col gap-2">
              <Step number={1} title="Install Package">
                <InstallDependencies
                  dependencies={["motion", "clsx", "tailwind-merge"]}
                />
              </Step>

              <Step number={2} title="Add util file">
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    lib/utils.ts
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6">
                  <CodeHighlight code={utilsCode} />
                </div>
              </Step>

              <Step number={3} title="Add the component">
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20">
                    components/ui/sidebar.tsx
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6 max-h-[450px] overflow-y-auto rounded-xl border border-white/10 relative custom-scrollbar">
                  <CodeHighlight code={sidebarcode} />
                </div>
              </Step>
            </div>
          }
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Props
        </h2>
        <PropsTable data={sidebarProps} />
      </section>
    </div>
  );
}
