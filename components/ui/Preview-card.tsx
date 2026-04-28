"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface PreviewCardProps {
  title: string;
  description: string;
  href: string;
  thumbnailSrc: string;
  videoSrc: string;
  loading?: "lazy" | "eager";
}

export function PreviewCard({
  title,
  description,
  href,
  thumbnailSrc,
  videoSrc,
  loading,
}: PreviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) videoRef.current.play().catch(() => {});
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link
      href={href}
      className=" flex flex-col bg-[#F0F0F0] dark:bg-neutral-900 p-1 w-full 
      rounded-2xl ring-1 ring-neutral-200 shadow-xs dark:ring-0
      dark:shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex flex-col p-1.5 ">
        <div className="relative w-full aspect-video border border-neutral-200 dark:border-[#232323] rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={loading}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="px-3 pt-3.5 pb-1 flex flex-col gap-1">
          <h2 className="text-[15px] font-medium tracking-tight text-neutral-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
            {title}
          </h2>
          <p className="text-[13px] text-neutral-500 dark:text-zinc-500 line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
