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
        <div className="flex justify-center items-center gap-10">
          <Link href="/" className="text-white text-3xl font-bold">
            Shader UI
          </Link>
          <ul className="flex justify-center items-center gap-8 text-white ">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-gray-300 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-white flex gap-4">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
