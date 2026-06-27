import { PreviewCard } from "@/components/ui/Preview-card";

const ALL_COMPONENTS = [
  {
    slug: "text-hover",
    name: "TextHover",
    description: "Text scattered into particles that react to mouse hover.",
    thumbnailVideo: "/videos/TextHover.mp4",
    thumbnailSrc: "/thumbnails/TextHover.png",
  },
  {
    slug: "option-toggle",
    name: "OptionToggle",
    description: "A beautiful glowing option toggle.",
    thumbnailVideo: "/videos/OptionToggle.mp4",
    thumbnailSrc: "/thumbnails/OptionToggle.png",
  },
  {
    slug: "reveal-password",
    name: "RevealPassword",
    description: "Reveal password with 3D flip animation.",
    thumbnailVideo: "/videos/RevealPassword.mp4",
    thumbnailSrc: "/thumbnails/RevealPassword.png",
  },
  {
    slug: "faq",
    name: "Faq",
    description: "Accordion FAQ with smooth animations.",
    thumbnailVideo: "/videos/Faq.mp4",
    thumbnailSrc: "/thumbnails/Faq.png",
  },
  {
    slug: "sidebar-menu",
    name: "Sidebar",
    description: "Sidebar menu with hover effects.",
    thumbnailVideo: "/videos/Sidebar.mp4",
    thumbnailSrc: "/thumbnails/Sidebar.png",
  },
  {
    slug: "stamp-book-reveal",
    name: "Stamp Book Reveal",
    description: "Stamp book reveal animation.",
    thumbnailVideo: "/videos/Sidebar.mp4",
    thumbnailSrc: "/thumbnails/Sidebar.png",
  },
  {
    slug: "vercel-nav-bar",
    name: "Vercel Nav Bar",
    description: "Vercel-style navigation bar with dropdown menus.",
    thumbnailVideo: "/videos/VercelNavBar.mp4",
    thumbnailSrc: "/thumbnails/VercelNavBar.png",
  },
  {
    slug: "price-roller",
    name: "PriceRoller",
    description: "Price roller with smooth animation.",
    thumbnailVideo: "/videos/price-roller.mp4",
    thumbnailSrc: "/thumbnails/price-roller.png",
  },
];

export default function Components() {
  return (
    <div className="flex flex-col relative gap-8 w-full ">
      <div className="flex flex-col gap-2 max-w-2xl">
        <h1 className="text-neutral-900 dark:text-white font-inter text-3xl font-bold">
          Build stunning interfaces in minutes
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-[15px] font-inter">
          Collection of some popular components [Hover to play video]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ALL_COMPONENTS.map((item, index) => (
          <PreviewCard
            key={item.slug}
            title={item.name}
            description={item.description}
            href={`/components/${item.slug}`}
            thumbnailSrc={item.thumbnailSrc}
            videoSrc={item.thumbnailVideo}
            loading={index < 3 ? "eager" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
