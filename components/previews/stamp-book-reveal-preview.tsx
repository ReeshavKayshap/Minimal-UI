"use client";

import StampBookReveal from "@/components/core/Stamp-Book-Reveal";

export default function StampBookRevealPreview() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <StampBookReveal
        title="things I collected"
        subtitle="Mini Archive"
        stamp1Image="/thumbnails/stamp1.jpg"
        stamp2Image="/thumbnails/stamp2.jpg"
      />
    </div>
  );
}
