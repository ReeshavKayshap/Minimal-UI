import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

import { ComponentTabs } from "@/components/ui/Component-tabs";
import { COMPONENT_REGISTRY } from "@/registry/components";
import { CodeHighlight } from "@/components/ui/Code-highlight";

async function getPreviewSourceCode(fileName: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "components",
      "previews",
      fileName,
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    return fileContents;
  } catch (error) {
    console.error(`Failed to read file: ${fileName}`);
    return `// Error: Could not find ${fileName} in components/previews/`;
  }
}

export async function generateStaticParams() {
  return Object.keys(COMPONENT_REGISTRY).map((slug) => ({
    slug: slug,
  }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const componentData = COMPONENT_REGISTRY[slug];

  if (!componentData) {
    notFound();
  }

  const PreviewComponent = componentData.preview;
  const DocsComponent = componentData.docs;

  const rawPreviewCode = await getPreviewSourceCode(
    componentData.previewFileName,
  );

  return (
    <div>
      <div className="flex flex-col gap-2 pb-6">
        <h1 className="text-4xl md:text-3xl font-inter font-semibold text-neutral-900 dark:text-zinc-100 tracking-tight">
          {componentData.title}
        </h1>
        <p className="text-[17.3px] text-neutral-500 font-inter dark:text-zinc-400 max-w-2xl leading-relaxed">
          {componentData.description}
        </p>
      </div>

      <ComponentTabs
        preview={<PreviewComponent />}
        code={<CodeHighlight code={rawPreviewCode} />}
      />

      {DocsComponent && (
        <div className="mt-12">
          <DocsComponent />
        </div>
      )}
    </div>
  );
}
