"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle"; // Assuming you have this
import { IconCommand } from "@tabler/icons-react";
import Image from "next/image";
import { CommandPalette } from "./cmdk"; // <-- Import the new component

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 1. Add state for the search palette
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [{ href: "/components", label: "Components" }];

  return (
    <>
      <nav className="py-3 px-3  md:px-0  fixed top-0 w-full z-50 ">
        <div className="pointer-events-none absolute left-0 top-0 h-35 w-full backdrop-blur-md mask-[linear-gradient(to_bottom,black_30%,transparent_100%)] z-[-1]" />
        <div
          className="flex justify-between items-center mx-auto max-w-3xl bg-[#f0f0f0] dark:bg-linear-to-b dark:from-[#151515] dark:via-[#131313] dark:to-[#121212]
        dark:shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset] shadow-[0px_-1px_0px_0px_var(--color-neutral-200)_inset]
        py-3 px-4 rounded-2xl"
        >
          <div className="w-full flex gap-3 items-center">
            <Image
              src="/thumbnails/Logo.png"
              alt="logo"
              loading="eager"
              width={26}
              height={26}
              className="rounded-full object-cover size-6.5"
            />
            <Link
              href="/"
              className="text-neutral-800 dark:text-white text-[20px] font-bold font-geist"
            >
              Minimal UI
            </Link>
          </div>
          <ul className="hidden xs:flex justify-end items-center font-inter w-full ">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-neutral-400  hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white
                   transition-all px-4 text-[13.5px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-5 w-px border-l border-dashed border-neutral-400  dark:border-neutral-700 " />
          <div className=" flex justify-center items-center gap-4 pl-4">
            <div
              className="cursor-pointer text-neutral-400  hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white  transition-all"
              onClick={() => setIsSearchOpen((prev: boolean) => !prev)}
            >
              <IconCommand size={20} className="stroke-1.5" />
            </div>
            <div className="h-5 w-px border-l border-dashed border-neutral-400  dark:border-neutral-700 " />

            <div className="text-neutral-400  hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white  transition-all ">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* 3. Render the Command Palette outside the Nav's inner flex container */}
      <CommandPalette open={isSearchOpen} setOpen={setIsSearchOpen} />
    </>
  );
};

export default Nav;
