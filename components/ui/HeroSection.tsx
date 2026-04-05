"use client";
import { motion } from "motion/react";
import LaminarFluid from "../core/LaminarFluid";

function HeroSection() {
  const variants = {
    inital: {
      x: 0,
    },
    show: {
      x: 5,
    },
  };
  return (
    <section className="relative w-full py-40">
      <div className="absolute inset-0 z-0 pointer-events-none ">
        <LaminarFluid />
      </div>

      <div className="relative z-10 mx-auto max-w-336  flex flex-col w-full gap-8">
        <motion.button
          className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 w-fit border border-neutral-300 dark:border-neutral-800 flex items-center
        py-1.5 rounded-full group px-5 cursor-pointer z-30 gap-1 shadow-xs"
          initial="inital"
          whileHover="show"
        >
          <span
            className="text-neutral-500 dark:text-neutral-400  group-hover:text-neutral-700 
           dark:group-hover:text-neutral-300 transition-all duration-300 font-inter font-medium text-sm "
          >
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
              transition={{
                duration: 0.3,
              }}
              className="size-5 "
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path className="text-neutral-400  " d="M5 12h.5m3 0h1.5m3 0h6" />
              <path
                className="text-neutral-500 dark:text-neutral-300 "
                d="M13 18l6 -6"
              />
              <path
                className="text-neutral-500 dark:text-neutral-300 "
                d="M13 6l6 6"
              />
            </motion.svg>
          </span>
        </motion.button>

        <div className="flex flex-col gap-6 ">
          <h1
            className="text-neutral-900 dark:text-white z-20 bg-clip-text text-[80px] 
          leading-[1.1] font-geist font-bold  "
          >
            Beautiful UI components <br /> with minimal interaction.
          </h1>
          <p
            className="text-neutral-700 dark:text-neutral-300/80 text-xl z-20 max-w-3xl 
          tracking-wide font-geist-mono"
          >
            A collection of beautiful, ready-to-use components built
            specifically for minimal interaction.Plug in, customize, and ship
            stunning visuals Works seamlessly with React, shadcn, and modern
            design systems.
          </p>
        </div>

        <div className="flex gap-4 z-30">
          <button
            className="text-white dark:text-black font-inter font-medium bg-neutral-900 dark:bg-neutral-200 backdrop-blur-md cursor-pointer border border-neutral-300 dark:border-neutral-700
           px-12 py-3.5 rounded-lg w-fit text-[15px]"
          >
            Quick Start
          </button>
          <button
            className="text-neutral-900 dark:text-white font-inter font-medium bg-neutral-200/30 dark:bg-neutral-900/30 backdrop-blur-md cursor-pointer border border-neutral-300 dark:border-neutral-700
           px-12 py-3.5 rounded-lg w-fit text-[15px]"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
