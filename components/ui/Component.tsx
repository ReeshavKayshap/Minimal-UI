import Link from "next/link";

const ALL_COMPONENTS = [
  {
    slug: "repulsio-text",
    name: "RepulsioText",
    description: "Interactive text with mouse repulsion.",
    thumbnailVideo: "/videos/TextHover.mp4",
  },
  {
    slug: "option-toggle",
    name: "OptionToggle",
    description: "A beautiful glowing option toggle.",
    thumbnailVideo: "/videos/TextHover.mp4",
  },
  {
    slug: "sidebar-menu",
    name: "Sidebar",
    description: "Sidebar menu with hover effects.",
    thumbnailVideo: "/videos/TextHover.mp4",
  },
];

function Components() {
  return (
    <div className="flex flex-col relative gap-8 w-full">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-white text-4xl font-bold">
          Unlock a growing library
        </h1>
        <p className="text-neutral-400 text-xl">
          A collection of beautiful, ready-to-use components built specifically
          for hero sections. Plug in, customize, and ship stunning visuals.
          Works seamlessly with React, shadcn, and modern design systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ALL_COMPONENTS.map((item) => (
          <Link
            key={item.slug}
            href={`/components/${item.slug}`}
            className="flex flex-col bg-neutral-900  h-80 w-full col-span-1 rounded-2xl overflow-hidden shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset,0px_8px_8px_0px_var(--color-neutral-900)]"
          >
            <div className="p-1 w-full h-full relative">
              <video
                src={item.thumbnailVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-white/10 h-20 flex flex-col justify-center">
              <h2 className="text-lg font-geist font-semibold text-white">
                {item.name}
              </h2>
              <p className="text-sm text-zinc-500 line-clamp-1">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Components;
