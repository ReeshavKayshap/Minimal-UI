import Container from "@/components/Container";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container>
        <div className="h-screen"></div>
      </Container>
    </>
  );
}
