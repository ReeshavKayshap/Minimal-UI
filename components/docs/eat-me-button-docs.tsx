import { CliManualTabs, PropsTable, Step } from "@/components/ui/Doc-blocks";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallDependencies } from "@/components/ui/Install-dependencies";
import { InstallCommand } from "@/components/ui/Install-command";

export const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const usageCode = `"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };
type ParticleKind = "fill" | "stroke";

type Particle = Point & {
  id: number;
  size: number;
  kind: ParticleKind;
  vx: number;
  vy: number;
  rotation: number;
  rotationVelocity: number;
  target?: Point;
  returnVelocity?: Point;
};

export interface EatMeButtonProps {
  /** Text displayed on the button. */
  label?: string;
  /** Text displayed after the final bite. */
  returnLabel?: string;
  /** Optional classes for the root container. */
  className?: string;
  /** Optional classes for the interactive button. */
  buttonClassName?: string;
  /** Optional classes for the button label. */
  labelClassName?: string;
  /** Optional classes for the return message. */
  returnLabelClassName?: string;
  /** Optional classes applied to every crumb particle. */
  particleClassName?: string;
}

const BUTTON_WIDTH = 260;
const BUTTON_HEIGHT = 80;
const PILL_RADIUS = BUTTON_HEIGHT / 2;
const STROKE_WIDTH = 3;
const MAX_CLICKS = 4;
const PARTICLES_PER_BITE = 18;
const FINAL_BURST_PARTICLES = 30;
const PARTICLE_DELAY = 90;
const EATEN_DELAY = 700;
const RETURN_DELAY = 2700;
const RESET_DELAY = 2880;

const BITE_SEQUENCE: Point[] = [
  { x: BUTTON_WIDTH * 0.5, y: 0 },
  { x: BUTTON_WIDTH * 0.78, y: BUTTON_HEIGHT },
  { x: BUTTON_WIDTH * 0.68, y: 0 },
  { x: BUTTON_WIDTH * 0.2, y: BUTTON_HEIGHT },
];

function isInsidePill(x: number, y: number): boolean {
  if (x < PILL_RADIUS) {
    return Math.hypot(x - PILL_RADIUS, y - PILL_RADIUS) <= PILL_RADIUS + 0.5;
  }
  if (x > BUTTON_WIDTH - PILL_RADIUS) {
    return (
      Math.hypot(x - (BUTTON_WIDTH - PILL_RADIUS), y - PILL_RADIUS) <=
      PILL_RADIUS + 0.5
    );
  }
  return y >= -0.5 && y <= BUTTON_HEIGHT + 0.5;
}

function buildPillPolygon(): Point[] {
  const points: Point[] = [];
  const sideSamples = 40;
  const capSamples = 50;

  for (let index = 0; index <= sideSamples; index += 1) {
    points.push({
      x: PILL_RADIUS + (BUTTON_WIDTH - 2 * PILL_RADIUS) * (index / sideSamples),
      y: 0,
    });
  }
  for (let index = 1; index <= capSamples; index += 1) {
    const angle = -Math.PI / 2 + Math.PI * (index / capSamples);
    points.push({
      x: BUTTON_WIDTH - PILL_RADIUS + PILL_RADIUS * Math.cos(angle),
      y: PILL_RADIUS + PILL_RADIUS * Math.sin(angle),
    });
  }
  for (let index = 1; index <= sideSamples; index += 1) {
    points.push({
      x:
        BUTTON_WIDTH -
        PILL_RADIUS -
        (BUTTON_WIDTH - 2 * PILL_RADIUS) * (index / sideSamples),
      y: BUTTON_HEIGHT,
    });
  }
  for (let index = 1; index < capSamples; index += 1) {
    const angle = Math.PI / 2 + Math.PI * (index / capSamples);
    points.push({
      x: PILL_RADIUS + PILL_RADIUS * Math.cos(angle),
      y: PILL_RADIUS + PILL_RADIUS * Math.sin(angle),
    });
  }
  return points;
}

function getReturnPoint(): Point {
  return {
    x: BUTTON_WIDTH / 2 + (Math.random() - 0.5) * 32,
    y: BUTTON_HEIGHT / 2 + (Math.random() - 0.5) * 16,
  };
}

function angleDistanceCounterClockwise(from: number, to: number): number {
  let distance = to - from;
  while (distance < 0) distance += Math.PI * 2;
  while (distance >= Math.PI * 2) distance -= Math.PI * 2;
  return distance;
}

function subtractCircleFromPolygon(
  points: Point[],
  centerX: number,
  centerY: number,
  radius: number,
): Point[] {
  const inside = points.map(
    (point) => Math.hypot(point.x - centerX, point.y - centerY) < radius,
  );

  if (!inside.some(Boolean) || inside.every(Boolean)) return points;

  const result: Point[] = [];
  for (let index = 0; index < points.length; index += 1) {
    const point = points[index];
    if (inside[index]) continue;
    result.push(point);

    if (!inside[(index + 1) % points.length]) continue;

    let nextIndex = (index + 1) % points.length;
    let steps = 0;
    while (inside[nextIndex] && steps < points.length) {
      nextIndex = (nextIndex + 1) % points.length;
      steps += 1;
    }

    const nextPoint = points[nextIndex];
    const startAngle = Math.atan2(point.y - centerY, point.x - centerX);
    const endAngle = Math.atan2(nextPoint.y - centerY, nextPoint.x - centerX);
    const counterClockwiseSweep = angleDistanceCounterClockwise(
      startAngle,
      endAngle,
    );
    const clockwiseSweep = -(Math.PI * 2 - counterClockwiseSweep);
    const midpointFor = (sweep: number): Point => {
      const angle = startAngle + sweep / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    };

    const counterClockwiseInside = isInsidePill(
      midpointFor(counterClockwiseSweep).x,
      midpointFor(counterClockwiseSweep).y,
    );
    const clockwiseInside = isInsidePill(
      midpointFor(clockwiseSweep).x,
      midpointFor(clockwiseSweep).y,
    );
    const sweep =
      counterClockwiseInside && !clockwiseInside
        ? counterClockwiseSweep
        : clockwiseInside && !counterClockwiseInside
          ? clockwiseSweep
          : Math.abs(counterClockwiseSweep) <= Math.abs(clockwiseSweep)
            ? counterClockwiseSweep
            : clockwiseSweep;
    const arcSteps = Math.max(6, Math.round(Math.abs(sweep) / (Math.PI / 16)));

    for (let step = 1; step < arcSteps; step += 1) {
      const angle = startAngle + (sweep * step) / arcSteps;
      result.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
  }

  return result;
}

function pointsToPath(points: Point[]): string {
  if (points.length === 0) return "";
  const [firstPoint, ...remainingPoints] = points;
  return \`M \${firstPoint.x.toFixed(1)} \${firstPoint.y.toFixed(1)} \${remainingPoints
    .map((point) => \`L \${point.x.toFixed(1)} \${point.y.toFixed(1)}\`)
    .join(" ")} Z\`;
}

function tangentAt(x: number, y: number): Point {
  if (x < PILL_RADIUS) {
    const distance = Math.hypot(x - PILL_RADIUS, y - PILL_RADIUS) || 1;
    return {
      x: -(y - PILL_RADIUS) / distance,
      y: (x - PILL_RADIUS) / distance,
    };
  }
  if (x > BUTTON_WIDTH - PILL_RADIUS) {
    const centerX = BUTTON_WIDTH - PILL_RADIUS;
    const distance = Math.hypot(x - centerX, y - PILL_RADIUS) || 1;
    return { x: -(y - PILL_RADIUS) / distance, y: (x - centerX) / distance };
  }
  return { x: 1, y: 0 };
}

function inwardNormalAt(x: number, y: number): Point {
  const centerX =
    x > BUTTON_WIDTH - PILL_RADIUS ? BUTTON_WIDTH - PILL_RADIUS : PILL_RADIUS;
  if (x < PILL_RADIUS || x > BUTTON_WIDTH - PILL_RADIUS) {
    const distance = Math.hypot(x - centerX, y - PILL_RADIUS) || 1;
    return { x: -(x - centerX) / distance, y: -(y - PILL_RADIUS) / distance };
  }
  return { x: 0, y: y < BUTTON_HEIGHT / 2 ? 1 : -1 };
}

function createParticle(id: number, x: number, y: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 180 + 180;
  return {
    id,
    x,
    y,
    size: Math.random() * 5 + 2,
    kind: Math.random() > 0.5 ? "fill" : "stroke",
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 80,
    rotation: Math.random() * 360,
    rotationVelocity: (Math.random() - 0.5) * 720,
  };
}

function createBiteParticles(
  createId: () => number,
  x: number,
  y: number,
): Particle[] {
  return Array.from({ length: PARTICLES_PER_BITE }, () =>
    createParticle(
      createId(),
      x + (Math.random() - 0.5) * 20,
      y + (Math.random() - 0.5) * 20,
    ),
  );
}

function createFinalBurstParticles(createId: () => number): Particle[] {
  const particles: Particle[] = [];
  while (particles.length < FINAL_BURST_PARTICLES) {
    const x = Math.random() * BUTTON_WIDTH;
    const y = Math.random() * BUTTON_HEIGHT;
    if (isInsidePill(x, y)) particles.push(createParticle(createId(), x, y));
  }
  return particles;
}

function HandDrawnFilter({ id, seed }: { id: string; seed: number }) {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.018"
            numOctaves="2"
            result="noise"
            seed={seed}
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function Crumb({
  particle,
  className,
  isDarkMode,
}: {
  particle: Particle;
  className?: string;
  isDarkMode: boolean;
}) {
  const particleColor = isDarkMode ? "white" : "black";
  return (
    <motion.div
      className={cn("pointer-events-none absolute", className)}
      initial={false}
      animate={{
        x: particle.x - particle.size / 2,
        y: particle.y - particle.size / 2,
        rotate: particle.rotation,
      }}
      transition={{ duration: 0 }}
      style={{
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.kind === "fill" ? particleColor : "transparent",
        border: particle.kind === "stroke" ? \`2px solid $\{particleColor}\` : "none",
        borderRadius: "50%",
        willChange: "transform",
      }}
    />
  );
}

export function EatMeButton({
  label = "Iron Man Will...",
  returnLabel = "Return In Doomsday 🤫",
  className,
  buttonClassName,
  labelClassName,
  returnLabelClassName,
  particleClassName,
}: EatMeButtonProps) {
  const [outline, setOutline] = useState<Point[]>(buildPillPolygon);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [isEaten, setIsEaten] = useState(false);
  const [isDisintegrating, setIsDisintegrating] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [wobbleSeed, setWobbleSeed] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const timeouts = useRef<number[]>([]);
  const particleId = useRef(0);

  const clearTimeouts = () => {
    timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    timeouts.current = [];
  };
  const schedule = (callback: () => void, delay: number) => {
    timeouts.current.push(window.setTimeout(callback, delay));
  };
  const createId = () => {
    particleId.current += 1;
    return particleId.current;
  };
  const reset = () => {
    clearTimeouts();
    setOutline(buildPillPolygon());
    setParticles([]);
    setClickCount(0);
    setIsEaten(false);
    setIsDisintegrating(false);
    setIsReturning(false);
  };

  useEffect(() => clearTimeouts, []);
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const interval = window.setInterval(
      () => setWobbleSeed(Math.floor(Math.random() * 100)),
      180,
    );
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();
    const updateParticles = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 1 / 30);
      lastTime = time;
      setParticles((currentParticles) =>
        currentParticles.length === 0
          ? currentParticles
          : currentParticles.map((particle) => {
              if (isReturning && particle.target) {
                const returnVelocity = {
                  x:
                    ((particle.returnVelocity?.x ?? 0) +
                      (particle.target.x - particle.x) * 420 * deltaTime) *
                    Math.exp(-30 * deltaTime),
                  y:
                    ((particle.returnVelocity?.y ?? 0) +
                      (particle.target.y - particle.y) * 420 * deltaTime) *
                    Math.exp(-30 * deltaTime),
                };
                return {
                  ...particle,
                  x: particle.x + returnVelocity.x * deltaTime,
                  y: particle.y + returnVelocity.y * deltaTime,
                  vx: 0,
                  vy: 0,
                  returnVelocity,
                  rotation:
                    particle.rotation + particle.rotationVelocity * deltaTime,
                };
              }
              let velocityY = particle.vy + 2400 * deltaTime;
              let velocityX = particle.vx;
              const x = particle.x + velocityX * deltaTime;
              let y = particle.y + velocityY * deltaTime;
              if (y > BUTTON_HEIGHT + 100 && velocityY > 0) {
                y = BUTTON_HEIGHT + 100;
                velocityY *= -0.4;
                velocityX *= 0.8;
              }
              return {
                ...particle,
                x,
                y,
                vx: velocityX,
                vy: velocityY,
                rotation:
                  particle.rotation + particle.rotationVelocity * deltaTime,
              };
            }),
      );
      frame = requestAnimationFrame(updateParticles);
    };
    frame = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(frame);
  }, [isReturning]);

  const handleBite = () => {
    if (isEaten || isDisintegrating) return;
    const bite = BITE_SEQUENCE[clickCount % BITE_SEQUENCE.length];
    const tangent = tangentAt(bite.x, bite.y);
    const normal = inwardNormalAt(bite.x, bite.y);
    const toothRadii = [13, 17, 15, 12];
    const nextOutline = toothRadii.reduce((currentOutline, radius, index) => {
      const offset = -22.5 + index * 15 + (index % 2 === 0 ? -2 : 2);
      return subtractCircleFromPolygon(
        currentOutline,
        bite.x + tangent.x * offset + normal.x * radius * 0.62,
        bite.y + tangent.y * offset + normal.y * radius * 0.62,
        radius,
      );
    }, outline);
    const nextClickCount = clickCount + 1;
    const isFinalBite = nextClickCount >= MAX_CLICKS;
    setOutline(nextOutline);
    setClickCount(nextClickCount);
    schedule(
      () =>
        setParticles((currentParticles) => [
          ...currentParticles,
          ...createBiteParticles(createId, bite.x, bite.y),
          ...(isFinalBite ? createFinalBurstParticles(createId) : []),
        ]),
      PARTICLE_DELAY,
    );

    if (isFinalBite) {
      setIsDisintegrating(true);
      schedule(() => setIsEaten(true), EATEN_DELAY);
      schedule(() => {
        setParticles((currentParticles) =>
          currentParticles.map((particle) => ({
            ...particle,
            target: getReturnPoint(),
            returnVelocity: { x: 0, y: 0 },
          })),
        );
        setIsReturning(true);
      }, RETURN_DELAY);
      schedule(reset, RESET_DELAY);
    }
  };

  const filterId = "eat-me-hand-drawn-filter";
  const fillColor = isDarkMode ? "#1a1a1a" : "white";
  const strokeColor = isDarkMode ? "white" : "black";
  const textColor = isDarkMode ? "white" : "black";
  const returnTextColor = isDarkMode ? "rgb(209, 213, 219)" : "rgb(63, 63, 70)";
  
  return (
    <div
      className={cn(
        " flex items-center justify-center overflow-visible select-none font-sans w-full",
        className,
      )}
    >
      <div
        className="relative"
        style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
      >
        <HandDrawnFilter id={filterId} seed={wobbleSeed} />
        <AnimatePresence mode="sync">
          {!isEaten ? (
            <motion.button
              key="button"
              type="button"
              onClick={handleBite}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                isDisintegrating
                  ? { scale: 0.98, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: isDisintegrating ? 0.45 : 0.07 }}
              exit={{ scale: 0.97, opacity: 0, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "absolute inset-0 flex cursor-pointer items-center justify-center",
                buttonClassName,
              )}
            >
              <svg
                width={BUTTON_WIDTH}
                height={BUTTON_HEIGHT}
                viewBox={\`0 0 $\{BUTTON_WIDTH} $\{BUTTON_HEIGHT}\`}
                className="pointer-events-none absolute inset-0 overflow-visible"
                style={{ filter: \`url(#$\{filterId})\` }}
              >
                <path
                  d={pointsToPath(outline)}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className={cn(
                  "pointer-events-none relative z-10 text-xl uppercase font-bold tracking-normal",
                  labelClassName,
                )}
                style={{ filter: \`url(#$\{filterId})\`, color: textColor }}
              >
                {label}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="return-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              exit={{ opacity: 0, transition: { duration: 0.04 } }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className={cn(
                  "text-center text-2xl font-bold uppercase tracking-[0.15em] transition-colors duration-300",
                  returnLabelClassName,
                )}
                style={{ filter: \`url(#$\{filterId})\`, color: returnTextColor }}
              >
                {returnLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 overflow-visible ">
          {particles.map((particle) => (
            <Crumb
              key={particle.id}
              particle={particle}
              className={particleClassName}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EatMeButton;

`;
const props = [
  {
    prop: "label",
    type: "string",
    defaultValue: '"IRON MAN WILL..."',
    description: "Text displayed before the button is eaten.",
  },
  {
    prop: "returnLabel",
    type: "string",
    defaultValue: '"Return In Doomsday 🤫"',
    description: "Text displayed during the automatic return sequence.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "undefined",
    description: "Optional classes for the component’s full-screen container.",
  },
  {
    prop: "buttonClassName",
    type: "string",
    defaultValue: "undefined",
    description: "Optional classes for the interactive button element.",
  },
  {
    prop: "labelClassName",
    type: "string",
    defaultValue: "undefined",
    description: "Optional classes for the button label.",
  },
  {
    prop: "returnLabelClassName",
    type: "string",
    defaultValue: "undefined",
    description: "Optional classes for the return message.",
  },
  {
    prop: "particleClassName",
    type: "string",
    defaultValue: "undefined",
    description: "Optional classes applied to every crumb particle.",
  },
];

export function EatMeButtonDocs() {
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
                  dependencies={[
                    "motion",
                    "@tabler/icons-react",
                    "clsx",
                    "tailwind-merge",
                  ]}
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
                  <div className="max-h-112.5 overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={usageCode} />
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
        <PropsTable data={props} />
      </section>
    </div>
  );
}
