"use client";

import { motion } from "framer-motion";
import Silk from "../core/ShaderBackground";

export default function HeroSection() {
  const variants = {
    inital: { x: 0 },
    show: { x: 5 },
  };

  return (
    <section className="relative w-full min-h-screen pt-32 pb-20 flex flex-col justify-center items-center gap-15 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none mask-b-from-80%">
        <Silk color="#10AAFD" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl w-full gap-10 h-full">
        {/* <motion.button
          className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 w-fit border border-neutral-300 dark:border-neutral-800 flex items-center py-1 rounded-full group px-5 cursor-pointer shadow-xs"
          initial="inital"
          whileHover="show"
        >
          <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-all duration-300 font-inter font-medium text-xs">
            Ship interactions that feel alive
          </span>
          <span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="size-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path className="text-neutral-400" d="M5 12h.5m3 0h1.5m3 0h6" />
              <path
                className="text-neutral-500 dark:text-neutral-300"
                d="M13 18l6 -6"
              />
              <path
                className="text-neutral-500 dark:text-neutral-300"
                d="M13 6l6 6"
              />
            </motion.svg>
          </span>
        </motion.button> */}

        <div className="flex flex-col items-center justify-center gap-4 text-center  w-full ">
          <h1 className="text-white text-5xl font-serif text-center lg:text-[10rem] tracking-tighter">
            Minimal UI <br />
            {/* <span className="text-white">Shots</span> */}
          </h1>
          <p className="text-neutral-700 dark:text-neutral-300/80 text-center text-[16px] tracking-wide font-geist max-w-lg">
            A collection of beautiful, ready-to-use components built
            specifically for minimal interaction.
          </p>
        </div>

        <div className="flex gap-4">
          <button className="text-white dark:text-black font-inter font-medium bg-neutral-900 dark:bg-neutral-200 backdrop-blur-md cursor-pointer border border-neutral-300 dark:border-neutral-700 px-10 py-3 rounded-lg w-fit text-[15px] hover:scale-105 transition-transform">
            Quick Start
          </button>
          <button className="text-neutral-900 dark:text-white font-inter font-medium bg-neutral-200/30 dark:bg-neutral-900/30 backdrop-blur-md cursor-pointer border border-neutral-300 dark:border-neutral-700 px-10 py-3 rounded-lg w-fit text-[15px] hover:scale-105 transition-transform">
            Contact Me
          </button>
        </div>
      </div>

      {/* <div className="relative z-10 w-full mt-10 md:mt-0">
        <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-2">
          <div className="bg-neutral-100 dark:bg-neutral-900 h-56 w-full col-span-3 rounded-2xl shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset]">
            <div className="p-1 w-full h-full relative">
              <video
                src="/videos/TextHover.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl w-full h-full object-cover bg-neutral-800"
              />
              <h1 className="text-white absolute bottom-6 left-8 font-geist text-[16px]">
                RepulsioText
              </h1>
            </div>
          </div>

          <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 h-64 w-full col-span-1 shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset]">
            <div className="p-1 w-full h-full relative">
              <video
                src="/videos/OptionToggle.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl w-full h-full object-cover bg-neutral-800"
              />
              <h1 className="text-white md:text-black absolute bottom-6 left-4 lg:left-8 font-geist text-[14px] lg:text-[16px]">
                Toggle
              </h1>
            </div>
          </div>

          <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 col-span-2 w-full h-64 shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset]">
            <div className="p-1 w-full h-full relative">
              <video
                src="/videos/Faq.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl w-full h-full object-cover bg-neutral-800"
              />
              <h1 className="text-white md:text-black absolute bottom-6 left-4 lg:left-8 font-geist text-[14px] lg:text-[16px]">
                FAQ Component
              </h1>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
