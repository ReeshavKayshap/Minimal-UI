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

const Faq = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";

export interface FAQItem {
  id: string | number;
  title: string;
  answer: React.ReactNode;
}

export interface FAQAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FAQItem[];
}

const spring = {
  type: "spring" as const,
  stiffness: 250,
  damping: 19,
};

export default function FAQAccordion({
  items,
  className,
  ...props
}: FAQAccordionProps) {
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const getItemStyles = (index: number, isActive: boolean) => {
    const activeIndex = items.findIndex((f) => f.id === activeId);
    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const noActive = activeIndex === -1;

    const roundTop = noActive
      ? isFirst
      : isFirst || index === activeIndex || index === activeIndex + 1;

    const roundBottom = noActive
      ? isLast
      : index === activeIndex - 1 || index === activeIndex || isLast;

    return {
      animateStyles: {
        marginTop: isActive && !isFirst ? 12 : 0,
        marginBottom: isActive && !isLast ? 12 : 0,
        borderTopLeftRadius: roundTop ? 24 : 0,
        borderTopRightRadius: roundTop ? 24 : 0,
        borderBottomLeftRadius: roundBottom ? 24 : 0,
        borderBottomRightRadius: roundBottom ? 24 : 0,
        boxShadow: isActive
          ? "0px 12px 32px rgba(0, 0, 0, 0.05)"
          : "0px 0px 0px rgba(0, 0, 0, 0)",
      },
      roundTop,
      roundBottom,
    };
  };

  return (
    <div className={cn("w-full max-w-[480px]", className)} {...props}>
      {items.map((faq, index) => {
        const isActive = activeId === faq.id;
        const activeIndex = items.findIndex((f) => f.id === activeId);
        const showDivider =
          activeIndex === -1
            ? index !== items.length - 1
            : index !== activeIndex - 1 &&
              index !== activeIndex &&
              index !== items.length - 1;

        const { animateStyles, roundTop, roundBottom } = getItemStyles(index, isActive);

        return (
          <AnimatePresence key={faq.id}>
            <motion.div
              layout
              onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
              initial={false}
              animate={animateStyles}
              transition={spring}
              exit={spring}
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderTopColor: roundTop ? undefined : "transparent",
                borderBottomColor: roundBottom ? undefined : "transparent",
              }}
              className={cn(
                "relative overflow-hidden cursor-pointer bg-white dark:bg-neutral-950 border-x border-gray-200 dark:border-neutral-800",
                isActive
                  ? "z-10"
                  : "z-0 hover:bg-gray-50/50 dark:hover:bg-[#111111]",
              )}
            >
              <div className="flex items-center justify-between p-4 sm:p-5 relative">
                <h3 className="text-base font-medium text-gray-800 dark:text-zinc-200 select-none">
                  {faq.title}
                </h3>

                <motion.div
                  initial={false}
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={spring}
                  className="text-gray-400"
                >
                  <IconChevronDown
                    size={20}
                    className="text-gray-800 dark:text-zinc-200"
                  />
                </motion.div>

                {/* <motion.div
                  initial={false}
                  animate={{ opacity: showDivider ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 left-4 sm:left-5 right-4 sm:right-5 h-px bg-gray-200"
                /> */}
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-5 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}
`;

export function FaqDocs() {
  const faqProps = [
    {
      prop: "items",
      type: "{ id: string | number; title: string; answer: React.ReactNode }[]",
      defaultValue: "undefined",
      description: "Array of FAQ items containing a title and answer.",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: '""',
      description: "Optional CSS classes to style the outer container.",
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
                <InstallCommand componentName="faq" />
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

              <Step number={3} title="Add the Component ">
                <div className="mb-4 text-[14px] leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    components/ui/faq.tsx
                  </code>
                  and paste this code.
                </div>

                <div className="mb-6 rounded-xl overflow-hidden shadow-xs ring-1 ring-neutral-200 dark:ring-white/10">
                  <div className="max-h-[450px] overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={Faq} />
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
        <PropsTable data={faqProps} />
      </section>
    </div>
  );
}
