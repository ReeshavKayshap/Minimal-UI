"use client";

import RevealPassword from "@/components/core/RevealPassword";

export default function RevealPasswordPreview() {
  return (
    <div className="flex items-center justify-center w-full ">
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
