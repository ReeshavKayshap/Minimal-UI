"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { IconCommand } from "@tabler/icons-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/components", label: "Component" },
    // { href: "/about", label: "About" },
    // { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="py-3 fixed top-0 w-full z-50 ">
      <div
        className="pointer-events-none absolute left-0 top-0 h-35 w-full 
      backdrop-blur-md mask-[linear-gradient(to_bottom,black_30%,transparent_100%)] z-[-1]"
      />
      <div
        className="flex justify-between items-center mx-auto max-w-3xl bg-neutral-100 dark:bg-neutral-900  shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset] 
      py-3 px-4 rounded-2xl"
      >
        <div className="w-full">
          <Link
            href="/"
            className="text-neutral-900 dark:text-white text-[22px] font-bold font-geist"
          >
            Minimal UI
          </Link>
        </div>
        <ul className="flex justify-end items-center font-inter w-full ">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all duration-300 py-3 px-4 rounded-lg text-[14px]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-6 w-px border-l border-dashed border-neutral-700 " />
        <div className="text-neutral-500 dark:text-neutral-400 flex justify-center items-center gap-4  pl-4">
          <button className="cursor-pointer  ">
            <IconCommand size={20} className="stroke-1.5" />
          </button>

          {/* <ThemeToggle /> */}
          {/* <button className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 cursor-pointer transition-all text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 duration-250 py-3 px-4 rounded-lg text-[14.5px]">
            Sign Up
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
