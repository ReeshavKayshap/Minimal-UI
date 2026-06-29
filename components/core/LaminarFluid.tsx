"use client";

import { useEffect, useRef } from "react";

export default function LaminarFluid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Explicitly request alpha support for the transparent background
    const gl = (canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
    }) ||
      canvas.getContext("experimental-webgl", {
        alpha: true,
        premultipliedAlpha: true,
      })) as WebGLRenderingContext | null;

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Enable alpha blending for transparent output
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied alpha blending

    // --- WebGL Setup Boilerplate ---
    const vsSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // --- NOISE FUNCTIONS ---
      float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      
      float fbm(vec2 p) {
          float v = 0.0;
          v += 0.5000 * noise(p); p *= 2.01;
          v += 0.2500 * noise(p); p *= 2.02;
          v += 0.1250 * noise(p);
          return v;
      }

      // --- COLOR PALETTE ---
      vec3 getPalette(float t) {
          t = clamp(t, 0.0, 1.0);
          vec3 c1 = vec3(0.35, 0.10, 1.00);  // Deep Purple
          vec3 c2 = vec3(0.95, 0.15, 0.65);  // Hot Pink
          vec3 c3 = vec3(1.00, 0.35, 0.10);  // Bright Orange
          vec3 c4 = vec3(1.00, 0.85, 0.10);  // Bright Yellow

          // Smooth blending across the spectrum
          if (t < 0.33) return mix(c1, c2, smoothstep(0.0, 0.33, t));
          if (t < 0.66) return mix(c2, c3, smoothstep(0.33, 0.66, t));
          return mix(c3, c4, smoothstep(0.66, 1.0, t));
      }

      void main() {
          // Normalize pixel coordinates
          vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

          // --- 1. COORDINATE SYSTEM ---
          vec2 dir = normalize(vec2(1.0, 0.4)); 
          vec2 perp = vec2(-dir.y, dir.x);
          
          float along = dot(uv, dir);
          float across = dot(uv, perp);

          // --- 2. THE DIAGONAL BAND ---
          float wave = sin(along * 1.5 - u_time * 0.4) * 0.08 
                     + cos(along * 0.8 + u_time * 0.2) * 0.04;
          
          float centerDist = across + wave + 0.45; 
          float halfWidth = 0.26; // Reduced from 0.35 to make the effect smaller/thinner

          // Normalized distance across the band (-1.0 to 1.0)
          float nx = centerDist / halfWidth;

          // Anti-aliased mask for BOTH the top-left and bottom-right edges
          float mask = 1.0 - smoothstep(0.98, 1.0, abs(nx));
          
          // Calculate outer glow
          float glowDist = max(0.0, abs(centerDist) - halfWidth);
          float outerGlow = exp(-glowDist * 15.0) * 0.15;
          
          vec3 finalColor;
          float finalAlpha;
          
          if (mask <= 0.0) {
              // --- OUTSIDE THE BAND (Transparent with Glow) ---
              finalColor = getPalette(nx > 0.0 ? 1.0 : 0.0);
              finalAlpha = outerGlow;
          } else {
              // --- INSIDE THE BAND (Solid Fluid Texture) ---
              float bandUv = nx * 0.5 + 0.5;

              // Dense Parallel Fibers
              vec2 fiberUv = vec2(bandUv * 30.0, along * 0.5 - u_time * 0.8);
              float fibers = fbm(fiberUv);
              float microFibers = fbm(vec2(bandUv * 90.0, along * 0.1 - u_time * 1.2));
              float combinedFibers = mix(fibers, microFibers, 0.45);

              // Color Mapping
              float t = 1.0 - bandUv; 
              t = mix(t, combinedFibers, 0.1); 
              vec3 col = getPalette(t);

              // Physical bumps
              col *= mix(0.3, 1.4, combinedFibers);

              // Gloss & Highlights
              float gloss = sin(bandUv * 7.5 - along * 1.5 + u_time * 0.5) * 0.5 + 0.5;
              col += getPalette(t) * pow(gloss, 3.0) * 0.3;

              float edgeHighlight = pow(smoothstep(0.85, 1.0, abs(nx)), 2.0) * 0.4;
              col += getPalette(t) * edgeHighlight; 
              
              finalColor = col;
              finalAlpha = max(mask, outerGlow);
          }

          // Dither to prevent color banding in the smooth gradients
          float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
          finalColor += (dither - 0.5) * 0.02;

          // Output using premultiplied alpha (multiply color by alpha channel)
          gl_FragColor = vec4(finalColor * finalAlpha, finalAlpha);
      }
    `;

    // Helper functions to compile shaders
    function createShader(
      gl: WebGLRenderingContext,
      type: number,
      source: string,
    ): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(
      gl: WebGLRenderingContext,
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader,
    ): WebGLProgram | null {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking error:", gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    gl.useProgram(program);

    // Set up a full-screen quad geometry (two triangles)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    // Handle Window Resizing - use parent container dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial sizing

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;
      gl.clearColor(0, 0, 0, 0); // clear to transparent
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId !== undefined)
        cancelAnimationFrame(animationFrameId);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      {/* <div className="absolute inset-0 z-10 flex flex-col justify-center px-20 pointer-events-none">
        <h1 className="text-white text-7xl font-bold max-w-3xl leading-tight tracking-tight mb-6">
          Build your next project in minutes, not hours.
        </h1>
      </div> */}
    </>
  );
}
