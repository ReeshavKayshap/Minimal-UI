"use client";
import { useRef, useEffect, useCallback, useState } from "react";
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

/**
 * CONSTANTS
 */
const DEFAULT_PROPS = {
  text: "Minimal UI",
  fontFamily: '"Inter", system-ui, sans-serif',
  fontWeight: 900,
  minFontSize: 60,
  maxFontSize: 250,
  fontSizeRatio: 0.2,
  dotRadius: 2,
  gap: 7,
  repulseRadius: 90,
  repulseForce: 6,
  springForce: 0.08,
  friction: 0.82,
} as const;

const DEFAULT_MOUSE_POSITION = { x: -1000, y: -1000 } as const;
const ALPHA_THRESHOLD = 128;
const PARTICLE_OFFSET_RANGE = 2;
const CANVAS_MIN_HEIGHT = 400;
const INIT_DELAY = 100;

/**
 * PARTICLE CLASS
 */
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

/**
 * UTILS
 */
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
  if (logicalWidth === 0 || logicalHeight === 0) return [];

  const particles: Particle[] = [];
  ctx.clearRect(0, 0, logicalWidth, logicalHeight);

  const fontSize = calculateFontSize(logicalWidth, canvasConfig);
  ctx.fillStyle = "white";
  ctx.font = `${canvasConfig.fontWeight} ${fontSize}px ${canvasConfig.fontFamily}`;
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

    const step = particleConfig.gap * devicePixelRatio;
    for (let y = 0; y < logicalHeight * devicePixelRatio; y += step) {
      for (let x = 0; x < logicalWidth * devicePixelRatio; x += step) {
        const intX = Math.floor(x);
        const intY = Math.floor(y);
        const index =
          (intY * Math.floor(logicalWidth * devicePixelRatio) + intX) * 4;

        if (data[index + 3] > ALPHA_THRESHOLD) {
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

/**
 * CUSTOM HOOKS
 */
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
      if (logicalWidth === 0 || logicalHeight === 0) return null;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;
      ctx.scale(dpr, dpr);

      return { logicalWidth, logicalHeight, devicePixelRatio: dpr };
    },
    [],
  );

  const clearCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
    },
    [],
  );

  return { setupCanvas, clearCanvas };
};

const useMouseTracking = () => {
  const mouseRef = useRef<Vector2D>({ ...DEFAULT_MOUSE_POSITION });

  const handleMouseMove = useCallback(
    (canvas: HTMLCanvasElement) => (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    [],
  );

  const handleTouchMove = useCallback(
    (canvas: HTMLCanvasElement) => (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    },
    [],
  );

  const handleMouseLeave = useCallback(
    () => () => {
      mouseRef.current = { ...DEFAULT_MOUSE_POSITION };
    },
    [],
  );

  return {
    handleMouseMove,
    handleTouchMove,
    handleMouseLeave,
    getMousePosition: () => mouseRef.current,
  };
};

const useAnimationLoop = () => {
  const frameId = useRef<number | null>(null);

  const startAnimation = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: IParticle[],
      getMouse: () => Vector2D,
      config: ParticleConfig,
      dims: { width: number; height: number },
      clear: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
    ) => {
      const render = () => {
        clear(ctx, dims.width, dims.height);
        const mousePos = getMouse();
        particles.forEach((p) => {
          p.update(mousePos, config);
          p.draw(ctx, config);
        });
        frameId.current = requestAnimationFrame(render);
      };
      render();
    },
    [],
  );

  const stopAnimation = useCallback(() => {
    if (frameId.current !== null) cancelAnimationFrame(frameId.current);
  }, []);

  return { startAnimation, stopAnimation };
};

/**
 * MAIN COMPONENT
 */
export default function RepulsionText(props: RepulsionTextProps = {}) {
  const {
    text = DEFAULT_PROPS.text,
    fontFamily = DEFAULT_PROPS.fontFamily,
    fontWeight = DEFAULT_PROPS.fontWeight,
    minFontSize = DEFAULT_PROPS.minFontSize,
    maxFontSize = DEFAULT_PROPS.maxFontSize,
    fontSizeRatio = DEFAULT_PROPS.fontSizeRatio,
    color: propColor,
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

  // Dynamic Theme Color Detection
  const [resolvedColor, setResolvedColor] = useState(propColor || "#000000");

  const { setupCanvas, clearCanvas } = useCanvasSetup();
  const {
    handleMouseMove,
    handleTouchMove,
    handleMouseLeave,
    getMousePosition,
  } = useMouseTracking();
  const { startAnimation, stopAnimation } = useAnimationLoop();

  // Handle Light/Dark Mode Observation
  useEffect(() => {
    if (propColor) {
      setResolvedColor(propColor);
      return;
    }

    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setResolvedColor(isDark ? "#ffffff" : "#000000");
    };

    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [propColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const particleConfig: ParticleConfig = {
      gap,
      dotRadius,
      repulseRadius,
      repulseForce,
      springForce,
      friction,
      color: resolvedColor,
    };

    const canvasConfig: CanvasConfig = {
      text,
      fontFamily,
      fontWeight,
      minFontSize,
      maxFontSize,
      fontSizeRatio,
    };

    const handleResize = () => {
      const dims = setupCanvas(canvas, ctx);
      if (dims) {
        dimensionsRef.current = dims;
        particlesRef.current = createParticlesFromText(
          ctx,
          dims,
          canvasConfig,
          particleConfig,
        );
      }
    };

    const initTimeout = setTimeout(() => {
      handleResize();
      const dims = dimensionsRef.current;
      if (dims && particlesRef.current.length > 0) {
        startAnimation(
          ctx,
          particlesRef.current,
          getMousePosition,
          particleConfig,
          { width: dims.logicalWidth, height: dims.logicalHeight },
          clearCanvas,
        );
      }
    }, INIT_DELAY);

    const onMM = handleMouseMove(canvas);
    const onTM = handleTouchMove(canvas);
    const onML = handleMouseLeave();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMM);
    canvas.addEventListener("mouseleave", onML);
    canvas.addEventListener("touchmove", onTM, { passive: true });
    canvas.addEventListener("touchend", onML);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMM);
      canvas.removeEventListener("mouseleave", onML);
      canvas.removeEventListener("touchmove", onTM);
      canvas.removeEventListener("touchend", onML);
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
    resolvedColor,
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
        "relative flex justify-center items-center w-full min-h-[400px] h-full overflow-hidden",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
