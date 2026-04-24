import Container from "@/components/Container";
import Sidebar from "@/components/ui/SidebarContain";
import { div } from "motion/react-client";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-tl from-[#080808] from-50% to-[#0258ED]/15 h-full w-full min-h-screen">
      <Container className="flex py-30 px-6 gap-8 ">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-24">{children}</main>
      </Container>
    </div>
  );
}
