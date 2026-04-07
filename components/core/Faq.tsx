"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  title: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    title: "What is Interaction Design?",
    answer:
      "Designing how users interact with digital interfaces with intuitive experiences. It focuses on how users engage with technology and aims to create meaningful interactions.",
  },
  {
    id: 2,
    title: "Principles & Patterns",
    answer:
      "Fundamental guidelines and repeated solutions that ensure consistency and usability in design. Patterns are reusable solutions to common design problems.",
  },
  {
    id: 3,
    title: "Usability & Accessibility",
    answer:
      "Focusing on making digital designs easy to use and accessible for everyone, including those with disabilities. Both are critical for a successful product.",
  },
  {
    id: 4,
    title: "Prototyping & Testing",
    answer:
      "Prototyping involves creating interactive mockups of your design. Testing these prototypes with real users helps identify friction points before development begins.",
  },
  {
    id: 5,
    title: "UX Optimisation",
    answer:
      "Improving the overall user experience by enhancing usability and satisfaction based on user feedback, analytics, and performance metrics.",
  },
];

const spring = {
  type: "spring" as const,
  stiffness: 250,
  damping: 19,
};

export default function FAQAccordion() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const getItemStyles = (index: number, isActive: boolean) => {
    const activeIndex = FAQS.findIndex((f) => f.id === activeId);
    const isFirst = index === 0;
    const isLast = index === FAQS.length - 1;
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
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[480px]">
        {FAQS.map((faq, index) => {
          const isActive = activeId === faq.id;
          const activeIndex = FAQS.findIndex((f) => f.id === activeId);
          const showDivider =
            activeIndex === -1
              ? index !== FAQS.length - 1
              : index !== activeIndex - 1 &&
                index !== activeIndex &&
                index !== FAQS.length - 1;

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
                className={`
                relative overflow-hidden cursor-pointer bg-white border-x border-gray-200
                ${isActive ? "z-10" : "z-0 hover:bg-gray-50/50"}
              `}
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
    </div>
  );
}
