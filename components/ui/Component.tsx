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
    thumbnailVideo: "/videos/OptionToggle.mp4",
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
        <h1 className="text-neutral-900 dark:text-white font-inter text-4xl font-bold">
          Build stunning interfaces in minutes
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg font-inter">
          Production-ready UI components built with React, shadcn, and Tailwind.
          Copy the code, customize, and ship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ALL_COMPONENTS.map((item) => (
          <Link
            key={item.slug}
            href={`/components/${item.slug}`}
            className="flex flex-col bg-neutral-100 dark:bg-neutral-900 p-2   w-full col-span-1 rounded-2xl shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset]"
          >
            <div className=" w-full h-full relative flex flex-col gap-2 ">
              <span className="border border-neutral-200 dark:border-neutral-800 rounded-xl">
                <video
                  src={item.thumbnailVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl w-full h-full object-cover"
                />
              </span>

              <span className="px-2 py-2">
                <h2 className="text-lg font-geist font-semibold text-neutral-900 dark:text-white">
                  {item.name}
                </h2>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 line-clamp-1">
                  {item.description}
                </p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Components;
