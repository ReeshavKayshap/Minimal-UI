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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LaminarFluid />
      </div>

      <div className="relative z-10 mx-auto max-w-336  px-10 flex flex-col w-full gap-8">
        <motion.button
          className="text-white bg-neutral-900 w-fit border border-neutral-800 flex items-center
        py-1 rounded-full group px-5 cursor-pointer z-30 gap-1"
          initial="inital"
          whileHover="show"
        >
          <span className="text-neutral-400 group-hover:text-neutral-200 transition-all duration-300 font-mono tracking-tighter text-sm ">
            Launched with 5+ hero shaders
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
              <path className="text-neutral-300 " d="M13 18l6 -6" />
              <path className="text-neutral-300 " d="M13 6l6 6" />
            </motion.svg>
          </span>
        </motion.button>

        <div className="flex flex-col gap-6 ">
          <h1 className="text-white z-30 bg-clip-text text-7xl font-bold tracking-tight ">
            Beautiful UI components <br /> with minimal interaction.
          </h1>
          <p className="text-neutral-400 text-xl z-20 max-w-2xl tracking-wide">
            A collection of beautiful, ready-to-use components built
            specifically for minimal interaction.Plug in, customize, and ship
            stunning visuals Works seamlessly with React, shadcn, and modern
            design systems.
          </p>
        </div>

        <div className="flex gap-4 z-30">
          <button className="relative inline-flex  overflow-hidden rounded-lg p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7B1ACD_0%,#B51E93_50%,#7B1ACD_100%)]" />
            <span
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#141212] hover:bg-[#1A1A1A] transition-all duration-300
              px-12 py-3 text-[15px] text-white backdrop-blur-3xl"
            >
              Quick Start
            </span>
          </button>
          <button
            className="text-white bg-neutral-900/30 backdrop-blur-md cursor-pointer border border-neutral-700
           px-12 py-3 rounded-lg w-fit text-[15px]"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
