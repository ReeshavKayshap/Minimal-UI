"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../Container";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/components", label: "Component" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="py-5   fixed top-0 w-full bg-background z-20">
      <div className="border-b border-neutral-800/50 w-full absolute bottom-0 h-px"></div>
      <div className="flex justify-between items-center mx-auto max-w-360">
        <div className="flex justify-center items-center gap-5">
          <Link
            href="/"
            className="text-white text-[28px] font-bold font-geist"
          >
            Minimal UI
          </Link>
          <ul className="flex justify-center items-center gap-2 font-inter ">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:bg-neutral-800/50 transition-all text-neutral-400 hover:text-neutral-200 duration-250 py-3 px-4 rounded-lg text-[15.5px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-neutral-400 flex gap-4">
          <button className="hover:bg-neutral-800/50 cursor-pointer transition-all text-neutral-400 hover:text-neutral-200 duration-250 py-3 px-4 rounded-lg text-[15.5px]">
            Login
          </button>
          <button className="hover:bg-neutral-800/50 cursor-pointer transition-all text-neutral-400 hover:text-neutral-200 duration-250 py-3 px-4 rounded-lg text-[15.5px]">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
