import Container from "@/components/Container";
import Sidebar from "@/components/ui/SidebarContain";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex py-30 px-6 gap-8">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-24">{children}</main>
    </Container>
  );
}
