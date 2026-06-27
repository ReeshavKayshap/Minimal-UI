import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "../ui/Install-command";
import { InstallDependencies } from "../ui/Install-dependencies";

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const priceRollerCode = `"use client";

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

  const blurValue = useTransform(springY, (latest) => {
    const distanceToTarget = Math.abs(latest - numericValue * -10);
    const blur = Math.min(distanceToTarget * 0.12, 1.2);
    return \`blur(\${blur}px)\`;
  });

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
          y: useTransform(springY, (y) => \`\${y}%\`),
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
        return <DigitWheel key={\`pos-\${positionKey}\`} targetDigit={char} />;
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
      <div className="flex items-end select-none font-geist gap-1">
        <span
          className={cn(
            "text-3xl font-semibold text-zinc-400 tracking-tight select-none",
            currencyClassName,
          )}
        >
          {currencySymbol}
        </span>

        <span
          className={cn(
            "text-6xl font-bold tracking-tight h-[1em] flex items-center",
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
                className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-700 rounded-full"
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
`;

export function PriceRollerDocs() {
  const priceRollerProps = [
    {
      prop: "className",
      type: "string",
      defaultValue: "undefined",
      description: "Optional custom CSS classes for the root container.",
    },
    {
      prop: "plans",
      type: "PricePlan[]",
      defaultValue: "Monthly / Yearly defaults",
      description:
        "Billing plans with id, label, and price. Each plan drives the animated ticker value.",
    },
    {
      prop: "defaultPlanId",
      type: "string",
      defaultValue: '"monthly"',
      description: "Initial selected plan when used in uncontrolled mode.",
    },
    {
      prop: "value",
      type: "string",
      defaultValue: "undefined",
      description: "Selected plan id for controlled usage.",
    },
    {
      prop: "onChange",
      type: "(planId: string) => void",
      defaultValue: "undefined",
      description: "Called when the user switches billing plans.",
    },
    {
      prop: "currencySymbol",
      type: "string",
      defaultValue: '"$"',
      description: "Symbol shown before the animated price.",
    },
    {
      prop: "suffix",
      type: "string",
      defaultValue: '"/mo"',
      description: "Text shown after the animated price.",
    },
    {
      prop: "layoutId",
      type: "string",
      defaultValue: '"active-pill"',
      description:
        "Framer Motion layoutId for the active pill. Use unique values when rendering multiple rollers.",
    },
    {
      prop: "priceClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Optional classes for the price display wrapper.",
    },
    {
      prop: "currencyClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Optional classes for the currency symbol.",
    },
    {
      prop: "suffixClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Optional classes for the suffix text.",
    },
    {
      prop: "switchClassName",
      type: "string",
      defaultValue: "undefined",
      description: "Optional classes for the segmented switch container.",
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
                <InstallCommand componentName="priceroller" />
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
                    components/ui/price-roller.tsx
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6 rounded-xl overflow-hidden shadow-xs ring-1 ring-neutral-200 dark:ring-white/10">
                  <div className="max-h-[450px] overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={priceRollerCode} />
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
        <PropsTable data={priceRollerProps} />
      </section>
    </div>
  );
}
