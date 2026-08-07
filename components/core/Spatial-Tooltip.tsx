"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionTemplate, useSpring } from "motion/react";
import {
  IconMessageCircle,
  IconInbox,
  IconToggleLeft,
  IconScanEye,
  IconBrandTelegram,
  IconDotsVerticalFilled,
  IconCommand,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export type KeySpec = { icon?: React.ReactNode; char?: string };

export type SpatialTooltipItem = {
  id: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  keys?: KeySpec[];
  dot?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export interface SpatialTooltipProps {
  /** Array of items to render in the toolbar */
  items?: SpatialTooltipItem[];
  /** Controlled active item ID */
  activeId?: string | null;
  /** Initial active item ID for uncontrolled state */
  defaultActiveId?: string | null;
  /** Callback fired when an item is selected or clicked */
  onSelect?: (item: SpatialTooltipItem, index: number) => void;
  /** Position of the spatial tooltip relative to the toolbar */
  position?: "top" | "bottom";
  /** Custom CSS classes for the root container */
  className?: string;
  /** Custom CSS classes for the toolbar element */
  toolbarClassName?: string;
  /** Custom CSS classes for the spatial tooltip rail */
  tooltipClassName?: string;
  /** Custom CSS classes for item buttons */
  itemClassName?: string;
  /** Custom CSS classes for the active highlight indicator */
  activeItemClassName?: string;
}

const DEFAULT_ITEMS: SpatialTooltipItem[] = [
  {
    id: "comment",
    label: "Comment",
    icon: <IconMessageCircle className="size-5" />,
    keys: [{ char: "C" }],
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: <IconInbox className="size-5" />,
    dot: true,
  },
  {
    id: "flags",
    label: "Feature Flags",
    icon: <IconToggleLeft className="size-5" />,
  },
  {
    id: "draft",
    label: "Draft Mode",
    icon: <IconScanEye className="size-5" />,
  },
  {
    id: "share",
    label: "Share",
    icon: <IconBrandTelegram className="size-5" />,
  },
  {
    id: "menu",
    label: "Menu",
    icon: <IconDotsVerticalFilled className="size-5" />,
    keys: [{ icon: <IconCommand className="size-3" /> }, { char: "K" }],
    dot: true,
  },
];

const SPRING_X = {
  stiffness: 550,
  damping: 44,
  mass: 0.7,
};

const SPRING_CLIP = {
  stiffness: 550,
  damping: 50,
  mass: 0.8,
};

/** Sum offsetLeft up the offsetParent chain until `ancestor`. Transform-independent. */
function offsetLeftWithin(
  el: HTMLElement | null,
  ancestor: HTMLElement | null,
): number {
  let x = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return x;
}

export default function SpatialTooltip({
  items = DEFAULT_ITEMS,
  activeId: controlledActiveId,
  defaultActiveId = null,
  onSelect,
  position = "top",
  className,
  toolbarClassName,
  tooltipClassName,
  itemClassName,
  activeItemClassName,
}: SpatialTooltipProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const segRefs = useRef<(HTMLDivElement | null)[]>([]);
  const btnRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  const visibleRef = useRef(false);

  const springX = useSpring(0, SPRING_X);
  const springClipLeft = useSpring(0, SPRING_CLIP);
  const springClipRight = useSpring(0, SPRING_CLIP);

  const clipPath = useMotionTemplate`inset(0px ${springClipRight}px 0px ${springClipLeft}px round 10px)`;

  const [visible, setVisible] = useState(false);
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(
    () => {
      if (defaultActiveId) {
        const idx = items.findIndex((item) => item.id === defaultActiveId);
        return idx !== -1 ? idx : null;
      }
      return null;
    },
  );

  const activeIndex =
    controlledActiveId !== undefined
      ? items.findIndex((item) => item.id === controlledActiveId)
      : internalActiveIndex;

  const reveal = useCallback(
    (index: number) => {
      const rail = railRef.current;
      const seg = segRefs.current[index];
      const btn = btnRefs.current[index];
      const wrapper = wrapperRef.current;
      if (!rail || !seg || !btn || !wrapper) return;

      const railWidth = rail.offsetWidth || 1;
      const leftPx = seg.offsetLeft;
      const rightPx = railWidth - seg.offsetLeft - seg.offsetWidth;

      const segCenter = offsetLeftWithin(seg, wrapper) + seg.offsetWidth / 2;
      const btnCenter = offsetLeftWithin(btn, wrapper) + btn.offsetWidth / 2;
      const dx = btnCenter - segCenter;

      const isAppearing = !visibleRef.current;
      visibleRef.current = true;

      if (isAppearing) {
        springX.jump(dx);
        springClipLeft.jump(leftPx);
        springClipRight.jump(rightPx);
      } else {
        springX.set(dx);
        springClipLeft.set(leftPx);
        springClipRight.set(rightPx);
      }

      setInternalActiveIndex(index);
      setVisible(true);
    },
    [springX, springClipLeft, springClipRight],
  );

  const hideTooltip = useCallback(() => {
    visibleRef.current = false;
    setVisible(false);
    setInternalActiveIndex(null);
  }, []);

  const handleItemClick = (
    item: SpatialTooltipItem,
    index: number,
    e: React.MouseEvent,
  ) => {
    if (item.disabled) return;
    item.onClick?.(e);
    onSelect?.(item, index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      btnRefs.current[nextIndex]?.focus();
      reveal(nextIndex);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      btnRefs.current[prevIndex]?.focus();
      reveal(prevIndex);
    } else if (e.key === "Escape") {
      hideTooltip();
    }
  };

  const isTop = position === "top";

  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <div
        ref={wrapperRef}
        className="relative inline-flex items-center justify-center"
      >
        <div
          className={cn(
            "pointer-events-none absolute left-0 z-20",
            isTop ? "bottom-full mb-3" : "top-full mt-3",
          )}
        >
          <motion.div
            ref={railRef}
            role="tooltip"
            aria-hidden={!visible}
            initial={false}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{
              opacity: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{
              x: springX,
              clipPath,
              willChange: "transform, clip-path, opacity",
            }}
            className={cn(
              "relative flex w-max rounded-[10px] border border-white/10 dark:border-black/10 bg-black text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-md",
              tooltipClassName,
            )}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(node) => {
                  segRefs.current[i] = node;
                }}
                className="z-1 inline-flex h-9 items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2 whitespace-nowrap px-2.5 text-sm font-medium leading-tight tracking-tight font-inter">
                  {item.label}
                  {item.keys && item.keys.length > 0 && (
                    <span className="flex items-center justify-center gap-1">
                      {item.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="inline-flex size-5 items-center font-inter justify-center rounded border border-neutral-600 dark:border-neutral-300 px-1 text-[11px]"
                        >
                          {k.icon ?? k.char}
                        </kbd>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          role="toolbar"
          onMouseLeave={hideTooltip}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              hideTooltip();
            }
          }}
          className={cn(
            "relative z-10 flex items-center gap-2.5 rounded-full bg-[#121215] dark:bg-neutral-100 py-2 px-3 shadow-lg",
            toolbarClassName,
          )}
        >
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            const Tag = item.href ? "a" : "button";

            return (
              <Tag
                key={item.id}
                ref={(node: any) => {
                  btnRefs.current[i] = node;
                }}
                {...(item.href ? { href: item.href } : { type: "button" })}
                disabled={item.disabled}
                aria-label={
                  typeof item.label === "string" ? item.label : item.id
                }
                onMouseEnter={() => reveal(i)}
                onFocus={() => reveal(i)}
                onClick={(e: React.MouseEvent) => handleItemClick(item, i, e)}
                onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, i)}
                className={cn(
                  "relative flex size-8 items-center justify-center rounded-full outline-none transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                  itemClassName,
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-white/15 dark:bg-black/10 transition-opacity duration-150",
                    isActive ? "opacity-100" : "opacity-0",
                    activeItemClassName,
                  )}
                />

                <span className="text-neutral-100 dark:text-neutral-900 z-1">
                  {item.icon}
                </span>

                {item.dot && (
                  <span className="absolute top-1 right-1.5 size-1.5 rounded-full bg-blue-500 ring-2 ring-[#121215] dark:ring-neutral-100 z-1" />
                )}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
