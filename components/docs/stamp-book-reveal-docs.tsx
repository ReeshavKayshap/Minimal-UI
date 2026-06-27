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

const stampBookCode = `"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StampBookReveal {
  className?: string;
  title?: string;
  subtitle?: string;
  stamp1Image?: string;
  stamp2Image?: string;
}

const THEMES = [
  {
    id: "yellow",
    solid: "bg-[#eeb422]",
    glass: "bg-[#eeb422]/60",
    border: "border-[#eeb422]",
    text: "text-black",
  },
  {
    id: "pink",
    solid: "bg-[#ec407a]",
    glass: "bg-[#ec407a]/60",
    border: "border-[#ec407a]",
    text: "text-white",
  },
  {
    id: "black",
    solid: "bg-[#222222]",
    glass: "bg-[#222222]/60",
    border: "border-[#222222]",
    text: "text-white",
  },
];

export default function StampBookReveal({
  className,
  title = "things I collected",
  subtitle = "Mini Archive",
  stamp1Image = "/thumbnails/stamp1.jpg",
  stamp2Image = "/thumbnails/stamp2.jpg",
}: StampBookReveal = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);

  const isActive = isOpen || isHovered;

  const stampStyle = {
    WebkitMaskImage:
      "linear-gradient(white, white), radial-gradient(circle, transparent 3px, white 3.5px)",
    WebkitMaskSize: "calc(100% - 10px) calc(100% - 10px), 12px 12px",
    WebkitMaskPosition: "center, -6px -6px",
    WebkitMaskRepeat: "no-repeat, repeat",
    maskImage:
      "linear-gradient(white, white), radial-gradient(circle, transparent 3px, white 3.5px)",
    maskSize: "calc(100% - 10px) calc(100% - 10px), 12px 12px",
    maskPosition: "center, -6px -6px",
    maskRepeat: "no-repeat, repeat",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-30 items-center justify-center h-screen",
        className,
      )}
    >
      <div
        className="relative flex items-center justify-center w-[330px] h-[400px] cursor-pointer select-none "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full flex justify-center items-center "
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={\`absolute inset-0 rounded-4xl shadow-lg transition-colors duration-500 h-full w-full $\{activeTheme.solid}\`}
            style={{ transform: "translateZ(-1px)" }}
          />

          <motion.div
            className="absolute drop-shadow-2xl flex"
            initial={{ x: 0, y: 0, rotate: 0, z: 5 }}
            animate={{
              x: isOpen ? 140 : isHovered ? 80 : 0,
              y: isOpen ? 50 : isHovered ? -30 : 0,
              rotate: isOpen ? -4 : isHovered ? 4 : 0,
              z: isActive ? 15 : 5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 40,
              mass: 1.5,
            }}
          >
            <div
              className="h-60 w-45 bg-neutral-100 flex p-2"
              style={stampStyle}
            >
              <img
                src={stamp1Image}
                alt=""
                className="w-full h-full object-fit"
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute drop-shadow-2xl flex"
            initial={{ x: 0, y: 0, rotate: 0, z: 10 }}
            animate={{
              x: isOpen ? 290 : isHovered ? 120 : 0,
              y: isOpen ? -35 : isHovered ? -10 : 0,
              rotate: isOpen ? 4 : isHovered ? 10 : 0,
              z: isActive ? 15 : 5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 40,
              mass: 1.5,
            }}
          >
            <div
              className="h-60 w-45 bg-neutral-100 flex p-2"
              style={stampStyle}
            >
              <img
                src={stamp2Image}
                alt=""
                className="w-full h-full object-fit"
              />
            </div>
          </motion.div>

          <motion.div
            className={\`absolute inset-0 origin-left rounded-4xl backdrop-blur-xl flex flex-col justify-end py-10 px-6 
              shadow-[4px_0_20px_rgba(0,0,0,0.1)] transition-colors 
              duration-500 $\{activeTheme.glass} $\{activeTheme.text}\`}
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0, z: 15 }}
            animate={{
              rotateY: isOpen ? -55 : isHovered ? -25 : 0,
              z: isActive ? 25 : 15,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
          >
            <div className="relative" style={{ transform: "translateZ(20px)" }}>
              <h2 className=" font-geist font-semibold text-2xl mb-1">
                {title}
              </h2>
              <p className="font-medium font-geist text-sm">{subtitle}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex gap-4 relative">
        {THEMES.map((theme) => {
          const isActive = activeTheme.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme)}
              className="relative flex items-center justify-center cursor-pointer p-1"
              aria-label={\`Switch to $\{theme.id} theme\`}
            >
              {isActive && (
                <div
                  className={\`absolute inset-0 rounded-full border-2 $\{theme.border}\`}
                />
              )}
              <div className={\`size-11 rounded-full  $\{theme.solid}\`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
`;

export function StampBookRevealDocs() {
  const stampBookCodeProps = [
    {
      prop: "title",
      type: "string",
      defaultValue: "'things I collected'",
      description: "The title displayed at the top of the sidebar menu.",
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
      description:
        "Optional custom CSS classes to apply to the sidebar container.",
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

              <Step number={3} title="Add the component">
                <div className="mb-4 text-[14px] leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    components/ui/sidebar-menu.tsx
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6 rounded-xl overflow-hidden shadow-xs ring-1 ring-neutral-200 dark:ring-white/10">
                  <div className="max-h-[450px] overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={stampBookCode} />
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
        <PropsTable data={stampBookCodeProps} />
      </section>
    </div>
  );
}
