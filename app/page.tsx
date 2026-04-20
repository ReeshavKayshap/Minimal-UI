import Container from "@/components/Container";
import SidebarPreview from "@/components/previews/sidebar-preview";
import HeroSection from "@/components/ui/HeroSection";
import ShowCast from "@/components/ui/ShowCast";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container>
        <ShowCast />
        <SidebarPreview />
      </Container>
    </>
  );
}
