const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
const componentName = process.argv[3] || slug;

if (!slug) {
  console.error("Usage: node scripts/generate.js <slug> [componentName]");
  process.exit(1);
}

const registryPath = path.join(process.cwd(), "registry.json");

if (fs.existsSync(registryPath)) {
  const registryData = JSON.parse(fs.readFileSync(registryPath, "utf8"));

  if (!registryData.items) registryData.items = [];

  if (!registryData.items.find((item) => item.name === slug)) {
    registryData.items.push({
      name: slug,
      type: "registry:ui",
      title: componentName,
      // description: `${componentName} component`,
      dependencies: ["clsx", "tailwind-merge"],
      registryDependencies: [],
      files: [
        {
          path: `components/core/${componentName}.tsx`,
          type: "registry:ui",
          target: `components/ui/${componentName.toLowerCase()}.tsx`,
        },
      ],
    });

    fs.writeFileSync(registryPath, JSON.stringify(registryData, null, 2));
    console.log(`✅ Added ${slug} to registry.json`);
  } else {
    console.log(`⚠️ ${slug} already exists in registry.json`);
  }
} else {
  const initialRegistry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "minimal-ui",
    homepage: "https://minimal-ui-eta.vercel.app",
    items: [
      {
        name: slug,
        type: "registry:ui",
        title: componentName,
        description: `${componentName} component`,
        dependencies: ["clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          { path: `components/core/${componentName}.tsx`, type: "registry:ui" },
        ],
      },
    ],
  };
  fs.writeFileSync(registryPath, JSON.stringify(initialRegistry, null, 2));
  console.log(`✅ Created registry.json and added ${slug}`);
}
