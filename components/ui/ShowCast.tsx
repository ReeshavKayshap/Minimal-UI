function ShowCast() {
  return (
    <div
      className="flex flex-col py-60 px-10 relative gap-8 max-w-7xl mx-auto
     w-full "
    >
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <h1 className="text-neutral-900 dark:text-white text-4xl font-geist font-semibold">
          UI components for modern interfaces.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-center text-lg font-geist">
          A curated set of minimal UI components. Copy, paste, and ship.
        </p>
      </div>

      <div className="grid grid-cols-4 grid-rows-[auto_auto] gap-2 ">
        <div className=" bg-neutral-100 dark:bg-neutral-900 h-140 w-full rounded-2xl row-span-2">
          <div className="p-1 w-full h-full relative">
            <video
              src="/videos/Sidebar.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl w-full h-full object-cover object-left "
            />
            <h1 className="text-black absolute bottom-6 left-8 font-geist text-[16px]">
              Sidebar
            </h1>
          </div>
        </div>
        <div className=" rounded-2xl bg-neutral-100 dark:bg-neutral-900 h-80 w-full col-span-1   shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset] ">
          <div className="p-1 w-full h-full relative">
            <video
              src="/videos/OptionToggle.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl w-full h-full object-cover "
            />
            <h1 className="text-black absolute bottom-6 left-8 font-geist text-[16px]">
              OptionToggle
            </h1>
          </div>
        </div>
        <div
          className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 col-span-2 w-full h-80 
        shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset] 
        "
        >
          <div className="p-1 w-full h-full relative">
            <video
              src="/videos/Faq.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl w-full h-full object-cover "
            />
            <h1 className="text-black absolute bottom-6 left-8 font-geist text-[16px]">
              OptionToggle
            </h1>
          </div>
        </div>
        <div className=" bg-neutral-100 dark:bg-neutral-900 h-58 w-full col-span-3 rounded-2xl ">
          <div className="p-1 w-full h-full relative">
            <video
              src="/videos/TextHover.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl w-full h-full object-cover"
            />
            <h1 className="text-white absolute bottom-6 left-8 font-geist   text-[16px]">
              RepulsioText
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCast;
