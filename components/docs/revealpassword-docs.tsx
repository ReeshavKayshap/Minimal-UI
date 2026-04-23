import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { IconCopy } from "@tabler/icons-react";
import { CodeHighlight } from "@/components/ui/Code-highlight";
import { InstallCommand } from "../ui/Install-command";
import { InstallDependencies } from "../ui/Install-dependencies";

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const revealPasswordCode = `"use client";

import { useState, useEffect, useRef } from "react";
import { IconEye, IconCopy, IconCheck } from "@tabler/icons-react";
import { motion } from "motion/react";

export interface RevealPasswordProps {
  prefix?: string;
  secret?: string;
  suffix?: string;
  mask?: string;
  valueToCopy?: string;
}

export default function RevealPassword({
  prefix = "4485 ",
  secret = "1996 2057",
  suffix = " 7516",
  mask = "xxxx xxxx",
  valueToCopy = "4485 1996 2057 7516",
}: RevealPasswordProps) {
  const [status, setStatus] = useState<"hidden" | "revealed" | "copied">(
    "hidden",
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAction = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (status === "hidden") {
      setStatus("revealed");
      timerRef.current = setTimeout(() => setStatus("hidden"), 4000);
    } else if (status === "revealed") {
      copyToClipboard(valueToCopy);
      setStatus("copied");
      timerRef.current = setTimeout(() => setStatus("hidden"), 2000);
    }
  };

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  const buttonStyles = {
    hidden:
      "bg-[#eff2fe] cursor-pointer text-[#5568f9] hover:bg-[#e4e9fe] focus-visible:ring-[#5568f9]",
    revealed:
      "bg-[#e5f8ed] cursor-pointer text-[#22c55e] hover:bg-[#d1f4e0] focus-visible:ring-[#22c55e]",
    copied: "bg-[#22c55e] cursor-pointer text-white",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-10 bg-white px-3.5 py-2 w-fit rounded-2xl border border-gray-200 shadow-xs">
        <div className="relative font-geist text-[17px] font-medium flex items-center text-gray-800">
          <span>{prefix}</span>
          <div className="relative w-[104px] flex items-center justify-center overflow-visible mx-1">
            <div className="absolute inset-0 flex items-center justify-center whitespace-pre pointer-events-none">
              {mask.split("").map((char, i) => (
                <motion.span
                  key={\`hidden-\${i}\`}
                  initial={false}
                  animate={{
                    rotateX: status === "hidden" ? 0 : 90,
                    y: status === "hidden" ? 0 : -12,
                    opacity: status === "hidden" ? 1 : 0,
                    filter: status === "hidden" ? "blur(0px)" : "blur(3px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: i * 0.035,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center whitespace-pre pointer-events-none">
              {secret.split("").map((char, i) => (
                <motion.span
                  key={\`revealed-\${i}\`}
                  initial={false}
                  animate={{
                    rotateX: status !== "hidden" ? 0 : -90,
                    y: status !== "hidden" ? 0 : 12,
                    opacity: status !== "hidden" ? 1 : 0,
                    transformPerspective: 400,
                    filter: status !== "hidden" ? "blur(0px)" : "blur(3px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: i * 0.035,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          <span>{suffix}</span>
        </div>

        <button
          onClick={handleAction}
          disabled={status === "copied"}
          className={\`relative w-10 h-10 rounded-[14px] transition-colors duration-300 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 $\{buttonStyles[status]}\`}
        >
          {status === "revealed" && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 40 40"
            >
              <motion.rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="130"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 130 }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </svg>
          )}

          <div className="relative w-5 h-5 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{
                scale: status === "hidden" ? 1 : 0.5,
                opacity: status === "hidden" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <IconEye size={20} strokeWidth={2.5} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                scale: status === "revealed" ? 1 : 0.5,
                opacity: status === "revealed" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <IconCopy size={20} strokeWidth={2.5} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                scale: status === "copied" ? 1 : 0.5,
                opacity: status === "copied" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <IconCheck size={20} strokeWidth={3} />
            </motion.div>
          </div>
        </button>
      </div>
    </div>
  );
}
`;

export function RevealPasswordDocs() {
  const repulsioProps = [
    {
      prop: "text",
      type: "string",
      defaultValue: '"Minimal UI"',
      description: "The text rendered into particles.",
    },
    {
      prop: "gap",
      type: "number",
      defaultValue: "7",
      description: "The space between particles (lower = denser).",
    },
    {
      prop: "repulseRadius",
      type: "number",
      defaultValue: "90",
      description: "How far the mouse pushes particles.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 pt-5 animate-in fade-in duration-700">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Installation
        </h2>

        <CliManualTabs
          cliContent={
            <div className="flex flex-col gap-4">
              <Step number={1} title="Run the following Command">
                <InstallCommand componentName="reveal-password" />
              </Step>
            </div>
          }
          manualContent={
            <div className="flex flex-col gap-2">
              <Step number={1} title="Install Package">
                <InstallDependencies
                  dependencies={["motion", "clsx", "tailwind-merge"]}
                />
              </Step>
              <Step number={2} title="Add util file">
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20">
                    lib/utils.ts
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6">
                  <CodeHighlight code={utilsCode} />
                </div>
              </Step>

              <Step number={3} title="Add the component">
                <div className="mb-4 text-[14px] text-zinc-400 leading-relaxed">
                  Create a file at
                  <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-400/20">
                    components/ui/reveal-password.tsx
                  </code>
                  and paste this code.
                </div>
                <div className="mb-6 max-h-[450px] overflow-y-auto rounded-xl border border-white/10 relative custom-scrollbar">
                  <CodeHighlight code={revealPasswordCode} />
                </div>
              </Step>
            </div>
          }
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Understanding the Component
        </h2>
        <p className="text-zinc-400 mb-4 leading-relaxed">
          The Repulsion Text effect reads the alpha channel of a hidden canvas
          to determine where to place particles. It then applies a custom
          physics engine calculating distance from the mouse cursor to apply
          force vectors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          Props
        </h2>
        <PropsTable data={repulsioProps} />
      </section>
    </div>
  );
}
