import Container from "@/components/Container";
import FAQAccordion from "@/components/core/Faq";
import RevealPassword from "@/components/core/RevealPassword";
import HeroSection from "@/components/ui/HeroSection";
import ShowCast from "@/components/ui/ShowCast";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container>
        <ShowCast />
        <RevealPassword />
        <FAQAccordion />
      </Container>
    </>
  );
}
