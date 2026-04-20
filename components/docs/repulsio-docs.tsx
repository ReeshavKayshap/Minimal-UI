import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "@/components/ui/Install-command";
import { InstallDependencies } from "@/components/ui/Install-dependencies";

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const repulsioCode = `"use client";
import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Vector2D {
  x: number;
  y: number;
}

interface ParticleConfig {
  gap: number;
  dotRadius: number;
  repulseRadius: number;
  repulseForce: number;
  springForce: number;
  friction: number;
  color: string;
}

interface CanvasConfig {
  text: string;
  fontFamily: string;
  fontWeight: string | number;
  minFontSize: number;
  maxFontSize: number;
  fontSizeRatio: number;
}

interface CanvasDimensions {
  logicalWidth: number;
  logicalHeight: number;
  devicePixelRatio: number;
}

interface IParticle {
  readonly originX: number;
  readonly originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  update(mouse: Vector2D, config: ParticleConfig): void;
  draw(ctx: CanvasRenderingContext2D, config: ParticleConfig): void;
}

export interface RepulsionTextProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  minFontSize?: number;
  maxFontSize?: number;
  fontSizeRatio?: number;

  color?: string;
  dotRadius?: number;

  gap?: number;
  repulseRadius?: number;
  repulseForce?: number;
  springForce?: number;
  friction?: number;

  className?: string;
}

const DEFAULT_PROPS = {
  text: "Minimal UI",
  fontFamily: '"Inter", system-ui, sans-serif',
  fontWeight: 900,
  minFontSize: 60,
  maxFontSize: 250,
  fontSizeRatio: 0.2,
  color: "#ffffff",
  dotRadius: 2,
  gap: 7,
  repulseRadius: 90,
  repulseForce: 6,
  springForce: 0.08,
  friction: 0.82,
} as const;

const DEFAULT_MOUSE_POSITION: Readonly<{ x: number; y: number }> = {
  x: -1000,
  y: -1000,
} as const;

const ALPHA_THRESHOLD = 128;
const PARTICLE_OFFSET_RANGE = 2;
const CANVAS_MIN_HEIGHT = 400;
const INIT_DELAY = 100;

class Particle implements IParticle {
  public readonly originX: number;
  public readonly originY: number;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;

  constructor(x: number, y: number) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  public update(mouse: Vector2D, config: ParticleConfig): void {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < config.repulseRadius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (config.repulseRadius - distance) / config.repulseRadius;

      this.vx += forceDirectionX * force * config.repulseForce;
      this.vy += forceDirectionY * force * config.repulseForce;
    }

    this.vx += (this.originX - this.x) * config.springForce;
    this.vy += (this.originY - this.y) * config.springForce;
    this.vx *= config.friction;
    this.vy *= config.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  public draw(ctx: CanvasRenderingContext2D, config: ParticleConfig): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, config.dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = config.color;
    ctx.fill();
    ctx.closePath();
  }
}

const calculateFontSize = (width: number, config: CanvasConfig): number => {
  return Math.max(
    Math.min(width * config.fontSizeRatio, config.maxFontSize),
    config.minFontSize,
  );
};

const createParticlesFromText = (
  ctx: CanvasRenderingContext2D,
  dimensions: CanvasDimensions,
  canvasConfig: CanvasConfig,
  particleConfig: ParticleConfig,
): Particle[] => {
  const { logicalWidth, logicalHeight, devicePixelRatio } = dimensions;

  if (logicalWidth === 0 || logicalHeight === 0) {
    return [];
  }

  const particles: Particle[] = [];

  ctx.clearRect(0, 0, logicalWidth, logicalHeight);

  const fontSize = calculateFontSize(logicalWidth, canvasConfig);
  ctx.fillStyle = "white";
  
  // ⭐️ ESCAPED TEMPLATE LITERALS HERE
  ctx.font = \`\${canvasConfig.fontWeight} \${fontSize}px \${canvasConfig.fontFamily}\`;
  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(canvasConfig.text, logicalWidth / 2, logicalHeight / 2);

  try {
    const imageData = ctx.getImageData(
      0,
      0,
      logicalWidth * devicePixelRatio,
      logicalHeight * devicePixelRatio,
    );
    const data = imageData.data;

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    for (
      let y = 0;
      y < logicalHeight * devicePixelRatio;
      y += particleConfig.gap * devicePixelRatio
    ) {
      for (
        let x = 0;
        x < logicalWidth * devicePixelRatio;
        x += particleConfig.gap * devicePixelRatio
      ) {
        const intX = Math.floor(x);
        const intY = Math.floor(y);

        const index =
          (intY * Math.floor(logicalWidth * devicePixelRatio) + intX) * 4;
        const alpha = data[index + 3];

        if (alpha > ALPHA_THRESHOLD) {
          const logicalX = intX / devicePixelRatio;
          const logicalY = intY / devicePixelRatio;

          const offsetX =
            logicalX + (Math.random() - 0.5) * PARTICLE_OFFSET_RANGE;
          const offsetY =
            logicalY + (Math.random() - 0.5) * PARTICLE_OFFSET_RANGE;

          particles.push(new Particle(offsetX, offsetY));
        }
      }
    }
  } catch (err) {
    console.error("Failed to read canvas pixels:", err);
  }

  return particles;
};

const useCanvasSetup = () => {
  const setupCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
    ): CanvasDimensions | null => {
      const parent = canvas.parentElement;
      if (!parent) return null;

      const logicalWidth = parent.clientWidth;
      const logicalHeight = parent.clientHeight || CANVAS_MIN_HEIGHT;

      if (logicalWidth === 0 || logicalHeight === 0) {
        return null;
      }

      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = logicalWidth * devicePixelRatio;
      canvas.height = logicalHeight * devicePixelRatio;

      // ⭐️ ESCAPED TEMPLATE LITERALS HERE
      canvas.style.width = \`\${logicalWidth}px\`;
      canvas.style.height = \`\${logicalHeight}px\`;

      ctx.scale(devicePixelRatio, devicePixelRatio);

      return {
        logicalWidth,
        logicalHeight,
        devicePixelRatio,
      };
    },
    [],
  );

  const clearCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
      ctx.clearRect(0, 0, width, height);
    },
    [],
  );

  return {
    setupCanvas,
    clearCanvas,
  };
};

const useMouseTracking = () => {
  const mouseRef = useRef<Vector2D>({ ...DEFAULT_MOUSE_POSITION });

  const handleMouseMove = useCallback((canvas: HTMLCanvasElement) => {
    return (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
  }, []);

  const handleTouchMove = useCallback((canvas: HTMLCanvasElement) => {
    return (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    return () => {
      mouseRef.current = { ...DEFAULT_MOUSE_POSITION };
    };
  }, []);

  const getMousePosition = useCallback((): Vector2D => {
    return mouseRef.current;
  }, []);

  return {
    handleMouseMove,
    handleTouchMove,
    handleMouseLeave,
    getMousePosition,
  };
};

const useAnimationLoop = () => {
  const animationFrameIdRef = useRef<number | null>(null);

  const startAnimation = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: IParticle[],
      getMousePosition: () => Vector2D,
      config: ParticleConfig,
      dimensions: { width: number; height: number },
      clearCanvas: (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
      ) => void,
    ) => {
      const render = () => {
        clearCanvas(ctx, dimensions.width, dimensions.height);

        const mousePos = getMousePosition();
        particles.forEach((particle) => {
          particle.update(mousePos, config);
          particle.draw(ctx, config);
        });

        animationFrameIdRef.current = requestAnimationFrame(render);
      };

      render();
    },
    [],
  );

  const stopAnimation = useCallback(() => {
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);

  return {
    startAnimation,
    stopAnimation,
  };
};

export default function RepulsionText(props: RepulsionTextProps = {}) {
  const {
    text = DEFAULT_PROPS.text,
    fontFamily = DEFAULT_PROPS.fontFamily,
    fontWeight = DEFAULT_PROPS.fontWeight,
    minFontSize = DEFAULT_PROPS.minFontSize,
    maxFontSize = DEFAULT_PROPS.maxFontSize,
    fontSizeRatio = DEFAULT_PROPS.fontSizeRatio,
    color = DEFAULT_PROPS.color,
    dotRadius = DEFAULT_PROPS.dotRadius,
    gap = DEFAULT_PROPS.gap,
    repulseRadius = DEFAULT_PROPS.repulseRadius,
    repulseForce = DEFAULT_PROPS.repulseForce,
    springForce = DEFAULT_PROPS.springForce,
    friction = DEFAULT_PROPS.friction,
    className,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<IParticle[]>([]);
  const dimensionsRef = useRef<CanvasDimensions | null>(null);

  const { setupCanvas, clearCanvas } = useCanvasSetup();
  const {
    handleMouseMove,
    handleTouchMove,
    handleMouseLeave,
    getMousePosition,
  } = useMouseTracking();
  const { startAnimation, stopAnimation } = useAnimationLoop();

  // Create config objects from props
  const particleConfig: ParticleConfig = {
    gap,
    dotRadius,
    repulseRadius,
    repulseForce,
    springForce,
    friction,
    color,
  };

  const canvasConfig: CanvasConfig = {
    text,
    fontFamily,
    fontWeight,
    minFontSize,
    maxFontSize,
    fontSizeRatio,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      const dimensions = dimensionsRef.current;
      if (!dimensions) return;

      particlesRef.current = createParticlesFromText(
        ctx,
        dimensions,
        canvasConfig,
        particleConfig,
      );
    };

    const handleResize = () => {
      const dimensions = setupCanvas(canvas, ctx);
      if (dimensions) {
        dimensionsRef.current = dimensions;
        initParticles();
      }
    };

    const startRendering = () => {
      const dimensions = dimensionsRef.current;
      if (!dimensions || particlesRef.current.length === 0) return;

      startAnimation(
        ctx,
        particlesRef.current,
        getMousePosition,
        particleConfig,
        {
          width: dimensions.logicalWidth,
          height: dimensions.logicalHeight,
        },
        clearCanvas,
      );
    };

    const onMouseMove = handleMouseMove(canvas);
    const onTouchMove = handleTouchMove(canvas);
    const onMouseLeave = handleMouseLeave();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onMouseLeave);

    const initTimeout = setTimeout(() => {
      handleResize();
      startRendering();
    }, INIT_DELAY);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onMouseLeave);

      stopAnimation();
      clearTimeout(initTimeout);
    };
  }, [
    text,
    fontFamily,
    fontWeight,
    minFontSize,
    maxFontSize,
    fontSizeRatio,
    color,
    dotRadius,
    gap,
    repulseRadius,
    repulseForce,
    springForce,
    friction,
    setupCanvas,
    clearCanvas,
    handleMouseMove,
    handleTouchMove,
    handleMouseLeave,
    getMousePosition,
    startAnimation,
    stopAnimation,
  ]);

  return (
    <div
      className={cn(
        "flex justify-center items-center w-full h-full py-20",
        className,
      )}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
`;

export function RepulsioDocs() {
  const repulsioProps = [
    {
      prop: "text",
      type: "string",
      defaultValue: '"Minimal UI"',
      description: "The text rendered into particles.",
    },
    {
      prop: "gap",
      type: "number",
      defaultValue: "7",
      description: "The space between particles (lower = denser).",
    },
    {
      prop: "repulseRadius",
      type: "number",
      defaultValue: "90",
      description: "How far the mouse pushes particles.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 pt-5 animate-in fade-in duration-700">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Installation
        </h2>

        <CliManualTabs
          cliContent={
            <div className="flex flex-col gap-4">
              <Step number={1} title="Run the following Command">
                <InstallCommand componentName="repulsio-text" />
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
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    lib/utils.ts
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6">
                  <CodeHighlight code={utilsCode} />
                </div>
              </Step>

              <Step number={3} title="Copy the source code">
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20 mx-1">
                    components/core/RepulsioText.tsx
                  </code>
                  and paste this code.
                </div>

                <div className="mb-6 max-h-[450px] overflow-y-auto rounded-xl border border-white/10 relative custom-scrollbar">
                  <CodeHighlight code={repulsioCode} />
                </div>
              </Step>
            </div>
          }
        />
      </section>

      {/* <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Understanding the Component
        </h2>
        <p className="text-zinc-400 mb-4 leading-relaxed">
          The Repulsion Text effect reads the alpha channel of a hidden canvas
          to determine where to place particles. It then applies a custom
          physics engine calculating distance from the mouse cursor to apply
          force vectors.
        </p>
      </section> */}

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Props
        </h2>
        <PropsTable data={repulsioProps} />
      </section>
    </div>
  );
}
