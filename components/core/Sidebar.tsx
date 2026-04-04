"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";

const SPRING_TRANSITION: Transition = {
  type: "spring",
  stiffness: 230,
  damping: 20,
};

const EXIT_TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeOut",
};

const ENTER_DURATION = 0.4;

const MENU_ITEMS = [
  { id: "repulsio-text", label: "RepulsioText" },
  { id: "laminar-fluid-1", label: "LaminarFluid" },
  { id: "wave-card-1", label: "WaveCard" },
  { id: "world-map", label: "WorldMap" },
  { id: "wave-card-2", label: "WaveCard" },
  { id: "laminar-fluid-2", label: "LaminarFluid" },
  { id: "wave-card-3", label: "WaveCard" },
  { id: "laminar-fluid-3", label: "LaminarFluid" },
] as const;

function HoverIndicator({ isSliding }: { isSliding: boolean }) {
  return (
    <motion.div
      initial={isSliding ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: EXIT_TRANSITION }}
      layoutId="sidebar-hover"
      className="absolute inset-0 h-full w-full rounded-lg bg-neutral-600"
      transition={{
        opacity: {
          duration: isSliding ? 0 : ENTER_DURATION,
          ease: "easeIn",
        },
        layout: SPRING_TRANSITION,
      }}
    />
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isSlidingRef = useRef(false);

  const handleMouseEnter = (idx: number) => {
    isSlidingRef.current = hoveredIndex !== null;
    setHoveredIndex(idx);
  };

  const handleMouseLeave = () => {
    isSlidingRef.current = false;
    setHoveredIndex(null);
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        width: isOpen ? "20%" : "0%",
        marginLeft: isOpen ? "30px" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="h-150 overflow-visible rounded-2xl bg-neutral-900 font-geist relative z-50"
      aria-label="Main Navigation"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto flex w-fit cursor-pointer items-center justify-center px-5 py-3 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded-xl"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isOpen ? 1 : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="absolute"
        >
          {" "}
          <MenuIcon />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isOpen ? 0 : 1,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <MenuIcon />
        </motion.div>
      </button>

      {/* Dropdown Content */}
      <div className="overflow-hidden rounded-b-2xl bg-neutral-900">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 px-5 py-5"
              onMouseLeave={handleMouseLeave}
              role="menu"
            >
              {MENU_ITEMS.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const isHovered = hoveredIndex === idx;

                // Construct text color dynamically
                const textColor = isSelected
                  ? "text-white"
                  : isHovered
                    ? "text-neutral-300"
                    : "text-neutral-400";

                return (
                  <button
                    key={item.id}
                    role="menuitem"
                    onClick={() => setSelectedIndex(idx)}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    className={`relative w-full cursor-pointer whitespace-nowrap px-5 py-2 font-Font2 text-[1.1vw] transition-colors duration-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded-lg ${textColor}`}
                  >
                    <AnimatePresence>
                      {isHovered && (
                        <HoverIndicator isSliding={isSlidingRef.current} />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// --- Icons ---

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.38672 19.7725C2.27441 19.7725 1.4305 19.4902 0.85498 18.9258C0.284993 18.3613 0 17.5257 0 16.4189V3.34521C0 2.24398 0.284993 1.41113 0.85498 0.84668C1.4305 0.282227 2.27441 0 3.38672 0H21.8809C22.9932 0 23.8343 0.284993 24.4043 0.85498C24.9798 1.41943 25.2676 2.24951 25.2676 3.34521V16.4189C25.2676 17.5202 24.9798 18.353 24.4043 18.9175C23.8343 19.4875 22.9932 19.7725 21.8809 19.7725H3.38672ZM3.49463 17.9463H21.7729C22.3042 17.9463 22.7109 17.8052 22.9932 17.5229C23.2809 17.2407 23.4248 16.8229 23.4248 16.2695V3.50293C23.4248 2.94401 23.2809 2.5262 22.9932 2.24951C22.7109 1.96729 22.3042 1.82617 21.7729 1.82617H3.49463C2.95231 1.82617 2.54004 1.96729 2.25781 2.24951C1.97559 2.5262 1.83447 2.94401 1.83447 3.50293V16.2695C1.83447 16.8229 1.97559 17.2407 2.25781 17.5229C2.54004 17.8052 2.95231 17.9463 3.49463 17.9463ZM8.35059 18.2534V1.47754H10.0938V18.2534H8.35059ZM6.25879 5.76904H3.93457C3.75749 5.76904 3.60807 5.70817 3.48633 5.58643C3.36458 5.45915 3.30371 5.31527 3.30371 5.15479C3.30371 4.98877 3.36458 4.84489 3.48633 4.72314C3.60807 4.6014 3.75749 4.54053 3.93457 4.54053H6.25879C6.43034 4.54053 6.57699 4.6014 6.69873 4.72314C6.82601 4.84489 6.88965 4.98877 6.88965 5.15479C6.88965 5.31527 6.82601 5.45915 6.69873 5.58643C6.57699 5.70817 6.43034 5.76904 6.25879 5.76904ZM6.25879 8.64111H3.93457C3.75749 8.64111 3.60807 8.58024 3.48633 8.4585C3.36458 8.33675 3.30371 8.19287 3.30371 8.02686C3.30371 7.86084 3.36458 7.71973 3.48633 7.60352C3.60807 7.48177 3.75749 7.4209 3.93457 7.4209H6.25879C6.43034 7.4209 6.57699 7.48177 6.69873 7.60352C6.82601 7.71973 6.88965 7.86084 6.88965 8.02686C6.88965 8.19287 6.82601 8.33675 6.69873 8.4585C6.57699 8.58024 6.43034 8.64111 6.25879 8.64111ZM6.25879 11.5215H3.93457C3.75749 11.5215 3.60807 11.4606 3.48633 11.3389C3.36458 11.2171 3.30371 11.0732 3.30371 10.9072C3.30371 10.7412 3.36458 10.6001 3.48633 10.4839C3.60807 10.3677 3.75749 10.3096 3.93457 10.3096H6.25879C6.43034 10.3096 6.57699 10.3677 6.69873 10.4839C6.82601 10.6001 6.88965 10.7412 6.88965 10.9072C6.88965 11.0732 6.82601 11.2171 6.69873 11.3389C6.57699 11.4606 6.43034 11.5215 6.25879 11.5215Z"
        fill="#ffffff"
      />
    </svg>
  );
}
