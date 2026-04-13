"use client";

import RepulsioText from "@/components/core/RepulsioText";

export default function RepulsioPreview() {
  return (
    <div className="flex items-center justify-center bg-[#121212] w-full min-h-[480px]">
      <RepulsioText
        text="Hover Me"
        fontFamily="geist, sans-serif"
        fontWeight={900}
        minFontSize={60}
        maxFontSize={250}
        fontSizeRatio={0.2}
        color="white"
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
