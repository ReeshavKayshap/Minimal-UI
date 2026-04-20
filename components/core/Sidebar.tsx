"use client";
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
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative h-full w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-10 left-10 z-40 cursor-pointer p-2 bg-[#0F0F0F] rounded-md backdrop-blur-md transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <IconLayoutSidebarFilled size={18} className="text-zinc-200" />
        ) : (
          <IconLayoutSidebarRightFilled size={18} className="text-zinc-200" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
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
                      className="relative group cursor-pointer flex items-center h-[30px]"
                    >
                      <div className="absolute left-0 -top-px w-8 h-px bg-zinc-800" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 group-hover:w-14 h-px bg-zinc-800 group-hover:bg-sky-500 transition-all duration-400 ease-out" />
                      <div className="pl-11 flex items-center  transform transition-transform duration-400 ease-out group-hover:translate-x-6">
                        <span className="text-[15px] font-geist font-medium text-zinc-400 group-hover:text-sky-500 transition-colors duration-400">
                          {item.name}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
