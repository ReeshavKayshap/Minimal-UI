"use client";

import Silk from "../core/ShaderBackground";
import { IconArrowNarrowRightDashed } from "@tabler/icons-react";

export default function HeroSection() {
  const variants = {
    inital: { x: 0 },
    show: { x: 5 },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none mask-b-from-80%">
        <Silk color="#10AAFD" />
      </div>

      <div className=" z-10 flex flex-col items-center justify-center w-full gap-10 h-full pt-10">
        <div className=" flex flex-col gap-3 items-center justify-center w-full">
          <div className="text-neutral-300/80  text-lg tracking-wider font-geist ">
            Minimal UI
          </div>

          <div
            className="text-white text-5xl  font-semibold flex flex-col items-center justify-center 
           lg:text-[7.5rem]"
          >
            <span className="font-pixel-circle">Interactive UI</span>
            <span className="font-pixel-square">Components</span>
          </div>
        </div>

        <p
          className="text-neutral-700 dark:text-neutral-300/80 text-center 
          text-[16px] tracking-wide font-geist max-w-lg"
        >
          A collection of beautiful, ready-to-use components built specifically
          for minimal interaction.
        </p>

        <div className="flex gap-4">
          <button
            className="text-white group dark:text-black  font-geist cursor-pointer text-[15px]
           bg-neutral-100 py-2 px-8 flex items-center gap-1 rounded-2xl hover:px-11 transition-all duration-300 "
          >
            Quick Start
            <div className="group-hover:translate-x-1 transition-all duration-300">
              <IconArrowNarrowRightDashed />
            </div>
          </button>
          <button className="dark:text-white text-black text-[15px] hover:px-10 transition-all duration-300  font-geist cursor-pointer border  border-neutral-600 bg-[#171717] py-2 px-8 rounded-2xl">
            Contact Me
          </button>
        </div>
      </div>

      <div
        className="w-full h-full bg-transparent z-10 fixed inset-0 flex justify-end 
      items-end pb-4 pr-5 gap-1"
      >
        <span className="text-gray-400">Built by</span>
        <span className="text-gray-400 font-pixel-square underline underline-offset-3 decoration-gray-400 decoration-1">
          Reeshav
        </span>
      </div>
    </section>
  );
}
