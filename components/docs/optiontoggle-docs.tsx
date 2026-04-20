import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { IconCopy } from "@tabler/icons-react";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "../ui/Install-command";

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const optionToggleCode = `"use client";
import { useState, useRef, useEffect, type ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface ToggleOption {
  value: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}

export interface OptionToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ICON_SIZE = 22;

const dropDownVariants = {
  initial: { opacity: 0, scale: 1.1, y: 8, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.1, y: 8, filter: "blur(8px)" },
};

const iconTransitionVariants = {
  initial: { opacity: 0, filter: "blur(2px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(2px)" },
};

const wordContainerVariants = {
  animate: { transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const letterVariants = {
  initial: { opacity: 0, y: 2, filter: "blur(1px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -2, filter: "blur(1px)" },
};

const dropDownSpring = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  delay: 0.1,
} as const;
const buttonSpring = { duration: 0.3, ease: "easeOut" } as const;
const widthSpring = { type: "spring", stiffness: 400, damping: 30 } as const;
const chevronSpring = { type: "spring", stiffness: 300, damping: 20 } as const;

export default function OptionToggle({
  options,
  value,
  onChange,
  className,
}: OptionToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const current = options.find((o) => o.value === value) || options[0];
  const CurrentIcon = current.icon;
  const currentLabelLetters = current.label.slice(1).split("");

  const dynamicWidth = currentLabelLetters.length * 8.5;

  const renderDropdownOption = (option: ToggleOption, i: number) => {
    const Icon = option.icon;
    const active = value === option.value;
    const borderRadius =
      i === 0 ? "rounded-r-lg rounded-l-3xl" : "rounded-l-lg rounded-r-3xl";

    return (
      <div key={option.value} className="flex items-center">
        {i > 0 && <div className="w-0.5 h-6 bg-gray-100 mx-1" />}

        <button
          onClick={() => handleSelect(option.value)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full text-lg transition-colors duration-200",
            active
              ? "text-gray-900 bg-gray-50/50"
              : "text-gray-400 hover:text-gray-600",
          )}
        >
          <div
            className={cn(
              "bg-neutral-100 flex items-center gap-2 px-4 py-2.5",
              borderRadius,
            )}
          >
            <motion.span
              className="flex items-center gap-2"
              whileTap={{ scale: 1.09 }}
            >
              <Icon size={ICON_SIZE} strokeWidth={active ? 2.5 : 2} />
              {option.label}
            </motion.span>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div
      className={cn("flex items-center justify-center font-geist", className)}
    >
      <div className="relative flex flex-col items-center" ref={menuRef}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropDownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={dropDownSpring}
              className="absolute bottom-full mb-3 flex items-center bg-white p-px rounded-full border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] origin-bottom z-10"
            >
              {options.map(renderDropdownOption)}

              <div className="absolute -bottom-[5.5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45 z-[-1]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected State Trigger Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={buttonSpring}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 w-full cursor-pointer hover:bg-[#EAEAEA] active:bg-[#EAEAEA] text-gray-800 rounded-full text-lg transition-colors",
            isOpen ? "bg-[#EAEAEA]" : "bg-[#F0F0F0]",
          )}
        >
          {/* Active Option Icon */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={value}
              variants={iconTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="flex items-center"
            >
              <CurrentIcon size={ICON_SIZE} strokeWidth={2.5} />
            </motion.div>
          </AnimatePresence>

          {/* Animated Active Text Label */}
          <span className="flex">
            <span>{current.label[0]}</span>

            <motion.div
              initial={false}
              animate={{ width: dynamicWidth }}
              transition={widthSpring}
              className="relative flex items-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={value}
                  variants={wordContainerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 flex"
                >
                  {currentLabelLetters.map((char, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </span>

          {/* Chevron Indicator */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={chevronSpring}
          >
            <IconChevronDown
              size={ICON_SIZE}
              className="text-gray-500"
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
`;

export function OptionToggleDocs() {
  const optionToggleProps = [
    {
      prop: "options",
      type: "{ value: string; label: string }[]",
      defaultValue: "[]",
      description: "The options to display in the toggle.",
    },
    {
      prop: "value",
      type: "string",
      defaultValue: '""',
      description: "The currently selected value.",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      defaultValue: "-",
      description: "Callback when an option is selected.",
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
                <InstallCommand componentName="option-toggle" />
              </Step>
            </div>
          }
          manualContent={
            <div className="flex flex-col gap-2">
              <Step number={1} title="Install Package">
                <div className="flex items-center justify-between bg-zinc-900 px-4 py-4.5 rounded-md border border-white/10 group">
                  <code className="font-mono text-[16px] text-zinc-300">
                    npm install framer-motion clsx tailwind-merge
                  </code>
                  <button className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer">
                    <IconCopy size={16} />
                  </button>
                </div>
              </Step>

              <Step number={2} title="Add util file">
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20">
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
                    components/ui/option-toggle.tsx
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6 max-h-[450px] overflow-y-auto rounded-xl border border-white/10 relative custom-scrollbar">
                  <CodeHighlight code={optionToggleCode} />
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
        <PropsTable data={optionToggleProps} />
      </section>
    </div>
  );
}
