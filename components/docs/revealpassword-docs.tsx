import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { IconCopy } from "@tabler/icons-react";
import { CodeBlock } from "@/components/ui/Code-block";
import { InstallCommand } from "../ui/Install-command";

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

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
                <div className="flex items-center justify-between bg-zinc-900 px-4 py-4.5 rounded-md border border-white/10 group">
                  <code className="font-mono text-[16px] text-zinc-300">
                    npm install framer-motion clsx tailwind-merge
                  </code>
                  <button className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer">
                    <IconCopy size={16} />
                  </button>
                </div>
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
                  <CodeBlock code={utilsCode} />
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
