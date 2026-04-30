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
    <div className="w-full flex items-center justify-center ">
      <OptionToggle options={options} value={value} onChange={setValue} />
    </div>
  );
}
