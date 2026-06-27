import Container from "@/components/Container";
import Sidebar from "@/components/ui/SidebarContain";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-linear-to-tl from-neutral-50 from-70% to-[#0258ED]/5 
       dark:from-[#080808] dark:from-70% dark:to-[#0258ED]/15 
     h-full w-full min-h-screen"
    >
      <Container className="flex py-30 px-6 gap-8 ">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-24">{children}</main>
      </Container>
    </div>
  );
}
