"use client";

import { useState } from "react";
import { IconLockSquareRounded, IconWorld } from "@tabler/icons-react";
import OptionToggle from "@/components/core/OptionToggle";

const options = [
  { value: "private", label: "Private", icon: IconLockSquareRounded },
  { value: "public", label: "Public", icon: IconWorld },
];

export default function OptionTogglePreview() {
  const [value, setValue] = useState("public");

  return (
    <div className="w-full min-h-[480px] bg-gray-50 flex items-center justify-center p-4 py-12 md:p-8 rounded-xl border border-white/10">
      <OptionToggle options={options} value={value} onChange={setValue} />
    </div>
  );
}
