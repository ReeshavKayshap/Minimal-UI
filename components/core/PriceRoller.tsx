"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING_CONFIG = { stiffness: 77, damping: 18, mass: 1.0 };

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export interface DigitWheelProps {
  targetDigit: string;
  className?: string;
}

export function DigitWheel({ targetDigit, className }: DigitWheelProps) {
  const numericValue = parseInt(targetDigit, 10);
  const isDigit = !isNaN(numericValue);

  if (!isDigit) {
    return (
      <span
        className={cn(
          "inline-block select-none font-sans text-black dark:text-white",
          className,
        )}
      >
        {targetDigit}
      </span>
    );
  }

  const motionY = useMotionValue(numericValue * -10);
  const springY = useSpring(motionY, SPRING_CONFIG);

  useEffect(() => {
    motionY.set(numericValue * -10);
  }, [numericValue, motionY]);

  // Subtle directional blur adjusted to match the slower speed beautifully
  const blurValue = useTransform(springY, (latest) => {
    const distanceToTarget = Math.abs(latest - numericValue * -10);
    const blur = Math.min(distanceToTarget * 0.12, 1.2);
    return `blur(${blur}px)`;
  });

  // Very subtle vertical stretch (smear) for organic speed-based deformation
  const scaleYValue = useTransform(springY, (latest) => {
    const distanceToTarget = Math.abs(latest - numericValue * -10);
    return 1 + Math.min(distanceToTarget * 0.012, 0.08);
  });

  return (
    <span
      className={cn(
        "relative overflow-hidden inline-block select-none h-[1em] w-[0.58em]",
        className,
      )}
      style={{ contentVisibility: "auto" }}
    >
      <motion.span
        className="absolute left-0 top-0 flex flex-col justify-start items-center w-full font-sans font-bold tabular-nums leading-none"
        style={{
          y: useTransform(springY, (y) => `${y}%`),
          filter: blurValue,
          scaleY: scaleYValue,
          transformOrigin: "center center",
        }}
      >
        {DIGITS.map((digit) => (
          <span
            key={digit}
            className="h-[1em] flex items-center justify-center w-full select-none text-black dark:text-white font-sans font-bold"
            style={{ height: "1em", lineHeight: "1em" }}
          >
            {digit}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export interface PerfectNumberTickerProps {
  value: number;
  className?: string;
}

export function PerfectNumberTicker({
  value,
  className,
}: PerfectNumberTickerProps) {
  const chars = String(value).split("");

  return (
    <span
      className={cn(
        "inline-flex items-center justify-start leading-none tracking-tight font-sans font-bold tabular-nums text-black dark:text-white",
        className,
      )}
    >
      {chars.map((char, index) => {
        const positionKey = chars.length - 1 - index;
        return <DigitWheel key={`pos-${positionKey}`} targetDigit={char} />;
      })}
    </span>
  );
}

export interface PricePlan {
  id: string;
  label: string;
  price: number;
}

export interface PriceRollerProps {
  className?: string;
  plans?: PricePlan[];
  defaultPlanId?: string;
  value?: string;
  onChange?: (planId: string) => void;
  currencySymbol?: string;
  suffix?: string;
  layoutId?: string;
  priceClassName?: string;
  currencyClassName?: string;
  suffixClassName?: string;
  switchClassName?: string;
}

const DEFAULT_PLANS: PricePlan[] = [
  { id: "monthly", label: "Monthly", price: 249 },
  { id: "yearly", label: "Yearly", price: 199 },
];

export default function PriceRoller({
  className,
  plans = DEFAULT_PLANS,
  defaultPlanId = "monthly",
  value,
  onChange,
  currencySymbol = "$",
  suffix = "/mo",
  layoutId = "active-pill",
  priceClassName,
  currencyClassName,
  suffixClassName,
  switchClassName,
}: PriceRollerProps = {}) {
  const [internalPlanId, setInternalPlanId] = useState(defaultPlanId);

  const activePlanId = value ?? internalPlanId;
  const activePlan = plans.find((plan) => plan.id === activePlanId) ?? plans[0];
  const price = activePlan.price;

  const handlePlanChange = (planId: string) => {
    if (value === undefined) {
      setInternalPlanId(planId);
    }
    onChange?.(planId);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-10 relative z-10",
        className,
      )}
    >
      <div className="flex items-end  select-none font-geist gap-1">
        <span
          className={cn(
            "text-3xl font-semibold  text-zinc-400 tracking-tight select-none",
            currencyClassName,
          )}
        >
          {currencySymbol}
        </span>

        <span
          className={cn(
            "text-6xl font-bold  tracking-tight h-[1em] flex items-center",
            priceClassName,
          )}
        >
          <PerfectNumberTicker value={price} />
        </span>

        <span
          className={cn(
            "text-zinc-500 text-3xl font-medium",
            suffixClassName,
          )}
        >
          {suffix}
        </span>
      </div>

   
      <div
        className={cn(
          "flex items-center bg-neutral-300/30 dark:bg-neutral-800 px-1.5 py-1.5 w-fit rounded-full",
          switchClassName,
        )}
      >
        {plans.map((plan) => (
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.07 }}
            key={plan.id}
            onClick={() => handlePlanChange(plan.id)}
            className="relative px-8 py-1.5 cursor-pointer text-[16px] font-geist font-medium z-10"
          >
            {activePlanId === plan.id && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-700 rounded-full "
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 text-neutral-900 dark:text-zinc-100">
              {plan.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
