import { Step, PropsTable, CliManualTabs } from "@/components/ui/Doc-blocks";
import { IconCopy } from "@tabler/icons-react";

export function RepulsioDocs() {
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
                <div className="flex items-center justify-between bg-zinc-900 px-4 py-4.5 rounded-md border border-white/10 group">
                  <code className="font-mono text-[16px] text-zinc-300">
                    $ npx minimal-ui add repulsio-text
                  </code>
                  <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <IconCopy size={16} />
                  </button>
                </div>
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

              <Step number={2} title="Copy the component code">
                <p>
                  Switch to the "Code" tab above, copy the source code, and
                  paste it into{" "}
                  <code className="text-indigo-400 bg-indigo-500/10 px-1 rounded">
                    components/core/repulsio-text.tsx
                  </code>
                  .
                </p>
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
