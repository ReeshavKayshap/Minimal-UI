"use client";

import TextHover from "@/components/core/TextHover";

export default function TextHoverPreview() {
  return (
    <div className="flex items-center justify-center w-full">
      <TextHover
        text="Hover Me"
        fontFamily="geist, sans-serif"
        fontWeight={900}
        minFontSize={60}
        maxFontSize={250}
        fontSizeRatio={0.2}
        dotRadius={2.5}
        gap={7}
        repulseRadius={120}
        repulseForce={6}
        springForce={0.08}
        friction={0.82}
        className=""
      />
    </div>
  );
}
