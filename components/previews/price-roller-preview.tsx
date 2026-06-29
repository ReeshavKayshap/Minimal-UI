"use client";

import { useState } from "react";
import PriceRoller, { type PricePlan } from "@/components/core/PriceRoller";

const plans: PricePlan[] = [
  { id: "monthly", label: "Monthly", price: 249 },
  { id: "yearly", label: "Yearly", price: 199 },
];

export default function PriceRollerPreview() {
  const [activePlan, setActivePlan] = useState("monthly");

  return (
    <div className="w-full flex items-center justify-center ">
      <PriceRoller
        plans={plans}
        value={activePlan}
        onChange={setActivePlan}
        currencySymbol="$"
        suffix="/mo"
        layoutId="price-roller-preview-pill"
      />
    </div>
  );
}
