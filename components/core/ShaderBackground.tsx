"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                            sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  lightColor?: string;
  darkColor?: string;
  noiseIntensity?: number;
  rotation?: number;
}

/** Returns true if dark mode is currently active (class-based or media-query) */
const isDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  // Tailwind / next-themes class strategy
  if (document.documentElement.classList.contains("dark")) return true;
  // Fallback: system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color,
  lightColor = "#7a9cc4",
  darkColor = "#9cbfff",
  noiseIntensity = 1.5,
  rotation = 0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const resolveColor = () => color ?? (isDarkMode() ? darkColor : lightColor);

  const [activeColor, setActiveColor] = useState<string>(resolveColor);

  useEffect(() => {
    // If an explicit color is passed, just use it directly — no observer needed
    if (color) {
      setActiveColor(color);
      return;
    }

    // Sync immediately in case theme changed before mount
    setActiveColor(resolveColor());

    // Watch <html> class attribute changes (Tailwind class strategy)
    const observer = new MutationObserver(() => {
      setActiveColor(isDarkMode() ? darkColor : lightColor);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also watch system preference changes as a fallback
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const mqHandler = () => {
      // Only apply if no `dark` class is present (class strategy takes priority)
      if (!document.documentElement.classList.contains("dark")) {
        setActiveColor(mq.matches ? darkColor : lightColor);
      }
    };
    mq.addEventListener("change", mqHandler);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", mqHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, lightColor, darkColor]);

  // Setup Three.js scene once
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new THREE.Color(activeColor) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const timer = new THREE.Timer();
    timer.connect(document);

    let animationFrameId: number;

    const animate = () => {
      timer.update();
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = timer.getElapsed() * 0.1;
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          renderer.setSize(width, height);
        }
      }
    });

    resizeObserver.observe(currentMount);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (currentMount?.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      timer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push color changes into the shader uniform
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uScale.value = scale;
      materialRef.current.uniforms.uNoiseIntensity.value = noiseIntensity;
      materialRef.current.uniforms.uColor.value.set(activeColor);
      materialRef.current.uniforms.uRotation.value = rotation;
    }
  }, [speed, scale, noiseIntensity, activeColor, rotation]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

export default Silk;
