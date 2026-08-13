"use client";

import EatMeButton from "@/components/core/Eat-me-button";

const CONFIG = {
  label: "Iron Man Will...",
  returnLabel: "Return In Doomsday 🤫",
};

export default function EatMeButtonPreview() {
  return (
    <div className="w-full flex items-center justify-center ">
      <EatMeButton label={CONFIG.label} returnLabel={CONFIG.returnLabel} />
    </div>
  );
}
