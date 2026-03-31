function Components() {
  return (
    <div
      className="flex flex-col py-20 relative gap-8
     w-full  z-30"
    >
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <h1 className="text-white text-4xl font-bold">
          Unlock a growing library of 400+ shader presets
        </h1>
        <p className="text-neutral-400 text-xl">
          A collection of beautiful, ready-to-use shaders built specifically for
          hero sections.Plug in, customize, and ship stunning visuals.Works
          seamlessly with React, shadcn, and modern design systems.
        </p>
      </div>

      <div className="grid grid-cols-4 grid-rows-[auto_auto] gap-2 ">
        <div className=" bg-amber-200 h-80 w-full rounded-2xl row-span-2"></div>
        <div className=" bg-amber-300 h-80 w-full col-span-1 rounded-2xl"></div>
        <div className=" bg-amber-300 h-80 w-full col-span-1 rounded-2xl"></div>
        <div className=" bg-amber-300 h-80 w-full col-span-1 rounded-2xl"></div>
      </div>
    </div>
  );
}

export default Components;
