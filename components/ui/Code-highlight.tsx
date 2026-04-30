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
    themes: {
      light: "min-light",
      dark: "nord",
    },
  });

  return (
    <div className="relative flex justify-between overflow-hidden bg-neutral-200/20 dark:bg-neutral-900 ">
      <div
        className="p-4 overflow-x-auto text-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="px-4 py-2">
        <CopyButton textToCopy={code} />
      </div>
    </div>
  );
}
