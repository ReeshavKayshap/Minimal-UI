"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { IconSearch, IconBox } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  const data = [
    {
      heading: "Components",
      items: [
        {
          id: "repulsio-text",
          label: "Repulsio Text",
          icon: IconBox,
          href: "/components/repulsio-text",
        },
        {
          id: "option-toggle",
          label: "Option Toggle",
          icon: IconBox,
          href: "/components/option-toggle",
        },
        {
          id: "reveal-password",
          label: "Reveal Password",
          icon: IconBox,
          href: "/components/reveal-password",
        },
        {
          id: "faq",
          label: "FAQ",
          icon: IconBox,
          href: "/components/faq",
        },
        {
          id: "sidebar-menu",
          label: "Sidebar Menu",
          icon: IconBox,
          href: "/components/sidebar-menu",
        },
        {
          id: "stamp-book-reveal",
          label: "Stamp Book Reveal",
          icon: IconBox,
          href: "/components/stamp-book-reveal",
        },
        {
          id: "vercel-nav-bar",
          label: "Vercel Nav Bar",
          icon: IconBox,
          href: "/components/vercel-nav-bar",
        },
        {
          id: "price-roller",
          label: "Price Roller",
          icon: IconBox,
          href: "/components/price-roller",
        },
      ],
    },
  ];

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev: boolean) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setOpen(false)}
      />
      <Command
        label="Global Command Menu"
        className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white dark:bg-neutral-950 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
          <IconSearch className="size-5 text-neutral-500 shrink-0 mr-2" />
          <Command.Input
            autoFocus
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
          />
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center gap-1 shrink-0 ">
            <kbd className="pointer-events-none hidden sm:inline-flex h-5 min-w-5 select-none items-center justify-center rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 px-1.5 font-inter text-[10px] font-medium text-neutral-500">
              {isMac ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="pointer-events-none hidden sm:inline-flex h-5 min-w-5 select-none items-center justify-center rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 px-1.5 font-inter text-[10px] font-medium text-neutral-500">
              K
            </kbd>
          </div>
        </div>

        <Command.List className="max-h-75 overflow-y-auto p-2">
          <Command.Empty className="p-6 text-center text-sm text-neutral-500">
            No results found.
          </Command.Empty>

          {data.map((group) => (
            <Command.Group
              key={group.heading}
              heading={group.heading}
              className="px-2 py-2 text-xs font-medium text-neutral-500"
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.label}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-2 px-2 py-3 mt-1 rounded-md cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-neutral-500 shrink-0" />
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </>
  );
}
