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
    <div className="w-full h-full min-h-150 relative overflow-hidden">
      <Sidebar
        items={demoComponentsList}
        title="All Components"
        className="z-30"
      />

      <span>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 1000 650"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="7.5"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 8 4, 0 8, 2.5 4" fill="#a1a1aa" />
            </marker>
          </defs>

          <circle cx="500" cy="290" r="5" fill="#a1a1aa" />

          <path
            d="M 500 290 C 450 150, 200 150, 75 75"
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      </span>

      <span
        className="dark:text-white text-black absolute top-0 left-0 font-inter text-xl
        flex justify-center items-center w-full h-full pointer-events-none"
      >
        Click the menu icon in the top left to open the sidebar.
      </span>
    </div>
  );
}
