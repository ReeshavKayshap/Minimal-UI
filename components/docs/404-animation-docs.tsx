import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "@/components/ui/Install-command";
import { InstallDependencies } from "@/components/ui/Install-dependencies";

export const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

export const animation404Code = `
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ParticleData {
  id: string;
  originX: number;
  originY: number;
}

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface Interactive404Props {
  /** Text rendered as particle icons */
  text?: string;
  /** Stage width in px used for canvas sampling */
  width?: number;
  /** Stage height in px used for canvas sampling */
  height?: number;
  /** Canvas font string for text rasterisation */
  font?: string;
  /** Horizontal grid spacing between particles (px) */
  spacingX?: number;
  /** Vertical grid spacing between particles (px) */
  spacingY?: number;
  /** Cursor proximity radius that repels particles (px) */
  hoverRadius?: number;
  /** Max distance a particle travels away from cursor (px) */
  spreadDist?: number;
  /** Size of each face icon (px) */
  iconSize?: number;
  /** Spring physics for hover repulsion */
  springConfig?: SpringConfig;
  /** Canvas brightness threshold 0–255 for sampling pixels */
  pixelThreshold?: number;
  /** Amplitude of ambient floating drift (px) */
  floatRange?: number;
  /** Base duration of ambient float loop (s) — actual per-particle duration varies slightly */
  floatDuration?: number;
  /** Stroke color of the icon mouth arc */
  archColor?: string;
  /** Fill color of the icon eyes */
  eyeColor?: string;
  className?: string;
}

// ─── FaceIcon ─────────────────────────────────────────────────────────────────

function FaceIcon({
  size,
  archColor,
  eyeColor,
}: {
  size: number;
  archColor: string;
  eyeColor: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M 3.5 17.5 A 8.5 8.5 0 0 1 20.5 17.5"
        stroke={archColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="13.5" r="1.1" fill={eyeColor} />
      <circle cx="15" cy="13.5" r="1.1" fill={eyeColor} />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function jitterFor(
  originX: number,
  originY: number,
  floatRange: number,
  floatDuration: number,
) {
  const seed = Math.sin(originX * 12.9898 + originY * 78.233) * 43758.5453;
  const frac = seed - Math.floor(seed);
  return {
    scale: 0.88 + frac * 0.28,
    rotate: (frac - 0.5) * 22,
    floatDelay: (frac - 0.5) * -5,
    floatDuration: floatDuration + frac * 6,
    driftX: floatRange * (0.5 + frac * 0.5),
  };
}

function buildParticleGrid(
  text: string,
  width: number,
  height: number,
  font: string,
  spacingX: number,
  spacingY: number,
  pixelThreshold: number,
): ParticleData[] {
  if (typeof window === "undefined") return [];

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const imgData = ctx.getImageData(0, 0, width, height).data;
  const particles: ParticleData[] = [];

  for (let y = 0; y < height; y += spacingY) {
    const row = Math.round(y / spacingY);
    const offsetX = row % 2 === 0 ? 0 : spacingX / 2;

    for (let x = 0; x < width; x += spacingX) {
      const finalX = x + offsetX;
      if (finalX >= width) continue;
      const index = (y * width + Math.floor(finalX)) * 4;
      if (imgData[index] > pixelThreshold) {
        particles.push({
          id: \`$\{Math.floor(finalX)}-$\{y}\`,
          originX: finalX,
          originY: y,
        });
      }
    }
  }

  return particles;
}

// ─── Particle ─────────────────────────────────────────────────────────────────

function Particle({
  data,
  mouseX,
  mouseY,
  hoverRadius,
  spreadDist,
  springConfig,
  iconSize,
  floatRange,
  floatDuration,
  archColor,
  eyeColor,
}: {
  data: ParticleData;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  hoverRadius: number;
  spreadDist: number;
  springConfig: Required<SpringConfig>;
  iconSize: number;
  floatRange: number;
  floatDuration: number;
  archColor: string;
  eyeColor: string;
}) {
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  const {
    scale,
    rotate,
    floatDelay,
    floatDuration: particleDuration,
    driftX,
  } = jitterFor(data.originX, data.originY, floatRange, floatDuration);

  useEffect(() => {
    const update = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const dx = data.originX - mx;
      const dy = data.originY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < hoverRadius && dist > 0) {
        const strength = (1 - dist / hoverRadius) * spreadDist;
        springX.set((dx / dist) * strength);
        springY.set((dy / dist) * strength);
      } else {
        springX.set(0);
        springY.set(0);
      }
    };

    const unX = mouseX.on("change", update);
    const unY = mouseY.on("change", update);
    return () => {
      unX();
      unY();
    };
  }, [
    mouseX,
    mouseY,
    data.originX,
    data.originY,
    hoverRadius,
    spreadDist,
    springX,
    springY,
  ]);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: data.originX,
        top: data.originY,
        translateX: "-50%",
        translateY: "-50%",
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        animate={{ x: [0, driftX, 0, -driftX, 0] }}
        transition={{
          duration: particleDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        style={{ transform: \`scale($\{scale}) rotate($\{rotate}deg)\` }}
      >
        <FaceIcon size={iconSize} archColor={archColor} eyeColor={eyeColor} />
      </motion.div>
    </motion.div>
  );
}

// ─── Interactive404 ──────────────────────────────────────────────────

export default function Interactive404({
  text = "404",
  width = 600,
  height = 260,
  font = '900 420px "Arial Black", Impact, system-ui, sans-serif',
  spacingX = 17,
  spacingY = 15,
  hoverRadius = 90,
  spreadDist = 28,
  iconSize = 30,
  springConfig = { stiffness: 200, damping: 18, mass: 1 },
  pixelThreshold = 70,
  floatRange = 4,
  floatDuration = 4,
  archColor = "#c7cfd9",
  eyeColor = "#aab4c2",
  className = "",
}: Interactive404Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const resolvedSpring: Required<SpringConfig> = useMemo(
    () => ({
      stiffness: springConfig.stiffness ?? 200,
      damping: springConfig.damping ?? 18,
      mass: springConfig.mass ?? 1,
    }),
    [springConfig.stiffness, springConfig.damping, springConfig.mass],
  );

  useEffect(() => {
    const init = () =>
      setParticles(
        buildParticleGrid(
          text,
          width,
          height,
          font,
          spacingX,
          spacingY,
          pixelThreshold,
        ),
      );
    if (document.fonts?.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }
  }, [text, width, height, font, spacingX, spacingY, pixelThreshold]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div
      className={cn(
        "relative flex w-full select-none items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-default"
        style={{ width, height }}
      >
        {particles.map((p) => (
          <Particle
            key={p.id}
            data={p}
            mouseX={mouseX}
            mouseY={mouseY}
            hoverRadius={hoverRadius}
            spreadDist={spreadDist}
            springConfig={resolvedSpring}
            iconSize={iconSize}
            floatRange={floatRange}
            floatDuration={floatDuration}
            archColor={archColor}
            eyeColor={eyeColor}
          />
        ))}
      </div>
    </div>
  );
}

export { Interactive404 };

`;

const animation404Props = [
  {
    prop: "text",
    type: "string",
    defaultValue: '"404"',
    description: "The text rendered as interactive particle icons.",
  },
  {
    prop: "width",
    type: "number",
    defaultValue: "800",
    description: "Stage width in pixels used for particle text sampling.",
  },
  {
    prop: "height",
    type: "number",
    defaultValue: "400",
    description: "Stage height in pixels used for particle text sampling.",
  },
  {
    prop: "font",
    type: "string",
    defaultValue: "'900 280px \"Arial Black\", Impact, system-ui, sans-serif'",
    description: "Font styling string used to generate text outline.",
  },
  {
    prop: "iconSize",
    type: "number",
    defaultValue: "15",
    description: "Size of each face icon in pixels.",
  },
  {
    prop: "spacingX",
    type: "number",
    defaultValue: "9",
    description: "Horizontal grid density between particles.",
  },
  {
    prop: "spacingY",
    type: "number",
    defaultValue: "7",
    description: "Vertical grid density between particles.",
  },
  {
    prop: "hoverRadius",
    type: "number",
    defaultValue: "85",
    description: "Cursor proximity distance (px) required to push particles.",
  },
  {
    prop: "spreadDist",
    type: "number",
    defaultValue: "26",
    description: "Max distance particles travel away from cursor.",
  },
  {
    prop: "springConfig",
    type: "{ stiffness?: number; damping?: number; mass?: number }",
    defaultValue: "{ stiffness: 210, damping: 16, mass: 1 }",
    description: "Physics spring configuration for smooth hover reaction.",
  },
  {
    prop: "archColor",
    type: "string",
    defaultValue: '"#c7cfd9"',
    description: "Stroke color of the icon mouth arc.",
  },
  {
    prop: "eyeColor",
    type: "string",
    defaultValue: '"#aab4c2"',
    description: "Fill color of the icon eyes.",
  },
  {
    prop: "caption",
    type: "string | null",
    defaultValue: '"Move your cursor over the shape"',
    description: "Caption string rendered under the stage.",
  },
];

export function Animation404Docs() {
  return (
    <div className="flex flex-col gap-12 font-inter text-neutral-800 dark:text-zinc-200">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 border-b border-neutral-200 dark:border-white/10 pb-2">
          Installation
        </h2>

        <CliManualTabs
          cliContent={
            <div className="flex flex-col gap-4">
              <Step number={1} title="Run the following Command">
                <InstallCommand componentName="404-animation" />
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
                <div className="mb-4 text-[14px] leading-relaxed">
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

              <Step number={3} title="Copy the source code">
                <div className="mb-4 text-[14px] leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    components/ui/404-Animation.tsx
                  </code>
                  and paste this code.
                </div>

                <div className="mb-6 rounded-xl overflow-hidden shadow-xs ring-1 ring-neutral-200 dark:ring-white/10">
                  <div className="max-h-112.5 overflow-auto relative custom-scrollbar">
                    <CodeHighlight code={animation404Code} />
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
        <PropsTable data={animation404Props} />
      </section>
    </div>
  );
}
