"use client";

import Sidebar from "@/components/core/Sidebar";

const demoComponentsList = [
  { id: "01", name: "Clicky Button", onClick: () => console.log("Clicked 1") },
  { id: "02", name: "Magnetic Wrapper" },
  { id: "03", name: "Mini Portfolio" },
  { id: "04", name: "Create New" },
  { id: "05", name: "Genie Modal" },
  { id: "06", name: "Gooey Button" },
  { id: "07", name: "Grid Disclosure" },
  { id: "08", name: "Signature" },
  { id: "09", name: "Stripe Typewriter" },
  { id: "10", name: "Physics Receipt" },
  { id: "11", name: "Song Player" },
];

export default function SidebarPreview() {
  return (
    <div className="w-full min-h-[650px] bg-[#121212] relative overflow-hidden">
      <Sidebar
        items={demoComponentsList}
        title="All Components"
        className="z-30"
      />

      <span
        className="text-white absolute top-0 left-0 font-inter text-lg
        flex justify-center items-center w-full h-full pointer-events-none"
      >
        Click the menu icon in the top left to open the sidebar.
      </span>
    </div>
  );
}
