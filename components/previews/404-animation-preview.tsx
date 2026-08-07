"use client";

import Interactive404 from "@/components/core/404-Animation";

export default function Animation404Preview() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Interactive404
        text="404"
        width={800}
        height={490}
        iconSize={30}
        spacingX={17}
        spacingY={15}
        hoverRadius={90}
        spreadDist={28}
        springConfig={{ stiffness: 200, damping: 18, mass: 1 }}
        pixelThreshold={70}
        floatRange={4}
        floatDuration={4}
        archColor="#c7cfd9"
        eyeColor="#aab4c2"
      />
    </div>
  );
}
