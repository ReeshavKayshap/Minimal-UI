"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

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
      marginTop: isActive && !isFirst ? 12 : 0,
      marginBottom: isActive && !isLast ? 12 : 0,
      borderTopLeftRadius: roundTop ? 24 : 0,
      borderTopRightRadius: roundTop ? 24 : 0,
      borderBottomLeftRadius: roundBottom ? 24 : 0,
      borderBottomRightRadius: roundBottom ? 24 : 0,
      borderTopColor: roundTop ? "#e5e7eb" : "rgba(229, 231, 235, 0)",
      borderBottomColor: roundBottom ? "#e5e7eb" : "rgba(229, 231, 235, 0)",
      boxShadow: isActive
        ? "0px 12px 32px rgba(0, 0, 0, 0.05)"
        : "0px 0px 0px rgba(0, 0, 0, 0)",
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

        return (
          <AnimatePresence key={faq.id}>
            <motion.div
              layout
              onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
              initial={false}
              animate={getItemStyles(index, isActive)}
              transition={spring}
              exit={spring}
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
              }}
              className={cn(
                "relative overflow-hidden cursor-pointer bg-white border-x border-gray-200",
                isActive ? "z-10" : "z-0 hover:bg-gray-50/50",
              )}
            >
              <div className="flex items-center justify-between p-4 sm:p-5 relative">
                <h3 className="text-base font-medium text-gray-800 select-none">
                  {faq.title}
                </h3>

                <motion.div
                  initial={false}
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={spring}
                  className="text-gray-400"
                >
                  ▼
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: showDivider ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 left-4 sm:left-5 right-4 sm:right-5 h-px bg-gray-200"
                />
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
                    <div className="px-4 sm:px-5 pb-5 text-gray-500 text-sm leading-relaxed">
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
