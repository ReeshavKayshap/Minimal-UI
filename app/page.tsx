import Container from "@/components/Container";
import HeroSection from "@/components/ui/HeroSection";
import ShowCast from "@/components/ui/ShowCast";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container>
        <ShowCast />
      </Container>
    </>
  );
}
