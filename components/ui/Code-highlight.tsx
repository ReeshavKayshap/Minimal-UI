import { codeToHtml } from "shiki";

import { CopyButton } from "./Copy-button";

interface CodeHighlightProps {
  code: string;
  language?: string;
}

export async function CodeHighlight({
  code,
  language = "tsx",
}: CodeHighlightProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "nord",
  });

  return (
    <div className="relative flex justify-between bg-[#121212] rounded-xl overflow-hidden border dark:border-[#1a1919] ">
      <div
        className="p-4 overflow-x-auto text-sm  scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent [&>pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className=" px-4 py-2 ">
        <CopyButton textToCopy={code} />
      </div>
    </div>
  );
}
