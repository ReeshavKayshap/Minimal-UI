"use client";

import RevealPassword from "@/components/core/RevealPassword";

export default function RevealPasswordPreview() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center bg-neutral-50 w-full min-h-[480px]">
      <RevealPassword
        prefix="4485 "
        secret="1996 2057"
        suffix=" 7516"
        mask="xxxx xxxx"
        valueToCopy="4485 1996 2057 7516"
      />
    </div>
  );
}
