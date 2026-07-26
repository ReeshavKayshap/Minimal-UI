"use client";

import Link from "next/link";
import Particles from "./herosectionbg";
import { IconArrowNarrowRightDashed } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const { resolvedTheme } = useTheme();

  const silkColor = resolvedTheme === "dark" ? "#2233ee" : "#9cbfff";

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center ">
      <div className="absolute inset-0 w-full h-full z-0  pointer-events-none mask-b-from-80% mask-b-black">
        <Particles
          particleCount={150}
          particleSpread={7}
          particleColors={
            resolvedTheme === "dark"
              ? ["#2B7FFF", "#2B7FFF"]
              : ["#2233ee", "#2233ee"]
          }
          moveParticlesOnHover
          particleHoverFactor={2}
          alphaParticles
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className=" z-10 flex flex-col items-center justify-center w-full gap-10 h-full pt-10">
        <div className=" flex flex-col gap-3 items-center justify-center w-full">
          <div
            className="text-black dark:text-white text-4xl xs:text-6xl sm:text-8xl  font-semibold flex flex-col items-center justify-center 
           lg:text-[7.5rem]"
          >
            <span className="font-pixel-circle">Interactive UI</span>
            <span className="font-pixel-square">Components</span>
          </div>
        </div>

        <p
          className="text-neutral-700 dark:text-neutral-300/80 text-center 
           text-[11px] xs:text-sm sm:text-[17px] tracking-wide font-geist max-w-60 xs:max-w-xs sm:max-w-lg"
        >
          A collection of beautiful, ready-to-use components built specifically
          for minimal interaction.
        </p>

        <div className="flex gap-4">
          <Link href="/components">
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={{
                initial: { paddingLeft: 32, paddingRight: 32 },
                hover: { paddingLeft: 44, paddingRight: 44 },
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="text-white bg-linear-to-b from-[#151515] via-[#131313] to-[#121212] 
           dark:bg-none dark:bg-neutral-100 dark:text-neutral-900
           py-2.5 px-8 flex items-center gap-1 rounded-2xl font-geist text-[15px] cursor-pointer"
            >
              Quick Start
              <motion.div
                variants={{
                  initial: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <IconArrowNarrowRightDashed />
              </motion.div>
            </motion.div>
          </Link>
          <Link
            href="https://x.com/rshvksyp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={{
                initial: { paddingLeft: 32, paddingRight: 32 },
                hover: { paddingLeft: 40, paddingRight: 40 },
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="dark:text-white text-black text-[15px] font-geist cursor-pointer bg-neutral-100  
              dark:bg-linear-to-b dark:from-[#151515] dark:via-[#131313] dark:to-[#121212]  py-2.5 px-8 rounded-2xl"
            >
              Contact Me
            </motion.div>
          </Link>
        </div>
      </div>

      <div
        className="w-full h-full bg-transparent  absolute inset-0 flex justify-end 
      items-end pb-4 pr-5 gap-1 text-[15px]"
      >
        <span className="text-gray-400">Built by</span>
        <Link
          href="https://x.com/rshvksyp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 font-pixel-square underline underline-offset-3 decoration-gray-400 decoration-1
          hover:text-gray-200 hover:decoration-gray-200 transition-all duration-300 ease-out cursor-pointer"
        >
          Reeshav
        </Link>
      </div>
    </section>
  );
}
